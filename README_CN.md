# 橙子终端 (OrangeTerm)

<div align="center">
  <img src="https://img.shields.io/badge/语言-中文-orange" alt="中文">
  <img src="https://img.shields.io/badge/Electron-28.0-orange" alt="Electron">
  <img src="https://img.shields.io/badge/React-18.2-orange" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.3-orange" alt="TypeScript">
</div>

## 📖 简介

橙子终端是一款完全由 AI 驱动的桌面客户端，专为自主运维操作设计。它具有自动化决策和执行能力，可实现完全无人值守的智能运维管理。

### ✨ 主要特性

- 🌏 **完整中文支持** - 全面的中文界面和文档
- 🖥️ **多服务器管理** - 支持添加和管理多台服务器
- 🔍 **自动检测配置** - 连接服务器时自动检测 CPU、内存、磁盘等配置信息
- ⚡ **实时延迟监控** - 每 5 秒自动检测服务器网络延迟，实时显示连接质量
- 🌐 **内置必应搜索** - AI 可以联网搜索最新信息，用户可自由开启/关闭
- 💭 **AI 思考过程可视化** - 显示 AI 模型的推理过程（支持 `<think>` 标签）
- 🎯 **提示符显示** - 自动获取并显示远程服务器的 shell 提示符
- 🎨 **优化的橙色主题** - 精美的橙色渐变设计，视觉效果出众
- 🤖 **AI 智能助手** - 通过 MCP 协议与 AI 模型深度集成
- 🔒 **虚拟凭证映射** - 保护敏感凭证信息的安全
- ⚡ **多种授权模式** - 全手动、高风险手动、全自动三种模式
- 📚 **内置知识库** - Linux 命令参考和最佳实践
- 🎯 **命令风险分析** - 自动识别和警告高风险操作

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建应用

```bash
npm run build
```

### 打包为可执行文件

Windows (.exe):
```bash
npm run package
```

打包完成后，可执行文件位于 `release` 目录中。

## 📋 功能详解

### 1. 多服务器管理

- **添加服务器**: 支持通过 SSH 连接到远程服务器
- **自动检测**: 连接成功后自动检测服务器配置信息
  - CPU 型号和核心数
  - 内存总量、已用、可用和使用率
  - 磁盘总量、已用、可用和使用率
  - 操作系统版本
  - 系统运行时间
- **服务器切换**: 在多台服务器之间快速切换
- **实时状态**: 显示服务器连接状态和系统信息
- **延迟监控**: 自动检测并显示服务器网络延迟（每 5 秒刷新）
  - 🟢 < 50ms：网络状况极佳
  - 🟡 50-150ms：网络状况良好
  - 🔴 > 150ms：网络可能存在问题
- **提示符显示**: 自动获取并显示远程服务器的 shell 提示符（PS1）

### 2. 中文界面

- 完整的中文翻译
- 支持中英文切换（点击右上角语言按钮）
- 所有组件和提示信息都支持多语言

### 3. AI 智能对话

- 与 AI 助手进行自然语言对话
- AI 可以理解你的意图并生成相应的 Linux 命令
- 支持命令执行和结果反馈
- **AI 思考过程可视化**：AI 模型返回的 `<think>` 或 `<\think>` 标签内容会以特殊样式展示
- **联网搜索功能**：通过必应搜索获取最新技术信息，用户可通过状态栏开关控制

### 4. 授权模式

- **全部手动**: 所有命令执行前都需要授权
- **高风险手动**: 仅高风险命令需要授权
- **全自动**: 命令自动执行，无需授权

### 5. 命令风险分析

系统会自动分析命令的风险级别：
- 系统修改命令（rm、format 等）
- 权限提升命令（sudo、su 等）
- 网络操作命令
- 数据库操作命令

## 🎨 界面设计

### 橙色主题

橙子终端采用精心设计的橙色渐变主题：
- 主色调：橙色 (#ff8c00, #ffa500)
- 深色背景：保护眼睛，适合长时间使用
- 渐变效果：现代化的视觉体验
- 圆角设计：友好温暖的界面风格

### 布局优化

- **标签式导航**: 对话和服务器管理分开显示
- **实时状态栏**: 底部显示系统状态和当前连接的服务器
- **响应式设计**: 适配不同屏幕尺寸

## 🛠️ 技术栈

- **Electron 28**: 跨平台桌面应用框架
- **React 18**: 现代化的 UI 框架
- **TypeScript**: 类型安全的开发体验
- **Ant Design 5**: 企业级 UI 组件库
- **Vite**: 快速的构建工具
- **SSH2**: SSH 连接和远程命令执行

## 📁 项目结构

```
src/
├── main/              # Electron 主进程
│   └── main.ts       # 主进程入口，IPC 处理
├── preload/          # 预加载脚本
│   └── preload.ts    # IPC 桥接层
├── renderer/         # React 渲染进程
│   ├── components/   # UI 组件
│   │   ├── ServerList.tsx        # 服务器列表
│   │   ├── ServerForm.tsx        # 服务器表单
│   │   ├── ChatContainer.tsx     # 聊天容器
│   │   ├── CommandInput.tsx      # 命令输入
│   │   └── ...
│   ├── contexts/     # React 上下文
│   │   ├── LanguageContext.tsx   # 语言切换
│   │   ├── ServerContext.tsx     # 服务器管理
│   │   ├── AuthContext.tsx       # 授权模式
│   │   └── MessageContext.tsx    # 消息管理
│   └── App.tsx       # 应用根组件
├── lib/              # 核心业务逻辑
│   ├── ServerManager.ts          # 服务器管理（延迟检测、提示符获取）
│   ├── i18n.ts                   # 国际化（完整中英文翻译）
│   ├── CredentialMapper.ts       # 凭证映射
│   ├── CommandRiskAnalyzer.ts    # 风险分析
│   ├── KnowledgeBase.ts          # 知识库
│   ├── MCPClient.ts              # MCP 客户端（联网搜索集成）
│   └── BingSearchTool.ts         # 必应搜索工具
└── types/            # TypeScript 类型定义
    └── index.ts
```

## 🔧 配置

### MCP 配置

在项目根目录创建 `mcp-config.json`:

```json
{
  "command": "npx",
  "args": ["-y", "@anthropic/mcp-server-filesystem"],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 服务器配置

在应用内通过"服务器管理"标签添加服务器：

1. 点击"添加服务器"按钮
2. 填写服务器信息：
   - 服务器名称
   - 主机地址
   - 端口（默认 22）
   - 用户名
   - 密码
3. 点击"自动检测配置"测试连接并获取系统信息
4. 点击"保存"保存服务器配置

## 🔐 安全特性

- **虚拟凭证映射**: 在 UI 中使用虚拟 IP 和密码，真实凭证仅在后端使用
- **命令风险分析**: 自动识别危险命令
- **多级授权**: 灵活的授权策略
- **上下文隔离**: Electron 的 contextIsolation 确保安全性

## 📝 开发指南

### 开发命令

```bash
# 开发模式（热重载）
npm run dev

# 构建生产版本
npm run build

# 仅构建渲染进程
npm run build:renderer

# 仅构建主进程
npm run build:main

# 代码检查
npm run lint

# 类型检查
npm run type-check

# 打包应用
npm run package
```

### 添加新功能

1. 在 `src/lib/i18n.ts` 中添加翻译
2. 在 `src/types/index.ts` 中定义类型
3. 实现核心逻辑（如需要）
4. 在 `src/renderer/components/` 中创建 UI 组件
5. 在 `App.tsx` 中集成新功能

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 📄 许可证

ISC License

## 🎯 后续计划

- [x] 实时延迟监控
- [x] 联网搜索功能（必应搜索）
- [x] AI 思考过程可视化
- [x] 提示符显示
- [ ] 支持密钥认证
- [ ] 会话保持和断线重连
- [ ] 命令历史记录
- [ ] 服务器分组管理
- [ ] 批量操作多台服务器
- [ ] 更多系统监控指标
- [ ] 日志查看和分析
- [ ] 配置文件备份和恢复
- [ ] 更多 MCP 工具集成

---

<div align="center">
  <p>用 ❤️ 和 🍊 制作</p>
</div>
