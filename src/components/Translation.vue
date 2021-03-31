<template>
  <div>
    <h1>
      Traduisez cette phrase
    </h1>

    <h2 id="sentence">
      {{ translation.text }}
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

    <b-popover target="sentence" placement="bottom" :show.sync="showTranslationHelp"
      >
      <template #title>Traduction</template>
      Vous pouvez voir la traduction d'un mot en cliquant dessus !
      <b-button @click="closeTranslationHelp">
        Ok
      </b-button>
    </b-popover>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { BFormTextarea, BPopover, BButton } from 'bootstrap-vue'

export default {
  computed: {
    ...mapState('learningSession', ['currentCorrection']),
    ...mapState('security', ['user', 'isLoggedIn']),
  },
  components: {
    BFormTextarea,
  },
  data() {
    return {
      proposedAnswer: '',
      showTranslationHelp: false,
    }
  },
  directives: {
    'b-form-textarea': BFormTextarea,
    'b-popover': BPopover,
    'b-button': BButton,
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
    ...mapActions(
      'security',
      [
        'putUserData',
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
    closeTranslationHelp() {
      this.showTranslationHelp = false
      this.user.translationHelpShown = true
      this.putUserData()
    }
  },
  created() {
    window.addEventListener('keyup', this.handleEnterKey)
  },
  mounted () {
    setTimeout(() => this.$refs['answer-input'].focus(), 500)

    if (!this.isLoggedIn && !this.user.translationHelpShown) {
      setTimeout(() => {
        this.showTranslationHelp = true
      }, 1000)
    }
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
  display: inline-block

button
  width: 90%
  max-width: 400px
  margin: 0 auto
  background-color: $green
  left: 50%
  transform: translate(-50%, 0)
  color: white

  &:disabled
    background: $gray

  &.submit,&.end-correction
    position: fixed
    bottom: 5vh

.popover
  border: 1px solid $light-gray

  button
    height: 30px
    border-radius: 15px
    font-size: 1.1em
    transform: none ! important
    margin-top: 1em

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
  outline: none

  &:focus
    border: 0.05em solid $textarea-border
    border-radius: 0
    box-shadow: none ! important
    background: $textarea-bg
    outline: none

</style>
