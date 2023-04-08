<template>
    <div>
      <el-table
          :data="userList"
          :default-sort="{ prop: 'date', order: 'descending' }"
          style="width: 100%"
      >
        <el-table-column prop="date" label="Date" sortable width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address"/>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script setup>
import config from '../config'
import {ref} from 'vue'

const userList = ref([])

onload(()=>{
  getAllUser()
})

const getAllUser = async ()=>{
  const token = localStorage.getItem('token')
  const response = await this.axios.get(config.API_USER_ALL, { headers: { "Authorization": `Bearer ${token}` } })
  this.userList = response.data
}

const handleEdit = async (object)=>{
  const token = localStorage.getItem('token')
  const options = { headers: { "Authorization": `Bearer ${token}` } }
  const body = JSON.stringify(object)
  const id = object.id
  await this.axios.patch(config.API_USER + `/${id}`, body, options)
}
const handleDelete = async (object)=>{
  const token = localStorage.getItem('token')
  const options = { headers: { "Authorization": `Bearer ${token}` } }
  const id = object.id
  await this.axios.delete(config.API_USER + `/${id}`, body, options)
}

</script>
