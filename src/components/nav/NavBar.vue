<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="menu">
        <span>
          test
        </span>

        <button @click="logoutAndGoToLogin"
                v-if="isLoggedIn"
        >
          Se déconnecter
        </button>

        <span v-if="user">
          {{ user.currentSerie || 0 }}
        </span>

        <span v-if="isLoggedIn" 
              class="navbar-text"
        >
          Coucou {{ user.username }}
        </span>

        <button @click="showCreateProfile"
                v-if="!isLoggedIn"
        >
          Créer un profil
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'NavBar',
  components: {
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
</style>
