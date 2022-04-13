<script>
import PostDetails from '../components/PostDetails.vue'

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
    this.getPostDetails()
  },
  methods: {
    getPostDetails() {
      var self = this
      this.postID = (this.$route.params.id ? this.$route.params.id : "");
      this.axios.get('http://localhost:3001/api/post/' + this.postID)
      .then(response => {
        const rd = response.data;
        if (rd.error) {this.error = rd.error}
        const post = rd.post
        const fields = Object.keys(this.form)
        if (post) {
          // thanks stack overflow. I was actually going to write something like this if I hadn't found it no cap
          const form = Object.keys(post).
            filter(key=> fields.includes(key)).
            reduce((obj,key)=>{obj[key] = post[key];return obj;}, {});
          form.category = form.category.category;
          form.condition = form.condition.condition;
          this.form = form;
        this.ogdata = false;
        }
      })
      .catch(function (error) {
        self.error = error;
      })
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

