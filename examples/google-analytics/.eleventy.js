const transformDomPlugin = require('eleventy-plugin-transformdom');

const appendGoogleAnalytics = ({ elements, document }) => {
  const script = document.createElement('script');

  script.textContent = `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-XXXXX-Y', 'auto');
    ga('send', 'pageview');
  `;

  elements[0].appendChild(script);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(transformDomPlugin, {
    'body': appendGoogleAnalytics,
  });
};
