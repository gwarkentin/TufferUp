<script>

import PostForm from './PostForm.vue'
import PostDetails from './PostDetails.vue'

export default {
  data() {
    return {
      page_email: "test",
      page_password: "p"
    }
  },
  components: {
    PostForm,
    PostDetails
  },
}

</script>

<template>
  <div class="row align-items-start">
    <div class="col">
      <PostForm v-model:email="page_email" v-model:password="page_password" />
    </div>
    <div class="col">
      <PostDetails :det_email="page_email" :det_password="page_password" />
    </div>
  </div>
</template>

