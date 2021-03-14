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

    <nav class="bottom-navbar">
      <div class="menu">
        <a v-if="isLoggedIn" @click="showProfilePanel = !showProfilePanel">
          Profil
        </a>
        <a v-if="isLoggedIn" @click="showProgressPanel = !showProgressPanel">
          pouet pouet
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex'

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
</style>
