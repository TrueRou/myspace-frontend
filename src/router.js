import { createRouter, createWebHashHistory } from 'vue-router'
import PageLive from "./views/PageLive.vue"
import PageLogin from "./views/PageLogin.vue"
import PageRegister from "./views/PageRegister.vue"
import PageMessage from "./views/PageMessage.vue"
import PageCreateLive from "./views/PageCreateLive.vue"
import { useUserStore } from "./stores/UserStore.js"
import config from './config'

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

router.beforeEach(async (to, from, next) =>
{
  const userStore = useUserStore()
  const token = localStorage.getItem('token');
  const isLogin = !!token;

  if (isLogin && userStore.userInfo == {})
  {
    this.axios.get(config.API_USER_ME, { headers: { "Authorization": `Bearer ${token}` } }).then((response) =>
    {
      userStore.userInfo = response.data
    })
    if (userStore.userInfo['chat_available'])
    {
      this.axios.get(config.API_CHATGPT_TOKEN, { headers: { "Authorization": `Bearer ${token}` } }).then((response) =>
      {
        localStorage.setItem('secret_token', response.data['token'])
      })
    }
  }

  if (to.path == '/message' && !isLogin)
  {
    next("/login");
  }
  next()
})

export default router