<template>
  <div>
    <h1>Coming soon</h1>
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
