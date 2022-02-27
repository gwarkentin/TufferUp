import App from './App.vue'
import PostPage from './components/PostPage.vue'
import PostDetails from './components/PostDetails.vue'
import PostForm from './components/PostForm.vue'

// const PostPageInst = PostPage.createApp({})
const About = { template: '<div>About</div>' }

const routes = [
  //{ path: '/', component: PostPage },
  { path: '/', component: About },
  { path: '/about', component: About },
  { path: '/form', component: PostForm },
  { path: '/post', component: PostDetails },
]

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = Vue.createApp(App)
app.use(router)
app.mount('#app')
