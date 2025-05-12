# Logseq to Markdown Converter Architecture

## Overview

A simplified, easy-to-understand Node.js tool for converting Logseq pages to standard Markdown. The converter will maintain hierarchical structure, preserve links and references, and handle assets properly.

## Core Components

### 1. File System Interface

**Purpose**: Handle reading from Logseq directory and writing to output directory
- Read Logseq graph structure 
- Parse filenames (handling encoded namespaces)
- Create output directory structure
- Copy/transform assets

### 2. Markdown Parser & Transformer

**Purpose**: Convert Logseq's Markdown format to standard Markdown
- Remove leading bullet points (`- `)
- Handle nested blocks (proper indentation)
- Convert properties to YAML frontmatter
- Transform Logseq-specific formatting

### 3. Link Processor

**Purpose**: Handle various types of Logseq links
- Convert page references (`[[Page Name]]`) to standard Markdown links
- Process namespace links (decode `%2F` or `.` separators)
- Fix asset paths
- Handle block references & embeds

### 4. CLI Interface

**Purpose**: Provide simple command-line usage
- Accept input/output paths
- Provide configuration options
- Show progress and results

## Data Flow

1. **Read Configuration**: Parse input arguments and options
2. **Load Graph Structure**: Scan Logseq directory and build page index
3. **Process Each Page**:
   - Parse page content
   - Extract properties for frontmatter
   - Transform content format
   - Process links and references
4. **Handle Assets**:
   - Identify assets in content
   - Copy assets to output directory
   - Update asset references in content
5. **Write Output**:
   - Create directory structure
   - Write transformed Markdown files
   - Copy assets

## File Structure

```
logseq-to-md/
├── package.json
├── README.md
├── src/
│   ├── index.js         # Main entry point
│   ├── cli.js           # CLI interface
│   ├── config.js        # Configuration handler
│   ├── fs-utils.js      # File system utilities
│   ├── parser/
│   │   ├── page.js      # Page parsing logic
│   │   ├── block.js     # Block parsing
│   │   └── frontmatter.js # Properties to frontmatter
│   ├── transformer/
│   │   ├── content.js   # Format transformation
│   │   ├── links.js     # Link processing
│   │   └── assets.js    # Asset handling
│   └── utils/
│       ├── path.js      # Path utilities
│       └── string.js    # String manipulation
└── test/
    ├── fixtures/        # Test input files
    └── expected/        # Expected output
```

## Key Algorithms

### 1. Namespace Decoding

```javascript
function decodeNamespace(filename) {
  // Remove .md extension
  const name = filename.replace(/\.md$/, '');
  
  // Handle different encoding methods
  if (name.includes('.')) {
    return name.replace(/\./g, '/');
  } else if (name.includes('___')) {
    return name.replace(/___/g, '/');
  } else if (name.includes('%2F')) {
    return name.replace(/%2F/g, '/');
  }
  
  return name;
}
```

### 2. Bullet Point Removal

```javascript
function removeBulletPoints(content) {
  // Split into lines
  const lines = content.split('\n');
  
  // Process each line
  const processed = lines.map(line => {
    // Check for bullet point at start of line
    if (line.trim().startsWith('- ')) {
      // Remove the bullet point while preserving indentation
      const indentation = line.match(/^\s*/)[0];
      return indentation + line.trim().substring(2);
    }
    return line;
  });
  
  return processed.join('\n');
}
```

### 3. Link Transformation

```javascript
function transformLinks(content) {
  // Convert Logseq page links to Markdown links
  // [[Page Name]] -> [Page Name](page-name.md)
  let transformed = content.replace(/\[\[(.*?)\]\]/g, (match, pageName) => {
    const linkPath = pageName.toLowerCase().replace(/\s+/g, '-') + '.md';
    return `[${pageName}](${linkPath})`;
  });
  
  // Handle other link types...
  
  return transformed;
}
```

## Implementation Plan

1. Set up basic project structure and CLI interface
2. Implement file system utilities for reading Logseq structure
3. Create core parser for Logseq page format
4. Develop transformers for content and links
5. Add asset handling
6. Implement output writing with directory structure
7. Add configuration options and documentation
8. Test with sample Logseq data

## Future Extensions

- Support for Logseq queries
- Handling for advanced features like diagrams
- Interactive mode for customizing conversion
- Web UI for conversion
- Batch processing multiple graphs