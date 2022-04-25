<script>
import { useUser } from '@/stores/user'

export default {
  setup() {
    const userStore = useUser()
    return {
      userStore,
    }
  },
  data() {
    return {
      error: ''
    }
  },
}
</script>

<template>
  <div class="row container-fluid position-fixed bottom-0">
    <div class="col-md-3 offset-md-7 border bg-light bg-gradient" >
      <div class="overflow-auto container-fluid">  <!-- scroll container, idk if we want ul/li !-->
        <div class="row">
          <div class="col-6 col-4">
            <span class="bg-white" id="messagesent">Hello there!</span>
          </div>
        </div>
        <div class="row">
          <div class="col-6 col-4 offset-md-6">
            <span class="bg-white" id="messagereceived">..General Kanobi.</span> <!-- needs align right class !-->
          </div>
        </div>
      </div>
      <form> <!-- maybe put div around me. Add Bootstrap style to form and button !-->
        <input type="text" />
        <button type="button">Send</button>
      </form>
    </div>
  </div>
</template>

