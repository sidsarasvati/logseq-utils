# Contributing to LogSmith

Thank you for considering contributing to LogSmith! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

When reporting bugs, please include:

1. The steps to reproduce the bug
2. Expected behavior
3. Actual behavior
4. Screenshots (if applicable)
5. Your environment (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

1. A clear description of the enhancement
2. The motivation for the enhancement
3. How it would work (if you have ideas)

### Pull Requests

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 14 or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sidsarasvati/logseq-utils.git
   cd logseq-utils
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run tests
   ```bash
   npm test
   ```

## Project Structure

- `src/` - Source code
  - `cli/` - Command-line interface
  - `parser/` - Logseq format parsing
  - `transformer/` - Markdown transformation
  - `utils/` - Utility functions
- `test/` - Test files
- `docs/` - Documentation
- `examples/` - Example files

## Testing

Please write tests for new features and ensure existing tests pass before submitting a pull request.

```bash
npm test
```

## Style Guide

- Use ESLint and Prettier for code formatting
- Follow existing code style

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.