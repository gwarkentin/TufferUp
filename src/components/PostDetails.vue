<script>
import ImageCarousel from './ImageCarousel.vue'
import UserGetter from './UserGetter.vue'

export default {
  props: {
        'user': {},
        'title': String,
        'description' : String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable': Boolean,
        'imgs': {},
  },
  components: {
    ImageCarousel,
    UserGetter
},
  emits: ['initMessage'],
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md p-4">
        <div class="row border">
          <div class="col col-sm-auto align-items-center p-4">
            <h5>{{ title }}</h5>
            <p>{{ description }}</p>
            <p>Category: {{ category }}</p>
            <p>Condition: {{ condition }}</p>
          </div>
          <div class="col text-end p-4">
            <h1>${{ price }}</h1>
          </div>
        <div class="d-grid gap-2 mx-auto">
          <button @click="$emit('initMessage', user._id)" class="btn btn-primary">Make Offer</button>
        </div>
        <div class="col p-4">
          <UserGetter :user="user"  />
        </div>
        </div>
      </div>
      <div class="col-md-7 p-4">
        <template v-if="imgs">
          <ImageCarousel :imgs="imgs" :isthumbnail="false"/>
        </template>
      </div>
      </div>
    </div>
</template>

