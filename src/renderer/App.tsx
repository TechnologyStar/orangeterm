import React, { useState } from 'react';
import { ConfigProvider, theme, Layout, Tabs, Button, Dropdown } from 'antd';
import { RobotOutlined, CloudServerOutlined, MessageOutlined, GlobalOutlined } from '@ant-design/icons';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ServerProvider } from './contexts/ServerContext';
import AuthorizationModeSelector from './components/AuthorizationModeSelector';
import ChatContainer from './components/ChatContainer';
import CommandInput from './components/CommandInput';
import StatusBar from './components/StatusBar';
import ServerList from './components/ServerList';

const { Header, Content, Footer } = Layout;

const AppContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <Layout style={{ height: '100vh', backgroundColor: '#000' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#141414',
          borderBottom: '2px solid #ff8c00',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(255, 140, 0, 0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)',
            }}
          >
            <RobotOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.app.title}
          </h1>
          <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
            {t.app.subtitle}
          </span>
        </div>
        <Dropdown
          menu={{
            items: [
              {
                key: 'zh',
                label: '中文',
                onClick: () => setLanguage('zh'),
              },
              {
                key: 'en',
                label: 'English',
                onClick: () => setLanguage('en'),
              },
            ],
          }}
        >
          <Button icon={<GlobalOutlined />} type="text">
            {language === 'zh' ? '中文' : 'English'}
          </Button>
        </Dropdown>
      </Header>

      <div style={{ margin: '16px 16px 0 16px' }}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'chat',
              label: (
                <span>
                  <MessageOutlined /> {language === 'zh' ? '对话' : 'Chat'}
                </span>
              ),
            },
            {
              key: 'servers',
              label: (
                <span>
                  <CloudServerOutlined /> {t.server.title}
                </span>
              ),
            },
          ]}
          style={{
            backgroundColor: '#141414',
            borderRadius: '8px',
            padding: '0 16px',
          }}
        />
      </div>

      {activeTab === 'chat' && (
        <>
          <AuthorizationModeSelector />

          <Content
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <ChatContainer />
            <CommandInput />
          </Content>
        </>
      )}

      {activeTab === 'servers' && (
        <Content
          style={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          <ServerList />
        </Content>
      )}

      <Footer style={{ padding: 0 }}>
        <StatusBar />
      </Footer>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ff8c00',
          colorBgContainer: '#141414',
          colorBorder: '#ff8c00',
          colorLink: '#ffa500',
        },
      }}
    >
      <LanguageProvider>
        <AuthProvider>
          <ServerProvider>
            <MessageProvider>
              <AppContent />
            </MessageProvider>
          </ServerProvider>
        </AuthProvider>
      </LanguageProvider>
    </ConfigProvider>
  );
};

export default App;
