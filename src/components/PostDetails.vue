<script>
export default {
  props: {
      'title': String,
      'description' : String,
      'category': String,
      'condition': String,
      'price': Number,
      'discountable': Boolean,
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
        <input :placeholder="price" />
        <p class="card-text">{{ price }}</p>
      </div>
      <img src="/src/assets/book.jpg" class="card-img-bottom" alt="picture of {{ title }}">
    </div>
</div>
</template>

