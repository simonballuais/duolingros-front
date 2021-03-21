<template>
  <div class="separator">
    <hr />
        <div class="lock-container" id="lock-container"
             :class="{big: showingTooltip, checked: showingCheck}"
            >
          <transition name="pop">
              <font-awesome-icon class="lock" icon="lock"
                                 v-if="locked"
                />
          </transition>
          <transition name="pop">
              <font-awesome-icon class="checked" icon="check"
                                 v-if="showingCheck"
                                 @click="popop"
                />
          </transition>

          <transition name="woosh">
            <div class="shine" v-if="pop"></div>
          </transition>
        </div>
    <hr />

    <b-tooltip target="lock-container"
               placement="top"
               variant="success"
               >
      <span v-if="locked">
        Vous devez terminer les leçons précédentes pour continuer
      </span>
      <span v-if="showingCheck">
        Point de contrôle débloqué !
      </span>
    </b-tooltip>
  </div>
</template>

<script>
import { BTooltip } from 'bootstrap-vue'

export default {
  name: 'CourseSeparator',
  data() {
   return {
      showingTooltip: false,
      showingCheck: false,
      pop: false,
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
    'locked': {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    popop() {
      this.pop = true
      this.$nextTick(() => this.pop = false)
    },
  },
  watch: {
    locked(val) {
      if (!val) {
        setTimeout(() => this.showingCheck = true, 150)
      } else {
        this.showingCheck = false
      }

      this.popop()
    },
  },
  components: {
  },
  directives: {
    'b-tooltip': BTooltip,
  },
  created() {
    if (!this.locked) {
      this.showingCheck = true
    }
  },
}
</script>

<style lang="sass" scoped>
.separator
  display: flex
  align-items: center
  margin: 2em

  hr
    margin: 0
    border-top: 2px solid $light-gray
    width: 100%

  .spacer
    height: 9vh

  .lock-container
    flex-shrink: 0
    width: 2em
    height: 2em
    border: 2px solid $gray
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    font-size: 3em
    color: $dark-gray
    transition: background-color 0.15s ease
    overflow: hidden

    &.checked
      background-color: $green

    svg
      transition: all 0.15s ease
      position: absolute

    &:hover, big
      svg
        transform: scale(1.2, 1.2)

    .checked
      color: white

.tooltip
  font-size: 1.1em

.pop-enter-active, .pop-leave-active
  transition: all 0.8s ease

.pop-enter, .pop-leave-to
  opacity: 0
  transform: scale(2, 2)

.shine
  width: 0.7em
  height: 150%
  background: white
  left: -2.5em
  position: relative
  opacity: 0.9
  transform: skew(-20deg)

.woosh-leave-active
  transition: all 0.5s ease-in

.woosh-leave-to
  transform: translate(3.5em, 0) skew(-20deg)! important

</style>
