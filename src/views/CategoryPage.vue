<script>
import { isArray } from '@vue/shared';
import PostsList from '../components/PostsList.vue'

export default {
  data() {
    return {
      posts: Array,
      category: String,
      error: "",
    }
  },
  components: {
    PostsList
  },
  watch:{
    $route (newroute, oldroute){
      if (newroute) {
        this.category = newroute.params.category;
        this.getPosts();
      }
    }
  },
  mounted() {
    this.category = this.$route.params.category;
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.error = ""
      var self = this
      this.axios.get('/api/posts/category/' + this.category)
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
    <posts-list v-bind:posts="posts" v-bind:error="error"></posts-list>
  </template>
</template>