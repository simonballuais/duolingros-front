<template>
  <div class="spinner-container"
       :class="{ big, center }"
       >
    <div class="spinner-border"
         role="status"
         >
      <span class="sr-only">
        Loading ...
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: [
    'big',
    'center',
  ],
}
</script>

<style lang="sass">
.spinner-container
  &.center
    display: flex
    height: 100%
    align-items: center
    justify-content: center

  &.big .spinner-border
    width: 128px
    height: 128px
    font-size: 24px
</style>
