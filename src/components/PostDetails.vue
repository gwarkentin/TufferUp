<script>
import ImageGetter from './ImageGetter.vue'

export default {
  data() {
    return {
      currentImg: 0
    }
  },
  components: { ImageGetter },
  //these are public variables that parents can v-bind to
  props: {
        'title': String,
        'description' : String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable': Boolean,
        'imgs': Object,
  },
  components: {
    ImageGetter
  },
  methods: {
    previousImg() {
      this.currentImg -= 1
      if (this.currentImg < 0) {
        this.currentImg = this.imgs.length - 1
      }
      console.log(this.currentImg)
    },
    nextImg() {
      this.currentImg += 1
      if (this.currentImg >= this.imgs.length) {
        this.currentImg = 0
      }
      console.log(this.currentImg)
    },
  }
}
</script>

<!-- need to implement
  properly designed with carousel view etc. Should look good in any screen size
  !-->
<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <p class="card-text">Category: {{ category }}</p>
        <p class="card-text">Condition: {{ condition }}</p>
        <div v-if="discountable">
          <label>$</label> 
          <input :placeholder="price" />
        </div>
        <p v-else class="card-text">${{ price }}</p>
      </div>
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(image,index) in imgs" :index="index" :key="image" class="carousel-item" :class="{active: index==currentImg}">
            <ImageGetter :id="image"/>
          </div>
        </div>
        <span class="carousel-control-prev" role="button" data-slide="prev" @click="previousImg">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </span>
        <span class="carousel-control-next" role="button" data-slide="next" @click="nextImg">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </span>
      </div>
    </div>
</div>
</template>

