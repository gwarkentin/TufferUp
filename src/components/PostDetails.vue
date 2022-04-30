<script>
import ImageCarousel from './ImageCarousel.vue'

export default {
  props: {
        'posterid': "",
        'postername': String,
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
  emits: ['initMessage'],
}
</script>

<template>
  <div class="container">
    <div class="col-3">
      <div class="row">
        <h5>{{ title }}</h5>
        <p>{{ description }}</p>
        <p>Category: {{ category }}</p>
        <p>Condition: {{ condition }}</p>
      </div>
      <div class="row">
        <div v-if="discountable">
          <label>$</label> 
          <input :placeholder="price" />
        </div>
        <p v-else>${{ price }}</p>
      </div>
    </div>
    <div class="col-6">
      <div class="row">
        <template v-if="imgs">
          <ImageCarousel :imgs="imgs" :isthumbnail="false"/>
        </template>
      </div>
    </div>
    <button @click="$emit('initMessage', posterid)" class="btn btn-primary">Delete</button>
  </div>
</template>

