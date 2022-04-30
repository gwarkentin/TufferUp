import { createApp } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import axios from './http'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'

import piniaPersist from 'pinia-plugin-persist'

import NewPostPage from './views/NewPostPage.vue';
import PostPage from './views/PostPage.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import CategoryPage from './views/CategoryPage.vue';
import AddCategoryPage from './views/AddCategoryPage.vue';
import AllPostsPage from './views/AllPostsPage.vue';
import SearchPostsPage from './views/SearchPostsPage.vue';
import UserPage from './views/UserPage.vue'
import UserOwnPage from './views/UserOwnPage.vue'

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
  { path: '/search/:keywords+', name: 'Search', component: SearchPostsPage },
  { path: '/profile', name: 'Profile', component: UserOwnPage },
  { path: '/user/:id', name: 'UserPage', component: UserPage },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const pinia = createPinia()
pinia.use(piniaPersist)
import {firebaseMessaging} from './firebase'

const app = createApp(App)
app.provide('$firebasemessaging', firebaseMessaging)
app.use(router).use(VueAxios, axios).use(pinia)

app.mount('#app')
