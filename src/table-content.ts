export class TableContent {
  lines: string[]

  constructor(content: string) {
    this.lines = content.split('\n');
  }

  make() {
    const headings = this.matchLinesHeading(/^#+/);

    const title = '## Table of Contents';
    const table: string[] = [];

    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const headingLevel = this.calculateHeadingLevel(heading);
      const text = heading.replace(/^#+ /, '');
      const slug = text.toLowerCase().replace(/ /g, '-');

      const line = headingLevel > 1 ? `${'  '.repeat(headingLevel - 1)}- [${text}](#${slug})` : '';
      (line && table.push(line));
    }

    return [title, ...table];
  }

  private matchLinesHeading(expression: RegExp) {
    return this.lines.filter(line => line.match(expression)?.[0]);
  }

  private calculateHeadingLevel(heading: string) {
    return heading.match(/^#+/)?.[0].length || 0;
  }
}
