<template>
    <div style="background-color: white;" class="login-section login-card">
        <el-form label-position="top" label-width="100px" class="demo-ruleForm" :rules="rules" :model="rulesForm"
            status-icon ref="ruleForm">
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="rulesForm.email"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="rulesForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
            <el-tag v-if="error" class="ml-2" type="danger">登录失败, 可能是邮箱或密码错误</el-tag>
        </el-form>
    </div>
</template>
<script>
import config from '../config'
import Qs from 'qs';

export default {
    data()
    {
        return {
            error: false,
            rulesForm: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请填写邮箱', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { min: 5, max: 12, message: '密码的长度范围为5-12', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName)
        {
            var params = Qs.stringify({
                'username': this.rulesForm.email,
                'password': this.rulesForm.password
            })

            this.$refs[formName].validate((valid) =>
            {
                if (valid)
                {
                    this.axios.post(config.API_USER_LOGIN, params).then((response) =>
                    {
                        localStorage.setItem('token', response.data['access_token']);
                        location.href = '/'
                    }).catch((response) =>
                    {
                        this.error = true
                    })
                }
            });
        }
    }
}
</script>
   
   
<style>
.login-section {
    padding: 0px 20px
}

.login-card {
    position: absolute;
    width: 300px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}</style>