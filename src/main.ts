import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { initPreloadStrategy } from './utils/preloadStrategy'
import { useAppStore } from './stores/app'

// 初始化预加载策略
initPreloadStrategy()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// 初始化存储数据
const appStore = useAppStore()
appStore.loadWishesFromLocalStorage()

app.mount('#app')
