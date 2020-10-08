const fs = require('fs');
const transformDomPlugin = require('eleventy-plugin-transformdom');

const webComponentsDir = './components';

const webComponents = fs
  .readdirSync(webComponentsDir, { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .map((item) => item.name);

const loadWebComponent = (filepath) => ({ document }) => {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = filepath;
  document.body.appendChild(script);
};

module.exports = function (eleventyConfig) {
  const transforms = {};

  webComponents.forEach((filename) => {
    const tag = filename.replace('.js', '');
    transforms[tag] = loadWebComponent(`${webComponentsDir}/${filename}`);
  });

  eleventyConfig.addPassthroughCopy(webComponentsDir);
  eleventyConfig.addPlugin(transformDomPlugin, transforms);
};
