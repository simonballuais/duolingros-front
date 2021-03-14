<template>
  <transition :name="transitionName">
  <div class="spinner-container"
       :class="{ big, center, inline }"
       >
    <div class="spinner-border"
         role="status"
         >
      <span class="sr-only">
        Loading ...
      </span>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'Spinner',
  props: [
    'big',
    'center',
    'inline',
    'fade',
  ],
  computed: {
    transitionName() {
      if (this.fade) {
        return 'fade-spinner'
      }

      return null
    }
  },
}
</script>

<style lang="sass">
.spinner-container
  &.center
    position: absolute
    display: flex
    height: 100%
    width: 100%
    align-items: center
    justify-content: center
    margin: auto

  &.big .spinner-border
    width: 128px
    height: 128px
    font-size: 24px

  &.inline
    display: inline-block

.spinner-border
  z-index: 2000

.fade-spinner-leave-active
  transition: all 0.3s var(--depop)

.fade-spinner-leave-to
  opacity: 0
  transform: scale(1.4)
</style>
