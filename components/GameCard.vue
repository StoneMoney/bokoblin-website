<template>
  <div>
    <b-container class="m-3">
      <b-card>
        <b-card-title>
          <nuxt-link :to="'/game/'+data.id">
            <span v-if="data.isZelda" v-b-tooltip.hover title="Zelda Game">
              <b-icon-map-fill />
            </span>
            <span v-if="data.isEvent" v-b-tooltip.hover title="Special Event">
              <b-icon-star-fill />
            </span>
            {{ data.title }}
            <span class="h6 mb-2"><b-icon-arrow-up-right-circle-fill /></span>
          </nuxt-link>
        </b-card-title>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { BIconStarFill, BIconMapFill, BIconArrowUpRightCircleFill } from 'bootstrap-vue'

export default {
  components: {
    BIconStarFill,
    BIconMapFill,
    BIconArrowUpRightCircleFill
  },
  props: {
    data: {
      type: Object,
      required: true
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
