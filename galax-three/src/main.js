import {createApp} from 'vue'
import '@/styles/base.scss'
import App from '@/App1.vue'
import {FcArrowBtn, FcTypingInput} from 'fancy-components'
import {useLoading} from '@/utils/utils' // 监听资源加载

// 监听资源加载
document.addEventListener('loadstart', (e) => {
  useLoading(true)
})
document.addEventListener('loadend', (e) => {
  useLoading(false)
})

new FcTypingInput()
new FcArrowBtn()

createApp(App).mount('#app')
