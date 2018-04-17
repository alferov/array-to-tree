'use strict';
var isArray = require('lodash.isarray');
var assign = require('lodash.assign');
var property = require('nested-property');
var keyBy = require('lodash.keyby');

var createTree = function(array, rootNodes, customID, childrenID) {
  var tree = [];

  for (var rootNode in rootNodes) {
    var node = rootNodes[rootNode];
    var childNode = array[node[customID]];

    if (!node && !rootNodes.hasOwnProperty(rootNode)) {
      continue ;
    }

    if (childNode) {
      node[childrenID] = createTree(array, childNode, customID, childrenID);
    }

    tree.push(node);
  }

  return tree;
};

var groupByParents = function(array, options) {
  var arrayByID = keyBy(array, options.customID);

  return array.reduce(function(prev, item) {
    var parentID = property.get(item, options.parentProperty);
    if (!parentID || !arrayByID.hasOwnProperty(parentID)) {
      parentID = options.rootID;
    }

    if (parentID && prev.hasOwnProperty(parentID)) {
      prev[parentID].push(item);
      return prev;
    }

    prev[parentID] = [item];
    return prev;
  }, {});
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
 *  - `customChildren` (String): A children identifier. Default: 'children'
 *
 * @return {Array} Result of transformation
 */

module.exports = function arrayToTree(data, options) {
  options = assign({
    parentProperty: 'parent_id',
    customID: 'id',
    rootID: '0',
    childrenID: 'children'
  }, options);

  if (!isArray(data)) {
    throw new TypeError('Expected an object but got an invalid argument');
  }

  var grouped = groupByParents(data, options);
  return createTree(grouped, grouped[options.rootID], options.customID, options.childrenID);
};
