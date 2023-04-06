<template>
    <div class="login-section login-card">
        <el-form label-position="top" label-width="100px" :rules="rules" status-icon>
            <el-form-item label="直播标题" prop="title">
                <el-input type="text" v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="直播简介" prop="description">
                <el-input type="text" v-model="description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitForm()">创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import config from '../config'
import { useUserStore } from '../stores/UserStore';

export default {
    data()
    {
        return {
            title: '',
            description: ''
        };
    },
    methods: {
        submitForm()
        {
            const userStore = useUserStore()
            const owner = userStore.userInfo['username']
            this.axios.post(config.API_LIVE_CREATE + '?title=' + this.title + '&description=' + this.description + '&owner=' + owner).then((response) =>
            {
                this.$router.push('/')
            })
        }
    }
}
</script>