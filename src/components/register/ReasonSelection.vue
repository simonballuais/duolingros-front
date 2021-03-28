<template>
    <transition :name="transitionName">
    <div class="registration" v-if="show">
      <div class="registration-content">
        <h1>
          <font-awesome-icon class="arrow-left" icon="arrow-left"
                             @click="back"
          />
          Pourquoi voulez-vous apprendre le malgache&nbsp;?
        </h1>

        <button @click="user.reason = 1"
                :class="{selected: user.reason == 1}"
        >
          <font-awesome-icon class="button-icon" icon="plane" />
          Pour voyager
        </button>

        <button @click="user.reason = 2"
                :class="{selected: user.reason == 2}"
        >
          <font-awesome-icon class="button-icon" icon="book" />
          Pour me cultiver
        </button>

        <button @click="user.reason = 3"
                :class="{selected: user.reason == 3}"
        >
          <font-awesome-icon class="button-icon" icon="lightbulb" />
          Pour le plaisir d'apprendre
        </button>

        <button @click="user.reason = 5"
                :class="{selected: user.reason == 5}"
        >
          Autre
        </button>

        <button @click="goToNextPosition"
                class="submit"
                :disabled="!user.reason"
        >
          Confirmer
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'ReasonSelection',
  data() {
    return {
    }
  },
  props: [
    'show',
    'transitionName',
  ],
  computed: {
    ...mapState(
      'security',
      [
        'user',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['goToNextPosition', 'goToPreviousPosition']),
    handleKeyUp(e) {
      if (e.keyCode === 13 && this.user.reason) {
        this.goToNextPosition()
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
    back() {
      this.$nextTick(() => this.goToPreviousPosition())
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
