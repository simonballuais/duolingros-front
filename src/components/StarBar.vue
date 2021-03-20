<template>
  <div class="progress-container"
       :style="{left: left, top: top}"
       >
      <transition-group name="pop">
        <font-awesome-icon
            v-for="i in progress"
            :key="i"
            class="star" icon="star" />
      </transition-group>
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
      default: 2,
    },
    'left': {
      type: String,
      default: '0',
    },
    'top': {
      type: String,
      default: '0',
    },
  },
  components: {
  },
}
</script>

<style lang="sass" scoped>
.pop-leave-active
  transition: all 0.5s ease

.pop-leave-to
  transform: scale(10, 10)
  opacity: 0
  border: 0vh solid yellow

.pop-enter-active, .pop-leave-active
  transition: all 0.3s ease

.pop-enter, .pop-leave-to
  opacity: 0
  transform: scale(7, 7)

.star
  color: orange
  font-size: 24pt
</style>
