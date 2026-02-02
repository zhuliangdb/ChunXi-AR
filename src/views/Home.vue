<template>
  <section class="home-section" aria-labelledby="hero-title">
    <div class="home-container">
      <div class="hero-section">
        <h2 id="hero-title">新春快乐 万事如意</h2>
        <p>欢迎来到2026年新春祝福网站，体验浓厚的中国传统春节氛围</p>
        <div class="hero-buttons">
          <button 
            @click="navigate('culture')" 
            class="btn-primary"
            aria-label="探索地域文化"
          >
            探索地域文化
          </button>
          <button 
            @click="navigate('game')" 
            class="btn-secondary"
            aria-label="互动游玩"
          >
            互动游玩
          </button>
        </div>
      </div>
      
      <div class="features-section" aria-labelledby="features-heading">
        <h3 id="features-heading" class="sr-only">网站特色</h3>
        <div 
          class="feature-card" 
          @click="navigate('culture')"
          tabindex="0"
          role="button"
          aria-label="地域文化 - 体验安徽和河南的特色春节文化"
        >
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>地域文化</h3>
          <p>体验安徽和河南的特色春节文化</p>
        </div>
        <div 
          class="feature-card" 
          @click="navigate('ar')"
          tabindex="0"
          role="button"
          aria-label="AR体验 - 探索黄山等著名景点的增强现实展示"
        >
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 10.9C13.4 10.9 14.5 11.9 14.5 13.3V17H9.5V13.3C9.5 11.9 10.6 10.9 12 10.9ZM12 9.5C10.3 9.5 9 10.8 9 12.5V18H15V12.5C15 10.8 13.7 9.5 12 9.5ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>AR体验</h3>
          <p>探索黄山等著名景点的增强现实展示</p>
        </div>
        <div 
          class="feature-card" 
          @click="navigate('game')"
          tabindex="0"
          role="button"
          aria-label="互动游玩 - 参与吃喝玩乐四大互动板块"
        >
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 5V19H6V5H18ZM18 3H6C4.9 3 4 3.9 4 5V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V5C20 3.9 19.1 3 18 3ZM10 15H8V13H10V15ZM14 15H12V13H14V15ZM10 11H8V9H10V11ZM14 11H12V9H14V11Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>互动游玩</h3>
          <p>参与吃喝玩乐四大互动板块</p>
        </div>
        <div 
          class="feature-card" 
          @click="navigate('wishes')"
          tabindex="0"
          role="button"
          aria-label="祝福系统 - 生成祝福卡片，留下新年祝福"
        >
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
          </div>
          <h3>祝福系统</h3>
          <p>生成祝福卡片，留下新年祝福</p>
        </div>
      </div>
      
      <!-- 社交分享 -->
      <SocialShare />
    </div>
  </section>
</template>

<script setup lang="ts">
import SocialShare from '../components/SocialShare.vue'

const emit = defineEmits<{
  (e: 'navigate', section: string): void
}>()

const navigate = (section: string) => {
  emit('navigate', section)
}
</script>

<style scoped>
.home-section {
  min-height: 80vh;
}

.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.95), rgba(212, 175, 55, 0.85));
  color: #fff;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px var(--shadow-color);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: float 20s linear infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  100% {
    transform: translate(-20px, -20px) rotate(360deg);
  }
}

.hero-section h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px var(--shadow-color);
}

.btn-primary:hover {
  background-color: #f4d03f;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px var(--shadow-color);
}

.btn-secondary {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: var(--card-background);
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 15px var(--shadow-color);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px var(--shadow-color);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(212, 175, 55, 0.1));
  border-radius: 50%;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
  color: var(--secondary-color);
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.2), rgba(212, 175, 55, 0.2));
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--text-secondary);
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .hero-section h2 {
    font-size: 2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .features-section {
    grid-template-columns: 1fr;
  }
}

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
  border: 0;
}

/* 按钮焦点样式 */
.btn-primary:focus,
.btn-secondary:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 卡片焦点样式 */
.feature-card:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}
</style>