#!/usr/bin/env node

/**
 * Logseq to Markdown Converter CLI
 * 
 * Command-line interface for the converter.
 */

const { program } = require('commander');
const path = require('path');
const { convertGraph } = require('../index');
const packageJson = require('../../package.json');

// Configure CLI options
program
  .name('logseq-smith')
  .description('A toolkit for transforming and working with Logseq data')
  .version(packageJson.version)
  .requiredOption('-i, --input <directory>', 'Logseq graph directory')
  .requiredOption('-o, --output <directory>', 'Output directory for converted files')
  .option('-f, --flat', 'Flat structure (no namespace folders)', false)
  .option('--no-assets', 'Skip copying assets')
  .option('--verbose', 'Show detailed progress information', false)
  .parse(process.argv);

const options = program.opts();

// Resolve paths
const inputDir = path.resolve(options.input);
const outputDir = path.resolve(options.output);

// Progress display function
function showProgress(progress) {
  if (options.verbose) {
    console.log(`[${progress.stage}] ${progress.message}`);
  } else if (progress.stage === 'reading') {
    console.log('Converting Logseq graph to Markdown...');
  }
}

// Run the conversion
async function run() {
  try {
    console.log(`Input: ${inputDir}`);
    console.log(`Output: ${outputDir}`);
    
    const result = await convertGraph({
      inputDir,
      outputDir,
      preserveHierarchy: !options.flat,
      copyAssets: options.assets,
      progressCallback: showProgress,
    });
    
    console.log('\nConversion completed successfully!');
    console.log(`- Pages converted: ${result.pagesConverted}`);
    if (options.assets) {
      console.log(`- Assets copied: ${result.assetsCopied}`);
    }
    console.log(`- Output directory: ${result.outputDir}`);
    
    process.exit(0);
  } catch (error) {
    console.error(`\nError: ${error.message}`);
    if (options.verbose && error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

run();