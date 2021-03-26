<template>
  <transition name="progress-panel-fade">
  <div class="progress-panel" v-if="show">
    <div class="content">
      <div class="band">
        <h2>
          <font-awesome-icon class="fire" icon="fire" />
          Série de <strong>{{ user.currentSerie }}</strong> {{ user.currentSerie >= 2 ? "jours" : "jour" }} consécutifs {{ user.currentSerie > 4 ? "!" : "" }}
        </h2>
      </div>

      <div class="band">
        <ProgressBar
            :progress="dailyProgress"
            width="90%"
            left="5%"
            position="relative"
            height="3rem"
            border-radius="1.5rem"
            color="linear-gradient(50deg, #6e00ff 0, #bb00ff 100%)"
        />

        <h2 style="text-align: center; margin-top: 1em;">
          Objectif quotidien : {{ user.learningSessionCountThatDay }} / {{ user.dailyObjective }}
          <font-awesome-icon class="smile" icon="smile" v-if="dailyProgress >= 100"/>
        </h2>
      </div>

      <h2 style="margin-left: 10%; margin-bottom: -1em;">
        Suivi des derniers jours
      </h2>

      <div class="graph-container">
        <LastSevenDaysGraph />
      </div>
    </div>

    <div class="header">
      <div @click="$emit('closeMe')" class="close-icon">
        <font-awesome-icon class="times" icon="times"/>
      </div>

      <h1>
        Progrès
      </h1>
    </div>
  </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import LastSevenDaysGraph from './LastSevenDaysGraph.vue'
import ProgressBar from './ProgressBar'

export default {
  name: 'ProgressPanel',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LastSevenDaysGraph,
    ProgressBar,
  },
  computed: {
    ...mapState('security', ['user']),
    dailyProgress() {
      if (!this.user || !this.user.dailyObjective) {
        return 0
      }

      let percentage = 100 * this.user.learningSessionCountThatDay / this.user.dailyObjective

      if (percentage > 100) {
        percentage = 100
      }

      return percentage
    },
  },
  created() {
    history.pushState(null, null, null);
    window.addEventListener('popstate', this.convertPopStateToClose)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.convertPopStateToClose)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    convertPopStateToClose() {
      if (!this.show) {
        return
      }

      history.pushState(null, null, null);
      this.$emit('closeMe')
    },
    handleKeyUp(e) {
      if (e.keyCode === 27) {
        this.$emit('closeMe')
      }
    },
  }
}
</script>

<style lang="sass" scoped>
h1, h2
  font-family: 'Ubuntu', sans-serif

h1
  font-size: 1.8rem
  font-weight: bold
  margin-top: 1.5rem
  margin-bottom: 1.5rem
  margin-left: 2em

h2
  font-size: 1.5rem
  margin: 0

.progress-panel
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: linear-gradient( to bottom left, #FFF 50%, #F5F5F5 100% )
  z-index: 1400
  padding: 2vh

.content
  display: flex
  flex-flow: column nowrap
  align-items: normal
  justify-content: space-around
  position: absolute
  bottom: 0
  top: 10%
  left: 0
  right: 0
  background: linear-gradient( to bottom left, #FFF 50%, #F5F5F5 100% )

  .band
    border-top: 1px solid $gray
    border-bottom: 1px solid $gray
    width: 100%
    padding-top: 1em
    padding-bottom: 1em
    padding-left: 5%
    padding-right: 5%
    box-shadow: 0 0 25px $light-shadow-gray

  .graph-container
    height: 50%

.header
  box-shadow: 0 0 20px gray
  position: absolute
  left: 0
  right: 0
  top: 0
  height: 10%
  background: $navbar-bg
  color: white
  display: flex
  align-content: center
  align-items: center

  .close-icon
    cursor: pointer
    margin-left: 2em
    color: white

    svg
      font-size: 24pt

.fire, .smile
  color: $yellow

.progress-panel-fade-enter-active, .progress-panel-fade-leave-active
  transition: all .3s ease
.progress-panel-fade-enter
  transform: translateY(100vh)
.progress-panel-fade-leave-to
  transform: translateY(100vh)
  opacity: 0

input[type=radio]
  border: 0px
  height: 2em
label
  margin-left: 2vh

@media screen and (max-width: 800px)
  h1
    font-size: 1.5rem
  h2
    font-size: 1.3rem
</style>
