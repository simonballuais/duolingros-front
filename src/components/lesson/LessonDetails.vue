<template>
  <div>
    <canvas id="pasteCanvas" width="256" height="256"></canvas>

    <div class="d-flex pt-3 pb-2 border-bottom align-items-center">
      <TextInput :placeholder="'Title'"
         v-model="currentLesson.title"
         @input="handleChange()"
         :big="true"
      />
      <button class="btn btn-outline-primary ml-2"
              @click="undoCurrentLesson"
              :disabled="!lessonUndoable"
              >
        <font-awesome-icon icon="undo" />
      </button>

      <button class="btn btn-outline-secondary ml-2"
              v-if="!status.savingLesson"
              @click="undoCurrentLesson"
              disabled
              >
        <font-awesome-icon icon="save" />
      </button>
      <Spinner v-if="status.savingLesson" />
    </div>

    <Form>
      <div class="input-group">
        <div class="input-group-prepend flex-grow-1">
          <TextInput placeholder="Description"
                     v-model="currentLesson.description"
                     @keyup="handleChange()"
                     />
        </div>

        <TextInput placeholder="Exercise per study"
                   v-model.number="currentLesson.exercisePerStudy"
                   type="number"
                   @keyup="handleChange()"
                   />
      </div>

      <DifficultyGroup v-for="difficulty in 5"
                       :key="difficulty"
                       :difficulty="difficulty"
                       :lesson="currentLesson"
                       @change="handleChange"
                       />
    </Form>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import _ from 'lodash'

import Form from '../form/Form'
import TextInput from '../form/TextInput'
import Spinner from '../misc/Spinner'
import DifficultyGroup from '../lesson/DifficultyGroup'

export default {
  name: 'LessonDetails',
  components: {
    Form,
    TextInput,
    Spinner,
    DifficultyGroup,
  },
  computed: {
    ...mapState(
      'lesson',
      ['status', 'currentLesson', 'lessonUndoable']
    ),
  },
  methods: {
    ...mapActions(
      'lesson',
      [
        'saveCurrentLesson',
        'undoCurrentLesson',
      ]
    ),
    handleChange: _.debounce(function () {
      this.saveCurrentLesson()
    }, 1000),
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'lesson/questionSaved') {
        window.console.log('COCUOC question')
      }
    });
  }
}
</script>

<style lang="sass">
.spinner-container
  margin: 0 8px 0 8px
</style>

<style lang="sass" scoped>
h2
  padding: 5px
  margin-top: 5px
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
</style>
