# DOM Transforming plugin

Process & change the generated HTML output of your [eleventy](https://www.11ty.io/) site.

You give the plugin CSS selectors and callback functions, then the plugin will run your callback functions on each HTML file eleventy outputs.

Some of the things you could use it to do include:

- [Replace any text on the page](./examples/replace-text)
- [Add `loading="lazy"` attributes to your images](./examples/loading-lazy)
- [Append any script (like Google Analytics) to the page](./examples/google-analytics)
- [Set the page `title` tag to match the first heading on the page](./examples/page-title)
- [Import web components (only on pages they're used)](./examples/web-components)
- And more!

---

**Like this project? Buy me a coffee via [PayPal](https://paypal.me/liamfiddler) or [ko-fi](https://ko-fi.com/liamfiddler)**

---

## Getting started

### Install the plugin

In your project directory run:

```sh
# Using npm
npm install eleventy-plugin-transformdom --save-dev

# Or using yarn
yarn add eleventy-plugin-transformdom --dev
```

Then update your project's `.eleventy.js` to include the plugin:

```js
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
```

## Contributing

This project welcomes suggestions and Pull Requests!

## Authors

- **Liam Fiddler** - _Initial work / maintainer_ - [@liamfiddler](https://github.com/liamfiddler)

See also the list of
[contributors](https://github.com/liamfiddler/eleventy-plugin-transformdom/contributors)
who participated in this project.

## License

This project is licensed under the MIT License -
see the [LICENSE](LICENSE) file for details

## Acknowledgments

- The wonderfully supportive team at
  [Future Friendly](https://futurefriendly.team)
- Everyone who has contributed to the
  [11ty](https://www.11ty.io/) and [JSDOM](https://github.com/jsdom/jsdom) projects, without whom
  this plugin wouldn't run

---

**Like this project? Buy me a coffee via [PayPal](https://paypal.me/liamfiddler) or [ko-fi](https://ko-fi.com/liamfiddler)**

---
