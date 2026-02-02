import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 第三方库单独打包
          vendor: ['vue', 'pinia'],
          // 动画库单独打包
          animation: ['gsap'],
          // 3D库单独打包
          three: ['three'],
          // 工具库单独打包
          utils: ['@vueuse/core'],
          // 按页面分割
          home: ['@/views/Home.vue'],
          culture: ['@/views/Culture.vue'],
          ar: ['@/views/AR.vue'],
          game: ['@/views/Game.vue'],
          wishes: ['@/views/Wishes.vue']
        },
        // 生成命名的chunk文件
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        // 生成命名的资源文件
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // 优化图片
    assetsInlineLimit: 4096, // 小于4kb的资源内联
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 生成sourcemap用于调试
    sourcemap: false,
    // 最小化混淆
    minify: 'terser',
    // 禁用空的CSS文件生成
    emptyOutDir: true
  },
  // 开发服务器配置
  server: {
    // 启用热模块替换
    hmr: true,
    // 端口
    port: 3000,
    // 自动打开浏览器
    open: false,
    // 优化开发服务器响应速度
    warmup: {
      clientFiles: ['./src/**/*.{js,ts,vue}']
    }
  },
  // 缓存配置
  cacheDir: '.vite/cache',
  // 预览服务器配置
  preview: {
    port: 3001,
    open: false
  },
  // 优化依赖预构建
  optimizeDeps: {
    // 强制预构建的依赖
    include: ['vue', 'pinia', 'gsap', 'three', '@vueuse/core'],
    // 禁用依赖预构建缓存
    force: false
  }
})
