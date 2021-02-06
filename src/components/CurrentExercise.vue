<template>
  <div class="current-exercise">
    <Question v-if="currentExercise.question"
              :question="currentExercise"
    />

    <Translation v-if="currentExercise.translation"
                 :translation="currentExercise"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import Question from './Question.vue'
import Translation from './Translation.vue'

export default {
  name: 'CurrentExercise',
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
  background: yellow
</style>
