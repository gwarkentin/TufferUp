<script>
import PostDetails from '../components/PostDetails.vue'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        title: "Item Title",
        description: "Item Description",
        category: "Item Category",
        condition: "Item Condition",
        price: 999999.99,
        discountable: false
      }
    }
  },
  components: {
    PostDetails
  },
  created() {
    axios.get('/apipost.json')
    .then(response => {
      console.log(response.data.form)
      console.log(this.form)
      this.form = response.data.form
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });  
  }
}
</script>

<template>
<h3>{{ $route.params.id }}</h3>
  <div class="row align-items-start">
    <div class="col-sm">
      <PostDetails v-bind="form" />
    </div>
  </div>
</template>

