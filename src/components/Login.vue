<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">


          <transition name="fade">
            <div class="transition-container"
                 v-if="showingLogin && !resetPasswordToken"
              >
              <InlineForm v-on:submit="handleLoginSubmit">
              <div class="form-group">
                <TextInput v-model="username" placeholder="Login" />
                <small v-if="status.invalidCredentials"
                       class="form-text text-danger">
                  Invalid credentials
                </small>
              </div>
              <div class="form-group">
                <TextInput v-model="password" placeholder="Password" type="password" />
              </div>
              <div class="form-group">
                <Submit label="Go" :loading="status.loggingIn" />
              </div>

              <div class="form-group">
                <router-link :to="{name: 'registration'}"
                             v-slot="{href, route, navigate, isActive, isExactActive}"
                >
                  <a :href="href">
                    S'inscrire
                  </a>
                </router-link>
              </div>

    <ProgressBar
        :progress="kikoo"
        width="90%"
        left="10%"
        position="relative"
        height="3rem"
        border-radius="1.5rem"
        color="linear-gradient(50deg, #6e00ff 0, #bb00ff 100%)"
    />
    <input type="number" v-model="kikoo">
              <a href="#" @click="swapForm">Mot de passe oublié ?</a>
              </InlineForm>
            </div>
          </transition>

          <transition name="fade">
            <div class="transition-container"
                 v-if="showingPasswordReset && !resetPasswordToken"
              >
              <InlineForm v-on:submit="handlePasswordResetRequestSubmit"
              >
              <div class="form-group">
                <p>Si vous avez oublié votre mot de passe, vous pouvez entrer ici votre adresse email et vous nous enverrons un lien pour en choisir un nouveau :</p>
              </div>

              <div class="form-group">
                <TextInput v-model="username" placeholder="Email" type="email" />
              </div>

              <div class="form-group">
                <Submit label="Valider"
                        :loading="sendingPasswordResetRequest"
                        :disabled="!username"
                        />
              </div>

              <a href="#" @click="swapForm">Retour au login</a>
              </InlineForm>
            </div>
          </transition>

          <transition name="fade">
            <div class="transition-container"
                 v-if="resetPasswordToken"
              >
              <InlineForm v-on:submit="handlePasswordChange">
                <div class="form-group">
                  <p>Vous pouvez maintenant choisir un nouveau mot de passe :</p>
                </div>

                <div class="form-group">
                  <TextInput v-model="password" placeholder="Mot de passe" type="password" />
                </div>

                <div class="form-group">
                  <Submit label="Valider"
                          :loading="sendingPasswordChange"
                          :disabled="!password"
                          />
                </div>
              </InlineForm>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import InlineForm from './form/InlineForm.vue'
import TextInput from './form/TextInput.vue'
import Submit from './form/Submit.vue'
import ProgressBar from './ProgressBar'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      showingLogin: true,
      showingPasswordReset: false,
      resetPasswordToken: null,
      kikoo: 40,
    }
  },
  computed: {
    ...mapState(
      'security',
      [
        'status',
        'isLoggedIn',
        'sendingPasswordResetRequest',
        'sendingPasswordChange'
      ]
    ),
  },
  components: {
    InlineForm,
    TextInput,
    Submit,
    ProgressBar,
  },
  methods: {
    ...mapActions(
      'security',
      [
        'login',
        'logout',
        'sendResetPasswordRequest',
        'sendPasswordChange',
      ]
    ),
    swapForm() {
      this.showingLogin = !this.showingLogin
      this.showingPasswordReset = !this.showingPasswordReset
    },
    handleLoginSubmit() {
      this.loading = true
      const {username, password} = this

      if (username && password) {
        this.login({username, password})
            .then(() => this.$router.push({name: 'home'}))
      }
    },
    handlePasswordResetRequestSubmit() {
      if (this.username) {
        this.sendResetPasswordRequest(this.username)
            .then(() =>
                this.$notify({
                  group: 'default',
                  type: 'success',
                  title: 'Envoyé !',
                  text: 'Vous allez bientôt recevoir un mail avec les instructions pour choisir un nouveau mot de passe',
                })
            )
      }
    },
    handlePasswordChange() {
      if (this.password) {
        this.sendPasswordChange({password: this.password, token: this.resetPasswordToken})
            .then(() => {
                this.resetPasswordToken = null

                this.$notify({
                  group: 'default',
                  type: 'success',
                  title: 'Mot de passe modifié avec succès',
                  text: 'Vous pouvez maintenant l\'utiliser pour vous connecter',
                })
            })
            .catch(() => {
                this.resetPasswordToken = null

                this.$notify({
                  group: 'default',
                  type: 'error',
                  title: 'Une erreur est survenue',
                  text: 'Vous pouvez contacter notre support si l\'erreur persiste',
                })
            })
      }
    }
  },
  created() {
    this.resetPasswordToken = this.$route.query.t
    const invalidToken = this.$route.query.it

    if (invalidToken) {
      this.logout()
    }

    if (this.isLoggedIn) {
        this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="sass" scoped>
.transition-container
  position: absolute
  width: 100%

.jumbotron
  height: 100vh
</style>
