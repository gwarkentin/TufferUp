<script>
import PostPreview from '../components/PostPreview.vue'

export default {
  props:{
      posts: Object,
      category: String,
      error: "",
  },
  components: {
    PostPreview
  },
  computed: {
    haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
    }
  },
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
        <div v-for="post in posts" :key="post" class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <PostPreview :title="post.title" :price="post.price" :postID="post._id" :imgs="post.imgs" :posterid="post.user" :postername="post.user" />
        </div>
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