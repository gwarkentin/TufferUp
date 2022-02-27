<script setup>
import MainNav from './components/MainNav.vue'
import CategoryNav from './components/CategoryNav.vue'

</script>
<template>
  <MainNav />
  <CategoryNav />
  <div class="container">
    <router-view></router-view>
  </div>
</template>