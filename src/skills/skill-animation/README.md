# 动画技能模块 (skill-animation)

## 功能描述

该技能模块提供春节主题的动画效果，基于GSAP库实现各种流畅的动画效果，用于增强用户体验。

## 主要功能

- **春节主题入场动画**：为页面元素创建带有春节氛围的入场效果
- **春节主题强调动画**：为重要元素创建循环的强调动画
- **春节主题背景动画**：为背景元素创建流畅的滚动效果

## 安装和使用

### 安装依赖

```bash
npm install gsap
```

### 导入方式

```typescript
import AnimationSkill from '@/skills/skill-animation';
```

### 使用示例

```typescript
// 创建入场动画
const heroElement = document.querySelector('.hero-section');
AnimationSkill.createSpringFestivalEntrance(heroElement);

// 创建强调动画
const buttonElement = document.querySelector('.btn-primary');
AnimationSkill.createSpringFestivalEmphasis(buttonElement);

// 创建背景动画
const backgroundElement = document.querySelector('.background-decoration');
AnimationSkill.createSpringFestivalBackground(backgroundElement);
```

## 配置选项

| 方法 | 参数 | 描述 |
|------|------|------|
| createSpringFestivalEntrance | element: HTMLElement, duration: number = 1.2 | 创建入场动画，默认持续时间1.2秒 |
| createSpringFestivalEmphasis | element: HTMLElement, duration: number = 0.8 | 创建强调动画，默认持续时间0.8秒 |
| createSpringFestivalBackground | element: HTMLElement, duration: number = 20 | 创建背景动画，默认持续时间20秒 |

## 依赖

- **GSAP**：用于实现高性能的动画效果

## 注意事项

- 确保在使用前正确导入GSAP库
- 对于大型元素，建议适当调整动画持续时间以获得最佳效果
- 避免在同一元素上同时应用多个动画，可能会导致冲突
