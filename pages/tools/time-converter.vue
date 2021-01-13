<template>
  <div>
    <h1 class="m-3">
      Marathon Time Conversion Tool
    </h1>
    <b-row>
      <b-col md="4">
        <b-container style="max-height:50vh;overflow-y:scroll">
          <b-list-group text="Dropdown" variant="info" style="cursor:pointer">
            <template v-for="marathon in marathons">
              <b-list-group-item :key="marathon.id" :value="marathon.id" :style="selected.id == marathon.id ? 'background-color:#'+marathon.color+';color:white' : ''" @click="selected = marathon">
                {{ marathon.slug }}
              </b-list-group-item>
            </template>
          </b-list-group>
        </b-container>
      </b-col>
      <b-col md="6">
        <h1>Selected: {{ selected.slug }}</h1>
        <h3>Started: {{ new Date(selected.start_date).toLocaleString() }}</h3>
        In:
        <b-input v-model="time_in" placeholder="000:00:00" />
        Out:
        <b-input disabled :value="getTimeOut(time_in,selected)" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const marathons = (await $axios.$get('https://bokoblin.herokuapp.com/?query={marathons{id,slug,start_date,color}}')).data.marathons
    return { marathons }
  },
  data () {
    return {
      marathons: [],
      selected: false,
      time_in: '00:00:00'
    }
  },
  methods: {
    getTimeOut (input, selected) {
      if (input && selected) {
        const times = input.split(':')
        if (times.length === 3) {
          const start = new Date(selected.start_date)
          start.setHours(start.getHours() + parseInt(times[0]))
          start.setMinutes(start.getMinutes() + parseInt(times[1]))
          start.setSeconds(start.getSeconds() + parseInt(times[2]))
          return start.toLocaleString()
        }
        if (times.length === 2) {
          const start = new Date(selected.start_date)
          start.setMinutes(start.getMinutes() + parseInt(times[0]))
          start.setSeconds(start.getSeconds() + parseInt(times[1]))
          return start.toLocaleString()
        }
        if (times.length === 1) {
          const start = new Date(selected.start_date)
          start.setSeconds(start.getSeconds() + parseInt(times[0]))
          return start.toLocaleString()
        }
      }
      return 'Invalid Format'
    }
  },
  head () {
    return {
      title: 'Tools - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin time conversion tool.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Tools - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin time conversion tool.'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
