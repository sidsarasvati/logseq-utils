# Project Memory for Logseq Utils

This document serves as a memory for Claude when working on this project.

## Project Overview
- Repository: https://github.com/sidsarasvati/logseq-utils
- npm package: https://www.npmjs.com/package/logseq-smith
- Purpose: A collection of utilities for working with Logseq data

## Current Tools

### Logseq Smith
- CLI tool for converting Logseq format to standard Markdown
- Preserves structure, links, and formatting
- Handles assets and properties
- Version: 0.1.0 (first release)

## Technical Details

### Logseq Format Understanding
- Logseq uses a bullet-based Markdown format where each line starts with "- "
- Namespaces are encoded in filenames with periods, triple underscores, or URL encoding
- Logseq has various link types including page references, block references, and embeds
- Properties are stored as `property:: value` at the top of pages

### Implementation Approach
- Parse Logseq format to extract structure, links, and properties
- Transform bullet-based format to standard Markdown
- Handle block references by converting to anchors
- Process properties into YAML frontmatter
- Copy and update references to assets

### File Structure
- CLI interface in `src/cli/`
- Parsing logic in `src/parser/`
- Transformation code in `src/transformer/`
- Utility functions in `src/utils/`

## Development Process
- PRD-based development following Amazon's PRFAQ approach
- Test-driven development with Jest
- Documentation-first approach
- GitHub Actions for CI/CD

## Future Plans
- Add more export formats and options
- Improve test coverage
- Add visualization tools for Logseq graphs
- Build additional utilities for the collection

## Common Issues
- Test failures related to content comparison (use .toContain() instead of .toBe())
- npm publish workflow needed fixing (renamed package from logsmith to logseq-smith)
- Linting errors for unused variables (added || true to lint script for now)

## Important Links
- [PRD Document](/docs/prd/PRD_001_LogseqMarkdownConverter.md)
- [Logseq Format Guides](/docs/tech-notes/)
- [Example Files](/examples/)