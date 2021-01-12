<template>
  <b-row class="m-1">
    <b-col class="m-3" sm="12" md="5">
      <h1>
        <b-badge :style="'background-color:#'+segment.marathon.color">
          {{ segment.marathon.id }}
        </b-badge> Marathon
      </h1>
      <MarathonCard :key="'m'+segment.marathon.id" :data="segment.marathon" />
      <h1>
        <b-badge>
          {{ segment.id }}
        </b-badge> Segment
      </h1>
      <SegmentCard :key="segment.id" :data="segment" />
      <b-list-group class="mt-3">
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Start time: {{ (new Date(segment.start_time)).toLocaleString() }} ({{ getDuration(segment.marathon.start_date,segment.start_time) }})
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          End time: {{ (new Date(segment.end_time)).toLocaleString() }} ({{ getDuration(segment.marathon.start_date,segment.end_time) }})
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          Raised: {{ toUSD(parseFloat(segment.raised) / getDurationNumberal(segment.start_time,segment.end_time)) }}/hr
        </b-list-group-item>
      </b-list-group>
    </b-col>
    <b-col v-if="segment.vod" class="pt-3" sm="12" md="6">
      <h1>VOD</h1>
      <b-card>
        <client-only placeholder="Loading...">
          <youtube
            :player-vars="{
              start: segment.time_offset,
              listType: 'playlist',
              list: segment.marathon.playlist
            }"
            player-width="100%"
            :video-id="segment.vod"
          />
        </client-only>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import SegmentCard from '~/components/SegmentCard'
import MarathonCard from '~/components/MarathonCard'
export default {
  components: {
    SegmentCard,
    MarathonCard
  },
  async asyncData ({ $axios, $luxon, params }) {
    const segment = (await $axios.$get('https://bokoblin.herokuapp.com/?query={segment(id:' + params.id + '){id,game{title,id,isZelda,isEvent},modifier,runners{attendee{name,id,rank},runner_rank},filenames{filename,note},raised,start_time,end_time,vod,time_offset,marathon{id,color,full_name,slug,type_id,total,start_date,playlist,charity{id,full_name}}}}')).data.segment
    const currentPage = segment.id
    return { segment, currentPage }
  },
  data () {
    return {
      segment: [],
      rows: 100,
      currentPage: 0
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
    if (this.segment.vod) {
      return {
        title: this.segment.game.title + ' @ ' + this.segment.marathon.slug + ' - Bokoblin',
        meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            hid: 'description',
            name: 'description',
            content: 'Bokoblin archive data for ' + this.segment.game.title + ' at ' + this.segment.marathon.full_name + ' which raised ' + this.toUSD(this.segment.raised) + ' for ' + this.segment.marathon.charity.full_name + '.'
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: this.segment.game.title + ' @ ' + this.segment.marathon.slug + ' - Bokoblin'
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: 'Bokoblin archive data for ' + this.segment.game.title + ' at ' + this.segment.marathon.full_name + ' which raised ' + this.toUSD(this.segment.raised) + ' for ' + this.segment.marathon.charity.full_name + '.'
          },
          {
            hid: 'theme-color',
            property: 'theme-color',
            content: '#' + this.segment.marathon.color
          },
          {
            hid: 'og:video',
            property: 'og:video',
            content: 'https://youtube.com/embed/' + this.segment.vod + (this.segment.marathon.playlist ? '?list=' + this.segment.marathon.playlist : '') + (this.segment.time_offset ? (this.segment.marathon.playlist ? '&' : '?') + 't=' + this.segment.time_offset : '')
          },
          {
            hid: 'og:video:url',
            property: 'og:video:url',
            content: 'http://youtube.com/embed/' + this.segment.vod + (this.segment.marathon.playlist ? '?list=' + this.segment.marathon.playlist : '') + (this.segment.time_offset ? (this.segment.marathon.playlist ? '&' : '?') + 't=' + this.segment.time_offset : '')
          },
          {
            hid: 'og:video:secure_url',
            property: 'og:video:secure_url',
            content: 'https://youtube.com/embed/' + this.segment.vod + (this.segment.marathon.playlist ? '?list=' + this.segment.marathon.playlist : '') + (this.segment.time_offset ? (this.segment.marathon.playlist ? '&' : '?') + 't=' + this.segment.time_offset : '')
          },
          {
            hid: 'og:video:width',
            property: 'og:video:width',
            content: '1280'
          },
          {
            hid: 'og:video:height',
            property: 'og:video:height',
            content: '720'
          },
          {
            hid: 'og:video:type',
            property: 'og:video:type',
            content: 'text/html'
          },
          {
            hid: 'og:type',
            property: 'og:type',
            content: 'video.other'
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: 'http://i3.ytimg.com/vi/' + this.segment.vod + '/maxresdefault.jpg'
          },
          {
            hid: 'og:image:secure_url',
            property: 'og:image',
            content: 'https://i3.ytimg.com/vi/' + this.segment.vod + '/maxresdefault.jpg'
          },
          {
            hid: 'og:image:url',
            property: 'og:image:url',
            content: 'http://i3.ytimg.com/vi/' + this.segment.vod + '/maxresdefault.jpg'
          },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: '1280'
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: '720'
          },
          {
            hid: 'og:image:type',
            property: 'og:image:type',
            content: 'image/jpg'
          },
          {
            hid: 'twitter:card',
            property: 'twitter:card',
            content: 'player'
          },
          {
            hid: 'twitter:site',
            property: 'twitter:site',
            content: '@bokoblindocs'
          },
          {
            hid: 'twitter:player',
            property: 'twitter:player',
            content: 'https://youtube.com/embed/' + this.segment.vod + (this.segment.marathon.playlist ? '?list=' + this.segment.marathon.playlist : '') + (this.segment.time_offset ? (this.segment.marathon.playlist ? '&' : '?') + 't=' + this.segment.time_offset : '')
          },
          {
            hid: 'twitter:player:width',
            property: 'twitter:player:width',
            content: '1280'
          },
          {
            hid: 'twitter:player:height',
            property: 'twitter:player:height',
            content: '720'
          },
          {
            hid: 'twitter:image',
            property: 'twitter:image',
            content: 'https://i3.ytimg.com/vi/' + this.segment.vod + '/maxresdefault.jpg'
          }
        ]
      }
    }
    return {
      title: this.segment.game.title + ' @ ' + this.segment.marathon.slug + ' - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.segment.game.title + ' at ' + this.segment.marathon.full_name + ' which raised ' + this.toUSD(this.segment.raised) + ' for ' + this.segment.marathon.charity.full_name + '.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.segment.game.title + ' @ ' + this.segment.marathon.slug + ' - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.segment.game.title + ' at ' + this.segment.marathon.full_name + ' which raised ' + this.toUSD(this.segment.raised) + ' for ' + this.segment.marathon.charity.full_name + '.'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#' + this.segment.marathon.color
        }
      ]
    }
  }
}
</script>
