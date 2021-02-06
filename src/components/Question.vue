<template>
  <div>
    <h1>
      Choisissez la bonne traduction
    </h1>

    <h2>
      {{ question.text }}
    </h2>

    <button v-for="proposition in question.propositions"
            type="button"
            :key="proposition.id"
            :class="{
              selected: proposition.id === selectedPropositionId,
              'right-answer': currentCorrection && proposition.id === currentCorrection.correctAnswer,
              'wrong-answer': currentCorrection && proposition.id === selectedPropositionId && currentCorrection.correctAnswer !== selectedPropositionId,
            }"
            :disabled="currentCorrection"
            @click="selectProposition(proposition.id)"
            class="proposition"
      >
      {{ proposition.text }}
    </button>

    <button class="submit"
            type="button"
            @click="submit"
            :disabled="!selectedPropositionId"
      >
      Valider
    </button>

    <button class="end-correction"
            type="button"
            @click="goToNextExercise"
            v-if="currentCorrection"
      >
      Continuer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState('learningSession', ['currentCorrection']),
  },
  data() {
    return {
      selectedPropositionId: null,
    }
  },
  props: [
    'question',
  ],
  methods: {
    ...mapActions(
      'learningSession',
      [
        'submitAnswer',
        'endCorrection',
      ]
    ),
    selectProposition(id) {
      window.console.log('coucou')
      if (id === this.selectedPropositionId) {
        this.selectedPropositionId = null
        return
      }

      this.selectedPropositionId = id
    },
    preventDefault(e) {
      e.preventDefault()
    },
    submit() {
      this.submitAnswer({answer: this.selectedPropositionId})
    },
    goToNextExercise() {
      this.endCorrection()
      this.selectedPropositionId = null
    },
    handleEnterKey(e) {
      e.preventDefault()
      window.console.log('pouet')

      if (e.keyCode === 13) {
        if (this.currentCorrection) {
          this.endCorrection()
        } else if (this.selectedPropositionId) {
          this.submit()
        }
      }
    },
  },
  created() {
    window.addEventListener('keyup', this.handleEnterKey)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleEnterKey)
  }
}
</script>

<style lang="sass" scoped>
div
  width: 100%
  height: 100%

button
  display: block
  width: 80%
  margin-left: 10%
  transition: background-color 0.35s

  &.proposition
    &.selected
      background-color: gold
    &.wrong-answer
      background-color: red
    &.right-answer
      background-color: green

  &.submit,&.end-correction
    position: absolute
    bottom: 5%
</style>
