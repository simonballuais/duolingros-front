<template>
  <div class="main-container">
    <Spinner v-if="!maxCount"
             :big="true"
             :center="true"
             :fade="true"
       ></Spinner>

    <div class="vertical-axis">
      <div class="label"
           :key="i"
           v-for="i in maxCount"
          :style="{bottom: 'calc(' + (100 * (i / maxCount)) + '% - 0.8vh)'}"
      >
        <span v-if="i > 0">
          {{ i }}
        </span>
      </div>
    </div>

    <div class="graph-container">
      <div v-for="i in maxCount"
           :key="'horizontal-' + i"
           class="horizontal-line"
          :style="{bottom: '' + (100 * (i / maxCount)) + '%'}"
      ></div>

      <div v-for="i in 7"
           class="graph-bar"
           :key="'bar-' + i"
           :style="{
              height: maxCount == 0 ? '0%' : '' + (100 * (lastSevenDaysGraph[i - 1].count / maxCount)) + '%',
              'transition-delay': '' + (i / 10) + 's',
           }"
           >
      </div>
    </div>

    <div class="date-labels-container" v-if="lastSevenDaysGraph">
      <div v-for="i in 7"
           :key="i"
           class="date-label"
      >
        <transition name="date-label">
          <span v-if="dayLabels[i - 1]">
            {{ dayLabels[i - 1] }}
          </span>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Spinner from './misc/Spinner'

export default {
  name: 'LastSevenDaysGraph',
  data() {
    return {
      dayLabels: [],
      verticalLabels: [],
      maxCount: 0,
    }
  },
  props: {
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapState('learningSession', ['lastSevenDaysGraph']),
  },
  created() {
    this.loadLastSevenDaysGraph()

    this.$store.subscribe((mutation) => {
      if (mutation.type === 'learningSession/lastSevenDaysGraphUpdated') {
        this.feedDayLabels()
        this.updateMaxCount()
      }
    });
  },
  methods: {
    ...mapActions('learningSession', ['loadLastSevenDaysGraph']),
    feedDayLabels() {
      this.dayLabels = []
      let delay = 100

      this.lastSevenDaysGraph.forEach((dayInfo) => {
        setTimeout(
          () => this.dayLabels.push(this.formatDay(dayInfo.day)),
          delay
        )

        delay += 50
      })
    },
    formatDay(day) {
      const elements = day.split('-')
      let d = elements[2][0] == 0 ? elements[2][1] : elements[2]
      let m = elements[1][0] == 0 ? elements[1][1] : elements[1]

      return d + '/' + m
    },
    updateMaxCount() {
      setTimeout(() => this.maxCount = Math.max(...this.lastSevenDaysGraph.map((d) => d.count)), 200)
    },
  }
}
</script>

<style lang="sass" scoped>
.main-container
  position: absolute
  left: 5%
  width: 90%
  display: flex
  flex-flow: row wrap
  height: 35vh

  .vertical-axis
    position: absolute
    display: flex
    width: 2em
    height: 30vh
    background: pink

    .label
      position: absolute
      right: 10%

  .graph-container, .date-labels-container
    border-left: 2px solid gray
    border-bottom: 2px solid gray
    position: absolute
    display: flex
    height: 30vh
    left: 2em
    right: 0
    justify-content: space-around
    align-items: flex-end
    flex-flow: row nowrap

    .graph-bar
      z-index: 500
      display: flex
      background: green
      width: 13%
      transition: all 0.5s cubic-bezier(.77,0,.18,1)

    .horizontal-line
      position: absolute
      border-bottom: 1px solid lightgray
      height: 1px
      width: 100%

  .date-labels-container
    position: absolute
    height: 5vh
    background: none
    border: 0
    align-items: start
    left: 2em
    right: 0
    top: 30vh

    .date-label
      width: 13%
      text-align: center

.date-label-enter-active
  transition: all 0.5s

.date-label-enter
  opacity: 0
  transform: translateX(10vh)
</style>
