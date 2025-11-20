import React from 'react';
import { Radio, Card, Space } from 'antd';
import { SafetyOutlined, WarningOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const AuthorizationModeSelector: React.FC = () => {
  const { mode, setMode } = useAuth();

  return (
    <Card
      size="small"
      style={{
        margin: '16px',
        backgroundColor: '#141414',
        border: '1px solid #303030',
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SafetyOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Authorization Mode</span>
        </div>
        
        <Radio.Group
          onChange={e => setMode(e.target.value)}
          value={mode}
          optionType="button"
          buttonStyle="solid"
          style={{ width: '100%' }}
        >
          <Radio.Button value="manual_all" style={{ flex: 1, textAlign: 'center' }}>
            <SafetyOutlined /> Manual All
          </Radio.Button>
          <Radio.Button value="manual_highrisk" style={{ flex: 1, textAlign: 'center' }}>
            <WarningOutlined /> High Risk Only
          </Radio.Button>
          <Radio.Button value="auto" style={{ flex: 1, textAlign: 'center' }}>
            <ThunderboltOutlined /> Automatic
          </Radio.Button>
        </Radio.Group>

        <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          {mode === 'manual_all' && 'All commands require manual authorization'}
          {mode === 'manual_highrisk' && 'Only high-risk commands require authorization'}
          {mode === 'auto' && 'Commands execute automatically without authorization'}
        </div>
      </Space>
    </Card>
  );
};

export default AuthorizationModeSelector;
