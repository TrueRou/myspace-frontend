<template>
    <el-row :gutter="20">
        <el-col :xs="24" :span="18">
            <el-card>
                <template #header>
                    <div style="display: flex; justify-content: space-between;">
                        <el-row>
                            <span class="live-title">{{ title }}</span>
                        </el-row>
                        <el-button type="primary" v-if="canCreateLive" @click="create_live_click">
                            创建直播
                        </el-button>
                    </div>
                </template>
                <div>
                    <video style="object-fit: cover; width: 100%; height: 100%;" muted autoplay controls
                        id="videoElement"></video>
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
                <div style="height: 530px;">
                    <div style="height: 100%" class="panel-block" v-for="item in messages">
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
import mpegts from 'mpegts.js'
import { useUserStore } from '../stores/UserStore';

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
        create_live_click()
        {
            this.$router.push('/create_live')
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
        const videoElement = document.getElementById('videoElement');
        if (mpegts.isSupported())
        {
            var player = mpegts.createPlayer({
                type: 'flv',  // could also be mpegts, m2ts, flv
                isLive: true,
                url: 'wss://content.nogu.dev:8443/live/live.flv',
                enableWorker: true, // 启用分离的线程进行转换
                enableStashBuffer: false,
                stashInitialSize: 128,
                liveBufferLatencyChasing: true,
                accurateSeek: true,
            });
            player.attachMediaElement(videoElement);
            player.load();
            player.play();
        }
        videoElement.addEventListener("progress", () =>
        {
            let end = player.buffered.end(0); //获取当前buffered值(缓冲区末尾)
            let delta = end - player.currentTime; //获取buffered与当前播放位置的差值

            // 延迟过大，通过跳帧的方式更新视频
            if (delta > 10 || delta < 0)
            {
                this.player.currentTime = this.player.buffered.end(0) - 1;
                return;
            }

            // 追帧
            if (delta > 1)
            {
                videoElement.playbackRate = 1.1;
            } else
            {
                videoElement.playbackRate = 1;
            }
        });
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