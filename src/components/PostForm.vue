<script>
export default {
    props: {
        'title': String,
        'description': String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable':Boolean
    },
    emits: [
    'update:title',
    'update:description', 
    'update:category',
    'update:condition',
    'update:price',
    'update:discountable'
    ]
  }

</script>

<template>
  <div class="form">
    <form class="container" >
      <h4>Input Form:</h4>
      <div class="mb-3">
        <label for="formTitle" class="form-label">Title:</label>
        <input
          :value="title" @input="$emit('update:title', $event.target.value)"
          class="form-control" id="formTitle" />
      </div>
      <div class="mb-3">
        <label for="formDescription" class="form-label">Description:</label>
        <input 
          :value="description" @input="$emit('update:description', $event.target.value)"
        class="form-control" id="formDescription">
      </div>
      <div class="mb-3">
        <label for="formCategory" class="form-label">Category:</label>
        <input 
          :value="category" @input="$emit('update:category', $event.target.value)"
        class="form-control" id="formCategory">
      </div>
      <div class="mb-3">
        <label for="formCondition" class="form-label">Condition:</label>
        <input 
          :value="condition" @input="$emit('update:condition', $event.target.value)"
        class="form-control" id="formCondition">
      </div>
      <div class="mb-3">
        <label for="formPrice" class="form-label">Price:</label>
        <input 
          :value="price" @input="$emit('update:price', $event.target.value)"
        class="form-control" id="formPrice">
      </div>
      <div class="mb-3 form-check">
        <label for="formDiscountable" class="form-check-label">Discountable</label>
        <input 
          :value="discountable" @input="$emit('update:discountable', $event.target.value)"
        type="checkbox" class="form-check-input" id="formDiscountable">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

