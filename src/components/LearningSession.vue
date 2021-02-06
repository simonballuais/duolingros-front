<template>
  <div class="learning-lesson">
    <Header v-if="currentLearningSession" />
    <CurrentExercise v-if="currentLearningSession" />

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
      ]),
  },
  methods: {
    ...mapActions('learningSession', ['startLearningSession']),
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
</style>
