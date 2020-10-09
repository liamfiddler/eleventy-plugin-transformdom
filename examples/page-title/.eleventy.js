const transformDomPlugin = require('eleventy-plugin-transformdom');

const addPageTitle = ({ elements, document }) => {
  const title = document.createElement('title');
  document.getElementsByTagName('head')[0].appendChild(title);
  title.textContent = elements[0].textContent;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(transformDomPlugin, [
    {
      selector: 'h1',
      transform: addPageTitle,
    },
  ]);
};
