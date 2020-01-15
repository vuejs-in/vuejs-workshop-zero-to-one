<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'app',

  components: {
    NavBar
  }
};
</script>

<style>
@import 'assets/normalize.css';
@import 'assets/styles.css';
</style>
