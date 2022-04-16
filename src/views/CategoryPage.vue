<script>
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
  computed: {
      haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
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
          this.posts = rd.posts;
          console.log(this.posts.length)
          this.error = response.data.error
          if (this.posts.length == 0) {
            this.error = 'No posts found'
          }
        })
        .catch(function (error) {
          self.error = error;
        })
        .then(function () {
          // always executed
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
    <posts-list v-bind:posts="posts"></posts-list>
  </template>
</template>