import { createApp } from 'vue';
import { createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia'

import piniaPersist from 'pinia-plugin-persist'

axios.defaults.withCredentials = true;

import NewPostPage from './views/NewPostPage.vue';
import PostPageView from './views/PostPageView.vue';
import LoginPage from './components/LoginPage.vue';
import NewPostDone from './components/NewPostDone.vue';
import RegisterPage from './components/RegisterPage.vue';
import CategoryPage from './views/CategoryPage.vue';
import AddCategoryPage from './views/AddCategoryPage.vue';
import HomePage from './components/HomePage.vue';
import AllPostsPage from './views/AllPostsPage.vue';
import UserPage from './views/UserPage.vue'


// add your imports and routes here to provide urls for your frontend pages
// see server/index.js for backend routing for our api, very similar concept

//  :id is a variable/paramater as seen in PostPage.vue's tryAjax() and <p> element
// see vuerouter docs for more on url children and nested views
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/post', name: 'Post', component: PostPageView },
  { path: '/post/:id', name: 'SpecificPost', component: PostPageView },
  { path: '/newpost', name: 'NewPost', component: NewPostPage },
  { path: '/newpost/done', name: 'PostDone', component: NewPostDone },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/category', name: 'AllCategory', component: AllPostsPage},
  { path: '/posts', name: 'AllPosts', component: AllPostsPage },
  { path: '/category/add', name: 'AddCategory', component: AddCategoryPage },
  { path: '/category/:category', name: 'Category', component: CategoryPage },
  { path: '/homepage', name: 'HomePage', component: HomePage },
  { path: '/profile', name: 'UserPage', component: UserPage },
]


const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App).use(router).use(pinia).use(VueAxios, axios).mount('#app')
