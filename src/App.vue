<script>
import { useCatCond } from '@/stores/cat_cond'
import MainNav from './components/MainNav.vue'
import CategoryNav from './components/CategoryNav.vue'

export default {
  setup() {
    const catcondStore = useCatCond();
    catcondStore.getCategoryList();
    catcondStore.getConditionList();
    return {
      catcondStore
    }
  },
  components: {
    MainNav,
    CategoryNav
  }
}
</script>

<template>
  <MainNav />
  <CategoryNav />
  <div class="container">
    <router-view></router-view>
  </div>
</template>