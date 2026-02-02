<template>
  <section class="wishes-section" aria-labelledby="wishes-heading">
    <div class="wishes-container">
      <h2 id="wishes-heading" class="sr-only">祝福系统</h2>
      
      <div class="wishes-tabs" role="tablist" aria-label="祝福系统选项卡">
        <button 
          @click="activeWishes = 'card'" 
          :class="{ active: activeWishes === 'card' }"
          role="tab"
          :aria-selected="activeWishes === 'card'"
          :aria-controls="activeWishes === 'card' ? 'card-content' : undefined"
          id="card-tab"
        >
          祝福卡片
        </button>
        <button 
          @click="activeWishes = 'message'" 
          :class="{ active: activeWishes === 'message' }"
          role="tab"
          :aria-selected="activeWishes === 'message'"
          :aria-controls="activeWishes === 'message' ? 'message-content' : undefined"
          id="message-tab"
        >
          留言板
        </button>
        <button 
          @click="activeWishes = 'wall'" 
          :class="{ active: activeWishes === 'wall' }"
          role="tab"
          :aria-selected="activeWishes === 'wall'"
          :aria-controls="activeWishes === 'wall' ? 'wall-content' : undefined"
          id="wall-tab"
        >
          祝福墙
        </button>
      </div>
      
      <!-- 祝福卡片 -->
      <div 
        v-if="activeWishes === 'card'" 
        class="wishes-content"
        role="tabpanel"
        id="card-content"
        aria-labelledby="card-tab"
      >
        <h3>生成祝福卡片</h3>
        <div class="card-generator">
          <div class="card-templates" aria-label="卡片模板选择">
                <div 
                  v-for="template in cardTemplates" 
                  :key="template.id"
                  class="template-item" 
                  :class="{ active: selectedTemplate === template.id }" 
                  @click="selectedTemplate = template.id"
                  tabindex="0"
                  role="button"
                  :aria-label="`选择模板${template.id}`"
                >
                  <LazyImage :src="template.imageUrl" :alt="template.name" />
                  <div class="template-name">{{ template.name }}</div>
                </div>
              </div>
          
          <div class="card-editor">
            <textarea 
              v-model="cardMessage" 
              placeholder="请输入祝福语..." 
              class="message-input"
              aria-label="输入祝福语"
              rows="4"
            ></textarea>
            <div class="card-options">
              <label class="option-item">
                <input type="checkbox" v-model="includeName" aria-label="包含发送者姓名">
                <span>包含发送者姓名</span>
              </label>
              <input 
                v-if="includeName" 
                type="text" 
                v-model="senderName" 
                placeholder="您的姓名" 
                class="sender-input"
                aria-label="输入发送者姓名"
              >
            </div>
            <button 
              class="btn-primary generate-card"
              aria-label="生成卡片"
              @click="generateCard"
            >
              生成卡片
            </button>
          </div>
        </div>
        
        <!-- 卡片预览 -->
        <div v-if="generatedCard" class="card-preview" aria-label="生成的卡片预览">
          <h4>卡片预览</h4>
          <div class="preview-container">
            <div class="card-preview-item">
              <LazyImage :src="generatedCard.imageUrl" alt="生成的卡片" />
              <div class="card-message">{{ generatedCard.message }}</div>
              <div v-if="generatedCard.sender" class="card-sender">— {{ generatedCard.sender }}</div>
            </div>
            <div class="preview-actions">
              <button class="btn-primary download-card" @click="downloadCard" aria-label="下载卡片">
                📥 下载卡片
              </button>
              <button class="btn-primary share-card" @click="shareCard" aria-label="分享卡片">
                📤 分享卡片
              </button>
              <button class="btn-primary save-card" @click="saveCard" aria-label="保存卡片">
                💾 保存卡片
              </button>
            </div>
          </div>
        </div>
        
        <!-- 保存的卡片 -->
        <div v-if="savedCards.length > 0" class="saved-cards" aria-label="保存的卡片">
          <h4>保存的卡片</h4>
          <div class="saved-cards-grid">
            <div 
              v-for="(card, index) in savedCards" 
              :key="index"
              class="saved-card-item"
              tabindex="0"
            >
              <LazyImage :src="card.imageUrl" :alt="'保存的卡片' + (index + 1)" />
              <div class="saved-card-actions">
                <button @click="loadSavedCard(index)" class="action-btn" aria-label="加载卡片">
                  🔄 加载
                </button>
                <button @click="deleteSavedCard(index)" class="action-btn delete" aria-label="删除卡片">
                  🗑️ 删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 留言板 -->
      <div 
        v-else-if="activeWishes === 'message'" 
        class="wishes-content"
        role="tabpanel"
        id="message-content"
        aria-labelledby="message-tab"
      >
        <h3>留下新年祝福</h3>
        <form class="message-form" @submit.prevent="submitMessage">
          <input 
            type="text" 
            v-model="messageName" 
            placeholder="您的名字" 
            class="name-input"
            aria-label="输入您的名字"
            required
          >
          <textarea 
            v-model="messageContent" 
            placeholder="请输入您的新年祝福..." 
            class="content-input"
            aria-label="输入您的新年祝福"
            rows="4"
            required
          ></textarea>
          <div class="message-options">
            <label class="option-item">
              <input type="checkbox" v-model="allowShare" aria-label="允许分享到祝福墙">
              <span>允许分享到祝福墙</span>
            </label>
          </div>
          <button 
            type="submit" 
            class="btn-primary submit-message"
            aria-label="提交留言"
          >
            提交留言
          </button>
        </form>
      </div>
      
      <!-- 祝福墙 -->
      <div 
        v-else-if="activeWishes === 'wall'" 
        class="wishes-content"
        role="tabpanel"
        id="wall-content"
        aria-labelledby="wall-tab"
      >
        <h3>祝福墙</h3>
        <div class="wall-controls">
          <input 
            type="text" 
            v-model="searchKeyword" 
            placeholder="搜索祝福..." 
            class="search-input"
            aria-label="搜索祝福"
          >
          <button 
            class="btn-primary refresh-wall" 
            @click="refreshWall"
            aria-label="刷新祝福墙"
          >
            🔄 刷新
          </button>
        </div>
        <div class="wishes-wall" aria-label="祝福列表">
          <div 
            v-for="(wish, index) in filteredWishes" 
            :key="index" 
            class="wish-item"
            tabindex="0"
          >
            <div class="wish-header">
              <span class="wish-name">{{ wish.name }}</span>
              <span class="wish-time">{{ wish.time }}</span>
            </div>
            <div class="wish-content">{{ wish.content }}</div>
            <div class="wish-actions">
              <button 
                class="action-btn like-btn" 
                @click="likeWish(index)"
                :class="{ liked: wish.liked }"
                :aria-label="wish.liked ? '取消点赞' : '点赞'"
              >
                {{ wish.liked ? '❤️ 已点赞' : '🤍 点赞' }}
                <span v-if="wish.likes > 0">({{ wish.likes }})</span>
              </button>
            </div>
          </div>
          <div v-if="filteredWishes.length === 0" class="empty-wall" aria-label="暂无祝福">
            <p>暂无祝福，快来留下您的新年祝福吧！</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/app'
import LazyImage from '../components/LazyImage.vue'

const store = useAppStore()
const activeWishes = ref('card')
const selectedTemplate = ref(1)
const cardMessage = ref('')
const messageName = ref('')
const messageContent = ref('')
const generatedCard = ref(null)
const includeName = ref(false)
const senderName = ref('')
const allowShare = ref(true)
const searchKeyword = ref('')
const savedCards = ref([])

// 卡片模板
const cardTemplates = [
  {
    id: 1,
    name: '传统喜庆',
    imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20template%2C%20red%20and%20gold%2C%20lanterns%20and%20spring%20couplets&image_size=portrait_4_3`
  },
  {
    id: 2,
    name: '中国结',
    imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20template%2C%20red%20and%20gold%2C%20Chinese%20knots%20and%20zodiac%20elements&image_size=portrait_4_3`
  },
  {
    id: 3,
    name: '鞭炮祥云',
    imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20template%2C%20red%20and%20gold%2C%20firecrackers%20and%20cloud%20patterns&image_size=portrait_4_3`
  },
  {
    id: 4,
    name: '梅花',
    imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20template%2C%20red%20plum%20blossoms%2C%20traditional%20Chinese%20style&image_size=portrait_4_3`
  },
  {
    id: 5,
    name: '生肖',
    imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20template%2C%20Chinese%20zodiac%20animal%2C%20red%20and%20gold%20background&image_size=portrait_4_3`
  },
  {
    id: 6,
    name: '水墨风格',
    imageUrl: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20greeting%20card%20template%2C%20ink%20painting%20style%2C%20traditional%20Chinese%20art&image_size=portrait_4_3`
  }
];

// 祝福列表
const wishesList = computed(() => {
  // 直接使用store中的祝福列表
  return store.wishesList;
});

// 过滤后的祝福列表
const filteredWishes = computed(() => {
  if (!searchKeyword.value) {
    return wishesList.value;
  }
  return wishesList.value.filter(wish => 
    wish.content.includes(searchKeyword.value) || 
    wish.name.includes(searchKeyword.value)
  );
});

const submitMessage = () => {
  if (messageName.value && messageContent.value) {
    store.addWish(messageName.value, messageContent.value);
    messageName.value = '';
    messageContent.value = '';
    // 显示成功提示
    alert('祝福提交成功！');
  }
};

const generateCard = () => {
  if (!cardMessage.value) {
    alert('请输入祝福语内容');
    return;
  }
  
  // 根据选择的模板生成卡片
  const template = cardTemplates.find(t => t.id === selectedTemplate.value) || cardTemplates[0];
  
  // 构建祝福内容
  let finalMessage = cardMessage.value;
  let sender = '';
  
  if (includeName.value && senderName.value) {
    sender = senderName.value;
  }
  
  // 生成卡片数据
  generatedCard.value = {
    imageUrl: template.imageUrl,
    message: finalMessage,
    sender: sender,
    templateId: selectedTemplate.value,
    templateName: template.name,
    timestamp: new Date().toISOString()
  };
  
  console.log('生成卡片:', generatedCard.value);
  
  // 模拟生成成功提示
  alert('祝福卡片生成成功！');
};

const downloadCard = () => {
  if (!generatedCard.value) return;
  
  try {
    // 创建下载链接
    const link = document.createElement('a');
    link.href = generatedCard.value.imageUrl;
    link.download = `新年祝福卡片_${new Date().getTime()}.png`;
    link.click();
    
    // 显示成功提示
    alert('卡片下载成功！');
  } catch (error) {
    console.error('下载卡片失败:', error);
    alert('卡片下载失败，请稍后重试！');
  }
};

const shareCard = () => {
  if (!generatedCard.value) return;
  
  try {
    // 检查是否支持Web Share API
    if (navigator.share) {
      navigator.share({
        title: '新年祝福卡片',
        text: generatedCard.value.message + (generatedCard.value.sender ? `\n— ${generatedCard.value.sender}` : ''),
        url: window.location.href
      }).then(() => {
        alert('卡片分享成功！');
      }).catch(err => {
        console.error('分享失败:', err);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }
  } catch (error) {
    console.error('分享卡片失败:', error);
    alert('卡片分享失败，请稍后重试！');
  }
};

// 分享备用方案
const fallbackShare = () => {
  if (!generatedCard.value) return;
  
  // 复制到剪贴板
  const shareText = `新年祝福：${generatedCard.value.message}${generatedCard.value.sender ? `\n— ${generatedCard.value.sender}` : ''}\n\n来自新春祝福网站`;
  
  navigator.clipboard.writeText(shareText).then(() => {
    alert('祝福内容已复制到剪贴板，您可以粘贴分享给朋友！');
  }).catch(err => {
    console.error('复制失败:', err);
    alert('分享功能暂时不可用，请稍后重试！');
  });
};

const saveCard = () => {
  if (!generatedCard.value) return;
  
  try {
    // 保存到本地存储
    const savedCardsList = JSON.parse(localStorage.getItem('savedCards') || '[]');
    savedCardsList.push(generatedCard.value);
    localStorage.setItem('savedCards', JSON.stringify(savedCardsList));
    
    // 更新本地状态
    savedCards.value = savedCardsList;
    
    alert('卡片保存成功！');
  } catch (error) {
    console.error('保存卡片失败:', error);
    alert('卡片保存失败，请稍后重试！');
  }
};

const loadSavedCard = (index) => {
  const card = savedCards.value[index];
  if (card) {
    selectedTemplate.value = card.templateId;
    cardMessage.value = card.message;
    senderName.value = card.sender || '';
    includeName.value = !!card.sender;
    generatedCard.value = card;
    alert('卡片加载成功！');
  }
};

const deleteSavedCard = (index) => {
  if (confirm('确定要删除这张卡片吗？')) {
    try {
      const savedCardsList = JSON.parse(localStorage.getItem('savedCards') || '[]');
      savedCardsList.splice(index, 1);
      localStorage.setItem('savedCards', JSON.stringify(savedCardsList));
      savedCards.value = savedCardsList;
      alert('卡片删除成功！');
    } catch (error) {
      console.error('删除卡片失败:', error);
      alert('卡片删除失败，请稍后重试！');
    }
  }
};

const refreshWall = () => {
  // 模拟刷新
  alert('祝福墙已刷新！');
};

const likeWish = (index) => {
  // 使用store的toggleLike方法
  store.toggleLike(index);
};

// 初始化加载保存的卡片
const loadSavedCards = () => {
  try {
    const savedCardsList = JSON.parse(localStorage.getItem('savedCards') || '[]');
    savedCards.value = savedCardsList;
  } catch (error) {
    console.error('加载保存的卡片失败:', error);
  }
};

// 初始化
loadSavedCards();
</script>

<style scoped>
.wishes-section {
  min-height: 80vh;
}

.wishes-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.wishes-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.wishes-tabs button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f0f0f0;
  color: #333;
}

.wishes-tabs button.active {
  background-color: #c41e3a;
  color: #fff;
}

.wishes-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.wishes-content h3 {
  color: #c41e3a;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #d4af37;
  color: #c41e3a;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  background-color: #f4d03f;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.card-templates {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #d4af37 #f0f0f0;
}

.card-templates::-webkit-scrollbar {
  height: 6px;
}

.card-templates::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}

.card-templates::-webkit-scrollbar-thumb {
  background-color: #d4af37;
  border-radius: 3px;
}

.template-item {
  flex: 0 0 180px;
  cursor: pointer;
  border: 3px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.template-item.active {
  border-color: #c41e3a;
  box-shadow: 0 4px 12px rgba(196, 30, 58, 0.2);
}

.template-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.template-name {
  padding: 0.8rem;
  text-align: center;
  font-weight: bold;
  color: #333;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
}

.card-editor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-input {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
}

/* 卡片选项 */
.card-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.option-item input[type="checkbox"] {
  accent-color: #c41e3a;
}

.sender-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.generate-card {
  align-self: flex-start;
}

.message-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
}

.name-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.content-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
}

/* 留言选项 */
.message-options {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.submit-message {
  align-self: flex-start;
}

/* 祝福墙控制 */
.wall-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.refresh-wall {
  white-space: nowrap;
}

.wishes-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.wish-item {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #c41e3a;
  transition: all 0.3s ease;
}

.wish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.wish-name {
  font-weight: bold;
  color: #c41e3a;
}

.wish-time {
  font-size: 0.8rem;
  color: #999;
}

.wish-content {
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* 祝福操作 */
.wish-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d4af37;
  background-color: transparent;
  color: #c41e3a;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn:hover {
  background-color: #d4af37;
  color: #c41e3a;
  transform: translateY(-1px);
}

.like-btn.liked {
  background-color: #c41e3a;
  color: #fff;
  border-color: #c41e3a;
}

/* 空祝福墙 */
.empty-wall {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 2px dashed #d4af37;
}

.empty-wall p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

/* 卡片预览 */
.card-preview {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
}

.card-preview h4 {
  color: #c41e3a;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: var(--font-semibold);
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.card-preview-item {
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.card-message {
  position: relative;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  margin: 2rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: var(--font-medium);
  color: #333;
  line-height: var(--leading-relaxed);
  max-height: 60%;
  overflow-y: auto;
}

.card-sender {
  position: relative;
  z-index: 2;
  margin-top: 1rem;
  font-style: italic;
  color: #666;
  font-size: 1rem;
}

.preview-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.download-card,
.share-card,
.save-card {
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
}

/* 保存的卡片 */
.saved-cards {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
}

.saved-cards h4 {
  color: #c41e3a;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: var(--font-semibold);
}

.saved-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.saved-card-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #fff;
}

.saved-card-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.saved-card-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.saved-card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
}

.saved-card-actions .action-btn {
  flex: 1;
  font-size: 0.8rem;
  padding: 0.5rem;
  text-align: center;
}

.action-btn.delete {
  border-color: #c41e3a;
  color: #c41e3a;
}

.action-btn.delete:hover {
  background-color: #c41e3a;
  color: #fff;
}

@media (max-width: 480px) {
  .card-templates {
    flex-direction: column;
    align-items: center;
  }
  
  .template-item {
    flex: 0 0 150px;
  }
  
  .template-item img {
    height: 210px;
  }
  
  .wall-controls {
    flex-direction: column;
  }
  
  .search-input {
    min-width: unset;
  }
  
  .saved-cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .saved-card-item img {
    height: 200px;
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
.wishes-tabs button:focus,
.btn-primary:focus,
.action-btn:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 输入框焦点样式 */
.name-input:focus,
.content-input:focus,
.message-input:focus,
.sender-input:focus,
.search-input:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
  border-color: #c41e3a;
}

/* 卡片焦点样式 */
.template-item:focus,
.wish-item:focus,
.saved-card-item:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 选项卡样式改进 */
.wishes-tabs button {
  position: relative;
}

.wishes-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #c41e3a;
  border-radius: 3px 3px 0 0;
}

/* 模板选择样式改进 */
.template-item {
  transition: all 0.3s ease;
}

.template-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.template-item:focus {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 祝福墙项目样式改进 */
.wish-item {
  transition: all 0.3s ease;
}

.wish-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 表单样式改进 */
.name-input,
.content-input,
.message-input,
.sender-input,
.search-input {
  transition: all 0.3s ease;
}

/* 卡片生成器样式改进 */
.card-generator {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .card-generator {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .card-templates {
    flex: 1;
  }
  
  .card-editor {
    flex: 1;
  }
}

/* 响应式卡片预览 */
@media (max-width: 768px) {
  .card-preview-item {
    width: 250px;
    height: 333px;
  }
  
  .card-message {
    padding: 1.2rem;
    margin: 1.5rem;
    font-size: 1rem;
  }
  
  .preview-actions {
    flex-direction: column;
    width: 100%;
    max-width: 250px;
  }
  
  .download-card,
  .share-card,
  .save-card {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .card-preview-item {
    width: 200px;
    height: 267px;
  }
  
  .card-message {
    padding: 1rem;
    margin: 1rem;
    font-size: 0.9rem;
  }
  
  .preview-actions {
    max-width: 200px;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .wishes-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .wishes-tabs button {
    width: 100%;
    max-width: 300px;
  }
  
  .card-templates {
    gap: 1rem;
  }
  
  .template-item {
    flex: 0 0 150px;
  }
  
  .template-item img {
    height: 200px;
  }
}
</style>