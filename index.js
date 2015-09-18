function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = function(obj) {
  var cloned = clone(obj);

  return cloned;
};
