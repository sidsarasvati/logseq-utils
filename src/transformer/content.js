/**
 * Content transformer for converting Logseq format to standard Markdown
 */

/**
 * Transform Logseq content to standard Markdown
 * 
 * @param {string} content Logseq content with bullet points
 * @returns {string} Standard Markdown content
 */
function transformContent(content) {
  // Split into lines for processing
  const lines = content.split('\n');
  const result = [];
  
  // Track indentation levels for lists
  let inList = false;
  let listIndentLevel = 0;
  let lastIndentLevel = 0;
  
  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines
    if (!line.trim()) {
      result.push('');
      inList = false;
      continue;
    }
    
    // Parse the line's indentation and content
    const { indent, content: lineContent, isBlock } = parseLine(line);
    
    // If not a block line (doesn't start with -), keep as is
    if (!isBlock) {
      result.push(line);
      continue;
    }
    
    // Handle headers (lines that start with - # ...)
    if (lineContent.match(/^#+\s/)) {
      result.push(lineContent);
      inList = false;
      continue;
    }
    
    // Handle code blocks and other special blocks
    if (lineContent.startsWith('```')) {
      result.push(lineContent);
      
      // Find the end of the code block
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        const nextLineContent = parseLine(nextLine).content;
        
        result.push(nextLine.replace(/^\s*-\s/, '')); // Remove bullet for code block lines
        
        if (nextLineContent.startsWith('```')) {
          i = j; // Skip processed lines
          break;
        }
        j++;
      }
      
      continue;
    }
    
    // Handle task items
    if (lineContent.startsWith('TODO ') || lineContent.startsWith('DOING ') || lineContent.startsWith('DONE ')) {
      const taskStatus = lineContent.match(/^(TODO|DOING|DONE)\s/)[1];
      const taskContent = lineContent.replace(/^(TODO|DOING|DONE)\s/, '');
      
      const checkbox = taskStatus === 'DONE' ? '[x]' : '[ ]';
      const indentStr = '  '.repeat(indent);
      result.push(`${indentStr}- ${checkbox} ${taskContent}`);
      continue;
    }
    
    // Handle list items
    const indentStr = '  '.repeat(indent);
    if (indent > lastIndentLevel) {
      // Increased indentation - new list level
      result.push(`${indentStr}- ${lineContent}`);
    } else if (indent < lastIndentLevel) {
      // Decreased indentation - end of nested list
      result.push(`${indentStr}- ${lineContent}`);
    } else {
      // Same indentation - continue list
      result.push(`${indentStr}- ${lineContent}`);
    }
    
    lastIndentLevel = indent;
    inList = true;
  }
  
  return result.join('\n');
}

/**
 * Parse a line to extract indentation level and content
 * 
 * @param {string} line Line to parse
 * @returns {Object} Parsed line data
 */
function parseLine(line) {
  // Match indentation and bullet pattern
  const match = line.match(/^(\s*)(-\s+)(.*)$/);
  
  if (!match) {
    return {
      indent: 0,
      content: line,
      isBlock: false,
    };
  }
  
  const [_, indentation, bullet, content] = match;
  const indentLevel = Math.floor(indentation.length / 2);
  
  return {
    indent: indentLevel,
    content,
    isBlock: true,
  };
}

module.exports = {
  transformContent,
  parseLine,
};