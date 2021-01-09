<template>
  <div>
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
        <MarathonCard :key="marathon.id" :data="marathon" />
      </template>
    </span>
    <h3 v-else>
      There are no records of segments played by this attendee
    </h3>
  </div>
</template>

<script>
import MarathonCard from '~/components/MarathonCard'
export default {
  components: {
    MarathonCard
  },
  async asyncData ({ $axios, params }) {
    const charity = (await $axios.$get('https://bokoblin.herokuapp.com/?query={charity(id:' + params.id + '){id,slug,full_name,website,total}}')).data.charity
    const marathons = (await $axios.$get('https://bokoblin.herokuapp.com/?query={marathons(id:' + params.id + '){id,color,type,type_id,full_name,start_date,total,charity{id,full_name}}}')).data.marathons
    return { charity, marathons }
  },
  data () {
    return {
      charity: {},
      marathons: []
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
          property: 'og:title',
          content: this.charity.full_name + ' - Bokoblin'
        }
      ]
    }
  }
}
</script>
