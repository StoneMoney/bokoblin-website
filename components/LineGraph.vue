<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      required: true,
      type: Object
    },
    options: {
      required: false,
      type: Object,
      default: () => {
        return {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          responsive: true
        }
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
