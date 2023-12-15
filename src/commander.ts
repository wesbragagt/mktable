export class Commander {
  #version: string;

  constructor(opts: {
    version: string
  }) {
    this.#version = opts.version;
  }
  get help() {
    return `
      Usage: mktable <filetarget or README.md default>

      Example: mktable README.md

      Copy to clipboard using pbcopy (macOS only):
        mktable README.md | pbcopy

      Copy to clipboard using xclip (Linux only):
        mktable README.md | xclip -selection clipboard

      Copy to clipboard using clip (Windows only):
        mktable README.md | clip

      Options:
        -h, --help     display help
        -v, --version  display version
    `;
  }

  get version() {
    return `mktable version: ${this.#version}`
  }
}
