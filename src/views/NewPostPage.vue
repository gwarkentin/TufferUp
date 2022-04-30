<script>

// the module that connects the form and details view together

import PostForm from '../components/PostForm.vue'
import PostDetails from '../components/PostDetails.vue'
import { useUser } from '@/stores/user'

export default {
  setup() {
    const userStore = useUser()

    return {
      userStore,
    }
  },
  data() {
    return {
      // i feel like there should be a better way, but this was only thing I could make work natively.
      // basically, Both the detail, form, and this component all have their own copy of the same variables
      // and they are passing them from the form -> parent, then the parent -> post details. Any updates are
      // emitted by form, the parent updates itself with the v-models, then uses v-bind on the details to pass them on.
      form: {
        title: "",
        description: "",
        category: "",
        condition: "",
        price: 0,
        discountable: true,
        imgs:{} 
      }
    }
  },
  components: {
    PostForm,
    PostDetails
  },
  mounted() {
    if (!this.userStore.user) {
      this.$router.push('/login')
    }
    this.userStore.$subscribe((mutation, state) => {
      if (!state.user) {
        this.$router.push('/login')
      }
    })
  }
}

</script>

<template>
  <div class="row align-items-start m-4">
    <div class="col-sm-auto">
      <!-- Set local variables to update based on the PostForm emitting changes -->
      <PostForm 
        v-model:title="form.title"
        v-model:description="form.description"
        v-model:category="form.category"
        v-model:condition="form.condition"
        v-model:price="form.price"
        v-model:discountable="form.discountable"
        v-model:imgs="form.imgs"
         />
    </div>
    <div class="col-sm">
      <!-- Nice thing we can send them all along as one variable. When I tried this on PostForm it was weird, maybe try again? -->
      <PostDetails v-bind="form" />
    </div>
  </div>
</template>

