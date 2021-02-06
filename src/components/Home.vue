<template>
  <div class="container-home">
    <BookLessonItem v-for="bookLesson in bookLessons"
                    :bookLesson="bookLesson"
                    :key="bookLesson.id"
                    />

    <Spinner v-if="!bookLessons"
             :big="true"
             :center="true"
             ></Spinner>
  </div>
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
    }
  },
  components: {
    BookLessonItem,
    Spinner,
  },
  computed: {
    ...mapState('bookLesson', ['bookLessons']),
  },
  methods: {
    ...mapActions('bookLesson', ['loadAllBookLessons']),
  },
  created() {
    this.loadAllBookLessons()
  },
  watch: {
  }
}
</script>

<style lang="sass">
div.container-home
  position: absolute
  margin-top: 8mm
  margin-bottom: 1.5cm
  padding-top: 5mm
  min-height: 100%
  width: 100%
  background: rgb(247, 248, 250)

main
  min-height: 500px
</style>
