<template>
    <transition :name="transitionName">
    <div class="registration" v-if="show">
      <div class="registration-content">
        <h1>
          <font-awesome-icon class="arrow-left" icon="arrow-left"
                             @click="back"
            />
          Avez vous déjà commencé à apprendre le malgache ?
        </h1>

        <button @click="user.currentLevel = 1"
                :class="{selected: user.currentLevel == 1}"
        >
          Pas du tout
        </button>

        <button @click="user.currentLevel = 2"
                :class="{selected: user.currentLevel == 2}"
        >
          Un petit peu
        </button>

        <button @click="user.currentLevel = 3"
                :class="{selected: user.currentLevel == 3}"
        >
          J'ai déjà un certain niveau
        </button>

        <button @click="goToNextPosition"
                class="submit"
                :disabled="!user.currentLevel || loadingFirstExercise"
        >
          <Spinner inline="true" small="true" v-if="loadingFirstExercise" />
          <span v-if="!loadingFirstExercise">
            Confirmer
          </span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Spinner from '../misc/Spinner'

export default {
  name: 'Registration',
  data() {
    return {
    }
  },
  components: {
    Spinner,
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
    ...mapState(
      'registration',
      [
        'loadingFirstExercise',
      ]
    ),
  },
  methods: {
    ...mapActions('registration', ['goToNextPosition', 'goToPreviousPosition' ]),
    handleKeyUp(e) {
      if (e.keyCode === 49) {
        this.user.currentLevel = 1
      }
      if (e.keyCode === 50) {
        this.user.currentLevel = 2
      }
      if (e.keyCode === 51) {
        this.user.currentLevel = 3
      }
      if (e.keyCode === 52) {
        this.user.currentLevel = 4
      }
      if (e.keyCode === 53) {
        this.user.currentLevel = 5
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
