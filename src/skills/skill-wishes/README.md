# 祝福技能模块 (skill-wishes)

## 功能描述

该技能模块提供春节祝福系统的核心功能，包括祝福卡片生成、祝福管理、点赞功能等，用于增强用户的互动体验。

## 主要功能

- **祝福管理**：添加、获取、删除祝福
- **点赞功能**：为祝福点赞和取消点赞
- **祝福卡片生成**：生成美观的祝福卡片HTML
- **随机祝福生成**：生成随机的春节祝福内容

## 安装和使用

### 导入方式

```typescript
import WishesSkill from '@/skills/skill-wishes';
```

### 使用示例

```typescript
// 创建祝福技能实例
const wishesSkill = new WishesSkill();

// 添加祝福
wishesSkill.addWish('小明', '新年快乐！万事如意！');

// 获取祝福列表
const wishes = wishesSkill.getWishes();

// 为祝福点赞
wishesSkill.likeWish(wishes[0].id);

// 删除祝福
wishesSkill.deleteWish(wishes[0].id);

// 生成祝福卡片
const wishCard = wishesSkill.generateWishCard(wishes[0]);
document.querySelector('.wishes-container').innerHTML = wishCard;

// 生成随机祝福
const randomWish = wishesSkill.generateRandomWish();
console.log('随机祝福:', randomWish);
```

## 配置选项

| 方法 | 参数 | 描述 |
|------|------|------|
| constructor | maxWishes: number = 100 | 创建祝福技能实例，默认最大祝福数量为100 |
| addWish | name: string, content: string | 添加祝福，返回添加结果 |
| getWishes | 无 | 获取祝福列表 |
| likeWish | id: string | 为祝福点赞，返回点赞结果 |
| deleteWish | id: string | 删除祝福，返回删除结果 |
| generateWishCard | wish: Wish | 生成祝福卡片HTML |
| generateRandomWish | 无 | 生成随机祝福内容 |

## 数据结构

### Wish 接口

```typescript
interface Wish {
  id: string;           // 祝福ID
  name: string;         // 祝福人姓名
  content: string;      // 祝福内容
  time: string;         // 祝福时间
  likes: number;        // 点赞数量
  isLiked: boolean;     // 是否已点赞
}
```

## 依赖

- **Vue 3**：使用Vue的响应式系统管理祝福数据

## 注意事项

- 默认最大祝福数量为100，可根据实际需求调整
- 祝福数据存储在内存中，刷新页面后会丢失，建议在实际应用中添加持久化存储

## 性能优化建议

- 对于大量祝福数据，考虑实现分页加载
- 使用虚拟滚动技术优化长列表渲染
- 考虑使用本地存储或后端数据库实现祝福数据的持久化