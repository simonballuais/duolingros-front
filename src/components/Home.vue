<template>
  <transition name="fade-in">
    <div class="container-home"
         v-if="show"
         :class="{blur: showCreateProfile}"
    >
      <transition name="fade-in">
      <div v-if="courses && progress && bufferedProgresses">
          <div v-for="(course, i) in courses"
               :key="course.id"
               class="course-container"
          >
            <CourseSeparator v-if="i !== 0"
                             :locked="bufferedLockedCourses[course.id]"
            />
            <div class="book-items-container">
              <BookLessonItem v-for="bookLesson in course.bookLessonList"
                              :bookLesson="bookLesson"
                              :key="bookLesson.id"
                              :disabled="!bookLesson.progress && ! (course.order === 1 && bookLesson.order === 1)"
                              :expanded="bookLesson.id == selectedBookLessonId"
                              @click="selectBookLessonId(bookLesson.id)"
                              :progress="bufferedProgresses[bookLesson.id] ? bufferedProgresses[bookLesson.id].progress : 0"
                              :difficulty="bufferedProgresses[bookLesson.id] ? (bufferedProgresses[bookLesson.id].difficulty + (bufferedProgresses[bookLesson.id].completed ? 1 : 0)) : 0"
                              :id="'book-lesson-' + bookLesson.id"
                              />
            </div>
          </div>

          <div class="spacer">
            <br>
            <br>
            <br>
          </div>
        </div>
      </transition>

      <Spinner v-if="!bookLessons || !progress || confirmingEmailCode || !bufferedProgresses"
               :big="true"
               :center="true"
               ></Spinner>

      <b-popover target="book-lesson-1"
                 placement="bottom"
                 :show.sync="showLessonHelp"
                 triggers="manual"
        >
        <template #title>Leçons</template>
        Vous avez terminé votre premier exercice&nbsp;!
        Vous pouvez cliquer ici pour passer au suivant et continuer la première leçon
        <b-button @click="closeLessonHelp">
          Ok
        </b-button>
      </b-popover>

      <b-popover target="book-lesson-2"
                 placement="bottom"
                 :show.sync="showSecondLessonHelp"
                 triggers="manual"
        >
        <template #title>Leçons suivantes</template>
        Vous débloquerez la leçon suivant lorsque vous atteindrez le niveau 1 à la première leçon
        <b-button @click="closeSecondLessonHelp">
          Ok
        </b-button>
      </b-popover>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { BPopover, BButton } from 'bootstrap-vue'

import BookLessonItem from './lesson/BookLessonItem'
import CourseSeparator from './CourseSeparator'
import Spinner from './misc/Spinner'

export default {
  name: 'Home',
  props: [
    't',
  ],
  data() {
    return {
      show: false,
      selectedBookLessonId: null,
      showLessonHelp: false,
      showSecondLessonHelp: false,
    }
  },
  directives: {
    'b-popover': BPopover,
    'b-button': BButton,
  },
  components: {
    BookLessonItem,
    Spinner,
    CourseSeparator,
  },
  computed: {
    ...mapState(
      'bookLesson',
      [
        'bookLessons',
        'courses',
        'progress',
        'bufferedProgresses',
        'bufferedLockedCourses',
      ]
    ),
    ...mapState('registration', ['showCreateProfile']),
    ...mapState('security', ['confirmingEmailCode', 'isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions(
      'bookLesson',
      [
        'loadAllBookLessons',
        'loadProgress',
        'updateBufferedProgresses',
      ]
    ),
    ...mapActions(
      'security',
      [
        'reloadUserData',
        'confirmEmailCode',
        'putUserData',
      ]
    ),
    closeLessonHelp() {
      this.showLessonHelp = false
      this.user.lessonHelpShown = true
      this.putUserData()

      if (this.isLoggedIn) {
        return
      }

      setTimeout(() => this.showSecondLessonHelp = true, 1000)
    },
    closeSecondLessonHelp() {
      this.showSecondLessonHelp = false
      this.user.secondLessonHelpShown = true
      this.putUserData()

      if (this.isLoggedIn) {
        return
      }
    },
    selectBookLessonId(id) {
      if (id === this.selectedBookLessonId) {
        this.selectedBookLessonId = null
        return
      }

      this.selectedBookLessonId = id
    },
    planUpdateBufferedProgresses() {
      setTimeout(this.updateBufferedProgresses, 500)
    },
  },
  created() {
    Promise.all([
      this.loadAllBookLessons(),
      this.loadProgress()
    ])
      .then(this.planUpdateBufferedProgresses)

    this.reloadUserData()
    setTimeout(() => this.show = true, 100)

    const confirmationCode = this.$route.query.t

    if (confirmationCode) {
      this.$router.push({ name: 'home' })

      this.confirmEmailCode(confirmationCode)
          .then(() =>
              this.$notify({
                group: 'default',
                type: 'success',
                title: 'Adresse confirmée !',
                text: 'Votre adresse email a été confirmée avec succès',
              })
          )
          .catch(() =>
              this.$notify({
                group: 'default',
                type: 'error',
                title: 'Impossible de confirmer votre email',
                text: 'Vous pouvez réessayer en demandant un nouveau code de confirmation',
              })
          )
    }
  },
  mounted () {
    if (!this.isLoggedIn && !this.user.lessonHelpShown) {
      setTimeout(() => {
        this.showLessonHelp = true
      }, 1000)
    }
  },
  watch: {
  }
}
</script>

<style lang="sass" scoped>
div.book-items-container
  display: flex
  flex-flow: row wrap
  align-items: center
  justify-content: center
  align-content: center

div.container-home
  position: relative
  margin: 0 auto
  margin-top: 8mm
  padding-top: 5mm
  height: calc(var(--vh, 1vh) * 100 - 8mm)
  max-width: 1200px

  &.blur
    filter: blur(4px)

.popover
  border: 1px solid $light-gray

  button
    height: 30px
    border-radius: 15px
    font-size: 1.1em
    transform: none ! important
    margin: auto
    margin-top: 1em

main
  min-height: 500px

.fade-in-enter-active
  transition: all .3s ease-out
.fade-in-enter
  opacity: 0
</style>
