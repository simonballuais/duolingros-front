<template>
  <div class="header">
    <div class="exit-container">
      <router-link :to="{ name: 'home'}"
                   v-slot="{href, route, navigate, isActive, isExactActive}"
        >
        <a :href="href">
          X
        </a>
      </router-link>
    </div>

    <ProgressBar :progress="progress" width="80%" height="2vh" left="10%"/>
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
    ...mapState('learningSession', ['progress']),
  },
  methods: {
    ...mapActions('learningSession', ['startLearningSession']),
  },
  created() {
  },
}
</script>

<style lang="sass" scoped>
div.header
  position: absolute
  height: 10%
  top: 0
  left: 0
  width: 100%
  background: red

div.progress-container
  position: absolute
  left: 15%
  width: 75%
  top: 35%
  background: gray
  height: 30%

  .progress
    position: relative
    background: green
    width: 10%
    height: 100%
    transition: width 0.25s ease-out

div.exit-container
  position: absolute
  display: flex
  left: 0
  top: 0
  width: 15%
  height: 100%
  background: light-gray
  align-items: center
  justify-content: center

  a
    color: black
    text-decoration: none
    font-size: 5vh
</style>
