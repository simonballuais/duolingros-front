<template>
  <div class="daily-progress">
    <h1>Bravo !</h1>

    <div>
      Todo : blabla cap de difficulté passé
    </div>

    <button class="submit"
            type="button"
            v-if="showingEndOfDifficulty"
            @click="endEndOfDifficulty"
            >
            Continuer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'EndOfDifficulty',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('security', ['user']),
    ...mapState('learningSession', ['showingEndOfDifficulty']),
  },
  created() {
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions('learningSession', ['endEndOfDifficulty']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endEndOfDifficulty()
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
