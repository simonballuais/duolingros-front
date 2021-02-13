<template>
  <div id="app">
    <transition name="fade" mode="in">
      <NavBar v-if="$route.name == 'home'"></NavBar>
    </transition>

    <router-view></router-view>

    <transition name="fade" mode="in">
      <BottomNavBar v-if="$route.name == 'home'"></BottomNavBar>
    </transition>
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

<style lang="sass" scoped>
body
  font-size: .875rem

div.app
  width: 100%
  height: 100%

button
  display: block

.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease
.fade-enter
  opacity: 0
.fade-leave-to
  opacity: 0
</style>
