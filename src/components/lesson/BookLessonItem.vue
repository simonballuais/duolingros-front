<template>
  <div>
  <router-link :to="{ name: 'learning-session', params: { id: bookLesson.id }}"
               v-slot="{href, route, navigate, isActive, isExactActive}"
    >
    <span>{{ bookLesson.title }}</span>
  </router-link>
  </div>
</template>

<script>
export default {
  name: 'BookLessonItem',
  props: ['bookLesson'],
}
</script>

<style lang="sass">
.sidebar .nav-link
  font-weight: 500
  color: #343
  padding: 4px 0 0 16px

  &.active, &:hover
    color: #999
</style>
