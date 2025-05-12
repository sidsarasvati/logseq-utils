/**
 * Path utilities for handling Logseq file paths and namespaces
 */

const path = require('path');

/**
 * Decode Logseq namespace encoding in filenames
 * 
 * @param {string} filename The filename to decode
 * @returns {string} Decoded filename with slashes for namespaces
 */
function decodeNamespace(filename) {
  // Remove extension
  const basename = filename.replace(/\.[^.]+$/, '');
  
  // Handle different namespace encodings
  
  // Period encoding (e.g., Projects.Website.Homepage.md)
  if (basename.includes('.')) {
    return basename.replace(/\./g, '/');
  }
  
  // URL encoding (e.g., Projects%2FWebsite%2FHomepage.md)
  if (basename.includes('%2F')) {
    return basename.replace(/%2F/g, '/');
  }
  
  // Triple underscore encoding (e.g., Projects___Website___Homepage.md)
  if (basename.includes('___')) {
    return basename.replace(/___/g, '/');
  }
  
  return basename;
}

/**
 * Create output path for a page, handling namespaces
 * 
 * @param {string} pageName The page name possibly with namespaces
 * @param {string} outputDir The base output directory
 * @param {Object} options Options for path creation
 * @param {boolean} options.preserveHierarchy Whether to create folders for namespaces
 * @returns {Object} Object with outputPath and directory information
 */
function createOutputPath(pageName, outputDir, options = {}) {
  const { preserveHierarchy = true } = options;
  
  // Handle namespaces
  if (preserveHierarchy && pageName.includes('/')) {
    const parts = pageName.split('/');
    const filename = `${parts.pop()}.md`;
    const dirPath = path.join(outputDir, ...parts);
    
    return {
      filename,
      dirPath,
      outputPath: path.join(dirPath, filename),
      isNamespaced: true,
      namespace: parts.join('/'),
    };
  }
  
  // Regular page (no namespace)
  const outputPath = path.join(outputDir, `${pageName}.md`);
  
  return {
    filename: `${pageName}.md`,
    dirPath: outputDir,
    outputPath,
    isNamespaced: false,
    namespace: null,
  };
}

/**
 * Get relative path between pages
 * 
 * @param {string} fromPage Source page path
 * @param {string} toPage Target page path
 * @param {boolean} preserveHierarchy Whether namespaces are preserved as folders
 * @returns {string} Relative path for linking
 */
function getRelativePath(fromPage, toPage, preserveHierarchy = true) {
  if (!preserveHierarchy) {
    // In flat structure, all pages are in the same directory
    return path.basename(toPage);
  }
  
  // In hierarchical structure, calculate relative path
  const fromDir = path.dirname(fromPage);
  return path.relative(fromDir, toPage);
}

module.exports = {
  decodeNamespace,
  createOutputPath,
  getRelativePath,
};