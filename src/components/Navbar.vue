<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="navbar-container">
      <div class="logo" @click="navigate('home')" tabindex="0">
        <h1>新春祝福</h1>
        <div class="year">2026年</div>
      </div>
      
      <!-- 深色模式切换按钮 -->
      <button 
        class="theme-toggle" 
        @click="toggleTheme"
        @touchstart="onButtonTouchStart"
        @touchend="onButtonTouchEnd"
        aria-label="切换深色模式"
        :aria-pressed="isDarkMode"
        :class="{ 'button-active': isThemeToggleActive }"
      >
        <svg v-if="isDarkMode" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8.69V4H15.31L12 7.31 8.69 4H4V8.69L7.31 12 4 15.31V20H8.69L12 16.69 15.31 20H20V15.31L16.69 12 20 8.69Z" fill="currentColor"/>
        </svg>
      </button>
      
      <!-- 移动设备菜单按钮 -->
      <button 
        class="menu-toggle" 
        @click="toggleMenu"
        @touchstart="onButtonTouchStart"
        @touchend="onButtonTouchEnd"
        aria-label="切换导航菜单"
        :aria-expanded="isMenuOpen"
        aria-controls="main-nav"
        :class="{ 'menu-open': isMenuOpen, 'button-active': isMenuToggleActive }"
      >
        <span class="menu-icon"></span>
        <span class="menu-icon"></span>
        <span class="menu-icon"></span>
      </button>
      
      <!-- 导航菜单 -->
      <nav 
        id="main-nav"
        class="nav-menu" 
        :class="{ 'menu-open': isMenuOpen }"
        aria-label="主导航"
      >
        <ul>
          <li 
            v-for="(item, index) in navItems" 
            :key="item.id"
            class="nav-item"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <a 
              :href="'#' + item.id"
              @click.prevent="navigate(item.id)"
              @touchstart="onButtonTouchStart"
              @touchend="onButtonTouchEnd"
              :class="{ active: activeSection === item.id }"
              :aria-current="activeSection === item.id ? 'page' : 'false'"
              class="nav-link"
            >
              <span class="nav-link-text">{{ item.label }}</span>
              <span class="nav-link-indicator"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  activeSection: string
}>()

const emit = defineEmits<{
  (e: 'navigate', section: string): void
}>()

const isMenuOpen = ref(false)
const isDarkMode = ref(false)
const isScrolled = ref(false)
const isMenuToggleActive = ref(false)
const isThemeToggleActive = ref(false)

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'culture', label: '地域文化' },
  { id: 'ar', label: 'AR体验' },
  { id: 'game', label: '互动游玩' },
  { id: 'wishes', label: '祝福系统' }
]

// 切换菜单
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 导航到指定 section
const navigate = (section: string) => {
  emit('navigate', section)
  isMenuOpen.value = false // 导航后关闭菜单
}

// 切换深色模式
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  updateTheme()
}

// 更新主题
const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// 处理触摸开始事件
const onButtonTouchStart = (event: TouchEvent) => {
  const target = event.currentTarget as HTMLElement
  if (target.classList.contains('menu-toggle')) {
    isMenuToggleActive.value = true
  } else if (target.classList.contains('theme-toggle')) {
    isThemeToggleActive.value = true
  }
  // 添加触摸反馈样式
  target.classList.add('touch-active')
}

// 处理触摸结束事件
const onButtonTouchEnd = (event: TouchEvent) => {
  const target = event.currentTarget as HTMLElement
  if (target.classList.contains('menu-toggle')) {
    setTimeout(() => {
      isMenuToggleActive.value = false
    }, 200)
  } else if (target.classList.contains('theme-toggle')) {
    setTimeout(() => {
      isThemeToggleActive.value = false
    }, 200)
  }
  // 移除触摸反馈样式
  setTimeout(() => {
    target.classList.remove('touch-active')
  }, 200)
}

// 处理滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 初始化主题和滚动监听
onMounted(() => {
  // 从 localStorage 读取主题偏好
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  } else {
    // 检测系统主题偏好
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateTheme()
  
  // 添加滚动监听
  window.addEventListener('scroll', handleScroll)
  
  // 初始化滚动状态
  handleScroll()
})

// 清理事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style scoped>
.navbar {
  background-color: var(--primary-color);
  color: var(--text-inverse);
  padding: 1rem 0;
  position: relative;
  z-index: 100;
  box-shadow: 0 2px 10px var(--shadow-dark);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease, transform 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 导航栏滚动效果 */
.navbar.navbar-scrolled {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 0.8rem 0;
  background-color: rgba(196, 30, 58, 0.95);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  transition: all 0.3s ease;
}

/* Logo 样式 */
.logo {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  user-select: none;
}

.logo:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.1);
}

.logo:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.logo h1 {
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  font-family: var(--font-serif);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: var(--leading-tight);
  transition: all 0.3s ease;
}

.logo .year {
  font-size: var(--text-sm);
  color: var(--secondary-color);
  margin-top: 0.2rem;
  font-weight: var(--font-medium);
  transition: all 0.3s ease;
}

/* 菜单按钮样式 */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  z-index: 110;
  transition: all 0.3s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.menu-toggle:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.menu-toggle.touch-active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.95);
}

/* 主题切换按钮样式 */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: var(--text-inverse);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;
  font-size: var(--text-lg);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.theme-toggle:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.theme-toggle:active {
  transform: scale(0.95);
  transition: transform 0.1s ease;
}

.theme-toggle.touch-active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.95);
}

/* 导航菜单样式 */
.nav-menu {
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

/* 导航项样式 */
.nav-item {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(-20px);
}

/* 导航链接样式 */
.nav-link {
  display: block;
  color: var(--text-inverse);
  text-decoration: none;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all 0.3s ease;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--secondary-color);
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover .nav-link-indicator {
  transform: scaleX(1);
}

.nav-link.active {
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.nav-link.active .nav-link-indicator {
  transform: scaleX(1);
  background-color: var(--primary-dark);
}

.nav-link:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.nav-link:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

.nav-link.touch-active {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

/* 导航链接文本 */
.nav-link-text {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

/* 导航链接指示器 */
.nav-link-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--secondary-color);
  transform: scaleX(0);
  transition: transform 0.3s ease, background-color 0.3s ease;
  border-radius: 3px;
}

.menu-icon {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-inverse);
  border-radius: 1px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

/* 移动设备响应式设计 */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--primary-color);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease, opacity 0.4s ease;
    opacity: 0;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .nav-menu.menu-open {
    max-height: 400px;
    padding: 1.5rem 0;
    opacity: 1;
  }
  
  .nav-menu ul {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
  }
  
  .nav-link {
    width: 90%;
    text-align: center;
    padding: 1rem;
  }
  
  .navbar-container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .logo h1 {
    font-size: var(--text-xl);
  }
  
  .theme-toggle {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
  }
  
  .menu-toggle {
    width: 32px;
    height: 32px;
  }
  
  .nav-link {
    padding: 0.9rem;
    font-size: var(--text-sm);
  }
}

/* 动画效果 */
.menu-toggle.menu-open {
  transform: rotate(90deg);
  background: rgba(255, 255, 255, 0.15);
}

.menu-toggle.menu-open .menu-icon:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background-color: var(--secondary-color);
}

.menu-toggle.menu-open .menu-icon:nth-child(2) {
  opacity: 0;
}

.menu-toggle.menu-open .menu-icon:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
  background-color: var(--secondary-color);
}

/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-20px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* 按钮点击波纹效果 */
.button-active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  animation: ripple 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple {
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .nav-link {
    min-height: 48px;
    padding: 0.9rem 1.2rem;
  }
  
  .theme-toggle {
    width: 48px;
    height: 48px;
  }
  
  .menu-toggle {
    width: 40px;
    height: 40px;
  }
  
  .nav-link:hover {
    transform: none;
    box-shadow: none;
  }
  
  .nav-link:active {
    transform: scale(0.95);
  }
  
  .theme-toggle:hover {
    transform: none;
  }
  
  .theme-toggle:active {
    transform: scale(0.9);
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  .navbar,
  .navbar-container,
  .logo,
  .nav-link,
  .theme-toggle,
  .menu-toggle,
  .menu-icon,
  .nav-item {
    transition: none;
    animation: none;
  }
  
  .menu-toggle.menu-open {
    transform: none;
  }
  
  .menu-toggle.menu-open .menu-icon:nth-child(1) {
    transform: none;
  }
  
  .menu-toggle.menu-open .menu-icon:nth-child(3) {
    transform: none;
  }
}
</style>