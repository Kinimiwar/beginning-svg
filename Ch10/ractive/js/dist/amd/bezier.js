(function() {
  define(['./path', './ops'], function(Path, O) {
    var reflect;
    reflect = function(p, q) {
      return O.minus(O.times(2, p), q);
    };
    return function(_arg) {
      var c0, c1, control_points, diffs, i, l, p0, p1, path, points, tension, _i, _j, _k, _ref, _ref1, _ref2, _ref3, _results;
      points = _arg.points, tension = _arg.tension;
      if (tension == null) {
        tension = 0.3;
      }
      diffs = [];
      l = points.length;
      for (i = _i = 1, _ref = l - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
        diffs.push(O.times(tension, O.minus(points[i], points[i - 1])));
      }
      control_points = [O.plus(points[0], reflect(diffs[0], diffs[1]))];
      for (i = _j = 1, _ref1 = l - 2; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
        control_points.push(O.minus(points[i], O.average([diffs[i], diffs[i - 1]])));
      }
      control_points.push(O.minus(points[l - 1], reflect(diffs[l - 2], diffs[l - 3])));
      c0 = control_points[0];
      c1 = control_points[1];
      p0 = points[0];
      p1 = points[1];
      path = (_ref2 = Path()).moveto.apply(_ref2, p0).curveto(c0[0], c0[1], c1[0], c1[1], p1[0], p1[1]);
      return {
        path: (function() {
          _results = [];
          for (var _k = 2, _ref3 = l - 1; 2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; 2 <= _ref3 ? _k++ : _k--){ _results.push(_k); }
          return _results;
        }).apply(this).reduce((function(pt, i) {
          var c, p;
          c = control_points[i];
          p = points[i];
          return pt.smoothcurveto(c[0], c[1], p[0], p[1]);
        }), path),
        centroid: O.average(points)
      };
    };
  });

}).call(this);
