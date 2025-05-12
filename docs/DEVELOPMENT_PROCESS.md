# Logseq Utils Development Process

This document outlines the development process for the Logseq Utils project, including how we use different types of documentation and planning artifacts. All developers and AI code agents should review this document when starting work on the project.

## Documentation Hierarchy

### 1. Product Requirements Documents (`/docs/prd/*.md`)

**Purpose**: Product-oriented specifications using PRFAQ approach  
**When to use**: When specifying a feature to be implemented

PRDs follow Amazon's "working backwards" PRFAQ approach with a standardized naming convention:
- `PRD_001_FeatureName.md` - The main PRD document
- `PRD_001_devplan.md` - The corresponding development/implementation plan

PRDs include:
- Press Release: Announce the feature as if it already exists
- FAQ: Answer key customer, business, and technical questions
- Requirements: User stories and acceptance criteria
- Implementation Guidance: High-level technical direction

See the template at `/docs/templates/PRD_Template.md` for the complete structure.

PRDs focus primarily on user value and "why" before addressing "how", with separate dev plans for detailed technical implementation.

### 2. Technical Development Plans (`/docs/prd/PRD_*_devplan.md`)

**Purpose**: Detailed technical implementation plans for features defined in PRDs  
**When to use**: After a PRD is approved and before implementation begins

Development plans should:
- Reference the corresponding PRD
- Break down implementation into specific technical tasks
- Define the architecture and component interactions
- Outline phases for incremental delivery
- Specify success criteria for the implementation

### 3. Technical Notes (`/docs/tech-notes/*.md`)

**Purpose**: Capture specific technical decisions, investigations, or learnings  
**When to use**: To document research or explain specific technical choices

Technical notes should:
- Focus on a single technical topic
- Provide clear explanations and examples
- Reference external resources when applicable

### 4. REFACTORING.md (`/REFACTORING.md`)

**Purpose**: Track technical debt and future improvement opportunities  
**When to use**: To document areas that need improvement but aren't immediate priorities

## Development Workflow

### 1. Planning Phase

1. For a new feature:
   - Check if a PRD document exists
   - If not, create one using the PRD_Template and get it reviewed
   - Create a corresponding development plan
2. Break down work into implementable tasks

### 2. Implementation Phase

1. Follow the established patterns in the codebase
2. Implement with tests where appropriate
3. Document any technical decisions or learnings in Tech Notes

### 3. Review Phase

1. Ensure code follows project conventions
2. Update documentation to reflect implementation
3. Update REFACTORING.md as appropriate

## Project Structure

- `/src` - Source code
  - `/cli` - Command-line interface
  - `/parser` - Logseq format parsing
  - `/transformer` - Markdown transformation
  - `/utils` - Utility functions
- `/test` - Test files
- `/docs` - Documentation
  - `/prd` - Product requirements documents
  - `/tech-notes` - Technical documentation
  - `/templates` - Document templates
- `/examples` - Example files and use cases

## Current Development Focus

1. Core conversion functionality
2. Reliable link and reference handling
3. Asset management
4. Simple and intuitive CLI

## Pull Request Guidelines

1. Reference the PRD Document
2. Include a clear description of changes
3. Note any technical decisions or challenges
4. Identify potential impacts or risks

## Best Practices for AI Code Agents

1. Always review relevant PRD documents before starting work
2. Maintain consistency with existing code patterns
3. Document any non-obvious decisions
4. Focus on complete, working implementations rather than partial features
5. Prioritize readability and maintainability over clever solutions
6. Document technical debt in REFACTORING.md rather than implementing suboptimal solutions

This document should be reviewed at the beginning of each development session to ensure consistent process across the project.