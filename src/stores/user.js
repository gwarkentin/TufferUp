import { defineStore } from 'pinia'
import axios from '../http.js'

export const useUser = defineStore('user', {
  state: () => {
    return {
      user: null,
      msg_threads: null
    }
  },
  actions: {
    async getMessageThreads() {
      /*
      try {
        var response = await axios({
                    method: 'post',
                    url:'/api/messagethreads/get',
                    data: this.user})
        if (response.data.error) {
          return response.data.error
        }
        else {
          console.log(response.data)
          if (response.data.msg_threads) {
            this.msg_threads = response.data.msg_threads
            return
          }
          return "Couldn't retreive messages"
        }
      }
      catch (err) {
        return err
      }
      */
    },
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
            console.log(response.data)
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
  