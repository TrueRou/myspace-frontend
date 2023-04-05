<template>
    <div class="register-section register-card">
        <el-form label-position="top" label-width="100px" class="demo-ruleForm" :rules="rules" :model="rulesForm"
            status-icon ref="ruleForm">
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="rulesForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="rulesForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="rulesForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
            <el-tag v-if="error" class="ml-2" type="danger">注册失败, 可能是已经有相同邮箱的用户了</el-tag>
        </el-form>
    </div>
</template>
<script>
import config from '../config'

export default {
    data()
    {
        return {
            //存储数据的对象
            rulesForm: {
                email: '',
                name: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请填写邮箱', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请填写用户名', trigger: 'blur' },
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
            var params = {
                "email": this.rulesForm.email,
                "password": this.rulesForm.password,
                "is_active": true,
                "is_superuser": false,
                "is_verified": false,
                "username": this.rulesForm.name
            }
            this.$refs[formName].validate((valid) =>
            {
                if (valid)
                {
                    this.axios.post(config.API_USER_REGISTER, params).then((response) =>
                    {
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
.register-section {
    padding: 0px 20px
}

.register-card {
    position: absolute;
    width: 300px;
    height: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}</style>