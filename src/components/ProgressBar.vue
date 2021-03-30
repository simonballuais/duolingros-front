<template>
  <div class="progress-container"
       @click="popop"
       :style="{width: width, height: height, left: left, top: top, 'margin-top': marginTop, position: position, 'border-radius': borderRadius, 'background': background}"
       >
    <div class="progress"
         :style="{width: progress + '%', 'border-radius': borderRadius, 'background': color, 'border-radius': borderRadius}"
    >
      <transition name="woosh">
        <div class="shine" v-if="woo"></div>
      </transition>
    </div>

    <transition name="pop">
    <div class="end-circle" v-if="pop" :style="{left: (progress - 3) + '%'}"> </div>
    </transition>

    <transition name="depop">
      <div class="progress-pop" :style="{background: color, 'border-radius': borderRadius}" v-if="woo"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      pop: false,
      woo: false,
      storedValue: null,
    }
  },
  props: {
    'progress': {
      default: '0',
    },
    'borderRadius': {
      type: String,
      default: '0',
    },
    'marginTop': {
      type: String,
      default: '0',
    },
    'height': {
      type: String,
      default: '5vh',
    },
    'position': {
      type: String,
      default: '',
    },
    'width': {
      type: String,
      default: '75%',
    },
    'color': {
      type: String,
      default: '#00c759',
    },
    'background': {
      type: String,
      default: '#DDD',
    },
    'left': {
      type: String,
      default: '0',
    },
    'top': {
      type: String,
      default: '0',
    },
    'popper': {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
  watch: {
    progress(val) {
      if (val >= 100) {
        setTimeout(() => { this.popop(); this.woosh() }, 500)
      }
      if (this.popper) {
        setTimeout(this.popop, 500)
      }
    },
  },
  methods: {
    popop() {
      this.pop = !this.pop
      this.$nextTick(() => this.pop = !this.pop)
    },
    woosh() {
      this.woo = !this.woo
      this.$nextTick(() => this.woo = !this.woo)
    },
  },
}
</script>

<style lang="sass" scoped>
div.progress-container
  width: 75%
  background: $light-gray
  height: 5vh
  position: relative
  overflow: visible
  border-radius: 0.5vh
  border: 0

  .progress
    position: absolute
    width: 10%
    height: 100%
    transition: width 0.5s ease
    border-radius: 0.5vh

  .progress-pop
    left: -0.5vh
    top: -0.5vh
    position: absolute
    width: calc(100% + 1vh)
    height: calc(100% + 1vh)
    border-radius: 1vh

  .shine
    width: 15%
    height: 100%
    background: white
    left: -15%
    position: relative
    transform: skew(-45deg)
    opacity: 0.9

.end-circle
  position: relative
  border-radius: 50%
  height: 2vh
  width: 2vh
  border: 1vh solid yellow
  right: -1.5vh
  top: calc(50% - 1vh)

.woosh-leave-active
  transition: all 0.3s ease-in

.woosh-leave-to
  transform: translate(800%, 0) skew(-45deg) ! important

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

@media screen and (max-width: 800px)
  .end-circle
    border: 2vh solid yellow
</style>
