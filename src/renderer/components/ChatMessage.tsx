import React from 'react';
import { Card, Tag, Typography } from 'antd';
import { UserOutlined, RobotOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AIMessage } from '../../types';

const { Text, Paragraph } = Typography;

interface ChatMessageProps {
  message: AIMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

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

        <Paragraph
          style={{
            margin: 0,
            color: '#fff',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </Paragraph>

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
