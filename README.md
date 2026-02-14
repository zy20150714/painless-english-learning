# 无痛英语：轻松学单词

一款基于React Native和智谱AI GLM-4.7-FLASH模型的英语学习App，提供无痛、高效的单词学习体验。

## 功能特性

- **无痛学习**：游戏化、碎片化、多感官输入降低记忆负担
- **无需注册**：即开即用，保护隐私，减少使用门槛
- **AI辅助**：利用GLM-4.7-FLASH模型提供智能学习体验
- **个性化**：根据学习行为动态调整内容
- **科学方法**：结合间隔重复、联想记忆、艾宾浩斯曲线等原理

## 技术栈

- **前端**：React Native + Expo
- **导航**：React Navigation
- **UI库**：React Native Paper
- **AI模型**：智谱AI GLM-4.7-FLASH
- **网络请求**：Axios
- **本地存储**：AsyncStorage

## 快速开始

### 1. 环境准备

- Node.js 16.0 或更高版本
- npm 或 yarn
- Expo CLI

### 2. 安装依赖

```bash
# 安装Expo CLI（如果尚未安装）
npm install -g expo-cli

# 安装项目依赖
npm install
```

### 3. 启动项目

```bash
# 启动开发服务器
npx expo start

# 或直接启动Web版本
npx expo start --web
```

### 4. 运行应用

- **Web浏览器**：在终端中按 `w` 键，或在浏览器中打开 `http://localhost:8081`
- **iOS模拟器**：在终端中按 `i` 键
- **Android模拟器**：在终端中按 `a` 键
- **手机端**：使用Expo Go应用扫描终端中的二维码

## 项目结构

```
├── App.js                 # 应用入口文件
├── package.json           # 项目配置和依赖
├── babel.config.js        # Babel转译配置
├── app.json               # Expo项目配置
├── metro.config.js        # Metro构建配置
├── src/                   # 源代码目录
│   ├── components/        # 通用组件
│   ├── screens/           # 页面组件
│   ├── services/          # 服务层
│   ├── theme.js           # 主题配置
│   └── redux/             # Redux状态管理
└── assets/                # 静态资源
```

## 核心功能

1. **单词学习**：单词卡片、发音播放、词根分析、联想记忆
2. **复习系统**：基于艾宾浩斯曲线的智能复习提醒
3. **自适应测试**：多种题型（选择题、填空题、翻译题）
4. **资源库**：单词分类管理、发音库、拓展资源
5. **AI辅助**：智能词义拆解、个性化例句生成、发音评估
6. **API密钥配置**：支持用户输入和测试智谱AI API密钥
7. **夜间模式**：护眼背景，保护视力
8. **响应式布局**：适配不同屏幕尺寸

## 智谱AI API配置

1. 访问智谱AI官网 (https://www.zhipuai.cn/)
2. 注册并登录账号
3. 在控制台创建API密钥
4. 在App的设置页面配置API密钥

## 注意事项

- 首次启动时，需要在设置页面配置智谱AI API密钥以使用AI功能
- 应用支持离线使用，但AI功能需要网络连接
- 首次运行可能需要下载一些依赖和构建文件，请耐心等待
- 部分功能暂时可能有bug和无法使用的现象，敬请谅解

## 开发说明

### 安装新依赖

```bash
# 使用Expo安装依赖
npx expo install <package-name>
```

### 构建Web版本

```bash
# 构建Web版本
npx expo export --platform web
```

## 许可证

MIT License

## 联系我们

如有问题或建议，请随时联系我们。
