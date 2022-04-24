<script>
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
    console.log(this.catcondStore.categories[String(this.category)])
  },
}
</script>

<template>
  <template v-if="posts">
    <div class="text-center">
    <h2 v-if="catcondStore.categories[String(category)]">{{ catcondStore.categories[String(category)].category }}</h2></div>
    <template v-if="category">
     <posts-list v-bind:posts="posts" :url="'/api/posts/category/' + String(category)"></posts-list>
    </template>
  </template>
</template>