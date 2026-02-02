import { defineStore } from 'pinia'

// 祝福类型定义
interface Wish {
  name: string;
  content: string;
  time: string;
  liked?: boolean;
  likes?: number;
}

export const useAppStore = defineStore('app', {
  state: () => ({
    activeSection: 'home',
    wishesList: [] as Wish[]
  }),
  actions: {
    setActiveSection(section: string) {
      this.activeSection = section
      // 保存到本地存储
      localStorage.setItem('activeSection', section)
    },
    addWish(name: string, content: string) {
      const now = new Date()
      const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      
      const newWish: Wish = {
        name,
        content,
        time,
        liked: false,
        likes: 0
      }
      
      this.wishesList.unshift(newWish)
      // 保存到本地存储
      this.saveWishesToLocalStorage()
    },
    toggleLike(index: number) {
      const wish = this.wishesList[index]
      if (wish) {
        wish.liked = !wish.liked
        wish.likes = (wish.likes || 0) + (wish.liked ? 1 : -1)
        // 保存到本地存储
        this.saveWishesToLocalStorage()
      }
    },
    saveWishesToLocalStorage() {
      try {
        localStorage.setItem('wishesList', JSON.stringify(this.wishesList))
      } catch (error) {
        console.error('保存祝福到本地存储失败:', error)
      }
    },
    loadWishesFromLocalStorage() {
      try {
        const savedWishes = localStorage.getItem('wishesList')
        if (savedWishes) {
          this.wishesList = JSON.parse(savedWishes)
        } else {
          // 加载默认祝福
          this.loadDefaultWishes()
        }
        
        // 加载默认选中的章节
        const savedSection = localStorage.getItem('activeSection')
        if (savedSection) {
          this.activeSection = savedSection
        }
      } catch (error) {
        console.error('从本地存储加载祝福失败:', error)
        // 加载默认祝福
        this.loadDefaultWishes()
      }
    },
    loadDefaultWishes() {
      // 默认祝福数据
      this.wishesList = [
        { name: '小明', content: '新年快乐！万事如意！', time: '2026-02-01 10:00', liked: false, likes: 0 },
        { name: '小红', content: '新春大吉！阖家欢乐！', time: '2026-02-01 09:30', liked: false, likes: 0 },
        { name: '小李', content: '恭喜发财！红包拿来！', time: '2026-02-01 09:00', liked: false, likes: 0 }
      ]
      // 保存到本地存储
      this.saveWishesToLocalStorage()
    },
    clearWishes() {
      this.wishesList = []
      // 清除本地存储
      localStorage.removeItem('wishesList')
    }
  }
})
