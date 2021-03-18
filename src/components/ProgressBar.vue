<template>
  <div class="progress-container" @click="popop">
      <div class="progress"
           :style="{width: progress + '%'}"
      ></div>

      <transition name="woosh">
        <div class="shine" v-if="pop"></div>
      </transition>

      <transition name="depop">
        <div class="progress-pop" v-if="pop"></div>
      </transition>

      <transition name="pop">
        <div class="end-circle" v-if="pop">
      </div>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      pop: false,
      storedValue: null,
    }
  },
  props: {
    'progress': {
      type: String,
      default: '0',
    },
  },
  components: {
  },
  watch: {
    progress(val) {
      if (val >= 100) {
        setTimeout(this.popop, 500)
      }
    },
  },
  methods: {
    popop() {
      this.pop = !this.pop
      this.$nextTick(() => this.pop = !this.pop)
    },
  },
}
</script>

<style lang="sass" scoped>
div.progress-container
  left: 15%
  top: 20%
  width: 75%
  background: gray
  height: 5vh
  position: absolute
  overflow: visible
  border-radius: 0.5vh

  .progress
    position: absolute
    background: $green
    width: 10%
    height: 100%
    transition: width 0.5s ease
    border-radius: 0.5vh

  .progress-pop
    left: -0.5vh
    top: -0.5vh
    position: absolute
    background: lightgreen
    width: calc(100% + 1vh)
    height: calc(100% + 1vh)
    border-radius: 1vh

  .shine
    width: 10vh
    height: 100%
    background: red
    left: -30vh
    position: absolute
    transform: skew(-45deg)
    opacity: 0.5

.end-circle
  position: absolute
  border-radius: 50%
  height: 2vh
  width: 2vh
  border: 1vh solid yellow
  right: -1.5vh
  top: 0.5vh

.woosh-leave-active
  transition: all 0.5s ease

.woosh-leave-to
  transform: translate(100px, 0) skew(-45deg)
  background-color: blue

.pop-leave-active
  transition: all 0.5s ease

.pop-leave-to
  transform: scale(10, 10)
  opacity: 0
  border: 0vh solid yellow

.depop-leave-active
  transition: opacity 0.5s linear

.depop-leave-to
  opacity: 0
</style>
