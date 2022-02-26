<template>
  <client-only>
    <b-container class="m-3">
      <template v-if="error.statusCode === 404">
        <h1>
          ERROR 404
        </h1>
        <p>
          {{ error.message }}
        </p>
      </template>
      <h1 v-else>
        An error occurred. Sorry!
      </h1>
      <img src="~/assets/BokoblinError.png" alt="Error Bokoblin" style="width:40vw;">
      <br>
      <a href="https://twitter.com/tsunamicorw">Art by TsunamiCoRyan</a>
      <br>
      <br>
      <nuxt-link to="/">
        Go to Homepage
      </nuxt-link>
    </b-container>
  </client-only>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: 'Error ' + this.error.statusCode + ' - Bokoblin'
    }
  }
}
</script>
