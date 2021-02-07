<template>
  <div>
    <h1>
      Traduisez :
    </h1>

    <h2>
      {{ translation.text }}
    </h2>

    <textarea v-model="proposedAnswer"
              @keyup.enter="submitOrNext"
              :class="{
                'right-answer': currentCorrection && currentCorrection.isCorrect,
                'wrong-answer': currentCorrection && !currentCorrection.isCorrect,
              }"
      >
    </textarea>

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

    <button class="submit"
            type="button"
            @click="submitOrNext"
            :disabled="!proposedAnswer"
      >
      Valider
    </button>

    <button class="end-correction"
            type="button"
            @click="submitOrNext"
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
      proposedAnswer: '',
    }
  },
  props: [
    'translation',
  ],
  methods: {
    ...mapActions(
      'learningSession',
      [
        'submitAnswer',
        'endCorrection',
      ]
    ),
    submitOrNext() {
      if (!this.currentCorrection) {
        this.proposedAnswer = this.proposedAnswer.replace(/\n/, '')
        this.submitAnswer({answer: this.proposedAnswer})
      } else {
        this.endCorrection()
        this.proposedAnswer = null
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

textarea
  width: 80%
  margin-left: 10%
  resize: none
  transition: background-color 0.5s
  background-color: white

  &.wrong-answer
    background-color: red

  &.right-answer
    background-color: green
</style>
