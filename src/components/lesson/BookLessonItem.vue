<template>
  <div class="main-container">
    <b-card :title="bookLesson.title"
            style="width: 100%; height: 100%"
            @click="emitClickIfPossible"
            :style="{
              'border-bottom-left-radius': expanded ? '0' : '0.25rem',
              'border-bottom-right-radius': expanded ? '0' : '0.25rem',
            }"
            >
      <b-card-text>
        <ProgressBar :progress="bookLesson.progress ? 100 * (bookLesson.progress.cycleProgression / bookLesson.progress.totalLessonCount) : '0'"
              width="100%"
              height="2vh"
              />
      </b-card-text>
      <div class="disabler" v-if="disabled"></div>
    </b-card>

    <transition name="slide">
      <footer v-if="expanded"
              >
        <b-container class="bv-example-row">
          <b-row style="margin-top: 0;">
            <b-col style="text-align: left; display: flex; align-items: center">
              <span v-if="bookLesson.progress">
                {{ bookLesson.progress.totalLessonCount * (bookLesson.progress.difficulty - 1) + bookLesson.progress.cycleProgression }}
                /
                {{ bookLesson.progress.totalLessonCount * 5 }}
                exercices
              </span>
              <span v-if="!bookLesson.progress">
                Leçon pas encore commencée
              </span>
            </b-col>
            <b-col style="text-align: right">
              <router-link :to="{
                      name: 'learning-session',
                      params: {
                        lessonId: bookLesson.progress ? bookLesson.progress.currentLessonId : bookLesson.lessonList[0].id,
                        difficulty: bookLesson.progress ? bookLesson.progress.difficulty : 1
                      }
                    }"
                  v-slot="{href, route, navigate, isActive, isExactActive}"
                >
                  <b-button :href="href" variant="primary">Commencer</b-button>
              </router-link>
            </b-col>
          </b-row>
        </b-container>
      </footer>
    </transition>
  </div>
</template>

<script>
import ProgressBar from './../ProgressBar'
import { BCard, BCardText, BButton, BContainer, BRow, BCol } from 'bootstrap-vue'

export default {
  name: 'BookLessonItem',
  props: {
    'bookLesson': null,
    'disabled': {
      type: Boolean,
      default: false,
    },
    'expanded': {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClickIfPossible(e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
  },
  components: {
    ProgressBar,
    BCard,
    BButton,
    BCardText,
    BContainer,
    BRow,
    BCol,
  },
  directives: {
  'b-card': BCard ,
  'b-card-text': BCardText,
  'b-button': BButton,
  'b-container': BContainer,
  'b-row': BRow,
  'b-col': BCol,
}
}
</script>

<style lang="sass" scoped>
.slide-enter-active, .slide-leave-active
  transition: all .2s ease
.slide-enter, .slide-leave-to
  height: 0
  padding-top: 0
  padding-bottom: 0
  opacity: 0

div.book-element
  margin-top: 5vh

.disabled
  color: darkgray
  background-color: gray

a:hover
  text-decoration: none

.disabler
  background-color: #EEE
  opacity: 0.5
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  cursor: initial

.main-container
  max-width: 550px
  display: block
  width: 100%
  margin: auto
  margin-top: 1vh
  cursor: pointer

footer
  height: 4em
  overflow: hidden
  border: 1px solid rgba(0, 0, 0, 0.125)
  padding: 0.75rem 1.25rem
  background-color: rgba(0, 0, 0, 0.03)
  border-top: 0
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px)
</style>
