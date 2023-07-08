<template>
    <div class="body bg">
        <el-form class="live-form" label-position="top" label-width="100px" :rules="rules" :model="formContent" status-icon>
            <el-form-item class="form-item" label="直播标题" prop="title">
                <el-input class="input-box" type="text" v-model="formContent.title"></el-input>
            </el-form-item>
            <el-form-item class="form-item" label="直播简介" prop="description">
                <el-input class="input-box" type="text" v-model="formContent.description"></el-input>
            </el-form-item>
            <el-form-item class="form-item" label="直播流地址" prop="link">
                <el-select v-model="formContent.link" filterable allow-create clearable>
                    <el-option v-for="item in linkOptions" :key="item.link" :label="item.label" :value="item.link" />
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
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import axios from "axios";

let error = ref(false)
const rules = {
    title: [{ required: true, message: '请填写标题', trigger: 'blur' },],
    description: [{ required: false, trigger: 'blur' },],
    liveLink: [{ required: true, message: '直播流地址', trigger: 'blur' },]
}
const formContent = ref({ title: '', description: '', link: '' })
const linkOptions = ref([])

const router = useRouter()

const submitForm = async () =>
{
    var params = {
        'title': formContent.value.title,
        'description': formContent.value.description,
        'link': formContent.value.link
    }
    const token = localStorage.getItem('token')
    await axios.post(config.API_LIVE_CREATE, params, { headers: { "Authorization": `Bearer ${token}` } })
    router.push('/')
}

const getLiveLinks = async () =>
{
    const token = localStorage.getItem('token')
    const response = await axios.get(config.API_LIVE_LINKS, { headers: { "Authorization": `Bearer ${token}` } })
    linkOptions.value = response.data.links

    if (linkOptions.value.length > 0)
    {
        formContent.value.link = linkOptions.value[0].link
    }
}

onMounted(() =>
{
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
    background-image: url(https://api.likepoems.com/img/pc);
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

.el-select .el-input__inner {
    color: white;
}

.el-select .el-select-dropdown__wrap {
    background: transparent;
}
</style>
