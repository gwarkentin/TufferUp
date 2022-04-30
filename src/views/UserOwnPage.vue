<script>
import UserPage from './UserPage.vue'
import { useUser } from '@/stores/user'

export default {
  setup() {
    const userStore = useUser()
    return {
      userStore,
    }
  },
  components: {
    UserPage
  },
  computed: {
    userid() {
      if (this.userStore.user.user) {
        return this.userStore.user.user
      }
    }
  }
}
</script>

<template v-if="userid">
  <UserPage :userid="userid"></UserPage>
</template>
