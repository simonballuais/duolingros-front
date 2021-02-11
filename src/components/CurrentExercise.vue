<template>
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
    ...mapState('learningSession', ['currentExercise']),
  },
  methods: {
    ...mapActions('learningSession', ['startLearningSession']),
  },
  created() {
  },
}
</script>

<style lang="sass" scoped>
div.current-exercise
  position: absolute
  top: 10%
  left: 0
  height: 90%
  width: 100%
</style>
