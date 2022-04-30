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
      'email': "",
      'name': "",
      'password': "",
      'error': "",
    }
  },
  computed: {
      haserror() {
        return this.error ? true : false;
    }
  },
  methods: {
    registerUser(e) {
      this.error = ""
      const form = {
        'email': this.email,
        'name': this.name,
        'password': this.password,
      }
      console.log("vue sending this to store.registerUser:" + JSON.stringify(form));
      // need to validate form on frontend here before submitting via axios
      this.userStore.registerUser(form).then(err => {
        console.log(err)
        if (err) {
          this.error = err
        }
        else {
          this.$router.push('/')
        }
      }).catch((err)=>{
        this.error = err
      });
    },
  }
};
</script>

<template>
  <div class="container">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card">
            <div class="mt-3">
              <h4 class="text-center">Register for TufferUp</h4>
            </div>
            <div v-if="haserror" class="alert alert-danger" role="alert">
              <p>{{ error }}</p>
            </div>
            <form class="px-4 py-3" @submit.prevent="registerUser">
              <div class="mb-3">
                <label for="exampleDropdownFormEmail1" class="form-label"
                  >Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="email@csu.fullerton.edu"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="displayname" class="form-label">Display Name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  id="displayname"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        <div class="col-md-9"></div>
      </div>
    </div>
  </div>
</template>
