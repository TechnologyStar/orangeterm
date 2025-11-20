import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthorizationMode } from '../../types';

interface AuthContextType {
  mode: AuthorizationMode;
  setMode: (mode: AuthorizationMode) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AuthorizationMode>('manual_highrisk');

  return (
    <AuthContext.Provider value={{ mode, setMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
