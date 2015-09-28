# array-to-tree [![Build Status](https://travis-ci.org/alferov/array-to-tree.svg?branch=master)](https://travis-ci.org/alferov/array-to-tree)

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

/*
 * Output:
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */

var navigationTree = arrayToTree({ data: navigation });
```

## Documentation

### `arrayToTree(options)`
Convert a plain array of nodes (with pointers to parent nodes) to a tree.

#### Params
**Object** `options`: An object containing the following fields:
- `parentProperty` (String): A name of a property where a link to a parent node could be found. Default: 'parent_id'
- `data` (Array): An array of` data
- `customID` (String): An unique node identifier. Default: 'id'

#### Return
- **Array**: Result of transformation

## License

MIT © [Philipp Alferov](https://github.com/alferov)
