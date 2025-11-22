# Recent Updates / 最近更新

## Latest Version / 最新版本

### New Features / 新功能 🎉

#### 1. 🌐 Built-in Bing Web Search / 内置必应联网搜索
- AI can search the web for latest information / AI 可以联网搜索最新信息
- User-controlled toggle in status bar / 用户可通过状态栏开关控制
- No API key required / 无需 API 密钥

#### 2. 💭 AI Thinking Process Visualization / AI 思考过程可视化
- Display AI's reasoning process in collapsible panels / 在折叠面板中显示 AI 的推理过程
- Supports `<think>` and `<\think>` tags / 支持 `<think>` 和 `<\think>` 标签
- Orange-themed UI with lightbulb icon / 橙色主题配灯泡图标

#### 3. ⚡ Real-time Server Latency Monitoring / 实时服务器延迟监控
- Auto-check every 5 seconds / 每 5 秒自动检测
- Color-coded: 🟢 <50ms, 🟡 50-150ms, 🔴 >150ms / 颜色编码
- Displayed in status bar / 在状态栏显示

#### 4. 🎯 Shell Prompt Display / Shell 提示符显示
- Auto-fetch and display PS1 from connected servers / 自动获取并显示服务器提示符
- Shows username, hostname, and current path / 显示用户名、主机名和当前路径
- Green-bordered card below messages / 消息下方的绿色卡片

### Documentation / 文档 📚

**New Chinese Documentation / 新增中文文档：**
- `docs/USER_GUIDE_CN.md` - Comprehensive user guide / 详细用户指南
- `docs/TECHNICAL_DETAILS_CN.md` - Technical implementation / 技术实现详解
- `docs/NEW_FEATURES_CN.md` - New features guide / 新功能指南
- `FEATURE_SUMMARY_CN.md` - Feature summary / 功能更新总结

**Updated / 更新：**
- `README_CN.md` - Updated with new features / 添加新功能说明
- `docs/MCP_INTEGRATION.md` - Added Bing search tool / 添加必应搜索工具

### Technical Improvements / 技术改进 🔧

**New Modules / 新模块：**
- `src/lib/BingSearchTool.ts` - Web search implementation / 网络搜索实现

**Updated Modules / 更新模块：**
- `src/lib/MCPClient.ts` - Integrated web search / 集成网络搜索
- `src/lib/ServerManager.ts` - Added latency check & prompt fetch / 添加延迟检测和提示符获取
- `src/renderer/components/ChatMessage.tsx` - Thinking & prompt display / 思考过程和提示符显示
- `src/renderer/components/StatusBar.tsx` - Web search toggle & latency / 搜索开关和延迟显示

**Type System / 类型系统：**
- Enhanced `AIMessage` with `prompt` field / 增强 AIMessage
- Enhanced `ServerConfig` with `latency` and `lastChecked` / 增强 ServerConfig
- Extended `ElectronAPI` with new methods / 扩展 ElectronAPI

**New IPC Channels / 新增 IPC 通道：**
- `check-server-latency` - Latency detection / 延迟检测
- `get-server-prompt` - Prompt retrieval / 提示符获取
- `set-web-search-enabled` - Toggle search / 切换搜索
- `get-web-search-enabled` - Get search status / 获取搜索状态
- `web-search` - Execute search / 执行搜索

### UI/UX Enhancements / 界面体验优化 🎨

- 💭 Collapsible thinking panels with orange theme / 橙色折叠思考面板
- 🎯 Green prompt cards with terminal icon / 绿色提示符卡片
- ⚡ Color-coded latency indicator / 颜色编码延迟指示器
- 🌐 Web search toggle with visual feedback / 搜索开关可视化反馈
- 📊 Enhanced status bar with more information / 增强状态栏信息

### Internationalization / 国际化 🌍

All new features support both Chinese and English:
所有新功能支持中英文：

- AI Thinking / AI 正在思考
- Prompt / 提示符
- Latency / 延迟
- Web Search Enabled/Disabled / 联网搜索已启用/已禁用
- And more... / 等等...

---

## How to Use / 如何使用

### Enable Web Search / 启用联网搜索
1. Look at the status bar at the bottom / 查看底部状态栏
2. Find "Web Search" toggle / 找到"联网搜索"开关
3. Click to enable/disable / 点击启用/禁用

### View AI Thinking / 查看 AI 思考
1. When AI responds with thinking process / 当 AI 回复包含思考过程时
2. Click on "💡 AI Thinking" panel / 点击"💡 AI 正在思考"面板
3. Read the detailed reasoning / 阅读详细推理过程

### Monitor Server Latency / 监控服务器延迟
1. Connect to a server / 连接到服务器
2. Check status bar for latency / 查看状态栏延迟
3. Color indicates network quality / 颜色表示网络质量

### View Shell Prompt / 查看 Shell 提示符
1. Connect to a server / 连接到服务器
2. Prompt appears below AI messages / 提示符出现在 AI 消息下方
3. Shows current environment / 显示当前环境

---

## Documentation Links / 文档链接

- [User Guide (CN)](docs/USER_GUIDE_CN.md) - 用户指南
- [Technical Details (CN)](docs/TECHNICAL_DETAILS_CN.md) - 技术详解
- [New Features Guide (CN)](docs/NEW_FEATURES_CN.md) - 新功能指南
- [Feature Summary (CN)](FEATURE_SUMMARY_CN.md) - 功能总结
- [MCP Integration](docs/MCP_INTEGRATION.md) - MCP 集成指南

---

## Feedback / 反馈

Found a bug or have a suggestion?
发现 bug 或有建议？

- 📧 Email: support@orangeterm.com
- 💬 GitHub Issues: https://github.com/yourusername/orangeterm/issues

---

**Enjoy OrangeTerm! / 享受 OrangeTerm！** 🍊✨
