<template>
  <div>
    <h2 @click="toggleFold">Difficulty {{ difficulty }}</h2>
    <div class="difficulty-group" :class="{ folded }">
      <h3>
        Translations
        <Button class="btn btn-outline-success ml-1"
                @click="addTranslation(difficulty)"
                spinWhenClicked
                >
          <font-awesome-icon icon="plus" />
        </Button>
      </h3>

      <transition-group name="translation-list" tag="div">
        <TranslationDetails v-for="(translation, translationIndex) in getTranslationsOfDifficulty(difficulty)"
                            :key="`${translation.id}-${translation.frontId}`"
                            :translation="translation"
                            @change="$emit('change')"
                            @removeRequest="removeTranslation(translation.id)"
        />

      </transition-group>


      <h3>
        Questions
        <Button class="btn btn-outline-success ml-1"
                @click="addQuestion(difficulty)"
                spinWhenClicked
                >
          <font-awesome-icon icon="plus" />
        </Button>
      </h3>

      <transition-group name="question-list" tag="div">
        <QuestionDetails v-for="(question, questionIndex) in getQuestionsOfDifficulty(difficulty)"
                            :key="`${question.id}-${question.frontId}`"
                            :question="question"
                            @change="$emit('change')"
                            @removeRequest="removeQuestion(question.id)"
        />
      </transition-group>
    </div>

    <hr />
  </div>
</template>

<script>
import {mapActions} from 'vuex'

import TranslationDetails from '../translation/TranslationDetails'
import QuestionDetails from '../question/QuestionDetails'
import Button from '../form/Button'

export default {
  name: 'LessonDetails',
  components: {
    TranslationDetails,
    QuestionDetails,
    Button,
  },
  data() {
    return {
      folded: false,
    }
  },
  props: {
    'lesson': {
      type: Object,
      default: null,
    },
    'difficulty': {
      type: Number,
      default: 1,
    },
  },
  methods: {
    ...mapActions(
      'lesson',
      [
        'saveQuestion',
        'saveTranslation',
        'deleteQuestion',
        'deleteTranslation',
      ]
    ),
    getTranslationsOfDifficulty(difficulty) {
      return this.lesson.translations.slice().filter(
        (a) => a.difficulty === difficulty
      )
    },
    getQuestionsOfDifficulty(difficulty) {
      return this.lesson.questions.slice().filter(
        (a) => a.difficulty === difficulty
      )
    },
    addTranslation(difficulty) {
      this.saveTranslation({translation: {
        lesson: '/api/lessons/' + this.lesson.id,
        text: '',
        difficulty: difficulty,
      }})
    },
    addQuestion(difficulty) {
      this.saveQuestion({question: {
        lesson: '/api/lessons/' + this.lesson.id,
        text: '',
        difficulty: difficulty,
      }})
    },
    removeQuestion(id) {
      this.deleteQuestion({id})
    },
    removeTranslation(id) {
      this.deleteTranslation({id})
    },
    toggleFold() {
      this.folded = !this.folded
    }
  },
}
</script>

<style lang="sass" scoped>
h2
  padding: 5px
  margin-top: 5px
  cursor: pointer

h3
  margin-bottom: 24px
  color: #555

.translation-list-move
  transition: transform 1s

.question-list-move
  transition: transform 1s

canvas
  display: none

div.difficulty-group
  margin-left: 16px
  transition: transform 0.5s, max-height 1s
  overflow: hidden
  transform-origin: top
  max-height: 2000px

  &.folded
    transform: scaleY(0)
    max-height: 0px
</style>
