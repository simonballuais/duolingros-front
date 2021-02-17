<template>
  <div class="reason-selection">
    <h1>Pourquoi voulez-vous apprendre le malgache ?</h1>

    <button @click="user.reason = 1"
            :class="{selected: user.reason == 1}"
    >
      Pour y voyager
    </button>

    <button @click="user.reason = 2"
            :class="{selected: user.reason == 2}"
    >
      Pour la culture
    </button>

    <button @click="user.reason = 3"
            :class="{selected: user.reason == 3}"
    >
      Pour le plaisir d'apprendre
    </button>

    <button @click="user.reason = 4"
            :class="{selected: user.reason == 4}"
    >
      Pour pour
    </button>

    <button @click="user.reason = 5"
            :class="{selected: user.reason == 5}"
    >
      Autre
    </button>

    <button @click="endReasonSelection"
            class="submit"
            :disabled="!user.reason"
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
      'security',
      [
        'user',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['endReasonSelection']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endReasonSelection()
      }
      if (e.keyCode === 49) {
        this.user.reason = 1
      }
      if (e.keyCode === 50) {
        this.user.reason = 2
      }
      if (e.keyCode === 51) {
        this.user.reason = 3
      }
      if (e.keyCode === 52) {
        this.user.reason = 4
      }
      if (e.keyCode === 53) {
        this.user.reason = 5
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
