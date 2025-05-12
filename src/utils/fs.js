/**
 * File system utilities for the converter
 */

const fs = require('fs-extra');
const path = require('path');
const { createOutputPath } = require('./path');

/**
 * Write converted pages to output directory
 * 
 * @param {Array<Object>} pages Array of page objects with processed content
 * @param {string} outputDir The output directory path
 * @param {Object} options Output options
 * @param {boolean} options.preserveHierarchy Whether to create folders for namespaces
 * @returns {Promise<Object>} Results of the write operation
 */
async function writeOutput(pages, outputDir, options = {}) {
  const { preserveHierarchy = true } = options;
  
  // Ensure output directory exists
  await fs.ensureDir(outputDir);
  
  // Write each page
  const results = await Promise.all(pages.map(async (page) => {
    const { name, content, properties } = page;
    
    // Create output path handling namespaces
    const output = createOutputPath(name, outputDir, { preserveHierarchy });
    
    // Ensure directory exists
    await fs.ensureDir(output.dirPath);
    
    // Combine properties as frontmatter and content
    let fileContent = '';
    
    // Add frontmatter if properties exist
    if (properties && Object.keys(properties).length > 0) {
      fileContent += '---\n';
      for (const [key, value] of Object.entries(properties)) {
        fileContent += `${key}: ${JSON.stringify(value)}\n`;
      }
      fileContent += '---\n\n';
    }
    
    // Add processed content
    fileContent += content;
    
    // Write the file
    await fs.writeFile(output.outputPath, fileContent, 'utf8');
    
    return {
      name,
      outputPath: output.outputPath,
      isNamespaced: output.isNamespaced,
      namespace: output.namespace,
    };
  }));
  
  return {
    outputDir,
    pages: results,
  };
}

/**
 * Copy assets to output directory and update references
 * 
 * @param {Array<Object>} assets Array of asset objects
 * @param {string} inputDir Input directory (Logseq graph)
 * @param {string} outputDir Output directory
 * @returns {Promise<Array>} Copied assets information
 */
async function copyAssets(assets, inputDir, outputDir) {
  // Create assets directory in output
  const outputAssetsDir = path.join(outputDir, 'assets');
  await fs.ensureDir(outputAssetsDir);
  
  // Copy each asset
  const results = await Promise.all(assets.map(async (asset) => {
    const { path: assetPath, fullPath } = asset;
    const outputPath = path.join(outputAssetsDir, assetPath);
    
    // Ensure directory exists
    await fs.ensureDir(path.dirname(outputPath));
    
    // Copy the file
    await fs.copy(fullPath, outputPath);
    
    return {
      originalPath: assetPath,
      outputPath,
    };
  }));
  
  return results;
}

module.exports = {
  writeOutput,
  copyAssets,
};