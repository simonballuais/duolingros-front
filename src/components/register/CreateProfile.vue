<template>
  <transition name="create-profile-fade">
    <div class="create-profile" v-if="show">
      <div class="modale">
        <div class="header">
          <div @click="cancelCreateProfile" class="close-icon">
            <font-awesome-icon class="times" icon="times"/>
          </div>

          <h1>
            Créer un profil
          </h1>
        </div>

        <div class="content">
          <Spinner v-if="submittingProfile"
                   :big="true"
                   :center="true"
                   ></Spinner>

          <div class="band">
            <TextInput v-model="profileData.email"
                       placeholder="Email"
                       :disabled="submittingProfile"
            />
            <em>Nous n'utilisons votre email que pour l'identification.<br>Nous ne revendons aucune donnée de nos utilisateurs.</em>
            <TextInput v-model="profileData.username"
                       placeholder="Pseudo (facultatif)"
                       :disabled="submittingProfile"
            />
            <TextInput v-model="profileData.password"
                       placeholder="Choisissez un mot de passe"
                       type="password"
                       :disabled="submittingProfile"
            />
          </div>
        </div>

        <div class="footer">
          <b-button @click="submitRegistration"
                     class="submit"
                     :disabled="!profileData.email || !profileData.password"
                     >
            Créer le compte
          </b-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import TextInput from '../form/TextInput'
import Spinner from './../misc/Spinner'
import { BButton } from 'bootstrap-vue'

export default {
  name: 'IntensitySelection',
  data() {
    return {
    }
  },
  directives: {
    'b-button': BButton,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TextInput,
    Spinner,
    BButton,
  },
  computed: {
    ...mapState(
      'security',
      [
        'user',
      ]
    ),
    ...mapState('registration', ['profileData', 'submittingProfile']),
  },
  methods: {
    ...mapActions('registration', ['cancelCreateProfile', 'submitRegistration']),
    handleKeyUp(e) {
      if (e.keyCode === 13 && this.profileData.email && this.profileData.password) {
        this.submitRegistration()
          .then(() =>
              this.$notify({
                group: 'default',
                type: 'success',
                title: 'Profil créé avec succès !',
                text: 'Un email vous a été envoyé pour confirmer votre adresse',
              })
          )
          .catch(() =>
              this.$notify({
                group: 'default',
                type: 'error',
                title: 'Une erreur est survenue',
                text: 'Vous pouvez réessayer et contacter notre support si l\'erreur persiste.',
              })
          )
        window.removeEventListener('keyup', this.handleKeyUp)
      }
      if (e.keyCode === 27) {
        this.cancelCreateProfile()
        window.removeEventListener('keyup', this.handleKeyUp)
      }
    },
  },
  created() {
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
}
</script>

<style lang="sass" scoped>
h1, h2
  font-family: 'Ubuntu', sans-serif

h1
  font-size: 1.8rem
  font-weight: bold
  margin-top: 1.5rem
  margin-bottom: 1.5rem
  margin-left: 2em

h2
  font-size: 1.3rem

.create-profile
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 1400
  padding: 2vh

  .modale
    position: relative
    width: 90%
    height: 90%
    background: pink
    margin: auto
    max-width: 600px
    background: white
    border: 1px solid rgba(0, 0, 0, 0.125)
    padding: 5%
    border-radius: 5px
    box-shadow: 0 0 150px $shadow-gray

    .content
      display: flex
      flex-flow: column nowrap
      align-items: normal
      position: absolute
      bottom: 0
      top: 10%
      left: 0
      right: 0
      background: linear-gradient( to bottom left, #FFF 50%, #F5F5F5 100% )

      .band
        width: 100%
        padding-top: 1em
        padding-bottom: 1em
        padding-left: 5%
        padding-right: 5%

        em
          margin-bottom: 1.2rem
          font-size: 0.9em
          padding-left: 12px
          padding-right: 12px
          display: block

        input
          margin-bottom: 0

          &:not(:first-child)
            margin-top: 1.2rem

      input
        margin-bottom: 1.2em

    .graph-container
      height: 50%

  .footer
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    left: 0
    right: 0
    bottom: 0
    height: 10%

  button
    display: block
    width: 90%
    max-width: 200px
    transition: background-color 0.35s
    background-color: $green
    border: 0
    color: white
    height: 50px
    border-radius: 25px
    cursor: pointer

    &:hover
      background-color: darken($green, 5%)

  .header
    box-shadow: 0 0 20px gray
    position: absolute
    left: 0
    right: 0
    top: 0
    height: 10%
    background: $navbar-bg
    color: white
    display: flex
    align-content: center
    align-items: center
    border-top-left-radius: 5px
    border-top-right-radius: 5px

    .close-icon
      cursor: pointer
      margin-left: 2em
      color: white

      svg
        font-size: 24pt

.fire, .smile
  color: $yellow

.create-profile-fade-enter-active, .create-profile-fade-leave-active
  transition: all .3s ease
.create-profile-fade-enter
  opacity: 0
.create-profile-fade-leave-to
  opacity: 0

@media screen and (max-width: 800px)
  h1
    font-size: 1.5rem
  h2
    font-size: 1.1rem

  .create-profile-fade-enter
    opacity: 0
    transform: translateY(100vh)
  .create-profile-fade-leave-to
    opacity: 0
    transform: translateY(100vh)

  .create-profile
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1400
    padding: 0
    margin: 0

    .modale
      width: 100%
      margin: 0
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      border: 0
      padding: 5%
      border-radius: 0
      box-shadow: none

      .header
        border-radius: 0 ! important

      .band
        margin-top: 1em
        border-top: 1px solid $gray
        border-bottom: 1px solid $gray
        box-shadow: 0 0 25px $light-shadow-gray

        em
          font-size: 0.7em
</style>
