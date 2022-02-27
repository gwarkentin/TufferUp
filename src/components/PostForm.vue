<script>
export default {
    props: {
        'title': String,
        'description': String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable': Boolean,
        'imgs': Array
    },
    emits: [
    'update:title',
    'update:description', 
    'update:category',
    'update:condition',
    'update:price',
    'update:discountable',
    'update:imgs'
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
      <div class="mb-3 form-check form-switch">
        <label for="formDiscountableT" class="form-check-label">Discountable</label>
        <input id="formDiscountableT" type="checkbox" name="discountable" class="form-check-input"
            @input="$emit('update:discountable', $event.target.checked)" :checked="discountable" />
      </div>
      <div class="mb-3">
        <label for="formFileMultiple" class="form-label">Upload Photos of Item</label>
        <input class="form-control" type="file" id="formFileMultiple" multiple
          @input="$emit('update:imgs', $event.target.value)">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

