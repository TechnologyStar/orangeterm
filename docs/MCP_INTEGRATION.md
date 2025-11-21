# MCP (Model Context Protocol) Integration Guide

This guide explains how to integrate OrangeTerm with MCP servers and AI models.

## What is MCP?

The Model Context Protocol (MCP) is an open protocol that enables seamless integration between AI applications and external data sources. It allows AI models to:

- Access tools and functions
- Read and write resources
- Maintain context across interactions
- Execute operations securely

## Architecture

```
┌─────────────────┐
│   OrangeTerm    │
│   (MCP Client)  │
└────────┬────────┘
         │
         │ MCP Protocol
         │
    ┌────┴─────────────────┐
    │                      │
┌───▼──────┐      ┌───────▼──────┐
│ MCP      │      │ MCP          │
│ Server 1 │      │ Server 2     │
│(FileSystem)    │(Database)     │
└──────────┘      └──────────────┘
```

## Configuration

### 1. Create MCP Configuration File

Copy the example configuration:

```bash
cp mcp-config.example.json mcp-config.json
```

### 2. Configure MCP Servers

Edit `mcp-config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/project"
      ],
      "env": {}
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"],
      "env": {}
    }
  },
  "ai": {
    "provider": "openai",
    "model": "gpt-4",
    "apiKey": "your-api-key-here",
    "maxTokens": 2000,
    "temperature": 0.7
  }
}
```

### 3. Available MCP Servers

#### Official MCP Servers

1. **Filesystem Server**
   ```json
   {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
   }
   ```
   Provides: File reading, writing, and directory operations

2. **Git Server**
   ```json
   {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-git"]
   }
   ```
   Provides: Git operations, commit history, branch management

3. **SQLite Server**
   ```json
   {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "/path/to/db.db"]
   }
   ```
   Provides: Database queries and operations

4. **PostgreSQL Server**
   ```json
   {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://connection-string"]
   }
   ```
   Provides: PostgreSQL database operations

## Implementing Custom MCP Integration

### Update MCPClient.ts

The current implementation in `src/lib/MCPClient.ts` is a placeholder. Here's how to integrate with a real MCP SDK:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export class MCPClient {
  private clients: Map<string, Client> = new Map();
  
  public async addServer(name: string, config: MCPServerConfig): Promise<void> {
    const transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env: config.env,
    });

    const client = new Client({
      name: 'orangeterm-client',
      version: '1.0.0',
    }, {
      capabilities: {
        tools: {},
        resources: {},
      },
    });

    await client.connect(transport);
    this.clients.set(name, client);
  }

  public async callTool(serverName: string, toolName: string, params: any): Promise<any> {
    const client = this.clients.get(serverName);
    if (!client) {
      throw new Error(`MCP server ${serverName} not found`);
    }

    return await client.callTool({
      name: toolName,
      arguments: params,
    });
  }

  public async listTools(serverName: string): Promise<any[]> {
    const client = this.clients.get(serverName);
    if (!client) {
      throw new Error(`MCP server ${serverName} not found`);
    }

    const response = await client.listTools();
    return response.tools;
  }
}
```

## AI Provider Integration

### OpenAI Integration

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateCommand(userRequest: string, context: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful operations assistant. Generate shell commands based on user requests.',
      },
      {
        role: 'user',
        content: `${userRequest}\n\nContext:\n${context}`,
      },
    ],
  });

  return response.choices[0].message.content || '';
}
```

### Claude Integration

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateCommand(userRequest: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: userRequest,
      },
    ],
  });

  return message.content[0].text;
}
```

## Usage Examples

### Example 1: File Operations with MCP

```typescript
// User request: "Show me all TypeScript files in the project"

// 1. Query local knowledge base
const kbResults = await knowledgeBase.query('find typescript files');

// 2. Call MCP filesystem server
const files = await mcpClient.callTool('filesystem', 'list_directory', {
  path: '/project',
  pattern: '*.ts',
  recursive: true,
});

// 3. Generate command with AI
const command = await generateCommand(
  "Show me all TypeScript files",
  `Available files: ${JSON.stringify(files)}`
);

// 4. Execute with authorization
await executeWithAuthorization(command);
```

### Example 2: Git Operations with MCP

```typescript
// User request: "Show me recent commits"

const commits = await mcpClient.callTool('git', 'log', {
  maxCount: 10,
});

// Format and display results
displayResults(commits);
```

## Security Considerations

### 1. Credential Protection

Always use virtual credentials when communicating with AI:

```typescript
const virtualCmd = credentialMapper.replaceRealToVirtual(command);
const aiResponse = await sendToAI(virtualCmd);
const realCmd = credentialMapper.replaceVirtualToReal(aiResponse);
```

### 2. MCP Server Permissions

Limit MCP server access to specific directories:

```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/home/user/projects"  // Limited scope
    ]
  }
}
```

### 3. API Key Management

Store API keys securely:

```bash
# Use environment variables
export OPENAI_API_KEY="your-key-here"

# Or use a secure credential store
```

## Troubleshooting

### MCP Server Not Starting

1. Check if the server package is installed:
   ```bash
   npm list -g | grep @modelcontextprotocol
   ```

2. Test server manually:
   ```bash
   npx -y @modelcontextprotocol/server-filesystem /path
   ```

3. Check logs in the developer console

### Connection Issues

- Verify network connectivity
- Check firewall settings
- Ensure correct server configuration
- Review error logs

### Performance Issues

- Limit MCP server scope
- Use caching for frequent queries
- Implement request throttling
- Monitor resource usage

## Best Practices

1. **Start Simple**: Begin with one MCP server
2. **Test Thoroughly**: Verify each integration independently
3. **Monitor Resources**: Track server performance
4. **Handle Errors**: Implement proper error handling
5. **Document Changes**: Keep configuration documented
6. **Version Control**: Track MCP server versions

## Resources

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Community MCP Servers](https://github.com/topics/mcp-server)

## Next Steps

1. Install MCP SDK: `npm install @modelcontextprotocol/sdk`
2. Configure your first MCP server
3. Test the integration
4. Add AI provider credentials
5. Start using OrangeTerm with full MCP capabilities!
