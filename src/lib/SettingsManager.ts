import { AppSettings, MCPServerConfig } from '../types';

export class SettingsManager {
  private settings: AppSettings = {
    initialized: false,
    theme: 'glass',
  };

  private mcpServers: MCPServerConfig[] = [];

  public getSettings(): AppSettings {
    return { ...this.settings };
  }

  public saveSettings(settings: AppSettings): boolean {
    this.settings = { ...this.settings, ...settings };
    return true;
  }

  public isInitialized(): boolean {
    return this.settings.initialized || false;
  }

  public setInitialized(value: boolean): void {
    this.settings.initialized = value;
  }

  public addMCPServer(server: MCPServerConfig): boolean {
    const id = server.id || Date.now().toString();
    this.mcpServers.push({ ...server, id, enabled: server.enabled !== false });
    return true;
  }

  public getMCPServers(): MCPServerConfig[] {
    return [...this.mcpServers];
  }

  public deleteMCPServer(id: string): boolean {
    const index = this.mcpServers.findIndex(s => s.id === id);
    if (index === -1) return false;
    this.mcpServers.splice(index, 1);
    return true;
  }

  public toggleMCPServer(id: string, enabled: boolean): boolean {
    const server = this.mcpServers.find(s => s.id === id);
    if (!server) return false;
    server.enabled = enabled;
    return true;
  }
}

export const settingsManager = new SettingsManager();
