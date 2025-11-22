import React, { useState, useEffect } from 'react';
import { ConfigProvider, theme, Layout, Tabs, Button, Dropdown } from 'antd';
import { RobotOutlined, CloudServerOutlined, MessageOutlined, GlobalOutlined, SettingOutlined } from '@ant-design/icons';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ServerProvider } from './contexts/ServerContext';
import AuthorizationModeSelector from './components/AuthorizationModeSelector';
import ChatContainer from './components/ChatContainer';
import CommandInput from './components/CommandInput';
import StatusBar from './components/StatusBar';
import ServerList from './components/ServerList';
import SettingsPanel from './components/SettingsPanel';
import InitWizard from './components/InitWizard';

const { Header, Content, Footer } = Layout;

const glassStyles = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
};

const glassCardStyles = {
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
};

const AppContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('chat');
  const [showWizard, setShowWizard] = useState(false);
  const [appTheme, setAppTheme] = useState<'dark' | 'glass'>('glass');

  useEffect(() => {
    checkInitialization();
  }, []);

  const checkInitialization = async () => {
    const settings = await window.electronAPI.getSettings();
    if (!settings.initialized) {
      setShowWizard(true);
    }
    if (settings.theme) {
      setAppTheme(settings.theme);
    }
  };

  const handleWizardComplete = () => {
    setShowWizard(false);
  };

  const isGlassTheme = appTheme === 'glass';

  const layoutStyle = isGlassTheme ? {
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  } : {
    height: '100vh',
    backgroundColor: '#000',
  };

  const headerStyle = isGlassTheme ? {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    ...glassStyles,
  } : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141414',
    borderBottom: '2px solid #ff8c00',
    padding: '0 24px',
    boxShadow: '0 2px 8px rgba(255, 140, 0, 0.2)',
  };

  const tabStyle = isGlassTheme ? {
    margin: '16px',
    ...glassCardStyles,
    padding: '8px 16px',
  } : {
    backgroundColor: '#141414',
    borderRadius: '8px',
    padding: '0 16px',
    margin: '16px 16px 0 16px',
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: isGlassTheme 
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)'
                : 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isGlassTheme 
                ? '0 8px 16px rgba(99, 102, 241, 0.3)'
                : '0 4px 12px rgba(255, 140, 0, 0.3)',
            }}
          >
            <RobotOutlined style={{ fontSize: '24px', color: '#fff' }} />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 700,
              background: isGlassTheme
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.app.title}
          </h1>
          <span style={{ 
            fontSize: '12px', 
            color: isGlassTheme ? '#6b7280' : '#888', 
            marginLeft: '8px' 
          }}>
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
          <Button 
            icon={<GlobalOutlined />} 
            type={isGlassTheme ? 'default' : 'text'}
            style={isGlassTheme ? {
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            } : {}}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Button>
        </Dropdown>
      </Header>

      <div style={tabStyle}>
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
            {
              key: 'settings',
              label: (
                <span>
                  <SettingOutlined /> {t.settings.title}
                </span>
              ),
            },
          ]}
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

      {activeTab === 'settings' && (
        <Content
          style={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          <SettingsPanel />
        </Content>
      )}

      <Footer style={{ padding: 0 }}>
        <StatusBar />
      </Footer>

      <InitWizard visible={showWizard} onComplete={handleWizardComplete} />
    </Layout>
  );
};

const App: React.FC = () => {
  const [appTheme, setAppTheme] = useState<'dark' | 'glass'>('glass');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const settings = await window.electronAPI.getSettings();
    if (settings.theme) {
      setAppTheme(settings.theme);
    }
  };

  const isGlassTheme = appTheme === 'glass';

  return (
    <ConfigProvider
      theme={{
        algorithm: isGlassTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: {
          colorPrimary: isGlassTheme ? '#6366f1' : '#ff8c00',
          colorBgContainer: isGlassTheme ? 'rgba(255, 255, 255, 0.6)' : '#141414',
          colorBorder: isGlassTheme ? 'rgba(99, 102, 241, 0.2)' : '#ff8c00',
          colorLink: isGlassTheme ? '#6366f1' : '#ffa500',
          borderRadius: isGlassTheme ? 12 : 8,
          fontSize: 14,
        },
        components: {
          Card: {
            colorBgContainer: isGlassTheme ? 'rgba(255, 255, 255, 0.6)' : '#141414',
          },
          Modal: {
            contentBg: isGlassTheme ? 'rgba(255, 255, 255, 0.95)' : '#1f1f1f',
          },
          Input: {
            colorBgContainer: isGlassTheme ? 'rgba(255, 255, 255, 0.8)' : '#1f1f1f',
          },
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
