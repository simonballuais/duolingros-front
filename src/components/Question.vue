<template>
  <div class="main-container">
    <h1>
      Choisissez la bonne traduction
    </h1>

    <h2>
      {{ question.text }}
    </h2>

    <div class="proposition-container"
         :class="{
            'with-picture': !question.isNoPictures,
         }"
      >
      <button v-for="proposition in question.propositions"
              type="button"
              :key="proposition.id"
              :class="{
                selected: proposition.id === selectedPropositionId,
                'right-answer': currentCorrection && proposition.id === currentCorrection.correctAnswer,
                'wrong-answer': currentCorrection && proposition.id === selectedPropositionId && currentCorrection.correctAnswer !== selectedPropositionId,
              }"
              :disabled="currentCorrection"
              @focus="resetButtonFocus"
              @click="selectProposition(proposition.id)"
              class="proposition"
        >

        <img v-if="!question.isNoPictures"
             :src="proposition.image"
          />

        <span>
          {{ proposition.text }}
        </span>
      </button>
    </div>

    <button class="submit"
            type="button"
            @click="submit"
            :disabled="!selectedPropositionId"
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
    resetButtonFocus() {
      document.activeElement.blur()
    },
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        if (this.currentCorrection) {
          this.endCorrection()
          this.selectedPropositionId = null
        } else if (this.selectedPropositionId) {
          this.submit()
        }
      }
      if (e.keyCode === 49) {
        this.selectedPropositionId = this.question.propositions[0].id
      }
      if (e.keyCode === 50) {
        this.selectedPropositionId = this.question.propositions[1].id
      }
      if (e.keyCode === 51) {
        this.selectedPropositionId = this.question.propositions[2].id
      }
      if (e.keyCode === 52) {
        this.selectedPropositionId = this.question.propositions[3].id
      }
    },
  },
  created() {
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }
}
</script>

<style lang="sass" scoped>
div
  width: 100%
  height: 100%

button
  transition: background-color 0.35s
  width: 80%
  margin-left: 10%

  &.submit,&.end-correction
    position: absolute
    bottom: 5%

div.proposition-container
  display: flex
  flex-flow: column nowrap
  align-content: flex-start
  width: 80%
  height: 10%
  margin-left: 10%
  justify-content: center

  button.proposition
    margin: 0
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    &.selected
      background-color: gold
    &.wrong-answer
      background-color: red
    &.right-answer
      background-color: green
    img
      display: flex
      width: 80%
      height: 80%
    span
      display: flex

  &.with-picture
    flex-flow: row wrap
    button.proposition
      width: 35vw
      height: 35vw
      margin: 2vw
</style>
