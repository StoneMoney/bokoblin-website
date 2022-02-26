<template>
  <div>
    <h1 class="m-3">
      Causes
    </h1>
    <b-col md="4">
      <b-list-group class="m-1">
        <template v-for="charity in charities">
          <div :key="charity.id">
            <b-list-group-item :key="charity.id">
              <CharityCard :data="charity" />
            </b-list-group-item>
          </div>
        </template>
      </b-list-group>
    </b-col>
  </div>
</template>

<script>
import CharityCard from '~/components/CharityCard'
export default {
  components: {
    CharityCard
  },
  async asyncData ({ $axios }) {
    const charities = (await $axios.$get('https://api.bokoblin.com/?query={charities{id,full_name}}')).data.charities
    return { charities }
  },
  data () {
    return {
      charities: []
    }
  },
  head () {
    return {
      title: 'Causes - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.charities.length + ' causes.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Causes - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.charities.length + ' causes.'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
