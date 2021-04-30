<template>
  <div class="mcard-container">
    <div class="marathon-id" :style="'background-color: #'+data.color">
      <nuxt-link :to="'/marathon/'+data.id">
        <img v-if="data.type_id <= 2" :src="require('~/assets/marathon-rot/'+data.id+'.svg')" class="marathon-logo" :alt="data.full_name+' logo'">
        <img v-else :src="require('~/assets/marathon-rot/'+(data.type_id*100)+'.png')" class="marathon-logo-broad" :alt="data.full_name+' logo'">
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
      </div>
      <b-card-title>
        <nuxt-link :to="'/marathon/'+data.id">
          {{ data.full_name }}
          <span class="h6 mb-2"><b-icon-arrow-up-right-circle-fill /></span>
        </nuxt-link>
      </b-card-title>
      <b-card-text>
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
  methods: {
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
