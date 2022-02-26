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
        <b-col md="3">
          <h1 class="mb-3">
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
          <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              Status (rank): {{ attendee.rank }}
            </b-list-group-item>
            <b-list-group-item v-if="raised > 0" class="d-flex justify-content-between align-items-center">
              Raised: {{ toUSD(raised) }}
            </b-list-group-item>
          </b-list-group>
          <span v-if="(attendee.flagshipAttendance.length + attendee.otherAttendance.length) > 0">
            <h2>Attendance</h2>
            <span v-if="attendee.flagshipAttendance.length > 0">
              <div class="trophy">
                <img src="~/static/Trophy_Top.svg" alt="trophy top, a triforce">
              </div>
              <template v-for="attended in attendee.flagshipAttendance">
                <div v-if="attended.marathon.id < 100" :key="attended.marathon.id" v-b-tooltip.hover.right="attended.award ? '&quot;'+attended.award+'&quot; award' : 'Attendee'" class="attendance-item" :style="'background-color:#'+attended.marathon.color">
                  <nuxt-link :to="'/marathon/'+attended.marathon.id" class="unstyledx">
                    <b-icon-controller v-if="attended.runner" v-b-tooltip="'Game Runner'" />
                    <img :src="require('~/assets/marathon/'+attended.marathon.id+'.svg')" class="marathon-logo" :alt="attended.marathon.slug">
                    <span v-if="attended.present == 0" v-b-tooltip.hover.bottom="'Recieved award, but was not present at marathon'">*</span>
                  </nuxt-link>
                </div>
              </template>
              <div class="trophy">
                <img src="~/static/Trophy_Bottom.svg" alt="trophy bottom, a Zeldathon logo">
              </div>
            </span>
            <div class="attendance-other-shelf">
              <template v-for="attended in attendee.otherAttendance">
                <div v-if="attended.marathon.id > 100" :key="attended.marathon.id" v-b-tooltip.hover.bottom="attended.marathon.full_name + ' Participant'" class="attendance-other" :style="'background-color:#'+attended.marathon.color">
                  <nuxt-link :to="'/marathon/'+attended.marathon.id" class="unstyledx">
                    <img
                      v-if="attended.marathon.type === 'Flagship'"
                      src="~/static/1.svg"
                      width="24px"
                      alt="Z"
                    >
                    <img
                      v-else-if="attended.marathon.type === 'Flagship Mini'"
                      src="~/static/1.svg"
                      width="24px"
                      alt="Z"
                    >
                    <img
                      v-else-if="attended.marathon.type === 'Parallel Worlds'"
                      src="~/static/3.svg"
                      width="24px"
                      alt="PW"
                    >
                    <img
                      v-else-if="attended.marathon.type === 'Side Quest'"
                      src="~/static/4.svg"
                      width="24px"
                      alt="SQ"
                    >
                    <img
                      v-else-if="attended.marathon.type === 'Piece of Heart'"
                      src="~/static/5.svg"
                      width="24px"
                      alt="PoH"
                    >
                    <img
                      v-else-if="attended.marathon.type === 'Special Event'"
                      src="~/static/6.svg"
                      width="24px"
                      alt="Star"
                    >
                    <span v-if="attended.present == 0" v-b-tooltip.hover.bottom="'Was not present at marathon'">*</span>
                  </nuxt-link>
                </div>
              </template>
            </div>
          </span>
        </b-col>
        <b-col>
          <span v-if="segments.length > 0">
            <div class="mb-2">
              <h1>
                Segments ({{ segments.length }})
              </h1>
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
            </div>
            <span v-if="show == 0">
              <template v-for="segment in gameplaySegments">
                <div
                  :key="segment.id"
                  class="mb-3"
                >
                  <SegmentCard :data="segment" />
                </div>
              </template>
            </span>
            <span v-else-if="show == 1">

              <template v-for="segment in commentarySegments">
                <div
                  :key="segment.id"
                  class="mb-3"
                >
                  <SegmentCard :data="segment" />
                </div>
              </template>
            </span>
          </span>
          <h3 v-else>
            There are no records of segments played by this attendee
          </h3>
        </b-col>
      </b-row>
    </span>
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
  async fetch () {
    this.attendee = (
      await this.$axios.$get(
        `https://api.bokoblin.com/?query={attendee(id:${this.$route.params.id}){id,name,house,house_color,rank,attendance{present,award,marathon{id,slug,full_name,color,type}},segments{id,game{title,id,isZelda,isEvent},modifier,marathon{id,full_name,slug,color,type},runners{attendee{name,id,rank},runner_rank},filenames{filename,note},raised,start_time,end_time,vod,time_offset}}}`
      )
    ).data.attendee
    if (!this.attendee) {
      // set status code on server and
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      // use throw new Error()
      this.$nuxt.context.error({
        status: 404,
        message: 'Could not find an attendee with id of ' + this.$route.params.id
      })
      throw new Error('404')
    } else {
      this.segments = this.attendee.segments
      const commentarySegments = []
      const gameplaySegments = []
      const marathons = this.segments.map((segment) => {
        return segment.marathon
      })
      this.segments.map((segment) => {
        switch (
          segment.runners.filter((r, i) => {
            return r.attendee.id === this.attendee.id
          })[0].runner_rank
        ) {
          case 0:
          case 2:
            gameplaySegments.push(segment)
            break
          case 1:
            commentarySegments.push(segment)
            break
        }
      })
      if (this.segments.length > 0) {
        this.raised =
        Math.ceil(
          this.segments
            .map(segment => parseFloat(segment.raised))
            .reduce((total, val) => {
              return total + val
            }) * 100
        ) / 100
      }
      if (gameplaySegments.length === 0 && commentarySegments.length > 0) {
        this.show = 1
      }
      // Get array of all marathons present within segments, eliminating repeats
      const allIds = marathons.map(el => parseInt(el.id))
      const marathonsWithSegments = allIds.filter((c, index) => {
        return allIds.indexOf(c) === index
      })
      // Create another method with the same list that will later be shrunk as the attendance object is merged
      let marathonsWithSegmentsWithoutAttendance = marathonsWithSegments
      const flagshipAttendanceObj = []
      const otherAttendanceObj = []
      // For every attendance object....
      this.attendee.attendance.forEach(function (attended) {
      // See if a segment was run in that marathon to match
        if (marathonsWithSegments.includes(parseInt(attended.marathon.id))) {
        // Attribute a runner credit
          attended.runner = true
          // Remove marathon ID from list of marathons that DO NOT have an attendance credit
          marathonsWithSegmentsWithoutAttendance = marathonsWithSegmentsWithoutAttendance.filter(
            function (value) {
              return value !== parseInt(attended.marathon.id)
            }
          )
        // No segment for this marathon
        } else {
          attended.runner = false
        }
        if (parseInt(attended.marathon.id) < 100) {
          flagshipAttendanceObj.push(attended)
        } else {
          otherAttendanceObj.push(attended)
        }
      })
      // Every marathon WITH a run but did not have any attendance credit
      marathonsWithSegmentsWithoutAttendance.forEach(function (noseg) {
        const att = {
          present: 1,
          runner: true,
          marathon: marathons.find(element => parseInt(element.id) === noseg),
          award: ''
        }
        if (parseInt(att.marathon.id) < 100) {
          flagshipAttendanceObj.push(att)
        } else {
          otherAttendanceObj.push(att)
        }
      })
      // Sort marathon attendance by highest ID first
      flagshipAttendanceObj.sort((b, a) => {
        return a.marathon.id - b.marathon.id
      })
      // Sort marathon attendance by highest ID first
      otherAttendanceObj.sort((b, a) => {
        return a.marathon.id - b.marathon.id
      })
      // Add to our attendee object
      this.attendee.flagshipAttendance = flagshipAttendanceObj
      this.attendee.otherAttendance = otherAttendanceObj
      this.gameplaySegments = gameplaySegments
      this.commentarySegments = commentarySegments
      this.marathons = marathons
    }
  },
  data () {
    return {
      attendee: {},
      segments: [],
      marathons: [],
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
      let hours = parseInt(duration / (1000 * 60 * 60))
      hours = hours < 10 && hours >= 0 ? '0' + hours : hours
      minutes = minutes < 10 && minutes >= 0 ? '0' + minutes : minutes
      seconds = seconds < 10 && seconds >= 0 ? '0' + seconds : seconds
      return hours + ':' + minutes + ':' + seconds
    },
    getDurationNumberal (start, stop) {
      const startDate = new Date(start).getTime()
      const stopDate = new Date(stop).getTime()
      const duration = stopDate - startDate
      let seconds = parseInt((duration / 1000) % 60)
      let minutes = parseInt((duration / (1000 * 60)) % 60)
      let hours = parseInt(duration / (1000 * 60 * 60))
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
    if (!this.attendee) {
      return {}
    }
    return {
      title: this.attendee.name + ' - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content:
            'Bokoblin archive data for ' +
            this.attendee.name +
            (this.segments.length > 0
              ? ', including ' + this.segments.length + ' segments'
              : '') +
            '.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.attendee.name + ' - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Bokoblin archive data for ' +
            this.attendee.name +
            (this.segments.length > 0
              ? ', including ' + this.segments.length + ' segments'
              : '') +
            '.'
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

<style scoped>
.attendance-item {
  font-weight: bolder;
  font-style: italic;
  font-size: 1.2rem;
  padding: 5px 0px 5px 0px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  max-width: 190px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
.trophy {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.trophy img {
  max-width: 220px;
}
.attendance-other-shelf {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.attendance-other {
  border-radius: 50px;
  font-size: 1.2rem;
  padding: 10px;
  margin: 10px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.attendance-other img {
  filter: invert();
}
.marathon-logo {
  height: 30px;
  width: 110px;
}
</style>
