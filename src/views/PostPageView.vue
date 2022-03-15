<script>
import PostDetails from '../components/PostDetails.vue'
import axios from 'axios'

// this view dynamically requests data from express runnin at server/index.js

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        category: "",
        condition: "",
        price: 0.0,
        discountable: false,
        imgs: []
      },
      ogdata: true
    }
  },
  components: {
    PostDetails
  },
  mounted() {
    this.tryAjax()
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
        console.log(response.data)
        this.form = response.data
        this.ogdata = false
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
    },
  }
}
</script>


<template>
  <p><strong>{{ $route.params.id }}</strong></p>
  <div class="row align-items-start">
    <!-- this button should go away, the page should immediate try to fetch the data, this is just for example -->
    <div class="col-sm">
      <PostDetails v-bind="form" />
    </div>
  </div>
</template>

