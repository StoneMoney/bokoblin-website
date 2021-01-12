<template>
  <div>
    <b-card header-tag="header" footer-tag="footer" :style="$route.name == 'attendee-id' || $route.name == 'game-id' ? 'border-left: 10px solid #'+data.marathon.color : ''">
      <template #header>
        <nuxt-link :to="'/segment/'+data.id" class="unstyledx">
          <div class="header-row">
            <h6 class="mb-0">
              <b v-if="$route.name !== 'segment-id'"><b-icon-arrows-angle-expand /> </b>
            &nbsp; {{ (new Date(data.start_time)).toLocaleString(options) }} &loz; Duration {{ getDuration(data.start_time,data.end_time) }} &loz; Raised {{ toUSD(data.raised) }}
            </h6>
            <div class="text-right">
              <span v-if="data.vod" v-b-tooltip.hover title="VOD Available">
                <b-icon-camera-video-fill />
              </span>
              <span v-if="data.game.isZelda" v-b-tooltip.hover title="Zelda Game">
                <b-icon-map-fill />
              </span>
              <span v-if="data.game.isEvent" v-b-tooltip.hover title="Special Event">
                <b-icon-star-fill />
              </span>
            </div>
          </div>
        </nuxt-link>
      </template>
      <b-card-title>
        <nuxt-link :to="'/game/'+data.game.id">
          {{ data.game.title }}
        </nuxt-link>
        <h6>{{ data.modifier }}</h6>
      </b-card-title>
      <b-card-sub-title v-if="$route.name == 'attendee-id' || $route.name == 'game-id'">
        <span><nuxt-link :to="'/marathon/'+data.marathon.id" class="unstyle">@ {{ data.marathon.full_name }}</nuxt-link></span>
      </b-card-sub-title>
      <div v-if="(commentary.length > 0 || players.length > 0) && hosts.length > 0">
        <span v-b-tooltip.hover :title="'Host' + (hosts.length > 1 ? 's':'')"><b-icon-broadcast /></span>
        <template v-for="(runner,index) in hosts">
          <span :key="runner.attendee.id">
            <nuxt-link v-if="runner.attendee.rank !== 'Inactive'" :to="'/attendee/'+runner.attendee.id" class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== hosts.length">,</span></nuxt-link>
            <span v-else class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== hosts.length">,</span></span>
          </span>
        </template>
      </div>
      <div v-if="(commentary.length > 0 || hosts.length > 0) && players.length > 0">
        <span v-b-tooltip.hover :title="'Participant' + (players.length > 1 ? 's':'')"><b-icon-controller /></span>
        <template v-for="(runner,index) in players">
          <span :key="runner.attendee.id">
            <nuxt-link v-if="runner.attendee.rank !== 'Inactive'" :to="'/attendee/'+runner.attendee.id" class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== players.length">,</span></nuxt-link>
            <span v-else class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== players.length">,</span></span>
          </span>
        </template>
      </div>
      <div v-if="(hosts.length > 0 || players.length > 0) && commentary.length > 0">
        <span v-b-tooltip.hover :title="'Commentator' + (commentary.length > 1 ? 's':'')"><b-icon-mic /></span>
        <template v-for="(runner,index) in commentary">
          <span :key="runner.attendee.id">
            <nuxt-link v-if="runner.attendee.rank !== 'Inactive'" :to="'/attendee/'+runner.attendee.id" class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== commentary.length">,</span></nuxt-link>
            <span v-else class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== commentary.length">,</span></span>
          </span>
        </template>
      </div>
      <div v-if="((hosts.length == 0 && players.length == 0) || (commentary.length == 0 && hosts.length == 0) || (players.length == 0 && commentary.length == 0) || (commentary.length == 0 && players.length == 0)) && (commentary.length > 0 || players.length > 0 || hosts.length > 0)">
        <span v-b-tooltip.hover :title="'Runner' + (data.runners.length > 1 ? 's':'')"><b-icon-controller /></span>
        <template v-for="(runner,index) in data.runners">
          <span :key="runner.attendee.id">
            <nuxt-link v-if="runner.attendee.rank !== 'Inactive'" :to="'/attendee/'+runner.attendee.id" class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== data.runners.length">,</span></nuxt-link>
            <span v-else class="unstyle"> {{ runner.attendee.name }}<span v-if="(index+1) !== data.runners.length">,</span></span>
          </span>
        </template>
      </div>
      <template v-if="data.filenames.length > 0" #footer>
        <b v-if="data.filenames[1]">Filenames: </b>
        <b v-else-if="data.filenames[0]">Filename: </b>
        <template v-for="(filename,index) in data.filenames">
          <span :key="filename.filename+filename.note"> {{ filename.filename }}<em v-if="filename.note"> ({{ filename.note }})</em><span v-if="(index+1) !== data.filenames.length">,</span></span>
        </template>
      </template>
    </b-card>
  </div>
</template>

<script>
import { BIconArrowsAngleExpand, BIconCameraVideoFill, BIconStarFill, BIconMapFill, BIconMic, BIconController, BIconBroadcast } from 'bootstrap-vue'

export default {
  components: {
    BIconArrowsAngleExpand,
    BIconCameraVideoFill,
    BIconStarFill,
    BIconMapFill,
    BIconMic,
    BIconController,
    BIconBroadcast
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      hosts: [],
      commentary: [],
      players: []
    }
  },
  created () {
    this.data.runners.map((runner) => {
      switch (runner.runner_rank) {
        case 0:
          this.hosts.push(runner)
          break
        case 1:
          this.commentary.push(runner)
          break
        case 2:
          this.players.push(runner)
          break
      }
    })
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
    toUSD (input) {
      const number = input.toString()
      let dollars = number.split('.')[0]
      const cents = (number.split('.')[1] || '') + '00'
      dollars = dollars.split('').reverse().join('')
        .replace(/(\d{3}(?!$))/g, '$1,')
        .split('').reverse().join('')
      return '$' + dollars + '.' + cents.slice(0, 2)
    }
  }
}
</script>

<style>
.header-row {
    display: grid;
    grid-template-columns: 90fr auto;
}
</style>
