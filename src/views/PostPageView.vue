<script>
import PostDetails from '../components/PostDetails.vue'

// this view dynamically requests data from express runnin at server/index.js

export default {
  data() {
    return {
      postID: "",
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
      var self = this
      this.postID = (this.$route.params.id ? this.$route.params.id : "");
      this.axios.get('http://localhost:3001/api/post/' + this.postID)
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
        self.error = error;
      })
      .then(function () {
        // always executed
      });  
    },
    deletePost(id) {
      var self = this
      this.axios({
            method: 'post', // post type is for one time submissions. Only post listener functions on backend will answer this call at this url
            url:'http://localhost:3001/api/post/' + id + '/delete', // we shouldn't hardcode the url like this
            data: this.form   
          }).then(response => {
            console.log(response.data)
            if (response.data.success) {
              this.$router.push('/category') // should push to /post/:id
            }
            else {
              this.error = response.data.error
            }
          })
          .catch(function (err) {
            self.error = err
          });
    }
  }
}
</script>


<template>
  <div v-if="haserror" class="alert alert-danger" role="alert">
    <p>{{ error }}</p>
  </div>
  <div class="row align-items-start">
    <!-- this button should go away, the page should immediate try to fetch the data, this is just for example -->
    <div class="col-sm">
      <!--- <button @click="deletePost(postID)" class="btn btn-danger">Delete {{ postID }}</button> !--->
      <PostDetails v-bind="form" v-bind:postID="postID" />
    </div>
  </div>
</template>

