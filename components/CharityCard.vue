<template>
  <div>
    <nuxt-link :to="'/cause/'+data.id">
      {{ data.full_name }}
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
