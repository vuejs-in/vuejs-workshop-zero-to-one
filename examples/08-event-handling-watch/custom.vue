<template>
  <div>
    Click this button: <FancyButton @click="onClick($event)" value="Click me" :data="{ a: 1 }" />
  </div>
</template>

<script>
import FancyButton from './FancyButton.vue';

export default {
  components: {
    FancyButton
  },

  methods: {
    onClick(data) {
      alert("Hello, world!");
      alert(JSON.stringify(data));
    }
  }
}
</script>

<style>

</style>
