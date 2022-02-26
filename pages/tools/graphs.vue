<template>
  <b-container>
    <h1 class="mt-3">
      Bokoblin Graphs
    </h1>
    <p>Inspired by 0rganics' "Zeldathon Graphs" spreadsheet. Best viewed on desktop</p>
    <b-card>
      <h2>Donation Totals</h2>
      <bar-graph :chart-data="datacollectionTotals" :options="optionsTotals" :height="200" :styles="myStyles" />
    </b-card>
    <b-card class="mt-3 mb-3">
      <h2>Donation Totals Over Time</h2>
      <p>Displayed as a plot point every 4 hours. For a half-hour accuracy visit a marathon's individual page.</p>
      <line-graph :height="250" :chart-data="datacollectionOvertime" :options="optionsOvertime" :styles="myStyles" />
    </b-card>
  </b-container>
</template>

<script>
import BarGraph from '~/components/BarGraph'
import LineGraph from '~/components/LineGraph'
export default {
  components: {
    BarGraph,
    LineGraph
  },
  async asyncData ({ $axios }) {
    const marathons = (await $axios.$get('https://api.bokoblin.com/?query={marathons{id,color,slug,total,donationsTime{hour,total}}}')).data.marathons
    return { marathons }
  },
  data () {
    return {
      marathons: [],
      datacollectionTotals: {},
      optionsTotals: {},
      datacollectionOvertime: {},
      optionsOvertime: {}
    }
  },
  computed: {
    myStyles () {
      return { height: '70vh' }
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.optionsTotals = {
        legend: {
          display: true,
          positon: 'bottom'
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Raised'
            },
            ticks: {
              beginAtZero: true,
              callback (value, index, values) {
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
              }
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
        },
        tooltips: {
          callbacks: {
            label (context) {
              let label = ''
              if (context.yLabel !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.yLabel)
              }
              return label
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false

      }
      const labels = this.marathons.map((marathon) => { return marathon.slug })
      const data = this.marathons.map((marathon) => { return marathon.total })
      const backgroundColor = this.marathons.map((marathon) => { return '#' + marathon.color })
      this.datacollectionTotals = {
        labels,
        datasets: [{
          label: 'Events',
          data,
          backgroundColor
        }]
      }
      // ========================= OVER TIME ==================================
      this.optionsOvertime = {
        title: {
          display: false,
          position: 'top',
          text: 'Donations Over Time'
        },
        legend: {
          display: true,
          positon: 'bottom'
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Raised'
            },
            ticks: {
              beginAtZero: true,
              callback (value, index, values) {
                return '$' + value
              }
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false,
              step: 4,
              callback (dataLabel, index) {
                return index % 6 === 0 ? dataLabel : null
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Hours'
            }
          }]
        },
        elements: {
          point: {
            radius: 2,
            hoverRadius: 5
          }
        },
        tooltips: {
          callbacks: {
            title (context) {
              return context[0].xLabel + ' Hours'
            },
            label (context, data) {
              let label = data.datasets[context.datasetIndex].label + ': '
              if (context.yLabel !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.yLabel)
              }
              return label
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false

      }
      const longestMarathon = 180
      const marathonsWithData = this.marathons.filter((marathon) => {
        return (marathon.donationsTime.length > 0)
      })
      const datasets = marathonsWithData.map((marathon) => {
        return {
          label: marathon.slug,
          data: marathon.donationsTime.filter((entry) => { return (parseFloat(entry.hour).toFixed(2) % 4 === 0) }).map((entry) => { return { x: parseFloat(entry.hour).toFixed(2), y: parseFloat(entry.total).toFixed(2) } }),
          backgroundColor: '#' + marathon.color,
          borderColor: '#' + marathon.color,
          showLine: true,
          fill: false
        }
      })
      this.datacollectionOvertime = {
        labels: this.makeLabelsTo(longestMarathon),
        datasets
      }
    },
    makeLabelsTo (val) {
      const out = []
      let next = 0
      while (next < val) {
        out.push(next)
        next += 4
      }
      return out
    }
  },
  head () {
    return {
      title: 'Graphs - Bokoblin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'Graphs created with information from various Kinstone-operated charity marathons'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Graphs - Bokoblin'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Graphs created with information from various Kinstone-operated charity marathons'
        }
      ]
    }
  }
}
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
