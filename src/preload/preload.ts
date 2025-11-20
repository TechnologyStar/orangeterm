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
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
