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
      <b-row class="m-1">
        <b-col sm="12" md="4">
          <h1>
            <b-badge :style="'background-color:#'+marathon.color">
              <div class="badge-logo">
                <span>{{ marathon.id }}</span>
                <img v-if="marathon.type_id <= 2 || marathon.type_id == 6" :src="require('~/assets/marathon/'+marathon.id+'.svg')" class="marathon-logo pl-2" :alt="marathon.full_name+' logo'">
                <img v-else :src="require('~/assets/marathon/'+(marathon.type_id*100)+'.svg')" class="marathon-logo-broad pl-2" :alt="marathon.full_name+' logo'">
              </div>
            </b-badge> {{ marathon.full_name }}
          </h1>
          <span v-if="marathon.id == 27">
            <b-container role="banner">
              <b-card bg-variant="danger" class="text-light">
                <b-icon-exclamation-diamond-fill /> This event will be ongoing and data updates will not be available within Bokoblin until the conclusion of the event!
                For the latest you can view the data in classic view @ <a href="https://doc.bokoblin.com">doc.bokoblin.com</a>
              </b-card>
            </b-container>
          </span>
          <b-list-group class="mt-1">
            <b-list-group-item v-if="beforeStart">
              Has not started yet!
            </b-list-group-item>
            <b-list-group-item v-else-if="beforeEnd">
              Ongoing Event!
            </b-list-group-item>
            <b-list-group-item v-else class="d-flex justify-content-between align-items-center">
              <span><b>Raised:</b> {{ toUSD(marathon.total) }}</span> <span v-b-tooltip.hover title="This includes pre/post marathon in it's total, but not its time">{{ toUSD(parseFloat(marathon.total) / getDurationNumberal(marathon.start_date,marathon.stop_date)) }}/hr*</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <span><b>Benefitting:</b>
                <nuxt-link :to="'/cause/'+marathon.charity.id">
                  {{ marathon.charity.slug }}
                </nuxt-link>
              </span>
            </b-list-group-item>

            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <span><b>{{ beforeStart ? "Starting" : "Started" }}:</b> {{ (new Date(marathon.start_date)).toLocaleString() }}</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <span><b>{{ beforeEnd ? "Ending" : "Ended" }}:</b> {{ (new Date(marathon.stop_date)).toLocaleString() }}</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <span><b>Duration:</b> {{ getDuration(marathon.start_date, marathon.stop_date) }}{{ beforeEnd ? "*" : "" }}</span>
            </b-list-group-item>
            <b-list-group-item v-if="marathon.playlist" class="d-flex justify-content-between align-items-center">
              <span><b>Watch:</b> <a ref="noreferrer" :href="`https://www.youtube.com/playlist?list=${marathon.playlist}`" target="_blank">Youtube Playlist</a></span>
            </b-list-group-item>
            <b-list-group-item v-if="marathon.attendance.length > 0" class="d-flex justify-content-between align-items-center">
              <span><b>Attendees:</b> {{ marathon.attendance.length }}</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <span><b>Type:</b> {{ marathon.type }}</span>
            </b-list-group-item>
          </b-list-group>
          <span v-if="marathon.attendance.length > 0">
            <h2>Attendance <span v-b-tooltip.hover title="The count is accurate, however this list may exclude inactive team members">({{ marathon.attendance.length }})</span></h2>
            <b-button v-b-toggle.collapse-1 variant="primary" @click="attendance = !attendance">Click to {{ attendance ? "close" : "expand" }}</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              <b-list-group>
                <template v-for="attended in marathon.attendance">
                  <b-list-group-item v-if="attended.present == 1 && attended.attendee.rank !== 'Inactive'" :key="attended.attendee.id" v-b-tooltip.hover.right="attended.award ? '&quot;'+attended.award+'&quot; award' : ''">
                    <nuxt-link :to="'/attendee/'+attended.attendee.id">
                      {{ attended.attendee.name }}
                    </nuxt-link>
                  </b-list-group-item>
                </template>
              </b-list-group>
            </b-collapse>
          </span>
        </b-col>
        <b-col sm="12" md="8">
          <span v-if="marathon.donationsTime.length > 0" class="mb-3">
            <h1>Donations over Time</h1>
            <donations-over-time-graph :data="marathon" class="donationsovertime" />
          </span>
          <span v-if="segments.length > 0">
            <h1>Segments ({{ segments.length }})</h1>
            <template v-for="segment in segments">
              <div :key="segment.id" class="mb-3">
                <SegmentCard :data="segment" />
              </div>
            </template>
          </span>
          <span v-else>
            <h3>There are no records of segments at this marathon</h3>
          </span>
        </b-col>
      </b-row>
    </span>
  </div>
</template>

<script>
import SegmentCard from '~/components/SegmentCard'
import DonationsOverTimeGraph from '~/components/DonationsOverTimeGraph'
export default {
  components: {
    SegmentCard,
    DonationsOverTimeGraph
  },
  async fetch () {
    this.marathon = (await this.$axios.$get(`https://api.bokoblin.com/?query={marathon(id:${this.$route.params.id}){id,color,type,type_id,total,full_name,playlist,start_date,stop_date,donationsTime{hour,total},charity{id,slug},attendance{attendee{id,name,rank},award,present}segments{id,game{title,id,isZelda,isEvent},modifier,runners{attendee{name,id,rank},runner_rank},filenames{filename,note},raised,start_time,end_time,vod,time_offset}}}`)).data.marathon
    if (!this.marathon) {
      // set status code on server and
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      // use throw new Error()
      this.$nuxt.context.error({
        status: 404,
        message: 'Could not find marathon with id of ' + this.$route.params.id
      })
      throw new Error('404')
    } else {
      this.segments = this.marathon.segments
      // without this, the head() doesn't work. Don't ask why
      this.charity = this.marathon.charity
    }
  },
  data () {
    return {
      marathon: {},
      segments: [],
      attendance: false,
      beforeStart: false,
      beforeEnd: false
    }
  },
  mounted () {
    const start = new Date(this.marathon.start_date)
    const stop = new Date(this.marathon.stop_date)
    const now = new Date()
    this.beforeStart = (start.getTime() > now.getTime())
    this.beforeEnd = (stop.getTime() > now.getTime())
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
    // Strange issues with not being able to find inner-objects when using a nuxt-link
    // Meta-data is pointless for this state
    if (!this.marathon.charity) {
      return {}
    }
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
.donationsovertime {
  height: 290px;
}
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
