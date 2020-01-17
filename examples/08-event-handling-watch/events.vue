<template>
  <div>
    <div class="div">
      <h2>Event modifiers</h2>
      <input type="text" @keyup.enter="inputSubmit($event.target.value)" />
    </div>

    <div>
      <h2>Moar event modifiers</h2>
      <form @submit.prevent="formSubmit($event)">
        <input type="text" name="firstName" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last name" />
        <button type="submit">Submit</button>
      </form>
    </div>

    <div>
      <h2>Keyboard modifier keys</h2>
      <div class="clip" tabindex="0" @keydown.ctrl.c="copy()">
        <span>Click me and press Ctrl/Cmd + C</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    inputSubmit(value) {
      alert(value);
    },

    formSubmit(event) {
      // eslint-disable-next-line
      console.log(new FormData(event.target).get('firstName'));
    },

    copy() {
      navigator.clipboard.writeText('Hello world!');
    }
  }
};
</script>

<style>
.clip {
  height: 100px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
