<template>
  <div class="intensity-selection">
    <h1>Créer un profil</h1>

    <TextInput v-model="profileData.email" />
    <TextInput v-model="profileData.username" />
    <TextInput v-model="profileData.password" />

    <button @click="endIntensitySelection"
            class="submit"
            :disabled="!profileData.email || !profileData.password"
    >
      Créer le compte
    </button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import TextInput from '../form/TextInput'

export default {
  name: 'IntensitySelection',
  data() {
    return {
    }
  },
  components: {
    TextInput,
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
    ...mapActions('registration', ['endIntensitySelection']),
    handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.submitProfile()
      }
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
}
</script>

<style lang="sass" scoped>
div.intensity-selection
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
