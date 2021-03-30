<template>
  <div class="daily-progress">
    <h1>
      {{ user.learningSessionCountThatDay >= 2 ? "Exercices" : "Exercice" }} terminés aujourd'hui&nbsp;: {{ user.learningSessionCountThatDay + 1 }}
    </h1>

    <ProgressBar
        :progress="dailyProgress"
        width="90%"
        left="5%"
        position="relative"
        height="3rem"
        border-radius="1.5rem"
        popper="true"
        color="linear-gradient(50deg, #6e00ff 0, #bb00ff 100%)"
    />

    <transition name="fade">
      <h2 v-if="showObjectiveReached && user.learningSessionCountThatDay <= user.dailyObjective">
        Bravo, vous avez atteint votre objectif quotidien !
      </h2>
      <h2 v-if="showObjectiveReached && user.learningSessionCountThatDay > user.dailyObjective">
        Vous dépassez votre objectif quotidien !
      </h2>
    </transition>

    <button class="submit"
            type="button"
            v-if="showingDailyProgress"
            @click="endDailyProgress"
            >
      Continuer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ProgressBar from './ProgressBar'

export default {
  name: 'DailyProgress',
  components: {
    ProgressBar,
  },
  data() {
    return {
      dailyProgress: 0,
      pop: false,
      showObjectiveReached: false,
    }
  },
  computed: {
    ...mapState('security', ['user']),
    ...mapState('learningSession', ['showingDailyProgress']),
  },
  created() {
    let previousPercentage = 100 * this.user.learningSessionCountThatDay / this.user.dailyObjective
    let percentage = 100 * (this.user.learningSessionCountThatDay + 1) / this.user.dailyObjective

    if (previousPercentage > 100) {
      previousPercentage = 100
    }
    if (previousPercentage < 0) {
      previousPercentage = 0
    }

    if (percentage > 100) {
      percentage = 100
    }

    this.dailyProgress = previousPercentage
    setTimeout(
      () => {
        this.dailyProgress = percentage

        if (this.user.learningSessionCountThatDay >= this.user.dailyObjective - 1) {
          setTimeout(
            () => this.showObjectiveReached = true,
            1000
          )
        }
      },
      100
    )

    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions('learningSession', ['endDailyProgress']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endDailyProgress()
      }
    },
  }
}
</script>

<style lang="sass" scoped>
div.daily-progress
  position: relative
  margin: 0 auto
  top: 0
  left: 0
  overflow: visible
  left: 0
  height: 90%
  max-width: 700px
  padding: 3%

h1, h2
  font-family: 'Ubuntu', sans-serif

h1
  font-size: 1.8rem
  font-weight: bold
  margin-top: 1.5rem
  margin-bottom: 1.5rem

h2
  font-size: 1.3rem
  font-weight: normal
  margin-bottom: 3rem
  margin-top: 1em
  text-align: center

.daily-progress
  height: 100%

button
  position: absolute
  display: block
  width: 90%
  max-width: 400px
  transition: background-color 0.35s
  margin: 0 auto
  background-color: $green
  border: 0
  left: 50%
  transform: translate(-50%, 0)
  color: white
  height: 50px
  border-radius: 25px
  bottom: 5vh

div.progress-container
  left: 15%
  top: 20%
  width: 75%
  background: gray
  height: 5vh
  position: absolute

  .progress
    position: absolute
    background: green
    width: 10%
    height: 100%
    transition: width 0.5s ease-in

  .progress-pop
    left: -2vh
    top: -2vh
    position: absolute
    background: green
    width: calc(100% + 4vh)
    height: calc(100% + 4vh)

.fade-enter-active
  transition: all 0.3s ease

.fade-enter
  opacity: 0
  transform: scale(1.3, 1.3)
</style>
