<script>
export default {
  props: ['det_email','det_password']
}
</script>

<template>
  <div class="container">
      <div class="mb-3">
        <label>Email address</label>
        <p>{{ det_email }}</p>
      </div>
      <div class="mb-3">
        <label>Password</label>
        <p>{{ det_password }}</p>
      </div>
  </div>
</template>

