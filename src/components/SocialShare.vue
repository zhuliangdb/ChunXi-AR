<template>
  <div class="social-share">
    <h4 class="share-title">分享祝福</h4>
    <div class="share-buttons">
      <!-- 微信分享 -->
      <button 
        class="share-button wechat"
        @click="shareToWechat"
        aria-label="分享到微信"
        title="分享到微信"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.5 15.5C9.5 14.12 10.62 13 12 13C13.38 13 14.5 14.12 14.5 15.5C14.5 16.88 13.38 18 12 18C10.62 18 9.5 16.88 9.5 15.5ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
        </svg>
        <span>微信</span>
      </button>
      
      <!-- 微博分享 -->
      <button 
        class="share-button weibo"
        @click="shareToWeibo"
        aria-label="分享到微博"
        title="分享到微博"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 15.5C15.5 14.12 14.38 13 13 13H11C9.62 13 8.5 14.12 8.5 15.5C8.5 16.88 9.62 18 11 18H13C14.38 18 15.5 16.88 15.5 15.5ZM12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12Z" fill="currentColor"/>
        </svg>
        <span>微博</span>
      </button>
      
      <!-- QQ分享 -->
      <button 
        class="share-button qq"
        @click="shareToQQ"
        aria-label="分享到QQ"
        title="分享到QQ"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.5 15.5C9.5 14.12 10.62 13 12 13C13.38 13 14.5 14.12 14.5 15.5C14.5 16.88 13.38 18 12 18C10.62 18 9.5 16.88 9.5 15.5ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
        </svg>
        <span>QQ</span>
      </button>
      
      <!-- 复制链接 -->
      <button 
        class="share-button copy"
        @click="copyLink"
        aria-label="复制链接"
        title="复制链接"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
        </svg>
        <span>{{ copySuccess ? '已复制' : '复制' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copySuccess = ref(false)

// 生成分享链接
const getShareUrl = () => {
  return window.location.origin + window.location.pathname
}

// 生成分享标题
const getShareTitle = () => {
  return '2026年新春祝福 - 体验浓厚的中国传统春节氛围'
}

// 生成分享内容
const getShareContent = () => {
  return '快来体验2026年新春祝福网站，感受安徽和河南的特色春节文化，探索黄山等著名景点的AR展示，参与互动游玩，留下新年祝福！'
}

// 分享到微信
const shareToWechat = () => {
  // 微信分享需要特殊处理，这里显示提示
  alert('请打开微信，扫描二维码或搜索公众号分享此页面')
}

// 分享到微博
const shareToWeibo = () => {
  const url = getShareUrl()
  const title = getShareTitle()
  const content = getShareContent()
  const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`
  window.open(weiboUrl, '_blank', 'width=600,height=400')
}

// 分享到QQ
const shareToQQ = () => {
  const url = getShareUrl()
  const title = getShareTitle()
  const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  window.open(qqUrl, '_blank', 'width=600,height=400')
}

// 复制链接
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(getShareUrl())
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    alert('复制失败，请手动复制链接')
  }
}
</script>

<style scoped>
.social-share {
  margin: 2rem 0;
  text-align: center;
}

.share-title {
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.share-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  color: var(--text-primary);
}

.share-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px var(--shadow-color);
  border-color: var(--primary-color);
}

.share-button svg {
  margin-bottom: 0.5rem;
}

.share-button span {
  font-size: 0.8rem;
}

/* 平台特定颜色 */
.share-button.wechat:hover {
  color: #07C160;
}

.share-button.weibo:hover {
  color: #E6162D;
}

.share-button.qq:hover {
  color: #12B7F5;
}

.share-button.copy:hover {
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .share-buttons {
    gap: 0.8rem;
  }
  
  .share-button {
    width: 70px;
    height: 70px;
  }
  
  .share-button span {
    font-size: 0.7rem;
  }
}
</style>