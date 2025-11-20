import React from 'react';
import { Space, Tag, Badge } from 'antd';
import {
  LockOutlined,
  CloudOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const StatusBar: React.FC = () => {
  return (
    <div
      style={{
        padding: '8px 16px',
        borderTop: '1px solid #303030',
        backgroundColor: '#141414',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Space size="large">
        <Space size="small">
          <LockOutlined style={{ color: '#52c41a' }} />
          <span style={{ fontSize: '12px' }}>Virtual credentials active</span>
          <Badge status="success" />
        </Space>

        <Space size="small">
          <DatabaseOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontSize: '12px' }}>Knowledge base connected</span>
          <Badge status="processing" />
        </Space>

        <Space size="small">
          <CloudOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontSize: '12px' }}>MCP enabled</span>
          <Badge status="processing" />
        </Space>
      </Space>

      <Space>
        <Tag icon={<CheckCircleOutlined />} color="success">
          System Ready
        </Tag>
      </Space>
    </div>
  );
};

export default StatusBar;
