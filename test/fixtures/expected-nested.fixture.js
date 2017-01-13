module.exports = [{
  id: 1,
  attributes: {
    name: 'Parent',
    parent_id: null
  },
  children: [{
    id: 2,
    attributes: {
      name: 'Child One',
      parent_id: 1
    }
  }, {
    id: 3,
    attributes: {
      name: 'Child Two',
      parent_id: 1
    }
  }]
}];
