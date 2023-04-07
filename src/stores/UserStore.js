import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import config from '../config'

export const useUserStore = defineStore('user', () =>
{
  const userInfo = ref({})

  function isLogin()
  {
    return localStorage.getItem('token') != null
  }

  async function findUser()
  {
    const token = localStorage.getItem('token');
    if (token != null)
    {
      const response = await axios.get(config.API_USER_ME, { headers: { "Authorization": `Bearer ${token}` } })
      this.userInfo = response.data
      await checkChatGPT()
    }
  }

  async function checkChatGPT()
  {
    const token = localStorage.getItem('token')
    const available = userInfo.value['chat_available']
    if (available)
    {
      await axios.get(config.API_CHATGPT_TOKEN, { headers: { "Authorization": `Bearer ${token}` } }).then((response) =>
      {
        localStorage.setItem('secret_token', response.data['token'])
      })
    }
  }

  return { userInfo, checkChatGPT, findUser, isLogin }
})