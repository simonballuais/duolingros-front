<template>
  <div class="main-container">
    <div class="question-content">
    <h1 v-if="question.noPictures">
      Choisissez la bonne traduction
    </h1>

    <h2 v-if="!question.noPictures && !question.direction">
      Comment dit-on «&nbsp;{{ question.text }}&nbsp;»&nbsp;?
    </h2>

    <h2 v-if="!question.noPictures && question.direction">
      Quelle est la traduction de «&nbsp;{{ question.text }}&nbsp;»&nbsp;?
    </h2>

    <h2 v-if="question.noPictures">
      «&nbsp;{{ question.text }}&nbsp;»
    </h2>

    <div class="proposition-container"
         :class="{
            'with-picture': !question.noPictures,
         }"
      >
      <button v-for="proposition in question.propositions"
              type="button"
              :key="proposition.id"
              :class="{
                selected: proposition.id === selectedPropositionId,
                'right-answer': currentCorrection && proposition.id === currentCorrection.correctAnswer,
                'wrong-answer': currentCorrection && proposition.id === selectedPropositionId && currentCorrection.correctAnswer !== selectedPropositionId,
                'with-picture': !question.noPictures,
              }"
              :disabled="currentCorrection"
              @focus="resetButtonFocus"
              @click="selectProposition(proposition.id)"
              class="proposition"
        >

        <img v-if="!question.noPictures"
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

div.main-container
  position: absolute
  top: 0
  left: 0
  height: calc(var(--vh, 1vh) * 100)
  width: 100%
  height: 100%
  overflow: hidden

  div.question-content
    position: relative
    margin: 0 auto
    top: 0
    left: 0
    overflow: hidden
    left: 0
    height: 100%
    max-width: 1000px
    padding: 3%
    display: flex
    flex-flow: column nowrap
    align-items: center

    button
      display: block
      width: 100%
      max-width: 400px
      transition: background 0.35s, color 0.50s, border 0.35s
      background: white
      color: $dark-gray
      height: 50px
      border-radius: 25px
      margin: 1em
      border: 1px solid $light-gray
      background: white

      &.proposition
        padding: 1em
        margin: 0.5em
        border: 1px solid $gray
        display: flex
        align-items: center
        width: 95%
        max-width: 95%

        &.with-picture
          max-width: 95%
          width: 45%
          margin: 2.5%
          height: auto
          padding: 0.5em

          img
            border-radius: 5%

          &.selected
            color: $dark-gray
            background: lighten($violet, 40%)
            border: 0.3em solid $violet

          &.right-answer
            background: $green
            color: white
            border: 0.3em solid $green

          &.wrong-answer
            background: $red
            color: white
            border: 0.3em solid $red

        &.right-answer
          background: $green
          color: white

        &.wrong-answer
          background: $red
          color: white

      &.submit
        position: absolute
        transform: translate(-50%, 0)
        bottom: 5vh
        background-color: $green
        left: 50%
        color: white
        margin: 0

      &:disabled
        background: white
        border: 1px $light-gray
        color: $gray

      &:active
        background: white ! important

      &.selected
        color: white
        background: $violet
        border: 0

div.proposition-container
  display: flex
  flex-flow: column nowrap
  align-content: flex-start
  width: 100%
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

