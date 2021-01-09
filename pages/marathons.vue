<template>
  <div>
    <h1 class="m-3">
      Marathons
    </h1>
    <template v-for="marathon in marathons">
      <MarathonCard :key="marathon.id" :data="marathon" />
    </template>
  </div>
</template>

<script>
import MarathonCard from '~/components/MarathonCard'
export default {
  components: {
    MarathonCard
  },
  async asyncData ({ $axios }) {
    const marathons = (await $axios.$get('https://bokoblin.herokuapp.com/?query={marathons{id,color,type,type_id,full_name,start_date,total,charity{id,full_name}}}')).data.marathons
    return { marathons }
  },
  data () {
    return {
      marathons: []
    }
  },
  head () {
    return {
      title: 'Marathons - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.marathons.length + ' marathons.'
        },
        {
          property: 'og:title',
          content: 'Marathons - Bokoblin'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
