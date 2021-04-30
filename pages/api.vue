<template>
  <div class="m-2">
    <b-container role="banner">
      <b-card bg-variant="danger" class="text-light">
        <b-icon-exclamation-diamond-fill /> API IS IN BETA AND MAY CHANGE
      </b-card>
    </b-container>
    <h1>Bokoblin.com API (BokoAPI)</h1>
    <p>BokoAPI is powered by Apollo and GraphQL, queries can be made from:</p>
    <a href="http://bokoblin.herokuapp.com/">http://bokoblin.herokuapp.com/</a>
    <p>
      Ex:
      <a href="http://bokoblin.herokuapp.com/?query={marathon(id: 1){full_name}}">http://bokoblin.herokuapp.com/?query={marathon(id: 1){full_name}}</a>
    </p>
    <h3>Schema: <a href="/schema.txt">here</a></h3>
  </div>
</template>

<script>
import { BIconExclamationDiamondFill } from 'bootstrap-vue'
export default {
  components: {
    BIconExclamationDiamondFill
  }
}
</script>
