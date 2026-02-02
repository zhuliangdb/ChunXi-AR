<template>
  <div id="app" class="new-year-surprise" aria-label="新春祝福网站">
    <!-- 背景装饰 -->
    <BackgroundDecoration aria-hidden="true" />
    
    <!-- 导航栏 -->
    <Navbar :activeSection="activeSection" @navigate="navigate" />
    
    <!-- 主要内容区域 -->
    <main class="main-content container" :aria-labelledby="pageTitleId" tabindex="0">
      <!-- 页面标题 (屏幕阅读器专用) -->
      <h1 :id="pageTitleId" class="sr-only">{{ pageTitle }}</h1>
      
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading-container flex items-center justify-center" aria-live="polite" aria-busy="true">
        <div class="loading-spinner" role="status" aria-label="加载中">
          <div class="spinner" aria-hidden="true"></div>
          <p class="sr-only">加载中...</p>
        </div>
      </div>
      
      <!-- 错误状态 -->
      <div v-else-if="hasError" class="error-container flex items-center justify-center" aria-live="assertive" aria-atomic="true">
        <div class="error-content max-w-md mx-auto" role="alert" aria-labelledby="error-title">
          <div class="error-icon" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 id="error-title">加载失败</h3>
          <p>{{ errorMessage }}</p>
          <button @click="retryLoading" class="btn-primary" aria-label="重试加载">重试</button>
        </div>
      </div>
      
      <!-- 页面内容 -->
      <transition name="page-fade" mode="out-in">
        <!-- 首页 -->
        <Home v-if="activeSection === 'home'" key="home" @navigate="navigate" />
        
        <!-- 地域文化 -->
        <Culture v-else-if="activeSection === 'culture'" key="culture" />
        
        <!-- AR体验 -->
        <AR v-else-if="activeSection === 'ar'" key="ar" />
        
        <!-- 互动游玩 -->
        <Game v-else-if="activeSection === 'game'" key="game" />
        
        <!-- 祝福系统 -->
        <Wishes v-else-if="activeSection === 'wishes'" key="wishes" />
      </transition>
    </main>
    
    <!-- 页脚 -->
    <Footer @navigate="navigate" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { useAppStore } from './stores/app';
import BackgroundDecoration from './components/BackgroundDecoration.vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

// 加载状态
const isLoading = ref(false);
// 错误状态
const hasError = ref(false);
const errorMessage = ref('');

// 页面标题映射
const sectionTitles = {
  home: '首页 - 新春祝福网站',
  culture: '地域文化 - 新春祝福网站',
  ar: 'AR体验 - 新春祝福网站',
  game: '互动游玩 - 新春祝福网站',
  wishes: '祝福系统 - 新春祝福网站'
};

// 计算当前页面标题
const store = useAppStore();
const activeSection = computed(() => store.activeSection);

const pageTitle = computed(() => {
  return sectionTitles[activeSection.value as keyof typeof sectionTitles] || '新春祝福网站';
});

const pageTitleId = computed(() => {
  return `page-title-${activeSection.value}`;
});

// 异步组件加载
const Home = defineAsyncComponent({
  loader: () => import('./views/Home.vue'),
  onError: (error) => {
    console.error('加载Home组件失败:', error);
    hasError.value = true;
    errorMessage.value = '加载首页失败，请重试';
  }
});
const Culture = defineAsyncComponent({
  loader: () => import('./views/Culture.vue'),
  onError: (error) => {
    console.error('加载Culture组件失败:', error);
    hasError.value = true;
    errorMessage.value = '加载地域文化页面失败，请重试';
  }
});
const AR = defineAsyncComponent({
  loader: () => import('./views/AR.vue'),
  onError: (error) => {
    console.error('加载AR组件失败:', error);
    hasError.value = true;
    errorMessage.value = '加载AR体验页面失败，请重试';
  }
});
const Game = defineAsyncComponent({
  loader: () => import('./views/Game.vue'),
  onError: (error) => {
    console.error('加载Game组件失败:', error);
    hasError.value = true;
    errorMessage.value = '加载互动游玩页面失败，请重试';
  }
});
const Wishes = defineAsyncComponent({
  loader: () => import('./views/Wishes.vue'),
  onError: (error) => {
    console.error('加载Wishes组件失败:', error);
    hasError.value = true;
    errorMessage.value = '加载祝福系统页面失败，请重试';
  }
});

const navigate = async (section: string) => {
  // 重置错误状态
  hasError.value = false;
  errorMessage.value = '';
  
  // 显示加载状态
  isLoading.value = true;
  
  try {
    // 切换到目标页面
    store.setActiveSection(section);
    
    // 模拟加载延迟，实际项目中可根据需要调整
    await new Promise(resolve => setTimeout(resolve, 300));
  } catch (error) {
    console.error('导航失败:', error);
    hasError.value = true;
    errorMessage.value = '导航失败，请重试';
  } finally {
    // 隐藏加载状态
    isLoading.value = false;
  }
};

// 重试加载
const retryLoading = () => {
  hasError.value = false;
  errorMessage.value = '';
  // 重新加载当前页面
  navigate(activeSection.value);
};
</script>

<style scoped>
/* 全局样式 */
.new-year-surprise {
  font-family: var(--font-sans);
  background-color: var(--background-color);
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 主要内容 */
.main-content {
  position: relative;
  z-index: 5;
  padding: 2rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 0;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem 0;
  }
}

/* 加载状态样式 */
.loading-container {
  min-height: 60vh;
  width: 100%;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--primary-transparent);
  border-left-color: var(--primary-color);
  border-top-color: var(--secondary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner p {
  color: var(--primary-color);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: var(--leading-snug);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 错误状态样式 */
.error-container {
  min-height: 60vh;
  width: 100%;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  background-color: var(--card-background);
  border-radius: 15px;
  box-shadow: 0 10px 30px var(--shadow-dark);
  text-align: center;
  width: 100%;
  transition: all 0.3s ease;
}

.error-content:hover {
  box-shadow: 0 12px 35px var(--shadow-dark);
  transform: translateY(-2px);
}

.error-icon {
  color: var(--error-color);
  margin-bottom: 0.5rem;
}

.error-content h3 {
  color: var(--error-color);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  margin: 0;
  font-family: var(--font-serif);
}

.error-content p {
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  margin: 0;
}

.error-content .btn-primary {
  margin-top: 0.5rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .error-content {
    padding: 2rem;
    gap: 1.25rem;
  }
  
  .loading-spinner p {
    font-size: var(--text-sm);
  }
  
  .spinner {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .error-content {
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .error-content h3 {
    font-size: var(--text-xl);
  }
  
  .error-content p {
    font-size: var(--text-sm);
  }
  
  .spinner {
    width: 40px;
    height: 40px;
  }
}

/* 按钮样式 */
.btn-primary {
  background-color: var(--primary-color);
  color: var(--text-inverse);
  border: none;
  padding: 0.8rem 1.8rem;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  font-family: var(--font-sans);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px var(--shadow-light);
  position: relative;
  overflow: hidden;
  line-height: var(--leading-snug);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px var(--shadow-dark);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

/* 标题样式 */
.page-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--primary-color);
  font-family: var(--font-serif);
  margin-bottom: 1.5rem;
  text-align: center;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--text-primary);
  font-family: var(--font-serif);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-snug);
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

/* 文本样式 */
.body-text {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.caption-text {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--text-tertiary);
}

/* 响应式排版 */
@media (max-width: 768px) {
  .page-title {
    font-size: var(--text-3xl);
  }
  
  .section-title {
    font-size: var(--text-xl);
  }
  
  .subtitle {
    font-size: var(--text-lg);
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: var(--text-2xl);
  }
  
  .section-title {
    font-size: var(--text-lg);
  }
  
  .subtitle {
    font-size: var(--text-base);
  }
}

/* 页面切换动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.5s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 加载动画增强 */
.loading-spinner {
  animation: fadeIn 0.5s ease-out;
}

.spinner {
  animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(196, 30, 58, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(196, 30, 58, 0);
  }
}

/* 错误状态动画 */
.error-content {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 导航栏和页脚动画 */
.navbar-fade-enter-active,
.navbar-fade-leave-active,
.footer-fade-enter-active,
.footer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.navbar-fade-enter-from,
.navbar-fade-leave-to,
.footer-fade-enter-from,
.footer-fade-leave-to {
  opacity: 0;
}

/* 滚动动画 */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.scroll-reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* 悬停动画 */
.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow-dark);
}

/* 按钮点击动画 */
.btn-primary:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

/* 背景装饰动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式动画调整 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* 可访问性样式 */

/* 屏幕阅读器专用类 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* 键盘导航焦点样式 */
.main-content:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  :root {
    --primary-color: #b31a30;
    --secondary-color: #c2942a;
    --text-primary: #000000;
    --text-secondary: #333333;
    --border-color: rgba(0, 0, 0, 0.3);
  }
  
  :root.dark {
    --primary-color: #f0405c;
    --secondary-color: #f9d541;
    --text-primary: #ffffff;
    --text-secondary: #e0e0e0;
    --border-color: rgba(255, 255, 255, 0.3);
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1;
    transform: translateY(0);
    transition: none;
  }
  
  .hover-lift:hover {
    transform: none;
    box-shadow: none;
  }
  
  .btn-primary:hover {
    transform: none;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .btn-primary {
    min-height: 44px;
    min-width: 100px;
  }
  
  .nav-menu a {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>