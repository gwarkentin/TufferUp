<script>
import { useCatCond } from '@/stores/cat_cond'

export default {
  setup() {
    const catcondStore = useCatCond();
    return {
      catcondStore
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
<nav class="navbar navbar-expand-sm navbar-light" style="background-color: #00008B">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ">
      <template v-if="catcondStore">
        <template v-for="cat in catcondStore.categories" :key="cat">
          <li class="nav-item active">
            <router-link :to="'/category/get/' + cat._id" class="nav-link text-white">{{ cat.category }}</router-link>
          </li>
        </template>
      </template>
    </ul>
  </div>
</nav>
</template>

