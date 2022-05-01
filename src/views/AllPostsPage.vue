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
}
</script>

<!-- need to implement
  properly designed with carousel view etc. Should look good in any screen size
  !-->
<template>
  <div class="text-center py-4">
    <h2 >All Posts</h2>
    <hr>
  </div>
  <template v-if="posts">
    <posts-list :error="error" :url="'/api/posts'"></posts-list>
  </template>
</template>

