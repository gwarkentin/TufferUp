<script>
import { useUser } from '@/stores/user'

export default {
  setup() {
    const userStore = useUser()
    return {
      userStore,
    }
  },
  data() {
    return {
      keywords: ""
    }
  },
  methods: {
    logoutUser() {
      this.userStore.$patch({user:null});
    },
    searchByKeywords() {
      if (this.keywords) {
        const kwarray = this.keywords.trim().toLowerCase().split(' ')
        const kstr = kwarray.join('/')
        this.$router.push('/search/' + kstr)
      }
    }
  }
}
</script>

<template>
<!--- Need to implement
This is just ugly, can you please update design. We should use CSUF colors for the site theme
  we want a site wide theme standard set in one place, maybe in App.vue, consider using Sass, idk anything about this
Also want to set up search bar to go to /post/:id for now, in future it should use a javascript autocomplete
  function to find common terms easily
-->
<nav class="navbar navbar-expand-lg navbar-light "  style="background-color: #FF8C00" >
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">
      <img src="/Tuffy.png" width="32" height="32" style="backgroud-colo:transparent;" class="d-inline-block align-text-top">
      TufferUp
    </router-link>
    <div class="nav-item d-flex">
      <input v-model="keywords" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" @keyup.enter="searchByKeywords">
      <button class="btn btn-outline-success" type="button" @click="searchByKeywords">Search</button>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <template v-if="userStore.user">
            <li class="nav-item">
              <router-link to="/newpost" class="nav-link">New Post</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/category/add" class="nav-link">Add Category</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">{{ userStore.user.name }}</router-link>
            </li>
            <li class="nav-item">
              <button class="btn" type="button" @click="logoutUser">Logout</button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>

  </div>
</nav>
</template>

