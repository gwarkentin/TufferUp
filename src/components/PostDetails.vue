<script>
export default {
  props: {
      'title': String,
      'description' : String,
      'category': String,
      'condition': String,
      'price': Number,
      'discountable': Boolean,
      'imgs': Array
  }
}
</script>

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
      <div>
        <span v-for="image in imgs">
          <img :src="image" class="card-img-bottom" alt="picture of {{ title }}">
        </span>
      </div>
    </div>
</div>
</template>

