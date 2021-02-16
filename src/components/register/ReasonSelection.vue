<template>
  <div class="reason-selection">
    <h1>Pourquoi voulez-vous apprendre le malgache ?</h1>

    <button @click="userInfos.reason = 1"
            :class="{selected: userInfos.reason == 1}"
    >
      Pour y voyager
    </button>

    <button @click="userInfos.reason = 2"
            :class="{selected: userInfos.reason == 2}"
    >
      Pour la culture
    </button>

    <button @click="userInfos.reason = 3"
            :class="{selected: userInfos.reason == 3}"
    >
      Pour le plaisir d'apprendre
    </button>

    <button @click="userInfos.reason = 4"
            :class="{selected: userInfos.reason == 4}"
    >
      Pour pour
    </button>

    <button @click="userInfos.reason = 5"
            :class="{selected: userInfos.reason == 5}"
    >
      Autre
    </button>

    <button @click="endReasonSelection"
            class="submit"
            :disabled="!userInfos.reason"
    >
      Confirmer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'ReasonSelection',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState(
      'registration',
      [
        'userInfos',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['endReasonSelection']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endCurrentLevelSelection()
      }
    },
  },
  created() {
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
}
</script>

<style lang="sass" scoped>
div.reason-selection
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

button
  width: 80%
  margin-left: 10%
  transition: background-color 0.4s ease
  margin-top: 3vh

  &.submit
    position: absolute
    bottom: 5vh
    left: 10%
    margin: 0

  &.selected
    background-color: green
</style>
