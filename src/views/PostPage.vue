<script>
import PostDetails from '../components/PostDetails.vue'
import { useUser } from '@/stores/user'

export default {
  setup() {
    const userStore = useUser()
    userStore.$subscribe((mutation, state) => {
    console.log(state)
  })
    return {
      userStore,
    }
  },
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
        imgs: null
      },
      ogdata: true,
      error: ""
    }
  },
  computed: {
      haserror() {
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
        const rd = response.data;
        if (rd.error) {this.error = rd.error}
        const post = rd.post
        const fields = Object.keys(this.form)
        if (post) {
          // thanks stack overflow. I was actually going to write something like this if I hadn't found it no cap
          // basically it filters the Object to only have the keys from the other object.
          // This is nice for v-bind whole form variable to obj, rather than each var individually
          const form = Object.keys(post).
            filter(key=> fields.includes(key)).
            reduce((obj,key)=>{obj[key] = post[key];return obj;}, {});
          form['category'] = form['category'].category;
          form['condition'] = form['condition'].condition;
          this.form = form;
        this.ogdata = false;
        }
      })
      .catch(function (error) {
        self.error = error;
      })
    },
    deletePost(id) {
      this.axios({
            method: 'post',
            url:'/api/post/delete/' + id,
            data: this.form   
          }).then(res=> {
            console.log(res.data)
            if (res.data.error) { this.error = res.data.error }
            if (res.data.postid) { this.$router.push('/') }
          })
          .catch(err => {
            this.error = err
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

