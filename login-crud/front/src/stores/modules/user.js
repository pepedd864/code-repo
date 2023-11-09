import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref('')
    const userInfo = ref({})
    const logout = () => {
      token.value = ''
      userInfo.value = {}
    }
    return {
      token,
      userInfo,
      logout
    }
  },
  {
    persist: true,
  },
)
