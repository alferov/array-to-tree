'use strict';
var chai = require('chai');
var expect = chai.expect;
var toTree = require('../index.js');
var expected = require('./fixtures/expected.fixture.js');
var initial = require('./fixtures/initial.fixture.js');
var current;

describe('parent pointer array to tree', function() {
  describe('expected behavior', function() {

    before(function() {
      current = toTree({ data: initial });
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

  describe('with incorrect arguments', function() {
    it('should return an empty array if the empty array passed', function() {
      expect(toTree({ data: [] })).to.be.deep.equal([]);
    });

    it('should throw an error if wrong arguments passed', function() {
      expect(toTree.bind(null, { data: 'string' })).to.throw(/invalid argument/);
      expect(toTree.bind(null, { data: {} })).to.throw(/invalid argument/);
    });

  })
});
