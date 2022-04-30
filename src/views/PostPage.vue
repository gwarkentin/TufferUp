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
        user: {},
        title: "",
        description: "",
        category: "", 
        condition: "",
        price: 999,
        discountable: false,
        imgs: {}
      },
      ogdata: true,
      error: ""
    }
  },
  computed: {
    haserror() {
      return this.error ? true : false;
    },
    isOwner() {
      if (this.userStore.user) {
        return this.form.user._id === this.userStore.user.user
      }
      return false
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
        console.log(this.form)
        }
      })
      .catch((error) => {
        this.error = error;
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
  <div class="row">
    <div v-if="isOwner" class="col-sm">
      <button
      @click="deletePost(postID)" class="btn btn-danger">Delete</button>
    </div>
    <PostDetails v-bind="form" v-bind:postID="postID" />
  </div>
</template>

