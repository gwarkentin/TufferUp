<script>
import PostsList from '../components/PostsList.vue'

export default {
  data() {
    return {
      'error': ''
    }
  },
  components: {
    PostsList
  },
  computed: {
    keywords() {
      var kw = this.$route.params.keywords
      return kw
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
    <posts-list :error="error" :reqdata="reqdata" :url="'/api/posts/keywords/'"></posts-list>
  </template>
</template>

