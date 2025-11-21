# OrangeTerm Architecture

This document describes the architecture and design decisions of OrangeTerm.

## Overview

OrangeTerm is a desktop application built with Electron that provides an AI-powered interface for system operations. It follows a three-layer architecture with security and modularity as primary concerns.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Renderer Process                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │              React Application (UI)                 │ │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐ │ │
│  │  │Components│  │ Contexts │  │  Ant Design UI  │ │ │
│  │  └──────────┘  └──────────┘  └─────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└───────────────────────┬─────────────────────────────────┘
                        │ IPC (contextBridge)
                        │
┌───────────────────────▼─────────────────────────────────┐
│                    Preload Script                        │
│  ┌────────────────────────────────────────────────────┐ │
│  │          Secure IPC Bridge (electronAPI)           │ │
│  └────────────────────────────────────────────────────┘ │
└───────────────────────┬─────────────────────────────────┘
                        │ IPC Handlers
                        │
┌───────────────────────▼─────────────────────────────────┐
│                     Main Process                         │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ Command      │  │   MCP       │  │  Knowledge   │  │
│  │ Executor     │  │   Client    │  │    Base      │  │
│  └──────────────┘  └─────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌─────────────┐                    │
│  │ Credential   │  │    Risk     │                    │
│  │  Mapper      │  │  Analyzer   │                    │
│  └──────────────┘  └─────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Renderer Process (React UI)

**Location**: `src/renderer/`

**Purpose**: Provides the user interface and handles user interactions.

#### Key Components:

- **App.tsx**: Root component, sets up providers and layout
- **ChatContainer**: Displays conversation history with AI
- **CommandInput**: Handles user input and command submission
- **ChatMessage**: Renders individual messages
- **AuthorizationModeSelector**: UI for security mode selection
- **StatusBar**: Shows system status indicators

#### State Management:

- **AuthContext**: Manages authorization mode (manual_all, manual_highrisk, auto)
- **MessageContext**: Manages chat history and messages

#### Features:

- Real-time command output display
- Authorization dialogs for dangerous commands
- Dark theme optimized for operations
- Responsive layout

### 2. Preload Script (IPC Bridge)

**Location**: `src/preload/preload.ts`

**Purpose**: Provides a secure bridge between renderer and main processes.

#### Exposed API:

```typescript
interface ElectronAPI {
  executeCommand: (cmd: string) => Promise<CommandExecutionResult>;
  checkCommandRisk: (cmd: string) => Promise<RiskAnalysis>;
  getKnowledgeBase: (keyword?: string) => Promise<KnowledgeBaseEntry[]>;
  searchOnline: (query: string) => Promise<string>;
  sendToMCP: (message: string) => Promise<string>;
  onCommandOutput: (callback: (data: string) => void) => void;
}
```

#### Security Features:

- Context isolation enabled
- Limited API surface
- No direct Node.js access from renderer
- Type-safe IPC communication

### 3. Main Process (Electron Backend)

**Location**: `src/main/main.ts`

**Purpose**: Handles system operations, command execution, and manages MCP communication.

#### Responsibilities:

1. Window management
2. IPC handler registration
3. Command execution via child_process
4. Integration with core libraries
5. MCP server lifecycle management

#### IPC Handlers:

- `execute-command`: Executes shell commands
- `check-command-risk`: Analyzes command safety
- `get-knowledge-base`: Queries local knowledge base
- `search-online`: Performs online searches
- `send-to-mcp`: Communicates with MCP servers

### 4. Core Libraries

**Location**: `src/lib/`

#### CredentialMapper

**Purpose**: Protects sensitive information through virtual mapping.

```typescript
class CredentialMapper {
  createMapping(realIp: string, realPassword: string): VirtualCredentials;
  replaceVirtualToReal(cmd: string): string;
  replaceRealToVirtual(cmd: string): string;
}
```

**How it works**:
1. Real credentials → Virtual IDs before sending to AI
2. AI generates command with virtual IDs
3. Virtual IDs → Real credentials before execution

#### CommandRiskAnalyzer

**Purpose**: Identifies dangerous commands.

```typescript
class CommandRiskAnalyzer {
  analyze(command: string): RiskAnalysisResult;
  isHighRiskCommand(command: string): boolean;
}
```

**Risk Levels**:
- **High**: System-critical operations (rm -rf /, shutdown, etc.)
- **Medium**: Privileged operations (sudo, systemctl, etc.)
- **Low**: Safe read operations (ls, cat, ps, etc.)

#### KnowledgeBase

**Purpose**: Provides command reference and context.

```typescript
class KnowledgeBase {
  query(keyword?: string): KnowledgeBaseEntry[];
  getByCommand(command: string): KnowledgeBaseEntry | undefined;
  addEntry(entry: KnowledgeBaseEntry): void;
}
```

**Features**:
- Built-in command documentation
- Usage examples
- Risk level indicators
- Search and filter capabilities

#### MCPClient

**Purpose**: Manages MCP server connections and communication.

```typescript
class MCPClient {
  addServer(name: string, config: MCPServerConfig): void;
  sendMessage(message: string): Promise<string>;
  callTool(toolName: string, parameters: any): Promise<any>;
  getResources(): Promise<MCPResource[]>;
}
```

**Capabilities**:
- Multiple server support
- Tool invocation
- Resource access
- Async communication

## Security Architecture

### 1. Process Isolation

- Renderer process runs with `nodeIntegration: false`
- `contextIsolation: true` prevents direct access to Node.js APIs
- Preload script provides controlled API surface

### 2. Virtual Credential System

```
User Input → Real Credentials → Virtual Credentials → AI Model
                                          ↓
                                   AI Response
                                          ↓
                             Virtual Credentials → Real Credentials → Execution
```

### 3. Authorization Modes

#### Manual All
- Every command requires user approval
- Maximum security
- Suitable for production systems

#### Manual High Risk
- Only dangerous commands need approval
- Balance between security and convenience
- Default mode

#### Automatic
- No authorization required
- Maximum convenience
- Only for trusted environments

### 4. Command Risk Analysis

Multi-layer risk assessment:
1. Pattern matching against known dangerous commands
2. Privilege level detection (sudo, root)
3. Destructive operation detection (rm, mkfs, dd)
4. System-critical service checks

## Data Flow

### Command Execution Flow

```
1. User enters natural language request
   ↓
2. Query knowledge base for context
   ↓
3. Replace real credentials with virtual ones
   ↓
4. Send to MCP/AI for command generation
   ↓
5. AI generates command (with virtual credentials)
   ↓
6. Risk analysis on generated command
   ↓
7. Authorization check based on mode
   ↓ (if approved)
8. Replace virtual credentials with real ones
   ↓
9. Execute command via child_process
   ↓
10. Stream output back to UI
   ↓
11. Display results and update history
```

### Message Flow

```typescript
// Renderer → Main
window.electronAPI.executeCommand(cmd)
  ↓ IPC invoke
ipcMain.handle('execute-command', handler)
  ↓ Processing
return result
  ↓ IPC response
Promise resolves in renderer
```

## Technology Stack

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Ant Design**: Component library
- **Vite**: Build tool

### Backend
- **Electron 28**: Desktop framework
- **Node.js**: Runtime
- **child_process**: Command execution

### Build & Dev Tools
- **TypeScript Compiler**: For main process
- **Vite**: For renderer process
- **ESLint**: Code quality
- **electron-builder**: Packaging

## File Structure

```
orangeterm/
├── src/
│   ├── main/              # Main process (Electron)
│   │   └── main.ts
│   ├── preload/           # Preload scripts
│   │   └── preload.ts
│   ├── renderer/          # React UI
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.html
│   │   └── index.css
│   ├── lib/               # Business logic
│   │   ├── CredentialMapper.ts
│   │   ├── CommandRiskAnalyzer.ts
│   │   ├── KnowledgeBase.ts
│   │   └── MCPClient.ts
│   └── types/             # TypeScript types
│       └── index.ts
├── dist/                  # Build output
├── docs/                  # Documentation
├── public/                # Static assets
└── package.json
```

## Build Process

### Development Mode
```bash
npm run dev
```
1. Vite starts dev server (port 3000)
2. TypeScript compiles main process
3. Electron launches and loads http://localhost:3000
4. Hot module reload enabled

### Production Build
```bash
npm run build
```
1. Vite builds renderer (optimized, minified)
2. TypeScript compiles main process
3. Output in `dist/` directory

### Packaging
```bash
npm run package
```
1. electron-builder packages the app
2. Creates platform-specific installers
3. Output in `release/` directory

## Performance Considerations

### 1. Lazy Loading
- Components loaded on-demand
- Code splitting for large dependencies
- Dynamic imports where appropriate

### 2. IPC Optimization
- Minimize IPC calls
- Batch updates when possible
- Use streams for large data

### 3. Memory Management
- Cleanup event listeners
- Limit message history
- Dispose of unused resources

### 4. Command Execution
- Stream output for long-running commands
- Timeout mechanisms
- Resource limits

## Extensibility

### Adding New Commands to Knowledge Base

```typescript
knowledgeBase.addEntry({
  command: 'mycommand',
  description: 'Description',
  usage: 'mycommand [options]',
  examples: ['mycommand --help'],
  riskLevel: 'low',
});
```

### Adding New Risk Patterns

```typescript
// In CommandRiskAnalyzer.ts
private highRiskPatterns = [
  { pattern: /dangerous-cmd/i, reason: 'Dangerous operation' },
  // Add more patterns
];
```

### Adding New MCP Servers

```typescript
mcpClient.addServer('myserver', {
  command: 'npx',
  args: ['-y', '@myorg/mcp-server'],
  env: { API_KEY: 'xxx' },
});
```

## Testing Strategy

### Unit Tests
- Test individual components
- Mock IPC communication
- Test business logic in isolation

### Integration Tests
- Test IPC handlers
- Test MCP integration
- Test command execution flow

### E2E Tests
- Test full user workflows
- Test authorization flows
- Test error handling

## Future Enhancements

### Planned Architecture Changes

1. **Plugin System**
   - Dynamic plugin loading
   - Plugin API specification
   - Sandboxed plugin execution

2. **Cloud Sync**
   - Settings synchronization
   - Command history backup
   - Multi-device support

3. **Advanced MCP Features**
   - Multiple simultaneous MCP connections
   - MCP server health monitoring
   - Automatic failover

4. **Performance Improvements**
   - Web Workers for heavy computations
   - IndexedDB for local data
   - Optimized rendering

## Troubleshooting

### Common Issues

1. **IPC Communication Failures**
   - Check context isolation settings
   - Verify preload script loading
   - Check handler registration

2. **Command Execution Issues**
   - Verify shell environment
   - Check PATH variables
   - Review permission settings

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify Vite configuration

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Ant Design Components](https://ant.design/components/overview/)
