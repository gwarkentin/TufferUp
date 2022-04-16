<script>
import PostsList from '../components/PostsList.vue'

export default {
  data() {
    return {
      'posts': Object,
      'category': String,
    }
  },
  components: {
    PostsList
  },
  computed: {
      haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
    }
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
          this.posts = rd.posts;
          this.error = response.data.error
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

