import Vue from 'vue'
import Router from 'vue-router'
import TemperatureGraph from '@/components/TemperatureGraph'
import HumidityGraph from '@/components/HumidityGraph'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/day'
    },
    {
      path: '/:range',
      component: TemperatureGraph
    },
    {
      path: '/humidity',
      redirect: '/humidity/day'
    },
    {
      path: '/humidity/:range',
      component: HumidityGraph
    }
  ]
})
