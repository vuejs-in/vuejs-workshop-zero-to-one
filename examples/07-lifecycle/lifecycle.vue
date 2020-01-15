<template>
  <div>
    <MyComponent v-if="show" />
    <button @click="show = !show">Toggle</button>
  </div>
</template>

<script>
import Vue from 'vue';

/* eslint-disable */
Vue.component('MyComponent', {
  render() {
    return <h1>Fancy component</h1>;
  },

  beforeCreate() {
    console.log('beforeCreate');
  },

  created() {
    console.log('created');
  },

  beforeMount() {
    console.log('beforeMount');
  },

  mounted() {
    console.log('mounted');
  },

  beforeUpdate() {
    console.log('beforeUpdate');
  },

  updated() {
    console.log('updated');
  },

  beforeDestroy() {
    console.log('beforeDestroy');
  },

  destroyed() {
    console.log('destroyed');
  }
});

export default {
  data() {
    return {
      show: false
    }
  }
}
</script>
