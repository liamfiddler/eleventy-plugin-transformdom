const fs = require('fs');
const transformDomPlugin = require('eleventy-plugin-transformdom');

module.exports = function (eleventyConfig) {
  const transforms = [];
  const webComponentsDir = './components';

  const webComponents = fs
    .readdirSync(webComponentsDir, { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);

  webComponents.forEach((filename) => {
    const tag = filename.replace('.js', '');
    const filepath = `${webComponentsDir}/${filename}`;

    transforms.push({
      selector: tag,
      transform: ({ elements, document }) => {
        if (elements.length > 0) {
          const script = document.createElement('script');
          script.type = 'module';
          script.src = filepath;
          document.body.appendChild(script);
        }
      },
    });
  });

  eleventyConfig.addPassthroughCopy(webComponentsDir);
  eleventyConfig.addPlugin(transformDomPlugin, transforms);
};
