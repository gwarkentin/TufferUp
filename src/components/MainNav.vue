<script>
</script>

<template>
<!--- Need to implement
This is just ugly, can you please update design. We should use CSUF colors for the site theme
  we want a site wide theme standard set in one place, maybe in App.vue, consider using Sass, idk anything about this
Also want to set up search bar to go to /post/:id for now, in future it should use a javascript autocomplete
  function to find common terms easily
-->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Post</router-link>

    <form class="nav-item d-flex">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/post/3" class="nav-link">Post 3</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/newpost" class="nav-link">New Post</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>

  </div>
</nav>
</template>

