# array-to-tree

[![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

![array-to-tree](media/array-to-tree.png)

> Convert a plain array of nodes (with pointers to parent nodes) to a nested data structure.

Solves a problem with conversion of retrieved from a database sets of data to a nested data structure (i.e. navigation tree).

## Installation

```bash
$ npm install array-to-tree --save
```

## Usage

```js
var arrayToTree = require('array-to-tree');

var dataOne = [
  {
    id: 1,
    name: 'Portfolio',
    parent_id: undefined
  },
  {
    id: 2,
    name: 'Web Development',
    parent_id: 1
  },
  {
    id: 3,
    name: 'Recent Works',
    parent_id: 2
  },
  {
    id: 4,
    name: 'About Me',
    parent_id: undefined
  }
];

arrayToTree(dataOne);

/*
 * Output:
 *
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */

var dataTwo = [
  {
    _id: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c',
    name: 'Portfolio',
    parent: null
  },
  {
    _id: 'ec666030-7f8f-11e3-ae96-0123456789ab',
    name: 'Web Development',
    parent: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c'
  },
  {
    _id: 'ec66fc70-7f8f-11e3-ae96-000000000000',
    name: 'Recent Works',
    parent: 'ec666030-7f8f-11e3-ae96-0123456789ab'
  },
  {
    _id: '32a4fbed-676d-47f9-a321-cb2f267e2918',
    name: 'About Me',
    parent: null
  }
];

arrayToTree(dataTwo, {
  parentProperty: 'parent',
  customID: '_id'
});

/*
 * Output:
 *
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */
```

## API

### `arrayToTree(data, [options])`

Convert a plain array of nodes (with pointers to parent nodes) to a a nested data structure.

#### Parameters

- **Array** `data`: An array of data
- **Object** `options`: An object containing the following fields:
  - `parentProperty` (String): A name of a property where a link to a parent node could be found. Default: 'parent_id'.
  - `childrenProperty` (String): A name of a property where children nodes are going to be stored. Default: 'children'.
  - `customID` (String): An unique node identifier. Default: 'id'.

#### Return

- **Array**: Result of transformation

## License

MIT © [Philipp Alferov](https://github.com/alferov)

[travis-url]: https://travis-ci.org/alferov/array-to-tree
[travis-image]: https://img.shields.io/travis/alferov/array-to-tree.svg?style=flat-square
[depstat-url]: https://david-dm.org/alferov/array-to-tree
[depstat-image]: https://david-dm.org/alferov/array-to-tree.svg?style=flat-square
