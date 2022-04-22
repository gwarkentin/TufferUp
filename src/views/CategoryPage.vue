<script>
import { isArray } from '@vue/shared';
import PostsList from '../components/PostsList.vue'
import { useCatCond } from '@/stores/cat_cond'

export default {
  setup() {
    const catcondStore = useCatCond();
    return {
      catcondStore
    }
  },
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
    <div class="text-center">
    <h2>{{ String(category) }}</h2></div>
    <template v-if="category">
     <posts-list v-bind:posts="posts" :url="'/api/posts/category/' + String(category)"></posts-list>
    </template>
  </template>
</template>