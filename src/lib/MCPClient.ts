import { MCPServerConfig } from '../types';
import { bingSearchTool, BingSearchResult } from './BingSearchTool';

export interface MCPToolSchema {
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: MCPToolSchema;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface MCPToolResult {
  success: boolean;
  result: string;
}

export class MCPClient {
  private servers: Map<string, MCPServerConfig> = new Map();
  private tools: MCPTool[] = [];
  private resources: MCPResource[] = [];
  private webSearchEnabled: boolean = false;

  public addServer(name: string, config: MCPServerConfig): void {
    this.servers.set(name, config);
  }

  public async initialize(): Promise<void> {
    console.log('Initializing MCP client...');
    this.registerBuiltinTools();
  }

  private registerBuiltinTools(): void {
    this.tools.push({
      name: 'bing_search',
      description: 'Search the web using Bing search engine',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string' },
        },
        required: ['query'],
      },
    });
  }

  public setWebSearchEnabled(enabled: boolean): void {
    this.webSearchEnabled = enabled;
    bingSearchTool.setEnabled(enabled);
  }

  public isWebSearchEnabled(): boolean {
    return this.webSearchEnabled;
  }

  public async searchWeb(query: string): Promise<BingSearchResult> {
    return await bingSearchTool.search(query);
  }

  public async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message to MCP server:', message);
      
      return `MCP Response: Command suggestion based on "${message}"`;
    } catch (error) {
      console.error('Error sending message to MCP:', error);
      throw error;
    }
  }

  public async callTool(toolName: string, parameters: Record<string, unknown>): Promise<MCPToolResult> {
    console.log(`Calling MCP tool: ${toolName}`, parameters);
    
    if (toolName === 'bing_search' && parameters.query) {
      const result = await this.searchWeb(parameters.query as string);
      return {
        success: result.success,
        result: result.success 
          ? `搜索结果:\n${result.results.join('\n')}` 
          : `搜索失败: ${result.error}`,
      };
    }
    
    return {
      success: true,
      result: `Tool ${toolName} executed successfully`,
    };
  }

  public async getResources(): Promise<MCPResource[]> {
    return this.resources;
  }

  public async readResource(uri: string): Promise<string> {
    console.log(`Reading resource: ${uri}`);
    return `Resource content for ${uri}`;
  }

  public getTools(): MCPTool[] {
    return this.tools;
  }

  public async shutdown(): Promise<void> {
    console.log('Shutting down MCP client...');
  }
}

export const mcpClient = new MCPClient();
