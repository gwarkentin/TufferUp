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
        discountable: false,
        imgs: ["/src/assets/book.jpg"]
      },
      ogdata: true
    }
  },
  components: {
    PostDetails
  },
  methods: {
    tryAjax() {
      axios.get('/apipost.json')
      .then(response => {
        this.form = response.data.form
        this.ogdata = false
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
    }
  }
}
</script>

<template>
  <div class="row align-items-start">
    <button type="button" :class="[ogdata ? 'btn-primary' : 'btn-secondary']" class="btn" @click="tryAjax">Replace with Ajax Data</button>
    <div class="col-sm">
      <PostDetails v-bind="form" />
    </div>
  </div>
  <p><strong>{{ $route.params.id }}</strong></p>
  <p>id Param of /post/:id, try going to /post/1234 for example</p>
</template>

