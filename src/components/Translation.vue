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

    <button class="submit"
            type="button"
            @click="submitOrNext"
            :disabled="!proposedAnswer"
      >
      Valider
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
      ]
    ),
    submitOrNext() {
      if (!this.currentCorrection) {
        this.proposedAnswer = this.proposedAnswer.replace(/\n/, '')
        this.submitAnswer({answer: this.proposedAnswer})
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
    position: fixed
    bottom: 5vh
    height: 50px

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
