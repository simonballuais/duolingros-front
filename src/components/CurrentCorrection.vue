<template>
  <transition name="correction-fade">
    <div class="current-correction"
         v-if="currentCorrection" 
         :class="{wrong: !currentCorrection.isCorrect}"
      >
      <h2 v-if="currentCorrection && currentCorrection.isCorrect">
        Correct !
      </h2>

      <h2 v-if="currentCorrection && currentCorrection.isCorrect && currentCorrection.remark"
          v-html="currentCorrection.remark"
          >
      </h2>

      <h2 v-if="currentCorrection && !currentCorrection.isCorrect">
        Réponse :
      </h2>

      <h2 v-if="currentCorrection && !currentCorrection.isCorrect && currentCorrection.correctAnswer"
          v-html="currentCorrection.correctAnswer"
          >
      </h2>

      <button class="end-correction"
              type="button"
              @click="endCorrection"
              v-if="currentCorrection"
        >
        Continuer
      </button>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CurrentCorrection',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState('learningSession', ['currentCorrection']),
  },
  methods: {
    ...mapActions('learningSession', ['endCorrection']),
  },
  created() {

  },
}
</script>

<style lang="sass" scoped>
div.current-correction
  position: fixed
  z-index: 1000
  bottom: 0
  left: 0
  height: 20%
  width: 100%
  background: lightgreen

  &.wrong
    background: red

.correction-fade-enter-active, .correction-fade-leave-active
  transition: all .2s ease
.correction-fade-enter
  transform: translateY(20vh)
.correction-fade-leave-to
  transform: translateX(-100vw)
  opacity: 0
</style>
