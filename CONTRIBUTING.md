# Contributing to OrangeTerm

Thank you for your interest in contributing to OrangeTerm! This document provides guidelines and instructions for contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Basic knowledge of TypeScript, React, and Electron

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/orangeterm.git
   cd orangeterm
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Project Structure

- `src/main/` - Electron main process code (Node.js environment)
- `src/renderer/` - React UI code (browser environment)
- `src/preload/` - Preload scripts for secure IPC
- `src/lib/` - Shared business logic libraries
- `src/types/` - TypeScript type definitions

## Development Workflow

### Running in Development Mode

```bash
npm run dev
```

This will start both the Vite dev server and the Electron app with hot reload enabled.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run type-check  # TypeScript type checking
npm run lint        # ESLint code quality check
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type when possible
- Use strict mode

### React

- Use functional components with hooks
- Use React Context for state management
- Keep components small and focused
- Follow React best practices

### Naming Conventions

- **Components**: PascalCase (e.g., `CommandInput.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase

### Code Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Max line length: 100 characters

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(command): add command history feature

Implement command history with up/down arrow navigation.
Users can now browse through previously executed commands.

Closes #123
```

## Pull Request Process

1. **Update Documentation**: Ensure README and other docs are updated
2. **Add Tests**: Include tests for new features
3. **Run Checks**: Ensure all tests and lint checks pass
4. **Update Changelog**: Add entry to CHANGELOG.md
5. **Request Review**: Submit PR and request review from maintainers

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Branch is up to date with main

## Feature Requests and Bug Reports

### Bug Reports

When filing a bug report, include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- System information (OS, Node version, etc.)
- Error messages and logs

### Feature Requests

For feature requests, describe:

- The problem you're trying to solve
- Your proposed solution
- Alternative solutions considered
- Additional context

## Security

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email the maintainers directly
3. Include details of the vulnerability
4. Wait for acknowledgment before disclosure

## Areas for Contribution

### High Priority

- [ ] Improve MCP integration with real AI models
- [ ] Add comprehensive test suite
- [ ] Implement plugin system
- [ ] Add multi-language support
- [ ] Improve command execution safety

### Good First Issues

- Documentation improvements
- UI/UX enhancements
- Bug fixes
- Adding more commands to knowledge base
- Improving error messages

### Advanced Features

- Cloud sync for settings
- Remote server management
- Team collaboration features
- Advanced logging and audit trails
- Custom theme support

## Code Review Process

All submissions require review before merging:

1. Maintainers will review code for:
   - Code quality and style
   - Security considerations
   - Performance implications
   - Test coverage
   - Documentation completeness

2. Address any requested changes

3. Once approved, a maintainer will merge your PR

## Community

- Be respectful and inclusive
- Help others in discussions
- Share knowledge and best practices
- Follow the code of conduct

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Questions?

Feel free to ask questions by:
- Opening a discussion on GitHub
- Commenting on relevant issues
- Reaching out to maintainers

Thank you for contributing to OrangeTerm!
