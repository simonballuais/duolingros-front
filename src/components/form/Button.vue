<template>
  <button type="button"
          class="btn btn-outline-primary"
          @click="clicked"
          >
    <slot v-if="!spinning"></slot>
    <span class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
          v-if="spinning"
    ></span>
  </button>
</template>

<script>
export default {
  props: {
    'spinWhenClicked': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return{
      'spinning': false,
    }
  },
  methods: {
    clicked(e) {
      if (this.spinWhenClicked) {
        this.spinning = true
      }

      this.$emit('click', e)
    },
  },
}
</script>

<style lang="sass" scoped>
svg.svg-inline--fa.fa-plus
  margin-left: -1px

span.spinner-border.spinner-border-sm
  margin-left: -4px
  margin-top: 1px
</style>
