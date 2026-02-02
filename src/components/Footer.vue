<template>
  <footer class="footer" aria-labelledby="footer-heading">
    <div class="footer-container">
      <div class="footer-info">
        <h3 id="footer-heading">新春祝福网站</h3>
        <p><small>© 2026 新年快乐</small></p>
      </div>
      <nav class="footer-links" aria-label="页脚导航">
        <ul>
          <li v-for="item in footerLinks" :key="item.id">
            <a 
              :href="'#' + item.id"
              @click.prevent="navigate(item.id)"
              :aria-label="item.label + '页面'"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'navigate', section: string): void
}>()

const footerLinks = [
  { id: 'home', label: '首页' },
  { id: 'culture', label: '地域文化' },
  { id: 'ar', label: 'AR体验' },
  { id: 'game', label: '互动游玩' },
  { id: 'wishes', label: '祝福系统' }
]

const navigate = (section: string) => {
  emit('navigate', section)
}
</script>

<style scoped>
.footer {
  background-color: var(--primary-color);
  color: var(--text-inverse);
  padding: 2rem 0;
  margin-top: 3rem;
  position: relative;
  z-index: 5;
  box-shadow: 0 -2px 10px var(--shadow-dark);
  transition: background-color 0.3s ease;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.footer-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  font-family: var(--font-serif);
  line-height: var(--leading-tight);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.footer-info p {
  margin: 0;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);
  line-height: var(--leading-normal);
}

.footer-links {
  display: flex;
}

.footer-links ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.footer-links a {
  color: var(--text-inverse);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all 0.3s ease;
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.footer-links a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  transition: left 0.5s ease;
}

.footer-links a:hover {
  color: var(--secondary-color);
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.footer-links a:hover::before {
  left: 100%;
}

.footer-links a:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

.footer-links a:active {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 0 1rem;
  }
  
  .footer-links ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .footer-links a {
    white-space: nowrap;
  }
  
  .footer-info h3 {
    font-size: var(--text-lg);
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0;
    margin-top: 2rem;
  }
  
  .footer-container {
    gap: 1.5rem;
  }
  
  .footer-links ul {
    gap: 0.8rem;
  }
  
  .footer-links a {
    font-size: var(--text-xs);
    padding: 0.2rem 0.5rem;
  }
}

/* 动画效果 */
.footer-info,
.footer-links {
  animation: fadeInUp 0.6s ease-out;
}

.footer-info {
  animation-delay: 0.1s;
}

.footer-links {
  animation-delay: 0.2s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (prefers-reduced-motion: reduce) {
  .footer-info,
  .footer-links {
    animation: none;
  }
}
</style>