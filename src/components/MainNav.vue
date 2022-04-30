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
      this.messageStore.$patch({msg_thread:null, subscriber:null});
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
<nav class="navbar navbar-expand-sm navbar-light "  style="background-color: #FF8C00" >
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">
      <img src="/Tuffy.png" width="32" height="32" style="backgroud-colo:transparent;" class="d-inline-block align-text-top">
      TufferUp
    </router-link>
    <div class="nav-item d-flex">
      <input v-model="keywords" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" @keyup.enter="searchByKeywords">
      <button class="btn btn-outline-success" type="button" @click="searchByKeywords">Search</button>
    </div>
      <div class="navbar-nav">
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
            <li class="nav-item"></li>
            <button type="button" class="btn position-relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>
              <span v-if="userStore.msg_threads" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
              </span>
            </button>
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
</nav>
</template>

