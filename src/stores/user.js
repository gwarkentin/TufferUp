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
        console.log('store got back: ' + JSON.stringify(response.data));
        if (response.data.error) {
          return response.data.error
        }
        else {
          this.user = response.data
          return
        }
      })
    },
    async loginUser(userForm) {
      axios({
        method: 'post',
        url:'http://localhost:3001/auth/login',
        data: userForm
      }).then( response => {
        console.log('store got back: ' + JSON.stringify(response.data));
        if (response.data.error) {
          return response.data.error
        }
        else {
          this.user = response.data
          return
        }
      })
    }
  },
  persist: {
    enabled: true
  }
})
  