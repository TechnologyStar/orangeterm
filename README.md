# OrangeTerm

A fully AI-driven desktop client for autonomous operations, featuring automated decision-making and execution to achieve completely unmanned intelligent Ops management.

## Features

### 🤖 AI-Powered Operations
- Intelligent command generation and execution
- Natural language interface for system operations
- Context-aware suggestions based on knowledge base

### 🔒 Security First
- Virtual credential mapping to protect sensitive information
- Three authorization modes for command execution:
  - **Manual All**: Requires authorization for every command
  - **High Risk Only**: Only dangerous commands need approval
  - **Automatic**: Full autonomous execution
- Risk analysis for every command before execution

### 🌐 MCP Support
- Model Context Protocol (MCP) integration
- Extensible tool and resource system
- Real-time communication with AI models

### 📚 Knowledge Base
- Built-in command reference library
- Context-aware command suggestions
- Online search integration capability

### 💻 Modern Technology Stack
- **Frontend**: React 18 + TypeScript + Ant Design
- **Desktop**: Electron 28
- **Build Tool**: Vite
- **Architecture**: Secure IPC communication between main and renderer processes

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TechnologyStar/orangeterm.git
cd orangeterm
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the application in development mode:
```bash
npm run dev
```

This will:
- Start the Vite dev server on `http://localhost:3000`
- Launch the Electron application with hot reload

### Building

Build the application for production:
```bash
npm run build
```

Package the application:
```bash
npm run package
```

The packaged application will be available in the `release/` directory.

## Project Structure

```
orangeterm/
├── src/
│   ├── main/              # Electron main process
│   │   └── main.ts        # Main process entry point
│   ├── preload/           # Preload scripts
│   │   └── preload.ts     # IPC bridge
│   ├── renderer/          # React frontend
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── App.tsx        # Root component
│   │   └── main.tsx       # Renderer entry point
│   ├── lib/               # Core libraries
│   │   ├── CredentialMapper.ts    # Virtual credential system
│   │   ├── CommandRiskAnalyzer.ts # Command safety checker
│   │   ├── KnowledgeBase.ts       # Command knowledge base
│   │   └── MCPClient.ts           # MCP integration
│   └── types/             # TypeScript definitions
├── dist/                  # Build output
├── release/               # Packaged applications
└── package.json
```

## Architecture

### Security Model

**Virtual Credential Mapping**: All sensitive credentials (IPs, passwords) are replaced with virtual identifiers when sent to AI models. The mapping is maintained securely in the main process and only real credentials are used during actual command execution.

**Authorization Modes**:
1. **Manual All**: User must approve every command
2. **High Risk Only**: System automatically identifies dangerous commands and requires approval
3. **Automatic**: AI executes commands autonomously (use with caution)

### IPC Communication

The application uses Electron's context isolation and preload scripts for secure communication:
- Main process handles command execution, file system access, and sensitive operations
- Renderer process handles UI and user interactions
- Preload script provides a safe API bridge

### MCP Integration

The Model Context Protocol integration allows:
- Connecting to various AI model servers
- Accessing tools and resources exposed by MCP servers
- Real-time context sharing between application and AI models

## Usage Examples

### Basic Usage

1. Launch OrangeTerm
2. Select your preferred authorization mode
3. Type natural language requests like:
   - "Show me the disk usage"
   - "List all running Docker containers"
   - "Check the status of nginx service"
   - "Find all log files modified in the last hour"

### Command Execution Flow

1. User enters a natural language request
2. System queries local knowledge base for relevant context
3. Request is sent to AI via MCP
4. AI generates appropriate command(s)
5. Risk analysis is performed
6. Authorization is requested (if required by current mode)
7. Command is executed with real credentials
8. Results are displayed in the chat interface

## Development

### Available Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build for production
- `npm run package` - Package application for distribution
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type safety
- Ant Design for UI components
- Dark theme optimized for terminal operations

## Roadmap

- [ ] Multi-language support
- [ ] Custom knowledge base entries
- [ ] Cloud sync for settings and history
- [ ] Plugin system for extensibility
- [ ] Advanced logging and audit trails
- [ ] Remote server management
- [ ] Team collaboration features
- [ ] Android app version

## Security Considerations

- Never share your actual credentials with AI models
- Review commands before execution, especially in automatic mode
- Keep the application updated for security patches
- Use authorization modes appropriate to your environment
- Regularly audit command execution logs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC License

## Support

For issues and questions, please use the GitHub issue tracker.
