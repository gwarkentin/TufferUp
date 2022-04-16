<script>
import PostDetails from '../components/PostDetails.vue'

export default {
  data() {
    return {
      postID: String,
      form: {
        title: String,
        description: String,
        category: String, 
        condition: String,
        price: Number,
        discountable: Boolean,
        imgs: Array
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
      this.axios.get('/api/post/get/' + this.postID)
      .then(response => {
        console.log(response.data)
        const rd = response.data;
        if (rd.error) {this.error = rd.error}
        const post = rd.post
        const fields = Object.keys(this.form)
        if (post) {
          // thanks stack overflow. I was actually going to write something like this if I hadn't found it no cap
          // basically it filters the Object to only have the keys from the other object. This is nice for v-bind whole form to obj
          const form = Object.keys(post).
            filter(key=> fields.includes(key)).
            reduce((obj,key)=>{obj[key] = post[key];return obj;}, {});
          form.category = form.category.category;
          form.condition = form.condition.condition;
          console.log(form);
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
            method: 'post',
            url:'/api/post/delete/' + id,
            data: this.form   
          }).then(res=> {
            console.log(res.data)
            if (res.data.error) { console.log(res.data.error)}
            if (res.data.postid) { this.$router.push('/') }
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
      <button @click="deletePost(postID)" class="btn btn-danger">Delete {{ postID }}</button>
      <PostDetails v-bind="form" v-bind:postID="postID" />
    </div>
  </div>
</template>

