import { defineStore } from 'pinia'
import axios from 'axios'

export const useUser = defineStore('user', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    async registerUser(userForm) {
      axios({
        method: 'post',
        url:'http://localhost:3001/auth/signup',
        data: userForm
      }).then( response => {
        console.log(JSON.stringify(response.data));
        if (response.data.user) {
          this.user = user
        }
        else {
          return response.data.error
        }
      })
    }
  }
})
  