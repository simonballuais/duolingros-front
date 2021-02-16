<template>
  <div class="current-level-selection">
    <h1>Avez vous déjà commencé à apprendre le malgache ?</h1>

    <button @click="userInfos.currentLevel = 1"
            :class="{selected: userInfos.currentLevel == 1}"
    >
      Pas du tout
    </button>

    <button @click="userInfos.currentLevel = 2"
            :class="{selected: userInfos.currentLevel == 2}"
    >
      Un petit peu
    </button>

    <button @click="userInfos.currentLevel = 3"
            :class="{selected: userInfos.currentLevel == 3}"
    >
      J'ai déjà un certain niveau
    </button>

    <button @click="endCurrentLevelSelection"
            class="submit"
            :disabled="!userInfos.currentLevel"
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
      'registration',
      [
        'userInfos',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['endCurrentLevelSelection']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endCurrentLevelSelection()
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
