<template>
  <div class="serie-progress">
    <h1>Votre série {{ !previousSerieCount ? 'démarre' : 'continue' }} !</h1>

    <div class="previous serie-count" v-if="!newSerieCount">
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
div.serie-progress
  position: relative
  margin: 0 auto
  top: 0
  left: 0
  overflow: hidden
  left: 0
  height: 90%
  max-width: 700px
  padding: 3%

h1, h2
  font-family: 'Ubuntu', sans-serif

h1
  font-size: 1.8rem
  font-weight: bold
  margin-top: 1.5rem
  margin-bottom: 1.5rem

h2
  font-size: 1.3rem
  font-weight: normal
  margin-bottom: 3rem

button
  position: absolute
  display: block
  width: 90%
  max-width: 400px
  transition: background-color 0.35s
  margin: 0 auto
  background-color: $green
  border: 0
  left: 50%
  transform: translate(-50%, 0)
  color: white
  height: 50px
  border-radius: 25px
  bottom: 5vh

.serie-count
  font-family: 'Ubuntu', sans-serif
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
