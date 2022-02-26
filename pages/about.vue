<template>
  <div>
    <b-container class="m-3 mx-auto">
      <h1>Bokoblin.com</h1>
      <p>Archived data of the last 11 years of Kinstone-operated charity marathons</p>
      <p>This site is community-run and is <em>not</em> affiliated with Kinstone, LLC. or its properties, including but not limited to Zeldathon, Parallel Worlds, Side Quest, and Piece of Heart</p>
      <h2>Data Removal Request</h2>
      <p>
        If you are listed on this website and wish to be removed, contact us at <a href="mailto:dataremoval@bokoblin.com">dataremoval@bokoblin.com</a>
      </p>
      <h2>Credits</h2>
      <p>
        <b>Development:</b> Stone (@ngiano - github)
      </p>
      <p>
        <b>Design:</b> dark
      </p>
      <p>
        <b>Data Collection & Archiving:</b> Tylinos, dark & our editors at The Doc Team
      </p>
      <p>
        <b>API Help:</b> ArcticLight
      </p>
      <h2>Special Thanks</h2>
      <p>
        <b>0rganics</b> for maintaining donation graphs and legacy donation data
      </p>
      <p>
        <b>All editors, past and present</b> for keeping the legacy of these marathons alive
      </p>
      <p>
        <b>Kinstone Team</b> for creating amazing marathons
      </p>
      <p>
        <nuxt-link to="/support">
          Support Bokoblin
        </nuxt-link>
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'About Bokoblin'
    }
  }
}
</script>
