<template>
  <div>
    <div class="login-container">
      <div class="center-column">
        <transition name="fade">
          <div class="box-container" v-if="showingBox">
            <div class="mada" style="">
            <div class="mada" style="">
            </div>
            </div>

            <div class="login-box" v-if="showingBox">
              <transition name="fade">
                <div class="transition-container"
                     v-if="showingRegistration && !resetPasswordToken"
                  >
                  <h2>Apprenez le malgache en ligne grace à des exercices simples et gratuits</h2>

                  <div class="buttons">
                    <router-link :to="{name: 'registration'}"
                                 v-slot="{href, route, navigate, isActive, isExactActive}"
                    >
                      <b-button :href="href" class="mtn-button">
                        C'est parti
                      </b-button>
                    </router-link>

                    <b-button @click="showLogin" class="mtn-button mtn-secondary">
                      J'ai déjà un compte
                    </b-button>
                  </div>
                </div>
              </transition>

              <transition name="fade">
                <div class="transition-container"
                     v-if="showingLogin && !resetPasswordToken"
                  >
                  <InlineForm v-on:submit="handleLoginSubmit">
                  <div class="form-group">
                    <TextInput v-model="username" placeholder="Email" />
                    <small v-if="status.invalidCredentials"
                           class="form-text text-danger">
                      Invalid credentials
                    </small>
                  </div>
                  <div class="form-group">
                    <TextInput v-model="password" placeholder="Mot de passe" type="password" />
                  </div>
                  <div class="form-group">
                    <Submit label="Valider" :loading="status.loggingIn" />
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

                  <a href="#" @click="showForgotPassword">Mot de passe oublié ?</a>
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

                  <a href="#" @click="showLogin">Retour au login</a>
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
        </transition>
      </div>
    </div>

    <div class="infos">
      <div class="center-column">
        <h1>
          Apprenez grace à des exercices simples
        </h1>
        <p>
          Les exe
        </p>
        <hr>
        <h1>
          Suivez vos progrès
        </h1>
        <hr>
        <h1>
          Étudiez les détails grâce à des leçons avancées
        </h1>
      </div>

      <div class="footer">
        <div class="center-column">
          Apprenez le malgache avec Miteny Gasy
          <b-button :href="href" class="mtn-button">
            C'est parti
          </b-button>
        </div>
      </div>
    </div>

    <div class="miteny-gasy">
      <div class="center-column">
        <h1>
          Miteny Gasy
        </h1>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { BButton } from 'bootstrap-vue'

import InlineForm from './form/InlineForm.vue'
import TextInput from './form/TextInput.vue'
import Submit from './form/Submit.vue'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      showingLogin: false,
      showingBox: false,
      showingRegistration: true,
      showingPasswordReset: false,
      resetPasswordToken: null,
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
    BButton,
  },
  directives: {
    'b-button': BButton,
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
    showRegistration() {
      this.showingLogin = false
      this.showingRegistration = true
      this.showingPasswordReset = false
    },
    showLogin() {
      this.showingLogin = true
      this.showingRegistration = false
      this.showingPasswordReset = false
    },
    showForgotPassword() {
      this.showingLogin = false
      this.showingRegistration = false
      this.showingPasswordReset = true
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
    const loginDirectly = this.$route.query.l

    if (invalidToken) {
      this.logout()
    }

    if (this.isLoggedIn) {
        this.$router.push({name: 'home'})
    }

    if (loginDirectly) {
      this.showLogin()
    }

    if (localStorage.getItem('startfaded')) {
      this.showingBox = true
    } else {
      setTimeout(() => this.showingBox = true, 1500)
      localStorage.setItem('startfaded', true)
    }
  }
}
</script>

<style lang="sass" scoped>
h1
  font-family: 'Ubuntu', sans-serif
  font-size: 24pt

.transition-container
  width: 100%
  height: 100%
  position: relative
  padding: 1cm

.login-container
  background: url("/bg1.jpg")
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  height: calc(var(--vh, 1vh) * 100)
  background-size: cover
  background-position: center

  .box-container
    display: flex
    top: calc(var(--vh, 1vh) * 35)
    position: relative

    .mada
      background: url('/mada.svg')
      width: 10cm
      height: 10cm
      background-repeat: no-repeat

  .login-box
    border-radius: 3mm
    background: transparentize(white, 0.5)
    width: 18cm
    height: 8cm

    .buttons
      display: flex
      flex-flow: column nowrap
      align-content: center
      justify-content: space-evenly
      height: 75%
      margin: 0 15% 0 15%

    h2
      font-size: 24pt
      font-family: 'Ubuntu', sans-serif
      text-align: center
      color: $font-black

.infos
  background: white
  position: absolute
  left: 0
  right: 0
  top: calc(var(--vh, 1vh) * 100)
  bottom: 0
  height: calc(var(--vh, 1vh) * 100)
  padding: 2%

.mtn-button
  width: initial
  font-variant: all-small-caps
  background: $navbar-bg

  &.mtn-secondary
    border: 1px solid $dark-gray
    color: $dark-gray
    background: transparentize(white, 0.8)

    &:hover
      background: transparentize(white, 0.5)

.miteny-gasy
  position: fixed
  top: 0
  left: 0
  text-align: left
  background: $green
  width: 100%
  padding: 3mm
  background: $navbar-bg

  h1
    color: white
    font-size: 24pt
    font-family: 'Ubuntu', sans-serif

.footer
  position: absolute
  bottom: 0
  left: 0
  background: $navbar-bg
  width: 100%
  height: 10vh
  color: white

  .center-column
    display: flex
    align-items: center
    justify-content: space-evenly
    font-size: 18pt
    height: 100%

    .mtn-button
      background: white
      color: $navbar-bg

.center-column
  width: 100%
  max-width: 1000px
  margin: 0 auto
  position: relative

@media screen and (max-width: 800px)
  h1
    font-size: 18pt

  .login-container
    .box-container
      .mada
        display: none

      top: calc(var(--vh, 1vh) * 20)

      .login-box
        bottom: 1cm
        border-radius: 0
        width: 100%
        height: 8cm
        background: transparentize(white, 0.2)
        box-shadow: 0 0 50px gray
        top: calc(var(--vh, 1vh) * 15)

        h2
          font-size: 18pt

  .miteny-gasy
    padding: 1.5mm

  .footer .center-column
    font-size: 10pt

</style>
