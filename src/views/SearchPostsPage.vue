<script>
import { isArray } from '@vue/shared'
import PostsList from '../components/PostsList.vue'

export default {
  components: {
    PostsList,
    PostsList
},
  computed: {
    keywords() {
      var kw = this.$route.params.keywords
      return kw
    },
    kwstr() {
      return this.keywords.join(', ')
    },
    reqdata() {
      var rd = {}
      if (this.keywords) {
        rd = {
          keywords: this.keywords
        }
      }
      return rd
    }
  },
}
</script>

<!-- need to implement
  properly designed with carousel view etc. Should look good in any screen size
  !-->
<template>
  <template v-if="keywords">
    <div class="text-center">
      <h2>Search results for: {{ kwstr }}</h2>
    </div>
    <PostsList :reqdata="reqdata" :url="'/api/posts/keywords/'"></PostsList>
  </template>
</template>

