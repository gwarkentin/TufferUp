<script>
export default {
  //these are public variables that parents can v-bind to
  props: {
      'postID': String,
      'title': String,
      'price': String,
      'img': String
  }
}
</script>

<template>
<div class="container border">
  <h5 class="card-title">{{ title }}</h5>
  <p class="card-text">${{ price }}</p>
  <img :src="img" class="card-img-bottom" alt="picture of {{ title }}">
</div>
</template>

