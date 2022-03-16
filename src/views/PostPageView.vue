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
      ogdata: true,
      error: ""
    }
  },
  computed: {
      haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
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
        const rd = response.data;
        console.log('response data: ' + rd);
        if (rd.document) {
          this.form = response.data.document
        }
        this.error = response.data.error
        this.ogdata = false
      })
      .catch(function (error) {
        this.error = error;
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
  <div v-if="haserror" class="alert alert-danger" role="alert">
    <p>{{ error }}</p>
  </div>
  <div class="row align-items-start">
    <!-- this button should go away, the page should immediate try to fetch the data, this is just for example -->
    <div class="col-sm">
      <PostDetails v-bind="form" />
    </div>
  </div>
</template>

