'use strict';
var util = require('util');

function createTree(list, rootNodes, customID) {
  var tree = [];

  for (var prop in rootNodes) {
    if (!rootNodes.hasOwnProperty(prop)) {
      continue;
    }

    var node = rootNodes[prop];
    var listItem = list[node[customID]];

    if (listItem) {
      node.children = createTree(list, listItem, customID);
    }

    tree.push(node);
  }

  return tree;
}

function orderByParents(list, config) {
  var parents = {};
  var parentProperty = config.parentProperty;

  list.forEach(function(item) {
    var parentID = item[parentProperty] || 0;
    parents[parentID] = parents[parentID] || [];
    parents[parentID].push(item);
  });

  return parents;
}

module.exports = function(options) {
  var config = util._extend({
      parentProperty: 'parent_id',
      data: [],
      customID: 'id'
    }, options);

  var data = config.data;

  if (!util.isArray(data)) {
    throw new Error('Expected an object but got an invalid argument');
  }

  var cloned = data.slice();
  var ordered = orderByParents(cloned, config);
  return createTree(ordered, ordered[0], config.customID);
};
