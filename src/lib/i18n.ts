export type Language = 'zh' | 'en';

export interface Translations {
  app: {
    title: string;
    subtitle: string;
  };
  auth: {
    title: string;
    manualAll: string;
    manualHighRisk: string;
    auto: string;
    manualAllDesc: string;
    manualHighRiskDesc: string;
    autoDesc: string;
  };
  server: {
    title: string;
    addServer: string;
    editServer: string;
    deleteServer: string;
    serverList: string;
    noServers: string;
    addFirstServer: string;
    name: string;
    host: string;
    port: string;
    username: string;
    password: string;
    autoDetect: string;
    detecting: string;
    connected: string;
    disconnected: string;
    cpu: string;
    memory: string;
    disk: string;
    os: string;
    uptime: string;
    save: string;
    cancel: string;
    connect: string;
    disconnect: string;
    delete: string;
    confirmDelete: string;
    testConnection: string;
    connectionSuccess: string;
    connectionFailed: string;
    selectServer: string;
  };
  chat: {
    inputPlaceholder: string;
    send: string;
    executing: string;
    success: string;
    failed: string;
    sendingToAI: string;
    aiResponse: string;
  };
  status: {
    virtualCredentials: string;
    knowledgeBase: string;
    mcpEnabled: string;
    systemReady: string;
    serverConnected: string;
    noServerSelected: string;
  };
  common: {
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    close: string;
    ok: string;
    yes: string;
    no: string;
    loading: string;
    error: string;
    success: string;
  };
}

const zh: Translations = {
  app: {
    title: '橙子终端',
    subtitle: 'AI 运维助手',
  },
  auth: {
    title: '授权模式',
    manualAll: '全部手动',
    manualHighRisk: '高风险手动',
    auto: '全自动',
    manualAllDesc: '所有命令都需要手动授权',
    manualHighRiskDesc: '仅高风险命令需要授权',
    autoDesc: '命令自动执行无需授权',
  },
  server: {
    title: '服务器管理',
    addServer: '添加服务器',
    editServer: '编辑服务器',
    deleteServer: '删除服务器',
    serverList: '服务器列表',
    noServers: '暂无服务器',
    addFirstServer: '添加你的第一台服务器',
    name: '服务器名称',
    host: '主机地址',
    port: '端口',
    username: '用户名',
    password: '密码',
    autoDetect: '自动检测配置',
    detecting: '正在检测...',
    connected: '已连接',
    disconnected: '未连接',
    cpu: 'CPU',
    memory: '内存',
    disk: '磁盘',
    os: '操作系统',
    uptime: '运行时间',
    save: '保存',
    cancel: '取消',
    connect: '连接',
    disconnect: '断开',
    delete: '删除',
    confirmDelete: '确定要删除这台服务器吗？',
    testConnection: '测试连接',
    connectionSuccess: '连接成功',
    connectionFailed: '连接失败',
    selectServer: '选择服务器',
  },
  chat: {
    inputPlaceholder: '输入指令或与 AI 对话...',
    send: '发送',
    executing: '执行中...',
    success: '成功',
    failed: '失败',
    sendingToAI: '正在发送到 AI...',
    aiResponse: 'AI 回复',
  },
  status: {
    virtualCredentials: '虚拟凭证已激活',
    knowledgeBase: '知识库已连接',
    mcpEnabled: 'MCP 已启用',
    systemReady: '系统就绪',
    serverConnected: '服务器已连接',
    noServerSelected: '未选择服务器',
  },
  common: {
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    close: '关闭',
    ok: '确定',
    yes: '是',
    no: '否',
    loading: '加载中...',
    error: '错误',
    success: '成功',
  },
};

const en: Translations = {
  app: {
    title: 'OrangeTerm',
    subtitle: 'AI Operations Assistant',
  },
  auth: {
    title: 'Authorization Mode',
    manualAll: 'Manual All',
    manualHighRisk: 'High Risk Only',
    auto: 'Automatic',
    manualAllDesc: 'All commands require manual authorization',
    manualHighRiskDesc: 'Only high-risk commands require authorization',
    autoDesc: 'Commands execute automatically without authorization',
  },
  server: {
    title: 'Server Management',
    addServer: 'Add Server',
    editServer: 'Edit Server',
    deleteServer: 'Delete Server',
    serverList: 'Server List',
    noServers: 'No servers',
    addFirstServer: 'Add your first server',
    name: 'Server Name',
    host: 'Host',
    port: 'Port',
    username: 'Username',
    password: 'Password',
    autoDetect: 'Auto Detect Configuration',
    detecting: 'Detecting...',
    connected: 'Connected',
    disconnected: 'Disconnected',
    cpu: 'CPU',
    memory: 'Memory',
    disk: 'Disk',
    os: 'OS',
    uptime: 'Uptime',
    save: 'Save',
    cancel: 'Cancel',
    connect: 'Connect',
    disconnect: 'Disconnect',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this server?',
    testConnection: 'Test Connection',
    connectionSuccess: 'Connection successful',
    connectionFailed: 'Connection failed',
    selectServer: 'Select Server',
  },
  chat: {
    inputPlaceholder: 'Enter command or chat with AI...',
    send: 'Send',
    executing: 'Executing...',
    success: 'Success',
    failed: 'Failed',
    sendingToAI: 'Sending to AI...',
    aiResponse: 'AI Response',
  },
  status: {
    virtualCredentials: 'Virtual credentials active',
    knowledgeBase: 'Knowledge base connected',
    mcpEnabled: 'MCP enabled',
    systemReady: 'System Ready',
    serverConnected: 'Server connected',
    noServerSelected: 'No server selected',
  },
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    close: 'Close',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
};

export const translations: Record<Language, Translations> = {
  zh,
  en,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
