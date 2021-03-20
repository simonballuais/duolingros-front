<template>
  <div>
    <ProgressPanel :show="showProgressPanel"
                   @closeMe="showProgressPanel = false"
    />

    <CreateProfile :show="showCreateProfile" />
    <ProfileCreated :show="showingProfileCreated" />

    <ProfilePanel :show="showProfilePanel"
                 @closeMe="showProfilePanel = false"
    />

    <b-navbar toggleable="lg" type="dark" variant="info"
              style=""
              class="bottom-navbar"
      >
      <div class="menu">
        <b-button style="margin-left: 15px"
          v-if="isLoggedIn" @click="showProfilePanel = !showProfilePanel"
          >
          Profil
        </b-button>
        <b-button style="margin-right: 15px"
          v-if="isLoggedIn" @click="showProgressPanel = !showProgressPanel">
          Progrès
        </b-button>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import { BNavbar, BButton } from 'bootstrap-vue'
import ProgressPanel from './../ProgressPanel.vue'
import ProfilePanel from './../ProfilePanel.vue'
import CreateProfile from '../register/CreateProfile.vue'
import ProfileCreated from '../register/ProfileCreated.vue'

export default {
  name: 'BottomNavBar',
  data() {
    return {
      showProgressPanel: false,
      showProfilePanel: false,
    }
  },
  components: {
    ProgressPanel,
    ProfilePanel,
    CreateProfile,
    ProfileCreated,
    BNavbar,
    BButton,
  },
  directives: {
    'b-navbar': BNavbar,
    'b-button': BButton,
  },
  computed: {
    ...mapState('security', ['isLoggedIn']),
    ...mapState('registration', ['showCreateProfile', 'showingProfileCreated']),
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

.top-navbar
  min-height: 50px
  max-height: 7vh
  position: fixed ! important
  bottom: 0
  width: 100%
  z-index: 100
  box-shadow: 0 0 20px gray
  background-color: $navbar-bg
</style>
