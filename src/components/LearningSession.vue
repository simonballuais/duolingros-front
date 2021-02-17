<template>
  <div class="learning-lesson">
    <Header v-if="exercisesToDo && exercisesToDo.length > 0" />

    <CurrentExercise v-for="exercise in exercisesToDo"
                    :key="'' + exercise.type + exercise.id"
                    :exercise="exercise"
    />

    <Spinner v-if="!currentLearningSession || submittingSession"
             :big="true"
             :center="true"
    />

    <transition name="page-transition">
      <DailyProgress v-if="showingDailyProgress" />
    </transition>

    <transition name="page-transition">
      <SerieProgress v-if="showingSerieProgress" />
    </transition>

    <transition name="page-transition">
      <EndOfDifficulty v-if="showingEndOfDifficulty" />
    </transition>

    <CurrentCorrection />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Header from './Header.vue'
import CurrentExercise from './CurrentExercise.vue'
import CurrentCorrection from './CurrentCorrection.vue'
import Spinner from './misc/Spinner.vue'
import DailyProgress from './DailyProgress.vue'
import SerieProgress from './SerieProgress.vue'
import EndOfDifficulty from './EndOfDifficulty.vue'

export default {
  name: 'LearningSession',
  props: ['lessonId', 'difficulty'],
  data() {
    return {
      destroyRedirectSubscription: null,
    }
  },
  components: {
    Header,
    CurrentExercise,
    CurrentCorrection,
    Spinner,
    DailyProgress,
    SerieProgress,
    EndOfDifficulty,
  },
  computed: {
    ...mapState(
    'learningSession',
    [
      'currentLearningSession',
      'submittingSession',
      'exercisesToDo',
      'currentCorrection',
      'showingDailyProgress',
      'showingSerieProgress',
      'showingEndOfDifficulty',
    ]),
  },
  methods: {
    ...mapActions(
    'learningSession',
    [
      'startLearningSession',
    ]),
    ...mapActions(
      'security',
      [
        'loadAnonymousUserDataIfNecessary',
      ]
    ),
  },
  created() {
    this.loadAnonymousUserDataIfNecessary()

    this.startLearningSession({
      lessonId: this.lessonId,
      difficulty: this.difficulty,
    })

    this.destroyRedirectSubscription = this.$store.subscribe((mutation) => {
      if (mutation.type === 'learningSession/sessionEnded') {
        setTimeout(() => this.$router.push({name: 'home'}), 500)
      }
    });
  },
  beforeDestroy() {
    this.destroyRedirectSubscription()
  },
}
</script>

<style lang="sass" scoped>
div.learning-lesson
  position: absolute
  top: 0
  left: 0
  height: calc(var(--vh, 1vh) * 100)
  width: 100%
  overflow: hidden
  background: yellow

.page-transition-enter-active, .page-transition-leave-active
  transition: all .3s ease
.page-transition-enter
  transform: translateX(100vw)
.page-transition-leave-to
  opacity: 0
  transform: translateX(-100vw)
</style>
