var colors = require('colors')
  , _ = require('lodash');

module.exports = function(series, options) {

    if (!Array.isArray(series)) {
        throw new Error('series must be an array of numbers or an array of equal length arrays of numbers');
    }

    if (_.flatten(series).length === 0) {
        throw new Error('Series must be of length > 0');
    }

    if (!Array.isArray(series[0])) {
        series = [series];
    }

    var lengths = _.map(series, _.size);
    if (_.uniq(lengths).length !== 1) {
        throw new Error('Series must all be equal length: ' + lengths.join(','));
    }

    if (!_.every(_.map(series, function(s) {
        var types = _.map(s, function(i) { return typeof i; });
        var utypes = _.uniq(types);
        return utypes.length === 1 && utypes[0] === 'number';
    }))) {
        throw new Error('All series must have only numbers');
    }

    options = options ? options : {};
    if (options.color && !Array.isArray(options.color)) {
        options.color = ['red', 'blue', 'green', 'yellow', 'cyan']; 
    }

    options.icon = options.icon? options.icon : 'xo+*^@';
    options.height = options.height ? options.height : 24;

    var m = createMatrix(series, options);
    return drawMatrix(m, series, options);
};

function createMatrix(series, options) {
    var m = {};
    var max = _.max(_.map(series, _.max));

    for (var s = 0; s < series.length; s++) {
        var serum = series[s];
        var marker = {};
        marker.icon = options.icon[s % options.icon.length];
        marker.color = options.color ? options.color[s % options.color.length] : undefined;
        for (var i=0; i < serum.length; i++) {
            for (var j=0; j < serum[i]*options.height / max; j++) {
                var x = i*series.length + s;
                m[coordinate_hash(x,j)] = marker;
            }
        }
    }
    return m;
}

function drawMatrix(m, series, options) {
    var width = _.flatten(series).length;
    var nSeries = series.length;
    var spacer = '';
    if (width < options.width && series[0].length > 1) {
        var spaceWidth = Math.round((options.width - width) / (series[0].length - 1));
        spacer = Array(spaceWidth + 1).join(' ');
    }

    var rez = options.title ? options.title + '\n' : '';
    for (var j=0; j<options.height; j++) {
        for (var i=0; i<width; i++) {
            var element = m[coordinate_hash(i,options.height - j - 1)];
            rez += element ? colorElement(element) : ' ';
            if ((i % nSeries) === (nSeries - 1) && i < (width -1)) {
                rez += spacer;
            }
        }
        if (j < (options.height - 1)) {
            rez += '\n';
        }
    }
    return rez;
}

function coordinate_hash(i,j) { 
    return i + ',' + j; 
}

function colorElement(e) {
    return e.color ? colors[e.color](e.icon) : e.icon;
}
