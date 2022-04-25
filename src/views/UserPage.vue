<script>
import PostsList from '../components/PostsList.vue'
import { useUser } from '@/stores/user'

export default {
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
    userid() {
      if (this.userStore.user) {
        return this.userStore.user.user
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
    }
  }
}
</script>

<template>
  <template v-if="userid">
    <div class="text-center">
      <h2>Posts By: {{ userid }}</h2>
    </div>
    <posts-list :url="'/api/posts/user/' + userid"></posts-list>
  </template>
</template>
