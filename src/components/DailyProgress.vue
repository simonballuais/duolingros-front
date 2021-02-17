<template>
  <div class="daily-progress">
    <h1>Bravo !</h1>

    <div class="progress-container">
      <transition name="depop">
        <div class="progress-pop" v-if="pop"></div>
      </transition>

      <div class="progress"
           :style="{width: dailyProgress + '%'}"
      ></div>
    </div>

    <div>
      Leçons terminées aujourd'hui : {{ user.learningSessionCountThatDay + 1 }}
    </div>

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

export default {
  name: 'DailyProgress',
  components: {
  },
  data() {
    return {
      dailyProgress: 0,
      pop: false,
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

        if (previousPercentage < 100 && this.dailyProgress >= 100) {
          setTimeout(
            () => {
              this.pop = true
              this.$nextTick(() => this.pop = false)
            },
            500
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
.daily-progress
  height: 100%

button
  width: 80%
  margin-left: 10%
  position: absolute
  bottom: 5vh

div.progress-container
  left: 15%
  top: 10%
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

.depop-leave-active
  transition: opacity 0.5s linear

.depop-leave-to
  opacity: 0
</style>
