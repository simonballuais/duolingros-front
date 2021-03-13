<template>
  <transition name="profile-created">
  <div class="create-profile" v-if="show">
    <div class="modale">
      <h1>Profile créé avec succès !</h1>

      <button @click="endShowingCreatedProfile"
                 class="submit"
                 >
                 Continuer
      </button>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

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
  computed: {
    ...mapState('registration', ['showingProfileCreated']),
  },
  methods: {
    ...mapActions('registration', ['endShowingCreatedProfile']),
    handleKeyUp(e) {
      if (e.keyCode === 13 || e.keyCode === 27) {
        this.endShowingCreatedProfile()
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

.profile-created-enter-active, .profile-created-leave-active
  transition: all .3s ease
.profile-created-enter
  transform: translateY(100vh)
  opacity: 0
.profile-created-leave-to
  transform: translateY(100vh)
  opacity: 0
</style>
