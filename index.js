'use strict';
var util = require('util');

function createTree(list, rootNodes) {
  var tree = [];

  for (var prop in rootNodes) {
    if (!rootNodes.hasOwnProperty(prop)) {
      continue;
    }

    var node = rootNodes[prop];

    if (list[node.id]) {
      node.children = createTree(list, list[node.id]);
    }

    tree.push(node);
  }

  return tree;
}

function orderByParents(list) {
  var parents = {};

  list.forEach(function(item) {
    var parentID = item.parent_id || 0;
    parents[parentID] = parents[parentID] || [];
    parents[parentID].push(item);
  });

  return parents;
}

module.exports = function(options) {
  var config = util._extend({ parentProperty: 'parent_id', data: [] }, options);
  var data = config.data;

  if (!util.isArray(data)) {
    throw new Error('Expected an object but got an invalid argument');
  }

  var cloned = data.slice();
  var ordered = orderByParents(cloned);
  return createTree(ordered, ordered[0]);
};
