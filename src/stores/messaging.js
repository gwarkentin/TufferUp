import { defineStore } from 'pinia'
import axios from '../http'

export const useMessaging = defineStore('messaging', {
  state: () => {
    return {
      msg_thread: null,
    }
  },
  actions: {
    async sendMessage(msgform) {
      console.log('sending message data: ')
      console.log(msgform)
      axios({
          method: 'post', 
          url:'/api/messaging/send',
          data: msgform   
        }).then(response => {
          if (response.data.error) {this.error = response.data.error}
          else {
            this.msg_thread = response.data.msg_thread
            console.log('response message thread: ')
            console.log(response.data.msg_thread)
          }
        })
        .catch( (err)=> {
          this.error = err
        });
    }
  },
  persist: {
    enabled: true
  }
})
  