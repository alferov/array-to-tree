# array-to-tree

> Convert a plain array of nodes (with pointers to parent nodes) to a tree.

Solves a problem with conversion of retrieved from a database sets of data to a nested structure (i.e. navigation tree).

## Install

```
$ npm install --save array-to-tree
```

## Basic Usage

```js
var arrayToTree = require('array-to-tree');

var navigation = [{
  id: 1,
  name: "Portfolio",
  parent_id: null
}, {
  id: 2,
  name: "Web Development",
  parent_id: 1
}, {
  id: 3,
  name: "Recent Works",
  parent_id: 2
}, {
  id: 4,
  name: "About Me",
  parent_id: null
}];

var navigationTree = arrayToTree({ data: navigation });

/*
 * Output:
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */

```

## License

MIT
[Philipp Alferov](https://github.com/alferov)
