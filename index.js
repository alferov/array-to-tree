'use strict';
var util = require('util');

var exists = function(obj, key) {
  return obj != null && Object.hasOwnProperty.call(obj, key);
};

var createTree = function(array, rootNodes, customID) {
  var tree = [];

  for (var key in rootNodes) {
    if (!exists(rootNodes, key)) {
      continue ;
    }
    var parentNode = rootNodes[key];
    var childNode = array[parentNode[customID]];

    if (childNode) {
      parentNode.children = createTree(array, childNode, customID);
    }

    tree.push(parentNode);
  }

  return tree;
};

var groupByParents = function(array, options) {
  var parents = {};
  var parentProperty = options.parentProperty;

  array.forEach(function(item) {
    var parentID = item[parentProperty] || options.rootID;
    if (exists(parents, parentID)) {
      parents[parentID].push(item);
    } else {
      parents[parentID] = [item];
    }
  });

  return parents;
};

/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a tree
 *
 * @name arrayToTree
 * @function
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 *     a parent node could be found. Default: 'parent_id'
 *  - `data` (Array): An array of data
 *  - `customID` (String): An unique node identifier. Default: 'id'
 *
 * @return {Array} Result of transformation
 */

module.exports = function arrayToTree(options) {
  options = util._extend({
    parentProperty: 'parent_id',
    data: [],
    customID: 'id',
    rootID: '0'
  }, options);

  var data = options.data;

  if (!util.isArray(data)) {
    throw new Error('Expected an object but got an invalid argument');
  }

  var cloned = data.slice();
  var grouped = groupByParents(cloned, options);
  return createTree(grouped, grouped[options.rootID], options.customID);
};
