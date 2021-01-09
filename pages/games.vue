<template>
  <div>
    <h1 class="m-3">
      Games
    </h1>
    <template v-for="game in games">
      <GameCard :key="game.id" :data="game" />
    </template>
  </div>
</template>

<script>
import GameCard from '~/components/GameCard'
export default {
  components: {
    GameCard
  },
  async asyncData ({ $axios }) {
    const games = (await $axios.$get('https://bokoblin.herokuapp.com/?query={games{id,title,isZelda,isEvent}}')).data.games
    return { games }
  },
  data () {
    return {
      marathons: []
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
          property: 'og:title',
          content: 'Games - Bokoblin'
        },
        { name: 'theme-color', content: '#ff5959' }

      ]
    }
  }
}
</script>
