# Logseq Graph File Structure

A typical Logseq graph (knowledge base) has the following directory structure:

```
graph-directory/
├── assets/               # Where images and other files are stored
│   ├── image.png
│   ├── document.pdf
│   └── excalidraw-drawings/
│       └── drawing.excalidraw
│
├── journals/             # Daily notes (journal entries)
│   ├── 2024_05_12.md
│   └── 2024_05_11.md
│
├── logseq/               # Logseq configuration directory
│   ├── config.edn        # Main configuration file
│   ├── custom.css        # Custom styling
│   ├── plugins/          # Plugins directory
│   ├── bak/              # Backup files
│   └── pages-metadata.edn # Metadata for pages
│
├── pages/                # Regular (non-journal) pages
│   ├── page1.md
│   ├── page2.md
│   └── namespace/        # Pages can be organized in namespaces (folders)
│       └── nested_page.md
│
└── templates/            # Template files
    └── daily-note.md
```

## Key Files

1. **config.edn**: Configuration settings for the Logseq graph
2. **pages/**: Contains the main content pages in Markdown format
3. **journals/**: Contains daily notes in Markdown format
4. **assets/**: Contains images, PDFs, and other files referenced in pages
5. **pages-metadata.edn**: Contains metadata about pages (properties, backlinks)

## File Naming Conventions

- Regular pages: lowercase with hyphens or underscores, .md extension
- Journal pages: YYYY_MM_DD.md format
- Asset files: Preserved original filenames, stored in assets/ directory
- Special characters in page names are typically encoded in the filename

## Data Storage

Logseq primarily stores content in plain text Markdown files, with some EDN (Extensible Data Notation) files for configuration and metadata. The graph database itself is built on-the-fly from these files when Logseq is opened.