<template>
  <div class="intensity-selection">
    <h1>Combien de temps par jour voulez-vous y consacrer ?</h1>

    <button @click="user.dailyObjective = 1"
            :class="{selected: user.dailyObjective == 1}"
    >
      5 minutes
    </button>

    <button @click="user.dailyObjective = 2"
            :class="{selected: user.dailyObjective == 2}"
    >
      10 minutes
    </button>

    <button @click="user.dailyObjective = 3"
            :class="{selected: user.dailyObjective == 3}"
    >
      20 minutes
    </button>

    <button @click="user.dailyObjective = 4"
            :class="{selected: user.dailyObjective == 4}"
    >
      30 minutes
    </button>

    <button @click="user.dailyObjective = 5"
            :class="{selected: user.dailyObjective == 5}"
    >
      Une heure
    </button>

    <button @click="endIntensitySelection"
            class="submit"
            :disabled="!user.dailyObjective"
    >
      Confirmer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'IntensitySelection',
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
    ...mapActions('registration', ['endIntensitySelection']),
    handleKeyUp(e) {
      if (e.keyCode === 13 && this.user.dailyObjective) {
        this.endIntensitySelection()
      }
      if (e.keyCode === 49) {
        this.user.dailyObjective = 1
      }
      if (e.keyCode === 50) {
        this.user.dailyObjective = 2
      }
      if (e.keyCode === 51) {
        this.user.dailyObjective = 3
      }
      if (e.keyCode === 52) {
        this.user.dailyObjective = 4
      }
      if (e.keyCode === 53) {
        this.user.dailyObjective = 5
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
div.intensity-selection
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
