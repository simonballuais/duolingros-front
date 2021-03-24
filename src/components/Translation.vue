<template>
  <div>
    <h1>
      Traduisez cette phrase
    </h1>

    <h2>
      {{ translation.text }}
      Une grosse courgette court très fort entre les deux couleurs, plus qu'un téton
    </h2>

    <b-form-textarea
        v-model="proposedAnswer"
        @keyup.enter="submitOrNext"
        ref="answer-input"
        size="lg"
        placeholder="Votre réponse"
        class="answer"
        :class="{
          'right-answer': currentCorrection && currentCorrection.isCorrect,
          'wrong-answer': currentCorrection && !currentCorrection.isCorrect,
        }"
      >
    </b-form-textarea>

    <button class="submit"
            type="button"
            :disabled="!proposedAnswer"
            @click="submitOrNext"
      >
      Valider
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { BFormTextarea } from 'bootstrap-vue'

export default {
  computed: {
    ...mapState('learningSession', ['currentCorrection']),
  },
  components: {
    BFormTextarea,
  },
  data() {
    return {
      proposedAnswer: '',
    }
  },
  directives: {
    'b-form-textarea': BFormTextarea,
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
      this.proposedAnswer = this.proposedAnswer.replace(/\n/, '')

      if (!this.currentCorrection) {
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
  mounted () {
    setTimeout(() => this.$refs['answer-input'].focus(), 500)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleEnterKey)
  }
}
</script>

<style lang="sass" scoped>
h1, h2
  font-family: 'Ubuntu', sans-serif

h1
  font-size: 1.8rem
  font-weight: bold
  margin-top: 1.5rem
  margin-bottom: 1.5rem

h2
  font-size: 1.3rem
  font-weight: normal
  margin-bottom: 1.5rem

div
  width: 100%
  height: 100%

button
  position: absolute
  display: block
  width: 90%
  max-width: 400px
  transition: background-color 0.35s
  margin: 0 auto
  background-color: $green
  border: 0
  left: 50%
  transform: translate(-50%, 0)
  color: white
  height: 50px
  border-radius: 25px

  &:disabled
    background: $gray

  &.submit,&.end-correction
    position: fixed
    bottom: 5vh

.answer
  width: 100%
  resize: none
  transition: background-color 0.5s
  background-color: white
  padding: 0.25em
  height: 100%
  max-height: 200px
  background: $textarea-bg
  font-family: 'Ubuntu', sans-serif
  border: 0.05em solid $textarea-border
  border-radius: 0

  &:focus
    background: $textarea-bg
    border: 0.05em solid $textarea-border
    outline: none
</style>
