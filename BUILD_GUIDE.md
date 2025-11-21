# 构建指南 (Build Guide)

本文档说明如何为不同平台打包 OrangeTerm。

## 快速构建

### Linux AppImage (已完成 ✓)

```bash
npm run build
npm run package
```

构建完成后，可执行文件位于 `release/OrangeTerm-1.0.0.AppImage`

### Windows .exe 构建

要在 Linux 上构建 Windows 可执行文件，需要先安装 Wine：

#### 方法 1：使用 Wine (推荐用于 CI/CD)

```bash
# 安装 Wine
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install wine wine32 wine64

# 构建 Windows 版本
npm run build
npx electron-builder --win --x64
```

构建完成后，文件位于：
- `release/OrangeTerm Setup 1.0.0.exe` (NSIS 安装程序)
- `release/OrangeTerm 1.0.0.exe` (便携版)

#### 方法 2：在 Windows 系统上构建 (推荐)

1. 在 Windows 系统上克隆项目
2. 安装 Node.js 和 npm
3. 运行构建命令：

```bash
npm install
npm run build
npm run package
```

#### 方法 3：使用 GitHub Actions (自动化)

在 `.github/workflows/build.yml` 中配置：

```yaml
name: Build
on: [push]
jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run package
      - uses: actions/upload-artifact@v2
        with:
          name: windows-build
          path: release/*.exe
```

### macOS .dmg 构建

在 macOS 系统上：

```bash
npm install
npm run build
npm run package
```

## 跨平台构建表

| 目标平台 | 构建平台 | 是否需要额外工具 |
|---------|---------|----------------|
| Linux   | Linux   | ❌ 否          |
| Linux   | macOS   | ❌ 否          |
| Linux   | Windows | ❌ 否          |
| Windows | Windows | ❌ 否          |
| Windows | Linux   | ✅ 是 (Wine)   |
| Windows | macOS   | ✅ 是 (Wine)   |
| macOS   | macOS   | ❌ 否          |
| macOS   | Linux   | ❌ 否          |
| macOS   | Windows | ❌ 否          |

## 构建选项

### 仅构建便携版

```bash
npx electron-builder --win portable
```

### 构建所有平台

```bash
npx electron-builder -mwl
```

### 构建并跳过代码签名

```bash
npx electron-builder --win --x64 -c.win.certificateFile=""
```

## 当前构建结果

✅ **Linux AppImage**: 已成功构建 (116MB)
- 文件: `release/OrangeTerm-1.0.0.AppImage`
- 测试状态: 可执行

⏳ **Windows .exe**: 需要 Wine 或在 Windows 系统上构建
- 推荐在 Windows 系统上构建以获得最佳结果

⏳ **macOS .dmg**: 需要在 macOS 系统上构建
- 仅限 macOS 系统构建

## 发布清单

打包应用前，请确保：

- [x] 所有功能已实现
- [x] 所有组件支持中文/英文
- [x] UI 使用橙色主题
- [x] 多服务器管理功能正常
- [x] 自动检测服务器配置功能正常
- [ ] 在真实环境中测试 SSH 连接
- [ ] 添加应用图标
- [ ] 更新版本号
- [ ] 准备发布说明

## 添加应用图标

1. 准备图标文件：
   - Windows: `build/icon.ico` (256x256)
   - macOS: `build/icon.icns`
   - Linux: `build/icon.png` (512x512)

2. 更新 package.json：

```json
{
  "build": {
    "win": {
      "icon": "build/icon.ico"
    },
    "mac": {
      "icon": "build/icon.icns"
    },
    "linux": {
      "icon": "build/icon.png"
    }
  }
}
```

## 故障排除

### 构建失败：缺少依赖

```bash
npm install
npm rebuild
```

### Wine 相关错误

```bash
# 重新安装 Wine
sudo apt-get remove --purge wine*
sudo apt-get install wine wine32 wine64
```

### 权限错误

```bash
chmod +x release/*.AppImage
```

## 自动化构建脚本

创建 `scripts/build-all.sh`:

```bash
#!/bin/bash
set -e

echo "🔨 Building renderer..."
npm run build:renderer

echo "🔨 Building main process..."
npm run build:main

echo "📦 Packaging Linux..."
npx electron-builder --linux

if command -v wine &> /dev/null; then
    echo "📦 Packaging Windows..."
    npx electron-builder --win
else
    echo "⚠️  Wine not installed, skipping Windows build"
fi

echo "✅ Build complete!"
ls -lh release/
```

使用：

```bash
chmod +x scripts/build-all.sh
./scripts/build-all.sh
```
