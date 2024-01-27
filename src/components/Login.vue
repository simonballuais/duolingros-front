<template>
  <div>
    <div class="login-container" style="height: calc(var(--vh, 1vh) * 100)">
      <img src="bg4-veryverysmol.jpg"
           id="bg-smol"
           ref="bgSmol"
           style="filter: blur(8px);"
      />
      <img src="bg4.jpg"
           alt="allée des baobabs"
           defer
           ref="bgFat"
           id="bg-fat"
      />

      <span class="image-credit">
        Photo par
        <a href="https://unsplash.com/@themeinn">Theme Inn</a>
        sur
        <a href="https://unsplash.com">Unsplash</a>.
      </span>


      <div class="center-column">
        <transition name="fade">
          <div class="box-container">
            <div class="mada" style="">
            </div>

            <div class="login-box">
              <transition name="box-fade">
                <div class="transition-container"
                     v-if="showingRegistration && !resetPasswordToken"
                  >
                  <h1>Apprendre le malgache en ligne grâce à une méthode simples et gratuite</h1>

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

              <transition name="box-fade">
                <div class="transition-container"
                     v-if="showingLogin && !resetPasswordToken"
                  >
                  <InlineForm v-on:submit="handleLoginSubmit">
                  <div class="form-group">
                    <TextInput v-model="username" placeholder="Email" />
                    <small v-if="status.invalidCredentials"
                           class="form-text text-danger">
                      Mot de passe ou email erroné
                    </small>
                  </div>
                  <div class="form-group" style="margin-bottom: 0.2rem;">
                    <TextInput v-model="password" placeholder="Mot de passe" type="password" />
                  </div>
                  <a href="#" @click="showForgotPassword" style="margin-left: 1rem;">Mot de passe oublié ?</a>

                  <div class="form-group">
                    <Submit label="Valider" :loading="status.loggingIn" class="login-button"/>
                  </div>

                  <div class="form-group">
                    <router-link :to="{name: 'registration'}"
                                 v-slot="{href, route, navigate, isActive, isExactActive}"
                    >
                      <a :href="href" style="margin-left: 1rem;">
                        S'inscrire
                      </a>
                    </router-link>
                  </div>
                  </InlineForm>
                </div>
              </transition>

              <transition name="box-fade">
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
                            :disabled="!username || sendingPasswordResetRequest"
                            class="login-button"
                            />
                  </div>

                  <a href="#" @click="showLogin">Retour au login</a>
                  </InlineForm>
                </div>
              </transition>

              <transition name="box-fade">
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
        <h2>
          Une méthode simples pour apprendre le malgache
        </h2>
        <div class="info-row">
          <p style="width: 50%">
            Que vous soyez expatrié ou que vous prévoyiez un voyage, Miteny Gasy vous permet d'initier votre apprentissage de la langue malgache.<br>
            Les leçons sont découpées en sessions de courts exercices.<br>
            En terminant des leçons, vous validez des niveaux et débloquez les leçons suivantes.
          </p>
          <img src="/question.png" class="img-right">
        </div>

        <hr>

        <div class="info-row">
          <img src="/correction.png" class="img-left">
          <p style="width: 50%">
            Avec Miteny Gasy vous pouvez pratiquer le malgache quotidiennement.<br>
            Les exercices sont des traductions.<br>
            Vous avez des outils à disposition et les corrections sont apportées immédiatement.<br>
            En cas d'erreur, une bonne réponse est suggérée et vous permet de vous améliorer.<br>
            La difficulté est augmentée en douceur, à votre rythme.
          </p>
        </div>
        <hr>
        <h2>
          Suivez vos progrès
        </h2>
        <div class="info-row">
          <p style="width: 50%">
            Toutes vos sessions d'entrainement sont sauvegardées et vous pouvez suivre vos progrès jour après jour.
          </p>
          <img src="/progress.png" class="img-right">
        </div>
        <hr>
        <h2>
          Apprendre une nouvelle langue
        </h2>
        <div class="info-row">
          <font-awesome-icon class="book" icon="book" style="width: 30%"/>
          <p style="width: 70%">
            En plus des leçons, notre
            <a href="https://cours.mitenygasy.com">base de connaissance</a>
            est là pour vous permettre de réviser des détails ou aller plus loin.
            <br>
            <br>
            Miteny gasy est également disponible sur mobile <font-awesome-icon class="mobile-alt" icon="mobile-alt" />
          </p>
        </div>
      </div>

      <div class="footer">
        <div class="center-column">
          Apprenez le malgache avec Miteny Gasy
          <router-link :to="{name: 'registration'}"
                       v-slot="{href, route, navigate, isActive, isExactActive}"
          >
            <b-button :href="href" class="mtn-button">
              C'est parti
            </b-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="miteny-gasy">
      <div class="center-column">
        <span class="main-title">
          Miteny Gasy
        </span>
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
      setTimeout(() => this.showingLogin = true, 100)
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
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.bgFat.complete) {
        this.$refs.bgFat.style.opacity = 1
      } else {
        this.$refs.bgFat.addEventListener('load', () => {
          this.$refs.bgFat.style.opacity = 1
        })
      }
    })
  }
}
</script>

<style lang="sass" scoped>
.main-title
  font-family: 'Ubuntu', sans-serif
  font-size: 24pt
  font-weight: 700
  margin: 0
  color: white

.transition-container
  width: 100%
  height: 100%
  position: relative
  padding: 1cm
  top: 0
  left: 0

.login-container
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  height: calc(var(--vh, 1vh) * 100)
  background-size: cover
  background-position: center
  overflow: hidden

  img
    transition: opacity 0.5s ease-in-out
    object-fit: cover
    position: absolute
    top: 50%
    left: 50%
    height: calc(var(--vh, 1vh) * 100)
    width: 100%
    transform: translate(-50%, -50%)

    &#bg-fat
      opacity: 0

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
    background: transparentize(white, 0.15)
    width: 18cm
    height: 8cm

    .buttons
      display: flex
      flex-flow: column nowrap
      align-content: center
      justify-content: space-evenly
      height: 75%
      margin: 0 15% 0 15%

    h1
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

  h2
    font-size: 28pt
    font-weight: lighter
    padding: 8pt

  p
    font-size: 17pt
    padding: 8pt
    font-weight: lighter

  img
    box-shadow: 0 0 25px lightgray
    width: 45%

    &.img-left
      margin-right: 5%
    &.img-right
      margin-left: 5%

  .center-column
    padding: 2%

  .book
    color: $navbar-bg
    font-size: 48pt

.mtn-button
  width: initial
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
  position: relative
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

.info-row
  display: flex
  width: 100%
  flex-flow: row wrap
  align-items: center

.login-button
  width: 80%
  margin-left: 10%
  margin-top: 8pt

.image-credit
  position: absolute
  right: 5px
  font-size: 12px
  top: calc(var(--vh, 1vh) * 100 - 16px)
  color: white

@media screen and (max-width: 1000px)
  .login-container
    .box-container
      .login-box
        h1
          font-size: 20pt

@media screen and (max-width: 800px)
  .main-title
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
        background: transparentize(white, 0.15)
        box-shadow: 0 0 50px gray
        top: calc(var(--vh, 1vh) * 15)

        h1
          font-size: 18pt

  .image-credit
    position: absolute
    right: 5px
    font-size: 10px
    top: calc(var(--vh, 1vh) * 100 - 14px)
    color: white

  .miteny-gasy
    padding: 2.5mm

  .footer .center-column
    font-size: 10pt

  .infos
    h2
      font-size: 18pt
      font-weight: normal
      padding: 8pt

    p
      padding: 8pt
      font-weight: lighter
      font-size: 14pt

    img
      width: 50%

      &.img-left
        margin-right: 0
      &.img-right
        margin-left: 0

@media screen and (max-width: 400px)
  .login-container
    .box-container
      .login-box
        h1
          font-size: 16pt

.box-fade-enter-active
  transition: opacity .3s ease
.box-fade-enter
  opacity: 0
</style>
