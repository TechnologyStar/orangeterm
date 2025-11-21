import React from 'react';
import { Space, Tag, Badge } from 'antd';
import {
  LockOutlined,
  CloudOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  CloudServerOutlined,
} from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useServer } from '../contexts/ServerContext';

const StatusBar: React.FC = () => {
  const { t } = useLanguage();
  const { currentServer } = useServer();

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
          <span style={{ fontSize: '12px' }}>{t.status.virtualCredentials}</span>
          <Badge status="success" />
        </Space>

        <Space size="small">
          <DatabaseOutlined style={{ color: '#ff8c00' }} />
          <span style={{ fontSize: '12px' }}>{t.status.knowledgeBase}</span>
          <Badge status="processing" />
        </Space>

        <Space size="small">
          <CloudOutlined style={{ color: '#ff8c00' }} />
          <span style={{ fontSize: '12px' }}>{t.status.mcpEnabled}</span>
          <Badge status="processing" />
        </Space>

        {currentServer && (
          <Space size="small">
            <CloudServerOutlined style={{ color: '#ff8c00' }} />
            <span style={{ fontSize: '12px' }}>{currentServer.name}</span>
            <Badge status="success" />
          </Space>
        )}
      </Space>

      <Space>
        <Tag icon={<CheckCircleOutlined />} color="success">
          {t.status.systemReady}
        </Tag>
      </Space>
    </div>
  );
};

export default StatusBar;
