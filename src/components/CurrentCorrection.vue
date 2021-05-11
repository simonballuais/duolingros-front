<template>
  <transition name="correction-fade">
    <div class="current-correction"
         v-if="currentCorrection" 
         :class="{wrong: !currentCorrection.isCorrect}"
      >
      <div class="correction-content">
        <h2 v-if="currentCorrection && currentCorrection.isCorrect">
          Correct !
          <font-awesome-icon class="thumbs-up" icon="thumbs-up"/>
        </h2>

        <h3 v-if="currentCorrection && currentCorrection.isCorrect && currentCorrection.remark"
            v-html="currentCorrection.remark"
            >
        </h3>

        <h2 v-if="currentCorrection && !currentCorrection.isCorrect">
          Bonne réponse :
        </h2>

        <h3 v-if="currentCorrection && !currentCorrection.isCorrect && currentCorrection.correctAnswerText"
            v-html="currentCorrection.remark || currentCorrection.correctAnswerText"
            >
        </h3>

        <button class="end-correction"
                type="button"
                @click="endCorrection"
                v-if="currentCorrection"
          >
          Continuer
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'CurrentCorrection',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState('learningSession', ['currentCorrection']),
  },
  methods: {
    ...mapActions('learningSession', ['endCorrection']),
  },
  created() {

  },
}
</script>

<style lang="sass" scoped>
h1, h2
  font-family: 'Ubuntu', sans-serif

h2
  font-size: 1.8rem
  font-weight: bold

h3
  font-size: 1.3rem
  font-weight: normal

div.current-correction
  position: fixed
  z-index: 1000
  bottom: 0
  left: 0
  height: 20%
  width: 100%
  background: $green
  max-height: 220px
  color: white

  &.wrong
    background: $red

    .correction-content button
      color: $red

  .correction-content
    margin: 0 auto
    max-width: 700px
    padding-left: 3%
    padding-right: 3%
    padding-top: 2vh

    button
      position: absolute
      display: block
      width: 90%
      max-width: 400px
      transition: background-color 0.35s
      margin: 0 auto
      background-color: white
      border: 0
      left: 50%
      transform: translate(-50%, 0)
      color: $green
      height: 50px
      border-radius: 25px
      bottom: 2vh

.correction-fade-enter-active
  transition: all .3s ease
.correction-fade-leave-active
  transition: all .6s ease
.correction-fade-enter
  transform: translateY(20vh)
.correction-fade-leave-to
  transform: translateX(-100vw)
  opacity: 50

@media screen and (max-width: 800px), ( max-height: 800px)
  div.current-correction
    height: 30vh
    max-height: 30vh

    h2
      font-size: 1.5 ! important

    h3
      font-size: 1.1rem ! important

    .correction-content button
      bottom: 2vh

@media screen and (max-width: 500px), ( max-height: 600px)
  h2
    font-size: 1.3 ! important

  h3
    font-size: 1rem ! important

  button.end-correction
    width: 250px ! important
    font-size: 12pt ! important
    height: 38px ! important

@media screen and (max-width: 400px), ( max-height: 500px)
  h2
    font-size: 1.1 ! important

  button.end-correction
    width: 200px ! important
    font-size: 10pt ! important
    height: 30px ! important
</style>
