# MkTable

Dead simple CLI command to generate a table of contents from a markdown file

## Example

```bash
$ npx mktable README.md
```

or install it globally

```bash
$ npm install -g mktable
```

### Output
```markdown
- [MkTable](#mktable)
  - [Example](#example)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
  - [License](#license)
```

You can even automate your README table of contents on lint-staged for example with a simple npm script:

```json
{
  "lint-stage": {
    "README.md": [
      "mktable README.md",
      "git add README.md"
    ]
  }
}
```

## Author

- [Wes Braga](https://github.com/wesbragagt)

## License

[MIT]()
