<script>
import ImageCarousel from './ImageCarousel.vue'
import UserGetter from './UserGetter.vue'

export default {
  //these are public variables that parents can v-bind to
  props: {
      'postID': String,
      'title': String,
      'price': Number,
      'imgs': Object,
      'user': "",
      // 'posterid': "",
      // 'postername': String,
  },
  components: {
    ImageCarousel,
    UserGetter
}
}
</script>

<template>
  <div class="card h-100">
    <template v-if="imgs">
        <ImageCarousel :imgs="Array(imgs[0])" :isthumbnail="true"/>
    </template>
    <div class="card-body">
      <router-link :to="{ name: 'SpecificPost' , params: { id: postID }}" class="card-link" >
        <h6 class="card-title">
            {{ title }}
        </h6>
      </router-link>
      <p class="card-text">${{ price }}</p>
      <UserGetter :user="user" />
      <!--
      <router-link :to="{ name: 'UserPage' , params: { id: posterid }}" class="">
        <p class="card-text"><small class="text-muted">{{ postername }}</small></p>
      </router-link> 
      !-->
    </div>
  </div>
</template>
