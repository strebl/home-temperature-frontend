<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import TemperatureGraph from './components/TemperatureGraph'
import AppHeader from './components/AppHeader'

export default {
  name: 'app',
  components: {
    TemperatureGraph,
    AppHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
