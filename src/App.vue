<template>
  <div id="app">
    <transition name="fade">
      <NavBar v-if="$route.name == 'home' || $route.name == 'confirm-email'"></NavBar>
    </transition>

    <transition name="fade">
      <router-view></router-view>
    </transition>

    <transition name="fade">
      <BottomNavBar v-if="$route.name == 'home' || $route.name == 'confirm-email'"></BottomNavBar>
    </transition>

    <div class="notification-container">
      <notifications group="default"
                     position="bottom center"
                     classes="vue-notification"
                     width="80%"
                     :duration="15000"
      />
    </div>
  </div>
</template>

<script>
import NavBar from './components/nav/NavBar.vue'
import BottomNavBar from './components/nav/BottomNavBar.vue'

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--depop', 'cubic-bezier(.08,1.01,.7,.98)');

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

</style>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease
.fade-enter
  opacity: 0
.fade-leave-to
  opacity: 0
.vue-notification
  padding: 10px
  margin: 0 5px 5px
  font-size: 18px
  color: #ffffff
  background: #44A4FC
  border-left: 5px solid #187FE7
  width: 80vw ! important
  margin-bottom: 1.5vh

  &.warn
    background: #ffb648
    border-left-color: #f48a06

  &.error
    background: #E54D42
    border-left-color: #B82E24

  &.success
    background: #68CD86
    border-left-color: #42A85F

.vue-notification-wrapper
  overflow: visible

.vue-notification-template
  box-shadow: 0 0 2vh black

.notification-container
  width: 100%
  position: fixed
  bottom: 10%
  overflow: visible
  z-index: 2000

body
  margin: 0
</style>

