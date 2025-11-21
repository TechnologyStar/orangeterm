export type AuthorizationMode = 'manual_all' | 'manual_highrisk' | 'auto';

export interface VirtualCredentials {
  virtualIp: string;
  virtualPassword: string;
}

export interface RealCredentials {
  realIp: string;
  realPassword: string;
}

export interface CredentialMapping extends VirtualCredentials, RealCredentials {}

export interface CommandExecutionResult {
  success: boolean;
  output?: string;
  error?: string;
  exitCode?: number;
}

export interface KnowledgeBaseEntry {
  command: string;
  description: string;
  usage: string;
  examples?: string[];
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  command?: string;
  executionResult?: CommandExecutionResult;
}

export interface MCPServerConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface ElectronAPI {
  executeCommand: (cmd: string) => Promise<CommandExecutionResult>;
  checkCommandRisk: (cmd: string) => Promise<{ isHighRisk: boolean; reason?: string }>;
  getKnowledgeBase: (keyword?: string) => Promise<KnowledgeBaseEntry[]>;
  searchOnline: (query: string) => Promise<string>;
  sendToMCP: (message: string) => Promise<string>;
  onCommandOutput: (callback: (data: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
