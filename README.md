# ChunXi-AR

## 项目简介
ChunXi-AR 是一个融合增强现实（AR）技术的新春祝福互动网站，旨在通过现代前端技术和创新交互方式，为用户带来沉浸式的春节文化体验。

## 技术栈
- **前端框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **状态管理**：Pinia
- **样式处理**：原生 CSS
- **3D 渲染**：Three.js
- **动画库**：GSAP
- **实用工具**：@vueuse/core

## 功能特性

### 核心功能
1. **增强现实（AR）体验**：通过 AR 技术展示新春主题的 3D 模型
2. **祝福卡片生成**：用户可以生成个性化的新春祝福卡片
3. **互动游戏**：包含猜灯谜、美食知识问答等互动游戏
4. **文化展示**：展示中国传统春节文化和习俗
5. **祝福墙**：用户可以发布和浏览新春祝福

### 技术亮点
- **响应式设计**：适配不同设备屏幕尺寸
- **性能优化**：实现了资源预加载、懒加载等性能优化策略
- **类型安全**：使用 TypeScript 确保代码类型安全
- **模块化架构**：采用技能模块（Skill）的模块化设计，便于功能扩展
- **现代化构建**：使用 Vite 构建工具，提升开发和构建效率

## 项目结构

```
ChunXi-AR/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 通用组件
│   ├── skills/          # 技能模块
│   ├── stores/          # 状态管理
│   ├── utils/           # 工具函数
│   ├── views/           # 页面组件
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── public/              # 公共资源
├── tests/               # 测试文件
├── .github/             # GitHub 配置
├── package.json         # 项目配置
├── vite.config.ts       # Vite 配置
└── README.md            # 项目说明
```

## 安装和运行

### 前提条件
- Node.js 16.0 或更高版本
- npm 7.0 或更高版本

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

### 运行测试
```bash
npm run test
```

## 部署说明

项目使用 GitHub Actions 自动部署到 GitHub Pages。部署流程如下：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动执行构建和部署
3. 部署完成后，网站可通过以下 URL 访问：
   ```
   https://zhuliangdb.github.io/ChunXi-AR/
   ```

### 手动部署（可选）
1. 构建生产版本：`npm run build`
2. 进入 `dist` 目录
3. 初始化 git 仓库并推送到 `gh-pages` 分支

## 技能模块（Skills）

项目采用技能模块的设计模式，每个技能模块封装了特定的功能：

- **skill-animation**：动画相关功能
- **skill-ar**：增强现实相关功能
- **skill-wishes**：祝福相关功能

## 开发指南

### 代码规范
- 使用 TypeScript 进行类型定义
- 组件命名使用 PascalCase
- 变量和函数命名使用 camelCase
- 常量命名使用 UPPER_CASE_WITH_UNDERSCORES
- 文件和目录命名使用 kebab-case

### 提交规范
- 提交信息格式：`类型(范围): 描述`
- 类型包括：feat（新功能）、fix（修复）、docs（文档）、style（样式）、refactor（重构）、test（测试）、chore（构建/依赖）

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/feature-name`
3. 提交更改：`git commit -m "feat: 添加新功能"`
4. 推送到分支：`git push origin feature/feature-name`
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 联系方式

- 项目地址：https://github.com/zhuliangdb/ChunXi-AR
- 部署地址：https://zhuliangdb.github.io/ChunXi-AR/

---

**祝大家新春快乐，万事如意！** 🎉
