<template>
  <transition name="fade-in">
    <div class="container-home"
         v-if="show"
         :class="{blur: showCreateProfile}"
    >
      <transition name="fade-in">
      I <div v-if="bookLessons && progress" class="book-items-container">
            <BookLessonItem v-for="bookLesson in bookLessons"
                            :bookLesson="bookLesson"
                            :key="bookLesson.id"
                            :disabled="!bookLesson.progress && bookLesson.id != lastUnlockedBookLessonId"
                            :expanded="bookLesson.id == selectedBookLessonId"
                            @click="selectBookLessonId(bookLesson.id)"
                            :progress="bufferedProgresses[bookLesson.id]"
                            />
        </div>
      </transition>

      <Spinner v-if="!bookLessons || !progress || confirmingEmailCode"
               :big="true"
               :center="true"
               ></Spinner>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import BookLessonItem from './lesson/BookLessonItem'
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
    }
  },
  components: {
    BookLessonItem,
    Spinner,
  },
  computed: {
    ...mapState(
      'bookLesson',
      [
        'bookLessons',
        'progress',
        'lastUnlockedBookLessonId',
        'bufferedProgresses',
      ]
    ),
    ...mapState('registration', ['showCreateProfile']),
    ...mapState('security', ['confirmingEmailCode']),
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
      ]
    ),
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
  directives: {
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
    this.$router.push({ name: 'home' });

    if (confirmationCode) {
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
  margin-top: 2vh

div.container-home
  position: relative
  margin: 0 auto
  margin-top: 8mm
  margin-bottom: 1.5cm
  padding-top: 5mm
  height: calc(var(--vh, 1vh) * 100)
  max-width: 1200px
  overflow: hidden

  &.blur
    filter: blur(4px)

main
  min-height: 500px

.fade-in-enter-active
  transition: all .3s ease-out
.fade-in-enter
  opacity: 0
</style>
