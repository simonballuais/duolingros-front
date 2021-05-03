<template>
  <div>
    <h1>
      Traduisez cette phrase
    </h1>

    <h2 id="sentence"
        v-html="textWithHelp"
        >
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

    <b-popover target="sentence"
               placement="bottom"
               :show.sync="showTranslationHelp"
               triggers="manual"
      >
      <template #title>Dictionnaire</template>
      Vous pouvez voir la traduction d'un mot en le survolant !
      <b-button @click="closeTranslationHelp">
        Ok
      </b-button>
    </b-popover>

    <b-popover placement="bottom"
               triggers="hover"
               v-for="p in helpPopovers"
               :key="p.key"
               :target="'help-translation-' + p.key"
      >
        <p v-for="(v, i) in p.values"
           :key="i"
           class="translation-help-element"
           >
           {{ v }}
        </p>
    </b-popover>

    <div class="super-edit" v-if="user.superAdmin">
      <input v-model="translation.text" style="width: 100%;" @keyup="updateTextWithHelp">
      <hr>
      <div v-for="(answer, i) in translation.answers" :key="i">
        <input  v-model="translation.answers[i]" style="width: 100%;">
      </div>

      <br>
      <button style="transform: none;" @click="pushUpdate">go</button>
      <br>
      <button style="transform: none;" @click="submitCurrentAnswer">resub</button>
    </div>
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
      destroyCorrectionEndedSubsription: null,
      textWithHelp: null,
      helpPopovers: [],
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
        'updateTranslation',
      ]
    ),
    ...mapActions(
      'security',
      [
        'putUserData',
      ]
    ),
    submitCurrentAnswer() {
        this.submitAnswer({answer: this.proposedAnswer})
    },
    submitOrNext() {
      this.proposedAnswer = this.proposedAnswer.replace(/\n/, '')

      if (!this.currentCorrection) {
        this.submitCurrentAnswer()
      } else {
        this.endCorrection()
        this.proposedAnswer = null
      }
    },
    closeTranslationHelp() {
      this.showTranslationHelp = false
      this.user.translationHelpShown = true
      this.putUserData()
    },
    pushUpdate() {
      this.updateTranslation(
        {
          translationId: this.translation.id,
          text: this.translation.text,
          answers: this.translation.answers,
        }
      )
    },
    updateTextWithHelp() {
      this.textWithHelp = this.translation.text
      this.textWithHelp = this.textWithHelp.charAt(0).toUpperCase() + this.textWithHelp.slice(1)
      this.helpPopovers = []

      for (const [key, values] of Object.entries(this.translation.words)) {
        const regex = new RegExp(key, 'i')
        let printedKey = key
        const replacedVersion = this.textWithHelp.replace(
          regex,
          "<span class=\"word-with-translation\" id=\"help-translation-" + key + "\">" + key + "</span>"
        )

        if (this.textWithHelp.charAt(0) != replacedVersion.charAt(0)) {
          printedKey = printedKey.charAt(0).toUpperCase() + printedKey.slice(1)
        }

        this.textWithHelp = this.textWithHelp.replace(
          regex,
          "<span class=\"word-with-translation\" id=\"help-translation-" + key + "\">" + printedKey + "</span>"
        )

        this.helpPopovers.push({key, values})
      }
    },
  },
  created() {
    window.addEventListener('keyup', this.handleEnterKey)
    this.destroyCorrectionEndedSubsription = this.$store.subscribe((mutation) => {
      if (mutation.type === 'learningSession/correctionEnded') {
        this.proposedAnswer = ''
      }
    });

    this.updateTextWithHelp()
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
    this.destroyCorrectionEndedSubsription()
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
  margin-bottom: 12pt

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

p.translation-help-element
  margin: 0
  font-size: 12pt
  text-align: center
  padding: 4pt

  &:not(:last-child)
    border-bottom: 1px solid $light-gray

.super-edit
  position: fixed
  right: 0
  top: 200px
  width: 400px
  height: 500px
  background: #AA1144

@media screen and (max-width: 800px)
  h2
    user-select: none
</style>
