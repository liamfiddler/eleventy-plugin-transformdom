const transformDomPlugin = require('eleventy-plugin-transformdom');

const staticConfig = {
  dir: {
    input: ".",
    output: "_site",
    // relative to input:
    includes: "_includes",
    data: "_data",
  },
};

function getSvgInlineTransformer() {
  const srcRoot = staticConfig?.dir?.input || '.'; // global
  const fs = require('fs');
  // https://stackoverflow.com/a/54579530/10440128
  const getAllAttributes = el => (el.getAttributeNames()
    .reduce((obj, name) => ({ ...obj, [name]: el.getAttribute(name) }), {}));
  const domTransformer = {
    selector: 'svg[src]', // <svg src="path/to/file.svg">
    transform: ({ elements, document }) => {
      for (const element of elements) {
        const attributes = getAllAttributes(element);
        console.dir({ svg_src_attributes: attributes });
        const srcPath = srcRoot + '/' + attributes.src;
        delete attributes.src;
        attributes['data-srcpath'] = srcPath;
        // read svg file + remove xml header
        const srcText = fs.readFileSync(srcPath, 'utf8').replace(/<\?xml.*?\?>/, '');
        const elementTemp = document.createElement('div');
        elementTemp.innerHTML = srcText;
        const elementNew = elementTemp.querySelector('svg');
        const { width, height } = attributes;
        if (width || height) {
          elementNew.removeAttribute('width');
          elementNew.removeAttribute('height');
          if (width) elementNew.setAttribute('width', width);
          if (height) elementNew.setAttribute('height', height);
          delete attributes.width;
          delete attributes.height;
        }
        if (attributes.class) {
          const c1 = elementNew.getAttribute('class');
          const c2 = attributes.class;
          elementNew.setAttribute('class', (c1 ? `${c1} ${c2}` : c2));
          delete attributes.class;
        }
        for (const [key, val] of Object.entries(attributes)) {
          elementNew.setAttribute(key, val);
        }
        element.replaceWith(elementNew);
      }
    },
  };
  return domTransformer;
}

module.exports = function (eleventyConfig) {

  const domTransformers = [];
  domTransformers.push(getSvgInlineTransformer());
  eleventyConfig.addPlugin(transformDomPlugin, domTransformers);

  return staticConfig;
};
