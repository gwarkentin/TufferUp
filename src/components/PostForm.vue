<script>
import axios from 'axios'

export default {
  // these are basically public variables that you can pass info between with parent
    props: {
        'title': String,
        'description': String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable': Boolean,
        'imgs': Array
    },
    // to send updates to let parent know these changed
    emits: [
    'update:title',
    'update:description', 
    'update:category',
    'update:condition',
    'update:price',
    'update:discountable',
    'update:imgs'
    ],
    // what functions you can call from <template> section below or the rest of the functions.
    methods:
    {
      /*
        collect the data from this page and submit to backend (server/index.js), receive back some response
        the respose should be the ID of the post you just made if succesful and then you use this.$router.push(path/:id)
      */
      makePost() {

        // put it all in one json object
        this.form = {
          'title': this.title,
          'description': this.description,
          'category': this.category,
          'condition': this.condition,
          'price': this.price,
          'discountable': this.discountable,
          'imgs': this.imgs
        }
        console.log("Sending:" + JSON.stringify(this.form))
        axios({
          method: 'post', // post type is for one time submissions. Only post listener functions on backend will answer this call at this url
          url:'http://localhost:3001/api/newpost', // we shouldn't hardcode the url like this
          data: this.form   
        }).then(response => {
          /* -- ! need to implement
            Expect response.data to be like:
              {
                "success": Boolean,
                "postID": Int,  // 0 on failure
                "error": String // "" if success=true, "warning description" if some warning
              }
            if so push to '/newpost/:id' where they can see the live result,
            otherwise tell them it failed to submit and stay on this page,
              use a vue var bound to an element with bootstrap styles for hidden or warning/danger 
              if danger, show some text diagnosing the problem from backend and/or from this func.
          */

          console.log("receiving:" + JSON.stringify(response.data))
          this.$router.push('/newpost/done')
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        }); 
      }
    }
  }

</script>

<!-- Just a bunch of inputs and their associated id attributes. When you receive the post with the backend, you can
access in these variables in server/index.js with something like req.body
-->
<template>
  <div class="form">
    <form class="container" enctype="multipart/form-data" id="newpostform">
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
      <button type="button" class="btn btn-primary" @click="makePost()">Submit</button>
    </form>
  </div>
</template>

