<template>
  <transition name="settings-modale-fade">
  <div class="settings-modale" v-if="show">
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
          <b-form-group label="Objectif quotidien :">
            <b-form-radio-group
              id="btn-radios-3"
              v-model="user.dailyObjective"
              :options="[1, 2, 3, 4, 5]"
              name="radio-btn-stacked"
              size="lg"
              @change="handleChange"
              style="margin-left: 2em"
              buttons
             ></b-form-radio-group>
          </b-form-group>

        <b-button @click="logout"
                  v-if="isLoggedIn"
                  style="margin-left: 15px"
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
import { BFormRadioGroup, BFormGroup } from 'bootstrap-vue'

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
    BFormGroup,
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
    'b-form-group': BFormGroup,
  },
  methods: {
    ...mapActions('registration', ['cancelCreateProfile', 'submitRegistration']),
    ...mapActions('security', ['logout', 'putUserData']),
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
  font-size: 1.5rem

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

    .content
      display: flex
      flex-flow: column nowrap
      align-items: center
      justify-content: space-around
      position: absolute
      bottom: 0
      top: 10%
      left: 0
      right: 0
      background: linear-gradient( to bottom left, #FFF 50%, #F5F5F5 100% )

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
    font-size: 1.3rem
  legend
    font-size: 1.3rem
</style>
