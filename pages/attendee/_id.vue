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
        alt="Courage"
      >
      <img
        v-if="attendee.house === 'Wisdom'"
        v-b-tooltip.hover
        src="~/static/wisdom.svg"
        width="28px"
        class="text-right"
        title="Team Wisdom"
        alt="Wisdom"
      >
      <img
        v-if="attendee.house === 'Power'"
        v-b-tooltip.hover
        src="~/static/power.svg"
        width="28px"
        class="text-right"
        title="Team Power"
        alt="Power"
      >
      {{ attendee.name }}
    </h1>
    <b-col sm="9" md="4">
      <b-list-group class="m-1">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Status (rank): {{ attendee.rank }}
        </b-list-group-item>
        <b-list-group-item v-if="raised > 0" class="d-flex justify-content-between align-items-center">
          Raised: {{ toUSD(raised) }}
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <h1 class="m-3">
      Segments ({{ segments.length }})
    </h1>
    <b-col class="mb-2">
      <b-nav pills>
        <b-nav-item :active="show === 0" :disabled="gameplaySegments.length == 0" @click="show = 0">
          <b-icon-controller /> Gameplay <b-badge pill :variant="show === 0 ? 'light' : 'secondary'">
            {{ gameplaySegments.length }}
          </b-badge>
        </b-nav-item>
        <b-nav-item :active="show === 1" :disabled="commentarySegments.length == 0" @click="show = 1">
          <b-icon-mic /> Commentary <b-badge pill :variant="show === 1 ? 'light' : 'secondary'">
            {{ commentarySegments.length }}
          </b-badge>
        </b-nav-item>
      </b-nav>
    </b-col>
    <span v-if="show == 0">
      <template v-for="segment in gameplaySegments">
        <b-col
          :key="segment.id"
          md="7"
          lg="6"
          xl="5"
          class="mb-3"
        >
          <SegmentCard :data="segment" />
        </b-col>
      </template>
    </span>
    <span v-else-if="show == 1">

      <template v-for="segment in commentarySegments">
        <b-col
          :key="segment.id"
          md="7"
          lg="6"
          xl="5"
          class="mb-3"
        >
          <SegmentCard :data="segment" />
        </b-col>
      </template>
    </span>
    <b-col v-else>
      <h3>There are no records of segments played by this attendee</h3>
    </b-col>
  </div>
</template>

<script>
import { BIconMic, BIconController } from 'bootstrap-vue'
import SegmentCard from '~/components/SegmentCard'
export default {
  components: {
    SegmentCard,
    BIconController,
    BIconMic
  },
  async asyncData ({ $axios, params }) {
    const attendee = (await $axios.$get('https://bokoblin.herokuapp.com/?query={attendee(id:' + params.id + '){id,name,house,house_color,rank,segments{id,game{title,id,isZelda,isEvent},modifier,marathon{id,full_name,color},runners{attendee{name,id,rank},runner_rank},filenames{filename,note},raised,start_time,end_time,vod,time_offset}}}')).data.attendee
    const segments = attendee.segments
    if (segments.length > 0) {
      const commentarySegments = []
      const gameplaySegments = []
      let show = 0
      segments.map((segment) => {
        switch (segment.runners.filter((r, i) => { return r.attendee.id === attendee.id })[0].runner_rank) {
          case 0:
          case 2:
            gameplaySegments.push(segment)
            break
          case 1:
            commentarySegments.push(segment)
            break
        }
      })
      const raised = Math.ceil((segments.map(segment => parseFloat(segment.raised))).reduce((total, val) => { return total + val }) * 100) / 100
      if (gameplaySegments.length === 0 && commentarySegments.length > 0) {
        show = 1
      }
      return { attendee, segments, gameplaySegments, commentarySegments, raised, show }
    }
    return { attendee }
  },
  data ({ params }) {
    return {
      attendee: {},
      segments: [],
      gameplaySegments: [],
      commentarySegments: [],
      raised: 0,
      show: 0
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
          hid: 'og:title',
          property: 'og:title',
          content: this.attendee.name + ' - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.attendee.name + (this.segments.length > 0 ? ', including ' + this.segments.length + ' segments' : '') + '.'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#' + this.attendee.house_color
        }
      ]
    }
  }
}
</script>
