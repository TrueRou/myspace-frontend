<template>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
            <span>用户信息</span>
        </template>
        <el-descriptions size="large" direction="vertical" :column="3">
            <el-descriptions-item label="UUID">{{user['id']}}</el-descriptions-item>
            <el-descriptions-item label="用户名">{{user['username']}}</el-descriptions-item>
        </el-descriptions>
    </el-card>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
            <span>历史短信</span>
        </template>
        <el-table :data="messages" style="width: 100%">
            <el-table-column label="发送时间" width="180">
                <template #default="scope">
                    <span>{{ getFormatedTime(scope.row.received) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="body" label="信息内容" min-width="200" />
            <el-table-column prop="number" label="发件人" min-width="50" />
        </el-table>
    </el-card>
</template>
<script>
import config from '../config'

export default {
    data() {
        return {
            user: {},
            messages: []
        }
    },
    mounted() {
        var token = localStorage.getItem('token')
        this.axios.get(config.API_TRANSFER_ENTRIES, { headers: { "Authorization": `Bearer ${token}` } }).then((response) => {
            this.user = response.data['user']
            this.messages = response.data['entries']
        })
    },
    methods: {
        getFormatedTime(datetime) {
            var date = new Date((new Date(datetime).getTime()) + 8 * 60 * 60 * 1000).toJSON();
            var timeft = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            return timeft
        }
    }
}
</script>