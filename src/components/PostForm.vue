<script>
export default {
  data() {
    return {
      'images': {},
      'error': ""
    }
  },
  // these are basically public variables that you can receive info from parent
    props: {
        'title': String,
        'description': String,
        'category': String,
        'condition': String,
        'price': Number,
        'discountable': Boolean,
        'imgs': Object,
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
    computed: {
      haserror() {
        console.log(Boolean('this.error: ' + this.error))
        return this.error ? true : false;
      },
    },
    // what functions you can call from <template> section below or the rest of the functions.
    methods: {
      makePost(e) {
        /*
          collect the data from this page and submit to backend (server/index.js), receive back some response
          the respose should be the ID of the post you just made if succesful and then you use this.$router.push(path/:id)
        */
        console.log(e)
        // put it all in one json object
        this.form = {
          'title': this.title,
          'description': this.description,
          'category': this.category,
          'condition': this.condition,
          'price': this.price,
          'discountable': this.discountable,
          'imgs': this.imgs,
          'rating': 0
        }
        // need to validate form on frontend here before submitting via axios

        var self = this; // only way to get access to "this" from inside the catch??
        this.axios({
          method: 'post', // post type is for one time submissions. Only post listener functions on backend will answer this call at this url
          url:'http://localhost:3001/api/newpost', // we shouldn't hardcode the url like this
          data: this.form   
        }).then(response => {
          if (response.data.success) {
            this.$router.push('/post/' + response.data.postID) // should push to /post/:id
          }
          else {
            self.error = response.data.error
          }
        })
        .catch(function (err) {
          self.error = err
        });

      },

      getFiles(e) {
        // replace these two lines with the ability to sort and remove images you uploaded
        // then it's easier to add a photo from one folder, then add another from another etc.
        this.images = {}
        this.$emit('update:imgs', this.images );

        var self = this; // only way to get access to "this" from inside the catch??
        var imgs = {};
        var files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          if (!file.type.startsWith('image/')){ continue }

          const reader = new FileReader();
          reader.addEventListener("load", function () {
            self.updateFiles( {
              'name': file.name,
              'data': reader.result
            }
            )
          }, {once:true});
          reader.readAsDataURL(file);
        }
        console.log(imgs);
      },

      updateFiles(aImg) {
        this.images[aImg.name] = aImg.data
        this.$emit('update:imgs', this.images );
      }
    }
  }

</script>

<!-- Just a bunch of inputs and their associated id attributes. When you receive the post with the backend, you can
access in these variables in server/index.js with something like req.body
-->
<template>
    <div v-show="haserror" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
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
        class="form-control" type="number" id="formPrice">
      </div>
      <div class="mb-3 form-check form-switch">
        <label for="formDiscountableT" class="form-check-label">Discountable</label>
        <input id="formDiscountableT" type="checkbox" name="discountable" class="form-check-input"
            @input="$emit('update:discountable', $event.target.checked)" :checked="discountable" />
      </div>
      <div class="mb-3">
        <label for="formFileMultiple" class="form-label">Upload Photos of Item</label>
        <input class="form-control" id="formFileMultiple" type="file" multiple accept="image/*" 
          @change="getFiles" />
      </div>
      <button type="button" class="btn btn-primary" @click="makePost">Submit</button>
    </form>
  </div>
</template>

