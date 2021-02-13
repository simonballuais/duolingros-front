<template>
  <div>
    <ProgressPanel :show="showProgressPanel"
                   @closeMe="showProgressPanel = false"
    />
    <nav class="bottom-navbar">
      <div class="menu">
        <a v-if="user">
          Profil
        </a>
        <a v-if="user">
          ding dong
        </a>
        <a v-if="user" @click="showProgressPanel = !showProgressPanel">
          pouet pouet
        </a>
      </div>


    </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import ProgressPanel from './../ProgressPanel.vue'

export default {
  name: 'BottomNavBar',
  data() {
    return {
      showProgressPanel: false,
    }
  },
  components: {
    ProgressPanel,
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
  z-index: 1500
  width: 100%
  bottom: 0
  background: #343A40

  .menu
    display: flex
    width: 100%
    height: 100%
    flex-flow: row nowrap
    justify-content: space-between
    align-items: center
    color: white

    a
      margin: 2vh
</style>
