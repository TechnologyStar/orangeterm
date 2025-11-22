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
  prompt?: string;
}

export interface MCPServerConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface ServerConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  status?: 'connected' | 'disconnected' | 'error';
  systemInfo?: ServerSystemInfo;
  latency?: number;
  lastChecked?: number;
}

export interface ServerSystemInfo {
  cpu: string;
  cpuCores: number;
  memory: {
    total: string;
    used: string;
    free: string;
    percentage: number;
  };
  disk: {
    total: string;
    used: string;
    free: string;
    percentage: number;
  };
  os: string;
  kernel: string;
  uptime: string;
  hostname: string;
}

export interface ElectronAPI {
  executeCommand: (cmd: string) => Promise<CommandExecutionResult>;
  checkCommandRisk: (cmd: string) => Promise<{ isHighRisk: boolean; reason?: string }>;
  getKnowledgeBase: (keyword?: string) => Promise<KnowledgeBaseEntry[]>;
  searchOnline: (query: string) => Promise<string>;
  sendToMCP: (message: string) => Promise<string>;
  onCommandOutput: (callback: (data: string) => void) => void;
  addServer: (server: Omit<ServerConfig, 'id'>) => Promise<ServerConfig>;
  updateServer: (id: string, updates: Partial<ServerConfig>) => Promise<ServerConfig | null>;
  deleteServer: (id: string) => Promise<boolean>;
  getServer: (id: string) => Promise<ServerConfig | null>;
  getAllServers: () => Promise<ServerConfig[]>;
  connectServer: (id: string) => Promise<{ success: boolean; error?: string }>;
  disconnectServer: (id: string) => Promise<void>;
  detectSystemInfo: (id: string) => Promise<ServerSystemInfo | null>;
  setCurrentServer: (id: string) => Promise<boolean>;
  getCurrentServer: () => Promise<ServerConfig | null>;
  executeCommandOnServer: (id: string, cmd: string) => Promise<{ output: string; error?: string }>;
  checkServerLatency: (id: string) => Promise<number>;
  getServerPrompt: (id: string) => Promise<string>;
  setWebSearchEnabled: (enabled: boolean) => Promise<void>;
  getWebSearchEnabled: () => Promise<boolean>;
  webSearch: (query: string) => Promise<{ success: boolean; results: string[]; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
