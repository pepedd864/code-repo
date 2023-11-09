import '@/styles/style.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persist)
app.use(pinia)
app.mount('#app')
