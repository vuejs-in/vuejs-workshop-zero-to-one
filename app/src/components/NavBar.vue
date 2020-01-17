<template>
  <div class="navbar">
    <div class="logo">
      <span>V</span>
    </div>

    <ul class="navbar-links">
      <router-link tag="li" :to="{ name: 'top' }">Top</router-link>
      <router-link tag="li" :to="{ name: 'new' }">New</router-link>
      <router-link tag="li" :to="{ name: 'about' }">About</router-link>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  background: #f66605;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px 40px;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  margin-left: 20px;
}

.logo {
  font-weight: 700;
  height: 3ch;
  width: 3ch;
  border: 3px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

li + li {
  margin-left: 10px;
}

li {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}

li.router-link-active {
  color: #fff;
}
</style>
