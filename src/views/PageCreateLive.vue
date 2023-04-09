<template>
  <!--    <div class="login-section login-card">-->
  <!--        <el-form label-position="top" label-width="100px" :rules="rules" status-icon>-->
  <!--            <el-form-item label="直播标题" prop="title">-->
  <!--                <el-input type="text" v-model="title"></el-input>-->
  <!--            </el-form-item>-->
  <!--            <el-form-item label="直播简介" prop="description">-->
  <!--                <el-input type="text" v-model="description"></el-input>-->
  <!--            </el-form-item>-->
  <!--            <el-form-item>-->
  <!--                <el-button style="width: 100%" type="primary" @click="submitForm()">创建</el-button>-->
  <!--            </el-form-item>-->
  <!--        </el-form>-->
  <!--    </div>-->
  <div class="body bg">
    <el-form class="live-form" label-position="top" label-width="100px" :rules="rules" :model="formContent" status-icon
             ref="liveForm">
      <el-form-item class="form-item" label="直播标题" prop="title">
        <el-input class="input-box" type="text" v-model="formContent.title"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="直播简介" prop="description">
        <el-input class="input-box" type="password" v-model="formContent.description"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="直播流" prop="rtmpLink">
        <el-select v-model="formContent.rtmpLink" filterable placeholder="直播流选择">
          <el-option
              v-for="item in rtmpOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitForm()">创建</el-button>
      </el-form-item>
      <el-tag v-if="error" class="ml-2" type="danger">创建直播失败</el-tag>
    </el-form>
  </div>
</template>
<script setup>
import config from '../config'
import {useUserStore} from '../stores/UserStore';
import {onMounted, ref} from "vue";
import axios from "axios";

const userStore = useUserStore()
let error = ref(false)
const rules = {
  title: [{required: true, message: '请填写邮箱', trigger: 'blur'},],
  description: [{required: false, trigger: 'blur'},],
  rtmpLink: [{required: true, message: '请填写直播流', trigger: 'blur'},]
}
let rtmpOptions = ref([])
const formContent = ref({ title: '', description: '' ,rtmpLink:''})

const liveForm = ref()

const submitForm = () => {
  //TODO createLive
  //param title description rtmpLink
  const owner = userStore.userInfo['username']
  axios.post(config.API_LIVE_CREATE + '?title=' + this.title + '&description=' + this.description + '&owner=' + owner).then((response) => {
    this.$router.push('/')
  })
}

const getLiveLinks = ()=>{
  //TODO getAllLinks
  rtmpOptions.value = [
      {label:'rtmpServer(BillBill)',value:"rtmp://live-push.bilivideo.com/live-bvc/"},
    {label:'rtmpServer2(BillBill)',value:"rtmp://live-push.bilivideo.com/live-bvc/2"},
    {label:'rtmpServer3(BillBill)',value:"rtmp://live-push.bilivideo.com/live-bvc/3"}
  ]
}

onMounted(() => {
  getLiveLinks();
})
</script>
<style>
.live-form {
  background: rgb(0, 0, 0, 0.5);
  opacity: 1;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.form-item .el-form-item__label {
  color: white;
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

.input-box .el-input__wrapper {
  background: transparent;
  width: 250px;
  border: gray;
}

.input-box .el-input__inner {
  color: white;
}
.el-select .el-input__wrapper {
  background: transparent;
  width: 250px;
  border: gray;
}

.el-select  .el-input__inner {
  color: white;
}
.el-select .el-select-dropdown__wrap{
  background: transparent;
}
</style>
