<script>
import ImageCarousel from './ImageCarousel.vue'

export default {
  props: {
        'title': String,
        'description' : String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable': Boolean,
        'imgs': [],
  },
  components: {
    ImageCarousel,
  },
}
</script>

<template>
  <div class="container">
    <div class="card h-100">
      <template v-if="imgs">
        <ImageCarousel :imgs="imgs" :isthumbnail="false"/>
      </template>
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
    </div>
</div>
</template>

