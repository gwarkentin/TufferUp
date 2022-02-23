<script>
export default {
    props: ['email', 'password'],
    emits: ['update:email','update:password']
  }

</script>

<template>
  <div class="form">
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address:</label>
        <input
          :value="email" @input="$emit('update:email', $event.target.value)"
          type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password:</label>
        <input 
          :value="password" @input="$emit('update:password', $event.target.value)"
        type="password" class="form-control" id="exampleInputPassword1">
      </div>
    </form>
  </div>
</template>

