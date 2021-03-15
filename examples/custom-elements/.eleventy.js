const transformDomPlugin = require('eleventy-plugin-transformdom');



// generate transformers for transformDomPlugin
function getElementTransformer(selector, options = {}) {

  const defaultOptions = {
    name: 'div',
    attributes: (e => Object.fromEntries(Array.from(e.attributes).map(a => [a.name, a.value]))),
    class: (e => e.localName), // lowercase tag name
  };
  options = Object.assign(defaultOptions, options);

  const getName = (
    (typeof options.name == 'function') ? (e => options.name(e)) :
    (() => options.name)
  );

  const getAttributes = (
    (typeof options.attributes == 'function') ? (e => options.attributes(e)) :
    (typeof options.attributes == 'object') ? (() => options.attributes) :
    (() => false)
  );

  const getExtraClass = (
    (typeof options.class == 'function') ? (e => options.class(e)) :
    (typeof options.class == 'string') ? (() => options.class) :
    (() => false)
  );

  const domTransformer = {
    selector,
    transform: ({ elements, document }) => {
      for (const element of elements) {
        const nameNew = getName(element);
        if (!nameNew) continue; // no replace
        const attributesNew = getAttributes(element) || {};
        const extraClassNew = getExtraClass(element);

        const elementNew = document.createElement(nameNew);

        // copy attributes
        for (const [name, value] of Object.entries(attributesNew)) {
          elementNew.setAttribute(name, value);
        }

        // copy content
        elementNew.innerHTML = element.innerHTML;

        // add class
        if (extraClassNew) elementNew.classList.add(extraClassNew);

        element.replaceWith(elementNew);
      }
    },
  };
  return domTransformer;
}



module.exports = function (eleventyConfig) {
  const domTransformers = [];

  // in:  <page>hello</page>
  // out: <div class="page-element">hello</div>
  domTransformers.push(getElementTransformer('page', { class: 'page-element' }));

  // in:  <nw>dont wrap me</nw>
  // out: <span class="nowrap-element">dont wrap me</span>
  domTransformers.push(getElementTransformer('nw', { name: 'span', class: 'nowrap-element' }));

  // in:  <en>good day</en><de>guten tag</de>
  // out: <span lang="en">good day</span><span lang="de">guten tag</span>
  for (const langKey of ['en', 'de']) {
    domTransformers.push(getElementTransformer(langKey,
      { name: 'span', attributes: (e => ({ lang: e.localName })), class: false }));
  }

  eleventyConfig.addPlugin(transformDomPlugin, domTransformers);
};
