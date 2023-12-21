import { toMarkdown } from "mdast-util-to-markdown";
import { fromMarkdown } from "mdast-util-from-markdown";

type Root = ReturnType<typeof fromMarkdown>;
type RootContent = Root['children'][number];

export class TableContent {
  content: string
  lines: string[]
  ast: Root
  markdown: string

  constructor(content: string) {
    this.content = content;
    this.lines = content.split('\n');
    const _ast = this.make(content);
    this.ast = _ast;
    this.markdown = this.toMarkdown(this.ast);
  }

  make(content: string): Root {
    const contentAst = this.toAST(content);
    const table = this.makeTableContentFromAst(contentAst);

    const hasTableOfContentsAlready = contentAst.children.some(node => {
      return node.type === 'heading' && node.depth === 2 && node.children[0].type === 'text' && node.children[0].value.match(/table of contents/i)
    });

    if (hasTableOfContentsAlready) {
      const removed = this.removeTableOfContents(contentAst);
      return this.insertTableOfContents(table, removed, this.getIndexToPlaceTable(removed));
    } else {
      const indexToPlaceTable = this.getIndexToPlaceTable(contentAst);
      return this.insertTableOfContents(table, contentAst, indexToPlaceTable);
    }
  }

  toMarkdown(ast: Root) {
    return toMarkdown(ast);
  }

  private removeTableOfContents(ast: Root) {
    const indexOfCurrentTableOfContents = ast.children.findIndex(node => {
      return node.type === 'heading' && node.depth === 2 && node.children[0].type === 'text' && node.children[0].value.match(/table of contents/i)
    });

    const indexOfNextHeading = ast.children.findIndex((node, index) => {
      return index > indexOfCurrentTableOfContents && node.type === 'heading' && node.depth === 2
    });

    ast.children.splice(indexOfCurrentTableOfContents, indexOfNextHeading - indexOfCurrentTableOfContents);

    return ast;
  }
  private insertTableOfContents(tableAst: Root, currentAst: Root, index: number) {
    currentAst.children.splice(index, 0, ...tableAst.children);

    return currentAst;
  }

  private getIndexToPlaceTable(ast: Root): number {
    // locates the index of the first h2 after the first h1 and it goes before it
    const indexh1 = ast.children.findIndex(node => node.type === 'heading' && node.depth === 1);
    const indexh2 = ast.children.findIndex(node => node.type === 'heading' && node.depth === 2);

    const output = indexh2 > indexh1 ? indexh2 : indexh1 + 2;

    return output;
  }

  private toAST(str: string): Root {
    return fromMarkdown(str);
  }

  private makeTableContentFromAst(ast: Root): Root {
    const headings = ast.children.filter(node => node.type === 'heading' && node.depth > 1 && node.children[0].type === 'text' && !node.children[0].value.match(/table of contents/i));

    const title = '## Table of Contents';
    const table: string[] = [];

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      if (heading.type === 'heading') {
        const headingLevel = heading.depth;
        const text = this.extractHeadingText(heading).replace(/^#+/g, '');
        const slug = text.toLowerCase().replace(/ /g, '-');
        const line = headingLevel > 1 ? `${'  '.repeat(headingLevel - 1)}- [${text}](#${slug})` : '';
        (line && table.push(line));
      }
    }

    const tableString = [title, ...table].join('\n');

    return this.toAST(tableString);
  }

  private extractHeadingText(node: RootContent): string {
    if (node.type === 'heading' && node.children[0].type === 'text') {
      return node.children[0].value
    } else {
      return ''
    }
  }
}
