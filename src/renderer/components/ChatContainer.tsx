import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import { useMessages } from '../contexts/MessageContext';
import ChatMessage from './ChatMessage';

const ChatContainer: React.FC = () => {
  const { messages } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card
      style={{
        flex: 1,
        margin: '0 16px',
        backgroundColor: '#000',
        border: '1px solid #303030',
        display: 'flex',
        flexDirection: 'column',
      }}
      bodyStyle={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
      }}
    >
      {messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </Card>
  );
};

export default ChatContainer;
