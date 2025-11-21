# Quick Start Guide

Get up and running with OrangeTerm in minutes!

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Check your installations:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 8.0.0 or higher
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TechnologyStar/orangeterm.git
cd orangeterm
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages. It may take a few minutes.

### 3. Start Development Server

```bash
npm run dev
```

This command will:
- Start the Vite development server on port 3000
- Compile the Electron main process
- Launch the OrangeTerm application

The app should open automatically!

## First Steps

### 1. Choose Your Authorization Mode

When the app launches, you'll see three authorization modes:

- **Manual All** 🛡️: Every command requires your approval (safest)
- **High Risk Only** ⚠️: Only dangerous commands need approval (recommended)
- **Automatic** ⚡: No authorization needed (use with caution)

**For first-time users, we recommend "High Risk Only".**

### 2. Try Your First Command

Type a natural language request in the input box at the bottom:

```
Show me the current directory
```

The AI will:
1. Understand your request
2. Generate the appropriate command (`pwd`)
3. Execute it (automatically for low-risk commands)
4. Display the result

### 3. Explore More Commands

Try these examples:

**Basic System Information**
```
What's my disk usage?
Show me running processes
Check system memory
```

**File Operations**
```
List all files in the current directory
Show me all text files
Find files modified today
```

**System Monitoring**
```
Check CPU usage
Show network connections
Monitor system logs
```

## Understanding the Interface

### Top Bar
- **OrangeTerm Logo**: Application branding
- **Authorization Mode Selector**: Security settings

### Main Area
- **Chat Container**: Conversation history with the AI
  - Blue bubbles: Your messages
  - Dark bubbles: AI responses
  - System messages show command execution results

### Bottom Section
- **Command Input**: Type your requests here
- **Send Button**: Submit your request (or press Enter)
- **Status Bar**: Shows system status and active features

### Status Indicators

- 🔒 **Virtual credentials active**: Security features enabled
- 📊 **Knowledge base connected**: Local command database ready
- ☁️ **MCP enabled**: AI integration active

## Tips for Effective Use

### 1. Be Specific

❌ "do something with files"
✅ "list all PDF files in the Documents folder"

### 2. Use Natural Language

You don't need to know shell commands! Just describe what you want:

```
"Show me files larger than 100MB"
"Find processes using more than 50% CPU"
"Check if nginx is running"
```

### 3. Review Before Executing

For high-risk commands, you'll see a confirmation dialog:
- Read the command carefully
- Understand what it will do
- Click "Execute" if you're sure, or "Cancel" to abort

### 4. Check the Output

After execution:
- ✅ Green: Command succeeded
- ❌ Red: Command failed
- Output is shown in a code block below the command

## Common Scenarios

### Scenario 1: File Management

**Goal**: Find large files taking up disk space

```
Request: "Show me the 10 largest files in my home directory"

AI generates: du -ah ~ | sort -rh | head -10

Result: List of largest files with sizes
```

### Scenario 2: Process Management

**Goal**: Check what's using CPU

```
Request: "Which process is using the most CPU?"

AI generates: ps aux --sort=-%cpu | head -5

Result: Top CPU-consuming processes
```

### Scenario 3: Service Status

**Goal**: Check if a service is running

```
Request: "Is Docker running?"

AI generates: systemctl status docker

Result: Service status and details
```

## Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Ctrl/Cmd + C**: Copy selected text

## Safety Features

### Authorization Modes

OrangeTerm protects you from dangerous commands:

**High Risk Commands** (require approval):
- System shutdown/reboot
- Disk formatting
- Recursive deletions
- User management
- Firewall changes

**Safe Commands** (auto-executed):
- Directory listings
- File viewing
- Process listing
- System status checks

### Virtual Credentials

OrangeTerm never sends your actual passwords or IPs to AI:
1. Real credentials → Virtual IDs
2. AI works with virtual IDs
3. Real credentials restored before execution

## Troubleshooting

### App Won't Start

**Problem**: Error during `npm run dev`

**Solutions**:
1. Check Node.js version: `node --version` (need 18+)
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check for port conflicts (port 3000)

### Command Execution Fails

**Problem**: "Command execution failed" error

**Solutions**:
1. Verify the command syntax
2. Check if you have necessary permissions
3. Try running the command in a terminal directly
4. Check the error message for details

### UI Not Loading

**Problem**: Blank white screen

**Solutions**:
1. Check browser console (DevTools)
2. Verify Vite server is running on port 3000
3. Clear browser cache and reload
4. Check for JavaScript errors

### Performance Issues

**Problem**: App feels slow

**Solutions**:
1. Close other resource-intensive applications
2. Clear chat history (reduces memory)
3. Restart the application
4. Check system resources (RAM, CPU)

## Next Steps

Now that you're up and running:

1. **Explore the Knowledge Base**: Try various commands
2. **Experiment with Modes**: Test different authorization settings
3. **Read the Documentation**: Check out [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Configure MCP**: Set up AI integration ([MCP_INTEGRATION.md](./MCP_INTEGRATION.md))
5. **Customize**: Adjust settings to your workflow

## Building for Production

When you're ready to create a distributable version:

```bash
# Build the application
npm run build

# Package for your platform
npm run package
```

The packaged app will be in the `release/` directory.

## Getting Help

Need assistance?

- **GitHub Issues**: [Report bugs or request features](https://github.com/TechnologyStar/orangeterm/issues)
- **Documentation**: Check the `docs/` folder
- **Community**: Join discussions on GitHub

## What's Next?

- Configure MCP for AI integration
- Add custom commands to knowledge base
- Explore advanced features
- Contribute to the project

Happy automating! 🚀
