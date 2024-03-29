<template>
  <section class="section">
    <h3 class="title">
      Humidity Graph
    </h3>
    <humidity-ranges></humidity-ranges>
    <chart :options="line" ref="humidityChart"></chart>
  </section>
</template>

<script>
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import HumidityRanges from './HumidityRanges'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const sensors = {
  'Büro': '1d003e000247343337373739', // Blue
  'Wohnzimmer': 'e00fce683ef6d5661611d84c', // Black
  'Schlafzimmer': '2d0021000347343233323032' // Red
}

export default {
  name: 'HumidityGraph',

  data: () => {
    let sensorIds = Object.values(sensors)
    let sensorData = Object.assign(...sensorIds.map(sensor => ({ [sensor]: [] })))

    return {
      sensorData: sensorData
    }
  },

  components: {
    chart: ECharts,
    HumidityRanges
  },

  computed: {
    sensorNames () {
      return Object.keys(sensors)
    },
    line () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              type: 'dashed'
            }
          },
          formatter: function (points) {
            return [
              new Date(points[0].value[0]).toLocaleString('de-de').slice(0, -3),
              ...points.map(point => {
                return [point.marker, point.seriesName, ': ', point.value[1]].join('')
              })
            ].join('<br>')
          }
        },
        legend: {
          data: this.sensorNames
        },
        grid: {
          show: false,
          left: '3%',
          right: '4%',
          bottom: '4%',
          top: '80px',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          offset: 15,
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#669D95',
              fontWeight: 'bold'
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          min: 'dataMin',
          type: 'value',
          offset: 15,
          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              color: '#669D95',
              fontWeight: 'bold'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#D7F1ED'
            }
          }
        },
        series: this.sensorNames.map(sensorName => {
          return {
            name: sensorName,
            type: 'line',
            smooth: true,
            data: this.sensorData[sensors[sensorName]],
            symbolSize: 7,
            hoverAnimation: false,
            markPoint: {
              data: [
                {type: 'max', name: 'Höchsttemperatur'},
                {type: 'min', name: 'Mindensttemperatur'}
              ]
            },
            itemStyle: {
              normal: {
                borderWidth: 2
              }
            },
            lineStyle: {
              normal: {
                width: 4
              }
            }
          }
        })
      }
    }
  },

  mounted () {
    this.$refs.humidityChart.showLoading()
    this.fetchHumidityData()
    setInterval(() => { this.fetchHumidityData() }, 10000)
  },

  watch: {
    '$route.path' () {
      // this.$refs.humidityChart.showLoading()
      this.fetchHumidityData()
    }
  },

  methods: {
    sensorData (sensor) {
      return this[sensor]
    },
    updateSeries () {
      this.line.series.map((serie, serieIndex) => {
        serie.data = this.sensorData[sensors[serie.name]]
      })
    },
    fetchHumidityData () {
      axios.get(`https://api.temperature.strebel.xyz/api/humidity/${this.$route.params.range}?api_token=Kr4DnHioPTjFxBKfohtH5JME9uHDudu6UL8vuUEjflhnQDAnjB9p8CavURyZ`)
        .then(({data}) => {
          data.map(data => {
            this.sensorData[data.sensor] = data.data
          })

          this.$refs.humidityChart.hideLoading()
        })
    }
  }
}
</script>

<style scoped>
    .title {
      text-align: center;
    }

    .subtitle {
      color: #00d1b2;
    }

    .echarts {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
    }
</style>
