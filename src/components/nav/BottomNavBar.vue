<template>
  <nav class="bottom-navbar">
    <Links></Links>
    <slot></slot>
    <span v-if="user">
      ding dong
    </span>
  </nav>
</template>

<script>
import {mapState} from 'vuex'

import Links from './Links.vue'

export default {
  name: 'BottomNavBar',
  components: {
    Links,
  },
  computed: {
    ...mapState('security', ['user']),
  },
}
</script>

<style lang="sass">
nav.bottom-navbar
  height: 1.5cm
  position: fixed
  width: 100%
  bottom: 0
  background: #343A40
</style>
