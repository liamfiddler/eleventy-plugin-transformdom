# SVG inline demo

This is a demo of
[eleventy-plugin-transformdom](https://github.com/liamfiddler/eleventy-plugin-transformdom)
which inlines SVG images.

input:

<textarea disabled cols="50" rows="6">
<svg
  src="example.svg"
  width="400"
  style="border: solid 1px black"
/>
</textarea>

result:

<svg
  src="example.svg"
  width="400"
  style="border: solid 1px black"
/>

expected result source:

<textarea disabled cols="50" rows="10">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 150 30"
  width="400"
  style="border: solid 1px black"
  data-srcpath="./example.svg"
>
<text x="5" y="20">hello from SVG</text>
</svg>
</textarea>
