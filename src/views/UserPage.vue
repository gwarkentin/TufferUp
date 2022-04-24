<script>
import PostsList from '../components/PostsList.vue'
import { useUser } from '@/stores/user'

export default {
  data() {
    return {
      userid: String 
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
    this.getUser();
  },
  methods: {
    getUser() {
      if (this.userStore.user) {
        this.userid = this.userStore.user.user
      }
      if (this.$route.params.id) {
        this.userid = this.$route.params.id
      }
     }
  }
}
</script>

<template>
  <template v-if="userid">
    <posts-list :url="'/api/posts/user/' + userid"></posts-list>
  </template>
</template>
