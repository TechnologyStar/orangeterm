import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServerConfig } from '../../types';

interface ServerContextType {
  servers: ServerConfig[];
  currentServer: ServerConfig | null;
  refreshServers: () => Promise<void>;
  setCurrentServer: (id: string) => Promise<void>;
  addServer: (server: Omit<ServerConfig, 'id'>) => Promise<ServerConfig>;
  updateServer: (id: string, updates: Partial<ServerConfig>) => Promise<void>;
  deleteServer: (id: string) => Promise<void>;
  connectServer: (id: string) => Promise<{ success: boolean; error?: string }>;
  disconnectServer: (id: string) => Promise<void>;
  detectSystemInfo: (id: string) => Promise<void>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

export const ServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<ServerConfig[]>([]);
  const [currentServer, setCurrentServerState] = useState<ServerConfig | null>(null);

  const refreshServers = async () => {
    const allServers = await window.electronAPI.getAllServers();
    setServers(allServers);
    
    const current = await window.electronAPI.getCurrentServer();
    setCurrentServerState(current);
  };

  const setCurrentServer = async (id: string) => {
    await window.electronAPI.setCurrentServer(id);
    await refreshServers();
  };

  const addServer = async (server: Omit<ServerConfig, 'id'>) => {
    const newServer = await window.electronAPI.addServer(server);
    await refreshServers();
    return newServer;
  };

  const updateServer = async (id: string, updates: Partial<ServerConfig>) => {
    await window.electronAPI.updateServer(id, updates);
    await refreshServers();
  };

  const deleteServer = async (id: string) => {
    await window.electronAPI.deleteServer(id);
    await refreshServers();
  };

  const connectServer = async (id: string) => {
    const result = await window.electronAPI.connectServer(id);
    await refreshServers();
    return result;
  };

  const disconnectServer = async (id: string) => {
    await window.electronAPI.disconnectServer(id);
    await refreshServers();
  };

  const detectSystemInfo = async (id: string) => {
    await window.electronAPI.detectSystemInfo(id);
    await refreshServers();
  };

  useEffect(() => {
    refreshServers();
  }, []);

  return (
    <ServerContext.Provider
      value={{
        servers,
        currentServer,
        refreshServers,
        setCurrentServer,
        addServer,
        updateServer,
        deleteServer,
        connectServer,
        disconnectServer,
        detectSystemInfo,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = (): ServerContextType => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within ServerProvider');
  }
  return context;
};
