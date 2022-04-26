<script>
import { useUser } from '@/stores/user'

export default {
  inject: ['$messaging'],
  setup() {
    const userStore = useUser()
    return {
      userStore,
    }
  },
  data() {
    return {
      msg: '',
      messages: [],
      thread: null,
      error: ''
    }
  },
  mounted() {
    console.log('Firebase cloud messaging object', this.$messaging)
  },
  computed: {
    haserror() {
      console.log('this.error: ' + this.error)
      return this.error ? true : false;
    },
  },
  methods: {
    sendMessage() {
      var data = {
        msg: String(this.msg),
        sender: this.userStore.user.user,
      }
      if (this.thread) {
        data['thread'] = this.thread
      }
      console.log('sending message data: ')
      console.log(data)
      this.axios({
          method: 'post', 
          url:'/api/messenger/send',
          data: data   
        }).then(response => {
          if (response.data.error) {this.error = response.data.error}
          else {
            this.messages.unshift(response.data.message)
          }
        })
        .catch( (err)=> {
          this.error = err
        });
    },
  }
}
</script>

<template>
  <div class="row container-fluid position-fixed bottom-0">
    <div class="col-md-3 offset-md-7 border bg-light bg-gradient" >
      <div v-show="haserror" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      <div class="overflow-auto container-fluid">  <!-- scroll container, idk if we want ul/li !-->
        <div class="row">
          <div class="col-6 col-4">
            <div v-for="msg in messages" :key="msg" class="bg-primary border">
              <span>{{ msg.msg }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-4 offset-md-6">
            <span class="bg-white" id="messagereceived">..General Kanobi.</span> <!-- needs align right class !-->
          </div>
        </div>
      </div>
      <div>
        <input v-model="msg" type="text" @keyup.enter="sendMessage" />
        <button type="button" @click="sendMessage" >Send</button>
      </div>
    </div>
  </div>
</template>

