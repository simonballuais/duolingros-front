<template>
  <div class="main-container">
    <b-tooltip v-if="bookLesson.disabled"
               :target="'book-lesson-' + bookLesson.id"
               placement="bottom"
               >
      <span>Bientôt :)</span>
    </b-tooltip>

    <b-tooltip v-if="disabled && !bookLesson.disabled"
               :target="'book-lesson-' + bookLesson.id"
               placement="bottom"
               >
      <span>Atteignez le niveau 1 à la leçon précédente pour débloquer celle-ci</span>
    </b-tooltip>

    <b-card title-tag="title"
            style="width: 100%; height: 100%; border-radius: 0"
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
        <div style="display: flex; justify-content: space-between">
          <div style="text-align: left; display: flex; align-items: center">
            <h4>{{ bookLesson.title }}</h4>
          </div>
          <div style="text-align: left; display: flex; align-items: center; flex-flow: row-reverse;">
            <StarBar :progress="difficulty" />
          </div>
        </div>
        <ProgressBar :progress="progress"
              width="100%"
              height="2vh"
              border-radius="0.5vh"
              color="linear-gradient(50deg, #36B37E 0, #32de4f 100%)"
        />
      </b-card-text>

      <transition name="pop">
        <div class="disabler" v-if="disabled" :id="'disabler-' + bookLesson.id"
                              :class="{'anonymous-disabler': !isLoggedIn}"
                              @click="showCreateProfileIfAnonymous"
          ></div>
      </transition>

      <b-tooltip :target="'disabler-' + bookLesson.id" placement="bottom" triggers="hover"
                  v-if="!isLoggedIn"
        >
        <span>Créez un profil pour débloquer les leçons suivantes !</span>
      </b-tooltip>
    </b-card>

    <transition name="slide">
      <footer v-if="expanded">
        <b-container class="bv-example-row">
          <b-row style="margin-top: 0;">
            <b-col style="text-align: left; display: flex; align-items: center"
                   v-if="bookLesson.progress"
              >
              <span class="lesson-progress">
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
              <span v-if="bookLesson.progress.cycleProgression === 0 && bookLesson.progress.difficulty === 1"
                    >
                Pas commencé
              </span>
            </b-col>
            <b-col style="text-align: right">
              <b-button :href="'https://cours.mitenygasy.com/' + bookLesson.courseLink"
                        variant="secondary"
                        class="mtn-button"
                        target="_blank"
                        v-if="bookLesson.courseLink"
                        >
                Conseils
              </b-button>
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
                            class="mtn-button"
                            v-if="!bookLesson.progress || !bookLesson.progress.completed"
                            >
                    {{ bookLesson.progress.cycleProgression === 0 && bookLesson.progress.difficulty === 1 ? "Commencer" : "Continuer" }}
                  </b-button>

                  <div id="revision-wrapper">
                    <b-button :href="href"
                              variant="secondary"
                              class="mtn-button"
                              v-if="bookLesson.progress && bookLesson.progress.completed"
                              id="revision"
                              disabled
                              >
                      Réviser
                    </b-button>
                  </div>

                  <b-tooltip target="revision-wrapper" placement="bottom">
                    <span>Bientôt :)</span>
                  </b-tooltip>
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
import { mapState, mapActions } from 'vuex'
import { BCard, BCardText, BButton, BContainer, BRow, BCol, BTooltip } from 'bootstrap-vue'

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
  computed: {
    ...mapState('security', ['user', 'isLoggedIn']),
  },
  methods: {
    ...mapActions('registration', ['showCreateProfile']),
    showCreateProfileIfAnonymous() {
      if (!this.isLoggedIn) {
        this.showCreateProfile()
      }
    },
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
    'b-tooltip': BTooltip,
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

  &.anonymous-disabler
    cursor: pointer

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
  transition-delay: 1.4s

.pop-leave-to
  opacity: 0
  transform: scale(2, 2)

.mtn-button, button
  height: 40px
  border-radius: 20px

@media screen and (max-width: 800px)
  h4
    font-size: 15pt

@media screen and (max-width: 500px), ( max-height: 600px)
  .mtn-button, button
    font-size: 10pt
    padding: 8px

  .lesson-progress
    font-size: 10pt
</style>
