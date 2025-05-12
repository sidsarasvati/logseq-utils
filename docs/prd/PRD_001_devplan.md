# Development Plan: Logseq Markdown Converter

*Reference: [PRD_001_LogseqMarkdownConverter.md](./PRD_001_LogseqMarkdownConverter.md)*

## Technical Overview

This development plan outlines the implementation approach for the Logseq Markdown Converter, a tool that transforms Logseq's bullet-based Markdown format into standard Markdown while preserving structure and references.

## Architecture

The converter will follow a modular architecture with these core components:

1. **Configuration Manager**
   - Parse command-line arguments
   - Load default and custom settings
   - Validate input/output paths

2. **Graph Reader**
   - Read and index the Logseq graph structure
   - Parse encoded filenames (handling namespaces)
   - Create an in-memory representation of the graph

3. **Content Parser**
   - Extract page properties
   - Parse bullet-point hierarchies
   - Identify block references and links
   - Handle special formatting elements

4. **Markdown Transformer**
   - Convert bullet points to standard Markdown
   - Transform properties to YAML frontmatter
   - Process links and references
   - Handle special elements (code blocks, callouts, etc.)

5. **Asset Handler**
   - Identify and index assets
   - Copy assets to output directory
   - Update asset references in content

6. **Output Writer**
   - Create directory structure
   - Write transformed Markdown files
   - Generate index or navigation files if needed
   - Ensure proper file permissions

## Implementation Phases

### Phase 1: Core Structure and Basic Conversion

**Goal:** Create project scaffolding and implement basic file conversion

1. Set up project structure and dependencies
2. Implement CLI interface and configuration
3. Create file system utilities for reading/writing
4. Develop basic parser for Logseq format
5. Implement simple transformer for bullet points
6. Create basic output writer

**Deliverable:** Tool that can read Logseq files and output basic Markdown with bullet points transformed.

### Phase 2: Link Processing and Page References

**Goal:** Handle Logseq's various link types and page references

1. Implement namespace decoding (handling various encodings)
2. Develop link transformer for page references
3. Add support for block references
4. Handle external links
5. Implement tag processing

**Deliverable:** Conversion tool that preserves all links and references in the output.

### Phase 3: Asset Handling and Structure Preservation

**Goal:** Properly manage assets and maintain hierarchical structure

1. Implement asset detection in content
2. Create asset copying mechanism
3. Update asset references in output
4. Enhance hierarchical structure preservation
5. Add folder structure creation for namespaces

**Deliverable:** Converter that handles assets and preserves hierarchical structure.

### Phase 4: Advanced Features and Refinement

**Goal:** Add support for more complex features and polish

1. Implement properties to YAML frontmatter conversion
2. Add support for code blocks and callouts
3. Handle special formatting (highlights, strikethrough, etc.)
4. Implement progress reporting
5. Add error handling and logging
6. Create comprehensive documentation

**Deliverable:** Complete conversion tool ready for release.

## Technical Implementation Details

### File Format Handling

The converter will need to handle various Logseq file formats:

1. **Filename Decoding:**
   ```javascript
   function decodeNamespace(filename) {
     // Handle period-separated namespaces
     if (filename.includes('.')) {
       return filename.replace(/\.md$/, '').replace(/\./g, '/') + '.md';
     }
     // Handle URL-encoded namespaces
     if (filename.includes('%2F')) {
       return filename.replace(/\.md$/, '').replace(/%2F/g, '/') + '.md';
     }
     // Handle triple-underscore namespaces
     if (filename.includes('___')) {
       return filename.replace(/\.md$/, '').replace(/___/g, '/') + '.md';
     }
     return filename;
   }
   ```

2. **Bullet Point Processing:**
   ```javascript
   function processBulletPoints(content) {
     const lines = content.split('\n');
     const result = [];
     let currentIndentation = 0;
     
     for (const line of lines) {
       // Skip empty lines
       if (!line.trim()) {
         result.push('');
         continue;
       }
       
       // Parse indentation and bullet
       const match = line.match(/^(\s*)- (.*)$/);
       if (!match) {
         // Not a bullet point, keep as is
         result.push(line);
         continue;
       }
       
       const [_, indent, text] = match;
       const indentLevel = Math.floor(indent.length / 2);
       
       // Convert to appropriate Markdown
       if (text.startsWith('# ')) {
         // Handle headings
         result.push(text);
       } else if (text.startsWith('```')) {
         // Handle code blocks
         result.push(text);
       } else {
         // Handle regular content with indentation
         const prefix = '  '.repeat(indentLevel);
         result.push(`${prefix}* ${text}`);
       }
     }
     
     return result.join('\n');
   }
   ```

3. **Property Conversion:**
   ```javascript
   function convertProperties(properties) {
     let yaml = '---\n';
     
     for (const [key, value] of Object.entries(properties)) {
       yaml += `${key}: ${formatYamlValue(value)}\n`;
     }
     
     yaml += '---\n\n';
     return yaml;
   }
   
   function formatYamlValue(value) {
     if (Array.isArray(value)) {
       return `[${value.map(v => `"${v}"`).join(', ')}]`;
     }
     if (typeof value === 'string') {
       // Handle strings that need quotes
       if (value.includes(':') || value.includes('#')) {
         return `"${value.replace(/"/g, '\\"')}"`;
       }
     }
     return value;
   }
   ```

### Directory Structure

The output directory structure will be created to match namespace hierarchy:

```
output/
├── index.md                       # Generated index page
├── page1.md                       # Regular pages
├── page2.md
├── projects/                      # Namespace folder
│   ├── project1.md
│   └── website/                   # Nested namespace
│       └── homepage.md
├── assets/                        # Copied assets
│   ├── image1.png
│   └── document.pdf
└── README.md                      # Generated readme
```

## Testing Strategy

1. **Unit Tests:**
   - Test each component in isolation
   - Focus on parsing, transformation, and path handling

2. **Integration Tests:**
   - Test the end-to-end conversion process
   - Verify directory structure creation
   - Check link and reference preservation

3. **Sample Data Tests:**
   - Create representative test cases:
     - Simple pages with basic formatting
     - Pages with complex links and references
     - Pages with assets and embeds
     - Namespace-heavy structures

4. **Comparison Tests:**
   - Compare output to manually converted references
   - Verify structural integrity

## Technical Dependencies

- **Core Dependencies:**
  - Node.js v14+
  - fs-extra (enhanced file system operations)
  - commander (CLI interface)
  - yaml (YAML processing)
  - glob (file pattern matching)

- **Dev Dependencies:**
  - Jest (testing)
  - ESLint (code quality)
  - prettier (code formatting)

## Development Environment Setup

1. Initialize Node.js project:
   ```bash
   mkdir logseq-to-md
   cd logseq-to-md
   npm init -y
   ```

2. Install dependencies:
   ```bash
   npm install fs-extra commander yaml glob
   npm install --save-dev jest eslint prettier
   ```

3. Create project structure:
   ```bash
   mkdir -p src/{cli,parser,transformer,utils} test/fixtures
   ```

4. Set up ESLint and Prettier:
   ```bash
   npx eslint --init
   echo '{}' > .prettierrc.json
   ```

5. Create initial files:
   ```bash
   touch src/index.js src/cli/index.js
   ```

## Implementation Timeline

1. **Week 1: Core Foundation**
   - Project setup and scaffolding
   - Basic CLI interface
   - File system utilities
   - Simple bullet point transformer

2. **Week 2: Link Processing**
   - Namespace parsing
   - Link transformation
   - Page reference handling

3. **Week 3: Structure and Assets**
   - Asset detection and copying
   - Directory structure creation
   - Hierarchical preservation

4. **Week 4: Polish and Documentation**
   - Properties to YAML conversion
   - Advanced formatting
   - Documentation
   - Testing and refinement

## Success Criteria

1. **Functionality:**
   - Successful conversion of test cases
   - Preservation of hierarchical structure
   - Working links and references
   - Proper asset handling

2. **Performance:**
   - Process 100+ pages per second on standard hardware
   - Minimal memory footprint

3. **Usability:**
   - Clear CLI interface
   - Helpful error messages
   - Comprehensive documentation

4. **Code Quality:**
   - Modular architecture
   - Well-tested components
   - Maintainable codebase

## Next Steps

After completing the initial implementation:

1. Gather user feedback
2. Consider extensions:
   - Support for specific publishing platforms
   - Web UI for non-technical users
   - Batch processing options
   - Custom templates for output

3. Explore automation options:
   - GitHub Actions integration
   - Scheduled conversion workflows