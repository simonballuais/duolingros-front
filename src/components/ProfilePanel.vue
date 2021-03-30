<template>
  <transition name="profile-panel-fade">
    <div class="profile-panel" v-if="show">
      <div class="modale">
        <div class="content">
          <div class="band">
            <h2>Adresse email :</h2>
            <TextInput v-model="user.email"
                       placeholder="Email"
                       @keyup="handleChange($event)"
            />

            <h2>Nom d'utilisateur :</h2>
            <TextInput v-model="user.nickname"
                       placeholder="Nom d'utilisateur"
                       @keyup="handleChange($event)"
            />
          </div>
        </div>

        <div class="header">
          <div @click="$emit('closeMe')" class="close-icon">
            <font-awesome-icon class="times" icon="times"/>
          </div>

          <h1>
            Profil
          </h1>
        </div>

        <div class="footer">
          <b-button @click="saveUserData(user)">
            Sauvegarder
            <Spinner inline="true" small="true" v-if="puttingUserData" />
            <font-awesome-icon class="save" icon="save" v-if="formModified" />
            <font-awesome-icon class="check" icon="check" v-if="putUserDataSuccess && !formModified" />
          </b-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import {mapState, mapActions} from 'vuex'
import TextInput from './form/TextInput'
import Spinner from './misc/Spinner'

export default {
  name: 'ProfilePanel',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TextInput,
    Spinner,
  },
  computed: {
    ...mapState(
      'security',
      [
        'user',
        'puttingUserData',
        'putUserDataError',
        'putUserDataSuccess',
      ]
    ),
  },
  created() {
    history.pushState(null, null, null);
    window.addEventListener('popstate', this.convertPopStateToClose)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.convertPopStateToClose)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  directives: {
    'b-button': BButton,
  },
  data() {
    return {
      formModified: false,
    }
  },
  methods: {
    ...mapActions('security', ['putUserData']),
    saveUserData() {
      this.formModified = false
      this.putUserData(this.user)
    },
    convertPopStateToClose() {
      if (!this.show) {
        return
      }

      history.pushState(null, null, null);
      this.$emit('closeMe')
    },
    handleChange(e) {
      this.formModified = true

      if (e.keyCode === 13) {
        this.saveUserData()
      }
    },
    handleKeyUp(e) {
      if (e.keyCode === 27) {
        this.$emit('closeMe')
      }
    },
  }
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

.profile-panel
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
    width: 90%
    max-width: 200px
    transition: background-color 0.35s
    background-color: $green
    color: white

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

.profile-panel-fade-enter-active, .profile-panel-fade-leave-active
  transition: all .3s ease
.profile-panel-fade-enter
  opacity: 0
.profile-panel-fade-leave-to
  opacity: 0

@media screen and (max-width: 800px)
  h1
    font-size: 1.5rem
  h2
    font-size: 1.1rem

  .profile-panel-fade-enter
    opacity: 0
    transform: translateY(100vh)
  .profile-panel-fade-leave-to
    opacity: 0
    transform: translateY(100vh)

  .profile-panel
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

</style>
