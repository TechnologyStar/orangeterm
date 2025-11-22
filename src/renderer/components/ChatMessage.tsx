import React from 'react';
import { Card, Tag, Typography, Collapse, Space } from 'antd';
import { UserOutlined, RobotOutlined, CheckCircleOutlined, CloseCircleOutlined, BulbOutlined, CodeOutlined } from '@ant-design/icons';
import { AIMessage } from '../../types';
import { useLanguage } from '../contexts/LanguageContext';

const { Text, Paragraph } = Typography;

interface ChatMessageProps {
  message: AIMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { t } = useLanguage();
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  const parseThinkingContent = (content: string) => {
    const thinkRegex = /<think>([\s\S]*?)<\/think>|<\\think>([\s\S]*?)<\/\\think>/gi;
    const parts: Array<{ type: 'text' | 'thinking', content: string }> = [];
    let lastIndex = 0;
    let match;
    
    while ((match = thinkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index),
        });
      }
      
      parts.push({
        type: 'thinking',
        content: match[1] || match[2] || '',
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex),
      });
    }
    
    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };
  
  const contentParts = parseThinkingContent(message.content);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
      }}
    >
      <Card
        size="small"
        style={{
          maxWidth: '70%',
          backgroundColor: isUser ? '#1890ff' : isSystem ? '#141414' : '#262626',
          border: isSystem ? '1px solid #1890ff' : 'none',
        }}
        bodyStyle={{ padding: '12px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {isUser ? (
            <UserOutlined style={{ color: '#fff' }} />
          ) : (
            <RobotOutlined style={{ color: '#1890ff' }} />
          )}
          <Text strong style={{ color: isUser ? '#fff' : '#fff' }}>
            {isUser ? 'You' : isSystem ? 'System' : 'AI Assistant'}
          </Text>
          <Text type="secondary" style={{ fontSize: '11px', marginLeft: 'auto' }}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </Text>
        </div>

        {contentParts.map((part, index) => (
          part.type === 'thinking' ? (
            <Collapse
              key={index}
              ghost
              style={{ marginBottom: '8px' }}
              items={[{
                key: '1',
                label: (
                  <span style={{ color: '#ffa500' }}>
                    <BulbOutlined style={{ marginRight: '8px' }} />
                    {t.chat.thinking}
                  </span>
                ),
                children: (
                  <Card
                    size="small"
                    style={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #ff8c00',
                      boxShadow: '0 2px 8px rgba(255, 140, 0, 0.1)',
                    }}
                  >
                    <Paragraph
                      style={{
                        margin: 0,
                        color: '#d4d4d4',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        fontStyle: 'italic',
                      }}
                    >
                      {part.content}
                    </Paragraph>
                  </Card>
                ),
              }]}
            />
          ) : (
            <Paragraph
              key={index}
              style={{
                margin: 0,
                color: '#fff',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginBottom: '8px',
              }}
            >
              {part.content}
            </Paragraph>
          )
        ))}

        {message.prompt && (
          <Card
            size="small"
            style={{
              marginTop: '8px',
              backgroundColor: '#0a0a0a',
              border: '1px solid #52c41a',
            }}
          >
            <Space>
              <CodeOutlined style={{ color: '#52c41a' }} />
              <Text style={{ color: '#52c41a', fontSize: '12px' }}>
                {t.chat.prompt}: {message.prompt}
              </Text>
            </Space>
          </Card>
        )}

        {message.command && (
          <Card
            size="small"
            style={{
              marginTop: '8px',
              backgroundColor: '#000',
              border: '1px solid #434343',
            }}
          >
            <Text code style={{ color: '#fff' }}>
              $ {message.command}
            </Text>
          </Card>
        )}

        {message.executionResult && (
          <div style={{ marginTop: '8px' }}>
            <Tag
              icon={message.executionResult.success ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
              color={message.executionResult.success ? 'success' : 'error'}
            >
              {message.executionResult.success ? 'Success' : 'Failed'}
            </Tag>
            
            {message.executionResult.output && (
              <Card
                size="small"
                style={{
                  marginTop: '8px',
                  backgroundColor: '#000',
                  border: '1px solid #434343',
                  maxHeight: '200px',
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0, color: '#52c41a', fontSize: '12px' }}>
                  {message.executionResult.output}
                </pre>
              </Card>
            )}

            {message.executionResult.error && (
              <Card
                size="small"
                style={{
                  marginTop: '8px',
                  backgroundColor: '#000',
                  border: '1px solid #ff4d4f',
                  maxHeight: '200px',
                  overflow: 'auto',
                }}
              >
                <pre style={{ margin: 0, color: '#ff4d4f', fontSize: '12px' }}>
                  {message.executionResult.error}
                </pre>
              </Card>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChatMessage;
