<template>
  <div>
    {{ firstName }} {{ lastName }} was born on {{ formattedDate }}
  </div>
</template>

<script>
export default {
  name: 'Properties',

  data() {
    return {
      firstName: 'Sangeeth',
      lastName: 'Sudheer',
      dateOfBirth: new Date(1996, 4, 24)
    }
  },

  computed: {
    formattedDate() {
      // eslint-disable-next-line
      console.log('formattedDate calc');
      const formatter = new Intl.DateTimeFormat('in');
      return formatter.format(this.dateOfBirth);
    }
  },

  mounted() {
    setTimeout(() => this.firstName = 'Sam', 2000);
  },

  // methods: {
  //   formattedDate() {
  //     // eslint-disable-next-line
  //     console.log('formattedDate calc');
  //     const formatter = new Intl.DateTimeFormat('in');
  //     return formatter.format(this.dateOfBirth);
  //   }
  // }
}
</script>

<style>

</style>
