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
      }
    }
  },
  mounted() {
    this.category = this.$route.params.category;
  },
}
</script>

<!-- need to implement
  properly designed with carousel view etc. Should look good in any screen size
  !-->
<template>
  <template v-if="posts">
    <p>{{ '/api/posts/category/' + String(category) }}</p>
    <template v-if="category">
     <posts-list v-bind:posts="posts" :url="'/api/posts/category/' + String(category)"></posts-list>
    </template>
  </template>
</template>