import './style.css'
import { createApp } from 'vue'
// 引入andv icon
import * as Icons from '@ant-design/icons-vue'
import Icon from '@/components/Icon/Icon.vue'
import router from './router'
import App from './App.vue'
import pinia from '@/stores/index.js'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component(Icon)
// 注册全局图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

app.mount('#app')
