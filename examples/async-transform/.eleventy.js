const fetch = require('node-fetch');
const transformDomPlugin = require('eleventy-plugin-transformdom');

const updateTextAsync = async ({ elements }) => {
  const response = await fetch('https://api.github.com/repos/liamfiddler/eleventy-plugin-transformdom');
  const { stargazers_count } = await response.json();
  const oldText = 'replaces some text with other text from an async function';
  const newText = `has ${stargazers_count} stars on GitHub`;

  elements[0].innerHTML = elements[0].innerHTML
    .replace(oldText, newText);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(transformDomPlugin, [
    {
      selector: 'body',
      transform: updateTextAsync,
    },
  ]);
};
