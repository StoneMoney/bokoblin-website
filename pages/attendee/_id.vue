<template>
  <div>
    <h1 class="m-3">
      <b-badge :style="'background-color:#'+attendee.house_color">
        {{ attendee.id }}
      </b-badge>
      <img
        v-if="attendee.house === 'Courage'"
        v-b-tooltip.hover
        src="~/static/courage.svg"
        width="28px"
        class="text-right"
        title="Team Courage"
      >
      <img
        v-if="attendee.house === 'Wisdom'"
        v-b-tooltip.hover
        src="~/static/wisdom.svg"
        width="28px"
        class="text-right"
        title="Team Wisdom"
      >
      <img
        v-if="attendee.house === 'Power'"
        v-b-tooltip.hover
        src="~/static/power.svg"
        width="28px"
        class="text-right"
        title="Team Power"
      >
      {{ attendee.name }}
    </h1>
    <b-col sm="9" md="4">
      <b-list-group class="m-1">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Rank: {{ attendee.rank }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <span v-if="segments.length > 0">
      <h1 class="m-3">Segments ({{ segments.length }})</h1>
      <template v-for="segment in segments">
        <SegmentCard :key="segment.id" :data="segment" />
      </template>
    </span>
    <h3 v-else>
      There are no records of segments played by this attendee
    </h3>
  </div>
</template>

<script>
import SegmentCard from '~/components/SegmentCard'
export default {
  components: {
    SegmentCard
  },
  async asyncData ({ $axios, params }) {
    const attendee = (await $axios.$get('https://bokoblin.herokuapp.com/?query={attendee(id:' + params.id + '){id,name,house,house_color,rank}}')).data.attendee
    const segments = (await $axios.$get('https://bokoblin.herokuapp.com/?query={segments(method:"runner",id:' + params.id + '){id,game{title,id,isZelda,isEvent},modifier,marathon{slug,color},runners{name,id},filenames{filename,note},raised,start_time,end_time,vod,time_offset}}')).data.segments
    return { attendee, segments }
  },
  data () {
    return {
      attendee: {},
      segments: []
    }
  },
  methods: {
    getDuration (start, stop) {
      const startDate = new Date(start).getTime()
      const stopDate = new Date(stop).getTime()
      const duration = stopDate - startDate
      let seconds = parseInt((duration / 1000) % 60)
      let minutes = parseInt((duration / (1000 * 60)) % 60)
      let hours = parseInt((duration / (1000 * 60 * 60)))
      hours = (hours < 10 && hours >= 0) ? '0' + hours : hours
      minutes = (minutes < 10 && minutes >= 0) ? '0' + minutes : minutes
      seconds = (seconds < 10 && seconds >= 0) ? '0' + seconds : seconds
      return hours + ':' + minutes + ':' + seconds
    },
    getDurationNumberal (start, stop) {
      const startDate = new Date(start).getTime()
      const stopDate = new Date(stop).getTime()
      const duration = stopDate - startDate
      let seconds = parseInt((duration / 1000) % 60)
      let minutes = parseInt((duration / (1000 * 60)) % 60)
      let hours = parseInt((duration / (1000 * 60 * 60)))
      hours = hours / 24
      minutes = minutes / 1440
      seconds = seconds / 86400
      return (hours + minutes + seconds) * 24
    },
    toUSD (input) {
      const number = input.toString()
      let dollars = number.split('.')[0]
      const cents = (number.split('.')[1] || '') + '00'
      dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('')
      return '$' + dollars + '.' + cents.slice(0, 2)
    }
  },
  head () {
    return {
      title: this.attendee.name + ' - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.attendee.name + (this.segments.length > 0 ? ', including ' + this.segments.length + ' segments' : '') + '.'
        },
        {
          property: 'og:title',
          content: this.attendee.name + ' - Bokoblin'
        },
        {
          name: 'theme-color',
          content: '#' + this.attendee.house_color
        }
      ]
    }
  }
}
</script>
