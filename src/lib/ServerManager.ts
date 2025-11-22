import { Client } from 'ssh2';

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

export class ServerManager {
  private servers: Map<string, ServerConfig> = new Map();
  private connections: Map<string, Client> = new Map();
  private currentServerId: string | null = null;

  addServer(server: Omit<ServerConfig, 'id'>): ServerConfig {
    const id = Date.now().toString();
    const newServer: ServerConfig = {
      ...server,
      id,
      status: 'disconnected',
    };
    this.servers.set(id, newServer);
    return newServer;
  }

  updateServer(id: string, updates: Partial<ServerConfig>): ServerConfig | null {
    const server = this.servers.get(id);
    if (!server) return null;
    
    const updated = { ...server, ...updates };
    this.servers.set(id, updated);
    return updated;
  }

  deleteServer(id: string): boolean {
    this.disconnect(id);
    return this.servers.delete(id);
  }

  getServer(id: string): ServerConfig | null {
    return this.servers.get(id) || null;
  }

  getAllServers(): ServerConfig[] {
    return Array.from(this.servers.values());
  }

  setCurrentServer(id: string): boolean {
    if (this.servers.has(id)) {
      this.currentServerId = id;
      return true;
    }
    return false;
  }

  getCurrentServer(): ServerConfig | null {
    if (!this.currentServerId) return null;
    return this.servers.get(this.currentServerId) || null;
  }

  async connect(id: string): Promise<{ success: boolean; error?: string }> {
    const server = this.servers.get(id);
    if (!server) {
      return { success: false, error: 'Server not found' };
    }

    return new Promise((resolve) => {
      const client = new Client();

      client.on('ready', () => {
        this.connections.set(id, client);
        this.updateServer(id, { status: 'connected' });
        resolve({ success: true });
      });

      client.on('error', (err) => {
        this.updateServer(id, { status: 'error' });
        resolve({ success: false, error: err.message });
      });

      client.connect({
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        readyTimeout: 10000,
      });
    });
  }

  disconnect(id: string): void {
    const client = this.connections.get(id);
    if (client) {
      client.end();
      this.connections.delete(id);
    }
    this.updateServer(id, { status: 'disconnected' });
  }

  async detectSystemInfo(id: string): Promise<ServerSystemInfo | null> {
    const client = this.connections.get(id);
    if (!client) {
      return null;
    }

    return new Promise((resolve) => {
      client.exec(
        `echo "===CPU==="; lscpu | grep "Model name" | cut -d: -f2 | xargs; ` +
        `nproc; ` +
        `echo "===MEMORY==="; free -h | grep "Mem:" | awk '{print $2,$3,$4}'; ` +
        `free | grep "Mem:" | awk '{printf "%.1f", $3/$2 * 100}'; ` +
        `echo "===DISK==="; df -h / | tail -1 | awk '{print $2,$3,$4,$5}'; ` +
        `echo "===OS==="; cat /etc/os-release | grep "PRETTY_NAME" | cut -d'"' -f2; ` +
        `uname -r; ` +
        `echo "===UPTIME==="; uptime -p; ` +
        `hostname`,
        (err, stream) => {
          if (err) {
            resolve(null);
            return;
          }

          let output = '';
          stream.on('data', (data: Buffer) => {
            output += data.toString();
          });

          stream.on('close', () => {
            const lines = output.split('\n').filter(line => line.trim());
            
            const cpuIdx = lines.findIndex(l => l.includes('===CPU==='));
            const memIdx = lines.findIndex(l => l.includes('===MEMORY==='));
            const diskIdx = lines.findIndex(l => l.includes('===DISK==='));
            const osIdx = lines.findIndex(l => l.includes('===OS==='));
            const uptimeIdx = lines.findIndex(l => l.includes('===UPTIME==='));

            const cpu = lines[cpuIdx + 1] || 'Unknown';
            const cpuCores = parseInt(lines[cpuIdx + 2] || '0');
            
            const memParts = lines[memIdx + 1]?.split(' ') || [];
            const memPercentage = parseFloat(lines[memIdx + 2] || '0');
            
            const diskParts = lines[diskIdx + 1]?.split(' ') || [];
            const diskPercentage = parseFloat((diskParts[3] || '0').replace('%', ''));
            
            const os = lines[osIdx + 1] || 'Unknown';
            const kernel = lines[osIdx + 2] || 'Unknown';
            const uptime = lines[uptimeIdx + 1] || 'Unknown';
            const hostname = lines[lines.length - 1] || 'Unknown';

            const systemInfo: ServerSystemInfo = {
              cpu,
              cpuCores,
              memory: {
                total: memParts[0] || '0',
                used: memParts[1] || '0',
                free: memParts[2] || '0',
                percentage: memPercentage,
              },
              disk: {
                total: diskParts[0] || '0',
                used: diskParts[1] || '0',
                free: diskParts[2] || '0',
                percentage: diskPercentage,
              },
              os,
              kernel,
              uptime,
              hostname,
            };

            this.updateServer(id, { systemInfo });
            resolve(systemInfo);
          });
        }
      );
    });
  }

  async executeCommand(id: string, command: string): Promise<{ output: string; error?: string }> {
    const client = this.connections.get(id);
    if (!client) {
      return { output: '', error: 'Not connected to server' };
    }

    return new Promise((resolve) => {
      client.exec(command, (err, stream) => {
        if (err) {
          resolve({ output: '', error: err.message });
          return;
        }

        let stdout = '';
        let stderr = '';

        stream.on('data', (data: Buffer) => {
          stdout += data.toString();
        });

        stream.stderr.on('data', (data: Buffer) => {
          stderr += data.toString();
        });

        stream.on('close', () => {
          resolve({
            output: stdout,
            error: stderr || undefined,
          });
        });
      });
    });
  }

  async checkLatency(id: string): Promise<number> {
    const server = this.servers.get(id);
    if (!server || server.status !== 'connected') {
      return -1;
    }

    const client = this.connections.get(id);
    if (!client) {
      return -1;
    }

    const startTime = Date.now();
    
    return new Promise((resolve) => {
      client.exec('echo "ping"', (err, stream) => {
        if (err) {
          resolve(-1);
          return;
        }

        stream.on('close', () => {
          const latency = Date.now() - startTime;
          this.updateServer(id, { 
            latency,
            lastChecked: Date.now(),
          });
          resolve(latency);
        });

        stream.on('data', () => {});
      });

      setTimeout(() => {
        resolve(-1);
      }, 5000);
    });
  }

  async getPrompt(id: string): Promise<string> {
    const client = this.connections.get(id);
    if (!client) {
      return '';
    }

    return new Promise((resolve) => {
      client.exec('echo $PS1 2>/dev/null || echo "$ "', (err, stream) => {
        if (err) {
          resolve('$ ');
          return;
        }

        let output = '';
        stream.on('data', (data: Buffer) => {
          output += data.toString();
        });

        stream.on('close', () => {
          const prompt = output.trim() || '$ ';
          resolve(prompt);
        });

        setTimeout(() => {
          resolve('$ ');
        }, 2000);
      });
    });
  }
}

export const serverManager = new ServerManager();
