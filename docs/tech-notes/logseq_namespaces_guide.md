# Logseq Namespaces Guide

## Namespace Concepts
- Namespaces create hierarchical organization in your Logseq graph
- They appear as nested pages in the UI
- The slash character (`/`) is the namespace separator
- Example: `projects/website/homepage` is a page in the `projects/website` namespace

## File System Structure
Namespaces can be represented in two ways in the filesystem:

### Option 1: Flat structure with slash in filename
```
pages/
├── projects.md
├── projects___website.md
├── projects___website___homepage.md
```
- Slashes in page names are converted to triple underscores (`___`) in filenames
- This is the default behavior in many Logseq graphs

### Option 2: Nested folder structure (newer method)
```
pages/
├── projects.md
├── projects/
│   ├── website.md
│   └── website/
│       └── homepage.md
```
- Actual folders represent the namespace hierarchy
- Cleaner filesystem organization
- Supported in newer versions of Logseq

## Linking to Namespaced Pages
- Reference using full path: `[[projects/website/homepage]]`
- Can use alias: `[[projects/website/homepage][Homepage]]`
- Tags also support namespaces: `#projects/website`

## Creating Namespaced Pages
1. Simply create a page with slashes in the name
2. When saving, Logseq will create the appropriate file structure
3. Parent namespaces are automatically created (e.g., creating `projects/website/homepage` will create `projects` and `projects/website` if they don't exist)

## File Naming Rules
- Namespaced page filenames are lowercase
- Spaces are converted to underscores or hyphens
- Special characters are typically encoded

## Namespace Properties
- Pages inherit properties from parent namespace pages
- Common to set properties at namespace level that apply to all children

## Namespace Queries
- Can query for all pages in a namespace:
```
{{query (page-property namespace "projects/website")}}
```

## Best Practices
- Use namespaces for categories, projects, or areas of knowledge
- Create consistent namespace hierarchies
- Don't go too deep with namespaces (2-3 levels is usually sufficient)
- Consider using separate graphs for entirely different domains