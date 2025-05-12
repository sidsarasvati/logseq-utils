/**
 * Logseq to Markdown Converter
 * 
 * Main entry point for the library version of the converter.
 */

const { readGraph } = require('./utils/graph');
const { transformContent } = require('./transformer/content');
const { processLinks } = require('./transformer/links');
const { handleAssets } = require('./transformer/assets');
const { writeOutput } = require('./utils/fs');

/**
 * Convert Logseq graph to standard Markdown
 * 
 * @param {Object} options Configuration options
 * @param {string} options.inputDir The Logseq graph directory
 * @param {string} options.outputDir The output directory for converted files
 * @param {boolean} options.preserveHierarchy Whether to create folder structure for namespaces
 * @param {boolean} options.copyAssets Whether to copy and process assets
 * @param {Function} options.progressCallback Optional callback for progress updates
 * @returns {Promise<Object>} Results of the conversion process
 */
async function convertGraph(options) {
  const {
    inputDir,
    outputDir,
    preserveHierarchy = true,
    copyAssets = true,
    progressCallback = () => {},
  } = options;

  try {
    // Read and index the Logseq graph
    progressCallback({ stage: 'reading', message: 'Reading Logseq graph...' });
    const graph = await readGraph(inputDir);

    // Transform content and process links
    progressCallback({ stage: 'transforming', message: 'Transforming content...' });
    const transformedPages = await Promise.all(
      graph.pages.map(async (page) => {
        const transformedContent = transformContent(page.content);
        const processedContent = processLinks(transformedContent, graph);
        return { ...page, content: processedContent };
      })
    );

    // Handle assets if enabled
    let assets = [];
    if (copyAssets) {
      progressCallback({ stage: 'assets', message: 'Processing assets...' });
      assets = await handleAssets(transformedPages, inputDir, outputDir);
    }

    // Write output files
    progressCallback({ stage: 'writing', message: 'Writing output files...' });
    const result = await writeOutput(transformedPages, outputDir, {
      preserveHierarchy,
    });

    return {
      pagesConverted: transformedPages.length,
      assetsCopied: assets.length,
      outputDir,
    };
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

module.exports = {
  convertGraph,
};