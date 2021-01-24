<template>
  <input class="form-control big"
         :type="type"
         :placeholder="placeholder"
         :aria-label="placeholder"
         v-model="value"
         @input="$emit('input', value)"
         @keyup="$emit('keyup', value)"
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
  },
  data() {
    return{
      'value': '',
    }
  },
}
</script>
