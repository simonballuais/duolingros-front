<template>
  <form class=""
        @submit.prevent="handleSubmit">
    <div class="form-group">
      <slot></slot>
    </div>
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
