import {
  require_react
} from "./chunk-O6O4HUXW.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/react-top-loading-bar/dist/index.modern.js
var import_react = __toESM(require_react());
function i() {
  return (i = Object.assign || function(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2)
        Object.prototype.hasOwnProperty.call(o2, n2) && (t2[n2] = o2[n2]);
    }
    return t2;
  }).apply(this, arguments);
}
var c = function() {
};
function l(t2, e2) {
  return Math.random() * (e2 - t2 + 1) + t2;
}
function s(t2, e2) {
  return Math.floor(l(t2, e2));
}
var u = (0, import_react.forwardRef)(function(o2, u2) {
  var d = o2.progress, f = o2.height, v = void 0 === f ? 2 : f, h = o2.className, p = void 0 === h ? "" : h, m = o2.color, b = void 0 === m ? "red" : m, g = o2.background, y = void 0 === g ? "transparent" : g, w = o2.onLoaderFinished, x = o2.transitionTime, S = void 0 === x ? 300 : x, k = o2.loaderSpeed, M = void 0 === k ? 500 : k, N = o2.waitingTime, R = void 0 === N ? 1e3 : N, T = o2.shadow, Y = void 0 === T || T, I = o2.containerStyle, O = void 0 === I ? {} : I, j = o2.style, P = void 0 === j ? {} : j, z = o2.shadowStyle, C = void 0 === z ? {} : z, F = o2.containerClassName, L = void 0 === F ? "" : F, q = (0, import_react.useRef)(false), A = (0, import_react.useState)(0), B = A[0], D = A[1], E = (0, import_react.useRef)({ active: false, refreshRate: 1e3 }), G = (0, import_react.useState)(false), H = G[0], J = G[1], K = (0, import_react.useState)({ active: false, value: 20 }), Q = K[0], U = K[1], V = { position: "fixed", top: 0, left: 0, height: v, background: y, zIndex: 99999999999, width: "100%" }, W = { boxShadow: "0 0 10px " + b + ", 0 0 10px " + b, width: "5%", opacity: 1, position: "absolute", height: "100%", transition: "all " + M + "ms ease", transform: "rotate(3deg) translate(0px, -4px)", left: "-10rem" }, X = (0, import_react.useState)({ height: "100%", background: b, transition: "all " + M + "ms ease", width: "0%" }), Z = X[0], $ = X[1], _ = (0, import_react.useState)(W), tt = _[0], et = _[1];
  (0, import_react.useEffect)(function() {
    return q.current = true, function() {
      q.current = false;
    };
  }, []), (0, import_react.useImperativeHandle)(u2, function() {
    return { continuousStart: function(t2, e2) {
      if (void 0 === e2 && (e2 = 1e3), !Q.active)
        if (H)
          console.warn("react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!");
        else {
          var o3 = t2 || s(10, 20);
          E.current = { active: true, refreshRate: e2 }, D(o3), at(o3);
        }
    }, staticStart: function(t2) {
      if (!E.current.active)
        if (H)
          console.warn("react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!");
        else {
          var e2 = t2 || s(30, 50);
          U({ active: true, value: e2 }), D(e2), at(e2);
        }
    }, complete: function() {
      H ? console.warn("react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar!") : (D(100), at(100));
    } };
  }), (0, import_react.useEffect)(function() {
    $(i({}, Z, { background: b })), et(i({}, tt, { boxShadow: "0 0 10px " + b + ", 0 0 5px " + b }));
  }, [b]), (0, import_react.useEffect)(function() {
    if (u2) {
      if (u2 && void 0 !== d)
        return void console.warn(`react-top-loading-bar: You can't use both controlling by props and ref methods to control the bar! Please use only props or only ref methods! Ref methods will override props if "ref" property is available.`);
      at(B), J(false);
    } else
      d && at(d), J(true);
  }, [d]);
  var ot, nt, rt, at = function t2(e2) {
    e2 >= 100 ? ($(i({}, Z, { width: "100%" })), Y && et(i({}, tt, { left: e2 - 10 + "%" })), setTimeout(function() {
      q.current && ($(i({}, Z, { opacity: 0, width: "100%", transition: "all " + S + "ms ease-out", color: b })), setTimeout(function() {
        q.current && (E.current.active && (E.current = i({}, E.current, { active: false }), D(0), t2(0)), Q.active && (U(i({}, Q, { active: false })), D(0), t2(0)), w && w(), D(0), t2(0));
      }, S));
    }, R)) : ($(function(t3) {
      return i({}, t3, { width: e2 + "%", opacity: 1, transition: e2 > 0 ? "all " + M + "ms ease" : "" });
    }), Y && et(i({}, tt, { left: e2 - 5.5 + "%", transition: e2 > 0 ? "all " + M + "ms ease" : "" })));
  };
  return ot = function() {
    var t2 = l(Math.min(10, (100 - B) / 5), Math.min(20, (100 - B) / 3));
    B + t2 < 95 && (D(B + t2), at(B + t2));
  }, nt = E.current.active ? E.current.refreshRate : null, rt = (0, import_react.useRef)(c), (0, import_react.useEffect)(function() {
    rt.current = ot;
  }), (0, import_react.useEffect)(function() {
  }, [void 0]), (0, import_react.useEffect)(function() {
    if (null !== nt && false !== nt) {
      var t2 = setInterval(function() {
        return rt.current();
      }, nt);
      return function() {
        return clearInterval(t2);
      };
    }
  }, [nt]), (0, import_react.createElement)("div", { className: L, style: i({}, V, O) }, (0, import_react.createElement)("div", { className: p, style: i({}, Z, P) }, Y ? (0, import_react.createElement)("div", { style: i({}, tt, C) }) : null));
});
var index_modern_default = u;
export {
  index_modern_default as default
};
//# sourceMappingURL=react-top-loading-bar.js.map
