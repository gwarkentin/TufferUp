<script>
export default {
  //these are public variables that parents can v-bind to
  props: {
      'postID': String,
      'title': String,
      'price': Number,
      'img': String
  }
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">${{ price }}</p>
      </div>
      <div>
        <img :src="img" class="card-img-bottom" alt="picture of {{ title }}">
      </div>
    </div>
</div>
</template>

