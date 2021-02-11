<template>
  <div class="learning-lesson">
    <Header v-if="currentLearningSession" />
    <transition name="exercise-fade">
      <CurrentExercise v-for="exercise in exercisesToDo"
                      :key="'' + exercise.type + exercise.id"
                      :exercise="exercise"
      />
    </transition>

    <Spinner v-if="!currentLearningSession || submittingSession"
             :big="true"
             :center="true"
             />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Header from './Header.vue'
import CurrentExercise from './CurrentExercise.vue'
import Spinner from './misc/Spinner.vue'

export default {
  name: 'LearningSession',
  props: ['lessonId', 'difficulty'],
  data() {
    return {
    }
  },
  components: {
    Header,
    CurrentExercise,
    Spinner,
  },
  computed: {
    ...mapState(
    'learningSession',
    [
      'currentLearningSession',
      'submittingSession',
      'exercisesToDo'
      ]),
  },
  methods: {
    ...mapActions(
    'learningSession',
    [
      'startLearningSession',
    ]),
  },
  created() {
    this.startLearningSession({
      lessonId: this.lessonId,
      difficulty: this.difficulty,
    })

    this.$store.subscribe((mutation) => {
      if (mutation.type === 'learningSession/sessionSubmitted') {
        this.$router.push({name: 'home'})
      }
    });
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
</style>

<style lang="sass">
.exercise-fade-enter-active, .exercise-fade-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  transition: all .3s ease
.exercise-fade-enter
  transform: translateX(100vw)
.exercise-fade-leave-to
  transform: translateX(-100vw)
  opacity: 0
</style>
