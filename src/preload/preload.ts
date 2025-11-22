import { contextBridge, ipcRenderer } from 'electron';
import { ElectronAPI } from '../types';

const electronAPI: ElectronAPI = {
  executeCommand: (cmd: string) => ipcRenderer.invoke('execute-command', cmd),
  
  checkCommandRisk: (cmd: string) => ipcRenderer.invoke('check-command-risk', cmd),
  
  getKnowledgeBase: (keyword?: string) => ipcRenderer.invoke('get-knowledge-base', keyword),
  
  searchOnline: (query: string) => ipcRenderer.invoke('search-online', query),
  
  sendToMCP: (message: string) => ipcRenderer.invoke('send-to-mcp', message),
  
  onCommandOutput: (callback: (data: string) => void) => {
    ipcRenderer.on('command-output', (_event, data) => callback(data));
  },

  addServer: (server) => ipcRenderer.invoke('add-server', server),
  
  updateServer: (id, updates) => ipcRenderer.invoke('update-server', id, updates),
  
  deleteServer: (id) => ipcRenderer.invoke('delete-server', id),
  
  getServer: (id) => ipcRenderer.invoke('get-server', id),
  
  getAllServers: () => ipcRenderer.invoke('get-all-servers'),
  
  connectServer: (id) => ipcRenderer.invoke('connect-server', id),
  
  disconnectServer: (id) => ipcRenderer.invoke('disconnect-server', id),
  
  detectSystemInfo: (id) => ipcRenderer.invoke('detect-system-info', id),
  
  setCurrentServer: (id) => ipcRenderer.invoke('set-current-server', id),
  
  getCurrentServer: () => ipcRenderer.invoke('get-current-server'),
  
  executeCommandOnServer: (id, cmd) => ipcRenderer.invoke('execute-command-on-server', id, cmd),
  
  checkServerLatency: (id) => ipcRenderer.invoke('check-server-latency', id),
  
  getServerPrompt: (id) => ipcRenderer.invoke('get-server-prompt', id),
  
  setWebSearchEnabled: (enabled) => ipcRenderer.invoke('set-web-search-enabled', enabled),
  
  getWebSearchEnabled: () => ipcRenderer.invoke('get-web-search-enabled'),
  
  webSearch: (query) => ipcRenderer.invoke('web-search', query),
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
