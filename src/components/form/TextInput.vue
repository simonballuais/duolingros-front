<template>
  <input class="form-control"
         :type="type"
         :placeholder="placeholder"
         :aria-label="placeholder"
         :value="inputValue"
         @input="updateInputValue($event.target.value)"
         @keyup="$emit('keyup', value)"
         @paste="$emit('paste', $event)"
         :class="{ big, small, bold }"
         >
</template>

  <script>
export default {
  props: {
    'value': {
      'type': [Number, String],
    },
    'placeholder': {
      type: String,
      default: '',
    },
    'type': {
      type: String,
      default: 'text',
    },
    'small': {
      type: Boolean,
      default: false,
    },
    'bold': {
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
      let castedValue = value

      if (this.type === 'number') {
        castedValue = parseInt(value)
      }

      this.$emit('input', castedValue)
      this.inputValue = castedValue
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

<style lang="sass">
input.big
  font-size: 32px
  font-variant: small-caps

input.small
  font-size: 12px

input.bold
  font-weight: bold
</style>
