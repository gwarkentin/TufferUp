<script>
import PostsList from '../components/PostsList.vue'
import { useUser } from '@/stores/user'

export default {
  data() {
    return {
      posts: Object,
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
  computed: {
      haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
    }
  },
  mounted() {
    this.tryAjax();
  },
  methods: {
    tryAjax() {
      var userid = this.userStore.user.user
      if (this.$route.params.id) {
        userid = this.$route.params.id
      }
      var self = this
        this.axios.get('http://localhost:3001/api/posts/user/' + userid)
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
