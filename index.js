'use strict';
var isArray = require('lodash.isarray');
var assign = require('lodash.assign');

var createTree = function(array, rootNodes, customID) {
  var tree = [];

  for (var rootNode in rootNodes) {
    var node = rootNodes[rootNode];
    var childNode = array[node[customID]];

    if (!node && !rootNodes.hasOwnProperty(rootNode)) {
      continue ;
    }

    if (childNode) {
      node.children = createTree(array, childNode, customID);
    }

    tree.push(node);
  }

  return tree;
};

var groupByParents = function(array, options) {
  var parents = {};

  array.forEach(function(item) {
    var parentID = item[options.parentProperty] || options.rootID;

    if (parentID && parents.hasOwnProperty(parentID)) {
      parents[parentID].push(item);
      return ;
    }

    parents[parentID] = [item];
  });

  return parents;
};

/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a nested
 * data structure
 *
 * @name arrayToTree
 * @function
 *
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 *     a parent node could be found. Default: 'parent_id'
 *  - `customID` (String): An unique node identifier. Default: 'id'
 *
 * @return {Array} Result of transformation
 */

module.exports = function arrayToTree(data, options) {
  data = data || [];
  options = assign({
    parentProperty: 'parent_id',
    customID: 'id',
    rootID: '0'
  }, options);

  if (!isArray(data)) {
    throw new TypeError('Expected an object but got an invalid argument');
  }

  var cloned = data.slice();
  var grouped = groupByParents(cloned, options);
  return createTree(grouped, grouped[options.rootID], options.customID);
};
