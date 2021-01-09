<template>
  <div>
    <h1 class="m-3">
      Attendees
    </h1>
    <b-nav tabs>
      <b-nav-item :active="show === 'Active'" @click="show = 'Active'">
        Active
      </b-nav-item>
      <b-nav-item :active="show === 'Guest'" @click="show = 'Guest'">
        Guest
      </b-nav-item>
      <b-nav-item :active="show === 'Inactive'" @click="show = 'Inactive'">
        Inactive
      </b-nav-item>
      <b-nav-item :active="show === 'Charity Rep'" @click="show = 'Charity Rep'">
        Charity Rep
      </b-nav-item>
      <b-nav-item :active="show === 'Other'" @click="show = 'Other'">
        Other
      </b-nav-item>
    </b-nav>
    <b-container fluid>
      <b-card-group deck>
        <template v-for="attendee in attendees">
          <div :key="attendee.id">
            <AttendeeCard v-if="show === attendee.rank" :key="attendee.id" :data="attendee" />
          </div>
        </template>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import AttendeeCard from '~/components/AttendeeCard'
export default {
  components: {
    AttendeeCard
  },
  async asyncData ({ $axios }) {
    const attendees = (await $axios.$get('https://bokoblin.herokuapp.com/?query={attendees{id,name,house,rank}}')).data.attendees
    return { attendees }
  },
  data () {
    return {
      attendees: [],
      show: 'Active'
    }
  },
  head () {
    return {
      title: 'Attendees - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.attendees.length + ' attendees.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Attendees - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.attendees.length + ' attendees.'
        }
      ]
    }
  }
}
</script>
