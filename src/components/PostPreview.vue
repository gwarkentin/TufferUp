<script>
import ImageGetter from './ImageGetter.vue'

export default {
  //these are public variables that parents can v-bind to
  props: {
      'postID': String,
      'title': String,
      'price': Number,
      'imgs': Object,
      'posterid': "",
      'postername': String,
  },
  components: {
    ImageGetter
  }
}
</script>

<template>
<router-link :to="{ name: 'SpecificPost' , params: { id: postID }}" class="nav-link">
<div class="card h-100">
    <template v-if="imgs">
      <ImageGetter :id="imgs[0]"/>
    </template>
  <div class="card-body">
    <h4 class="card-title">
        {{ title }}
    </h4>
    <p class="card-text">{{ price }}</p>
    <router-link :to="{ name: 'UserPage' , params: { id: posterid }}" class="">
      <p class="card-text"><small class="text-muted">{{ postername }}</small></p>
    </router-link> 
    </div>
  </div>
</router-link>
</template>
