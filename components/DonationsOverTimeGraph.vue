<template>
  <b-card>
    <line-chart :chart-data="datacollection" :options="options" :styles="myStyles" />
  </b-card>
</template>

<script>
import LineChart from '~/components/LineGraph'

export default {
  components: {
    LineChart
  },
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      datacollection: {},
      options: {}
    }
  },
  computed: {
    myStyles () {
      return { height: '250px' }
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.options = {
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
              step: 0.5,
              callback (dataLabel, index) {
                return index % 24 === 0 ? dataLabel : null
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Hours'
            }
          }]
        },
        elements: {
          line: {
            borderColor: '#' + this.data.color,
            borderWidth: 3
          },
          point: {
            radius: 2,
            hoverRadius: 5,
            backgroundColor: 'rgba(0,0,0,0)'
          }
        },
        tooltips: {
          callbacks: {
            title (context) {
              return context[0].xLabel + ' Hours'
            },
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
      const processedData = this.data.donationsTime.map((entry) => { return { x: parseFloat(entry.hour).toFixed(2), y: parseFloat(entry.total).toFixed(2) } })
      this.datacollection = {
        labels: this.makeLabelsTo((processedData.length) / 2),
        datasets: [
          {
            label: this.data.full_name,
            backgroundColor: this.hex2rgb(this.data.color),
            data: processedData
          }
        ]
      }
    },
    hex2rgb (colour) {
      let r, g, b
      if (colour.charAt(0) === '#') {
        colour = colour.substr(1)
      }
      if (colour.length === 3) {
        colour = colour.substr(0, 1) + colour.substr(0, 1) + colour.substr(1, 2) + colour.substr(1, 2) + colour.substr(2, 3) + colour.substr(2, 3)
      }
      r = colour.charAt(0) + '' + colour.charAt(1)
      g = colour.charAt(2) + '' + colour.charAt(3)
      b = colour.charAt(4) + '' + colour.charAt(5)
      r = parseInt(r, 16)
      g = parseInt(g, 16)
      b = parseInt(b, 16)
      return 'rgba(' + r + ',' + g + ',' + b + ',0.5)'
    },
    makeLabelsTo (val) {
      const out = []
      let next = 0
      while (next < val) {
        out.push(next)
        next += 0.5
      }
      return out
    }
  }
}
</script>

<style scoped>
  .chart-container {
      height: 300px;
      position: 'relative'
  }
</style>
