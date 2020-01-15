<template>
  <div class="navbar">
    <div class="logo">
      <span>V</span>
    </div>

    <ul class="navbar-links">
      <li>Top</li>
      <li>New</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .navbar {
    background: #F66605;
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
</style>
