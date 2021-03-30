<template>
  <transition name="settings-modale-fade">
    <div class="settings-modale" v-if="show" @click="handleClick">
      <div class="modale">
        <div class="header">
          <div @click="$emit('closeMe')" class="close-icon">
            <font-awesome-icon class="times" icon="times"/>
          </div>

          <h1>
            Réglages
          </h1>
        </div>


        <div class="content">
          <div class="band">
            <h2>Objectif quotidien :</h2>

            <b-form-radio-group
              id="btn-radios-3"
              v-model="user.dailyObjective"
              :options="[1, 2, 3, 4, 5]"
              name="radio-btn-stacked"
              size="lg"
              @change="handleChange"
              style="text-align: center; width: 100%;"
              buttons
             ></b-form-radio-group>
          </div>
        </div>

        <div class="footer">
          <b-button @click="logout"
                    v-if="isLoggedIn"
                    style="margin-left: 15px"
                    id="logout"
          >
            Se déconnecter
            <font-awesome-icon class="sign-out-alt" icon="sign-out-alt"/>
          </b-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash'
import {mapState, mapActions} from 'vuex'
import { BFormRadioGroup, BButton } from 'bootstrap-vue'

export default {
  name: 'Settings',
  data() {
    return {
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BFormRadioGroup,
    BButton,
  },
  computed: {
    ...mapState(
      'security',
      [
        'user',
        'isLoggedIn',
      ]
    ),
    ...mapState('registration', ['profileData', 'submittingProfile']),
  },
  directives: {
    'b-form-radio-group': BFormRadioGroup,
    'b-button': BButton,
  },
  methods: {
    ...mapActions('registration', ['cancelCreateProfile', 'submitRegistration']),
    ...mapActions('security', ['logout', 'putUserData']),
    handleClick() {
      window.console.log('COUCO')
    },
    handleChange: _.debounce(function () {
      this.putUserData(this.user)
    }, 500),
    handleKeyUp(e) {
      if (e.keyCode === 27) {
        window.removeEventListener('keyup', this.handleKeyUp)
        this.$emit('closeMe')
      }
    },
    convertPopStateToClose() {
      if (!this.show) {
        return
      }

      history.pushState(null, null, null);
      this.$emit('closeMe')
    },
  },
  created() {
    window.addEventListener('keyup', this.handleKeyUp)
    history.pushState(null, null, null);
    window.addEventListener('popstate', this.convertPopStateToClose)
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

h2, legend
  font-size: 1.3rem

.settings-modale
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

    .header
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

    .footer
      position: absolute
      display: flex
      align-items: center
      justify-content: center
      left: 0
      right: 0
      bottom: 0
      height: 10%

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

    button
      width: 90%
      max-width: 200px
      background-color: $green
      color: white

      &:hover
        background-color: darken($green, 5%)

.settings-modale-fade-enter-active, .settings-modale-fade-leave-active
  transition: all .3s ease
.settings-modale-fade-enter
  opacity: 0
.settings-modale-fade-leave-to
  opacity: 0

@media screen and (max-width: 800px)
  h1
    font-size: 1.5rem
  h2
    font-size: 1.1rem

  .footer
    height: 15% ! important

  .settings-modale-fade-enter
    opacity: 0
    transform: translateX(100vw)
  .settings-modale-fade-leave-to
    opacity: 0
    transform: translateX(100vw)

  .settings-modale
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
