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
  methods: {
    registerUser(e) {
      var self = this
      this.form = {
        'email': this.email,
        'password': this.password,
      }
      console.log(JSON.stringify(this.form));
      // need to validate form on frontend here before submitting via axios
      this.userStore.registerUser(this.form).then( ()=> {
          this.$router.push('/') // should push to /post/:id
        }
      )
      .catch(function (err) {
        console.log(err)
        self.error = err
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
            <form class="px-4 py-3">
              <div class="mb-3">
                <label for="exampleDropdownFormEmail1" class="form-label"
                  >Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="email@csu.fullerton.edu"
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
                />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="dropdownCheck"
                  />
                  <label class="form-check-label" for="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <button type="button" class="btn btn-primary" @click="registerUser">Register</button>
            </form>
          </div>
        <div class="col-md-9"></div>
      </div>
    </div>
  </div>
</template>
