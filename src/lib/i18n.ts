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
    thinking: string;
    prompt: string;
  };
  status: {
    virtualCredentials: string;
    knowledgeBase: string;
    mcpEnabled: string;
    systemReady: string;
    serverConnected: string;
    noServerSelected: string;
    latency: string;
    checking: string;
    webSearchEnabled: string;
    webSearchDisabled: string;
  };
  mcp: {
    title: string;
    bingSearch: string;
    bingSearchDesc: string;
    enableWebSearch: string;
    disableWebSearch: string;
    searchResult: string;
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
  settings: {
    title: string;
    api: string;
    apiConfig: string;
    provider: string;
    apiKey: string;
    baseURL: string;
    model: string;
    openai: string;
    azure: string;
    custom: string;
    enterApiKey: string;
    enterBaseURL: string;
    enterModel: string;
    theme: string;
    darkTheme: string;
    glassTheme: string;
  };
  knowledge: {
    title: string;
    addEntry: string;
    editEntry: string;
    deleteEntry: string;
    command: string;
    description: string;
    usage: string;
    examples: string;
    riskLevel: string;
    low: string;
    medium: string;
    high: string;
    confirmDelete: string;
  };
  mcpServer: {
    title: string;
    addServer: string;
    editServer: string;
    deleteServer: string;
    name: string;
    command: string;
    args: string;
    env: string;
    enabled: string;
    disabled: string;
    confirmDelete: string;
  };
  wizard: {
    title: string;
    welcome: string;
    welcomeDesc: string;
    apiSetup: string;
    apiSetupDesc: string;
    serverSetup: string;
    serverSetupDesc: string;
    complete: string;
    completeDesc: string;
    skip: string;
    next: string;
    previous: string;
    finish: string;
    getStarted: string;
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
    thinking: 'AI 正在思考',
    prompt: '提示符',
  },
  status: {
    virtualCredentials: '虚拟凭证已激活',
    knowledgeBase: '知识库已连接',
    mcpEnabled: 'MCP 已启用',
    systemReady: '系统就绪',
    serverConnected: '服务器已连接',
    noServerSelected: '未选择服务器',
    latency: '延迟',
    checking: '检测中...',
    webSearchEnabled: '联网搜索已启用',
    webSearchDisabled: '联网搜索已禁用',
  },
  mcp: {
    title: 'MCP 工具',
    bingSearch: '必应搜索',
    bingSearchDesc: '通过必应搜索引擎进行联网搜索',
    enableWebSearch: '启用联网搜索',
    disableWebSearch: '禁用联网搜索',
    searchResult: '搜索结果',
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
  settings: {
    title: '设置',
    api: 'API',
    apiConfig: 'API 配置',
    provider: '服务商',
    apiKey: 'API 密钥',
    baseURL: '接口地址',
    model: '模型',
    openai: 'OpenAI',
    azure: 'Azure',
    custom: '自定义',
    enterApiKey: '请输入 API 密钥',
    enterBaseURL: '请输入接口地址 (可选)',
    enterModel: '请输入模型名称 (可选)',
    theme: '主题',
    darkTheme: '深色主题',
    glassTheme: '玻璃主题',
  },
  knowledge: {
    title: '知识库',
    addEntry: '添加知识条目',
    editEntry: '编辑知识条目',
    deleteEntry: '删除知识条目',
    command: '命令',
    description: '描述',
    usage: '用法',
    examples: '示例',
    riskLevel: '风险等级',
    low: '低',
    medium: '中',
    high: '高',
    confirmDelete: '确定要删除此知识条目吗？',
  },
  mcpServer: {
    title: 'MCP 服务器',
    addServer: '添加 MCP 服务器',
    editServer: '编辑 MCP 服务器',
    deleteServer: '删除 MCP 服务器',
    name: '服务器名称',
    command: '命令',
    args: '参数',
    env: '环境变量',
    enabled: '已启用',
    disabled: '已禁用',
    confirmDelete: '确定要删除此 MCP 服务器吗？',
  },
  wizard: {
    title: '初始化向导',
    welcome: '欢迎使用 OrangeTerm',
    welcomeDesc: 'AI 驱动的运维终端，让运维工作更智能、更高效。',
    apiSetup: 'API 配置',
    apiSetupDesc: '配置 OpenAI 兼容的 API 以启用 AI 功能（可跳过稍后配置）。',
    serverSetup: '服务器配置',
    serverSetupDesc: '添加你的第一台服务器以开始远程管理（可跳过稍后配置）。',
    complete: '设置完成',
    completeDesc: '你已完成初始设置，现在可以开始使用 OrangeTerm 了！',
    skip: '跳过',
    next: '下一步',
    previous: '上一步',
    finish: '完成',
    getStarted: '开始使用',
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
    thinking: 'AI Thinking',
    prompt: 'Prompt',
  },
  status: {
    virtualCredentials: 'Virtual credentials active',
    knowledgeBase: 'Knowledge base connected',
    mcpEnabled: 'MCP enabled',
    systemReady: 'System Ready',
    serverConnected: 'Server connected',
    noServerSelected: 'No server selected',
    latency: 'Latency',
    checking: 'Checking...',
    webSearchEnabled: 'Web search enabled',
    webSearchDisabled: 'Web search disabled',
  },
  mcp: {
    title: 'MCP Tools',
    bingSearch: 'Bing Search',
    bingSearchDesc: 'Search the web via Bing search engine',
    enableWebSearch: 'Enable Web Search',
    disableWebSearch: 'Disable Web Search',
    searchResult: 'Search Result',
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
  settings: {
    title: 'Settings',
    api: 'API',
    apiConfig: 'API Configuration',
    provider: 'Provider',
    apiKey: 'API Key',
    baseURL: 'Base URL',
    model: 'Model',
    openai: 'OpenAI',
    azure: 'Azure',
    custom: 'Custom',
    enterApiKey: 'Enter API Key',
    enterBaseURL: 'Enter Base URL (optional)',
    enterModel: 'Enter Model Name (optional)',
    theme: 'Theme',
    darkTheme: 'Dark Theme',
    glassTheme: 'Glass Theme',
  },
  knowledge: {
    title: 'Knowledge Base',
    addEntry: 'Add Knowledge Entry',
    editEntry: 'Edit Knowledge Entry',
    deleteEntry: 'Delete Knowledge Entry',
    command: 'Command',
    description: 'Description',
    usage: 'Usage',
    examples: 'Examples',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    confirmDelete: 'Are you sure you want to delete this knowledge entry?',
  },
  mcpServer: {
    title: 'MCP Servers',
    addServer: 'Add MCP Server',
    editServer: 'Edit MCP Server',
    deleteServer: 'Delete MCP Server',
    name: 'Server Name',
    command: 'Command',
    args: 'Arguments',
    env: 'Environment Variables',
    enabled: 'Enabled',
    disabled: 'Disabled',
    confirmDelete: 'Are you sure you want to delete this MCP server?',
  },
  wizard: {
    title: 'Setup Wizard',
    welcome: 'Welcome to OrangeTerm',
    welcomeDesc: 'AI-powered operations terminal for smarter and more efficient infrastructure management.',
    apiSetup: 'API Configuration',
    apiSetupDesc: 'Configure OpenAI-compatible API to enable AI features (can be skipped).',
    serverSetup: 'Server Configuration',
    serverSetupDesc: 'Add your first server to start remote management (can be skipped).',
    complete: 'Setup Complete',
    completeDesc: 'You have completed the initial setup. You can now start using OrangeTerm!',
    skip: 'Skip',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    getStarted: 'Get Started',
  },
};

export const translations: Record<Language, Translations> = {
  zh,
  en,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
