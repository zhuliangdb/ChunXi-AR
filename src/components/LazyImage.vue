<template>
  <div 
    class="lazy-image-container" 
    ref="containerRef"
    :style="containerStyle"
    :aria-label="`图片: ${alt}`"
    :aria-busy="!isLoaded && !hasError"
    :aria-hidden="hasError"
  >
    <img
      v-if="isLoaded && !hasError"
      :src="imageSrc"
      :alt="alt"
      class="lazy-image"
      :class="{ 'fade-in': true }"
      @error="handleImageError"
      @load="handleImageLoad"
      loading="lazy"
    />
    <!-- 加载占位符 -->
    <div v-else-if="!isLoaded && !hasError" class="lazy-image-placeholder">
      <slot name="placeholder">
        <div class="placeholder-content">
          <div class="loading-spinner"></div>
          <span>加载中...</span>
        </div>
      </slot>
    </div>
    <!-- 错误占位符 -->
    <div v-else class="lazy-image-error">
      <slot name="error">
        <div class="error-content">
          <div class="error-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
          </div>
          <span>图片加载失败</span>
          <button 
            type="button" 
            class="retry-button" 
            @click="retryLoad"
            aria-label="重试加载图片"
            :disabled="retryCount >= maxRetryAttempts"
          >
            重试
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  retryAttempts?: number
  width?: string | number
  height?: string | number
  rootMargin?: string
  threshold?: number
  webp?: boolean
  quality?: number
}>()

const emit = defineEmits<{
  (e: 'load'): void
  (e: 'error'): void
  (e: 'retry'): void
}>()

const containerRef = ref<HTMLElement>()
const isLoaded = ref(false)
const hasError = ref(false)
const retryCount = ref(0)
const supportsWebP = ref(false)

// 检测浏览器是否支持WebP格式
const checkWebPSupport = () => {
  const elem = document.createElement('canvas')
  if (elem.getContext && elem.getContext('2d')) {
    // 尝试创建一个WebP图像
    supportsWebP.value = elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
}

// 容器样式，用于设置固定宽高，减少布局偏移
const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

// 安全处理图片源，防止XSS
const sanitizedSrc = computed(() => {
  // 验证URL格式
  try {
    const url = new URL(props.src)
    // 只允许http和https协议
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return props.src
    }
    return ''
  } catch {
    // 处理相对路径或无效URL
    return props.src
  }
})

// 生成图片源，支持WebP格式
const imageSrc = computed(() => {
  if (!sanitizedSrc.value) return ''
  
  // 如果支持WebP且启用了WebP选项，返回WebP格式的图片
  if (supportsWebP.value && props.webp) {
    // 对于API生成的图片，添加WebP格式参数
    if (sanitizedSrc.value.includes('text_to_image')) {
      return sanitizedSrc.value + (sanitizedSrc.value.includes('?') ? '&' : '?') + 'format=webp'
    }
    // 对于其他图片，尝试替换扩展名
    return sanitizedSrc.value.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp')
  }
  
  return sanitizedSrc.value
})

const maxRetryAttempts = props.retryAttempts || 3
const rootMargin = props.rootMargin || '300px 0px' // 增加预加载距离
const threshold = props.threshold || 0.05 // 减少触发阈值，提前开始加载

// 处理图片加载错误
const handleImageError = () => {
  hasError.value = true
  emit('error')
}

// 处理图片加载成功
const handleImageLoad = () => {
  isLoaded.value = true
  emit('load')
}

// 重试加载图片
const retryLoad = () => {
  if (retryCount.value < maxRetryAttempts) {
    hasError.value = false
    isLoaded.value = false
    retryCount.value++
    emit('retry')
    // 重新观察元素
    if (containerRef.value) {
      observer?.observe(containerRef.value)
    }
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  // 检测WebP支持
  checkWebPSupport()
  
  if (containerRef.value) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoaded.value && !hasError.value) {
          // 图片进入视口，开始加载
          isLoaded.value = true
          // 停止观察
          if (observer) {
            observer.unobserve(entry.target)
          }
        }
      })
    }, {
      rootMargin,
      threshold
    })
    
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer && containerRef.value) {
    observer.unobserve(containerRef.value)
  }
  // 清理observer
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 100px; /* 确保占位符有最小高度 */
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.lazy-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #999;
  font-size: 0.9rem;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(196, 30, 58, 0.1);
  border-left-color: #c41e3a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.lazy-image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffdddd;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #d32f2f;
  font-size: 0.9rem;
  text-align: center;
}

.error-icon {
  font-size: 1.5rem;
}

.retry-button {
  margin-top: 0.5rem;
  padding: 0.3rem 0.8rem;
  background-color: #c41e3a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #a11a30;
}

.retry-button:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}
</style>