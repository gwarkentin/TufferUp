<script>
export default {
  //these are public variables that parents can v-bind to
  props: {
      'postID': String,
      'title': String,
      'price': Number,
      'imgs': Object
  }
}
</script>

<template>
<div class="container border">
    <router-link :to="{ name: 'SpecificPost' , params: { id: postID }}" class="nav-link">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">${{ price }}</p>
    </router-link>
    <span v-for="image in imgs" :key="image">
      <p>replace us with a carousel</p>
      <img :src="image" class="card-img-bottom" alt="picture of {{ title }}">
    </span>
</div>
</template>

