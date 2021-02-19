<template>
  <transition name="fade-in">
    <div class="container-home" 
         v-if="show"
         :class="{blur: showCreateProfile}"
    >
      <transition name="fade-in">
        <div v-if="bookLessons && progress">
          <BookLessonItem v-for="bookLesson in bookLessons"
                          :bookLesson="bookLesson"
                          :key="bookLesson.id"
                          :disabled="!bookLesson.progress && bookLesson.id != lastUnlockedBookLessonId"
                          />
        </div>
      </transition>

      <Spinner v-if="!bookLessons || !progress"
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
  props: [],
  data() {
    return {
      show: false,
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
      ]
    ),
    ...mapState('registration', ['showCreateProfile']),
  },
  methods: {
    ...mapActions(
      'bookLesson',
      [
        'loadAllBookLessons',
        'loadProgress',
      ]
    ),
    ...mapActions(
      'security',
      [
        'reloadUserData',
      ]
    ),
  },
  created() {
    this.loadAllBookLessons()
    this.loadProgress()
    this.reloadUserData()
    setTimeout(() => this.show = true, 100)
  },
  watch: {
  }
}
</script>

<style lang="sass" scoped>
div.container-home
  position: absolute
  margin-top: 8mm
  margin-bottom: 1.5cm
  padding-top: 5mm
  height: calc(var(--vh, 1vh) * 100)
  width: 100%
  background: rgb(247, 248, 250)

  &.blur
    filter: blur(4px)

main
  min-height: 500px

.fade-in-enter-active
  transition: all .3s ease-out
.fade-in-enter
  opacity: 0
</style>
