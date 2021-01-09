<template>
  <div>
    <h1 class="m-3">
      Causes
    </h1>
    <b-container fluid>
      <b-card-group deck>
        <template v-for="charity in charities">
          <div :key="charity.id">
            <CharityCard :key="charity.id" :data="charity" />
          </div>
        </template>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import CharityCard from '~/components/CharityCard'
export default {
  components: {
    CharityCard
  },
  async asyncData ({ $axios }) {
    const charities = (await $axios.$get('https://bokoblin.herokuapp.com/?query={charities{id,full_name}}')).data.charities
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
