<template>
  <div>
      <ReasonSelection :show="workflowPosition === 1" :transitionName="transitionName"/>
      <IntensitySelection :show="workflowPosition === 2" :transitionName="transitionName"/>
      <CurrentLevelSelection :show="workflowPosition === 3" :transitionName="transitionName"/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ReasonSelection from './ReasonSelection.vue'
import IntensitySelection from './IntensitySelection.vue'
import CurrentLevelSelection from './CurrentLevelSelection.vue'

export default {
  name: 'Registration',
  data() {
    return {
      destroyRedirectSubscription: null,
    }
  },
  components: {
    ReasonSelection,
    IntensitySelection,
    CurrentLevelSelection,
  },
  computed: {
    ...mapState(
      'registration',
      [
        'workflowPosition',
        'workflowDirection',
      ]
    ),
    ...mapState('bookLesson', ['bookLessons']),
    transitionName() {
      if (this.workflowDirection === 'backward') {
        return 'page-transition-back'
      }

      return 'page-transition'
    }
  },
  methods: {
    ...mapActions('registration', ['startRegistration', 'cancelRegistration']),
    ...mapActions('bookLesson', ['loadAllBookLessons']),
  },
  created() {
    this.startRegistration()
    this.loadAllBookLessons()

    this.destroyRedirectSubscription = this.$store.subscribe((mutation) => {
      if (mutation.type === 'registration/allQuestionsAnswered') {
        const firstLesson = this.bookLessons[0].lessonList[0]

        setTimeout(
          () => this.$router.push({
            name: 'learning-session',
            params: {
              lessonId: firstLesson.id,
              difficulty: 1,
            }
          }),
          500
        )
      }

      if (mutation.type === 'registration/registrationCancelled') {
        this.$router.push({name: 'login'})
      }
    })
  },
  beforeDestroy() {
    this.destroyRedirectSubscription()
  },
}
</script>

<style lang="sass">
.page-transition-enter-active, .page-transition-leave-active
  transition: all 0.6s ease
.page-transition-enter
  transform: translateX(100vw)
.page-transition-leave-to
  opacity: 0
  transform: translateX(-100vw)

.page-transition-back-enter-active, .page-transition-back-leave-active
  transition: all 0.6s ease
.page-transition-back-enter
  transform: translateX(-100vw)
.page-transition-back-leave-to
  opacity: 0
  transform: translateX(100vw)

div.registration
  position: absolute
  top: 0
  left: 0
  height: calc(var(--vh, 1vh) * 100)
  width: 100%
  height: 100%
  overflow: hidden

  div.registration-content
    position: relative
    margin: 0 auto
    top: 0
    left: 0
    overflow: hidden
    left: 0
    height: 90%
    max-width: 1000px
    padding: 3%
    display: flex
    flex-flow: column nowrap
    align-items: center

    h1
      font-size: 2rem
      margin-bottom: 1.5em

      a
        color: $font-black

      svg
        margin-right: 1em
        cursor: pointer

    button
      display: block
      transition: background 0.3s ease
      width: 100%
      max-width: 400px
      transition: background 0.35s, color 0.35s
      background: white
      color: $dark-gray
      height: 50px
      border-radius: 25px
      margin: 1em
      border: 1px solid $light-gray
      background: white

      &.submit
        position: absolute
        transform: translate(-50%, 0)
        bottom: 5vh
        background-color: $green
        left: 50%
        color: white

      &:disabled
        background: white
        border: 1px $light-gray
        color: $gray

      &.selected
        color: white
        background: $violet
</style>
