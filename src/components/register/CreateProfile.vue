<template>
  <transition name="create-profile-fade">
  <div class="create-profile" v-if="show">
    <div class="modale">
      <button @click="cancelCreateProfile">
        X
      </button>

      <h1>Créer un profil</h1>

      <TextInput v-model="profileData.email"
                 placeholder="Email"
      />
      <TextInput v-model="profileData.username"
                 placeholder="Pseudo (facultatif)"
      />
      <TextInput v-model="profileData.password"
                 placeholder="Choisissez un mot de passe"
                 type="password"
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
  },
  computed: {
    ...mapState(
      'security',
      [
        'user',
      ]
    ),
    ...mapState('registration', ['profileData']),
  },
  methods: {
    ...mapActions('registration', ['cancelCreateProfile', 'submitRegistration']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.submitProfile()
      }
      if (e.keyCode === 27) {
        this.cancelCreateProfile()
      }
    },
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
