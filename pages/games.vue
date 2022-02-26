<template>
  <div>
    <h1 class="m-3">
      Games
    </h1>
    <b-col md="4">
      <b-list-group class="m-1">
        <template v-for="game in games">
          <b-list-group-item :key="game.id">
            <GameCard :data="game" />
          </b-list-group-item>
        </template>
        <b-nav-item :to="{ hash: '#videos' }" class="navtext">VIDEOS</b-nav-item>
      </b-list-group>
    </b-col>
  </div>
</template>

<script>
import GameCard from '~/components/GameCard'
export default {
  components: {
    GameCard
  },
  async asyncData ({ $axios }) {
    const games = (await $axios.$get('https://api.bokoblin.com/?query={games{id,title,isZelda,isEvent}}')).data.games
    return { games }
  },
  data () {
    return {
      games: []
    }
  },
  head () {
    return {
      title: 'Games - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Bokoblin archive data for ' + this.games.length + ' games.'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Games - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Bokoblin archive data for ' + this.games.length + ' games.'
        }

      ]
    }
  }
}
</script>
