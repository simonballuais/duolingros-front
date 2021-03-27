<template>
  <input class="form-control"
         :type="type"
         :placeholder="placeholder"
         :aria-label="placeholder"
         :value="storedInputValue"
         @input="updateInputValue($event.target.value)"
         @keyup="$emit('keyup', $event)"
         @paste="$emit('paste', $event)"
         :class="{ big, small, bold }"
         >
</template>

  <script>
export default {
  props: {
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
    'hideable': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      storedInputValue: null,
    }
  },
  methods: {
    updateInputValue(value) {
      let castedValue = value

      if (this.type === 'number') {
        castedValue = parseInt(value)
      }

      this.value = castedValue
    },
  },
  computed: {
    value: {
      get() {
        return this.storedInputValue
      },
      set(val) {
        this.storedInputValue = val
        this.$emit('input', val)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
input.big
  font-size: 32px
  font-variant: small-caps

input.small
  font-size: 12px

input.bold
  font-weight: bold
</style>
