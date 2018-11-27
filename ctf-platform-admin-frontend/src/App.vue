<template>
  <div id="app">
    <Page></Page>
  </div>
</template>

<script>
import Page from './page'

export default {
  name: 'App',
  components: {
    Page
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
