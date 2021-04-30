<template>
  <div>
    <div class="spotlight">
      <ais-instant-search-ssr>
        <ais-autocomplete>
          <div slot-scope="{ currentRefinement, indices, refine }">
            <input
              ref="search"
              role="search"
              class="spotlight-searchbox"
              type="search"
              :value="currentRefinement"
              placeholder="Search marathons, games, attendees"
              aria-label="Search site content"
              autofocus
              @input="refine($event.currentTarget.value)"
              @keyup.enter="navToFirstItem()"
            >
            <span v-if="currentRefinement">
              <b-list-group v-for="index in indices" :key="index.indexId" class="spotlight-results">
                <b-list-group-item v-for="(hit,i) in index.hits" :key="hit.objectID">
                  <b-badge>{{ hit.Category }}</b-badge>
                  <nuxt-link :ref="i == 0 ? 'first' : 'other'+hit.id" :to="'/'+(hit.Category).toLowerCase()+'/'+hit.id" @click="clearVisibility()">
                    {{ hit.name }}
                  </nuxt-link>
                  <b-spinner v-if="loading && i == 0" variant="primary" type="grow" label="Spinning" class="searchbox-loading" />
                </b-list-group-item>
              </b-list-group>
            </span>
            <img src="~static/algolia.svg" alt="algolia logo">
          </div>
        </ais-autocomplete>
      </ais-instant-search-ssr>
    </div>
    <div class="backdrop" @click="clearVisibility()" />
  </div>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisAutocomplete,
  createServerRootMixin
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  'KEY GOES HERE',
  'KEY GOES HERE'
)
export default {
  components: {
    AisInstantSearchSsr,
    AisAutocomplete
  },
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'boko_marathons'
    })
  ],
  data () {
    return {
      inputReady: false,
      firstItem: false,
      loading: false
    }
  },
  serverPrefetch () {
    return this.instantsearch.findResultsState(this).then((algoliaState) => {
      this.$ssrContext.nuxt.algoliaState = algoliaState
    })
  },
  beforeMount () {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState

    this.instantsearch.hydrate(results)
  },
  mounted () {
    setTimeout(() => {
      this.$refs.search.focus()
    }, 100)
  },
  methods: {
    clearVisibility () {
      this.$emit('clear', true)
    },
    navToFirstItem () {
      this.loading = true
      setTimeout(() => {
        this.$router.push({
          path: this.$refs.first[0].to
        })
      }, 100)
    }
  },
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css'
        }
      ]
    }
  }
}
</script>
<style>
.spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.4);
  text-align: center;
  z-index: 2;
  pointer-events: none;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
.spotlight-searchbox,.spotlight-results {
  margin-left: auto;
  margin-right: auto;
  width: 100vw;
  max-width: 850px;
  font-size: 5vh;
  border: 0px;
  pointer-events: initial;
}
.spotlight-searchbox {
  margin-top: 60px;
}
.spotlight-results {
  font-size: 24px;
  text-align: left;
}
.searchbox-loading {
  float: right;
}
</style>
