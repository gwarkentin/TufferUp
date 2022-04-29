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
      try {
        var response = await axios({
                    method: 'post',
                    url:'http://localhost:3001/auth/signup',
                    data: userForm})
        if (response.data.error) {
          return response.data.error
        }
        else {
          if (response.data.user) {
            this.user = response.data.user
            return
          }
          return "Didn't receive back user info, please try logging in with your new account info."
        }
      }
      catch (err) {
        console.log(err)
        return err
      }
    },
    async loginUser(userForm) {
      try {
        var response = await axios({
          method: 'post',
          url:'http://localhost:3001/auth/login',
          data: userForm
        })
        if (response.data.error) {
          return response.data.error
        }
        else {
          if (response.data.user) {
            this.user = response.data.user
            return
          }
        }
      }
      catch (err) {
        return err
      }
    }
  },
  persist: {
    enabled: true
  }
})
  