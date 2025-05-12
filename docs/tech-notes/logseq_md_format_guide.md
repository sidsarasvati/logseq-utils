# Logseq Markdown Format Guide

## Basic Structure
- Each line must start with a dash and space `- `
- Content follows hierarchical bullet structure
- Nesting is done with 2-space indentation after the dash

## Headers
- Headers are normal text with markdown syntax
- `- # Header 1`
- `- ## Header 2`
- `- ### Header 3`

## Blocks
- Every line is a block
- Nested blocks use indentation:
```
- Parent block
  - Child block
    - Grandchild block
```

## Properties
- Properties go at the top of the page
- Format: `- property:: value`
- Example: `- title:: My Page`
- Common properties:
  - `title::`
  - `tags::`
  - `alias::`
  - `public::`
  - `date::`

## Formatting
- Bold: `**bold text**`
- Italic: `*italic text*`
- Highlight: `^^highlighted text^^`
- Strikethrough: `~~strikethrough~~`
- Code: ``` `inline code` ```
- Code block:
```
- ```language
  code block content
  multiple lines
  ```
```

## Links
- Page links: `[[Page Name]]`
- Custom link text: `[[Page Name][Custom Text]]`
- Block reference: `((block-id))`
- Block embed: `{{embed ((block-id))}}`
- External link: `[Text](https://example.com)`
- URL: `https://example.com`
- Tags: `#tag` or `#tag/subtag`

## Task Management
- TODO: `- TODO Item text`
- DOING: `- DOING Item text`
- DONE: `- DONE Item text`
- Alternative: 
  - `- todo: Item text`
  - `- doing: Item text`
  - `- done: Item text`

## Assets and Embeds
- Image: `![Alt text](../assets/image.png)`
- Sized image: `![](../assets/image.png){:width 300, :height 200}`
- YouTube: `{{youtube https://youtube.com/watch?v=ID}}`
- PDF: `{{pdf ../assets/document.pdf}}`
- Excalidraw: `{{renderer :excalidraw, filename.excalidraw}}`

## Block Properties
- Block-specific properties:
```
- Block content
  id:: unique-block-id
  collapsed:: true
  heading:: true
```

## Special Formats
- Callouts:
```
- > [!NOTE] Title
  > Callout content
```
- LaTeX: `$$E = mc^2$$`
- Query:
```
- ```query
  {query content}
  ```
```

## File Naming
- Regular pages: lowercase with hyphens (e.g., `my-page.md`)
- Journal pages: YYYY_MM_DD.md (e.g., `2023_05_12.md`)
- All files stored in `/pages` or `/journals` directories