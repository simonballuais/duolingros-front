<template>
  <transition name="progress-panel-fade">
  <div class="progress-panel" v-if="show">
    <button @click="$emit('closeMe')">
      X
    </button>

    <div>
      Série de jouns consécutifs : {{ user.currentSerie }}
    </div>

    <div class="progress-container">
      <div class="progress"
           :style="{width: dailyProgress + '%'}"
        ></div>
    </div>

    <div>
      Objectif quotidien : {{ user.learningSessionCountThatDay }} / {{ user.dailyObjective }}
    </div>

    <div class="objective-selector">
      <div>
        <input type="radio" id="one" value="1" v-model="user.dailyObjective" @click="handleChange">
        <label for="one">1</label>
      </div>
      <div>
        <input type="radio" id="two" value="2" v-model="user.dailyObjective" @click="handleChange">
        <label for="two">2</label>
      </div>
      <div>
        <input type="radio" id="three" value="3" v-model="user.dailyObjective" @click="handleChange">
        <label for="three">3</label>
      </div>
      <div>
        <input type="radio" id="four" value="4" v-model="user.dailyObjective" @click="handleChange">
        <label for="four">4</label>
      </div>
      <div>
        <input type="radio" id="five" value="5" v-model="user.dailyObjective" @click="handleChange">
        <label for="five">5</label>
    </div>
    </div>
  </div>
  </transition>
</template>

<script>
import _ from 'lodash'

import {mapState, mapActions} from 'vuex'

export default {
  name: 'ProgressPanel',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: {
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
    ...mapActions('security', ['putUserData']),
    convertPopStateToClose() {
      if (!this.show) {
        return
      }

      history.pushState(null, null, null);
      this.$emit('closeMe')
    },
    handleChange: _.debounce(function () {
      this.user.dailyObjective = parseInt(this.user.dailyObjective)
      this.putUserData(this.user)
    }, 1500),
    handleKeyUp(e) {
      if (e.keyCode === 27) {
        this.$emit('closeMe')
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.progress-panel
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: pink
  z-index: 1400
  padding: 2vh

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

div.progress-container
  left: 15%
  width: 75%
  background: gray
  height: 5vh

  .progress
    position: relative
    background: green
    width: 10%
    height: 100%
    transition: width 0.25s ease-out
</style>
