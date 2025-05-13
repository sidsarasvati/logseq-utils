# LogSmith

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A toolkit for transforming and working with Logseq data. Currently includes a powerful converter from Logseq's format to standard Markdown, preserving structure, links, and assets.

## Features

- Converts Logseq's bullet-based format to standard Markdown
- Preserves hierarchical structure and formatting
- Transforms Logseq properties to YAML frontmatter
- Handles page references, block references, and embeds
- Processes and copies assets
- Supports namespace hierarchy in output folder structure
- Simple, intuitive command-line interface

## Installation

### Global Installation

```bash
npm install -g logsmith
```

### Local Installation

```bash
npm install logsmith
```

## Usage

### Command Line

```bash
# Basic usage
logsmith --input /path/to/logseq/graph --output /path/to/output/directory

# Options
logsmith --input ~/Notes/my-graph --output ~/Exports/markdown --flat --no-assets

# Show help
logsmith --help
```

### Command Alias

For quicker access, you may want to set up an alias:

```bash
# Add to your ~/.bashrc or ~/.zshrc
alias lg="logsmith"

# Now you can use the shorter command
lg --input ~/LogseqGraph --output ~/ExportedMarkdown

### Options

| Option | Description |
|--------|-------------|
| `-i, --input <directory>` | Logseq graph directory (required) |
| `-o, --output <directory>` | Output directory for converted files (required) |
| `-f, --flat` | Use flat structure (no namespace folders) |
| `--no-assets` | Skip copying assets |
| `--verbose` | Show detailed progress information |
| `-v, --version` | Show version information |

### API Usage

You can also use the tool programmatically:

```javascript
const { convertGraph } = require('logsmith');

async function convert() {
  const result = await convertGraph({
    inputDir: '/path/to/logseq/graph',
    outputDir: '/path/to/output',
    preserveHierarchy: true,
    copyAssets: true,
    progressCallback: (progress) => console.log(`${progress.stage}: ${progress.message}`),
  });
  
  console.log(`Converted ${result.pagesConverted} pages`);
}

convert();
```

## How It Works

Logseq-to-Markdown processes your Logseq graph in these steps:

1. **Reading**: Scans the Logseq graph structure and reads page files
2. **Parsing**: Analyzes Logseq's bullet-based Markdown format
3. **Transforming**: Converts to standard Markdown while preserving structure
4. **Processing Links**: Updates internal links to work in the new format
5. **Asset Handling**: Copies and updates references to images and other assets
6. **Output**: Writes converted files to the output directory

## Limitations

- Complex Logseq queries are converted but won't be functional in standard Markdown
- Some Logseq-specific features (like interactive diagrams) may not have exact equivalents
- Task/todo states are converted to standard Markdown checkboxes

## Development

### Setup

```bash
git clone https://github.com/sidsarasvati/logseq-utils.git
cd logseq-utils
npm install
```

### Testing

```bash
npm test
```

### Building

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.