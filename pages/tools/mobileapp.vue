<template>
  <div>
    <b-container class="m-3 mx-auto">
      <h1>Bokoblin Mobile</h1>
      <p>Archived data of the last 11 years of Kinstone-operated charity marathons, now at the palm of your hand!</p>
      <b-container class="row">
        <img
          class="d-block p-2"
          height="480"
          src="~assets/mobile-app/BokoblinAppScreenshot1.png"
          alt="Mobile App Promotional Screenshot, Showing the home screen"
        >

        <img
          class="d-block p-2"
          height="480"
          src="~assets/mobile-app/BokoblinAppScreenshot2.png"
          alt="Mobile App Promotional Screenshot, Showing an event"
        >

        <img
          class="d-block p-2"
          height="480"
          src="~assets/mobile-app/BokoblinAppScreenshot3.png"
          alt="Mobile App Promotional Screenshot, Showing an individual game"
        >

        <img
          class="d-block p-2"
          height="480"
          src="~assets/mobile-app/BokoblinAppScreenshot4.png"
          alt="Mobile App Promotional Screenshot, Showing an individual segment"
        >
      </b-container>
      <b-container class="row">
        <a href="https://play.google.com/store/apps/details?id=com.bokoblin.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" width="200"></a>
      </b-container>
      <p>Legal: Google Play and the Google Play logo are trademarks of Google LLC.</p>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  head () {
    return {
      title: 'Bokoblin for Android',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin Mobile: Archived data of the last 11 years of Kinstone-operated charity marathons, now at the palm of your hand!'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Bokoblin for Android'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin Mobile: Archived data of the last 11 years of Kinstone-operated charity marathons, now at the palm of your hand!'
        }
      ]
    }
  }
}
</script>
