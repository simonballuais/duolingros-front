<template>
  <div class="current-level-selection">
    <h1>Avez vous déjà commencé à apprendre le malgache ?</h1>

    <button @click="user.currentLevel = 1"
            :class="{selected: user.currentLevel == 1}"
    >
      Pas du tout
    </button>

    <button @click="user.currentLevel = 2"
            :class="{selected: user.currentLevel == 2}"
    >
      Un petit peu
    </button>

    <button @click="user.currentLevel = 3"
            :class="{selected: user.currentLevel == 3}"
    >
      J'ai déjà un certain niveau
    </button>

    <button @click="endCurrentLevelSelection"
            class="submit"
            :disabled="!user.currentLevel"
    >
      Confirmer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Registration',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState(
      'security',
      [
        'user',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['endCurrentLevelSelection']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endCurrentLevelSelection()
      }
      if (e.keyCode === 49) {
        this.user.currentLevel = 1
      }
      if (e.keyCode === 50) {
        this.user.currentLevel = 2
      }
      if (e.keyCode === 51) {
        this.user.currentLevel = 3
      }
      if (e.keyCode === 52) {
        this.user.currentLevel = 4
      }
      if (e.keyCode === 53) {
        this.user.currentLevel = 5
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
div.current-level-selection
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

button
  width: 80%
  margin-left: 10%
  transition: background-color 0.4s ease
  margin-top: 3vh

  &.submit
    position: absolute
    bottom: 5vh
    left: 10%
    margin: 0

  &.selected
    background-color: green
</style>
