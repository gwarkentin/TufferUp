<script>
import { useCatCond } from '@/stores/cat_cond'
import { useUser } from '@/stores/user'
import MainNav from './components/MainNav.vue'
import CategoryNav from './components/CategoryNav.vue'
import Messaging from './components/Messaging.vue';

export default {
  setup() {
    const catcondStore = useCatCond();
    catcondStore.getCategoryList();
    catcondStore.getConditionList();
    const userStore = useUser();
    return {
      catcondStore,
      userStore
    }
  },
  components: {
    MainNav,
    CategoryNav,
    Messaging
  }
}
</script>

<template>
  <MainNav />
  <CategoryNav />
  <div class="container">
    <router-view></router-view>
  </div>
  <Messaging v-if="userStore.user" />
</template>