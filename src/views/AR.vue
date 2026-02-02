<template>
  <section class="ar-section" aria-labelledby="ar-heading">
    <div class="ar-container">
      <h2 id="ar-heading">AR体验</h2>
      <p class="ar-description">通过增强现实技术，探索中国著名景点和传统文化的3D展示</p>
      
      <div class="ar-content">
        <div class="ar-instructions">
          <h3>使用说明</h3>
          <ol aria-label="AR使用步骤">
            <li>准备手机或电脑摄像头</li>
            <li>扫描下方AR标记图案</li>
            <li>查看3D模型展示</li>
            <li>使用鼠标或触摸操作360°查看</li>
          </ol>
          
          <div class="ar-marker">
            <h4>AR标记图案</h4>
            <img src="/ar-marker.png" alt="AR标记图案" class="marker-image">
            <p>将摄像头对准此图案启动AR体验</p>
          </div>
          
          <div class="ar-qrcode">
            <h4>或扫描二维码</h4>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://arjs-org.github.io/AR.js/examples/basic.html" alt="AR二维码" class="qrcode-image">
            <p>扫描二维码在手机上体验AR功能</p>
          </div>
        </div>
        
        <div class="ar-preview">
          <h3>AR场景预览</h3>
          
          <!-- 场景选择 -->
          <div class="ar-scene-selector" role="tablist" aria-label="AR场景选择">
            <button 
              v-for="scene in arScenes" 
              :key="scene.id"
              class="scene-btn"
              :class="{ active: activeScene === scene.id }"
              @click="activeScene = scene.id"
              role="tab"
              :aria-selected="activeScene === scene.id"
              :aria-controls="activeScene === scene.id ? `scene-${scene.id}` : undefined"
            >
              {{ scene.name }}
            </button>
          </div>
          
          <div class="ar-scene-container">
            <!-- Three.js 3D 预览场景 -->
            <div class="threejs-scene" ref="threejsSceneRef" role="region" aria-label="3D预览场景"></div>
            
            <!-- AR功能说明 -->
            <div class="ar-info" role="alert" aria-live="polite">
              <div class="info-content">
                <span class="info-icon">🎯</span>
                <h4>3D场景预览</h4>
                <p>使用鼠标或触摸操作可以：</p>
                <ul>
                  <li>拖动：旋转场景</li>
                  <li>滚轮：缩放场景</li>
                  <li>点击：重置视角</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="ar-controls">
            <button 
              class="control-btn" 
              @click="startAR"
              aria-label="启动3D场景"
            >
              🔄 启动3D场景
            </button>
            <button 
              class="control-btn" 
              @click="resetAR"
              aria-label="重置3D场景"
            >
              🔄 重置
            </button>
            <button 
              class="control-btn" 
              @click="toggleFullscreen"
              aria-label="切换全屏"
            >
              📱 全屏
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ARSkill } from '../skills/skill-ar';

// 当前活动场景
const activeScene = ref('huangshan');
// Three.js 场景引用
const threejsSceneRef = ref<HTMLElement | null>(null);
// ARSkill 实例
let arSkill: ARSkill | null = null;

// AR场景配置
const arScenes = [
  {
    id: 'huangshan',
    name: '黄山',
    description: '中国著名山脉，以奇松、怪石、云海、温泉、冬雪"五绝"著称',
    previewImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huangshan%20Mountain%20scenic%20view%2C%20famous%20Chinese%20mountain%20with%20pine%20trees%20and%20clouds&image_size=landscape_16_9'
  },
  {
    id: 'greatwall',
    name: '长城',
    description: '中国古代伟大的防御工程，世界文化遗产',
    previewImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Great%20Wall%20of%20China%20scenic%20view%2C%20ancient%20Chinese%20architecture%20winding%20through%20mountains&image_size=landscape_16_9'
  },
  {
    id: 'forbidden',
    name: '故宫',
    description: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最为完整的木质结构古建筑之一',
    previewImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Forbidden%20City%20in%20Beijing%2C%20ancient%20Chinese%20palace%20with%20red%20walls%20and%20golden%20roofs&image_size=landscape_16_9'
  },
  {
    id: 'spring',
    name: '春节',
    description: '中国传统节日，象征着新的开始和希望',
    previewImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20celebration%2C%20red%20lanterns%20and%20traditional%20decorations&image_size=landscape_16_9'
  }
];

onMounted(() => {
  // 初始化 Three.js 场景
  if (threejsSceneRef.value) {
    arSkill = new ARSkill(threejsSceneRef.value);
    // 根据当前场景创建对应的模型
    createSceneModel(activeScene.value);
  }
});

// 监听场景变化
watch(activeScene, (newScene) => {
  // 清理现有场景
  if (threejsSceneRef.value && arSkill) {
    // 销毁现有场景
    arSkill.destroy(threejsSceneRef.value);
    // 重新创建场景
    arSkill = new ARSkill(threejsSceneRef.value);
    // 创建新场景的模型
    createSceneModel(newScene);
  }
});

// 根据场景类型创建模型
const createSceneModel = (sceneType: string) => {
  if (!arSkill) return;
  
  // 根据场景类型创建不同的模型
  switch (sceneType) {
    case 'huangshan':
      arSkill.createSpringFestivalModel('lantern');
      break;
    case 'greatwall':
      arSkill.createSpringFestivalModel('firecracker');
      break;
    case 'forbidden':
      arSkill.createSpringFestivalModel('tiger');
      break;
    case 'spring':
      arSkill.createSpringFestivalModel('lantern');
      arSkill.createSpringFestivalModel('firecracker');
      break;
  }
};

// AR相关方法
const startAR = () => {
  console.log('3D场景已启动');
  // Three.js 场景已在初始化时自动启动
};

const resetAR = () => {
  if (threejsSceneRef.value && arSkill) {
    // 销毁现有场景
    arSkill.destroy(threejsSceneRef.value);
    // 重新创建场景
    arSkill = new ARSkill(threejsSceneRef.value);
    // 创建当前场景的模型
    createSceneModel(activeScene.value);
    console.log('3D场景已重置');
  }
};

const toggleFullscreen = () => {
  if (threejsSceneRef.value) {
    if (!document.fullscreenElement) {
      threejsSceneRef.value.requestFullscreen().catch(err => {
        console.error(`全屏错误: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
};
</script>

<style scoped>
.ar-section {
  min-height: 80vh;
}

.ar-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.ar-section h2 {
  color: #c41e3a;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.ar-description {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 3rem;
}

.ar-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.ar-instructions {
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.ar-instructions h3 {
  color: #c41e3a;
  margin-bottom: 1rem;
}

.ar-instructions ol {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.ar-qrcode {
  text-align: center;
  padding: 1rem;
  border: 2px dashed #d4af37;
  border-radius: 10px;
  margin-top: 2rem;
}

.ar-qrcode img {
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
}

.ar-marker {
  text-align: center;
  padding: 1rem;
  border: 2px dashed #d4af37;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.ar-marker h4 {
  color: #c41e3a;
  margin-bottom: 1rem;
}

.marker-image {
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
}

/* 场景选择样式 */
.ar-scene-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.scene-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d4af37;
  background-color: transparent;
  color: #c41e3a;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.scene-btn:hover {
  background-color: #d4af37;
  color: #c41e3a;
  transform: translateY(-2px);
}

.scene-btn.active {
  background-color: #c41e3a;
  color: #fff;
  border-color: #c41e3a;
}

/* 场景按钮焦点样式 */
.scene-btn:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

.ar-scene-container {
  width: 100%;
  height: 400px;
  border: 2px solid #d4af37;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}

.threejs-scene {
  width: 100%;
  height: 100%;
}

.ar-info {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  z-index: 10;
}

.info-content h4 {
  color: #c41e3a;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.info-content p {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.info-content ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.8rem;
  line-height: 1.3;
}

.info-content li {
  margin-bottom: 0.3rem;
}

.info-icon {
  font-size: 1.5rem;
  display: block;
  text-align: center;
  margin-bottom: 0.5rem;
}



.ar-preview {
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.ar-preview h3 {
  color: #c41e3a;
  margin-bottom: 1rem;
}

.ar-model {
  position: relative;
}

.ar-model img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.ar-controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d4af37;
  background-color: transparent;
  color: #c41e3a;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  background-color: #d4af37;
  color: #c41e3a;
  transform: translateY(-2px);
}

/* 按钮焦点样式 */
.control-btn:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 禁用按钮样式 */
.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f0f0f0;
  color: #999;
}

/* 图片焦点样式 */
.marker-image:focus,
.qrcode-image:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 可访问性改进 */
.ar-instructions ol,
.fallback-content ul {
  line-height: 1.6;
}

/* 响应式设计改进 */
@media (max-width: 768px) {
  .ar-content {
    grid-template-columns: 1fr;
  }
  
  .ar-scene-selector {
    flex-direction: column;
    align-items: center;
  }
  
  .scene-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .scene-preview-list {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}

@media (max-width: 480px) {
  .ar-section h2 {
    font-size: 2rem;
  }
  
  .marker-image,
  .qrcode-image {
    max-width: 100%;
    height: auto;
  }
  
  .ar-scene-container {
    height: 300px;
  }
  
  .scene-preview-item {
    padding: 0.8rem;
  }
  
  .scene-preview-img {
    height: 80px;
  }
}

/* 确保图片可以获取焦点 */
.marker-image,
.qrcode-image {
  display: block;
  margin: 0 auto;
}

/* 提高对比度 */
.fallback-content h4 {
  color: #c41e3a;
  margin-bottom: 1rem;
}

.fallback-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.fallback-content ul {
  margin-bottom: 1rem;
}
</style>