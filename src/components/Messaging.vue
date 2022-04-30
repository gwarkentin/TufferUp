<script>
import { useUser } from "@/stores/user";
import { useMessaging } from "@/stores/messaging";

export default {
  inject: ["$firebasemessaging"],
  setup() {
    const userStore = useUser();
    const messagingStore = useMessaging();
    return {
      userStore,
      messagingStore,
    };
  },
  data() {
    return {
      msg: "",
      thread: null,
      error: "",
    };
  },
  props: {
    receiverId: String,
  },
  mounted() {
    console.log("Firebase cloud messaging object", this.$firebasemessaging);
  },
  computed: {
    haserror() {
      return this.error ? true : false;
    },
  },
  methods: {
    sendMessage() {
      const msgform = {
        thread_id: this.messagingStore.msg_thread
          ? this.messagingStore.msg_thread._id
          : null,
        subscribers: [this.userStore.user.user],
        msg: {
          sender: this.userStore.user.user,
          text: this.msg,
        },
      };
      if (this.receiverId) {
        msgform.subscribers.push(this.receiverId);
      }
      this.messagingStore.sendMessage(msgform);
      this.msg = ""
    },
  },
};
</script>

<template>
  <div class="row position-fixed bottom-0 col-md-3 offset-md-7 mt-5 chatcontainer">
    <div v-show="haserror" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <button
      type="button"
      class="adiv btn"
      aria-label="Close"
      data-bs-toggle="collapse"
      data-bs-target="#collapseMessage"
      aria-expanded="false"
      aria-controls="collapseMessage"
    >Live Chat</button>
    <div id="collapseMessage" class="collapse ">
      <div class="overflow-auto container-fluid chatbox">
          <template v-if="messagingStore.msg_thread">
            <div v-for="msg in messagingStore.msg_thread.msgs" :key="msg"
                  class="row my-1" :class="msg.sender !== userStore.user.user ? 'justify-content-end' : ''">
              <div class="col-auto me-auto msg g-2"
                :class=" msg.sender !== userStore.user.user ? 'response' : ''">
                <div>
                  <p class="p-2 m-0">{{ msg.text }}</p>
                </div>
              </div>
            </div>
          </template>
      </div>
      <form @submit.prevent="sendMessage">
        <div class="input-group mb-2">
        <input
          v-model="msg"
          type="text"
          placeholder="Send Message..."
          class="form-control"
        />
        <button type="submit" class="btn btn-outline-primary">Send</button>
       </div>
     </form>
    </div>
  </div>
</template>

<style>
.chatcontainer {
  background: #DDD;
  border-radius: 10px;
  border: none;
}
.chatbox {
  overflow: auto;
  height: 400px;
}
.adiv {
  background: #cb5a04;
  vertical-align: auto;
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 12px;
  height: 40px;
  color: #ffffff;
  text-align: center;
}

.msg {
  border: none;
  background: #00109c;
  color: #FFF;
  width: 170px;
  font-size: 14px;
  border-radius: 10px;
  background-size: 5px;
  align-content: flex-end;
}

.response {
  background: #eb6314;
}

</style>
