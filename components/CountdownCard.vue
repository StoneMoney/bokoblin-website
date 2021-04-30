<template>
  <b-container role="banner" class="mx-auto m-2">
    <b-card :style="'background-color: #'+marathon.color+';'">
      <div class="positiongrid">
        <img
          v-if="marathon.type_id === 1"
          v-b-tooltip.hover
          src="~/static/1.svg"
          width="50px"
          class="text-right"
          title="Flagship Event"
          alt="Z"
          style="filter:invert();"
        >
        <img
          v-else-if="marathon.type_id === 2"
          v-b-tooltip.hover
          src="~/static/1.svg"
          width="50px"
          class="text-right"
          title="Flagship Mini"
          alt="Z"
          style="filter:invert();"
        >
        <img
          v-else-if="marathon.type_id === 3"
          v-b-tooltip.hover
          src="~/static/3.svg"
          width="50px"
          class="text-right"
          title="Parallel Worlds"
          alt="PW"
          style="filter:invert();"
        >
        <img
          v-else-if="marathon.type_id === 4"
          v-b-tooltip.hover
          src="~/static/4.svg"
          width="50px"
          class="text-right"
          title="Side Quest"
          alt="SQ"
          style="filter:invert();"
        >
        <img
          v-else-if="marathon.type_id === 5"
          v-b-tooltip.hover
          src="~/static/5.svg"
          width="50px"
          class="text-right"
          title="Piece of Heart"
          alt="PoH"
          style="filter:invert();"
        >
        <div class="text-center">
          <h4 class="text-light">
            The next event: <nuxt-link class="unstyle" :to="'marathon/'+marathon.id">
              {{ marathon.full_name }}
            </nuxt-link> begins on {{ dateNoTime(marathon.start_date) }}
          </h4>
          <h5 class="text-light">
            <span style="font-family:monospace;">{{ countdown }}</span> (Approx start date, subject to change)
          </h5>
        </div>
      </div>
    </b-card>
  </b-container>
</template>
<script>
export default {
  props: {
    marathon: {
      type: Object,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    }
  },
  data () {
    return {
      countdown: '--:--:--:--'
    }
  },
  mounted () {
    const me = this
    setInterval(() => {
      const now = new Date()
      const duration = me.startDate.getTime() - now.getTime()
      let seconds = parseInt((duration / 1000) % 60)
      let minutes = parseInt((duration / (1000 * 60)) % 60)
      let hours = parseInt((duration / (1000 * 60 * 60)) % 24)
      const days = parseInt((duration / (1000 * 60 * 60 * 24)))
      hours = (hours < 10 && hours >= 0) ? '0' + hours : hours
      minutes = (minutes < 10 && minutes >= 0) ? '0' + minutes : minutes
      seconds = (seconds < 10 && seconds >= 0) ? '0' + seconds : seconds
      me.countdown = (days + ':' + hours + ':' + minutes + ':' + seconds + '')
    }, 1000)
  },
  methods: {
    dateNoTime (date) {
      const nt = new Date(date)
      return ((nt.getMonth() + 1) + '/' + nt.getDate() + '/' + nt.getFullYear())
    }
  }
}
</script>
<style scoped>
.positiongrid {
  display: grid;
  grid-template-columns: 35px 1fr;
}
</style>
