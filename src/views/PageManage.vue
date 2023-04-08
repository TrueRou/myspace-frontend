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

const title = ref('')
const owner = ref('')
const description = ref('')
const userList = ref([])

onload(()=>{
  getAllUser()
})

const getAllUser = ()=>{
    //getUserList
    let Users = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
  this.userList = Users
}

const handleEdit = (index,row)=>{
  console.log("index",index + " row:",row)
  //row Full Object
  //index: current index
}
const handleDelete = (index,row)=>{
  console.log("index",index + " row:",row)
  //row Full Object
  //index: current index
}

</script>
