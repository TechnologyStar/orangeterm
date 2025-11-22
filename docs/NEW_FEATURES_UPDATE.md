# OrangeTerm - Latest Features Update

## Overview
This document describes the major new features added to OrangeTerm, including OpenAI-compatible API configuration, knowledge base management, custom MCP server support, initialization wizard, and premium glass theme.

## New Features

### 1. OpenAI-Compatible API Configuration

**Location**: Settings Tab → API Configuration

Users can now configure OpenAI-compatible API endpoints:

- **Providers**: OpenAI, Azure OpenAI, or Custom endpoints
- **API Key**: Secure storage of API credentials
- **Base URL**: Custom API endpoint URL (optional)
- **Model**: Specify custom model names (optional)

**Use Cases**:
- Use OpenAI's official API
- Connect to Azure OpenAI Service
- Use third-party OpenAI-compatible services (e.g., LocalAI, Ollama with OpenAI compatibility layer)
- Self-hosted AI models with OpenAI-compatible APIs

**How to Use**:
1. Navigate to Settings tab
2. Select API Configuration section
3. Choose your provider
4. Enter your API key
5. Optionally configure base URL and model
6. Click Save

### 2. Knowledge Base Management

**Location**: Settings Tab → Knowledge Base

Users can now add, edit, and delete custom command knowledge entries:

**Features**:
- Add custom commands with descriptions
- Specify command usage patterns
- Provide multiple examples
- Set risk levels (low, medium, high)
- Edit existing entries
- Delete entries

**How to Use**:
1. Navigate to Settings → Knowledge Base
2. Click "Add Knowledge Entry"
3. Fill in command details:
   - Command name (e.g., `docker`)
   - Description
   - Usage syntax
   - Examples (one per line)
   - Risk level
4. Save the entry

**Benefits**:
- Extend AI's knowledge with custom commands
- Document internal scripts and tools
- Standardize team command usage
- Improve AI suggestion accuracy

### 3. Custom MCP Server Support

**Location**: Settings Tab → MCP Servers

Users can add and manage custom Model Context Protocol (MCP) servers:

**Features**:
- Add custom MCP servers with command and arguments
- Configure environment variables
- Enable/disable servers dynamically
- Delete servers

**How to Use**:
1. Navigate to Settings → MCP Servers
2. Click "Add MCP Server"
3. Configure:
   - Server name
   - Command (e.g., `npx`, `node`, `python`)
   - Arguments (e.g., `-y @modelcontextprotocol/server-filesystem /tmp`)
   - Environment variables (JSON format)
4. Click Save

**Example MCP Servers**:
```json
{
  "name": "Filesystem Server",
  "command": "npx",
  "args": "-y @modelcontextprotocol/server-filesystem /home/user",
  "env": {}
}
```

```json
{
  "name": "Database Server",
  "command": "node",
  "args": "/path/to/mcp-server.js",
  "env": {
    "DB_HOST": "localhost",
    "DB_PORT": "5432"
  }
}
```

### 4. Initialization Wizard

**Triggered**: First launch (when app is not initialized)

A multi-step wizard guides new users through initial setup:

**Steps**:
1. **Welcome**: Introduction to OrangeTerm
2. **API Configuration**: Set up AI API (can skip)
3. **Server Configuration**: Add first server (can skip)
4. **Complete**: Finish setup

**Features**:
- Skip any step if not ready
- Beautiful glass morphism UI
- Progress tracking
- Can be re-triggered by clearing settings

### 5. Premium Glass Theme

**Location**: Settings Tab → Theme

A modern, beautiful glass morphism theme inspired by macOS and Apple's design language:

**Features**:
- **Glassmorphism Effects**: Frosted glass with backdrop blur
- **Beautiful Gradients**: Purple-to-pink gradient background
- **Smooth Animations**: Buttery smooth transitions
- **Modern Color Palette**: Indigo primary colors (#6366f1)
- **Premium Shadows**: Subtle depth and elevation
- **Rounded Corners**: Modern 12px border radius
- **Semi-transparent Cards**: Layered glass panels

**How to Switch Themes**:
1. Navigate to Settings → Theme
2. Choose between:
   - **Dark Theme**: Original orange theme with dark background
   - **Glass Theme**: New premium glass morphism theme
3. Restart the app for full effect

**Visual Elements**:
- Header: Frosted glass with gradient shadow
- Cards: Semi-transparent with backdrop blur
- Buttons: Glass effect with hover states
- Background: Gradient mesh (purple to pink)
- Icons: Smooth gradient fills

### 6. Settings Tab

**New Navigation Tab**: Settings (along with Chat and Servers)

Centralized settings management with tabbed interface:

**Sections**:
1. **API Configuration**: OpenAI-compatible API setup
2. **Theme**: Switch between Dark and Glass themes
3. **Knowledge Base**: Manage command knowledge entries
4. **MCP Servers**: Configure custom MCP servers

## Technical Implementation

### New Files
- `src/lib/SettingsManager.ts` - Settings persistence
- `src/renderer/components/SettingsPanel.tsx` - Settings UI
- `src/renderer/components/InitWizard.tsx` - First-run wizard

### Updated Files
- `src/types/index.ts` - New types for API config, settings, MCP servers
- `src/lib/i18n.ts` - Translations for all new features
- `src/lib/KnowledgeBase.ts` - Add/delete entry methods
- `src/main/main.ts` - IPC handlers for new features
- `src/preload/preload.ts` - API exposure
- `src/renderer/App.tsx` - Glass theme and wizard integration

### New IPC APIs
- `saveSettings(settings)` - Save app settings
- `getSettings()` - Load app settings
- `addKnowledgeEntry(entry)` - Add knowledge entry
- `deleteKnowledgeEntry(command)` - Delete knowledge entry
- `addMCPServer(server)` - Add MCP server
- `getMCPServers()` - List MCP servers
- `deleteMCPServer(id)` - Delete MCP server
- `toggleMCPServer(id, enabled)` - Enable/disable MCP server

## User Benefits

1. **Flexibility**: Connect to any OpenAI-compatible AI service
2. **Customization**: Extend knowledge base with custom commands
3. **Extensibility**: Add custom MCP servers for specialized functionality
4. **User-Friendly**: Guided setup for new users
5. **Beautiful UI**: Premium glass theme for a modern experience
6. **Choice**: Toggle between themes based on preference

## Migration Notes

- Existing users will see the glass theme by default (can switch to dark theme)
- No initialization wizard on first launch for existing installations
- All existing functionality remains unchanged
- Settings are stored in memory (can be enhanced with persistent storage)

## Future Enhancements

- Persistent storage for settings (electron-store or similar)
- Cloud sync for settings across devices
- Import/export knowledge base
- MCP server templates and marketplace
- Theme customization (custom colors, gradients)
- Dark glass theme variant

## Screenshots

### Glass Theme
- Gradient background with frosted glass panels
- Modern indigo/purple color scheme
- Smooth shadows and blur effects

### Initialization Wizard
- Step-by-step guided setup
- Skip functionality for all steps
- Beautiful modal design

### Settings Panel
- Tabbed interface for different settings
- Form-based configuration
- Table views for knowledge base and MCP servers

## Conclusion

These new features make OrangeTerm more flexible, powerful, and beautiful. Users can now:
- Use any OpenAI-compatible AI service
- Extend the knowledge base with custom commands
- Add custom MCP servers for specialized tools
- Enjoy a premium UI experience with the glass theme
- Get guided through initial setup with the wizard

The application now provides a complete, professional operations terminal with AI capabilities that can be fully customized to meet specific needs.
