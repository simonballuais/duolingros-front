<template>
  <nav class="bg-light sidebar">
    <div v-for="bookLesson in bookLessons"
         :key="bookLesson.id"
         class="book-lesson"
         >
     <h1 class="book-lesson-title" href="#">
       {{ bookLesson.title }}
     </h1>

      <ul class="nav flex-column">
      </ul>
    </div>

  </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  components: {
  },
  name: 'SideMenu',
  props: ['title'],
  computed: {
    ...mapState('lesson', ['lessons']),
    ...mapState('bookLesson', ['bookLessons']),
  },
  methods: {
    ...mapActions('lesson', ['updateLessons']),
    ...mapActions('bookLesson', ['loadAllBookLessons']),
  },
  created() {
    this.loadAllBookLessons()
  }
}
</script>

<style lang="sass">
.sidebar
  position: fixed
  overflow-y: scroll
  width: 270px
  top: 0
  bottom: 0
  left: 0
  z-index: 100
  padding: 64px 0 0 12px
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1)
  font-size: .875rem

  & .book-lesson:not(:first-child)
    margin-top: 16px

.sidebar-sticky
  position: relative
  top: 0
  height: calc(100vh - 48 px)
  padding-top: .5rem
  overflow-x: hidden
  overflow-y: auto

.book-lesson-title
  font-size: 16px
  text-transform: uppercase
  margin: 0
</style>
