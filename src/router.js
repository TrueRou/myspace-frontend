import { createRouter, createWebHashHistory } from 'vue-router'
import PageLive from "./views/PageLive.vue"
import PageLogin from "./views/PageLogin.vue"
import PageRegister from "./views/PageRegister.vue"
import PageMessage from "./views/PageMessage.vue"
import PageCreateLive from "./views/PageCreateLive.vue"

const routes = [
  { path: '/', component: PageLive },
  { path: '/login', component: PageLogin },
  { path: '/register', component: PageRegister },
  { path: '/message', component: PageMessage },
  { path: '/create_live', component: PageCreateLive },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const isLogin = !!token;

  if (to.path == '/message' && !isLogin) {
    next("/login");
  }
  next()
})

export default router