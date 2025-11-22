import React, { useState, useEffect } from 'react';
import { Space, Tag, Badge, Switch, Tooltip } from 'antd';
import {
  LockOutlined,
  CloudOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  CloudServerOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useServer } from '../contexts/ServerContext';

const StatusBar: React.FC = () => {
  const { t } = useLanguage();
  const { currentServer } = useServer();
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  
  useEffect(() => {
    window.electronAPI.getWebSearchEnabled().then(setWebSearchEnabled);
  }, []);
  
  useEffect(() => {
    if (!currentServer) {
      setLatency(null);
      return;
    }
    
    const checkLatency = async () => {
      try {
        const lat = await window.electronAPI.checkServerLatency(currentServer.id);
        setLatency(lat);
      } catch (error) {
        console.error('Failed to check latency:', error);
        setLatency(null);
      }
    };
    
    checkLatency();
    const interval = setInterval(checkLatency, 5000);
    
    return () => clearInterval(interval);
  }, [currentServer]);
  
  const handleWebSearchToggle = async (enabled: boolean) => {
    await window.electronAPI.setWebSearchEnabled(enabled);
    setWebSearchEnabled(enabled);
  };

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

        <Tooltip title={webSearchEnabled ? t.mcp.disableWebSearch : t.mcp.enableWebSearch}>
          <Space size="small">
            <GlobalOutlined style={{ color: webSearchEnabled ? '#52c41a' : '#666' }} />
            <span style={{ fontSize: '12px' }}>
              {webSearchEnabled ? t.status.webSearchEnabled : t.status.webSearchDisabled}
            </span>
            <Switch 
              size="small" 
              checked={webSearchEnabled} 
              onChange={handleWebSearchToggle}
            />
          </Space>
        </Tooltip>

        {currentServer && (
          <>
            <Space size="small">
              <CloudServerOutlined style={{ color: '#ff8c00' }} />
              <span style={{ fontSize: '12px' }}>{currentServer.name}</span>
              <Badge status="success" />
            </Space>
            
            {latency !== null && (
              <Space size="small">
                <ThunderboltOutlined style={{ 
                  color: latency < 50 ? '#52c41a' : latency < 150 ? '#ffa500' : '#ff4d4f' 
                }} />
                <span style={{ fontSize: '12px' }}>
                  {t.status.latency}: {latency}ms
                </span>
              </Space>
            )}
          </>
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
