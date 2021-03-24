<template>
  <div class="header-container">
    <div class="header">
      <div class="exit-container" v-if="exercisesToDo && exercisesToDo.length > 0">
        <router-link :to="{ name: 'home'}"
                     v-slot="{href, route, navigate, isActive, isExactActive}"
          >
          <a :href="href">
            <font-awesome-icon class="times" icon="times" />
          </a>
        </router-link>
      </div>

      <ProgressBar
          v-if="exercisesToDo && exercisesToDo.length > 0"
          :progress="progress"
          width="85%"
          height="1.5em"
          position="relative"
          borderRadius="0.35em"
          background="white"
          color="linear-gradient(50deg, #36B37E 0, #32de4f 100%)"
      />
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ProgressBar from './ProgressBar'

export default {
  name: 'Header',
  data() {
    return {
    }
  },
  components: {
    ProgressBar,
  },
  computed: {
    ...mapState('learningSession', ['progress', 'exercisesToDo']),
  },
  methods: {
    ...mapActions('learningSession', ['startLearningSession']),
  },
  created() {
  },
}
</script>

<style lang="sass" scoped>
div.header-container
  width: 100%
  min-height: 50px
  max-height: 7vh
  background-color: $navbar-bg
  box-shadow: 0 0 20px gray

  div.header
    position: relative
    height: 100%
    margin: 0 auto
    max-width: 1000px
    display: flex
    align-items: center
    align-content: center
    justify-content: space-evenly


div.exit-container
  position: relative
  display: flex
  left: 0
  top: 0
  height: 100%
  align-items: center
  justify-content: center

  a
    color: white
    text-decoration: none
    font-size: 2.2em
</style>
