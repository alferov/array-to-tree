'use strict';

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

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = function(obj) {
  var cloned = clone(obj);
  var ordered = orderByParents(cloned);
  return createTree(ordered, ordered[0]);
};
