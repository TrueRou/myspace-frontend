<template>
  <div>
    <div class="nav">
      <el-menu :router="true" id="nav-menu" default-active="1" mode="horizontal">
        <el-menu-item route="/" index="1">直播</el-menu-item>
        <el-menu-item route="/message" v-if="authorized && userStore['message_available']" index="3">短信</el-menu-item>
        <el-menu-item route="/chatgpt" v-if="authorized && userStore['chat_available']" index="3">ChatGPT</el-menu-item>
      </el-menu>
      <div class="nav-user-login">
        <el-button type="primary" v-if="!authorized" @click="login_click">
          登录
        </el-button>
        <el-button type="primary" v-if="!authorized" @click="register_click">
          注册
        </el-button>
        <el-button type="primary" v-if="authorized && userStore['live_available']" @click="create_live_click">
          直播
        </el-button>
        <el-button type="info" v-if="authorized" @click="logout_click">
          登出
        </el-button>
        <template v-if="authorized"> </template>
      </div>
    </div>
    <el-divider :style="{ marginTop: 0 }" />
  </div>
</template>

<script>
import { useUserStore } from '../stores/UserStore';
const userStore = useUserStore()

export default {
  name: 'TheNavBar',
  computed: {
    authorized()
    {
      return localStorage.getItem('token') != null;
    },
  },
  methods: {
    login_click()
    {
      this.$router.push('/login')
    },
    register_click()
    {
      this.$router.push('/register')
    },
    logout_click()
    {
      localStorage.removeItem('token')
      userStore.userInfo = {}
      location.href = '/'
    },
    create_live_click()
    {
      this.$router.push('/create_live')
    },
  },
};
</script>

<style scoped>
.nav {
  align-items: center;
  border-bottom: unset;
  justify-content: space-between;
  display: flex;
}

#nav-menu {
  border-bottom: unset;
  flex: 1;
}

.nav-user-login {
  margin-right: 20px;
}
</style>