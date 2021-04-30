<template>
  <div class="m-3">
    <h1>Bokoblin Search</h1>
    <ais-instant-search-ssr>
      <ais-search-box />
      <ais-stats />
      <ais-refinement-list attribute="Category" />
      <ais-hits>
        <template slot="item" slot-scope="{ item }">
          <p>
            <nuxt-link :to="'/'+(item.Category).toLowerCase()+'/'+item.id">
              {{ item.name }}
            </nuxt-link>
          </p>
        </template>
      </ais-hits>
    </ais-instant-search-ssr>
  </div>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisSearchBox,
  AisStats,
  createServerRootMixin
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'

const searchClient = algoliasearch(
  'HNEQ4Y7FLI',
  '48eda9ab18140717fe9b192884bd01c7'
)

export default {
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisSearchBox,
    AisStats
  },
  mixins: [
    createServerRootMixin({
      searchClient,
      indexName: 'boko_marathons'
    })
  ],
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
