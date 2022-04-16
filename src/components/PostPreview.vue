<script>
import ImageGetter from './ImageGetter.vue'

export default {
  //these are public variables that parents can v-bind to
  props: {
      'postID': String,
      'title': String,
      'price': Number,
      'imgs': Object
  },
  components: {
    ImageGetter
  }
}
</script>

<template>
<div class="container border">
    <router-link :to="{ name: 'SpecificPost' , params: { id: postID }}" class="nav-link">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">${{ price }}</p>
    </router-link>
    <span v-if="imgs">
      <ImageGetter :id="imgs[0]"/>
      <p> Image: {{ imgs[0] }}</p>
    </span>
</div>
</template>

