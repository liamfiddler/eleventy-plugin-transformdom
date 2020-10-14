const { JSDOM } = require('jsdom');

/**
 * @typedef {Object} TransformArgs
 * @property {Element[]} elements
 * @property {import('jsdom').DOMWindow} window
 * @property {Document} document
 * @property {string} outputPath
 * @property {string} outputDir
 * @property {string} inputPath
 * @property {string} inputDir
 */

/**
 * @typedef {Object} TransformItem
 * @property {string} selector
 * @property {(args: TransformArgs) => void} transform
 */

/**
 * @param {any} eleventyConfig
 * @param {TransformItem[]} transforms
 */
function configFunction(eleventyConfig, transforms = []) {
  /**
   * @param {string} rawContent
   * @param {string} outputPath
   */
  async function transformDom(rawContent, outputPath) {
    let content = rawContent;

    if (outputPath && outputPath.endsWith('.html')) {
      const dom = new JSDOM(content);
      const numTransforms = transforms.length;

      for (let i = 0; i < numTransforms; i++) {
        const { selector, transform } = transforms[i];

        await transform({
          elements: Array.from(dom.window.document.querySelectorAll(selector)),
          window: dom.window,
          document: dom.window.document,
          outputPath,
          outputDir: this.outputDir,
          inputPath: this.inputPath,
          inputDir: this.inputDir,
        });
      }

      content = dom.serialize();
    }

    return content;
  }

  eleventyConfig.addTransform('transformdom', transformDom);
}

module.exports = {
  initArguments: {},
  configFunction,
};
