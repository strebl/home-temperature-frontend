<template>
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered is-centered has-text-centered">
        <div class="column is-narrow">
          <img class="app-logo" src="../assets/logo.svg">
        </div>
        <div class="column is-narrow">
          <h1 class="title">
            Temperature
          </h1>
          <h2 class="subtitle">
            Temperature & Humidity in my home
          </h2>
          <div class="column is-narrow">
            <div class="buttons">
              <router-link to="/" class="button is-white">Temperature</router-link>
              <router-link to="/humidity/day" class="button is-white">Humidity</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style>
.app-logo {
  width: 200px;
  max-width: 100%;
}
</style>
