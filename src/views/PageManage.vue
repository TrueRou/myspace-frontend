<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <el-table
              :data="userList"
              :border="true"
              :default-sort="{ prop: 'date', order: 'descending' }"
              style="width: 100%"
          >
            <el-table-column prop="id" label="id" sortable width="180"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="email" label="邮箱" width="180"/>
            <el-table-column prop="is_superuser" label="是否为超级用户"/>
            <el-table-column prop="manage_available" label="管理页面权限"/>
            <el-table-column prop="live_available" label="创建直播权限"/>
            <el-table-column prop="message_available" label="消息权限"/>
            <el-table-column prop="chat_available" label="chatGPT权限"/>
            <el-table-column label="Operations" width="180">
              <template #default="scope">
                <el-button size="middle" @click="handleEdit(scope.row)"
                >修改</el-button
                >
                <el-button
                    size="middle"
                    type="danger"
                    @click="handleDelete(scope.row)"
                >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import config from '../config'
import { onMounted, ref } from 'vue'
import axios from 'axios';
const userList = ref([])
onMounted(() =>
{
  //getAllUser()
  userList.value =
      [
    {
      "id": "182bb374-a9ea-4c05-baba-817a84a19abb",
      "email": "chenbohan911@163.com",
      "is_active": true,
      "is_superuser": true,
      "is_verified": false,
      "username": "兔肉",
      "manage_available": true,
      "live_available": true,
      "message_available": true,
      "chat_available": true
    },
    {
      "id": "c43ee2d4-8fab-4c75-994c-b54f2f69db6e",
      "email": "osutimemail@gmail.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "DAY",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "9910b1ae-9eee-456d-b053-1a43e32cf4e1",
      "email": "631774772@qq.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "cocoachino",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "aaec9ecb-4fa9-45d5-90ae-3494612542d4",
      "email": "314663157@qq.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "rukaru",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "c10243ea-150e-41c9-a12b-358a502434eb",
      "email": "842264772@qq.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "EKang",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "457f9ce1-2590-45e5-9046-13736e4a3a90",
      "email": "xiao_ACE@icloud.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "xiaoACE",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "8c726797-76f3-4c1c-a71d-f2db8a192994",
      "email": "3288594311@qq.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "Mapafy",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "2d37bb40-b101-4b5b-b6df-a0173dc45a9a",
      "email": "lasm_gratel@hotmail.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "Lasm_Gratel",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "5e402d9e-21ce-4f32-b67b-7f228c661831",
      "email": "464628192@qq.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "diatance",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    },
    {
      "id": "4c065f13-b7c3-4c48-9b18-54e8bcab0a4b",
      "email": "test@163.com",
      "is_active": true,
      "is_superuser": false,
      "is_verified": false,
      "username": "测试账户",
      "manage_available": false,
      "live_available": false,
      "message_available": false,
      "chat_available": false
    }
  ]
})
const getAllUser = async () =>
{
  const token = localStorage.getItem('token')
  const response = await axios.get(config.API_USER_ALL, { headers: { "Authorization": `Bearer ${token}` } })
  userList.value = response.data
}
const handleEdit = async (object) =>
{
  const token = localStorage.getItem('token')
  const options = { headers: { "Authorization": `Bearer ${token}` } }
  const body = JSON.stringify(object)
  const id = object.id
  await axios.patch(config.API_USER + `/${id}`, body, options)
  await getAllUser()
}
const handleDelete = async (object) =>
{
  const token = localStorage.getItem('token')
  const options = { headers: { "Authorization": `Bearer ${token}` } }
  const id = object.id
  await axios.delete(config.API_USER + `/${id}`, options)
  await getAllUser()
}
</script>
