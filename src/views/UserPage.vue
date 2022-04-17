<script>
import PostsList from '../components/PostsList.vue'
import { useUser } from '@/stores/user'

export default {
  data() {
    return {
      posts: Array,
      error: String
    }
  },
  setup() {
    const userStore = useUser()
    return {
      userStore,
    }
  },
  components: {
    PostsList
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.error = ""
      var userid = null
      if (this.userStore.user) {
        userid = this.userStore.user.user
      }
      if (this.$route.params.id) {
        userid = this.$route.params.id
      }
      if (!userid) {
        this.error = "No user to search for"
      }
      else {
        var self = this
        this.axios.get('/api/posts/user/' + userid)
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
}
</script>

<template>
  <template v-if="posts">
    <posts-list v-bind:posts="posts" :error="error"></posts-list>
  </template>
</template>
