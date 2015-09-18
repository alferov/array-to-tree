'use strict';
var chai = require('chai');
var expect = chai.expect;
var toTree = require('../index.js');
var expected = require('./fixtures/expected.fixture.js');
var initial = require('./fixtures/initial.fixture.js');
var current;

describe('parent pointer array to tree', function() {
  describe('expected behavior', function() {

    beforeEach(function() {
      current = toTree(initial);
    });

    it('should not modify passed object', function() {
      expect(current).not.to.be.equal(initial);
    });

  })
});
