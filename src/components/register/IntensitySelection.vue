<template>
    <transition :name="transitionName">
    <div class="registration" v-if="show">
      <div class="registration-content">
        <h1>
          <font-awesome-icon class="arrow-left" icon="arrow-left"
                             @click="back"
            />
          Combien de temps par jour voulez-vous y consacrer ?
        </h1>

        <button @click="user.dailyObjective = 1"
                :class="{selected: user.dailyObjective == 1}"
        >
          5 minutes
        </button>

        <button @click="user.dailyObjective = 2"
                :class="{selected: user.dailyObjective == 2}"
        >
          10 minutes
        </button>

        <button @click="user.dailyObjective = 3"
                :class="{selected: user.dailyObjective == 3}"
        >
          15 minutes
        </button>

        <button @click="user.dailyObjective = 4"
                :class="{selected: user.dailyObjective == 4}"
        >
          20 minutes
        </button>

        <button @click="user.dailyObjective = 5"
                :class="{selected: user.dailyObjective == 5}"
        >
          25 minutes
        </button>

        <button @click="goToNextPosition"
                class="submit"
                :disabled="!user.dailyObjective"
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
  name: 'IntensitySelection',
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
      if (e.keyCode === 13 && this.user.dailyObjective) {
        this.goToNextPosition()
      }
      if (e.keyCode === 49) {
        this.user.dailyObjective = 1
      }
      if (e.keyCode === 50) {
        this.user.dailyObjective = 2
      }
      if (e.keyCode === 51) {
        this.user.dailyObjective = 3
      }
      if (e.keyCode === 52) {
        this.user.dailyObjective = 4
      }
      if (e.keyCode === 53) {
        this.user.dailyObjective = 5
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
