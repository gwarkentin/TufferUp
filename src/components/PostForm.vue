<script>
import { useUser } from '@/stores/user'
export default {
  data() {
    return {
      'images': [],
      'error': "",
      'categories': {},
      'conditions': {}
    }
  },
  setup() {
    const userStore = useUser()
    return {
      userStore,
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
    mounted() {
     this.getCategoryList();
     this.getConditionList();
    },
    methods: {
      getCategoryList() {
        var self = this
        this.axios.get('/api/category/all')
        .then(response => {
          const rd = response.data;
          console.log(rd)
          this.categories = rd.categories
          this.error = response.data.error
        })
        .catch(function (error) {
          self.error = error;
        });  
      },
      getConditionList() {
        var self = this
        this.axios.get('/api/condition/all')
        .then(response => {
          const rd = response.data;
          this.conditions = rd.conditions
          this.error = response.data.error
        })
        .catch(function (error) {
          self.error = error;
        });  
      },
      makePost(e) {
        console.log(this.userStore)
        this.form = {
          'user': this.userStore.user.user,
          'title': this.title,
          'description': this.description,
          'category': this.category,
          'condition': this.condition,
          'price': this.price,
          'discountable': this.discountable,
          'imgs': this.imgs,
        }
        console.log(this.form)
        var self = this; // only way to get access to "this" from inside the catch??
        this.axios({
          method: 'post', 
          url:'/api/post/add',
          data: this.form   
        }).then(response => {
          if (response.data.error) {self.error = response.data.error}
          else {this.$router.push('/post/' + response.data.postID)}
        })
        .catch(function (err) {
          self.error = err
        });
      },
      getFiles(e) {
        console.log('getfile')
        this.images = []
        this.$emit('update:imgs', this.images);
        var imgs = [];
        const self = this;
        var files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          if (!file.type.startsWith('image/')){ continue }
          const reader = new FileReader();
          reader.addEventListener("load", function () {
            self.addImageTemp(reader.result);
          }, {once:true});
          reader.readAsDataURL(file);
        }
      },
      addImageTemp(image) {
        this.axios({
          method:'post',
          url:'/api/image/add',
          data: { image: String(image) } 
        }).then(res => {
          if (res.data.error) {
            console.log(res.data.error)
          }
          else {
            console.log(res.data.image)
            this.updateFiles(res.data.image)
          }
        }).catch(function(err) {
          console.log(err);
        });
      },
      updateFiles(imageid) {
        console.log('added img: ' + imageid)
        this.images.unshift(imageid)
        console.log(this.images);
        this.$emit('update:imgs', this.images );
      },
    }
  }

</script>

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
        <select :value="category" @input="$emit('update:category', $event.target.value)" class="form-control" id="formCategory">
          <template v-for="cat in categories" :key="cat">
            <option :value="cat._id">{{ cat.category }}</option>
          </template>
        </select>
      </div>
      <div class="mb-3">
        <label for="formCondition" class="form-label">Condition:</label>
        <select :value="condition" @input="$emit('update:condition', $event.target.value)" class="form-control" id="formCondition">
          <template v-for="cond in conditions" :key="cond">
            <option :value="cond._id">{{ cond.condition }}</option>
          </template>
        </select>
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

