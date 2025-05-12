/**
 * Parser for Logseq page content
 */

/**
 * Parse Logseq page content into structured data
 * 
 * @param {string} content The raw page content
 * @returns {Object} Parsed page data
 */
function parseContent(content) {
  // Split content into lines
  const lines = content.split('\n');
  
  // Extract properties
  const properties = {};
  const contentLines = [];
  const references = {
    pages: new Set(),
    blocks: new Set(),
    assets: new Set(),
  };
  
  // Process each line
  for (const line of lines) {
    // Handle property lines (e.g., "- property:: value")
    const propertyMatch = line.match(/^\s*-\s+([a-zA-Z0-9_-]+)::\s+(.+)$/);
    if (propertyMatch) {
      const [_, key, value] = propertyMatch;
      properties[key] = parsePropertyValue(value);
      continue;
    }
    
    // Collect page references
    const pageRefs = [...line.matchAll(/\[\[([^\]]+)\]\]/g)];
    for (const match of pageRefs) {
      references.pages.add(match[1].split('|')[0]); // Handle [[Page|Alias]] format
    }
    
    // Collect block references
    const blockRefs = [...line.matchAll(/\(\(([a-f0-9-]+)\)\)/g)];
    for (const match of blockRefs) {
      references.blocks.add(match[1]);
    }
    
    // Collect asset references
    const assetRefs = [...line.matchAll(/!\[(?:.*?)\]\(([^)]+)\)/g)];
    for (const match of assetRefs) {
      references.assets.add(match[1]);
    }
    
    contentLines.push(line);
  }
  
  return {
    content: contentLines.join('\n'),
    properties,
    references: {
      pages: Array.from(references.pages),
      blocks: Array.from(references.blocks),
      assets: Array.from(references.assets),
    },
  };
}

/**
 * Parse a property value with special handling for references and types
 * 
 * @param {string} value The property value to parse
 * @returns {any} Parsed value
 */
function parsePropertyValue(value) {
  // Handle page references
  if (value.startsWith('[[') && value.endsWith(']]')) {
    return value.slice(2, -2);
  }
  
  // Handle tags (e.g., #tag1, #tag2)
  if (value.includes('#')) {
    return value.split(',').map(v => v.trim());
  }
  
  // Handle numbers
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }
  
  // Handle booleans
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  
  // Default to string
  return value;
}

module.exports = {
  parseContent,
  parsePropertyValue,
};