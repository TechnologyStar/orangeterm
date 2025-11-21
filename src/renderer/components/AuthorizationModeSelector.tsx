import React from 'react';
import { Radio, Card, Space } from 'antd';
import { SafetyOutlined, WarningOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const AuthorizationModeSelector: React.FC = () => {
  const { mode, setMode } = useAuth();
  const { t } = useLanguage();

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
          <SafetyOutlined style={{ fontSize: '16px', color: '#ff8c00' }} />
          <span style={{ fontWeight: 600, fontSize: '14px' }}>{t.auth.title}</span>
        </div>
        
        <Radio.Group
          onChange={e => setMode(e.target.value)}
          value={mode}
          optionType="button"
          buttonStyle="solid"
          style={{ width: '100%' }}
        >
          <Radio.Button value="manual_all" style={{ flex: 1, textAlign: 'center' }}>
            <SafetyOutlined /> {t.auth.manualAll}
          </Radio.Button>
          <Radio.Button value="manual_highrisk" style={{ flex: 1, textAlign: 'center' }}>
            <WarningOutlined /> {t.auth.manualHighRisk}
          </Radio.Button>
          <Radio.Button value="auto" style={{ flex: 1, textAlign: 'center' }}>
            <ThunderboltOutlined /> {t.auth.auto}
          </Radio.Button>
        </Radio.Group>

        <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
          {mode === 'manual_all' && t.auth.manualAllDesc}
          {mode === 'manual_highrisk' && t.auth.manualHighRiskDesc}
          {mode === 'auto' && t.auth.autoDesc}
        </div>
      </Space>
    </Card>
  );
};

export default AuthorizationModeSelector;
