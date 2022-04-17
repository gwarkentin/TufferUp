<script>
import PostsList from '../components/PostsList.vue'

export default {
  data() {
    return {
      'posts': Array,
      'category': String,
      'error': ''
    }
  },
  components: {
    PostsList
  },
  mounted() {
    this.getposts();
  },
  methods: {
    getposts() {
      var self = this
        this.axios.get('/api/posts/')
        .then(response => {
        const rd = response.data;
        const posts = rd.posts
        this.error = response.data.error
        if (!Array.isArray(posts)) {
          this.error = 'No posts found'
        }
        else {
          this.posts = posts;
        }
      })
      .catch(function (error) {
        self.error = error;
      });  
    }
  }
}
</script>

<!-- need to implement
  properly designed with carousel view etc. Should look good in any screen size
  !-->
<template>
  <template v-if="posts">
    <posts-list v-bind:posts="posts" :error="error"></posts-list>
  </template>
</template>

