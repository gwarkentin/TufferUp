import { createApp } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia'

import piniaPersist from 'pinia-plugin-persist'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001/';

import NewPostPage from './views/NewPostPage.vue';
import PostPage from './views/PostPage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import CategoryPage from './views/CategoryPage.vue';
import AddCategoryPage from './views/AddCategoryPage.vue';
import AllPostsPage from './views/AllPostsPage.vue';
import UserPage from './views/UserPage.vue'

const routes = [
  { path: '/', name: 'Home', component: AllPostsPage },
  { path: '/post', name: 'Post', component: PostPage },
  { path: '/post/:id', name: 'SpecificPost', component: PostPage },
  { path: '/newpost', name: 'NewPost', component: NewPostPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/posts', name: 'AllPosts', component: AllPostsPage },
  { path: '/category/add', name: 'AddCategory', component: AddCategoryPage },
  { path: '/category/get/:category', name: 'Category', component: CategoryPage },
  { path: '/profile', name: 'Profile', component: UserPage },
  { path: '/user/:id', name: 'UserPage', component: UserPage },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App).use(router).use(pinia).use(VueAxios, axios).mount('#app')
