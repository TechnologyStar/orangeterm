# OrangeTerm 技术详解

## 📋 目录

- [架构概览](#架构概览)
- [核心技术栈](#核心技术栈)
- [模块详解](#模块详解)
- [数据流](#数据流)
- [API 参考](#api-参考)
- [扩展开发](#扩展开发)

---

## 架构概览

OrangeTerm 采用经典的 Electron 三层架构，结合现代 React 技术栈，提供了安全、高效的桌面应用体验。

### 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                         Renderer Process                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                     React UI Layer                    │  │
│  │  - App.tsx (主应用)                                   │  │
│  │  - Components (UI 组件)                               │  │
│  │  - Contexts (状态管理)                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕ IPC (contextBridge)
┌─────────────────────────────────────────────────────────────┐
│                        Preload Script                        │
│  - 安全的 IPC 通信桥梁                                      │
│  - API 暴露 (electronAPI)                                   │
└─────────────────────────────────────────────────────────────┘
                              ↕ IPC (ipcMain)
┌─────────────────────────────────────────────────────────────┐
│                         Main Process                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Business Logic                     │  │
│  │  - ServerManager (服务器管理)                         │  │
│  │  - MCPClient (MCP 协议客户端)                         │  │
│  │  - BingSearchTool (联网搜索)                          │  │
│  │  - CredentialMapper (凭证映射)                        │  │
│  │  - CommandRiskAnalyzer (风险分析)                     │  │
│  │  - KnowledgeBase (知识库)                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                              ↕                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   External Services                   │  │
│  │  - SSH2 (服务器连接)                                  │  │
│  │  - HTTPS (必应搜索)                                   │  │
│  │  - File System (本地存储)                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 核心技术栈

### 前端技术

- **React 18**：现代化的 UI 框架
  - Hooks API
  - Context API 状态管理
  - 函数式组件

- **TypeScript**：类型安全
  - 完整的类型定义
  - 接口设计
  - 编译时检查

- **Ant Design 5**：企业级 UI 组件库
  - 暗色主题
  - 自定义橙色主色调
  - 丰富的组件库

- **Vite**：快速的构建工具
  - HMR 热更新
  - 快速的开发体验
  - 优化的生产构建

### 后端技术

- **Electron 28**：跨平台桌面框架
  - 进程隔离
  - Context Isolation
  - 安全的 IPC 通信

- **Node.js**：JavaScript 运行时
  - 异步 I/O
  - 丰富的 npm 生态

- **ssh2**：SSH 客户端库
  - SSH 协议实现
  - 命令执行
  - 文件传输（计划中）

### 构建和打包

- **electron-builder**：应用打包
  - Windows (NSIS)
  - Linux (AppImage, deb, rpm)
  - macOS (dmg, pkg)

---

## 模块详解

### 1. ServerManager (服务器管理器)

**位置**：`src/lib/ServerManager.ts`

**职责**：
- 管理多台服务器配置
- SSH 连接管理
- 命令执行
- 系统信息检测
- 延迟监控
- 提示符获取

**核心方法**：

```typescript
class ServerManager {
  // 添加服务器
  addServer(server: Omit<ServerConfig, 'id'>): ServerConfig
  
  // 连接服务器
  async connect(id: string): Promise<{ success: boolean; error?: string }>
  
  // 断开连接
  disconnect(id: string): void
  
  // 执行命令
  async executeCommand(id: string, command: string): Promise<{ output: string; error?: string }>
  
  // 检测系统信息
  async detectSystemInfo(id: string): Promise<ServerSystemInfo | null>
  
  // 检查延迟
  async checkLatency(id: string): Promise<number>
  
  // 获取提示符
  async getPrompt(id: string): Promise<string>
}
```

**实现细节**：

1. **连接管理**：
   - 使用 Map 存储活动连接
   - 自动重连机制（计划中）
   - 连接池管理

2. **延迟检测**：
   - 发送 `echo "ping"` 命令
   - 测量往返时间 (RTT)
   - 每 5 秒自动刷新

3. **系统信息检测**：
   ```bash
   # CPU 信息
   lscpu | grep "Model name"
   nproc
   
   # 内存信息
   free -h
   
   # 磁盘信息
   df -h /
   
   # 系统信息
   cat /etc/os-release
   uname -r
   uptime -p
   hostname
   ```

### 2. MCPClient (MCP 协议客户端)

**位置**：`src/lib/MCPClient.ts`

**职责**：
- MCP 协议通信
- 工具注册和调用
- 资源管理
- 联网搜索集成

**核心方法**：

```typescript
class MCPClient {
  // 初始化客户端
  async initialize(): Promise<void>
  
  // 发送消息
  async sendMessage(message: string): Promise<string>
  
  // 调用工具
  async callTool(toolName: string, parameters: Record<string, unknown>): Promise<MCPToolResult>
  
  // 设置联网搜索
  setWebSearchEnabled(enabled: boolean): void
  
  // 搜索网络
  async searchWeb(query: string): Promise<BingSearchResult>
  
  // 获取工具列表
  getTools(): MCPTool[]
}
```

**内置工具**：

1. **bing_search**：必应搜索工具
   ```typescript
   {
     name: 'bing_search',
     description: 'Search the web using Bing search engine',
     inputSchema: {
       type: 'object',
       properties: {
         query: { type: 'string' }
       },
       required: ['query']
     }
   }
   ```

### 3. BingSearchTool (必应搜索工具)

**位置**：`src/lib/BingSearchTool.ts`

**职责**：
- 必应搜索集成
- 结果解析
- HTML 清理

**实现原理**：

1. **发送 HTTPS 请求**：
   ```typescript
   const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
   ```

2. **解析搜索结果**：
   - 使用正则表达式提取标题
   - 提取搜索摘要
   - 限制返回前 5 条结果

3. **HTML 处理**：
   - 去除 HTML 标签
   - 提取纯文本内容
   - 格式化输出

**搜索结果格式**：

```typescript
interface BingSearchResult {
  success: boolean;
  query: string;
  results: string[];  // ["标题1: 摘要1", "标题2: 摘要2", ...]
  error?: string;
}
```

### 4. CredentialMapper (凭证映射器)

**位置**：`src/lib/CredentialMapper.ts`

**职责**：
- 虚拟凭证生成
- 真实凭证映射
- 命令转换

**映射机制**：

```typescript
// 虚拟凭证 -> 真实凭证
虚拟 IP: 192.168.100.x  ->  真实 IP: 203.0.113.x
虚拟密码: virtual_pass_* ->  真实密码: actual_password

// 命令转换
输入: ssh user@192.168.100.1
输出: ssh user@203.0.113.45
```

**安全性**：
- 虚拟凭证使用确定性算法生成
- 映射关系仅存在内存中
- 不会记录到日志或历史

### 5. CommandRiskAnalyzer (命令风险分析器)

**位置**：`src/lib/CommandRiskAnalyzer.ts`

**职责**：
- 分析命令风险级别
- 识别危险操作
- 提供风险提示

**风险级别**：

1. **低风险 (low)**：
   - 查看类命令：`ls`, `cat`, `echo`
   - 信息获取：`ps`, `top`, `df`

2. **中风险 (medium)**：
   - 文件编辑：`vi`, `nano`
   - 软件安装：`apt install`, `yum install`

3. **高风险 (high)**：
   - 删除操作：`rm -rf`, `rmdir`
   - 格式化：`mkfs`, `fdisk`
   - 系统控制：`shutdown`, `reboot`
   - 权限修改：`chmod 777`

**分析规则**：

```typescript
interface RiskPattern {
  pattern: RegExp;
  riskLevel: 'low' | 'medium' | 'high';
  reason: string;
}

const highRiskPatterns: RiskPattern[] = [
  {
    pattern: /rm\s+-rf\s+\//,
    riskLevel: 'high',
    reason: '删除根目录下的文件，极其危险！'
  },
  {
    pattern: /chmod\s+777/,
    riskLevel: 'high',
    reason: '将文件权限设置为 777，存在安全风险'
  },
  // ... 更多规则
];
```

### 6. KnowledgeBase (知识库)

**位置**：`src/lib/KnowledgeBase.ts`

**职责**：
- 存储常用命令
- 提供命令建议
- 快速查询

**数据结构**：

```typescript
interface KnowledgeBaseEntry {
  command: string;        // 命令名称
  description: string;    // 命令描述
  usage: string;          // 使用方法
  examples?: string[];    // 示例
  riskLevel?: 'low' | 'medium' | 'high';  // 风险级别
}
```

**内置命令库**：
- 文件操作：`ls`, `cp`, `mv`, `rm`
- 进程管理：`ps`, `kill`, `top`
- 网络工具：`ping`, `netstat`, `curl`
- 系统信息：`uname`, `df`, `free`
- 文本处理：`grep`, `sed`, `awk`

---

## 数据流

### 1. 用户消息流程

```
用户输入
    ↓
CommandInput 组件
    ↓
MessageContext.addMessage()
    ↓
显示在 ChatContainer
    ↓
发送到 AI (via MCP)
    ↓
AI 处理并返回
    ↓
解析 <think> 标签
    ↓
显示思考过程和回复
```

### 2. 命令执行流程

```
用户输入命令
    ↓
CommandRiskAnalyzer 分析风险
    ↓
根据授权模式判断是否需要确认
    ↓
CredentialMapper 转换虚拟凭证
    ↓
通过 IPC 发送到主进程
    ↓
ServerManager.executeCommand()
    ↓
SSH2 执行命令
    ↓
返回结果
    ↓
显示在消息中
```

### 3. 服务器连接流程

```
用户点击"连接"
    ↓
ServerContext.connectServer()
    ↓
通过 IPC 发送到主进程
    ↓
ServerManager.connect()
    ↓
SSH2 建立连接
    ↓
连接成功
    ↓
启动延迟监控
    ↓
获取提示符
    ↓
自动检测系统信息
    ↓
更新 UI 状态
```

### 4. 联网搜索流程

```
用户启用联网搜索
    ↓
StatusBar 切换开关
    ↓
通过 IPC 通知主进程
    ↓
MCPClient.setWebSearchEnabled(true)
    ↓
BingSearchTool.setEnabled(true)
    ↓
AI 需要搜索时
    ↓
MCPClient.callTool('bing_search', { query })
    ↓
BingSearchTool.search(query)
    ↓
HTTPS 请求必应
    ↓
解析 HTML 结果
    ↓
返回给 AI
    ↓
AI 整合信息回复用户
```

---

## API 参考

### ElectronAPI 接口

```typescript
interface ElectronAPI {
  // 命令相关
  executeCommand(cmd: string): Promise<CommandExecutionResult>;
  checkCommandRisk(cmd: string): Promise<{ isHighRisk: boolean; reason?: string }>;
  
  // 知识库
  getKnowledgeBase(keyword?: string): Promise<KnowledgeBaseEntry[]>;
  
  // MCP 相关
  sendToMCP(message: string): Promise<string>;
  
  // 服务器管理
  addServer(server: Omit<ServerConfig, 'id'>): Promise<ServerConfig>;
  updateServer(id: string, updates: Partial<ServerConfig>): Promise<ServerConfig | null>;
  deleteServer(id: string): Promise<boolean>;
  getServer(id: string): Promise<ServerConfig | null>;
  getAllServers(): Promise<ServerConfig[]>;
  connectServer(id: string): Promise<{ success: boolean; error?: string }>;
  disconnectServer(id: string): Promise<void>;
  detectSystemInfo(id: string): Promise<ServerSystemInfo | null>;
  setCurrentServer(id: string): Promise<boolean>;
  getCurrentServer(): Promise<ServerConfig | null>;
  executeCommandOnServer(id: string, cmd: string): Promise<{ output: string; error?: string }>;
  
  // 延迟和提示符
  checkServerLatency(id: string): Promise<number>;
  getServerPrompt(id: string): Promise<string>;
  
  // 联网搜索
  setWebSearchEnabled(enabled: boolean): Promise<void>;
  getWebSearchEnabled(): Promise<boolean>;
  webSearch(query: string): Promise<{ success: boolean; results: string[]; error?: string }>;
  
  // 事件监听
  onCommandOutput(callback: (data: string) => void): void;
}
```

### IPC 通道

| 通道名称 | 方向 | 参数 | 返回值 |
|---------|------|------|--------|
| `execute-command` | R→M | `cmd: string` | `CommandExecutionResult` |
| `check-command-risk` | R→M | `cmd: string` | `{ isHighRisk, reason }` |
| `add-server` | R→M | `server: ServerConfig` | `ServerConfig` |
| `connect-server` | R→M | `id: string` | `{ success, error? }` |
| `check-server-latency` | R→M | `id: string` | `number` |
| `get-server-prompt` | R→M | `id: string` | `string` |
| `set-web-search-enabled` | R→M | `enabled: boolean` | `void` |
| `web-search` | R→M | `query: string` | `BingSearchResult` |
| `command-output` | M→R | `data: string` | - |

> R = Renderer, M = Main

---

## 扩展开发

### 添加新的 MCP 工具

1. **创建工具类**：

```typescript
// src/lib/MyCustomTool.ts
export class MyCustomTool {
  async execute(params: any): Promise<any> {
    // 实现你的工具逻辑
  }
}

export const myCustomTool = new MyCustomTool();
```

2. **在 MCPClient 中注册**：

```typescript
// src/lib/MCPClient.ts
import { myCustomTool } from './MyCustomTool';

private registerBuiltinTools(): void {
  this.tools.push({
    name: 'my_custom_tool',
    description: '我的自定义工具',
    inputSchema: {
      type: 'object',
      properties: {
        param1: { type: 'string' }
      },
      required: ['param1']
    }
  });
}

public async callTool(toolName: string, parameters: Record<string, unknown>): Promise<MCPToolResult> {
  if (toolName === 'my_custom_tool') {
    const result = await myCustomTool.execute(parameters);
    return {
      success: true,
      result: JSON.stringify(result)
    };
  }
  // ... 其他工具
}
```

### 添加新的风险规则

```typescript
// src/lib/CommandRiskAnalyzer.ts
const myCustomRules: RiskPattern[] = [
  {
    pattern: /my-dangerous-command/,
    riskLevel: 'high',
    reason: '这是一个危险的命令'
  }
];

// 将规则添加到分析器
```

### 添加新的 UI 组件

1. 创建组件文件：

```typescript
// src/renderer/components/MyComponent.tsx
import React from 'react';
import { Card } from 'antd';
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <h3>{t.mySection.title}</h3>
    </Card>
  );
};

export default MyComponent;
```

2. 添加翻译：

```typescript
// src/lib/i18n.ts
const zh: Translations = {
  // ...
  mySection: {
    title: '我的新功能'
  }
};

const en: Translations = {
  // ...
  mySection: {
    title: 'My New Feature'
  }
};
```

### 添加新的 Context

```typescript
// src/renderer/contexts/MyContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface MyContextType {
  value: string;
  setValue: (val: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState('');
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

---

## 性能优化

### 1. 渲染优化

- 使用 `React.memo` 避免不必要的重渲染
- 合理使用 `useMemo` 和 `useCallback`
- 虚拟列表处理大量消息

### 2. 网络优化

- 连接池管理
- 请求去重
- 延迟监控节流（5 秒间隔）

### 3. 内存优化

- 限制消息历史数量
- 及时清理断开的连接
- 使用 WeakMap 存储临时数据

---

## 调试技巧

### 开发模式

```bash
npm run dev
```

### 查看日志

- **渲染进程**：打开 DevTools (F12)
- **主进程**：查看终端输出

### 断点调试

1. 在 VSCode 中配置 launch.json：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Electron Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "args": [".", "--remote-debugging-port=9223"],
      "outputCapture": "std"
    }
  ]
}
```

2. 设置断点并启动调试

---

## 测试

### 单元测试（计划中）

```typescript
// tests/ServerManager.test.ts
describe('ServerManager', () => {
  it('should add server', () => {
    const manager = new ServerManager();
    const server = manager.addServer({
      name: 'Test',
      host: 'localhost',
      port: 22,
      username: 'user',
      password: 'pass'
    });
    expect(server.id).toBeDefined();
  });
});
```

### 集成测试（计划中）

测试完整的用户流程。

---

## 安全建议

1. **代码审查**：所有 PR 需要审查
2. **依赖更新**：定期更新依赖包
3. **输入验证**：验证所有用户输入
4. **错误处理**：妥善处理所有异常
5. **日志脱敏**：不记录敏感信息

---

**OrangeTerm 技术团队** 🍊
