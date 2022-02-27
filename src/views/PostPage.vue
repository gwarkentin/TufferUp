<script>
import PostForm from '../components/PostForm.vue'
import PostDetails from '../components/PostDetails.vue'

export default {
  data() {
    return {
      form: {
        title: "Item Title",
        description: "Some book",
        category: "Books",
        condition: "Sandy",
        price: 99.00,
        discountable: true,
        imgs: ["/src/assets/book.jpg"]
      }
    }
  },
  components: {
    PostForm,
    PostDetails
  }
}

</script>

<template>
  <div class="row align-items-start">
    <div class="col-sm">
      <p>Discountable:{{ typeof(form.discountable) }}</p>
      <PostForm 
        v-model:title="form.title"
        v-model:description="form.description"
        v-model:category="form.category"
        v-model:condition="form.condition"
        v-model:price="form.price"
        v-model:discountable="form.discountable"
         />
    </div>
    <div class="col-sm">
      <PostDetails v-bind="form" />
    </div>
  </div>
</template>

