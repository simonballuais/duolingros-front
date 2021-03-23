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

        <b-navbar-brand v-if="isLoggedIn" id="current-serie">
          {{ user.currentSerie || 0 }}
          <font-awesome-icon class="fire" icon="fire" style="color: white"/>
        </b-navbar-brand>

        <b-tooltip target="current-serie" placement="bottom" triggers="hover">
          <div class="tooltip-content">
            <h1 v-if="user.currentSerie">
              <font-awesome-icon class="fire" icon="fire" style="color: white"/>
            </h1>
            <span v-if="user.currentSerie">
              Vous avez étudié pendant <strong>{{ user.currentSerie }}</strong> {{ user.currentSerie >= 2 ? "jours" : "jour" }} d'affilé !
            </span>
            <span v-if="!user.currentSerie">
              Vous n'avez pas encore commencé de série
            </span>
          </div>
        </b-tooltip>

        <b-navbar-brand v-if="isLoggedIn" id="total-levels">
          {{ user.totalLevels }}
          <font-awesome-icon class="star" icon="star" style="color: white"/>
        </b-navbar-brand>

        <b-tooltip target="total-levels" placement="bottom" triggers="hover">
          <div class="tooltip-content">
            <h1 v-if="user.totalLevels">
              <font-awesome-icon class="star" icon="star" style="color: white"/>
            </h1>
            <span v-if="user.totalLevels">
              Vous avez terminé <strong>{{ user.totalLevels }}</strong> {{ user.totalLevels >= 2 ? "niveaux" : "niveau" }} au total !
            </span>
            <span v-if="!user.totalLevels">
              Vous n'avez pas encore terminé de niveau
            </span>
          </div>
        </b-tooltip>

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
import { BNavbar, BNavbarBrand, BButton, BTooltip } from 'bootstrap-vue'
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
    'b-tooltip': BTooltip,
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

.tooltip-content
  font-size: 14pt
  display: flex
  align-items: center
  align-contents: center

  h1
    margin-right: 8%
    margin-left: 8%

#current-serie, #total-levels
  font-size: 18pt
  transition: all 0.15s ease

  &:hover
    transform: scale(1.2, 1.2)
</style>
