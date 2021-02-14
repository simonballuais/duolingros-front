<template>
  <div class="serie-progress">
    <h1>Votre série continue !</h1>

    <div class="previous serie-count" v-if="previousSerieCount">
      {{ previousSerieCount }}
    </div>

    <transition name="new-serie-count">
      <div class="new serie-count" v-if="newSerieCount">
        {{ newSerieCount }}
      </div>
    </transition>

    <button class="submit"
            type="button"
            v-if="showingSerieProgress"
            @click="endSerieProgress"
            >
            Continuer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'SerieProgress',
  components: {
  },
  data() {
    return {
      previousSerieCount: null,
      newSerieCount: null,
    }
  },
  computed: {
    ...mapState('security', ['user']),
    ...mapState('learningSession', ['showingSerieProgress']),
  },
  created() {
    this.previousSerieCount = this.user.currentSerie - 1
    setTimeout(() => {
      this.newSerieCount = this.previousSerieCount + 1
      this.previousSerieCount = null
    }, 650)

    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions('learningSession', ['endSerieProgress']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endSerieProgress()
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.serie-progress
  height: 100%

button
  width: 80%
  margin-left: 10%
  position: absolute
  bottom: 5vh

.serie-count
  top: 20%
  width: 100%
  position: absolute
  text-align: center
  font-size: 30vh
  margin: auto

.new-serie-count-enter-active
  transition: all 1s ease

.new-serie-count-enter
  transform: scale(1.5)
  opacity: 0
</style>
