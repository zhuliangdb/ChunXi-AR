import { ref, onMounted, onUnmounted } from 'vue';

/**
 * 滚动动画 composable 函数
 * 用于实现元素在滚动时的淡入效果
 */
export function useScrollReveal() {
  const isMounted = ref(false);
  
  // 处理滚动动画
  const handleScroll = () => {
    if (!isMounted.value) return;
    
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;
      
      if (isVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // 初始化
  const initScrollReveal = () => {
    // 立即检查一次，避免初始加载时元素未触发动画
    handleScroll();
    
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
    // 添加 resize 事件监听，确保窗口大小变化时也能正确计算
    window.addEventListener('resize', handleScroll);
  };
  
  onMounted(() => {
    isMounted.value = true;
    // 延迟初始化，确保DOM已完全渲染
    setTimeout(initScrollReveal, 100);
  });
  
  onUnmounted(() => {
    isMounted.value = false;
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  });
  
  return {
    initScrollReveal
  };
}
