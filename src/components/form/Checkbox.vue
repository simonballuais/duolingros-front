<template>
  <div>
    <label>{{ label }}</label>
    <input class="form-control"
           type="checkbox"
           @input="updateInputValue($event.target.checked)"
           @keyup="$emit('keyup', value)"
           :class="{ big, small }"
           :checked="value"
           >
  </div>
</template>

  <script>
export default {
  props: {
    'value': {
      'type': Boolean,
    },
    'label': {
      'type': String,
    },
    'small': {
      type: Boolean,
      default: false,
    },
    'big': {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateInputValue(value) {
      this.inputValue = value
      this.$emit('input', value)
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(val) {
        this.value = val
      }
    },
  }
}
</script>

<style lang="sass" scoped>
div
  display: flex
  justify-content: space-evenly
  align-items: center
  margin-right: 5px
  height: 32px
  width: 32px

  label
    white-space: nowrap
    margin-left: 4px
    margin-right: 5px
</style>
