<script>
import ImageGetter from './ImageGetter.vue'

export default {
  data() {
    return {
      currentImg: 0
    }
  },
  props: {
        imgs: Object,
        isthumbnail: Boolean,
        overflow: Boolean
  },
  components: {
    ImageGetter
  },
  computed: {
      imgheight() {
          if (this.isthumbnail) {
              return '200px'
          }
          return '500px'
      }
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

<template>
    <template v-if="imgs" >
        <template v-if="imgs.length == 1">
            <ImageGetter :id="imgs[0]" :style="{ height:imgheight, width:'100%', 'object-fit': !overflow ? 'contain' : 'cover'}" />
        </template>
        <template v-else-if="imgs.length > 1">
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                <div v-for="(image,index) in imgs" :index="index" :key="image" class="carousel-item"  :class="{active: index==currentImg}">
                    <ImageGetter :id="image" :style="{ height:imgheight, width:'100%', 'object-fit': !overflow ? 'contain' : 'cover'}" />
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
        </template>
    </template>
</template>