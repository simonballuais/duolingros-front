<template>
    <b-navbar toggleable="lg" type="dark" variant="info"
              style=""
              class="top-navbar"
      >
      <div class="menu">
        <b-button @click="logoutAndGoToLogin"
                v-if="isLoggedIn"
                style="margin-left: 15px"
        >
          Se déconnecter
        </b-button>

        <b-navbar-brand v-if="isLoggedIn">
          {{ user.currentSerie || 0 }}
        </b-navbar-brand>

        <b-navbar-brand v-if="isLoggedIn">
            Coucou {{ user.username }}
        </b-navbar-brand>

        <b-button @click="showCreateProfile"
                v-if="!isLoggedIn"
                variant="primary"
                style="margin-left: 1vw"
        >
          Créer un profil
        </b-button>

        <router-link :to="{ name: 'login' }"
                     v-slot="{href, route, navigate, isActive, isExactActive}"
                      v-if="!isLoggedIn"
                     >
          <b-button :href="href"
                  variant="primary"
          >
            Se connecter
          </b-button>
        </router-link>
      </div>
    </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand, BButton } from 'bootstrap-vue'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'NavBar',
  components: {
    BNavbar,
    BNavbarBrand,
    BButton,
  },
  directives: {
    'b-navbar': BNavbar,
    'b-navbar-brand': BNavbarBrand,
    'b-button': BButton,
  },
  computed: {
    ...mapState('security', ['user', 'isLoggedIn']),
  },
  methods: {
    ...mapActions('security', ['logout']),
    ...mapActions('registration', ['showCreateProfile']),
    logoutAndGoToLogin () {
      this.logout()
    },
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

.top-navbar
  min-height: 50px
  max-height: 7vh
  position: fixed ! important
  top: 0
  width: 100%
  z-index: 100
  box-shadow: 0 0 20px gray
  background-color: $navbar-bg
  border-bottom: 0.3em solid lighten($navbar-bg, 20%)
</style>
