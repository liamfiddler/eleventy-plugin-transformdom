const { JSDOM } = require('jsdom');

/**
 * @typedef {Object} TransformParams
 * @property {string} outputPath
 * @property {string} outputDir
 * @property {string} inputPath
 * @property {string} inputDir
 * @property {string} extraOutputSubdirectory
 */

/**
 * @typedef {Object} TransformArgs
 * @property {Element[]} elements
 * @property {import('jsdom').DOMWindow} window
 * @property {Document} document
 * @property {TransformParams} params
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
      /** @type TransformParams */
      const params = {
        outputPath,
        outputDir: this.outputDir,
        inputPath: this.inputPath,
        inputDir: this.inputDir,
        extraOutputSubdirectory: this.extraOutputSubdirectory,
      };

      const dom = new JSDOM(content);

      transforms.forEach(({ selector, transform }) => {
        transform({
          elements: Array.from(dom.window.document.querySelectorAll(selector)),
          window: dom.window,
          document: dom.window.document,
          params,
        });
      });

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
