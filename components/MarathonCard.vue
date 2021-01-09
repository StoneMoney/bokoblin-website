<template>
  <div>
    <b-card :sub-title="(new Date(data.start_date)).toLocaleString()" :style="'border-left: 10px solid #'+data.color">
      <div class="marathonicon m-3">
        <img
          v-if="data.type_id === 1"
          v-b-tooltip.hover
          src="~/static/1.svg"
          width="28px"
          class="text-right"
          title="Flagship Event"
        >
        <img
          v-else-if="data.type_id === 2"
          v-b-tooltip.hover
          src="~/static/1.svg"
          width="28px"
          class="text-right"
          title="Flagship Mini"
        >
        <img
          v-else-if="data.type_id === 3"
          v-b-tooltip.hover
          src="~/static/3.svg"
          width="28px"
          class="text-right"
          title="Parallel Worlds"
        >
        <img
          v-else-if="data.type_id === 4"
          v-b-tooltip.hover
          src="~/static/4.svg"
          width="28px"
          class="text-right"
          title="Side Quest"
        >
        <img
          v-else-if="data.type_id === 5"
          v-b-tooltip.hover
          src="~/static/5.svg"
          width="28px"
          class="text-right"
          title="Piece of Heart"
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
.marathonicon {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
