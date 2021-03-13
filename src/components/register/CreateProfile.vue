<template>
  <transition name="create-profile-fade">
  <div class="create-profile" v-if="show">
    <div class="modale">
      <button @click="cancelCreateProfile">
        X
      </button>

      <Spinner v-if="submittingProfile"
               :big="true"
               :center="true"
               ></Spinner>

      <h1>Créer un profil</h1>

      <TextInput v-model="profileData.email"
                 placeholder="Email"
                 :disabled="submittingProfile"
      />
      <TextInput v-model="profileData.username"
                 placeholder="Pseudo (facultatif)"
                 :disabled="submittingProfile"
      />
      <TextInput v-model="profileData.password"
                 placeholder="Choisissez un mot de passe"
                 type="password"
                 :disabled="submittingProfile"
      />

      <button @click="submitRegistration"
                 class="submit"
                 :disabled="!profileData.email || !profileData.password"
                 >
                 Créer le compte
      </button>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import TextInput from '../form/TextInput'
import Spinner from './../misc/Spinner'

export default {
  name: 'IntensitySelection',
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
    TextInput,
    Spinner,
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

.create-profile-fade-enter-active, .create-profile-fade-leave-active
  transition: all .3s ease
.create-profile-fade-enter
  opacity: 0
.create-profile-fade-leave-to
  opacity: 0
</style>
