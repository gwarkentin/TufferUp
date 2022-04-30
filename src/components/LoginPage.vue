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
    loginUser(e) {
      const form = {
        'email': this.email,
        'password': this.password,
      }
      // need to validate form on frontend here before submitting via axios
      this.userStore.loginUser(form).then( err => {
        console.log('login err: ' + err)
        if (err) {this.error = err}
        else {
          this.$router.push('/') // should push to /post/:id
        }
      }).catch(err => {
        this.error = err
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
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="card">
            <div class="mt-3">
              <h4 class="text-center">Login to TufferUp</h4>
            </div>
            <div v-if="haserror" class="alert alert-danger" role="alert">
              <p>{{ error }}</p>
            </div>
            <form class="px-4 py-3" @submit.prevent="loginUser">
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
              <button type="submit" class="btn btn-primary" >Log In</button>
            </form>
          </div>
        <div class="col-md-9"></div>
      </div>
    </div>
  </div>
</template>
