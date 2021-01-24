<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
    <BottomNavBar></BottomNavBar>
  </div>
</template>

<script>
import NavBar from './components/nav/NavBar.vue'
import BottomNavBar from './components/nav/BottomNavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    BottomNavBar,
  },
}
</script>

<style lang="sass">
body
  font-size: .875rem

div.app
  width: 100%
  height: 100%
</style>
