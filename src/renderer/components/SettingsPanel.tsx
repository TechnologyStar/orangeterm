import React, { useState, useEffect } from 'react';
import { Tabs, Card, Form, Input, Select, Button, message, Space, Table, Modal, Radio } from 'antd';
import { ApiOutlined, BookOutlined, CloudServerOutlined, BgColorsOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';
import { KnowledgeBaseEntry, MCPServerConfig } from '../../types';

const SettingsPanel: React.FC = () => {
  const { t } = useLanguage();
  const [apiForm] = Form.useForm();
  const [knowledgeForm] = Form.useForm();
  const [mcpForm] = Form.useForm();
  
  const [knowledgeEntries, setKnowledgeEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [mcpServers, setMcpServers] = useState<MCPServerConfig[]>([]);
  const [knowledgeModalVisible, setKnowledgeModalVisible] = useState(false);
  const [mcpModalVisible, setMcpModalVisible] = useState(false);
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeBaseEntry | null>(null);
  const [theme, setTheme] = useState<'dark' | 'glass'>('glass');

  useEffect(() => {
    const init = async () => {
      const settings = await window.electronAPI.getSettings();
      if (settings.apiConfig) {
        apiForm.setFieldsValue(settings.apiConfig);
      }
      if (settings.theme) {
        setTheme(settings.theme);
      }
      
      const entries = await window.electronAPI.getKnowledgeBase();
      setKnowledgeEntries(entries);
      
      const servers = await window.electronAPI.getMCPServers();
      setMcpServers(servers);
    };
    
    init();
  }, [apiForm]);

  const loadKnowledge = async () => {
    const entries = await window.electronAPI.getKnowledgeBase();
    setKnowledgeEntries(entries);
  };

  const loadMcpServers = async () => {
    const servers = await window.electronAPI.getMCPServers();
    setMcpServers(servers);
  };

  const handleApiSave = async () => {
    try {
      const values = await apiForm.validateFields();
      await window.electronAPI.saveSettings({ apiConfig: values });
      message.success(t.common.success);
    } catch (error) {
      message.error(t.common.error);
    }
  };

  const handleThemeChange = async (newTheme: 'dark' | 'glass') => {
    try {
      await window.electronAPI.saveSettings({ theme: newTheme });
      setTheme(newTheme);
      message.success(t.common.success);
      message.info('Please restart the app for theme changes to take effect');
    } catch (error) {
      message.error(t.common.error);
    }
  };

  const handleKnowledgeAdd = () => {
    setEditingKnowledge(null);
    knowledgeForm.resetFields();
    setKnowledgeModalVisible(true);
  };

  const handleKnowledgeEdit = (entry: KnowledgeBaseEntry) => {
    setEditingKnowledge(entry);
    knowledgeForm.setFieldsValue({
      ...entry,
      examples: entry.examples?.join('\n'),
    });
    setKnowledgeModalVisible(true);
  };

  const handleKnowledgeSave = async () => {
    try {
      const values = await knowledgeForm.validateFields();
      const entry: KnowledgeBaseEntry = {
        command: values.command,
        description: values.description,
        usage: values.usage,
        examples: values.examples ? values.examples.split('\n').filter((e: string) => e.trim()) : [],
        riskLevel: values.riskLevel,
      };
      
      await window.electronAPI.addKnowledgeEntry(entry);
      message.success(t.common.success);
      setKnowledgeModalVisible(false);
      loadKnowledge();
    } catch (error) {
      message.error(t.common.error);
    }
  };

  const handleKnowledgeDelete = async (command: string) => {
    Modal.confirm({
      title: t.knowledge.confirmDelete,
      onOk: async () => {
        await window.electronAPI.deleteKnowledgeEntry(command);
        message.success(t.common.success);
        loadKnowledge();
      },
    });
  };

  const handleMcpAdd = () => {
    mcpForm.resetFields();
    setMcpModalVisible(true);
  };

  const handleMcpSave = async () => {
    try {
      const values = await mcpForm.validateFields();
      const server: MCPServerConfig = {
        name: values.name,
        command: values.command,
        args: values.args ? values.args.split(' ').filter((a: string) => a.trim()) : [],
        env: values.env ? JSON.parse(values.env) : {},
        enabled: true,
      };
      
      await window.electronAPI.addMCPServer(server);
      message.success(t.common.success);
      setMcpModalVisible(false);
      loadMcpServers();
    } catch (error) {
      message.error(t.common.error);
    }
  };

  const handleMcpDelete = async (id: string) => {
    Modal.confirm({
      title: t.mcpServer.confirmDelete,
      onOk: async () => {
        await window.electronAPI.deleteMCPServer(id);
        message.success(t.common.success);
        loadMcpServers();
      },
    });
  };

  const handleMcpToggle = async (id: string, enabled: boolean) => {
    await window.electronAPI.toggleMCPServer(id, enabled);
    loadMcpServers();
  };

  const knowledgeColumns = [
    {
      title: t.knowledge.command,
      dataIndex: 'command',
      key: 'command',
      width: 150,
    },
    {
      title: t.knowledge.description,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t.knowledge.riskLevel,
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 100,
      render: (level: string) => {
        const colors = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' };
        return <span style={{ color: colors[level as keyof typeof colors] }}>{level}</span>;
      },
    },
    {
      title: t.common.edit,
      key: 'actions',
      width: 120,
      render: (_: unknown, record: KnowledgeBaseEntry) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleKnowledgeEdit(record)}
          />
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleKnowledgeDelete(record.command)}
          />
        </Space>
      ),
    },
  ];

  const mcpColumns = [
    {
      title: t.mcpServer.name,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t.mcpServer.command,
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      render: (enabled: boolean) => (
        <span style={{ color: enabled ? '#22c55e' : '#6b7280' }}>
          {enabled ? t.mcpServer.enabled : t.mcpServer.disabled}
        </span>
      ),
    },
    {
      title: t.common.edit,
      key: 'actions',
      width: 150,
      render: (_: unknown, record: MCPServerConfig) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => handleMcpToggle(record.id!, !record.enabled)}
          >
            {record.enabled ? 'Disable' : 'Enable'}
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleMcpDelete(record.id!)}
          />
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: 'api',
      label: (
        <span>
          <ApiOutlined /> {t.settings.api}
        </span>
      ),
      children: (
        <Card>
          <Form form={apiForm} layout="vertical">
            <Form.Item
              label={t.settings.provider}
              name="provider"
              initialValue="openai"
              rules={[{ required: true }]}
            >
              <Select>
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
              <Input.Password placeholder={t.settings.enterApiKey} />
            </Form.Item>
            <Form.Item
              label={t.settings.baseURL}
              name="baseURL"
            >
              <Input placeholder={t.settings.enterBaseURL} />
            </Form.Item>
            <Form.Item
              label={t.settings.model}
              name="model"
            >
              <Input placeholder={t.settings.enterModel} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleApiSave}>
                {t.common.save}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'theme',
      label: (
        <span>
          <BgColorsOutlined /> {t.settings.theme}
        </span>
      ),
      children: (
        <Card>
          <Form layout="vertical">
            <Form.Item label={t.settings.theme}>
              <Radio.Group value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
                <Radio.Button value="dark">{t.settings.darkTheme}</Radio.Button>
                <Radio.Button value="glass">{t.settings.glassTheme}</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'knowledge',
      label: (
        <span>
          <BookOutlined /> {t.knowledge.title}
        </span>
      ),
      children: (
        <Card>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleKnowledgeAdd}
            style={{ marginBottom: 16 }}
          >
            {t.knowledge.addEntry}
          </Button>
          <Table 
            dataSource={knowledgeEntries}
            columns={knowledgeColumns}
            rowKey="command"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      ),
    },
    {
      key: 'mcp',
      label: (
        <span>
          <CloudServerOutlined /> {t.mcpServer.title}
        </span>
      ),
      children: (
        <Card>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleMcpAdd}
            style={{ marginBottom: 16 }}
          >
            {t.mcpServer.addServer}
          </Button>
          <Table 
            dataSource={mcpServers}
            columns={mcpColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Tabs items={items} />

      <Modal
        title={editingKnowledge ? t.knowledge.editEntry : t.knowledge.addEntry}
        open={knowledgeModalVisible}
        onOk={handleKnowledgeSave}
        onCancel={() => setKnowledgeModalVisible(false)}
        width={600}
      >
        <Form form={knowledgeForm} layout="vertical">
          <Form.Item
            label={t.knowledge.command}
            name="command"
            rules={[{ required: true }]}
          >
            <Input disabled={!!editingKnowledge} />
          </Form.Item>
          <Form.Item
            label={t.knowledge.description}
            name="description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t.knowledge.usage}
            name="usage"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t.knowledge.examples}
            name="examples"
          >
            <Input.TextArea rows={4} placeholder="One example per line" />
          </Form.Item>
          <Form.Item
            label={t.knowledge.riskLevel}
            name="riskLevel"
            initialValue="low"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="low">{t.knowledge.low}</Select.Option>
              <Select.Option value="medium">{t.knowledge.medium}</Select.Option>
              <Select.Option value="high">{t.knowledge.high}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t.mcpServer.addServer}
        open={mcpModalVisible}
        onOk={handleMcpSave}
        onCancel={() => setMcpModalVisible(false)}
        width={600}
      >
        <Form form={mcpForm} layout="vertical">
          <Form.Item
            label={t.mcpServer.name}
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t.mcpServer.command}
            name="command"
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g., npx" />
          </Form.Item>
          <Form.Item
            label={t.mcpServer.args}
            name="args"
          >
            <Input placeholder="e.g., -y @modelcontextprotocol/server-filesystem /tmp" />
          </Form.Item>
          <Form.Item
            label={t.mcpServer.env}
            name="env"
          >
            <Input.TextArea rows={3} placeholder='{"KEY": "value"}' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SettingsPanel;
