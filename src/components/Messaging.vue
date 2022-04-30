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
    },
  },
};
</script>

<template>
  <div class="row position-fixed bottom-0 col-md-3 offset-md-7 chatbox mt-5">
    <div v-show="haserror" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <button
      type="button"
      class="adiv"
      aria-label="Close"
      data-bs-toggle="collapse"
      data-bs-target="#collapseMessage"
      aria-expanded="false"
      aria-controls="collapseMessage"
    >Live Chat</button>
    <div id="collapseMessage" class="collapse">
      <div class="overflow-auto container-fluid">
        <!-- scroll container, idk if we want ul/li !-->
        <div class="col-6 col-4">
          <template v-if="messagingStore.msg_thread">
            <div
              v-for="msg in messagingStore.msg_thread.msgs"
              :key="msg"
              class="chat ml-2 p-3"
            >
              <span>{{ msg.text }}</span>
            </div>
          </template>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input
          v-model="msg"
          type="text"
          class="send"
          placeholder="Send Message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style>
.chatbox {
  background: #3e3e3e;
  width: 300px;
  border: none;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

.adiv {
  background: #cb5a04;
  vertical-align: auto;
  width: 300px;
  border-radius: 15px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 12px;
  height: 40px;
  color: #ffffff;
  text-align: center;
}

.chat {
  border: none;
  background: #0095ff;
  font-size: 12px;
  border-radius: 20px;
  background-size: 5px;
  overflow: auto;
  row-gap: 100px;
  align-content: flex-end;
}

.response {
  border: none;
  background: #40ff00;
  font-size: 12px;
  border-radius: 20px;
  background-size: 5px;
  overflow: auto;
  row-gap: 100px;
}

.send {
  border-radius: 15px;
  background: #ffffff;
}
</style>
