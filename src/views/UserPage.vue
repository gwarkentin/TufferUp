<script>
import PostsList from '../components/PostsList.vue'

export default {
  components: {
    PostsList
  },
  props: {
    userid: String
  },
  computed: {
    userid2() {
      if (this.userid) {
        return this.userid
      }
      else if (this.$route.params.id) {
        return this.$route.params.id
      }
    }
  }
}
</script>

<template>
  <template v-if="userid2">
    <div class="text-center">
      <h2>Posts By: {{ userid2 }}</h2>
    </div>
    <posts-list :url="'/api/posts/user/' + userid2"></posts-list>
  </template>
</template>
