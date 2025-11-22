import React, { useState } from 'react';
import { Modal, Steps, Button, Form, Input, Select, message } from 'antd';
import { RobotOutlined, ApiOutlined, CloudServerOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';
import { APIConfig } from '../../types';

interface InitWizardProps {
  visible: boolean;
  onComplete: () => void;
}

const InitWizard: React.FC<InitWizardProps> = ({ visible, onComplete }) => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [apiForm] = Form.useForm();
  const [serverForm] = Form.useForm();

  const handleApiSkip = () => {
    setCurrent(2);
  };

  const handleApiNext = async () => {
    try {
      const values = await apiForm.validateFields();
      const apiConfig: APIConfig = {
        provider: values.provider,
        apiKey: values.apiKey,
        baseURL: values.baseURL,
        model: values.model,
      };
      
      await window.electronAPI.saveSettings({ apiConfig });
      message.success(t.common.success);
      setCurrent(2);
    } catch (error) {
      console.error('API config error:', error);
    }
  };

  const handleServerSkip = () => {
    setCurrent(3);
  };

  const handleServerNext = async () => {
    try {
      const values = await serverForm.validateFields();
      await window.electronAPI.addServer({
        name: values.name,
        host: values.host,
        port: values.port || 22,
        username: values.username,
        password: values.password,
      });
      message.success(t.common.success);
      setCurrent(3);
    } catch (error) {
      console.error('Server config error:', error);
    }
  };

  const handleComplete = async () => {
    await window.electronAPI.saveSettings({ initialized: true });
    message.success(t.wizard.completeDesc);
    onComplete();
  };

  const steps = [
    {
      title: t.wizard.welcome,
      icon: <RobotOutlined />,
      content: (
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 32px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RobotOutlined style={{ fontSize: '64px', color: '#6366f1' }} />
          </div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#1f2937' }}>
            {t.wizard.welcome}
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6' }}>
            {t.wizard.welcomeDesc}
          </p>
        </div>
      ),
    },
    {
      title: t.wizard.apiSetup,
      icon: <ApiOutlined />,
      content: (
        <div style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '8px', color: '#1f2937' }}>
            {t.wizard.apiSetup}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
            {t.wizard.apiSetupDesc}
          </p>
          <Form form={apiForm} layout="vertical">
            <Form.Item
              label={t.settings.provider}
              name="provider"
              initialValue="openai"
              rules={[{ required: true }]}
            >
              <Select size="large">
                <Select.Option value="openai">{t.settings.openai}</Select.Option>
                <Select.Option value="azure">{t.settings.azure}</Select.Option>
                <Select.Option value="custom">{t.settings.custom}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={t.settings.apiKey}
              name="apiKey"
              rules={[{ required: true, message: t.settings.enterApiKey }]}
            >
              <Input.Password size="large" placeholder={t.settings.enterApiKey} />
            </Form.Item>
            <Form.Item
              label={t.settings.baseURL}
              name="baseURL"
            >
              <Input size="large" placeholder={t.settings.enterBaseURL} />
            </Form.Item>
            <Form.Item
              label={t.settings.model}
              name="model"
            >
              <Input size="large" placeholder={t.settings.enterModel} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: t.wizard.serverSetup,
      icon: <CloudServerOutlined />,
      content: (
        <div style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '8px', color: '#1f2937' }}>
            {t.wizard.serverSetup}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '32px' }}>
            {t.wizard.serverSetupDesc}
          </p>
          <Form form={serverForm} layout="vertical">
            <Form.Item
              label={t.server.name}
              name="name"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder={t.server.name} />
            </Form.Item>
            <Form.Item
              label={t.server.host}
              name="host"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder={t.server.host} />
            </Form.Item>
            <Form.Item
              label={t.server.port}
              name="port"
              initialValue={22}
            >
              <Input size="large" type="number" placeholder="22" />
            </Form.Item>
            <Form.Item
              label={t.server.username}
              name="username"
              rules={[{ required: true }]}
            >
              <Input size="large" placeholder={t.server.username} />
            </Form.Item>
            <Form.Item
              label={t.server.password}
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password size="large" placeholder={t.server.password} />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: t.wizard.complete,
      icon: <CheckCircleOutlined />,
      content: (
        <div style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 32px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleOutlined style={{ fontSize: '64px', color: '#22c55e' }} />
          </div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#1f2937' }}>
            {t.wizard.complete}
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.6' }}>
            {t.wizard.completeDesc}
          </p>
        </div>
      ),
    },
  ];

  const renderFooter = () => {
    if (current === 0) {
      return (
        <Button type="primary" size="large" onClick={() => setCurrent(1)}>
          {t.wizard.getStarted}
        </Button>
      );
    }
    
    if (current === 1) {
      return (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button size="large" onClick={handleApiSkip}>
            {t.wizard.skip}
          </Button>
          <Button type="primary" size="large" onClick={handleApiNext}>
            {t.wizard.next}
          </Button>
        </div>
      );
    }
    
    if (current === 2) {
      return (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button size="large" onClick={() => setCurrent(1)}>
            {t.wizard.previous}
          </Button>
          <Button size="large" onClick={handleServerSkip}>
            {t.wizard.skip}
          </Button>
          <Button type="primary" size="large" onClick={handleServerNext}>
            {t.wizard.next}
          </Button>
        </div>
      );
    }
    
    return (
      <Button type="primary" size="large" onClick={handleComplete}>
        {t.wizard.finish}
      </Button>
    );
  };

  return (
    <Modal
      open={visible}
      closable={false}
      maskClosable={false}
      width={700}
      footer={null}
      styles={{
        body: { padding: 0 },
        mask: { backdropFilter: 'blur(8px)' },
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >
      <div>
        <Steps
          current={current}
          items={steps.map(item => ({ title: item.title, icon: item.icon }))}
          style={{ padding: '32px 40px 0' }}
        />
        
        <div style={{ minHeight: '400px' }}>
          {steps[current].content}
        </div>
        
        <div style={{ 
          padding: '24px 40px', 
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          {renderFooter()}
        </div>
      </div>
    </Modal>
  );
};

export default InitWizard;
