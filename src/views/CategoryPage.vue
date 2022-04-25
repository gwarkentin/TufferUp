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
  components: {
    PostsList
  },
  computed: {
    category() {
      return String(this.$route.params.category)
    }
  }
}
</script>

<template>
  <div class="text-center">
  <h2 v-if="catcondStore.categories[category]">{{ catcondStore.categories[category].category }}</h2></div>
  <template v-if="category">
    <PostsList :url="'/api/posts/category/' + category"></PostsList>
  </template>
</template>