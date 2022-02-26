<template>
  <div class="m-2">
    <b-container class="md3">
      <h1>Secret Sounds List</h1>
      <b-row>
        <b-col>
          <b-container v-if="isMatching" role="banner">
            <b-card bg-variant="danger" class="text-light">
              <b-icon-exclamation-diamond-fill /> Donation matching mode is active. Check for cells that are NOT red to donate next!
            </b-card>
            <b-card bg-variant="secondary" class="text-light mt-2">
              Donation Matching Progress: {{ matchedCount }} / {{ sounds.length }}
              <b-progress :value="matchedCount" :max="sounds.length" animated />
            </b-card>
          </b-container>
          <b-container v-else role="banner">
            <b-card bg-variant="secondary" class="text-light mt-2">
              Secret Sounds Heard: {{ verifiedCount }} / {{ sounds.length }}
              <b-progress :value="verifiedCount" :max="sounds.length" animated />
            </b-card>
            <b-list-group class="mt-1">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Total Sounds: {{ sounds.length }}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Heard Sounds: {{ verifiedCount }}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                New Sounds: {{ newsoundCount }}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Sum: {{ toUSD(cost) }}
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                Avg: {{ toUSD(cost/sounds.length) }}
              </b-list-group-item>
            </b-list-group>
          </b-container>
          <b-container>
            <b-card class="mt-2">
              <p>Data last updated: {{ (new Date(updatedTime)).toLocaleString() }}</p>
              <p>
                A cell amount highlighted in GREEN denotes that the sound has been heard this marathon
              </p>
              <p>
                Tracking made possible by our editors @ <a href="https://discord.bokoblin.com">The Doc Team</a>
              </p>
              <hr>
              <p>
                Prefer the Google Sheet document?
              </p>
              <a href="https://doc.bokoblin.com">
                <b-button variant="danger" size="mb-1">
                  Classic View
                </b-button>
              </a>
            </b-card>
          </b-container>
        </b-col>
        <b-col>
          <client-only placeholder="Loading Chart...">
            <b-col>
              <b-form-group>
                <b-input-group size="md">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                  />

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">
                      Clear
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <!-- <b-col lg="6" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            v-model="sortDirection"
            label="Show only"
            description="Leave all unchecked to show all sounds"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            >
              <b-form-checkbox value="newsound">
                New
              </b-form-checkbox>
              <b-form-checkbox value="verified">
                Verified
              </b-form-checkbox>
              <b-form-checkbox value="matched">
                Unmatched
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col> -->
            <b-table
              bordered
              striped
              hover
              responsive
              sticky-header="68vh"
              :sort-direction="sortDirection"
              :filter="filter"
              :fields="fields"
              :items="processSounds()"
            >
              <template #cell(amount)="data">
                <a :href="`https://donate.zeldathon.com?amount=${data.item.amount.toFixed(2)}`" target="_blank" rel="noopener">${{ data.item.amount.toFixed(2) }}</a>
              </template>
              <template #cell(description)="data">
                <template v-if="data.item.matched && isMatching">
                  <b-badge variant="danger">
                    MATCHED
                  </b-badge>
                </template>
                <template v-if="data.item.newsound">
                  <b-badge variant="primary">
                    NEW
                  </b-badge>
                </template>
                {{ data.item.description }}
              </template>
            </b-table>
          </client-only>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  async asyncData ({ $axios }) {
    const soundsdata = (await $axios.$get('https://api.bokoblin.com/?query={soundsdata{updated,matching,sounds{amount,description,verified,newsound,matched}}}')).data.soundsdata
    const isMatching = soundsdata.matching
    const updatedTime = soundsdata.updated
    const sounds = soundsdata.sounds
    const verifiedCount = (sounds.filter((sound) => { return sound.verified })).length
    const matchedCount = (sounds.filter((sound) => { return sound.matched })).length
    const newsoundCount = (sounds.filter((sound) => { return sound.newsound })).length
    let cost = 0
    if (sounds.length > 0) {
      cost =
          sounds
            .map(sound => parseInt(sound.amount))
            .reduce((total, val) => {
              return total + val
            }) / 100
    }
    return { updatedTime, isMatching, sounds, verifiedCount, matchedCount, newsoundCount, cost }
  },
  data () {
    return {
      updatedTime: 'NEVER',
      isMatching: false,
      sounds: [],
      fields: [
        {
          key: 'amount',
          label: 'Amount',
          formatter: 'toUSD',
          sortable: true
        },
        {
          key: 'description',
          label: 'Description',
          filter: true
          // formatter: 'descriptionFormatter'
        }
      ],
      filter: null,
      filterOn: [],
      sortDirection: 'asc',
      verifiedCount: 0,
      matchedCount: 0,
      newsoundCount: 0,
      cost: 0
    }
  },
  methods: {
    processSounds () {
      const tableRows = []
      this.sounds.forEach((sound) => {
        const data = {}
        const cellVariants = {}
        data.amount = (sound.amount / 100)
        data.description = sound.description
        data.verified = sound.verified
        data.matched = sound.matched
        data.newsound = sound.newsound
        if (sound.verified) {
          cellVariants.amount = 'success'
        }
        if (this.isMatching && sound.matched) {
          cellVariants.amount = 'danger'
          cellVariants.description = 'danger'
        }
        data._cellVariants = cellVariants
        tableRows.push(data)
      })
      return tableRows
    },
    toUSD (input) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(input)
    }
  },
  head () {
    return {
      title: 'Secret Sounds - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'List of all currently known secret sounds, including amounts and their descriptions'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Secret Sounds - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'List of all currently known secret sounds, including amounts and their descriptions'
        }
      ]
    }
  }
}
</script>
