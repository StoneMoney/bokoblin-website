<template>
  <div>
    <span v-if="$fetchState.pending" key="pending">
      <b-container class="loading-zone text-center">
        <b-spinner style="width: 7rem; height: 7rem;margin-left: auto;margin-right:auto;" variant="danger" type="grow" label="Spinning" />
        <h1 class="text-grey mt-2">
          Loading
        </h1>
      </b-container>
    </span>
    <span v-else-if="$fetchState.error" key="errored">
      Error in Fetching...
    </span>
    <span v-else key="success">
      <h1 class="m-3">
        <b-badge>
          {{ game.id }}
        </b-badge>
        <span v-if="game.isZelda" v-b-tooltip.hover class="h2" title="Zelda Game">
          <b-icon-map-fill variant="secondary" />
        </span>
        <span v-if="game.isEvent" v-b-tooltip.hover class="h2" title="Special Event">
          <b-icon-star-fill variant="secondary" />
        </span>
        {{ game.title }}
      </h1>
      <b-col sm="9" md="4">
        <b-list-group class="m-1">
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Raised: {{ toUSD(raised) }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <span v-if="segments.length > 0">
        <h1 class="m-3">Segments ({{ segments.length }})</h1>
        <template v-for="segment in segments">
          <b-col :key="segment.id" md="7" lg="6" xl="5" class="mb-3">
            <SegmentCard :data="segment" />
          </b-col>
        </template>
      </span>
      <b-col v-else>
        <h3>There are no records of segments played of this game</h3>
      </b-col>
    </span>
  </div>
</template>

<script>
import { BIconStarFill, BIconMapFill } from 'bootstrap-vue'
import SegmentCard from '~/components/SegmentCard'
export default {
  components: {
    BIconStarFill,
    BIconMapFill,
    SegmentCard
  },
  async fetch () {
    this.game = (await this.$axios.$get(`https://api.bokoblin.com/?query={game(id:${this.$route.params.id}){id,title,isZelda,isEvent,segments{id,modifier,raised,game{id,title},marathon{full_name,color,id},runners{attendee{name,id,rank},runner_rank},filenames{filename,note},raised,start_time,end_time,vod,time_offset}}}`)).data.game
    if (!this.game) {
      // set status code on server and
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      // use throw new Error()
      this.$nuxt.context.error({
        status: 404,
        message: 'Could not find game with id of ' + this.$route.params.id
      })
      throw new Error('404')
    } else {
      this.segments = this.game.segments
      let raised = 0
      if (this.segments.length > 0) {
        raised = Math.ceil((this.segments.map(segment => parseFloat(segment.raised))).reduce((total, val) => { return total + val }) * 100) / 100
      }
      this.raised = raised
    }
  },
  data () {
    return {
      game: {},
      segments: [],
      raised: 0
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
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(input)
    }
  },
  head () {
    if (this.$fetchState.pending) {
      return {
        title: 'Loading - Bokoblin'
      }
    }
    if (this.$fetchState.error) {
      return {
        title: '404 - Bokoblin'
      }
    }
    return {
      title: this.game.title + ' - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.game.title + (this.segments.length > 0 ? ', which has been run ' + this.segments.length + ' times' : '') + '.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.game.title + ' - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.game.title + (this.segments.length > 0 ? ', which has been run ' + this.segments.length + ' times' : '') + '.'
        }
      ]
    }
  }
}
</script>
