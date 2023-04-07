import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import config from '../config'

export const useUserStore = defineStore('user', () =>
{
  const userInfo = ref({})

  function checkChatGPT()
  {
    const available = userInfo.value['chat_available']
    if (available)
    {
      const token = localStorage.getItem('token')
      axios.get(config.API_CHATGPT_TOKEN, { headers: { "Authorization": `Bearer ${token}` } }).then((response) =>
      {
        localStorage.setItem('secret_token', response.data['token'])
      })
    }
  }

  return { userInfo, checkChatGPT }
})