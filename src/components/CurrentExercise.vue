<template>
  <transition name="exercise-fade">
    <div class="current-exercise"
         v-if="exercise.id == currentExercise.id"
      >
      <Question v-if="exercise.question"
                :question="exercise"
      />

      <Translation v-if="exercise.translation"
                   :translation="exercise"
      />
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import Question from './Question.vue'
import Translation from './Translation.vue'

export default {
  name: 'CurrentExercise',
  props: ['exercise'],
  data() {
    return {
    }
  },
  components: {
    Question,
    Translation,
  },
  computed: {
    ...mapState(
      'learningSession',
      [
        'currentExercise',
        'showingDailyProgress',
      ]
    ),
  },
  methods: {
    ...mapActions(
      'learningSession',
      [
        'startLearningSession',
        'endDailyProgress',
      ]
    ),
  },
  created() {
  },
}
</script>

<style lang="sass" scoped>
div.current-exercise
  position: relative
  margin: 0 auto
  top: 0
  left: 0
  overflow: hidden
  left: 0
  height: 90%
  max-width: 700px
  padding: 3%

.exercise-fade-enter-active, .exercise-fade-leave-active
  transition: all .3s ease
.exercise-fade-enter
  transform: translateX(100vw)
.exercise-fade-leave-to
  transform: translateX(-100vw)
  opacity: 0
</style>
