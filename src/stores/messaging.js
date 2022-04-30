import { defineStore } from 'pinia'
import axios from '../http'

export const useMessaging = defineStore('messaging', {
  state: () => {
    return {
      msg_thread: null,
      subscriber: null,
    }
  },
  actions: {
    clearMessageThread() {
      this.msg_thread = null
    },
    async sendMessage(msgform) {
      try {
        console.log('sending message data: ')
        console.log(msgform)
        var response =  await axios({ method: 'post', url:'/api/messaging/send', data: msgform   })
        if (response.data.error) { throw error(response.data.error) }
        else {
          this.msg_thread = response.data.msg_thread
          console.log('response message thread: ')
          console.log(response.data.msg_thread)
        }
      }
      catch (err) {
        return err 
      }
    },
    async getMessageThread(thread_id) {
      try {
        console.log('req msgs for thread: ' + thread_id)
        var response =  await axios({
          method: 'post',
          url:'/api/messaging/get',
          data: {thread_id: thread_id} })
        if (response.data.error) { throw error(response.data.error) }
        else {
          this.msg_thread = response.data.msg_thread
          console.log('response message thread: ')
          console.log(response.data.msg_thread)
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
  