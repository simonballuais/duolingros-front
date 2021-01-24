<template>
  <form class=""
        @submit.prevent="handleSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      this.$emit('submit')
    }
  }
}
</script>
