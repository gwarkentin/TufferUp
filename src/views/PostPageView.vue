<script>
import PostDetails from '../components/PostDetails.vue'
import axios from 'axios'

// this view dynamically requests data from express runnin at server/index.js

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

    /* !need to implement
     the page should immediate try to fetch the data
     look at vue lifecycle hooks. We should calling tryAjax() from in Created(), but maybe check again
     later if something is going wrong
     */
    
    tryAjax() {
      const id = (this.$route.params.id ? this.$route.params.id : "");
      axios.get('http://localhost:3001/api/post/' + id)
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
    <!-- this button should go away, the page should immediate try to fetch the data, this is just for example -->
    <button type="button" :class="[ogdata ? 'btn-primary' : 'btn-secondary']" class="btn" @click="tryAjax">Replace with Ajax Data</button>
    <div class="col-sm">
      <PostDetails v-bind="form" />
    </div>
  </div>
  <p><strong>{{ $route.params.id }}</strong></p>
  <p>id Param of /post/:id, try going to /post/1234 for example</p>
</template>

