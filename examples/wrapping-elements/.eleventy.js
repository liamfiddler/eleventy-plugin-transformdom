const transformDomPlugin = require('eleventy-plugin-transformdom');

const wrapTableInOverflowDiv = ({ elements, document }) => {
  elements.forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.style.overflowX = 'auto';
    wrapper.style.width = '100%';

    table.parentElement.insertBefore(wrapper, table);
    wrapper.appendChild(table); // Moves table into the newly created div
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(transformDomPlugin, [
    {
      selector: 'table',
      transform: wrapTableInOverflowDiv,
    },
  ]);
};
