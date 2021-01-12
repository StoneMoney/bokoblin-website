<template>
  <div>
    <h1 class="m-3">
      Attendees
    </h1>
    <b-nav tabs>
      <b-nav-item :active="show === 'Active'" class="ml-2" @click="show = 'Active'">
        Active
      </b-nav-item>
      <b-nav-item :active="show === 'Guest'" @click="show = 'Guest'">
        Guest
      </b-nav-item>
      <!-- <b-nav-item :active="show === 'Inactive'" @click="show = 'Inactive'">
        Inactive
      </b-nav-item> -->
      <b-nav-item :active="show === 'Charity Rep'" @click="show = 'Charity Rep'">
        Charity Rep
      </b-nav-item>
      <b-nav-item :active="show === 'Other'" @click="show = 'Other'">
        Other
      </b-nav-item>
    </b-nav>
    <b-col md="4" class="m-3">
      <b-list-group>
        <template v-for="attendee in attendees">
          <div :key="attendee.id">
            <b-list-group-item v-if="show === attendee.rank" :key="attendee.id">
              <AttendeeCard :data="attendee" />
            </b-list-group-item>
          </div>
        </template>
      </b-list-group>
    </b-col>
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
