/**
 * Tests for the Logseq content parser
 */

const { parseContent, parsePropertyValue } = require('../../src/parser/page');

describe('Parser', () => {
  describe('parseContent', () => {
    test('parses basic content without properties', () => {
      const content = `- # Header
- This is a test
  - Nested item`;
      
      const result = parseContent(content);
      
      expect(result.content).toBe(content);
      expect(result.properties).toEqual({});
      expect(result.references.pages).toEqual([]);
    });
    
    test('extracts properties correctly', () => {
      const content = `- title:: Test Page
- tags:: #test, #parser
- public:: true
- # Test Page
- Content here`;

      const result = parseContent(content);

      expect(result.properties).toEqual({
        title: 'Test Page',
        tags: ['#test', '#parser'],
        public: true,
      });

      // Content should still include the property lines
      expect(result.content).toContain('# Test Page');
      expect(result.content).toContain('Content here');
    });
    
    test('detects page references', () => {
      const content = `- # Test
- Link to [[Another Page]]
- Link with alias [[Page|Custom Name]]`;
      
      const result = parseContent(content);
      
      expect(result.references.pages).toContain('Another Page');
      expect(result.references.pages).toContain('Page');
    });
    
    test('detects block references', () => {
      const content = `- # Test
- Reference to ((64f8a1c9-8e3e-4a57-a0f7-cb3619102244))`;
      
      const result = parseContent(content);
      
      expect(result.references.blocks).toContain('64f8a1c9-8e3e-4a57-a0f7-cb3619102244');
    });
    
    test('detects asset references', () => {
      const content = `- # Test
- Image: ![](../assets/image.png)
- Another: ![alt text](/assets/diagram.svg)`;
      
      const result = parseContent(content);
      
      expect(result.references.assets).toContain('../assets/image.png');
      expect(result.references.assets).toContain('/assets/diagram.svg');
    });
  });
  
  describe('parsePropertyValue', () => {
    test('handles page references', () => {
      expect(parsePropertyValue('[[Page Name]]')).toBe('Page Name');
    });
    
    test('handles tags', () => {
      expect(parsePropertyValue('#tag1, #tag2')).toEqual(['#tag1', '#tag2']);
    });
    
    test('handles numbers', () => {
      expect(parsePropertyValue('42')).toBe(42);
      expect(parsePropertyValue('-3.14')).toBe(-3.14);
    });
    
    test('handles booleans', () => {
      expect(parsePropertyValue('true')).toBe(true);
      expect(parsePropertyValue('false')).toBe(false);
    });
    
    test('handles regular strings', () => {
      expect(parsePropertyValue('Just a string')).toBe('Just a string');
    });
  });
});