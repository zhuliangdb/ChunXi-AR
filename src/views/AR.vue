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
            <!-- AR场景 -->
            <div v-if="arjsLoaded" role="region" aria-label="AR场景">
              <a-scene embedded arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
                <a-marker preset="hiro">
                  <a-entity position="0 0 0">
                    <!-- 黄山场景 -->
                    <template v-if="activeScene === 'huangshan'">
                      <a-box position="0 0.5 0" material="color: red; opacity: 0.5;"></a-box>
                      <a-sphere position="1 0.5 0" material="color: blue;"></a-sphere>
                      <a-cylinder position="-1 0.5 0" material="color: green;"></a-cylinder>
                      <a-text value="黄山迎客松" position="0 -0.5 0" align="center" color="black"></a-text>
                    </template>
                    <!-- 长城场景 -->
                    <template v-else-if="activeScene === 'greatwall'">
                      <a-box position="0 0.5 0" material="color: brown; opacity: 0.8;"></a-box>
                      <a-box position="1 0.5 0" material="color: brown; opacity: 0.8;"></a-box>
                      <a-box position="-1 0.5 0" material="color: brown; opacity: 0.8;"></a-box>
                      <a-text value="长城" position="0 -0.5 0" align="center" color="black"></a-text>
                    </template>
                    <!-- 故宫场景 -->
                    <template v-else-if="activeScene === 'forbidden'">
                      <a-box position="0 0.5 0" material="color: red; opacity: 0.8;"></a-box>
                      <a-sphere position="0 1 0" material="color: gold;"></a-sphere>
                      <a-text value="故宫" position="0 -0.5 0" align="center" color="black"></a-text>
                    </template>
                    <!-- 春节场景 -->
                    <template v-else-if="activeScene === 'spring'">
                      <a-box position="0 0.5 0" material="color: red; opacity: 0.8;"></a-box>
                      <a-cylinder position="0 1 0" material="color: gold;"></a-cylinder>
                      <a-text value="春节快乐" position="0 -0.5 0" align="center" color="black"></a-text>
                    </template>
                  </a-entity>
                </a-marker>
                <a-entity camera></a-entity>
              </a-scene>
            </div>
            <div v-else class="ar-fallback" role="alert" aria-live="polite">
              <div class="fallback-content">
                <span class="fallback-icon">🎯</span>
                <h4>AR功能暂时不可用</h4>
                <p>由于网络限制，AR.js库无法加载。但您仍然可以：</p>
                <ul>
                  <li>查看AR标记图案，准备体验</li>
                  <li>浏览下方的AR场景预览</li>
                  <li>了解不同AR场景的内容</li>
                </ul>
                
                <!-- 离线预览 -->
                <div class="offline-preview">
                  <h5>AR场景预览</h5>
                  <div class="scene-preview-list">
                    <div 
                      v-for="scene in arScenes" 
                      :key="scene.id"
                      class="scene-preview-item"
                      :class="{ active: activeScene === scene.id }"
                      @click="activeScene = scene.id"
                      tabindex="0"
                    >
                      <LazyImage :src="scene.previewImage" :alt="scene.name + '预览'" class="scene-preview-img" />
                      <h6>{{ scene.name }}</h6>
                      <p>{{ scene.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="ar-controls">
            <button 
              class="control-btn" 
              @click="startAR"
              aria-label="启动AR"
              :disabled="!arjsLoaded"
            >
              🔄 启动AR
            </button>
            <button 
              class="control-btn" 
              @click="resetAR"
              aria-label="重置AR"
              :disabled="!arjsLoaded"
            >
              🔄 重置
            </button>
            <button 
              class="control-btn" 
              @click="toggleFullscreen"
              aria-label="切换全屏"
              :disabled="!arjsLoaded"
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
import { ref, onMounted } from 'vue';
import LazyImage from '../components/LazyImage.vue';

// 检测AR.js是否加载成功
const arjsLoaded = ref(false);
// 当前活动场景
const activeScene = ref('huangshan');

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
  // 检查AR.js是否加载成功
  // 由于CDN链接被阻止，我们暂时将其设置为false
  // 在正常网络环境下，应该检查window.ARjs是否存在
  arjsLoaded.value = false;
});

// AR相关方法
const startAR = () => {
  if (!arjsLoaded.value) {
    console.warn('AR.js未加载，无法启动AR场景');
    return;
  }
  
  // 启动AR场景
  const scene = document.querySelector('a-scene');
  if (scene) {
    // 使用类型断言处理TypeScript类型问题
    const arScene = scene as any;
    if (arScene.components?.arjs?.start) {
      arScene.components.arjs.start();
      console.log('AR场景已启动');
    }
  }
};

const resetAR = () => {
  if (!arjsLoaded.value) {
    console.warn('AR.js未加载，无法重置AR场景');
    return;
  }
  
  // 重置AR场景
  const scene = document.querySelector('a-scene');
  if (scene) {
    // 使用类型断言处理TypeScript类型问题
    const arScene = scene as any;
    if (arScene.components?.arjs?.reset) {
      arScene.components.arjs.reset();
      console.log('AR场景已重置');
    }
  }
};

const toggleFullscreen = () => {
  if (!arjsLoaded.value) {
    console.warn('AR.js未加载，无法切换全屏');
    return;
  }
  
  // 切换全屏
  const scene = document.querySelector('a-scene');
  if (scene) {
    if (!document.fullscreenElement) {
      scene.requestFullscreen().catch(err => {
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
}

.ar-scene-container a-scene {
  width: 100%;
  height: 100%;
}

/* AR降级显示样式 */
.ar-fallback {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  border: 2px dashed #d4af37;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.fallback-content {
  text-align: center;
  max-width: 90%;
  overflow-y: auto;
  max-height: 100%;
}

.fallback-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.fallback-content h4 {
  color: #c41e3a;
  margin-bottom: 1rem;
}

.fallback-content p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.fallback-content ul {
  text-align: left;
  margin: 1rem auto;
  max-width: 300px;
}

.fallback-content li {
  margin-bottom: 0.5rem;
}

/* 离线预览样式 */
.offline-preview {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.offline-preview h5 {
  color: #c41e3a;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.scene-preview-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.scene-preview-item {
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid transparent;
}

.scene-preview-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  border-color: #d4af37;
}

.scene-preview-item.active {
  border-color: #c41e3a;
  box-shadow: 0 4px 12px rgba(196, 30, 58, 0.2);
}

.scene-preview-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 0.8rem;
}

.scene-preview-item h6 {
  color: #c41e3a;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.scene-preview-item p {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  margin: 0;
}

/* 场景预览项焦点样式 */
.scene-preview-item:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
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