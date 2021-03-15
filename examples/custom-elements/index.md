# Custom elements demo

This is a demo of
[eleventy-plugin-transformdom](https://github.com/liamfiddler/eleventy-plugin-transformdom)
which transforms custom elements.

result:

<page>
  <nw>dont wrap me</nw>
  <p>
    <en>good day</en>
    <de>guten tag</de>
  </p>
</page>

expected source:

<textarea disabled cols="52" rows="8">
<div class="page-element">
  <span class="nowrap-element">dont wrap me</span>
  <p>
    <span lang="en">good day</span>
    <span lang="de">guten tag</span>
  </p>
</div>
</textarea>
