const transformDomPlugin = require('eleventy-plugin-transformdom');

const addLoadingLazyAttribute = ({ elements }) => {
  elements.forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(transformDomPlugin, {
    'img': addLoadingLazyAttribute,
  });
};
