<template>
  <div>
    <b-container class="m-3">
      <b-card header-tag="header" :style="$route.name == 'attendee-id' || $route.name == 'game-id' ? 'border-left: 10px solid #'+data.marathon.color : ''">
        <template #header>
          <div class="header-row">
            <h6 class="mb-0">
              <nuxt-link v-if="$route.name !== 'segment-id'" :to="'/segment/'+data.id">
                <b-icon-arrows-angle-expand /> expand
              </nuxt-link>
              &loz; {{ (new Date(data.start_time)).toLocaleString(options) }} &loz; Duration {{ getDuration(data.start_time,data.end_time) }} &loz; Raised {{ toUSD(data.raised) }}
            </h6>
            <div class="text-right">
              <span v-if="$route.name == 'attendee-id' || $route.name == 'game-id'">{{ data.marathon.slug }}</span>
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
        </template>
        <b-card-title>
          <nuxt-link :to="'/game/'+data.game.id">
            {{ data.game.title }}
          </nuxt-link>
          <h6>{{ data.modifier }}</h6>
        </b-card-title>
        <b-card-text>
          <span v-if="data.runners[0]">with </span>
          <template v-for="(runner,index) in data.runners">
            <span :key="runner.id">
              <nuxt-link :to="'/attendee/'+runner.id"> {{ runner.name }}</nuxt-link><span v-if="(index+1) !== data.runners.length">,</span>
            </span>
          </template>
        </b-card-text>
        <b-card-text>
          <b v-if="data.filenames[1]">Filenames: </b>
          <b v-else-if="data.filenames[0]">Filename: </b>
          <template v-for="(filename,index) in data.filenames">
            <span :key="filename.filename+filename.note"> {{ filename.filename }}<em v-if="filename.note"> ({{ filename.note }})</em><span v-if="(index+1) !== data.filenames.length">,</span></span>
          </template>
        </b-card-text>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { BIconArrowsAngleExpand, BIconCameraVideoFill, BIconStarFill, BIconMapFill } from 'bootstrap-vue'

export default {
  components: {
    BIconArrowsAngleExpand,
    BIconCameraVideoFill,
    BIconStarFill,
    BIconMapFill
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
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
