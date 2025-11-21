import React, { useState } from 'react';
import { Card, List, Button, Badge, Space, Modal, Tooltip, Progress, Tag } from 'antd';
import {
  CloudServerOutlined,
  PlusOutlined,
  DeleteOutlined,
  LinkOutlined,
  DisconnectOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useServer } from '../contexts/ServerContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ServerConfig } from '../../types';
import ServerForm from './ServerForm';

const ServerList: React.FC = () => {
  const { servers, currentServer, setCurrentServer, deleteServer, connectServer, disconnectServer, detectSystemInfo } = useServer();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingServer, setEditingServer] = useState<ServerConfig | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleConnect = async (id: string) => {
    setLoading(id);
    try {
      const result = await connectServer(id);
      if (result.success) {
        await detectSystemInfo(id);
        Modal.success({ content: t.server.connectionSuccess });
      } else {
        Modal.error({ content: result.error || t.server.connectionFailed });
      }
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (id: string) => {
    await disconnectServer(id);
  };

  const handleDelete = (server: ServerConfig) => {
    Modal.confirm({
      title: t.server.confirmDelete,
      icon: <ExclamationCircleOutlined />,
      content: server.name,
      onOk: () => deleteServer(server.id),
    });
  };

  const handleAdd = () => {
    setEditingServer(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingServer(null);
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'connected':
        return <Badge status="success" text={t.server.connected} />;
      case 'disconnected':
        return <Badge status="default" text={t.server.disconnected} />;
      case 'error':
        return <Badge status="error" text="Error" />;
      default:
        return <Badge status="default" text={t.server.disconnected} />;
    }
  };

  return (
    <>
      <Card
        title={
          <Space>
            <CloudServerOutlined style={{ color: '#ff8c00' }} />
            <span>{t.server.serverList}</span>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)' }}
          >
            {t.server.addServer}
          </Button>
        }
        style={{
          margin: '16px',
          backgroundColor: '#141414',
          border: '1px solid #303030',
        }}
      >
        {servers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
            <CloudServerOutlined style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} />
            <div>{t.server.noServers}</div>
            <div style={{ fontSize: '12px', marginTop: '8px' }}>{t.server.addFirstServer}</div>
          </div>
        ) : (
          <List
            dataSource={servers}
            renderItem={(server) => (
              <List.Item
                key={server.id}
                style={{
                  backgroundColor: currentServer?.id === server.id ? '#1f1f1f' : 'transparent',
                  border: currentServer?.id === server.id ? '1px solid #ff8c00' : '1px solid #303030',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onClick={() => server.status === 'connected' && setCurrentServer(server.id)}
              >
                <List.Item.Meta
                  avatar={
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CloudServerOutlined style={{ fontSize: '24px', color: '#fff' }} />
                    </div>
                  }
                  title={
                    <Space>
                      <span style={{ fontSize: '16px', fontWeight: 600 }}>{server.name}</span>
                      {currentServer?.id === server.id && (
                        <Tag color="orange">{t.status.serverConnected}</Tag>
                      )}
                    </Space>
                  }
                  description={
                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#888' }}>{server.username}@{server.host}:{server.port}</span>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        {getStatusBadge(server.status)}
                      </div>
                      {server.systemInfo && (
                        <Space direction="vertical" size="small" style={{ width: '100%', marginTop: '8px' }}>
                          <div>
                            <Space>
                              <span style={{ color: '#888', fontSize: '12px' }}>{t.server.cpu}:</span>
                              <span style={{ fontSize: '12px' }}>{server.systemInfo.cpu} ({server.systemInfo.cpuCores} cores)</span>
                            </Space>
                          </div>
                          <div>
                            <Space>
                              <span style={{ color: '#888', fontSize: '12px' }}>{t.server.memory}:</span>
                              <span style={{ fontSize: '12px' }}>{server.systemInfo.memory.used} / {server.systemInfo.memory.total}</span>
                            </Space>
                            <Progress
                              percent={server.systemInfo.memory.percentage}
                              size="small"
                              strokeColor="#ff8c00"
                              style={{ maxWidth: '200px' }}
                            />
                          </div>
                          <div>
                            <Space>
                              <span style={{ color: '#888', fontSize: '12px' }}>{t.server.disk}:</span>
                              <span style={{ fontSize: '12px' }}>{server.systemInfo.disk.used} / {server.systemInfo.disk.total}</span>
                            </Space>
                            <Progress
                              percent={server.systemInfo.disk.percentage}
                              size="small"
                              strokeColor="#ff8c00"
                              style={{ maxWidth: '200px' }}
                            />
                          </div>
                        </Space>
                      )}
                    </div>
                  }
                />
                <Space>
                  {server.status === 'connected' ? (
                    <>
                      <Tooltip title={t.server.disconnect}>
                        <Button
                          icon={<DisconnectOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDisconnect(server.id);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title={t.server.autoDetect}>
                        <Button
                          icon={<SyncOutlined />}
                          loading={loading === server.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            detectSystemInfo(server.id);
                          }}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title={t.server.connect}>
                      <Button
                        type="primary"
                        icon={<LinkOutlined />}
                        loading={loading === server.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(server.id);
                        }}
                        style={{ background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)' }}
                      />
                    </Tooltip>
                  )}
                  <Tooltip title={t.common.delete}>
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(server);
                      }}
                    />
                  </Tooltip>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>

      <Modal
        title={editingServer ? t.server.editServer : t.server.addServer}
        open={showForm}
        onCancel={handleFormClose}
        footer={null}
        width={600}
      >
        <ServerForm server={editingServer} onClose={handleFormClose} />
      </Modal>
    </>
  );
};

export default ServerList;
