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
       <a :href="href">
         >
         {{ bookLesson.title }}

         <span v-if="bookLesson.progress">
           {{ bookLesson.progress.currentLessonId }}
         </span>
         <div class="progress-container">
           <div class="progress"
                v-if="bookLesson.progress"
                :style="{width: 100 * (bookLesson.progress.cycleProgression / bookLesson.progress.totalLessonCount) + '%'}"
                >
           </div>
         </div>
       </a>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BookLessonItem',
  props: ['bookLesson'],
}
</script>

<style lang="sass" scoped>
div.book-element
  margin-top: 5vh

  div.progress-container
    display: block
    width: 100%
    background: gray
    height: 5vh

    .progress
      position: relative
      background: green
      width: 10%
      height: 100%
      transition: width 0.25s ease-out
</style>
