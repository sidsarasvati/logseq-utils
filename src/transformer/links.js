/**
 * Link transformer for converting Logseq links to standard Markdown
 */

const path = require('path');
const { getRelativePath } = require('../utils/path');

/**
 * Process links in content to ensure they work in standard Markdown
 * 
 * @param {string} content Content with Logseq links
 * @param {Object} graph Graph data with page index
 * @param {Object} options Link processing options
 * @returns {string} Content with transformed links
 */
function processLinks(content, graph, options = {}) {
  const { preserveHierarchy = true } = options;
  
  let processedContent = content;
  
  // Process page references - [[Page Name]] to [Page Name](page-name.md)
  processedContent = processedContent.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, pageName, alias) => {
    const displayName = alias || pageName;
    
    // Find the target page in the graph index
    const normPageName = pageName.toLowerCase();
    if (graph.pageIndex[normPageName]) {
      const targetPage = graph.pageIndex[normPageName];
      
      // Create link that works in the output structure
      const targetPath = path.join(
        preserveHierarchy ? targetPage.name.split('/').slice(0, -1).join('/') : '',
        `${targetPage.name.split('/').pop()}.md`
      );
      
      return `[${displayName}](${targetPath})`;
    }
    
    // If page not found, keep the display but make it an anchor
    return `[${displayName}](#${pageName.toLowerCase().replace(/\s+/g, '-')})`;
  });
  
  // Process block references - ((block-id)) to [↩](#^block-id)
  processedContent = processedContent.replace(/\(\(([a-f0-9-]+)\)\)/g, (match, blockId) => {
    return `[↩](#^${blockId})`;
  });
  
  // Process block embeds - {{embed ((block-id))}} to [↩](#^block-id)
  processedContent = processedContent.replace(/\{\{embed\s+\(\(([a-f0-9-]+)\)\)\}\}/g, (match, blockId) => {
    return `[Embedded Block](#^${blockId})`;
  });
  
  // Process asset references - adjust paths
  processedContent = processedContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, altText, assetPath) => {
    // Handle relative paths
    if (assetPath.startsWith('../assets/')) {
      return `![${altText}](assets/${path.basename(assetPath)})`;
    }
    
    // Handle absolute paths
    if (assetPath.startsWith('/assets/')) {
      return `![${altText}](assets/${path.basename(assetPath)})`;
    }
    
    // Keep external references as is
    return match;
  });
  
  return processedContent;
}

/**
 * Add block IDs to headings for reference
 * 
 * @param {string} content Content to process
 * @returns {string} Content with added IDs
 */
function addHeadingIds(content) {
  // Split into lines
  const lines = content.split('\n');
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if it's a heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const [_, hashes, title] = headingMatch;
      const id = title.toLowerCase().replace(/[^\w]+/g, '-');
      lines[i] = `${hashes} ${title} {#${id}}`;
    }
  }
  
  return lines.join('\n');
}

module.exports = {
  processLinks,
  addHeadingIds,
};