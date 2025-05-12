# Logseq Namespaces: Actual Implementation

## Namespace System in Logseq

Logseq uses **namespaces** to create hierarchical organization in your knowledge graph. However, this hierarchy is primarily logical rather than physical in the filesystem.

## How Namespaces are Stored on Disk

When you create a page with namespaces (e.g., `[[ChatGPT/Tutorials/Prompts]]`), Logseq:

1. Creates a single file in your `pages` directory
2. Encodes the namespace separators in the filename
3. Uses one of these encoding methods:
   - Period notation: `ChatGPT.Tutorials.Prompts.md`
   - URL encoding: `ChatGPT%2FTutorials%2FPrompts.md`
   - Triple underscores (older versions): `ChatGPT___Tutorials___Prompts.md`

The specific encoding method depends on your Logseq version and when your graph was created.

## Flat File Structure (Not Folders)

Despite what some settings might suggest, Logseq intentionally uses a **flat file structure** rather than creating physical directories that mirror namespaces:

- All files sit directly in the `pages` directory
- There are no subdirectories for namespaces
- The `:namespace/dir-support?` setting in `config.edn` does not create physical directories

## Why This Matters for Your Tool

When building a tool to convert Logseq to standard Markdown:

1. You'll need to parse these encoded filenames to reconstruct the namespace hierarchy
2. You may want to create actual folders in your output structure to represent the hierarchy
3. Your tool needs to handle different encoding methods used by Logseq

## Using Manually Created Folders

If you manually create folders in the `pages` directory and place Markdown files in them:

1. Logseq will still read and include these files in your graph
2. However, Logseq doesn't interpret the folder structure as namespaces
3. The filenames themselves (without the folder path) are what Logseq uses as page names
4. If the filenames contain namespace separators, they'll still be processed as namespaced pages

For example, if you create:
```
pages/
└── ChatGPT/
    └── Tutorials.md
```

Logseq will read this as a page named `Tutorials`, not `ChatGPT/Tutorials`.

## Community Practices

Because of these limitations, Logseq users typically:

1. Use the built-in namespace system (with encoded filenames)
2. Rely on Logseq's UI to navigate the namespace hierarchy
3. Accept that the filesystem organization doesn't match the logical organization

## Recommendations for Your Tool

When building a Logseq-to-Markdown converter:

1. Detect namespace encoding in filenames (periods, URL encoding, triple underscores)
2. Decode these into proper namespace paths
3. Create a folder structure in your output that represents these namespaces
4. Ensure your tool handles all encoding variations used by Logseq