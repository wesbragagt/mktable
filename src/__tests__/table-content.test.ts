import { describe, it, expect } from 'vitest';
import { TableContent } from '../table-content';

function getTestContent() {
  return `
# TestEncoder

TestEncoder is a command-line tool that transforms lines of text into encoded strings ending with "test".

## Installation

To install TestEncoder, clone this repository and run the following command:

\`\`\`bash
git clone https://github.com/yourusername/TestEncoder.git
cd TestEncoder
python setup.py install

### Usage

\`\`\`bash
Testencode "Hello World"
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[John](#some-lint-to-trick-the-test)
[Jane](##some-lint-to-trick-the-test)
[Doe](###some-lint-to-trick-the-test)
`
}


describe(`${TableContent.name}`, () => {
  it('generates table of contents with bullets', () => {
    const toc = new TableContent(getTestContent());
    expect(toc.make()).toEqual([
      '## Table of Contents',
      '  - [Installation](#installation)',
      '    - [Usage](#usage)',
      '  - [Contributing](#contributing)',
      '  - [License](#license)'
    ]);
  })
})
