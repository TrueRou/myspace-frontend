<template>
    <el-row :gutter="20" style="padding: 20px;">
        <el-col :xs="24" :span="18">
            <el-card>
                <template #header>
                    <div style="display: flex; justify-content: space-between;">
                        <el-row>
                            <span class="live-title">{{ title }}</span>
                        </el-row>
                        <div>
                            <el-button type="primary" v-if="canCreateLive" @click="create_live_click">
                                创建直播
                            </el-button>
                            <el-button type="info" v-if="canManage" @click="manage_click">
                                管理用户
                            </el-button>
                            <el-button type="primary" v-if="!withAuth" @click="login_click">
                                登录
                            </el-button>
                            <el-button type="info" v-if="!withAuth" @click="register_click">
                                注册
                            </el-button>
                        </div>
                    </div>
                </template>
                <div>
                    <video style="object-fit: cover; width: 100%; height: 100%;" muted controls id="videoElement"></video>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :span="6" style="display: flex;">
            <el-container style="flex-direction: column; display: flex;">
                <el-card shadow="always" style="display: flex; height: 200px; flex-direction: column;"
                    :body-style="{ padding: '20px' }">
                    <template #header>
                        <span class="live-right-subtitle">观看用户</span>
                    </template>
                    <div style="overflow-y: auto; min-height: 20px">
                        <div style="display: inline-block" class="panel-block">
                            <el-tag v-for="item in online_users" type="success">
                                {{ item.username }}
                            </el-tag>
                            <el-tag v-for="index of notLoggedUserCount" type="warning">
                                未登录用户
                            </el-tag>
                        </div>
                    </div>
                </el-card>
                <div style="height: 10px;"></div>
                <el-card style="display: flex; flex: 1; flex-direction: column;" shadow="always"
                    :body-style="{ padding: '20px', display: 'flex', flex: '1', flexDirection: 'column' }">
                    <template #header>
                        <span class="live-right-subtitle">聊天室</span>
                    </template>
                    <div style="display: flex; flex-direction: column; justify-content: space-between; flex:1;">
                        <div style="display: flex;">
                            <div style="height: 100%" class="panel-block" v-for="item in messages">
                                <p style="word-break: break-word;">
                                    {{ item['username'] }}: {{ item['message'] }}
                                </p>
                            </div>
                        </div>
                        <div style="display: flex;">
                            <el-input v-if="withAuth" v-model="inputMessage" @keyup.enter="sendData"
                                placeholder="发送一条信息来参与聊天" />
                            <el-input v-if="!withAuth" disabled placeholder="登录后才能参与聊天" />
                        </div>
                    </div>
                </el-card>
            </el-container>
        </el-col>
    </el-row>
</template>
  
<script>
import config from '../config'
import mpegts from 'mpegts.js'
import { useUserStore } from '../stores/UserStore';
import Hls from 'hls.js'

export default {
    name: 'PageLive',
    computed: {
        withAuth()
        {
            return localStorage.getItem('token') != null
        },
        canCreateLive()
        {
            return useUserStore().userInfo['live_available']
        },
        canManage()
        {
            return useUserStore().userInfo['manage_available']
        }
    },
    data()
    {
        return {
            inputMessage: '',
            notLoggedUserCount: 0,
            title: '',
            beginningTime: '',
            description: '',
            owner: '',
            liveLink: '',
            online_users: [],
            messages: []
        }
    },
    methods: {
        create_live_click()
        {
            this.$router.push('/create_live')
        },
        login_click()
        {
            this.$router.push('/login')
        },
        register_click()
        {
            this.$router.push('/register')
        },
        manage_click()
        {
            this.$router.push('/manage')
        },
        async fetchLiveLink()
        {
            var token = localStorage.getItem('token')
            const response = await this.axios.get(config.API_LIVE_LINK, { headers: { "Authorization": `Bearer ${token}` } })
            this.liveLink = response.data.link
        },
        refreshData()
        {
            var token = localStorage.getItem('token')
            var settings = this.withAuth ? { headers: { "Authorization": `Bearer ${token}` } } : {}
            this.axios.get(config.API_LIVE_STATUS, settings).then((response) =>
            {
                if (!response.data['online'] && this.withAuth)
                {
                    localStorage.removeItem('token')
                    location.reload()
                }
                this.title = response.data['title']
                this.beginningTime = response.data['beginning_time']
                this.online_users = response.data['online_users']
                this.owner = response.data['owner']
                this.description = response.data['description']
                this.messages = response.data['messages']
                this.notLoggedUserCount = response.data['not_logged_user_count']
            })
        },
        sendData()
        {
            if (this.withAuth)
            {
                var token = localStorage.getItem('token')
                this.axios.post(config.API_LIVE_MESSAGE + '?message=' + this.inputMessage, {},
                    { headers: { "Authorization": `Bearer ${token}` } }).then((response) =>
                    {
                        this.inputMessage = ''
                        this.refreshData()
                    })
            }
        },
        getFormatedTime()
        {
            var date = new Date((new Date(this.beginningTime).getTime()) + 8 * 60 * 60 * 1000).toJSON();
            var timeft = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            return timeft
        }
    },
    async mounted()
    {
        this.refreshData()
        await this.fetchLiveLink()
        setInterval(() =>
        {
            this.refreshData()
        }, 2000);
        const videoElement = document.getElementById('videoElement');

        if (Hls.isSupported())
        {
            var hls = new Hls({
                "enableWorker": true,
                "lowLatencyMode": false,
                "backBufferLength": 90
            })
            hls.loadSource(this.liveLink)
            hls.attachMedia(videoElement)
            hls.on(Hls.Events.MANIFEST_PARSED, function ()
            {
                videoElement.play();
            });
        }
    }
};
</script>
  
<style>
@media screen and (min-width: 735px) {
    #videoElement {
        height: 700px;
    }
}

.live-title {
    font-size: var(--el-font-size-extra-large);
}

.live-right-subtitle {
    font-size: var(--el-font-size-large);
}
</style>