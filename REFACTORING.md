# Refactoring Opportunities

This document tracks technical debt and future improvement opportunities for the Logseq Utils project. It serves as a backlog for code quality improvements that aren't immediate priorities but should be addressed in the future.

## Current Opportunities

### Architecture

- [ ] Extract core conversion logic into a reusable library separate from CLI
- [ ] Implement plugin system for custom transformers

### Performance

- [ ] Optimize file reading for very large graphs
- [ ] Add parallel processing option for large conversions

### Features

- [ ] Add support for advanced Logseq features (queries, custom embeds)
- [ ] Create web UI for the converter
- [ ] Implement real-time preview of conversion results

### Documentation

- [ ] Add comprehensive API documentation
- [ ] Create example-based user guide
- [ ] Add benchmarking information

## Completed Refactorings

*None yet - project in initial development*

## How to Use This Document

When you identify technical debt or a refactoring opportunity:

1. Add it to this document under the appropriate category
2. Include a brief explanation of why it's needed
3. Note any dependencies or prerequisites

When implementing a refactoring:

1. Create a dedicated branch for the refactoring
2. Update this document as part of the PR
3. Move the item from "Current Opportunities" to "Completed Refactorings"
4. Add the date and brief notes about the implementation