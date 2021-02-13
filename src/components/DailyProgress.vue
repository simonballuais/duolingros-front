<template>
  <div class="daily-progress">
    <h1>Bravo !</h1>

    <div class="progress-container">
      <div class="progress"
           :style="{width: dailyProgress + '%'}"
      ></div>
    </div>

    <div>
      Leçons terminées aujourd'hui : {{ user.learningSessionCountThatDay }}
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
    setTimeout(() => this.dailyProgress = percentage, 100)

    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions('learningSession', ['endDailyProgress']),
    convertPopStateToClose() {
      if (!this.show) {
        return
      }

      history.pushState(null, null, null);
      this.$emit('closeMe')
    },
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
  width: 75%
  background: gray
  height: 5vh

  .progress
    position: relative
    background: green
    width: 10%
    height: 100%
    transition: width 0.5s ease-in
</style>
