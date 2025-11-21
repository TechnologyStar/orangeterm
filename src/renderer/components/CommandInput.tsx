import React, { useState } from 'react';
import { Input, Button, Space, Tooltip, Modal } from 'antd';
import { SendOutlined, ThunderboltOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useMessages } from '../contexts/MessageContext';
import { useLanguage } from '../contexts/LanguageContext';

const { TextArea } = Input;

const CommandInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { mode } = useAuth();
  const { addMessage, updateMessage } = useMessages();
  const { t } = useLanguage();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    addMessage({
      role: 'user',
      content: userMessage,
    });

    try {
      const aiResponse = await window.electronAPI.sendToMCP(userMessage);
      
      addMessage({
        role: 'assistant',
        content: aiResponse,
      });

      const commandMatch = aiResponse.match(/```bash\n(.*?)\n```/s) || 
                          aiResponse.match(/`([^`]+)`/);
      
      if (commandMatch) {
        const suggestedCommand = commandMatch[1].trim();
        await executeCommand(suggestedCommand);
      }
    } catch (error) {
      addMessage({
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const executeCommand = async (command: string) => {
    try {
      const riskCheck = await window.electronAPI.checkCommandRisk(command);
      
      let shouldExecute = true;

      if (mode === 'manual_all') {
        shouldExecute = await showAuthorizationDialog(command, riskCheck.reason);
      } else if (mode === 'manual_highrisk' && riskCheck.isHighRisk) {
        shouldExecute = await showAuthorizationDialog(command, riskCheck.reason);
      }

      if (!shouldExecute) {
        addMessage({
          role: 'system',
          content: 'Command execution cancelled by user.',
          command,
        });
        return;
      }

      const messageId = Date.now().toString();
      addMessage({
        role: 'system',
        content: 'Executing command...',
        command,
      });

      const result = await window.electronAPI.executeCommand(command);

      updateMessage(messageId, {
        content: result.success ? 'Command executed successfully' : 'Command execution failed',
        executionResult: result,
      });
    } catch (error) {
      addMessage({
        role: 'system',
        content: `Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        command,
      });
    }
  };

  const showAuthorizationDialog = (command: string, reason?: string): Promise<boolean> => {
    return new Promise(resolve => {
      Modal.confirm({
        title: 'Command Authorization Required',
        icon: <ExclamationCircleOutlined />,
        content: (
          <div>
            <p>Do you want to execute the following command?</p>
            <pre style={{
              padding: '12px',
              backgroundColor: '#1f1f1f',
              borderRadius: '4px',
              color: '#fff',
            }}>
              {command}
            </pre>
            {reason && (
              <p style={{ color: '#ff4d4f', marginTop: '8px' }}>
                ⚠️ Risk: {reason}
              </p>
            )}
          </div>
        ),
        okText: 'Execute',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{ padding: '16px', borderTop: '1px solid #303030' }}>
      <Space.Compact style={{ width: '100%' }}>
        <TextArea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t.chat.inputPlaceholder}
          autoSize={{ minRows: 1, maxRows: 4 }}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <Tooltip title={t.chat.send}>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            loading={loading}
            style={{
              height: 'auto',
              background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
              border: 'none',
            }}
          >
            {t.chat.send}
          </Button>
        </Tooltip>
      </Space.Compact>

      <div style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
        <ThunderboltOutlined /> Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
};

export default CommandInput;
