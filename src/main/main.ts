import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { spawn } from 'child_process';
import { credentialMapper } from '../lib/CredentialMapper';
import { commandRiskAnalyzer } from '../lib/CommandRiskAnalyzer';
import { knowledgeBase } from '../lib/KnowledgeBase';
import { mcpClient } from '../lib/MCPClient';
import { serverManager } from '../lib/ServerManager';
import { CommandExecutionResult, ServerConfig } from '../types';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js'),
    },
    title: 'OrangeTerm - AI Operations Assistant',
    backgroundColor: '#1f1f1f',
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  createWindow();
  
  await mcpClient.initialize();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    mcpClient.shutdown();
    app.quit();
  }
});

ipcMain.handle('execute-command', async (_event, cmd: string): Promise<CommandExecutionResult> => {
  try {
    const realCmd = credentialMapper.replaceVirtualToReal(cmd);
    
    return new Promise((resolve) => {
      const childProcess = spawn(realCmd, {
        shell: true,
        env: { ...process.env },
      });

      let stdout = '';
      let stderr = '';

      childProcess.stdout?.on('data', (data: Buffer) => {
        const output = data.toString();
        stdout += output;
        mainWindow?.webContents.send('command-output', output);
      });

      childProcess.stderr?.on('data', (data: Buffer) => {
        const output = data.toString();
        stderr += output;
        mainWindow?.webContents.send('command-output', output);
      });

      childProcess.on('close', (code: number | null) => {
        resolve({
          success: code === 0,
          output: stdout,
          error: stderr,
          exitCode: code || 0,
        });
      });

      childProcess.on('error', (error: Error) => {
        resolve({
          success: false,
          error: error.message,
          exitCode: -1,
        });
      });
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      exitCode: -1,
    };
  }
});

ipcMain.handle('check-command-risk', async (_event, cmd: string) => {
  const analysis = commandRiskAnalyzer.analyze(cmd);
  return {
    isHighRisk: analysis.isHighRisk,
    reason: analysis.reason,
    riskLevel: analysis.riskLevel,
  };
});

ipcMain.handle('get-knowledge-base', async (_event, keyword?: string) => {
  return knowledgeBase.query(keyword);
});

ipcMain.handle('search-online', async (_event, query: string) => {
  try {
    console.log('Online search for:', query);
    return `Search results for: ${query}\n\nOnline search integration is ready. Connect to your preferred search API.`;
  } catch (error) {
    return 'Error performing online search';
  }
});

ipcMain.handle('send-to-mcp', async (_event, message: string) => {
  try {
    return await mcpClient.sendMessage(message);
  } catch (error) {
    console.error('MCP error:', error);
    return 'Error communicating with MCP server';
  }
});

ipcMain.handle('add-server', async (_event, server: Omit<ServerConfig, 'id'>) => {
  return serverManager.addServer(server);
});

ipcMain.handle('update-server', async (_event, id: string, updates: Partial<ServerConfig>) => {
  return serverManager.updateServer(id, updates);
});

ipcMain.handle('delete-server', async (_event, id: string) => {
  return serverManager.deleteServer(id);
});

ipcMain.handle('get-server', async (_event, id: string) => {
  return serverManager.getServer(id);
});

ipcMain.handle('get-all-servers', async () => {
  return serverManager.getAllServers();
});

ipcMain.handle('connect-server', async (_event, id: string) => {
  return await serverManager.connect(id);
});

ipcMain.handle('disconnect-server', async (_event, id: string) => {
  serverManager.disconnect(id);
});

ipcMain.handle('detect-system-info', async (_event, id: string) => {
  return await serverManager.detectSystemInfo(id);
});

ipcMain.handle('set-current-server', async (_event, id: string) => {
  return serverManager.setCurrentServer(id);
});

ipcMain.handle('get-current-server', async () => {
  return serverManager.getCurrentServer();
});

ipcMain.handle('execute-command-on-server', async (_event, id: string, cmd: string) => {
  return await serverManager.executeCommand(id, cmd);
});
