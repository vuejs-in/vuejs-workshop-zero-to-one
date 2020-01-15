<template>
  <div>
    <div v-if="activeComponent === 'uploading'">
      File is uploading...
    </div>
    <div v-else-if="activeComponent === 'typing'">
      {{ recepientName }} is typing...
    </div>
    <div v-else>It's {{ formattedTime }} for {{ recepientName }}</div>

    <div class="controls">
      <button @click="activeComponent = 'typing'">Typing</button>
      <button @click="activeComponent = 'uploading'">Uploading</button>
      <button @click="activeComponent = 'none'">None</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recepientName: 'Jon Doe',
      recepientTime: new Date(),
      activeComponent: 'none'
    };
  },

  computed: {
    formattedTime() {
      const formatter = Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      });

      return formatter.format(this.recepientTime);
    }
  }
};
</script>

<style></style>
