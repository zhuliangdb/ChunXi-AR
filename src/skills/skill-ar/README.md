# AR技能模块 (skill-ar)

## 功能描述

该技能模块提供基于Three.js的增强现实功能，用于展示春节主题的3D模型和AR效果，增强用户的沉浸式体验。

## 主要功能

- **3D场景创建**：基于Three.js创建春节主题的3D场景
- **春节主题模型**：提供灯笼、鞭炮、老虎等春节主题的3D模型
- **动画效果**：为3D模型添加旋转和其他动画效果
- **响应式设计**：自动适应不同屏幕尺寸

## 安装和使用

### 安装依赖

```bash
npm install three
```

### 导入方式

```typescript
import ARSkill from '@/skills/skill-ar';
```

### 使用示例

```typescript
// 创建AR场景
const container = document.querySelector('.ar-container');
const arSkill = new ARSkill(container);

// 创建灯笼模型
const lantern = arSkill.createSpringFestivalModel('lantern');

// 创建鞭炮模型
const firecracker = arSkill.createSpringFestivalModel('firecracker');

// 创建老虎模型
const tiger = arSkill.createSpringFestivalModel('tiger');

// 销毁AR场景（在组件卸载时）
arSkill.destroy(container);
```

## 配置选项

| 方法 | 参数 | 描述 |
|------|------|------|
| constructor | container: HTMLElement | 创建AR场景，传入容器元素 |
| createSpringFestivalModel | type: 'lantern' \| 'firecracker' \| 'tiger' | 创建春节主题的3D模型 |
| destroy | container: HTMLElement | 销毁AR场景，清理资源 |

## 依赖

- **Three.js**：用于创建和渲染3D场景

## 注意事项

- 确保在使用前正确导入Three.js库
- 对于移动设备，建议适当调整模型复杂度以保证性能
- 在组件卸载时，务必调用destroy方法清理资源，避免内存泄漏

## 性能优化建议

- 对于复杂场景，考虑使用模型简化技术
- 合理控制灯光数量，避免过多灯光影响性能
- 在不活动时暂停动画循环，减少CPU占用