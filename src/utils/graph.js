/**
 * Graph utilities for reading and parsing Logseq graphs
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { parseContent } = require('../parser/page');
const { decodeNamespace } = require('./path');

/**
 * Read and index a Logseq graph
 * 
 * @param {string} graphDir Path to the Logseq graph directory
 * @returns {Promise<Object>} Graph data including pages, assets, and structure
 */
async function readGraph(graphDir) {
  // Verify the graph directory exists
  if (!await fs.pathExists(graphDir)) {
    throw new Error(`Graph directory not found: ${graphDir}`);
  }

  // Check for key directories
  const pagesDir = path.join(graphDir, 'pages');
  const assetsDir = path.join(graphDir, 'assets');
  
  if (!await fs.pathExists(pagesDir)) {
    throw new Error(`Pages directory not found: ${pagesDir}`);
  }

  // Find all page files
  const pageFiles = glob.sync('**/*.md', { cwd: pagesDir, nodir: true });
  
  // Process each page
  const pages = await Promise.all(pageFiles.map(async (filePath) => {
    const fullPath = path.join(pagesDir, filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    
    // Get page name from filename
    const pageName = decodeNamespace(path.basename(filePath));
    
    // Parse the page content
    const parsedPage = parseContent(content);
    
    return {
      name: pageName,
      path: filePath,
      fullPath,
      content: parsedPage.content,
      properties: parsedPage.properties,
      references: parsedPage.references,
    };
  }));

  // Build page lookup for references
  const pageIndex = pages.reduce((index, page) => {
    index[page.name.toLowerCase()] = page;
    return index;
  }, {});

  // Find assets if assets directory exists
  let assets = [];
  if (await fs.pathExists(assetsDir)) {
    const assetFiles = glob.sync('**/*', { 
      cwd: assetsDir, 
      nodir: true,
      // Ignore common Logseq system directories
      ignore: ['**/logseq/**']
    });
    
    assets = assetFiles.map(assetPath => ({
      path: assetPath,
      fullPath: path.join(assetsDir, assetPath),
    }));
  }

  return {
    directory: graphDir,
    pagesDir,
    assetsDir,
    pages,
    pageIndex,
    assets,
  };
}

module.exports = {
  readGraph,
};