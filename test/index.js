var assert = require('assert')
  , bar = require('../lib-cov/index')
  , colors = require('colors');

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
        assert.equal(bar([1],{height:1}),            'x',     'single x');
        assert.equal(bar([1],{height:1, icon: 'o'}), 'o',     'single o');
        assert.equal(bar([1],{height:2}),            'x\nx',  'single x, height 2');
        assert.equal(bar([1,1],{height:1}),          'xx',    'double x, height 1');
        assert.equal(bar([1,1],{height:1,width:4}),  'x  x',  'double x, width: 4');
        assert.equal(bar([1],{height:1,color:true}), 'x'.red, 'single red x');
    });
});

describe('Multiple series ', function() {
    it('should produce the right graphs', function() {
        assert.equal(bar([[1],[1]],{height:1}),       'xo',         'single x, single o');
        assert.equal(bar([[1,2],[1,1]], {height: 2}), '  x \nxoxo', 'double x, double o');
        var actual = bar([[1],[1],[1],[1],[1]], {height:1, color:true, icon:'12345'});
        var expected = '1'.red + '2'.blue + '3'.green + '4'.yellow + '5'.cyan;
        assert.equal(actual, expected, 'rainbow 12345');
    });
});
