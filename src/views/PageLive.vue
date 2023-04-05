<template>
    <el-row :gutter="20">
        <el-col :xs="24" :span="18">
            <el-card>
                <template #header>
                    <div style="display: flex; justify-content: space-between;">
                        <el-row>
                            <span class="live-title">{{ title }}</span>
                        </el-row>
                        <el-button type="primary" v-if="!withAuth" @click="login_click">
                            登录
                        </el-button>
                        <el-button type="info" v-if="withAuth" @click="logout_click">
                            登出
                        </el-button>
                    </div>
                </template>
                <div>
                    <video style="width: 100%;" id="videoElement" controls></video>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :span="6">
            <el-card shadow="always" :body-style="{ padding: '20px' }">
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
            <el-card shadow="always" :body-style="{ padding: '20px' }">
                <template #header>
                    <span class="live-right-subtitle">聊天室</span>
                </template>
                <div style="height: 535px">
                    <div class="panel-block" v-for="item in messages">
                        <p style="word-break: break-word;">
                            {{ item['username'] }}: {{ item['message'] }}
                        </p>
                    </div>
                </div>
                <el-input v-if="withAuth" v-model="inputMessage" @keyup.enter="sendData" placeholder="发送一条信息来参与聊天" />
                <el-input v-if="!withAuth" disabled placeholder="登录后才能参与聊天" />
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script>
import config from '../config'

export default {
    name: 'PageLive',
    computed: {
        withAuth()
        {
            return localStorage.getItem('token') != null
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
            online_users: [],
            messages: []
        }
    },
    methods: {
        logout_click()
        {
            localStorage.removeItem('token')
            userStore.userInfo = {}
            location.href = '/'
        },
        login_click()
        {
            this.$router.push('/login')
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
    mounted()
    {
        this.refreshData()
        setInterval(() =>
        {
            this.refreshData()
        }, 2000);
        const player = document.getElementById('videoElement');
        if (flvjs.isSupported())
        {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                hasAudio: true,
                hasVideo: true,
                enableWorker: true,
                enableStashBuffer: false,
                stashInitialSize: 128,
                url: 'wss://content.nogu.dev:8443/live/live.flv',
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
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