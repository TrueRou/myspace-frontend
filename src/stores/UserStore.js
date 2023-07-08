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
    }
  }

  return { userInfo, findUser, isLogin }
})