<template>
  <div>
    <b-row class="m-1">
      <b-col sm="9" md="4">
        <h1>
          <b-badge :style="'background-color:#'+marathon.color">
            <div class="badge-logo">
              <span>{{ marathon.id }}</span>
              <img v-if="marathon.type_id <= 2" :src="require('~/assets/marathon/'+marathon.id+'.svg')" class="marathon-logo pl-2" :alt="marathon.full_name+' logo'">
              <img v-else :src="require('~/assets/marathon/'+(marathon.type_id*100)+'.png')" class="marathon-logo-broad pl-2" :alt="marathon.full_name+' logo'">
            </div>
          </b-badge> {{ marathon.full_name }}
        </h1>
        <b-list-group class="mt-1">
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Raised: {{ toUSD(marathon.total) }} <span v-b-tooltip.hover title="This includes pre/post marathon in it's total, but not its time">{{ toUSD(parseFloat(marathon.total) / getDurationNumberal(marathon.start_date,marathon.stop_date)) }}/hr*</span>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <span>Benefitting:
              <nuxt-link :to="'/cause/'+marathon.charity.id">
                {{ marathon.charity.slug }}
              </nuxt-link>
            </span>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Started: {{ (new Date(marathon.start_date)).toLocaleString() }}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Ended: {{ (new Date(marathon.stop_date)).toLocaleString() }}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Duration: {{ getDuration(marathon.start_date, marathon.stop_date) }}
          </b-list-group-item>
          <b-list-group-item v-if="marathon.attendance.length > 0" class="d-flex justify-content-between align-items-center">
            Attendees: {{ marathon.attendance.length }}
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Type: {{ marathon.type }}
          </b-list-group-item>
        </b-list-group>
        <span v-if="marathon.attendance.length > 0">
          <h2>Attendance</h2>
          <b-list-group>
            <template v-for="attended in marathon.attendance">
              <b-list-group-item v-if="attended.present == 1 && attended.attendee.rank !== 'Inactive'" :key="attended.attendee.id" v-b-tooltip.hover.right="attended.award ? '&quot;'+attended.award+'&quot; award' : ''">
                <nuxt-link :to="'/attendee/'+attended.attendee.id">
                  {{ attended.attendee.name }}
                </nuxt-link>
              </b-list-group-item>
            </template>
          </b-list-group>
        </span>
      </b-col>
      <b-col v-if="segments.length > 0">
        <h1>Segments ({{ segments.length }})</h1>
        <template v-for="segment in segments">
          <div :key="segment.id" class="mb-3">
            <SegmentCard :data="segment" />
          </div>
        </template>
      </b-col>
      <b-col v-else>
        <h3>There are no records of segments at this marathon</h3>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SegmentCard from '~/components/SegmentCard'
export default {
  components: {
    SegmentCard
  },
  async asyncData ({ $axios, params }) {
    const marathon = (await $axios.$get('https://bokoblin.herokuapp.com/?query={marathon(id:' + params.id + '){id,color,type,type_id,total,full_name,start_date,stop_date,charity{id,slug},attendance{attendee{id,name,rank},award,present}segments{id,game{title,id,isZelda,isEvent},modifier,runners{attendee{name,id,rank},runner_rank},filenames{filename,note},raised,start_time,end_time,vod,time_offset}}}')).data.marathon
    const segments = marathon.segments
    return { marathon, segments }
  },
  data () {
    return {
      marathon: {},
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
      title: this.marathon.full_name + ' - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.marathon.full_name + ' which raised ' + this.toUSD(this.marathon.total) + ' for ' + this.marathon.charity.slug + (this.segments.length > 0 ? ', over ' + this.segments.length + ' segments' : '') + '.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.marathon.full_name + ' - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.marathon.full_name + ' which raised ' + this.toUSD(this.marathon.total) + ' for ' + this.marathon.charity.slug + (this.segments.length > 0 ? ', over ' + this.segments.length + ' segments' : '') + '.'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#' + this.marathon.color
        }
      ]
    }
  }
}
</script>
<style scoped>
.badge-logo {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.marathon-logo {
  padding-top: 5px;
  height: 25px;
}
.marathon-logo-broad {
  height: 25px;
  margin-top: 5px;
}
</style>
