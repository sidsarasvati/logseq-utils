/**
 * Tests for the content transformer
 */

const { transformContent, parseLine } = require('../../src/transformer/content');
const { processLinks, addHeadingIds } = require('../../src/transformer/links');

describe('Content Transformer', () => {
  describe('parseLine', () => {
    test('parses a bullet line correctly', () => {
      const line = '  - This is a bullet point';
      const result = parseLine(line);
      
      expect(result.indent).toBe(1);
      expect(result.content).toBe('This is a bullet point');
      expect(result.isBlock).toBe(true);
    });
    
    test('parses a non-bullet line correctly', () => {
      const line = 'This is not a bullet point';
      const result = parseLine(line);
      
      expect(result.isBlock).toBe(false);
      expect(result.content).toBe(line);
    });
    
    test('handles deep nesting', () => {
      const line = '      - Deeply nested';
      const result = parseLine(line);
      
      expect(result.indent).toBe(3);
      expect(result.content).toBe('Deeply nested');
      expect(result.isBlock).toBe(true);
    });
  });
  
  describe('transformContent', () => {
    test('transforms headers correctly', () => {
      const content = `- # Header 1
- ## Header 2
- ### Header 3`;
      
      const result = transformContent(content);
      
      expect(result).toContain('# Header 1');
      expect(result).toContain('## Header 2');
      expect(result).toContain('### Header 3');
    });
    
    test('transforms nested list items', () => {
      const content = `- Item 1
  - Nested item
    - Deep nested
- Item 2`;
      
      const result = transformContent(content);
      
      expect(result).toContain('- Item 1');
      expect(result).toContain('  - Nested item');
      expect(result).toContain('    - Deep nested');
      expect(result).toContain('- Item 2');
    });
    
    test('handles code blocks', () => {
      const content = `- Code block:
  - \`\`\`javascript
  - function test() {
  -   return true;
  - }
  - \`\`\``;
      
      const result = transformContent(content);
      
      expect(result).toContain('- Code block:');
      expect(result).toContain('```javascript');
      expect(result).toContain('function test() {');
      expect(result).toContain('  return true;');
      expect(result).toContain('}');
      expect(result).toContain('```');
    });
    
    test('transforms task items', () => {
      const content = `- TODO Task to do
- DOING Task in progress
- DONE Completed task`;
      
      const result = transformContent(content);
      
      expect(result).toContain('- [ ] Task to do');
      expect(result).toContain('- [ ] Task in progress');
      expect(result).toContain('- [x] Completed task');
    });
  });
});

describe('Link Transformer', () => {
  const mockGraph = {
    pageIndex: {
      'test page': { name: 'Test Page' },
      'projects/website': { name: 'Projects/Website' },
    },
  };
  
  describe('processLinks', () => {
    test('transforms page references', () => {
      const content = 'Link to [[Test Page]]';
      
      const result = processLinks(content, mockGraph);
      
      expect(result).toContain('[Test Page](Test Page.md)');
    });
    
    test('transforms page references with aliases', () => {
      const content = 'Link with alias [[Test Page|Custom Name]]';
      
      const result = processLinks(content, mockGraph);
      
      expect(result).toContain('[Custom Name](Test Page.md)');
    });
    
    test('transforms block references', () => {
      const content = 'Reference to ((64f8a1c9-8e3e-4a57-a0f7-cb3619102244))';
      
      const result = processLinks(content, mockGraph);
      
      expect(result).toContain('[↩](#^64f8a1c9-8e3e-4a57-a0f7-cb3619102244)');
    });
    
    test('transforms asset references', () => {
      const content = 'Image: ![](../assets/image.png)';
      
      const result = processLinks(content, mockGraph);
      
      expect(result).toContain('![](assets/image.png)');
    });
  });
  
  describe('addHeadingIds', () => {
    test('adds IDs to headings', () => {
      const content = `# Header 1
## Header with spaces
### Special @#$ Characters`;
      
      const result = addHeadingIds(content);
      
      expect(result).toContain('# Header 1 {#header-1}');
      expect(result).toContain('## Header with spaces {#header-with-spaces}');
      expect(result).toContain('### Special @#$ Characters {#special-characters}');
    });
  });
});