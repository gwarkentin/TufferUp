<script>

</script>

<template>
<nav class="navbar navbar-expand-sm navbar-light" style="background-color: #00008B">
  <a class="navbar-brand text-white" href="/category">Categories</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ">
      <li class="nav-item active">
        <router-link to="/category/Books" class="nav-link text-white">Books</router-link>
      </li>
      <li class="nav-item active">
        <router-link to="/category/Dorm" class="nav-link text-white">Dorm</router-link>
      </li>
      <li class="nav-item active">
        <router-link to="/category/Food" class="nav-link text-white">Food</router-link>
      </li>
      <li class="nav-item active">
        <router-link to="/category/Computer" class="nav-link text-white">Computer</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

