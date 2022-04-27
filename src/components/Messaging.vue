<script>
import { useUser } from '@/stores/user'
import { useMessaging } from '@/stores/messaging'

export default {
  inject: ['$firebasemessaging'],
  setup() {
    const userStore = useUser()
    const messagingStore = useMessaging()
    return {
      userStore,
      messagingStore,
    }
  },
  data() {
    return {
      msg: '',
      thread: null,
      error: ''
    }
  },
  mounted() {
    console.log('Firebase cloud messaging object', this.$firebasemessaging)
  },
  computed: {
    haserror() {
      return this.error ? true : false;
    },
  },
  methods: {
    sendMessage() {
      const msgform =  {
        thread_id: this.messagingStore.msg_thread ? this.messagingStore.msg_thread._id : null,
        subscribers: [this.userStore.user.user],
        msg: {
          sender: this.userStore.user.user,
          text: this.msg,
        }
      }
      this.messagingStore.sendMessage(msgform);
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
      <button type="button" class="btn-close" aria-label="Close"
         data-bs-toggle="collapse" data-bs-target="#collapseMessage" aria-expanded="false" aria-controls="collapseMessage">
      </button>
      <div id="collapseMessage" class="collapse">
        <div class="overflow-auto container-fluid">  <!-- scroll container, idk if we want ul/li !-->
          <div class="row">
            <div class="col-6 col-4">
              <template v-if="messagingStore.msg_thread">
                <div v-for="msg in messagingStore.msg_thread.msgs" :key="msg" class="bg-primary border">
                  <span>{{ msg.text }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
        <form @submit.prevent="sendMessage">
          <input v-model="msg" type="text" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

