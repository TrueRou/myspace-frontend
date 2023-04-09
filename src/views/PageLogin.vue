<template>
  <div class="bg">
    <div class="body">
      <div class="login-form">
        <el-form label-position="top" label-width="100px" class="demo-ruleForm" :rules="rules" :model="formContent"
          status-icon ref="loginForm">
          <el-form-item prop="email">
            <div class="inputBox">
              <input type="text" v-model="formContent.email" required="required">
              <span>邮箱</span>
              <i></i>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="inputBox">
              <input type="text" v-model="formContent.password" required="required">
              <span>密码</span>
              <i></i>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submitForm()">登录</el-button>
          </el-form-item>
          <el-tag v-if="error" class="ml-2" type="danger">登录失败, 可能是邮箱或密码错误</el-tag>
        </el-form>
      </div>
    </div>
  </div>
  <!--  <div style="background-color: white;" class="login-section login-card">-->
  <!--    <el-form label-position="top" label-width="100px" class="demo-ruleForm" :rules="rules" :model="rulesForm"-->
  <!--             status-icon ref="ruleForm">-->
  <!--      <el-form-item label="邮箱" prop="email">-->
  <!--        <el-input type="text" v-model="rulesForm.email"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item label="密码" prop="password">-->
  <!--        <el-input type="password" v-model="rulesForm.password"></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item>-->
  <!--        <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
  <!--      </el-form-item>-->
  <!--      <el-tag v-if="error" class="ml-2" type="danger">登录失败, 可能是邮箱或密码错误</el-tag>-->
  <!--    </el-form>-->
  <!--  </div>-->
</template>
<script setup>
import config from '../config'
import Qs from 'qs';
import { useUserStore } from '../stores/UserStore';
import axios from 'axios';
import { ref } from "vue";

const userStore = useUserStore()
const loginForm = ref()
const formContent = ref({ email: '', password: '' })

const rules = {
  email: [{ required: true, message: '请填写邮箱', trigger: 'blur' },],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }, {
    min: 5,
    max: 12,
    message: '密码的长度范围为5-12',
    trigger: 'blur'
  }]
}
let error = ref(false)


const submitForm = async () =>
{
  var params = Qs.stringify({
    'username': formContent.value.email,
    'password': formContent.value.password
  })
  loginForm.value.validate(async (valid) =>
  {
    if (valid)
    {
      try
      {
        const response = await axios.post(config.API_USER_LOGIN, params)
        localStorage.setItem('token', response.data['access_token']);
        await userStore.findUser()
        location.href = '/'
      } catch (e)
      {
        console.log(e.response.data.error)
        error = true
      }
    }
  });
}
</script>
<style>
.login-form {
  background: rgb(0, 0, 0, 0.5);
  opacity: 1;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.bg {
  background-size: cover;
  /*也许之后会改成随机url？*/
  background-image: url(https://img.paulzzh.tech/touhou/random);
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 30px;
}

.inputBox {
  position: relative;
  width: 250px;
  margin-bottom: 20px;
}

.inputBox input {
  width: 100%;
  background: transparent;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 1em;
  letter-spacing: 0.1em;
  padding: 10px 0 5px;
}

.inputBox span {
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  pointer-events: none;
  letter-spacing: 0.1em;
  transition: 0.5s;
  font-size: 1.4em;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
  color: #2196f3;
  transform: translateY(-16px);
  font-size: 1em;
}

.inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #fff;
  overflow: hidden;
}

.inputBox i::before {
  content: '';
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ff1b69, #ff0, #2196f3, #9c27b0, #ff1b69);
  animation: animate 2s linear infinite;
  transition: 0.5s;
}

.inputBox input:valid~i::before,
.inputBox input:focus~i::before {
  left: 0;
}

@keyframes animate {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: 250px;
  }
}
</style>


