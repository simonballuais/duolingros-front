<template>
  <div class="intensity-selection">
    <h1>Combien de temps par jour voulez-vous y consacrer ?</h1>

    <button @click="userInfos.intensity = 1"
            :class="{selected: userInfos.intensity == 1}"
    >
      5 minutes
    </button>

    <button @click="userInfos.intensity = 2"
            :class="{selected: userInfos.intensity == 2}"
    >
      10 minutes
    </button>

    <button @click="userInfos.intensity = 3"
            :class="{selected: userInfos.intensity == 3}"
    >
      20 minutes
    </button>

    <button @click="userInfos.intensity = 4"
            :class="{selected: userInfos.intensity == 4}"
    >
      30 minutes
    </button>

    <button @click="userInfos.intensity = 5"
            :class="{selected: userInfos.intensity == 5}"
    >
      Une heure
    </button>

    <button @click="endIntensitySelection"
            class="submit"
            :disabled="!userInfos.intensity"
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
      'registration',
      [
        'userInfos',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['endIntensitySelection']),
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
