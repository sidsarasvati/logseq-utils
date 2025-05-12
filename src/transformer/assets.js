/**
 * Asset handler for processing and copying Logseq assets
 */

const path = require('path');
const fs = require('fs-extra');
const { copyAssets } = require('../utils/fs');

/**
 * Handle assets for the conversion
 * 
 * @param {Array<Object>} pages Processed pages
 * @param {string} inputDir Input directory (Logseq graph)
 * @param {string} outputDir Output directory
 * @returns {Promise<Array>} Information about processed assets
 */
async function handleAssets(pages, inputDir, outputDir) {
  // Find all asset references in the pages
  const assetRefs = new Set();
  
  // Extract asset references from content
  for (const page of pages) {
    const { content, references } = page;
    
    // Add known asset references
    if (references && references.assets) {
      references.assets.forEach(asset => assetRefs.add(asset));
    }
    
    // Scan for additional image references in Markdown format
    const imageMatches = [...content.matchAll(/!\[(?:.*?)\]\(([^)]+)\)/g)];
    for (const match of imageMatches) {
      assetRefs.add(match[1]);
    }
  }
  
  // Process asset paths
  const assetsToProcess = Array.from(assetRefs)
    .map(assetRef => {
      // Clean up path
      let assetPath = assetRef;
      
      // Handle relative paths
      if (assetPath.startsWith('../assets/')) {
        return assetPath.substring('../assets/'.length);
      }
      
      // Handle absolute paths
      if (assetPath.startsWith('/assets/')) {
        return assetPath.substring('/assets/'.length);
      }
      
      // Skip external URLs
      if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
        return null;
      }
      
      return assetPath;
    })
    .filter(Boolean); // Remove nulls
  
  // Prepare asset objects
  const assetObjects = assetsToProcess.map(assetPath => ({
    path: assetPath,
    fullPath: path.join(inputDir, 'assets', assetPath),
  }));
  
  // Copy assets to output directory
  try {
    const processedAssets = await copyAssets(assetObjects, inputDir, outputDir);
    return processedAssets;
  } catch (error) {
    console.error(`Error handling assets: ${error.message}`);
    return [];
  }
}

module.exports = {
  handleAssets,
};