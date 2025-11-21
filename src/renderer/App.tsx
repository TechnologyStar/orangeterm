import React from 'react';
import { ConfigProvider, theme, Layout } from 'antd';
import { RobotOutlined } from '@ant-design/icons';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import AuthorizationModeSelector from './components/AuthorizationModeSelector';
import ChatContainer from './components/ChatContainer';
import CommandInput from './components/CommandInput';
import StatusBar from './components/StatusBar';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorBgContainer: '#141414',
        },
      }}
    >
      <AuthProvider>
        <MessageProvider>
          <Layout style={{ height: '100vh', backgroundColor: '#000' }}>
            <Header
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#141414',
                borderBottom: '1px solid #303030',
                padding: '0 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <RobotOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
                  OrangeTerm
                </h1>
                <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
                  AI Operations Assistant
                </span>
              </div>
            </Header>

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

            <Footer style={{ padding: 0 }}>
              <StatusBar />
            </Footer>
          </Layout>
        </MessageProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
