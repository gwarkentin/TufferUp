<script>
export default {
  data() {
    return {
      'categories': {},
      'error': ''
    }
  },
  mounted() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      var self = this
      this.axios.get('http://localhost:3001/api/category/all')
      .then(response => {
        const rd = response.data;
        console.log(rd)
        this.categories = rd.categories
        this.error = response.data.error
      })
      .catch(function (error) {
        self.error = error;
      });  
    }
  }
}
</script>
<template>
<nav class="navbar navbar-expand-sm navbar-light" style="background-color: #00008B">
  <a class="navbar-brand text-white" href="/category">Categories</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ">
      <template v-for="cat in categories" :key="cat">
        <li class="nav-item active">
          <router-link :to="'/category/' + cat._id" class="nav-link text-white">{{ cat.category }}</router-link>
        </li>
      </template>
    </ul>
  </div>
</nav>
</template>

