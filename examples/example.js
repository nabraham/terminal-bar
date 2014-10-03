var bar = require('../index');

var s1 = [];
var s2 = [];
var s3 = [];
var pi = 3.1415962535;
var N = 50;
for (var i=0; i<50; i++) {
    s1.push(0.5 + 0.5*Math.cos(i/(N-1) * 6*pi));
    s2.push(0.5 + 0.5*Math.sin(i/(N-1) * 6*pi));
    s3.push(0.5 + 0.5*Math.sin(i/(N-1) * 3*pi));
}

var series = [s1, s2, s3];
console.log(bar(series, {title: 'Trig Waves', color: true}));

series = [[1,2,3],[1,1,1]];
console.log(bar(series, {height: 9, width: 30, icon: '##'}));

var failures = [
    (function () { bar(123, {}) }),
    (function () { bar([], {}) }),
    (function () { bar([[1,2,3],[1]], {}) }),
    (function () { bar([[1,2,3],[1,2,'three']], {}) })
]

failures.forEach(function(f) {
    try {
        f();
    } catch (e) {
        console.log(e);
    }
});
