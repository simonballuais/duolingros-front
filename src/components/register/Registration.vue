<template>
  <div class="registration">
    <transition name="page-transition">
      <ReasonSelection v-if="showReasonSelection" />
    </transition>

    <transition name="page-transition">
      <IntensitySelection v-if="showIntensitySelection" />
    </transition>

    <transition name="page-transition">
      <CurrentLevelSelection v-if="showCurrentLevelSelection" />
    </transition>
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
        'showReasonSelection',
        'showIntensitySelection',
        'showCurrentLevelSelection',
      ]
    ),
    ...mapState('bookLesson', ['bookLessons']),
  },
  methods: {
    ...mapActions('registration', ['startRegistration']),
    ...mapActions('bookLesson', ['loadAllBookLessons']),
  },
  created() {
    this.startRegistration()
    this.loadAllBookLessons()

    this.destroyRedirectSubscription = this.$store.subscribe((mutation) => {
      if (mutation.type === 'registration/currentLevelSelectionEnded') {
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
    });
  },
  beforeDestroy() {
    this.destroyRedirectSubscription()
  },
}
</script>

<style lang="sass" scoped>
div.registration
  position: absolute
  top: 0
  left: 0
  height: calc(var(--vh, 1vh) * 100)
  width: 100%
  overflow: hidden
  background: lightblue

.page-transition-enter-active, .page-transition-leave-active
  transition: all .4s ease
.page-transition-enter
  transform: translateX(100vw)
.page-transition-leave-to
  opacity: 0
  transform: translateX(-100vw)
</style>
