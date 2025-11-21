import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AIMessage } from '../../types';

interface MessageContextType {
  messages: AIMessage[];
  addMessage: (message: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<AIMessage>) => void;
  clearMessages: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'system',
      content: 'Welcome to OrangeTerm! I\'m your AI operations assistant. I can help you execute commands, manage systems, and provide insights. What would you like to do today?',
      timestamp: Date.now(),
    },
  ]);

  const addMessage = (message: Omit<AIMessage, 'id' | 'timestamp'>) => {
    const newMessage: AIMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const updateMessage = (id: string, updates: Partial<AIMessage>) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage, updateMessage, clearMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within MessageProvider');
  }
  return context;
};
