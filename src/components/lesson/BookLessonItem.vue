<template>
  <div class="main-container">
    <b-card title-tag="title"
            style="width: 100%; height: 100%"
            @click="emitClickIfPossible"
            :style="{
              'border-bottom-left-radius': expanded ? '0' : '0.25rem',
              'border-bottom-right-radius': expanded ? '0' : '0.25rem',
            }"
            >
      <template #title>
        <h4>{{ bookLesson.title }}</h4>
      </template>
      <b-card-text style="margin-bottom: 0">
        <b-row style="margin-top: 0;">
          <b-col style="text-align: left; display: flex; align-items: center">
            <h4>{{ bookLesson.title }}</h4>
          </b-col>
          <b-col style="text-align: left; display: flex; align-items: center; flex-flow: row-reverse;">
            <StarBar :progress="difficulty" />
          </b-col>
        </b-row>
        <ProgressBar :progress="progress"
              width="100%"
              height="2vh"
              />
      </b-card-text>

      <transition name="pop">
        <div class="disabler" v-if="disabled"></div>
      </transition>
    </b-card>

    <transition name="slide">
      <footer v-if="expanded">
        <b-container class="bv-example-row">
          <b-row style="margin-top: 0;">
            <b-col style="text-align: left; display: flex; align-items: center"
                   v-if="bookLesson.progress"
              >
              <span>
                {{ bookLesson.progress.cycleProgression }}
                /
                {{ bookLesson.progress.totalLessonCount }}
                exercices
              </span>
            </b-col>
            <b-col style="text-align: left; display: flex; align-items: center"
                   v-if="bookLesson.progress"
              >
              <span v-if="bookLesson.progress.difficulty > 1">
                Niveau {{ bookLesson.progress.difficulty - 1 + bookLesson.progress.completed  }}
              </span>
            </b-col>
            <b-col style="text-align: left; display: flex; align-items: center"
                   v-if="!bookLesson.progress"
              >
              <span>
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
                  <b-button :href="href"
                            variant="primary"
                            v-if="!bookLesson.progress || !bookLesson.progress.completed"
                            >
                    Commencer
                  </b-button>

                  <b-button :href="href"
                            variant="secondary"
                            v-if="bookLesson.progress && bookLesson.progress.completed"
                            disabled
                            >
                    Réviser
                  </b-button>
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
import StarBar from './../StarBar'
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
    'progress': {
      type: Number,
      default: 0,
    },
    'difficulty': {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      coincoin: 2,
    }
  },
  methods: {
    emitClickIfPossible(e) {
      this.coincoin++
      if (!this.disabled) {
        this.$emit('click', e)
      }
    },
  },
  components: {
    ProgressBar,
    StarBar,
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

h4
  font-weight: normal
  color: $dark-gray

.pop-leave-active
  transition: all 0.8s ease
  transition-delay: 1s

.pop-leave-to
  opacity: 0
  transform: scale(2, 2)
</style>
