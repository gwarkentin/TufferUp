import { createApp } from 'vue'
import { createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'

import PostPage from './views/PostPage.vue'
import PostPageView from './views/PostPageView.vue'
import PostDetails from './components/PostDetails.vue'
import PostForm from './components/PostForm.vue'
import LoginPage from './components/LoginPage.vue'

const routes = [
  //{ path: '/', component: PostPage },
  { path: '/', name: 'Home', component: PostPageView },
  { path: '/post/:id', name: 'APost', component: PostPageView },
  { path: '/post', name: 'Post', component: PostPage },
  { path: '/login', name: 'Login', component: LoginPage },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
