import Vue from 'vue'
import Router from 'vue-router'
import TemperatureGraph from '@/components/TemperatureGraph'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/day'
    },
    {
      path: '/day',
      component: TemperatureGraph
    },
    {
      path: '/week',
      component: TemperatureGraph
    },
    {
      path: '/month',
      component: TemperatureGraph
    },
    {
      path: '/year',
      component: TemperatureGraph
    }
  ]
})
