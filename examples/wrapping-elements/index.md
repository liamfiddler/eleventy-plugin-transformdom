# Element wrapping demo

This is a demo of
[eleventy-plugin-transformdom](https://github.com/liamfiddler/eleventy-plugin-transformdom)
which shows to wrap elements.

In this example a table will be wrapped as such:

```html
<table>
    ...
</table>

<div style="overflow-x: auto; width: 100%;">
    <table>
        ...
    </table>
</div>