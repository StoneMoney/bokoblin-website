<template>
  <div>
    <b-container class="m-3 mx-auto">
      <h1>Bokoblin.com</h1>
      <p>Archived data of the last 11 years of Kinstone-operated charity marathons</p>
      <h2>Credits</h2>
      <p>
        <b>Development:</b> Stone
      </p>
      <p>
        <b>Design:</b> dark
      </p>
      <p>
        <b>Data Collection & Archiving:</b> Tylinos & our editors at The Doc Team
      </p>
      <h2>Special Thanks</h2>
      <p>
        <b>ArcticLight</b> for creating an API base
      </p>
      <p>
        <b>0rganics</b> for maintaining donation graphs and legacy donation data
      </p>
      <p>
        <b>All editors, past and present</b> for keeping the legacy of these marathons alive
      </p>
      <p>
        <b>Kinstone Team</b> for creating amazing marathons
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin, archived data of the last 11 years of Kinstone-operated charity marathons'
        },
        {
          property: 'og:title',
          content: 'Bokoblin'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
