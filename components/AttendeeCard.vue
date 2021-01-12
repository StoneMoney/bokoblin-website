<template>
  <div>
    <nuxt-link :to="'/attendee/'+data.id">
      {{ data.name }}
      <span class="h6 mb-2"><b-icon-arrow-up-right-circle-fill /></span>
    </nuxt-link>
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
  }
}
</script>
