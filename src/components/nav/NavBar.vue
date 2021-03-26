<template>
  <div>
    <Settings :show="showSettings"
              @closeMe="showSettings = false"
    />

    <b-navbar toggleable="lg" type="dark" variant="info"
              style=""
              class="top-navbar"
      >
      <div class="menu">
        <b-navbar-brand v-if="isLoggedIn" id="current-serie" style="user-select: none;">
          {{ user.currentSerie || 0 }}
          <font-awesome-icon class="fire" icon="fire" style="color: white"/>
        </b-navbar-brand>

        <b-tooltip target="current-serie" placement="bottom" triggers="hover">
          <div class="tooltip-content">
            <h1 v-if="user.currentSerie">
              <font-awesome-icon class="fire" icon="fire" style="color: white"/>
            </h1>
            <span v-if="user.currentSerie">
              Vous avez étudié pendant <strong>{{ user.currentSerie }}</strong> {{ user.currentSerie >= 2 ? "jours" : "jour" }} d'affilé&nbsp;!
            </span>
            <span v-if="!user.currentSerie">
              Vous n'avez pas encore commencé de série
            </span>
          </div>
        </b-tooltip>

        <b-navbar-brand v-if="isLoggedIn" id="total-levels" style="user-select: none">
          {{ user.totalLevels }}
          <font-awesome-icon class="star" icon="star" style="color: white"/>
        </b-navbar-brand>

        <b-tooltip target="total-levels" placement="bottom" triggers="hover">
          <div class="tooltip-content">
            <h1 v-if="user.totalLevels">
              <font-awesome-icon class="star" icon="star" style="color: white"/>
            </h1>
            <span v-if="user.totalLevels">
              Vous avez terminé <strong>{{ user.totalLevels }}</strong> {{ user.totalLevels >= 2 ? "niveaux" : "niveau" }} au total&nbsp;!
            </span>
            <span v-if="!user.totalLevels">
              Vous n'avez pas encore terminé de niveau
            </span>
          </div>
        </b-tooltip>

        <b-navbar-brand v-if="isLoggedIn" @click="showSettings = !showSettings" class="settings-icon">
          <font-awesome-icon class="cog" icon="cog" />
          <span>
            {{ user.username | capitalize }}
          </span>
        </b-navbar-brand>

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

        <b-button @click="showCreateProfile"
                v-if="!isLoggedIn"
                variant="primary"
                style="margin-left: 1vw"
        >
          Créer un profil
        </b-button>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { BNavbar, BNavbarBrand, BButton, BTooltip } from 'bootstrap-vue'
import {mapState, mapActions} from 'vuex'
import Settings from './../Settings.vue'

export default {
  name: 'NavBar',
  components: {
    BNavbar,
    BNavbarBrand,
    BButton,
    Settings,
  },
  data() {
    return {
      showSettings: false,
    }
  },
  directives: {
    'b-navbar': BNavbar,
    'b-navbar-brand': BNavbarBrand,
    'b-button': BButton,
    'b-tooltip': BTooltip,
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    ...mapState('security', ['user', 'isLoggedIn']),
  },
  methods: {
    ...mapActions('registration', ['showCreateProfile']),
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
    justify-content: space-around
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

.settings-icon
  display: flex ! important
  align-items: center
  cursor: pointer

  svg
    font-size: 18pt

  span
    user-select: none

@media screen and (max-width: 800px)
  .settings-icon span
    display: none
</style>
