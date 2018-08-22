'use strict';
var chai = require('chai');
var expect = chai.expect;
var toTree = require('../index.js');

var initial = [
  {
    id: 1,
    parent_id: null,
    children: [{ id: 5 }]
  },
  {
    id: 2,
    parent_id: 1
  },
  {
    id: 3,
    parent_id: 2
  },
  {
    id: 4,
    parent_id: null
  }
];

var current;

describe('array-to-tree', function() {
  describe('with default arguments', function() {
    beforeEach(function() {
      current = toTree(initial);
    });

    it('should not modify given array', function() {
      expect(initial[0]).to.be.deep.equal({
        id: 1,
        parent_id: null,
        children: [{ id: 5 }]
      });
    });

    it('should return an array', function() {
      expect(current).to.be.an('array');
    });

    it('should keep parent_id property', function() {
      var first = current[0];
      expect(first).to.have.property('parent_id');
    });

    it('should create nested objects with children', function() {
      var first = current[0];
      expect(first)
        .to.have.property('children')
        .that.is.an('array')
        .to.have.length.of.at.least(1);
    });

    it('should return an expected value', function() {
      expect(current).to.be.deep.equal([
        {
          id: 1,
          parent_id: null,
          children: [
            {
              id: 2,
              parent_id: 1,
              children: [
                {
                  id: 3,
                  parent_id: 2
                }
              ]
            }
          ]
        },
        {
          id: 4,
          parent_id: null
        }
      ]);
    });
  });

  describe('with invalid arguments', function() {
    it('should return an empty array if the empty array passed', function() {
      expect(toTree([])).to.be.deep.equal([]);
    });

    it('should throw an error if wrong arguments passed', function() {
      expect(toTree.bind(null, 'string')).to.throw(/invalid argument/);
      expect(toTree.bind(null, {})).to.throw(/invalid argument/);
    });

    it('returns the same array if there is no pointer to parent', function() {
      var modified = initial.map(function(item) {
        delete item.parent_id;
        return item;
      });
      expect(toTree(modified)).to.be.deep.equal(modified);
    });
  });

  describe('with custom arguments', function() {
    it('should work with custom parents links', function() {
      expect(
        toTree(
          [
            {
              _id: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c',
              parent: null
            },
            {
              _id: 'ec666030-7f8f-11e3-ae96-0123456789ab',
              parent: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c'
            },
            {
              _id: 'ec66fc70-7f8f-11e3-ae96-000000000000',
              parent: 'ec666030-7f8f-11e3-ae96-0123456789ab'
            },
            {
              _id: '32a4fbed-676d-47f9-a321-cb2f267e2918',
              parent: null
            }
          ],
          {
            parentProperty: 'parent',
            customID: '_id',
            childrenProperty: '_children'
          }
        )
      ).to.be.deep.equal([
        {
          _id: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c',
          parent: null,
          _children: [
            {
              _id: 'ec666030-7f8f-11e3-ae96-0123456789ab',
              parent: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c',
              _children: [
                {
                  _id: 'ec66fc70-7f8f-11e3-ae96-000000000000',
                  parent: 'ec666030-7f8f-11e3-ae96-0123456789ab'
                }
              ]
            }
          ]
        },
        {
          _id: '32a4fbed-676d-47f9-a321-cb2f267e2918',
          parent: null
        }
      ]);
    });

    it('should work with nested parent id', function() {
      expect(
        toTree(
          [
            {
              id: 1,
              attributes: {
                name: 'Parent',
                parent_id: null
              }
            },
            {
              id: 2,
              attributes: {
                name: 'Child One',
                parent_id: 1
              }
            },
            {
              id: 3,
              attributes: {
                name: 'Child Two',
                parent_id: 1
              }
            }
          ],
          {
            parentProperty: 'attributes.parent_id'
          }
        )
      ).to.be.deep.equal([
        {
          id: 1,
          attributes: {
            name: 'Parent',
            parent_id: null
          },
          children: [
            {
              id: 2,
              attributes: {
                name: 'Child One',
                parent_id: 1
              }
            },
            {
              id: 3,
              attributes: {
                name: 'Child Two',
                parent_id: 1
              }
            }
          ]
        }
      ]);
    });

    it('should work with orphan nodes', function() {
      expect(
        toTree([
          {
            id: 1,
            parent_id: null
          },
          {
            id: 2,
            parent_id: 1
          },
          {
            id: 3,
            parent_id: 2
          },
          {
            id: 4,
            parent_id: 5
          }
        ])
      ).to.be.deep.equal([
        {
          id: 1,
          parent_id: null,
          children: [
            {
              id: 2,
              parent_id: 1,
              children: [
                {
                  id: 3,
                  parent_id: 2
                }
              ]
            }
          ]
        },
        {
          id: 4,
          parent_id: 5
        }
      ]);
    });
  });
});
