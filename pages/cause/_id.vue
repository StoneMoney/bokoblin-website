<template>
  <div>
    <span v-if="$fetchState.pending" key="pending">
      <b-container class="loading-zone text-center">
        <b-spinner style="width: 7rem; height: 7rem;margin-left: auto;margin-right:auto;" variant="danger" type="grow" label="Spinning" />
        <h1 class="text-grey mt-2">
          Loading
        </h1>
      </b-container>
    </span>
    <span v-else-if="$fetchState.error" key="errored">
      Error in Fetching...
    </span>
    <span v-else key="success">
      <h1 class="m-3">
        <b-badge>
          {{ charity.id }}
        </b-badge>
        {{ charity.full_name }}
      </h1>
      <b-col sm="9" md="4">
        <b-list-group class="m-1">
          <b-list-group-item v-if="charity.website" class="d-flex justify-content-between align-items-center">
            <a :href="charity.website">Website</a>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            Total Raised: {{ toUSD(charity.total) }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <span v-if="marathons.length > 0">
        <h1 class="m-3">Marathons ({{ marathons.length }})</h1>
        <template v-for="marathon in marathons">
          <b-col :key="marathon.id" md="7" lg="6" xl="5" class="mb-3">
            <MarathonCard :data="marathon" />
          </b-col>
        </template>
      </span>
      <b-col v-else>
        <h3>There are no records of marathons raising for this cause</h3>
      </b-col>
    </span>
  </div>
</template>

<script>
import MarathonCard from '~/components/MarathonCard'
export default {
  components: {
    MarathonCard
  },
  async fetch () {
    this.charity = (await this.$axios.$get(`https://api.bokoblin.com/?query={charity(id:${this.$route.params.id}){id,slug,full_name,website,total}}`)).data.charity
    if (!this.charity) {
      // set status code on server and
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      // use throw new Error()
      this.$nuxt.context.error({
        status: 404,
        message: 'Could not find charity with id of ' + this.$route.params.id
      })
      throw new Error('404')
    } else {
      this.marathons = (await this.$axios.$get(`https://api.bokoblin.com/?query={marathons(id:${this.$route.params.id}){id,color,type,type_id,full_name,start_date,total,charity{id,full_name}}}`)).data.marathons
    }
  },
  data () {
    return {
      charity: {},
      marathons: []
    }
  },
  methods: {
    toUSD (input) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(input)
    }
  },
  head () {
    return {
      title: this.charity.full_name + ' - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.charity.full_name + (this.marathons.length > 0 ? ', including ' + this.marathons.length + ' marathons' : '') + (parseFloat(this.charity.total) > 0 ? ' raising ' + this.toUSD(this.charity.total) + ' across them' : '') + '.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.charity.full_name + ' - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.charity.full_name + (this.marathons.length > 0 ? ', including ' + this.marathons.length + ' marathons' : '') + (parseFloat(this.charity.total) > 0 ? ' raising ' + this.toUSD(this.charity.total) + ' across them' : '') + '.'
        },
        { name: 'theme-color', content: '#ff5959' }
      ]
    }
  }
}
</script>
