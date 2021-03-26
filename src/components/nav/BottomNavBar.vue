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
        <div class="icon"
             v-if="isLoggedIn"
             @click="toggleProfile"
          >
          <font-awesome-icon class="user-circle" icon="user-circle" />
          <span>
            Profil
          </span>
        </div>

        <div class="icon"
             v-if="isLoggedIn"
             @click="toggleProgress"
          >
          <font-awesome-icon class="chart-bar" icon="chart-bar" />

          <span>
            Progrès
          </span>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import { BNavbar } from 'bootstrap-vue'
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
  },
  directives: {
    'b-navbar': BNavbar,
  },
  computed: {
    ...mapState('security', ['isLoggedIn']),
    ...mapState('registration', ['showCreateProfile', 'showingProfileCreated']),
  },
  methods: {
    toggleProfile() {
      this.showProfilePanel = !this.showProfilePanel
      this.showProgressPanel = false
    },
    toggleProgress() {
      this.showProgressPanel = !this.showProgressPanel
      this.showProfilePanel = false
    },
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
    justify-content: space-around
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

.icon
  color: white
  font-size: 18pt
  cursor: pointer

  span
    user-select: none

@media screen and (max-width: 800px)
  .icon span
    display: none
</style>
