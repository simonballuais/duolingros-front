<template>
  <div class="end-of-difficulty">
    <h1>Bravo</h1>

    <h2>
      Vous avez terminé un niveau !
    </h2>

    <div class="star-container">
      <transition name="pop">
        <font-awesome-icon v-if="showingStar"
            class="star" icon="star"
        />
      </transition>
    </div>

    <button class="submit"
            type="button"
            v-if="showingEndOfDifficulty"
            @click="endEndOfDifficulty"
    >
      Continuer
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'EndOfDifficulty',
  components: {
  },
  data() {
    return {
      showingStar: false,
    }
  },
  computed: {
    ...mapState('security', ['user']),
    ...mapState('learningSession', ['showingEndOfDifficulty']),
  },
  created() {
    window.addEventListener('keyup', this.handleKeyUp)

    setTimeout(() => this.showingStar = true, 500)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions('learningSession', ['endEndOfDifficulty']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.endEndOfDifficulty()
      }
    },
  }
}
</script>

<style lang="sass" scoped>
.star-container
  display: flex
  align-items: center
  justify-content: center

div.end-of-difficulty
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

div.progress-container
  left: 15%
  width: 75%
  background: gray
  height: 5vh

  .progress
    position: relative
    background: green
    width: 10%
    height: 100%
    transition: width 0.5s ease-in

.pop-enter-active
  transition: all 0.8s ease

.pop-enter
  opacity: 0
  transform: scale(3, 3)

.star
  color: $yellow
  font-size: 80pt
</style>
