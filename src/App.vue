<script>

</script>
<template>
  <div class="container">
    <h3>List</h3>
      <li>
        <ul><router-link to="/">Got to home</router-link></ul>
        <ul><router-link to="/form">Got to form</router-link></ul>
        <ul><router-link to="/post">Got to post</router-link></ul>
      </li>
      <router-view></router-view>
  </div>
</template>