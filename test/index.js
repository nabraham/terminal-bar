var assert = require('assert')
  , bar = require('../index');

describe('failure conditions', function() {

    it('should fail on non arrays', function() {
        assert.throws(function() { bar(undefined) }, /be an array/);
        assert.throws(function() { bar('hello there') }, /be an array/);
    });

    it('should fail on zero length arrays', function() {
        assert.throws(function() { bar([]) }, /length > 0/);
        assert.throws(function() { bar([[],[]]) }, /length > 0/);
    });

    it('should fail on arrays of different lengths', function() {
        assert.throws(function() { bar([[1],[1,2,3]]) }, /equal length/);
    });

    it('should fail on non-numeric values', function() {
        assert.throws(function() { bar([[1,2,3],[1,2,'three']]) }, /only numbers/);
    });
});

describe('Single series ', function() {
    it('should produce the right graphs', function() {
        assert.equal('x', bar([1], {height: 1}), 'single x');
        assert.equal('o', bar([1], {height: 1, icon: 'o'}), 'single o');
        assert.equal('x\nx', bar([1], {height: 2}), 'single x, height 2');
        assert.equal('xx', bar([1, 1], {height: 1}), 'double x, height 1');
        assert.equal('x  x', bar([1, 1], {height: 1, width: 4}), 'double x, width: 4');
    });
});

describe('Multiple series ', function() {
    it('should produce the right graphs', function() {
        assert.equal('xo', bar([[1],[1]], {height: 1}), 'single x, single o');
        assert.equal('  x \nxoxo', bar([[1,2],[1,1]], {height: 2}), 'double x, double o');
    });
});
