<template>
  <button class="btn btn-success"
          type="submit">
    <span class="spinner-border" v-if="loading"></span>
    <span v-if="!loading">
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    'label': {
      type: String,
      default: 'Ok',
    },
    'loading': {
      type: Boolean,
      default: false,
    }
  },
}
</script>
