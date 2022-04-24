<script>
import { isArray } from '@vue/shared';
import PostPreview from '../components/PostPreview.vue'

export default {
  data() {
    return {
      posts: Array,
      postscleaned: [],
      error: "",
    }
  },
  props:{
      url: String,
      reqdata: Object,
  },
  components: {
    PostPreview
  },
  computed: {
    haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
    },
  },
  watch:{
    reqdata() {
      console.log(this.url)
      console.log(this.reqdata)
      this.getposts()
    },
    url() {
      this.getposts()
    }
  },
  mounted() {
    this.getposts() 
  },
  methods: {
    getposts() {
      if (this.url) {
      console.log(this.reqdata)
      this.axios({
        method: this.reqdata ? 'post' : 'get',
        url: this.url,
        data: this.reqdata
        }).then(response => {
        const rd = response.data;
        const posts = rd.posts
        this.error = response.data.error
        // add error check first
        if (!Array.isArray(posts)) {
          this.error = 'No posts found'
        }
        else {
          this.posts = posts;
          return posts
        }
      })
      .then(posts => {
        this.cleanPosts(posts)
      })
      .catch(function (error) {
        self.error = error;
        }); 
      }
    },
    cleanPosts(newposts) {
      this.postscleaned = []
      newposts.forEach(post => {
        try {
          const p = {
            postID: post._id,
            title: post.title,
            price: post.price,
            imgs: post.imgs,
            posterid: post.user._id,
            postername: post.user.name
          }
          this.postscleaned.unshift(p)
        }
        catch (err) {
          console.log(err)
        }
      });
    }
  }
}
</script>

<!-- need to implement
  properly designed with carousel view etc. Should look good in any screen size
  !-->
<template>
<div class="container">
    <div v-if="haserror" class="alert alert-danger" role="alert">
        <p>{{ error }}</p>
    </div>
    <!-- Backround Image -->

    <div class="container">
    <div class="row">
      <template v-if="postscleaned.length > 0">
        <div v-for="post in postscleaned" :key="post" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <PostPreview v-bind="post" />
        </div>
      </template>
    </div>
</div>
  <!-- /.row -->

  <!-- Pagination -->
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">3</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</div>

</template>