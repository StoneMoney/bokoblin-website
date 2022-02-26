<template>
  <div class="mcard-container">
    <div class="marathon-id" :style="'background-color: #'+data.color">
      <nuxt-link :to="'/marathon/'+data.id">
        <img v-if="data.type == 'Flagship' || data.type == 'Flagship Mini' || data.type == 'Special Event'" :src="require('~/assets/marathon-rot/'+data.id+'.svg')" class="marathon-logo" :alt="data.full_name+' logo'">
        <img v-else-if="data.type == 'Piece of Heart'" :src="require('~/assets/marathon-rot/500.svg')" class="marathon-logo-broad" :alt="data.full_name+' logo'">
        <img v-else-if="data.type == 'Side Quest'" :src="require('~/assets/marathon-rot/400.svg')" class="marathon-logo-broad" :alt="data.full_name+' logo'">
      </nuxt-link>
      <!-- <img src="~/assets/1.jpg"> -->
    </div>
    <b-card class="inline" :sub-title="(new Date(data.start_date)).toLocaleString()">
      <div class="marathonicon m-3">
        <img
          v-if="data.type_id === 1"
          v-b-tooltip.hover
          src="~/static/1.svg"
          width="24px"
          class="text-right"
          title="Flagship Event"
          alt="Z"
        >
        <img
          v-else-if="data.type_id === 2"
          v-b-tooltip.hover
          src="~/static/1.svg"
          width="24px"
          class="text-right"
          title="Flagship Mini"
          alt="Z"
        >
        <img
          v-else-if="data.type_id === 3"
          v-b-tooltip.hover
          src="~/static/3.svg"
          width="24px"
          class="text-right"
          title="Parallel Worlds"
          alt="PW"
        >
        <img
          v-else-if="data.type_id === 4"
          v-b-tooltip.hover
          src="~/static/4.svg"
          width="24px"
          class="text-right"
          title="Side Quest"
          alt="SQ"
        >
        <img
          v-else-if="data.type_id === 5"
          v-b-tooltip.hover
          src="~/static/5.svg"
          width="24px"
          class="text-right"
          title="Piece of Heart"
          alt="PoH"
        >
        <img
          v-else-if="data.type_id === 6"
          v-b-tooltip.hover
          src="~/static/6.svg"
          width="24px"
          class="text-right"
          title="Special Event"
          alt="Star"
        >
      </div>
      <b-card-title>
        <nuxt-link :to="'/marathon/'+data.id">
          {{ data.full_name }}
          <span class="h6 mb-2"><b-icon-arrow-up-right-circle-fill /></span>
        </nuxt-link>
      </b-card-title>
      <b-card-text v-if="beforeStart">
        Has not started yet!
      </b-card-text>
      <b-card-text v-else-if="beforeEnd">
        Ongoing!
      </b-card-text>
      <b-card-text v-else>
        Raised {{ toUSD(data.total) }} for <nuxt-link :to="'/cause/'+data.charity.id">
          {{ data.charity.full_name }}
        </nuxt-link>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BIconArrowUpRightCircleFill } from 'bootstrap-vue'

export default {
  components: {
    BIconArrowUpRightCircleFill
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      beforeStart: false,
      beforeEnd: false
    }
  },
  mounted () {
    const start = new Date(this.data.start_date)
    const stop = new Date(this.data.stop_date)
    const now = new Date()
    this.beforeStart = (start.getTime() > now.getTime())
    this.beforeEnd = (stop.getTime() > now.getTime())
  },
  methods: {
    toUSD (input) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(input)
    }
  }
}
</script>
<style scoped>
.card {
  border-radius: 0px .25rem .25rem 0px;
}
.mcard-container {
  display: grid;
  grid-template-columns: 35px 1fr;
}
.marathon-id {
  border-radius: .25rem 0px 0px .25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.marathon-logo {
  height: 105px;
  width: 35px;
}
.marathon-logo-broad {
  width: 20px;
}
.marathonicon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
