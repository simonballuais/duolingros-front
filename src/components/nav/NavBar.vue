<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="menu">
        <span>
          test
        </span>

        <span>
          test
        </span>

        <span v-if="user">
          {{ user.currentSerie || 0 }}
        </span>

        <span v-if="user" class="navbar-text">
          Coucou {{ user.username }}
        </span>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'NavBar',
  components: {
  },
  computed: {
    ...mapState('security', ['user']),
  },
}
</script>

<style lang="sass">
nav.navbar
  height: 8mm
  font-size: 3mm
  padding: 0

  .menu
    display: flex
    width: 100%
    height: 100%
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    color: white

    span
      margin: 2vh
</style>
