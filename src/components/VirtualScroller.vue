<template>
  <div 
    class="virtual-scroller" 
    ref="containerRef" 
    :style="{ height: containerHeight }"
    role="listbox"
    aria-label="虚拟滚动列表"
    aria-multiselectable="false"
  >
    <div class="virtual-scroller-content" :style="{ height: totalHeight }">
      <div 
        v-for="item in visibleItems" 
        :key="item.key" 
        class="virtual-item"
        :style="{
          position: 'absolute',
          top: `${item.index * itemHeight}px`,
          left: 0,
          width: '100%',
          height: `${itemHeight}px`
        }"
        role="option"
        :aria-posinset="item.index + 1"
        :aria-setsize="items.length"
      >
        <slot :item="item"></slot>
      </div>
    </div>
    <!-- 加载指示器 -->
    <div v-if="isLoading" class="loading-indicator" aria-label="加载中">
      <slot name="loading">加载中...</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'

// 定义泛型接口，提高类型安全性
const props = defineProps<{
  items: Array<{
    key?: string | number
    [key: string]: any
  }>
  itemHeight: number
  containerHeight?: string
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:items', items: Array<{
    key?: string | number
    [key: string]: any
  }>): void
  (e: 'scroll', scrollTop: number): void
  (e: 'visible-range-change', start: number, end: number): void
}>()

const containerRef = ref<HTMLElement>()
const { y } = useScroll(containerRef)
const containerHeightValue = ref(400) // 默认容器高度

// 计算属性
const items = computed(() => props.items)
const itemHeight = computed(() => props.itemHeight)
const containerHeight = computed(() => props.containerHeight || '400px')
const isLoading = computed(() => props.isLoading || false)

const totalHeight = computed(() => `${items.value.length * itemHeight.value}px`)

// 监听容器尺寸变化
const updateContainerHeight = () => {
  if (containerRef.value) {
    containerHeightValue.value = containerRef.value.clientHeight
  }
}

const visibleItems = computed(() => {
  if (!containerRef.value) return []
  
  const scrollTop = y.value
  const containerHeight = containerHeightValue.value
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight.value) - 1)
  const endIndex = Math.min(
    items.value.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight.value) + 1
  )
  
  // 触发可见范围变化事件
  emit('visible-range-change', startIndex, endIndex)
  
  return items.value.slice(startIndex, endIndex).map((item: any, i: number) => ({
    ...item,
    index: startIndex + i,
    key: item.key || `item-${startIndex + i}`
  }))
})

// 监听滚动事件
watch(y, (newScrollTop) => {
  emit('scroll', newScrollTop)
})

// 键盘导航支持
const handleKeyDown = (event: KeyboardEvent) => {
  if (!containerRef.value) return
  
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault()
      containerRef.value.scrollTop -= itemHeight.value
      break
    case 'ArrowDown':
      event.preventDefault()
      containerRef.value.scrollTop += itemHeight.value
      break
    case 'PageUp':
      event.preventDefault()
      containerRef.value.scrollTop -= containerRef.value.clientHeight
      break
    case 'PageDown':
      event.preventDefault()
      containerRef.value.scrollTop += containerRef.value.clientHeight
      break
    case 'Home':
      event.preventDefault()
      containerRef.value.scrollTop = 0
      break
    case 'End':
      event.preventDefault()
      containerRef.value.scrollTop = containerRef.value.scrollHeight
      break
  }
}

onMounted(() => {
  // 初始化时触发一次计算
  visibleItems.value
  
  // 更新容器高度
  updateContainerHeight()
  
  // 添加事件监听器
  if (containerRef.value) {
    containerRef.value.addEventListener('keydown', handleKeyDown)
    // 确保容器可以通过键盘聚焦
    containerRef.value.setAttribute('tabindex', '0')
  }
  
  // 添加窗口大小变化监听器
  window.addEventListener('resize', updateContainerHeight)
})

onUnmounted(() => {
  // 移除事件监听器
  if (containerRef.value) {
    containerRef.value.removeEventListener('keydown', handleKeyDown)
  }
  
  // 移除窗口大小变化监听器
  window.removeEventListener('resize', updateContainerHeight)
})
</script>

<style scoped>
.virtual-scroller {
  overflow-y: auto;
  position: relative;
  outline: none; /* 移除默认聚焦轮廓，使用自定义样式 */
}

/* 自定义聚焦样式 */
.virtual-scroller:focus {
  box-shadow: 0 0 0 2px #d4af37;
}

.virtual-scroller-content {
  position: relative;
  width: 100%;
}

.virtual-item {
  overflow: hidden;
}

.loading-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

/* 滚动条样式 */
.virtual-scroller::-webkit-scrollbar {
  width: 8px;
}

.virtual-scroller::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.virtual-scroller::-webkit-scrollbar-thumb {
  background: #c41e3a;
  border-radius: 4px;
}

.virtual-scroller::-webkit-scrollbar-thumb:hover {
  background: #a11a30;
}
</style>