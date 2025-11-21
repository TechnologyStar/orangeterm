import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Space, message } from 'antd';
import { CloudServerOutlined, SyncOutlined } from '@ant-design/icons';
import { useServer } from '../contexts/ServerContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ServerConfig } from '../../types';

interface ServerFormProps {
  server: ServerConfig | null;
  onClose: () => void;
}

const ServerForm: React.FC<ServerFormProps> = ({ server, onClose }) => {
  const { addServer, updateServer, connectServer, detectSystemInfo } = useServer();
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    if (server) {
      form.setFieldsValue(server);
    } else {
      form.resetFields();
    }
  }, [server, form]);

  const handleSubmit = async (values: Omit<ServerConfig, 'id'>) => {
    setLoading(true);
    try {
      if (server) {
        await updateServer(server.id, values);
        message.success(t.common.success);
      } else {
        await addServer(values);
        message.success(t.common.success);
      }
      onClose();
    } catch (error) {
      message.error(t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoDetect = async () => {
    try {
      await form.validateFields(['name', 'host', 'port', 'username', 'password']);
      const values = form.getFieldsValue();
      
      setDetecting(true);
      message.loading({ content: t.server.detecting, key: 'detect' });

      const tempServer = await addServer(values);
      const result = await connectServer(tempServer.id);
      
      if (result.success) {
        await detectSystemInfo(tempServer.id);
        message.success({ content: t.server.connectionSuccess, key: 'detect' });
      } else {
        message.error({ content: result.error || t.server.connectionFailed, key: 'detect' });
      }
    } catch (error) {
      message.error({ content: t.common.error, key: 'detect' });
    } finally {
      setDetecting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        port: 22,
      }}
    >
      <Form.Item
        name="name"
        label={t.server.name}
        rules={[{ required: true, message: t.server.name }]}
      >
        <Input prefix={<CloudServerOutlined />} placeholder={t.server.name} />
      </Form.Item>

      <Form.Item
        name="host"
        label={t.server.host}
        rules={[{ required: true, message: t.server.host }]}
      >
        <Input placeholder="192.168.1.100" />
      </Form.Item>

      <Form.Item
        name="port"
        label={t.server.port}
        rules={[{ required: true, message: t.server.port }]}
      >
        <InputNumber min={1} max={65535} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="username"
        label={t.server.username}
        rules={[{ required: true, message: t.server.username }]}
      >
        <Input placeholder="root" />
      </Form.Item>

      <Form.Item
        name="password"
        label={t.server.password}
        rules={[{ required: true, message: t.server.password }]}
      >
        <Input.Password placeholder={t.server.password} />
      </Form.Item>

      <Form.Item>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button
            icon={<SyncOutlined />}
            onClick={handleAutoDetect}
            loading={detecting}
          >
            {t.server.autoDetect}
          </Button>
          <Space>
            <Button onClick={onClose}>{t.common.cancel}</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)' }}
            >
              {t.common.save}
            </Button>
          </Space>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ServerForm;
