<script>
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">TufferUp</router-link>
    <router-link to="/express" class="navbar-brand">Express API</router-link>
    <div class="container-fluid">
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <router-link to="/post" class="navbar-brand">Post</router-link>
    <router-link to="/login" class="navbar-brand">Login</router-link>
  </div>
</nav>
</template>

