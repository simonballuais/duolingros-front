<template>
  <div id="app">
    <NavBar v-if="$route.name != 'learning-session'"></NavBar>
    <router-view></router-view>
    <BottomNavBar v-if="$route.name != 'learning-session'"></BottomNavBar>
  </div>
</template>

<script>
import NavBar from './components/nav/NavBar.vue'
import BottomNavBar from './components/nav/BottomNavBar.vue'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

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

button
  display: block
</style>
