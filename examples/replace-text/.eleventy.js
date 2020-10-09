const transformDomPlugin = require('eleventy-plugin-transformdom');

const updateGeneratedDate = ({ elements }) => {
  elements[0].innerHTML = elements[0].innerHTML.replace(
    /GENERATED_DATE/gim,
    new Date()
  );
};

const updateText = ({ elements }) => {
  elements.forEach((element) => {
    element.innerHTML = element.innerHTML
      .replace(/some/gim, '🥱 boring')
      .replace(/other/gim, '😎 cool');
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(transformDomPlugin, [
    {
      selector: 'body',
      transform: updateGeneratedDate,
    },
    {
      selector: 'p',
      transform: updateText,
    },
  ]);
};
