import { TableContent } from '../table-content';
import { expect } from 'chai';

describe(`${TableContent.name}`, () => {
  it('generates table of contents with bullets', () => {
    const input = `
# Heading 1

heading 1 content

## Heading 2

heading 2 content

### Heading 3

heading 3 content
`
    const toc = new TableContent(input)
    const actual = toc.ast;

    expect(actual.children[2].type).equal('heading');
    // @ts-ignore
    expect(actual.children[2].children[0].type).equal('text');
    // @ts-ignore
    expect(actual.children[2].children[0].value).equal('Table of Contents');

    // @ts-ignore
    expect(actual.children[2].depth).equal(2);
  })

  it('replaces current table of contents', () => {
    const input = `# MkTable

Dead simple CLI command to generate a table of contents from a markdown file

![mktable in action](./assets/mktable.gif)

## Table of Contents

* [Example](#example)

## Example

example

## Example 2

example 2`
    const expected = `# MkTable

Dead simple CLI command to generate a table of contents from a markdown file

![mktable in action](./assets/mktable.gif)

## Table of Contents

* [Example](#example)
* [Example 2](#example-2)

## Example

example

## Example 2

example 2
`
    const toc = new TableContent(input)
    expect(toc.markdown.trim()).equal(expected.trim());
  })

})
