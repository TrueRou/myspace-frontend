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
  getAllUser()
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
