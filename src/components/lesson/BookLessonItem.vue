<template>
  <div class="book-element">
    <router-link :to="{
          name: 'learning-session',
          params: {
            lessonId: bookLesson.progress ? bookLesson.progress.currentLessonId : bookLesson.lessonList[0].id,
            difficulty: bookLesson.progress ? bookLesson.progress.difficulty : 1 
          }
       }"
       v-slot="{href, route, navigate, isActive, isExactActive}"
       >
       <a :href="href" v-if="!disabled">
         >
         {{ bookLesson.title }}

         <span v-if="bookLesson.progress">
            - {{ bookLesson.progress.difficulty }} ({{ bookLesson.progress.currentLessonId }})
         </span>

         <ProgressBar :progress="bookLesson.progress ? 100 * (bookLesson.progress.cycleProgression / bookLesson.progress.totalLessonCount) : '0'"
                      width="100%"
                      height="2vh"
          />
       </a>

       <span v-if="disabled" class="disabled">
         {{ bookLesson.title }}

         <span v-if="bookLesson.progress">
            - {{ bookLesson.progress.difficulty }} ({{ bookLesson.progress.currentLessonId }})
         </span>

         <ProgressBar :progress="bookLesson.progress ? 100 * (bookLesson.progress.cycleProgression / bookLesson.progress.totalLessonCount) : '0'"
                      width="100%"
                      height="2vh"
          />
       </span>
    </router-link>
  </div>
</template>

<script>
import ProgressBar from './../ProgressBar'

export default {
  name: 'BookLessonItem',
  props: {
    'bookLesson': null,
    'disabled': {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ProgressBar,
  },
}
</script>

<style lang="sass" scoped>
div.book-element
  margin-top: 5vh

.disabled
  color: darkgray
  background-color: gray
</style>
