<template>
  <button @click="$emit('click', data)" :type="type">{{ value }}</button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    value: String,
    data: Object
  }
}
</script>

<style scoped>
button {
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button:hover {
  background: #ccc;
}
</style>
