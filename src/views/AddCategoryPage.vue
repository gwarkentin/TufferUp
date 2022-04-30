<script>
import { useUser } from '@/stores/user'
export default {
  setup() {
    const userStore = useUser()
    return {
      userStore,
    }
  },
  data() {
    return {
      'category': "",
      'subcategories': [],
      'newsubcat':"",
      'error': "",
    }
  },
  computed: {
      haserror() {
        console.log('this.error: ' + this.error)
        return this.error ? true : false;
    }
  },
  methods: {
    addSubcategory(e) {
      console.log(this.newsubcat)
      this.subcategories.unshift(this.newsubcat)
      this.newsubcat = ""
    },
    remSubcategory(e) {
      this.subcategories.shift(e.ind)
    },
    addCategory(e) {
      var self = this
      const data = {
        'category': this.category,
        'subcategories': this.subcategories,
      }
      console.log(JSON.stringify(data));
      // need to validate form on frontend here before submitting via axios
      this.axios({
          method: 'post', 
          url:'/api/category/add',
          data: data   
        }).then(res => {
          if (res.data.err) {self.error = res.data.errerr}
          else {
            this.$router.push('/')
          }
        }).catch(function (err) {
          self.error = err
      });
    },
  }
};
</script>

<!--- need to implement the actually post/connection to backend.
    Mirror the PostForm code, but we also need to look at login/cookie/seesion managment
    i'm not sure how node and vue handle that yet. I saw something called "stores" that might be it?
-->
<template>
  <div class="container">
  <div v-if="haserror" class="alert alert-danger" role="alert">
    <p>{{ error }}</p>
  </div>
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card">
            <div class="mt-3">
              <h4 class="text-center">Add Category</h4>
            </div>
            <div v-if="haserror" class="alert alert-danger" role="alert">
              <p>{{ error }}</p>
            </div>
            <form class="px-4 py-3">
              <div class="mb-3">
                <label for="formCategory" class="form-label"
                  >Category</label>
                <input
                  v-model="category"
                  type="text"
                  class="form-control"
                  id="formCategory"
                  placeholder="Books, Dorm, Food, ..."
                />
              </div>
              <div class="mb-3">
                <label for="formSubcategory" class="form-label">Subcategories</label>
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <input
                    v-model="newsubcat"
                    type="text"
                    class="form-control"
                    id="addSubCatButton"
                    placeholder="Textbooks, Novels, Desk, Chair, Lamp"
                  />
                  <button
                    type="button"
                    class="btn btn-secondary btn-md text-nowrap"
                    id="addSubCatButton"
                    placeholder="Password"
                    @click="addSubcategory"
                  >Add</button>
                </div>
                <ul class="subcategories">
                  <li v-for="(subcat,ind) in subcategories" :key="subcat" :index="ind"
                  class="list-group-item d-flex justify-content-between align-items-center">{{ subcat }}
                    <button
                      type="button"
                      class="btn btn-danger btn-md text-nowrap"
                      :id="'remSubCatButton' + ind"
                      v-bind:ind="ind"
                      placeholder="Password"
                      @click="remSubcategory"
                    >Remove</button>
                  </li>
                </ul>
              </div>
              <button type="button" class="btn btn-primary" @click="addCategory">Submit</button>
            </form>
          </div>
        <div class="col-md-9"></div>
      </div>
    </div>
  </div>
</template>
