<script>

import PostForm from './PostForm.vue'
import PostDetails from './PostDetails.vue'

export default {
  data() {
    return {
      postform: {
        title: "Item Title",
        description: "Some book",
        category: "Books",
        condition: "Sandy",
        price: 99.00,
        discountable: true
      }
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
    <div class="col-sm">
      <PostForm 
        v-model:title="postform.title"
        v-model:description="postform.description"
        v-model:category="postform.category"
        v-model:condition="postform.condition"
        v-model:price="postform.price"
        v-model:discountable="postform.discountable" />
    </div>
    <div class="col-sm">
      <PostDetails v-bind="postform" />
    </div>
  </div>
</template>

