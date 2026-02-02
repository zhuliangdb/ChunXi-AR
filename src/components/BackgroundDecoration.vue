<template>
  <div class="background-decoration animate" :class="{ 'mobile': isMobile }">
    <!-- 灯笼 -->
    <div 
      v-for="i in displayLanterns" 
      :key="`lantern-${i}`" 
      class="lantern" 
      :style="{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
        transform: `scale(${lanternScale})`
      }"
    >
      <div class="lantern-top"></div>
      <div class="lantern-body">
        <div class="lantern-light"></div>
      </div>
      <div class="lantern-bottom"></div>
    </div>
    
    <!-- 雪花 -->
    <div 
      v-for="i in displaySnowflakes" 
      :key="`snow-${i}`" 
      class="snow" 
      :style="{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${10 + Math.random() * 10}s`,
        fontSize: `${8 + Math.random() * 12}px`,
        opacity: snowOpacity
      }"
    >
      ❄️
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  lanternCount?: number
  snowflakeCount?: number
  lanternScale?: number
  snowOpacity?: number
  enableAnimation?: boolean
}>()

const isMobile = ref(false)

// 计算属性，根据屏幕尺寸和props决定显示的灯笼和雪花数量
const displayLanterns = computed(() => {
  const baseCount = props.lanternCount || 20
  return isMobile.value ? Math.max(5, Math.floor(baseCount / 2)) : baseCount
})

const displaySnowflakes = computed(() => {
  const baseCount = props.snowflakeCount || 50
  return isMobile.value ? Math.max(10, Math.floor(baseCount / 2)) : baseCount
})

const lanternScale = computed(() => {
  return props.lanternScale || 1
})

const snowOpacity = computed(() => {
  return props.snowOpacity || 0.8
})



// 检测屏幕尺寸变化
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.background-decoration {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* 灯笼样式 */
.lantern {
  position: absolute;
  top: -100px;
  animation: float 10s ease-in-out infinite;
  will-change: transform;
}

.lantern-top {
  width: 20px;
  height: 20px;
  background-color: #d4af37;
  margin: 0 auto;
}

.lantern-body {
  width: 60px;
  height: 80px;
  background-color: #c41e3a;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
}

.lantern-light {
  width: 40px;
  height: 60px;
  background-color: rgba(255, 255, 0, 0.6);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  margin: 10px auto;
  animation: glow 2s ease-in-out infinite alternate;
  will-change: opacity;
}

.lantern-bottom {
  width: 20px;
  height: 20px;
  background-color: #d4af37;
  margin: 0 auto;
}

/* 雪花样式 */
.snow {
  position: absolute;
  top: -20px;
  animation: fall linear infinite;
  will-change: transform;
}

/* 动画效果 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-50px) rotate(5deg);
  }
}

@keyframes glow {
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fall {
  0% {
    top: -20px;
    transform: translateX(0);
  }
  100% {
    top: 100vh;
    transform: translateX(100px);
  }
}

/* 移动设备优化 */
@media (max-width: 768px) {
  .background-decoration.mobile .lantern {
    animation-duration: 12s; /* 减慢动画速度以提高性能 */
  }
  
  .background-decoration.mobile .snow {
    animation-duration: 15s; /* 减慢动画速度以提高性能 */
  }
}

/* 禁用动画的情况 */
.background-decoration:not(.animate) .lantern,
.background-decoration:not(.animate) .lantern-light,
.background-decoration:not(.animate) .snow {
  animation: none;
}
</style>