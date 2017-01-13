'use strict';
var chai = require('chai');
var expect = chai.expect;
var toTree = require('../index.js');
var initial = require('./fixtures/initial.fixture.js');
var expected = require('./fixtures/expected.fixture.js');
var customExpected = require('./fixtures/expected-custom.fixture.js');
var customInitial = require('./fixtures/initial-custom.fixture.js');
var nestedInitial = require('./fixtures/initial-nested.fixture.js');
var nestedExpected = require('./fixtures/expected-nested.fixture.js');

var current;

describe('array-to-tree', function() {
  describe('with valid arguments', function() {

    beforeEach(function() {
      current = toTree(initial);
    });

    it('should not modify passed object', function() {
      expect(initial).to.be.deep.equal(initial);
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
      expect(current).to.be.deep.equal(expected);
    });
  });

  describe('with invalid arguments', function() {
    it('should return an empty array if the empty array passed', function() {
      expect(toTree([])).to.be.deep.equal([]);
    });

    it('should throw an error if wrong arguments passed', function() {
      expect(toTree.bind(null, 'string'))
        .to.throw(/invalid argument/);

      expect(toTree.bind(null, {}))
        .to.throw(/invalid argument/);
    });

    it('returns the same array if there is no pointer to parent', function() {

      var modified = initial.map(function(item) {
        delete item.parent_id;
        return item;
      });

      expect(toTree(modified))
        .to.be.deep.equal(modified);
    });
  });

  describe('with different options', function() {
    it('should work with custom parents links', function() {

      current = toTree(customInitial, {
        parentProperty: 'parent', customID: '_id'
      });

      expect(current)
        .to.be.deep.equal(customExpected);
    });
    it('should work with nested parent id', function() {
      current = toTree(nestedInitial, {
        parentProperty: 'attributes.parent_id'
      });

      expect(current)
        .to.be.deep.equal(nestedExpected);
    });
  });
});
