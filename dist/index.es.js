import wr from "@hyperware-ai/client-api";
import { create as _r } from "zustand";
import ze, { useState as re, useRef as Ee, useEffect as ue, useCallback as He } from "react";
const xn = !1, Sn = "gliderlabs.os", jt = {
  "/fart": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/wet.mp3",
  "/no": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/hell-naw-dog.mp3",
  "/yes": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/oh-yes.mp3",
  "/why": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/why.mp3",
  "/people": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/the-people.mp3",
  "/robust": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/robust-josh.mp3",
  "/robustness": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_sounds/robust-basile.mp3"
}, Cr = (e) => {
  if (!(sessionStorage.getItem("mute") === "true")) {
    const r = "/tts ";
    if (e.startsWith(r)) {
      const i = e.slice(r.length), a = new SpeechSynthesisUtterance(i);
      window.speechSynthesis.speak(a);
    }
  }
}, Er = (e) => {
  if (e in jt) {
    const t = jt[e];
    new Audio(t).play();
  }
}, Ot = {
  "/die": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/die.webp",
  "/kino": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/kino.webp",
  "/panda": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/panda.jpeg",
  "/dev": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/dev.jpeg",
  "/tiger": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/tiger.jpeg",
  "/wow": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/wow.jpeg",
  "/cry": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/cry.jpeg",
  "/ok": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/ok.jpeg",
  "/oops": "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/chat_images/oops.jpeg"
}, jr = (e) => e in Ot ? Ot[e] : e, Or = /^https?:\/\/\S+$/i, Rr = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp)$/i;
function Tr(e) {
  return Rr.test(e);
}
function Pr(e) {
  const t = new Date(e * 1e3), r = /* @__PURE__ */ new Date(), i = new Date(r.getTime() - 7 * 24 * 60 * 60 * 1e3), a = new Date(r.getTime() - 24 * 60 * 60 * 1e3);
  if (t < i)
    return t.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0
    }).replace(",", "");
  {
    const o = t.toDateString() === r.toDateString(), p = t.toDateString() === a.toDateString(), v = o ? "Today" : p ? "Yesterday" : t.toLocaleDateString("en-US", { weekday: "short" }), l = t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: !0 });
    return `${v} ${l}`;
  }
}
const je = _r((e, t) => ({
  serviceId: null,
  setServiceId: (r) => e({ serviceId: r }),
  //
  serviceMetadata: null,
  setServiceMetadata: (r) => e({ serviceMetadata: r }),
  serviceConnectionStatus: null,
  setServiceConnectionStatus: (r) => e({ serviceConnectionStatus: r }),
  //
  localServices: [],
  setLocalServices: (r) => e({ localServices: r }),
  //
  api: null,
  setApi: (r) => {
    e({ api: r });
  },
  //
  createService: (r) => {
    const { api: i } = t();
    i && i.createService(r);
  },
  deleteService: (r) => {
    const { api: i } = t();
    i && i.deleteService(r);
  },
  requestMyServices: () => {
    const { api: r } = t();
    r && r.requestMyServices();
  },
  requestPeer: (r) => {
    const { api: i } = t();
    i && i.requestPeer(r);
  },
  chatState: { messages: /* @__PURE__ */ new Map(), lastUpdateType: "history" },
  setChatState: (r) => {
    e({ chatState: r });
  },
  addChatMessage: (r) => {
    const { chatState: i, chatSoundsEnabled: a } = t(), o = new Map(i.messages);
    o.set(r.id, r), a && (Er(r.msg), Cr(r.msg)), e({ chatState: { messages: o, lastUpdateType: "message" } });
  },
  setChatHistory: (r) => {
    const i = new Map(r.map((a) => [a.id, a]));
    e({ chatState: { messages: i, lastUpdateType: "history" } });
  },
  // 
  sendChat: (r) => {
    const { api: i, serviceId: a } = t();
    i && a && i.sendToService({ Chat: { SendMessage: r } });
  },
  chatSoundsEnabled: !1,
  setChatSoundsEnabled: (r) => {
    e({ chatSoundsEnabled: r });
  },
  //
  peerMap: /* @__PURE__ */ new Map(),
  setPeerMap: (r) => {
    e({ peerMap: new Map(r) });
  },
  newPeer: (r) => {
    const { api: i } = t();
    i && i.requestPeer(r);
  },
  isClientConnected: !1,
  setIsClientConnected: (r) => e({ isClientConnected: r }),
  //
  editService: (r, i) => {
    const { api: a } = t();
    a && a.editService(r, i);
  },
  fullServiceMetadata: null,
  setFullServiceMetadata: (r) => e({ fullServiceMetadata: r }),
  get: t,
  set: e
}));
function Mr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var st = { exports: {} }, Ae = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rt;
function Dr() {
  if (Rt) return Ae;
  Rt = 1;
  var e = ze, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function p(v, l, S) {
    var m, y = {}, C = null, O = null;
    S !== void 0 && (C = "" + S), l.key !== void 0 && (C = "" + l.key), l.ref !== void 0 && (O = l.ref);
    for (m in l) i.call(l, m) && !o.hasOwnProperty(m) && (y[m] = l[m]);
    if (v && v.defaultProps) for (m in l = v.defaultProps, l) y[m] === void 0 && (y[m] = l[m]);
    return { $$typeof: t, type: v, key: C, ref: O, props: y, _owner: a.current };
  }
  return Ae.Fragment = r, Ae.jsx = p, Ae.jsxs = p, Ae;
}
var ke = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tt;
function Ar() {
  return Tt || (Tt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = ze, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), p = Symbol.for("react.provider"), v = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), I = Symbol.iterator, j = "@@iterator";
    function Y(n) {
      if (n === null || typeof n != "object")
        return null;
      var h = I && n[I] || n[j];
      return typeof h == "function" ? h : null;
    }
    var L = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function D(n) {
      {
        for (var h = arguments.length, _ = new Array(h > 1 ? h - 1 : 0), M = 1; M < h; M++)
          _[M - 1] = arguments[M];
        P("error", n, _);
      }
    }
    function P(n, h, _) {
      {
        var M = L.ReactDebugCurrentFrame, G = M.getStackAddendum();
        G !== "" && (h += "%s", _ = _.concat([G]));
        var Q = _.map(function(U) {
          return String(U);
        });
        Q.unshift("Warning: " + h), Function.prototype.apply.call(console[n], console, Q);
      }
    }
    var F = !1, b = !1, T = !1, ee = !1, X = !1, le;
    le = Symbol.for("react.module.reference");
    function ve(n) {
      return !!(typeof n == "string" || typeof n == "function" || n === i || n === o || X || n === a || n === S || n === m || ee || n === O || F || b || T || typeof n == "object" && n !== null && (n.$$typeof === C || n.$$typeof === y || n.$$typeof === p || n.$$typeof === v || n.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      n.$$typeof === le || n.getModuleId !== void 0));
    }
    function ae(n, h, _) {
      var M = n.displayName;
      if (M)
        return M;
      var G = h.displayName || h.name || "";
      return G !== "" ? _ + "(" + G + ")" : _;
    }
    function ge(n) {
      return n.displayName || "Context";
    }
    function te(n) {
      if (n == null)
        return null;
      if (typeof n.tag == "number" && D("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
        return n.displayName || n.name || null;
      if (typeof n == "string")
        return n;
      switch (n) {
        case i:
          return "Fragment";
        case r:
          return "Portal";
        case o:
          return "Profiler";
        case a:
          return "StrictMode";
        case S:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case v:
            var h = n;
            return ge(h) + ".Consumer";
          case p:
            var _ = n;
            return ge(_._context) + ".Provider";
          case l:
            return ae(n, n.render, "ForwardRef");
          case y:
            var M = n.displayName || null;
            return M !== null ? M : te(n.type) || "Memo";
          case C: {
            var G = n, Q = G._payload, U = G._init;
            try {
              return te(U(Q));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ne = Object.assign, ie = 0, E, B, N, H, u, x, $;
    function z() {
    }
    z.__reactDisabledLog = !0;
    function R() {
      {
        if (ie === 0) {
          E = console.log, B = console.info, N = console.warn, H = console.error, u = console.group, x = console.groupCollapsed, $ = console.groupEnd;
          var n = {
            configurable: !0,
            enumerable: !0,
            value: z,
            writable: !0
          };
          Object.defineProperties(console, {
            info: n,
            log: n,
            warn: n,
            error: n,
            group: n,
            groupCollapsed: n,
            groupEnd: n
          });
        }
        ie++;
      }
    }
    function W() {
      {
        if (ie--, ie === 0) {
          var n = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ne({}, n, {
              value: E
            }),
            info: ne({}, n, {
              value: B
            }),
            warn: ne({}, n, {
              value: N
            }),
            error: ne({}, n, {
              value: H
            }),
            group: ne({}, n, {
              value: u
            }),
            groupCollapsed: ne({}, n, {
              value: x
            }),
            groupEnd: ne({}, n, {
              value: $
            })
          });
        }
        ie < 0 && D("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var A = L.ReactCurrentDispatcher, k;
    function d(n, h, _) {
      {
        if (k === void 0)
          try {
            throw Error();
          } catch (G) {
            var M = G.stack.trim().match(/\n( *(at )?)/);
            k = M && M[1] || "";
          }
        return `
` + k + n;
      }
    }
    var c = !1, f;
    {
      var w = typeof WeakMap == "function" ? WeakMap : Map;
      f = new w();
    }
    function g(n, h) {
      if (!n || c)
        return "";
      {
        var _ = f.get(n);
        if (_ !== void 0)
          return _;
      }
      var M;
      c = !0;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Q;
      Q = A.current, A.current = null, R();
      try {
        if (h) {
          var U = function() {
            throw Error();
          };
          if (Object.defineProperty(U.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(U, []);
            } catch (he) {
              M = he;
            }
            Reflect.construct(n, [], U);
          } else {
            try {
              U.call();
            } catch (he) {
              M = he;
            }
            n.call(U.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (he) {
            M = he;
          }
          n();
        }
      } catch (he) {
        if (he && M && typeof he.stack == "string") {
          for (var q = he.stack.split(`
`), pe = M.stack.split(`
`), se = q.length - 1, ce = pe.length - 1; se >= 1 && ce >= 0 && q[se] !== pe[ce]; )
            ce--;
          for (; se >= 1 && ce >= 0; se--, ce--)
            if (q[se] !== pe[ce]) {
              if (se !== 1 || ce !== 1)
                do
                  if (se--, ce--, ce < 0 || q[se] !== pe[ce]) {
                    var ye = `
` + q[se].replace(" at new ", " at ");
                    return n.displayName && ye.includes("<anonymous>") && (ye = ye.replace("<anonymous>", n.displayName)), typeof n == "function" && f.set(n, ye), ye;
                  }
                while (se >= 1 && ce >= 0);
              break;
            }
        }
      } finally {
        c = !1, A.current = Q, W(), Error.prepareStackTrace = G;
      }
      var Me = n ? n.displayName || n.name : "", Re = Me ? d(Me) : "";
      return typeof n == "function" && f.set(n, Re), Re;
    }
    function V(n, h, _) {
      return g(n, !1);
    }
    function oe(n) {
      var h = n.prototype;
      return !!(h && h.isReactComponent);
    }
    function de(n, h, _) {
      if (n == null)
        return "";
      if (typeof n == "function")
        return g(n, oe(n));
      if (typeof n == "string")
        return d(n);
      switch (n) {
        case S:
          return d("Suspense");
        case m:
          return d("SuspenseList");
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case l:
            return V(n.render);
          case y:
            return de(n.type, h, _);
          case C: {
            var M = n, G = M._payload, Q = M._init;
            try {
              return de(Q(G), h, _);
            } catch {
            }
          }
        }
      return "";
    }
    var _e = Object.prototype.hasOwnProperty, Oe = {}, pt = L.ReactDebugCurrentFrame;
    function Fe(n) {
      if (n) {
        var h = n._owner, _ = de(n.type, n._source, h ? h.type : null);
        pt.setExtraStackFrame(_);
      } else
        pt.setExtraStackFrame(null);
    }
    function er(n, h, _, M, G) {
      {
        var Q = Function.call.bind(_e);
        for (var U in n)
          if (Q(n, U)) {
            var q = void 0;
            try {
              if (typeof n[U] != "function") {
                var pe = Error((M || "React class") + ": " + _ + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw pe.name = "Invariant Violation", pe;
              }
              q = n[U](h, U, M, _, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (se) {
              q = se;
            }
            q && !(q instanceof Error) && (Fe(G), D("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", M || "React class", _, U, typeof q), Fe(null)), q instanceof Error && !(q.message in Oe) && (Oe[q.message] = !0, Fe(G), D("Failed %s type: %s", _, q.message), Fe(null));
          }
      }
    }
    var tr = Array.isArray;
    function Ve(n) {
      return tr(n);
    }
    function rr(n) {
      {
        var h = typeof Symbol == "function" && Symbol.toStringTag, _ = h && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return _;
      }
    }
    function nr(n) {
      try {
        return ht(n), !1;
      } catch {
        return !0;
      }
    }
    function ht(n) {
      return "" + n;
    }
    function vt(n) {
      if (nr(n))
        return D("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", rr(n)), ht(n);
    }
    var gt = L.ReactCurrentOwner, ir = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, yt, mt;
    function sr(n) {
      if (_e.call(n, "ref")) {
        var h = Object.getOwnPropertyDescriptor(n, "ref").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return n.ref !== void 0;
    }
    function ar(n) {
      if (_e.call(n, "key")) {
        var h = Object.getOwnPropertyDescriptor(n, "key").get;
        if (h && h.isReactWarning)
          return !1;
      }
      return n.key !== void 0;
    }
    function or(n, h) {
      typeof n.ref == "string" && gt.current;
    }
    function cr(n, h) {
      {
        var _ = function() {
          yt || (yt = !0, D("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        _.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: _,
          configurable: !0
        });
      }
    }
    function lr(n, h) {
      {
        var _ = function() {
          mt || (mt = !0, D("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", h));
        };
        _.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: _,
          configurable: !0
        });
      }
    }
    var ur = function(n, h, _, M, G, Q, U) {
      var q = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: n,
        key: h,
        ref: _,
        props: U,
        // Record the component responsible for creating this element.
        _owner: Q
      };
      return q._store = {}, Object.defineProperty(q._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(q, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: M
      }), Object.defineProperty(q, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: G
      }), Object.freeze && (Object.freeze(q.props), Object.freeze(q)), q;
    };
    function fr(n, h, _, M, G) {
      {
        var Q, U = {}, q = null, pe = null;
        _ !== void 0 && (vt(_), q = "" + _), ar(h) && (vt(h.key), q = "" + h.key), sr(h) && (pe = h.ref, or(h, G));
        for (Q in h)
          _e.call(h, Q) && !ir.hasOwnProperty(Q) && (U[Q] = h[Q]);
        if (n && n.defaultProps) {
          var se = n.defaultProps;
          for (Q in se)
            U[Q] === void 0 && (U[Q] = se[Q]);
        }
        if (q || pe) {
          var ce = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          q && cr(U, ce), pe && lr(U, ce);
        }
        return ur(n, q, pe, G, M, gt.current, U);
      }
    }
    var Be = L.ReactCurrentOwner, bt = L.ReactDebugCurrentFrame;
    function Pe(n) {
      if (n) {
        var h = n._owner, _ = de(n.type, n._source, h ? h.type : null);
        bt.setExtraStackFrame(_);
      } else
        bt.setExtraStackFrame(null);
    }
    var Ge;
    Ge = !1;
    function Je(n) {
      return typeof n == "object" && n !== null && n.$$typeof === t;
    }
    function xt() {
      {
        if (Be.current) {
          var n = te(Be.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
    }
    function dr(n) {
      return "";
    }
    var St = {};
    function pr(n) {
      {
        var h = xt();
        if (!h) {
          var _ = typeof n == "string" ? n : n.displayName || n.name;
          _ && (h = `

Check the top-level render call using <` + _ + ">.");
        }
        return h;
      }
    }
    function wt(n, h) {
      {
        if (!n._store || n._store.validated || n.key != null)
          return;
        n._store.validated = !0;
        var _ = pr(h);
        if (St[_])
          return;
        St[_] = !0;
        var M = "";
        n && n._owner && n._owner !== Be.current && (M = " It was passed a child from " + te(n._owner.type) + "."), Pe(n), D('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', _, M), Pe(null);
      }
    }
    function _t(n, h) {
      {
        if (typeof n != "object")
          return;
        if (Ve(n))
          for (var _ = 0; _ < n.length; _++) {
            var M = n[_];
            Je(M) && wt(M, h);
          }
        else if (Je(n))
          n._store && (n._store.validated = !0);
        else if (n) {
          var G = Y(n);
          if (typeof G == "function" && G !== n.entries)
            for (var Q = G.call(n), U; !(U = Q.next()).done; )
              Je(U.value) && wt(U.value, h);
        }
      }
    }
    function hr(n) {
      {
        var h = n.type;
        if (h == null || typeof h == "string")
          return;
        var _;
        if (typeof h == "function")
          _ = h.propTypes;
        else if (typeof h == "object" && (h.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        h.$$typeof === y))
          _ = h.propTypes;
        else
          return;
        if (_) {
          var M = te(h);
          er(_, n.props, "prop", M, n);
        } else if (h.PropTypes !== void 0 && !Ge) {
          Ge = !0;
          var G = te(h);
          D("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G || "Unknown");
        }
        typeof h.getDefaultProps == "function" && !h.getDefaultProps.isReactClassApproved && D("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function vr(n) {
      {
        for (var h = Object.keys(n.props), _ = 0; _ < h.length; _++) {
          var M = h[_];
          if (M !== "children" && M !== "key") {
            Pe(n), D("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", M), Pe(null);
            break;
          }
        }
        n.ref !== null && (Pe(n), D("Invalid attribute `ref` supplied to `React.Fragment`."), Pe(null));
      }
    }
    var Ct = {};
    function Et(n, h, _, M, G, Q) {
      {
        var U = ve(n);
        if (!U) {
          var q = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var pe = dr();
          pe ? q += pe : q += xt();
          var se;
          n === null ? se = "null" : Ve(n) ? se = "array" : n !== void 0 && n.$$typeof === t ? (se = "<" + (te(n.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : se = typeof n, D("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", se, q);
        }
        var ce = fr(n, h, _, G, Q);
        if (ce == null)
          return ce;
        if (U) {
          var ye = h.children;
          if (ye !== void 0)
            if (M)
              if (Ve(ye)) {
                for (var Me = 0; Me < ye.length; Me++)
                  _t(ye[Me], n);
                Object.freeze && Object.freeze(ye);
              } else
                D("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _t(ye, n);
        }
        if (_e.call(h, "key")) {
          var Re = te(n), he = Object.keys(h).filter(function(Sr) {
            return Sr !== "key";
          }), Ke = he.length > 0 ? "{key: someKey, " + he.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ct[Re + Ke]) {
            var xr = he.length > 0 ? "{" + he.join(": ..., ") + ": ...}" : "{}";
            D(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ke, Re, xr, Re), Ct[Re + Ke] = !0;
          }
        }
        return n === i ? vr(ce) : hr(ce), ce;
      }
    }
    function gr(n, h, _) {
      return Et(n, h, _, !0);
    }
    function yr(n, h, _) {
      return Et(n, h, _, !1);
    }
    var mr = yr, br = gr;
    ke.Fragment = i, ke.jsx = mr, ke.jsxs = br;
  }()), ke;
}
process.env.NODE_ENV === "production" ? st.exports = Dr() : st.exports = Ar();
var s = st.exports;
const kr = ({ size: e = "32px", color: t = "#000000" }) => /* @__PURE__ */ s.jsx("svg", { fill: t, width: e, height: e, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ s.jsx("path", { d: "M21.71,10.29l-9-9a1,1,0,0,0-1.42,0l-9,9a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H8a1,1,0,0,0,1-1V15a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v6a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.92-.62A1,1,0,0,0,21.71,10.29Z" }) }), wn = ({ width: e = "32", height: t = "32", color: r = "white" }) => /* @__PURE__ */ s.jsx(
  "svg",
  {
    style: {
      width: e,
      height: t,
      fill: "none"
    },
    viewBox: "0 0 388 194",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ s.jsx("path", { d: "M194 0H97V97H0V194H97V97H194H291V194H388V97H291V0H194Z", fill: r })
  }
), _n = ({ width: e = "24", height: t = "24", color: r = "black" }) => /* @__PURE__ */ s.jsxs(
  "svg",
  {
    width: e,
    height: t,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ s.jsx("rect", { y: "4", width: "24", height: "2", fill: r }),
      /* @__PURE__ */ s.jsx("rect", { y: "11", width: "24", height: "2", fill: r }),
      /* @__PURE__ */ s.jsx("rect", { y: "18", width: "24", height: "2", fill: r })
    ]
  }
), Cn = (e) => /* @__PURE__ */ s.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ...e,
    children: /* @__PURE__ */ s.jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M6 18L18 6M6 6l12 12"
      }
    )
  }
), En = (e) => /* @__PURE__ */ s.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    ...e,
    children: /* @__PURE__ */ s.jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M12 4v16m8-8H4"
      }
    )
  }
), Yt = ({ serviceId: e }) => {
  const [t, r] = re(`df://${e}`), i = () => {
    navigator.clipboard.writeText(`df://${e}`), r("copied link to clipboard!"), setTimeout(() => {
      r(`df://${e}`);
    }, 2e3);
  }, a = window.origin.split(".").slice(1).join(".");
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        fontSize: "0.8rem",
        color: "#9d9d9d",
        backgroundColor: "#333",
        textAlign: "center",
        padding: "0 8px",
        height: "26px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        position: "relative",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ s.jsx(
          "a",
          {
            style: {
              position: "absolute",
              left: "0px",
              display: "flex",
              alignItems: "center",
              height: "100%",
              cursor: "pointer",
              padding: "0px 10px"
            },
            className: "hover-dark-gray",
            href: `http://${a}/dartfrog:dartfrog:gliderlabs.os/`,
            children: /* @__PURE__ */ s.jsx(kr, { size: "15px", color: "#9d9d9d" })
          }
        ),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              width: "40px"
            }
          }
        ),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              flexGrow: "1",
              overflow: "hidden",
              display: "flex",
              alignItems: "center"
            },
            children: /* @__PURE__ */ s.jsx(
              "div",
              {
                style: {
                  display: "inline-block",
                  cursor: "pointer",
                  overflowX: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  wordWrap: "normal"
                },
                onClick: i,
                children: t
              }
            )
          }
        )
      ]
    }
  );
}, Ir = ({}) => {
  const [e, t] = re(!1), { peerMap: r, chatSoundsEnabled: i, setChatSoundsEnabled: a } = je(), o = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    backgroundColor: "#242424"
  }, p = {
    display: e ? "flex" : "none",
    height: e ? "auto" : "0",
    flexDirection: "column",
    // padding: "10px",
    color: "#ffffff44",
    fontSize: "0.8rem",
    transition: "height 0.3s ease",
    backgroundColor: "#242424"
  };
  return /* @__PURE__ */ s.jsxs("div", { children: [
    /* @__PURE__ */ s.jsx("div", { style: o, children: /* @__PURE__ */ s.jsx(
      "span",
      {
        style: {
          userSelect: "none",
          cursor: "pointer",
          color: "#ffffff44"
        },
        onClick: () => t(!e),
        children: e ? "close menu" : "menu"
      }
    ) }),
    /* @__PURE__ */ s.jsxs("div", { style: p, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          style: {
            border: "none",
            cursor: "pointer",
            padding: "2px 2px"
          },
          className: "df",
          onClick: () => a(!i),
          children: i ? "mute" : "unmute"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { children: "img: /die /kino /panda /dev /tiger /wow /cry /ok /oops" }),
      i && /* @__PURE__ */ s.jsx("div", { children: "sfx: /yes /no /why /fart /people /robust /robustness" })
    ] })
  ] });
}, Pt = ({ size: e = "50px" }) => /* @__PURE__ */ s.jsxs("div", { style: { width: e, height: e, display: "inline-block" }, children: [
  " ",
  /* @__PURE__ */ s.jsx(
    "svg",
    {
      width: "100%",
      height: "100%",
      viewBox: "0 0 50 50",
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "#ffffff22",
      children: /* @__PURE__ */ s.jsx("g", { fill: "none", fillRule: "evenodd", children: /* @__PURE__ */ s.jsxs("g", { transform: "translate(1 1)", strokeWidth: "4", children: [
        /* @__PURE__ */ s.jsx("circle", { strokeOpacity: ".5", cx: "22", cy: "22", r: "6" }),
        /* @__PURE__ */ s.jsx("path", { d: "M44 22c0-12.15-9.85-22-22-22", children: /* @__PURE__ */ s.jsx(
          "animateTransform",
          {
            attributeName: "transform",
            type: "rotate",
            from: "0 22 22",
            to: "360 22 22",
            dur: "1s",
            repeatCount: "indefinite"
          }
        ) })
      ] }) })
    }
  )
] }), at = (e, t) => {
  const r = window.origin.split(".").slice(1).join("."), i = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    color: "gray",
    userSelect: "none"
  };
  return e ? e.status === De.Connecting ? /* @__PURE__ */ s.jsxs("div", { style: i, children: [
    /* @__PURE__ */ s.jsx("div", { children: t ? "bad connection to host..." : "connecting to host..." }),
    /* @__PURE__ */ s.jsx(Pt, {})
  ] }) : e.status === De.ServiceDoesNotExist ? /* @__PURE__ */ s.jsxs("div", { style: i, children: [
    /* @__PURE__ */ s.jsx("div", { children: "this service doesn't exist" }),
    /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(
      "a",
      {
        href: `http://${r}/dartfrog:dartfrog:gliderlabs.os`,
        children: /* @__PURE__ */ s.jsx(
          "button",
          {
            style: {
              padding: "1rem",
              width: "auto"
            },
            children: "home"
          }
        )
      }
    ) })
  ] }) : e.status !== De.Connected ? /* @__PURE__ */ s.jsx("div", { style: i, children: e.toString() }) : null : /* @__PURE__ */ s.jsxs("div", { style: i, children: [
    /* @__PURE__ */ s.jsx("div", { children: "connecting to client..." }),
    /* @__PURE__ */ s.jsx(Pt, {})
  ] });
}, jn = ({ onServiceMessage: e, onClientMessage: t, Element: r, processName: i, websocketUrl: a, ourNode: o, enableChatSounds: p = !1, fullscreen: v = !1, paramServiceId: l }) => {
  const [S, m] = re(!1), y = Ee(null), [C, O] = re(0), I = Ee(!0), [j, Y] = re(!1), {
    setApi: L,
    api: D,
    serviceId: P,
    requestPeer: F,
    setPeerMap: b,
    setServiceId: T,
    setChatHistory: ee,
    addChatMessage: X,
    chatState: le,
    setServiceConnectionStatus: ve,
    serviceConnectionStatus: ae,
    setServiceMetadata: ge,
    serviceMetadata: te,
    setChatSoundsEnabled: ne,
    setFullServiceMetadata: ie
  } = je();
  ue(() => {
    ne(p);
  }, [p]), ue(() => {
    const H = () => {
      document.hidden ? I.current = !1 : (I.current = !0, O(0)), E();
    };
    return document.addEventListener("visibilitychange", H), () => {
      document.removeEventListener("visibilitychange", H);
    };
  }, []), ue(() => {
    let H;
    return (ae == null ? void 0 : ae.status) === De.Connecting ? H = setTimeout(() => {
      Y(!0);
    }, 5e3) : Y(!1), () => clearTimeout(H);
  }, [ae]);
  const E = () => {
    if (l) {
      const H = Te.fromString(l).toShortString();
      document.title = I.current || C === 0 ? H : `(${C}) ${H}`;
    }
  };
  ue(() => {
    E();
  }, [l, C]);
  const B = () => {
    const H = new ft({
      our: {
        node: o,
        process: i
      },
      serviceId: l,
      websocket_url: a,
      onServiceConnectionStatusChange(u) {
        ve(u.serviceConnectionStatus);
      },
      onServiceMetadataChange(u) {
        I.current || u.serviceMetadata && te && te.subscribers !== u.serviceMetadata.subscribers && O((x) => x + 1), ge(u.serviceMetadata);
      },
      onFullServiceMetadataChange(u) {
        ie(u.fullServiceMetadata);
      },
      onPeerMapChange(u) {
        b(u.peerMap);
      },
      onServiceMessage(u) {
        if (u.Chat) {
          if (u.Chat.FullMessageHistory)
            ee(u.Chat.FullMessageHistory);
          else if (u.Chat.Message) {
            const x = u.Chat.Message;
            X(x);
          }
        }
        e == null || e(u), I.current || O((x) => x + 1);
      },
      onClientMessage(u) {
        t == null || t(u), I.current || O((x) => x + 1);
      },
      onOpen: (u) => {
        m(!0), y.current && (clearTimeout(y.current), y.current = null);
      },
      onClose() {
        m(!1), N();
      }
    });
    return L(H), H;
  };
  ue(() => {
    T(l);
    const H = B(), u = () => {
      H.unsubscribeService();
    };
    return window.addEventListener("beforeunload", u), () => {
      window.removeEventListener("beforeunload", u), y.current && clearTimeout(y.current);
    };
  }, [l]);
  const N = () => {
    y.current || (y.current = setTimeout(() => {
      B(), y.current = null;
    }, 5e3));
  };
  if (v) {
    const H = at(ae, j);
    return H || /* @__PURE__ */ s.jsx(r, {});
  }
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ s.jsx(Yt, { serviceId: l }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              flex: "1 1 100%",
              maxHeight: "100%",
              overflow: "auto"
            },
            children: at(ae, j) || /* @__PURE__ */ s.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  flex: "1",
                  flexDirection: "column",
                  height: "100%"
                },
                children: /* @__PURE__ */ s.jsx(r, {})
              }
            )
          }
        )
      ]
    }
  );
}, zr = ({}) => {
  const [e, t] = re(""), { sendChat: r } = je(), i = (o) => {
    t(o.target.value);
  }, a = He(
    async (o) => {
      if (o.preventDefault(), !e) return;
      let p = jr(e);
      r(p), t("");
    },
    [e]
  );
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        maxHeight: "100%"
      },
      children: [
        /* @__PURE__ */ s.jsx(
          "textarea",
          {
            className: "df",
            style: {
              flexGrow: 1,
              fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              marginRight: "0px"
            },
            id: "chat-input",
            value: e,
            onChange: i,
            onKeyDown: (o) => {
              o.key === "Enter" && !o.shiftKey && (o.preventDefault(), a(o));
            }
          }
        ),
        /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(
          "button",
          {
            className: "df",
            style: { cursor: "pointer", height: "100%", borderLeft: "none" },
            onClick: a,
            children: "Send"
          }
        ) })
      ]
    }
  );
}, $r = ({ metadata: e }) => {
  const [t, r] = re({ online: [], recentlyOnline: [], ever: [] }), { peerMap: i } = je(), a = (o, p, v) => o ? "online" : v - p <= 864e5 ? "recentlyOnline" : "ever";
  return ue(() => {
    if (!e) return;
    const o = Date.now(), p = Array.from(e.user_presence || []).reduce(
      (l, [S, m]) => {
        var O;
        const y = ((O = e.subscribers) == null ? void 0 : O.includes(S)) || !1, C = a(y, m * 1e3, o);
        return l[C].push({ user: S, time: m * 1e3 }), l;
      },
      { online: [], recentlyOnline: [], ever: [] }
    ), v = (l, S) => S.time - l.time;
    p.online.sort(v), p.recentlyOnline.sort(v), p.ever.sort(v), r({
      online: p.online.map((l) => l.user),
      recentlyOnline: p.recentlyOnline.map((l) => l.user),
      ever: p.ever.map((l) => l.user)
    });
  }, [e]), /* @__PURE__ */ s.jsxs("div", { style: {
    color: "#ffffff77",
    fontSize: "0.8rem",
    cursor: "default",
    userSelect: "none"
  }, children: [
    /* @__PURE__ */ s.jsxs("div", { children: [
      /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "0.8rem" }, children: [
        t.online.length,
        " online: "
      ] }),
      t.online.map((o, p) => /* @__PURE__ */ s.jsxs(
        "span",
        {
          style: { userSelect: "text" },
          className: Qt(i.get(o)),
          children: [
            o,
            p < t.online.length - 1 ? ", " : ""
          ]
        },
        p
      ))
    ] }),
    /* @__PURE__ */ s.jsxs("div", { children: [
      /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "0.8rem" }, children: [
        t.recentlyOnline.length,
        " recently online: "
      ] }),
      t.recentlyOnline.map((o, p) => /* @__PURE__ */ s.jsxs(
        "span",
        {
          style: {
            userSelect: "text"
          },
          children: [
            o,
            p < t.recentlyOnline.length - 1 ? ", " : ""
          ]
        },
        p
      ))
    ] }),
    /* @__PURE__ */ s.jsxs("div", { children: [
      /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "0.8rem" }, children: [
        t.ever.length,
        " others: "
      ] }),
      t.ever.map((o, p) => /* @__PURE__ */ s.jsxs(
        "span",
        {
          style: {
            userSelect: "text"
          },
          children: [
            o,
            p < t.ever.length - 1 ? ", " : ""
          ]
        },
        p
      ))
    ] })
  ] });
};
var ot = { exports: {} }, Le = { exports: {} }, J = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mt;
function Fr() {
  if (Mt) return J;
  Mt = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, i = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, o = e ? Symbol.for("react.profiler") : 60114, p = e ? Symbol.for("react.provider") : 60109, v = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, S = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, C = e ? Symbol.for("react.suspense_list") : 60120, O = e ? Symbol.for("react.memo") : 60115, I = e ? Symbol.for("react.lazy") : 60116, j = e ? Symbol.for("react.block") : 60121, Y = e ? Symbol.for("react.fundamental") : 60117, L = e ? Symbol.for("react.responder") : 60118, D = e ? Symbol.for("react.scope") : 60119;
  function P(b) {
    if (typeof b == "object" && b !== null) {
      var T = b.$$typeof;
      switch (T) {
        case t:
          switch (b = b.type, b) {
            case l:
            case S:
            case i:
            case o:
            case a:
            case y:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case v:
                case m:
                case I:
                case O:
                case p:
                  return b;
                default:
                  return T;
              }
          }
        case r:
          return T;
      }
    }
  }
  function F(b) {
    return P(b) === S;
  }
  return J.AsyncMode = l, J.ConcurrentMode = S, J.ContextConsumer = v, J.ContextProvider = p, J.Element = t, J.ForwardRef = m, J.Fragment = i, J.Lazy = I, J.Memo = O, J.Portal = r, J.Profiler = o, J.StrictMode = a, J.Suspense = y, J.isAsyncMode = function(b) {
    return F(b) || P(b) === l;
  }, J.isConcurrentMode = F, J.isContextConsumer = function(b) {
    return P(b) === v;
  }, J.isContextProvider = function(b) {
    return P(b) === p;
  }, J.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, J.isForwardRef = function(b) {
    return P(b) === m;
  }, J.isFragment = function(b) {
    return P(b) === i;
  }, J.isLazy = function(b) {
    return P(b) === I;
  }, J.isMemo = function(b) {
    return P(b) === O;
  }, J.isPortal = function(b) {
    return P(b) === r;
  }, J.isProfiler = function(b) {
    return P(b) === o;
  }, J.isStrictMode = function(b) {
    return P(b) === a;
  }, J.isSuspense = function(b) {
    return P(b) === y;
  }, J.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === i || b === S || b === o || b === a || b === y || b === C || typeof b == "object" && b !== null && (b.$$typeof === I || b.$$typeof === O || b.$$typeof === p || b.$$typeof === v || b.$$typeof === m || b.$$typeof === Y || b.$$typeof === L || b.$$typeof === D || b.$$typeof === j);
  }, J.typeOf = P, J;
}
var K = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dt;
function Lr() {
  return Dt || (Dt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, i = e ? Symbol.for("react.fragment") : 60107, a = e ? Symbol.for("react.strict_mode") : 60108, o = e ? Symbol.for("react.profiler") : 60114, p = e ? Symbol.for("react.provider") : 60109, v = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, S = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, C = e ? Symbol.for("react.suspense_list") : 60120, O = e ? Symbol.for("react.memo") : 60115, I = e ? Symbol.for("react.lazy") : 60116, j = e ? Symbol.for("react.block") : 60121, Y = e ? Symbol.for("react.fundamental") : 60117, L = e ? Symbol.for("react.responder") : 60118, D = e ? Symbol.for("react.scope") : 60119;
    function P(g) {
      return typeof g == "string" || typeof g == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      g === i || g === S || g === o || g === a || g === y || g === C || typeof g == "object" && g !== null && (g.$$typeof === I || g.$$typeof === O || g.$$typeof === p || g.$$typeof === v || g.$$typeof === m || g.$$typeof === Y || g.$$typeof === L || g.$$typeof === D || g.$$typeof === j);
    }
    function F(g) {
      if (typeof g == "object" && g !== null) {
        var V = g.$$typeof;
        switch (V) {
          case t:
            var oe = g.type;
            switch (oe) {
              case l:
              case S:
              case i:
              case o:
              case a:
              case y:
                return oe;
              default:
                var de = oe && oe.$$typeof;
                switch (de) {
                  case v:
                  case m:
                  case I:
                  case O:
                  case p:
                    return de;
                  default:
                    return V;
                }
            }
          case r:
            return V;
        }
      }
    }
    var b = l, T = S, ee = v, X = p, le = t, ve = m, ae = i, ge = I, te = O, ne = r, ie = o, E = a, B = y, N = !1;
    function H(g) {
      return N || (N = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), u(g) || F(g) === l;
    }
    function u(g) {
      return F(g) === S;
    }
    function x(g) {
      return F(g) === v;
    }
    function $(g) {
      return F(g) === p;
    }
    function z(g) {
      return typeof g == "object" && g !== null && g.$$typeof === t;
    }
    function R(g) {
      return F(g) === m;
    }
    function W(g) {
      return F(g) === i;
    }
    function A(g) {
      return F(g) === I;
    }
    function k(g) {
      return F(g) === O;
    }
    function d(g) {
      return F(g) === r;
    }
    function c(g) {
      return F(g) === o;
    }
    function f(g) {
      return F(g) === a;
    }
    function w(g) {
      return F(g) === y;
    }
    K.AsyncMode = b, K.ConcurrentMode = T, K.ContextConsumer = ee, K.ContextProvider = X, K.Element = le, K.ForwardRef = ve, K.Fragment = ae, K.Lazy = ge, K.Memo = te, K.Portal = ne, K.Profiler = ie, K.StrictMode = E, K.Suspense = B, K.isAsyncMode = H, K.isConcurrentMode = u, K.isContextConsumer = x, K.isContextProvider = $, K.isElement = z, K.isForwardRef = R, K.isFragment = W, K.isLazy = A, K.isMemo = k, K.isPortal = d, K.isProfiler = c, K.isStrictMode = f, K.isSuspense = w, K.isValidElementType = P, K.typeOf = F;
  }()), K;
}
var At;
function Nt() {
  return At || (At = 1, process.env.NODE_ENV === "production" ? Le.exports = Fr() : Le.exports = Lr()), Le.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ze, kt;
function Wr() {
  if (kt) return Ze;
  kt = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function i(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var p = {}, v = 0; v < 10; v++)
        p["_" + String.fromCharCode(v)] = v;
      var l = Object.getOwnPropertyNames(p).map(function(m) {
        return p[m];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var S = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        S[m] = m;
      }), Object.keys(Object.assign({}, S)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ze = a() ? Object.assign : function(o, p) {
    for (var v, l = i(o), S, m = 1; m < arguments.length; m++) {
      v = Object(arguments[m]);
      for (var y in v)
        t.call(v, y) && (l[y] = v[y]);
      if (e) {
        S = e(v);
        for (var C = 0; C < S.length; C++)
          r.call(v, S[C]) && (l[S[C]] = v[S[C]]);
      }
    }
    return l;
  }, Ze;
}
var Xe, It;
function lt() {
  if (It) return Xe;
  It = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Xe = e, Xe;
}
var Qe, zt;
function Vt() {
  return zt || (zt = 1, Qe = Function.call.bind(Object.prototype.hasOwnProperty)), Qe;
}
var et, $t;
function qr() {
  if ($t) return et;
  $t = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = lt(), r = {}, i = Vt();
    e = function(o) {
      var p = "Warning: " + o;
      typeof console < "u" && console.error(p);
      try {
        throw new Error(p);
      } catch {
      }
    };
  }
  function a(o, p, v, l, S) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in o)
        if (i(o, m)) {
          var y;
          try {
            if (typeof o[m] != "function") {
              var C = Error(
                (l || "React class") + ": " + v + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw C.name = "Invariant Violation", C;
            }
            y = o[m](p, m, l, v, null, t);
          } catch (I) {
            y = I;
          }
          if (y && !(y instanceof Error) && e(
            (l || "React class") + ": type specification of " + v + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof y + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), y instanceof Error && !(y.message in r)) {
            r[y.message] = !0;
            var O = S ? S() : "";
            e(
              "Failed " + v + " type: " + y.message + (O ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, et = a, et;
}
var tt, Ft;
function Hr() {
  if (Ft) return tt;
  Ft = 1;
  var e = Nt(), t = Wr(), r = lt(), i = Vt(), a = qr(), o = function() {
  };
  process.env.NODE_ENV !== "production" && (o = function(v) {
    var l = "Warning: " + v;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function p() {
    return null;
  }
  return tt = function(v, l) {
    var S = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function y(u) {
      var x = u && (S && u[S] || u[m]);
      if (typeof x == "function")
        return x;
    }
    var C = "<<anonymous>>", O = {
      array: L("array"),
      bigint: L("bigint"),
      bool: L("boolean"),
      func: L("function"),
      number: L("number"),
      object: L("object"),
      string: L("string"),
      symbol: L("symbol"),
      any: D(),
      arrayOf: P,
      element: F(),
      elementType: b(),
      instanceOf: T,
      node: ve(),
      objectOf: X,
      oneOf: ee,
      oneOfType: le,
      shape: ge,
      exact: te
    };
    function I(u, x) {
      return u === x ? u !== 0 || 1 / u === 1 / x : u !== u && x !== x;
    }
    function j(u, x) {
      this.message = u, this.data = x && typeof x == "object" ? x : {}, this.stack = "";
    }
    j.prototype = Error.prototype;
    function Y(u) {
      if (process.env.NODE_ENV !== "production")
        var x = {}, $ = 0;
      function z(W, A, k, d, c, f, w) {
        if (d = d || C, f = f || k, w !== r) {
          if (l) {
            var g = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw g.name = "Invariant Violation", g;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var V = d + ":" + k;
            !x[V] && // Avoid spamming the console because they are often not actionable except for lib authors
            $ < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + f + "` prop on `" + d + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[V] = !0, $++);
          }
        }
        return A[k] == null ? W ? A[k] === null ? new j("The " + c + " `" + f + "` is marked as required " + ("in `" + d + "`, but its value is `null`.")) : new j("The " + c + " `" + f + "` is marked as required in " + ("`" + d + "`, but its value is `undefined`.")) : null : u(A, k, d, c, f);
      }
      var R = z.bind(null, !1);
      return R.isRequired = z.bind(null, !0), R;
    }
    function L(u) {
      function x($, z, R, W, A, k) {
        var d = $[z], c = E(d);
        if (c !== u) {
          var f = B(d);
          return new j(
            "Invalid " + W + " `" + A + "` of type " + ("`" + f + "` supplied to `" + R + "`, expected ") + ("`" + u + "`."),
            { expectedType: u }
          );
        }
        return null;
      }
      return Y(x);
    }
    function D() {
      return Y(p);
    }
    function P(u) {
      function x($, z, R, W, A) {
        if (typeof u != "function")
          return new j("Property `" + A + "` of component `" + R + "` has invalid PropType notation inside arrayOf.");
        var k = $[z];
        if (!Array.isArray(k)) {
          var d = E(k);
          return new j("Invalid " + W + " `" + A + "` of type " + ("`" + d + "` supplied to `" + R + "`, expected an array."));
        }
        for (var c = 0; c < k.length; c++) {
          var f = u(k, c, R, W, A + "[" + c + "]", r);
          if (f instanceof Error)
            return f;
        }
        return null;
      }
      return Y(x);
    }
    function F() {
      function u(x, $, z, R, W) {
        var A = x[$];
        if (!v(A)) {
          var k = E(A);
          return new j("Invalid " + R + " `" + W + "` of type " + ("`" + k + "` supplied to `" + z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return Y(u);
    }
    function b() {
      function u(x, $, z, R, W) {
        var A = x[$];
        if (!e.isValidElementType(A)) {
          var k = E(A);
          return new j("Invalid " + R + " `" + W + "` of type " + ("`" + k + "` supplied to `" + z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return Y(u);
    }
    function T(u) {
      function x($, z, R, W, A) {
        if (!($[z] instanceof u)) {
          var k = u.name || C, d = H($[z]);
          return new j("Invalid " + W + " `" + A + "` of type " + ("`" + d + "` supplied to `" + R + "`, expected ") + ("instance of `" + k + "`."));
        }
        return null;
      }
      return Y(x);
    }
    function ee(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), p;
      function x($, z, R, W, A) {
        for (var k = $[z], d = 0; d < u.length; d++)
          if (I(k, u[d]))
            return null;
        var c = JSON.stringify(u, function(w, g) {
          var V = B(g);
          return V === "symbol" ? String(g) : g;
        });
        return new j("Invalid " + W + " `" + A + "` of value `" + String(k) + "` " + ("supplied to `" + R + "`, expected one of " + c + "."));
      }
      return Y(x);
    }
    function X(u) {
      function x($, z, R, W, A) {
        if (typeof u != "function")
          return new j("Property `" + A + "` of component `" + R + "` has invalid PropType notation inside objectOf.");
        var k = $[z], d = E(k);
        if (d !== "object")
          return new j("Invalid " + W + " `" + A + "` of type " + ("`" + d + "` supplied to `" + R + "`, expected an object."));
        for (var c in k)
          if (i(k, c)) {
            var f = u(k, c, R, W, A + "." + c, r);
            if (f instanceof Error)
              return f;
          }
        return null;
      }
      return Y(x);
    }
    function le(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), p;
      for (var x = 0; x < u.length; x++) {
        var $ = u[x];
        if (typeof $ != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + N($) + " at index " + x + "."
          ), p;
      }
      function z(R, W, A, k, d) {
        for (var c = [], f = 0; f < u.length; f++) {
          var w = u[f], g = w(R, W, A, k, d, r);
          if (g == null)
            return null;
          g.data && i(g.data, "expectedType") && c.push(g.data.expectedType);
        }
        var V = c.length > 0 ? ", expected one of type [" + c.join(", ") + "]" : "";
        return new j("Invalid " + k + " `" + d + "` supplied to " + ("`" + A + "`" + V + "."));
      }
      return Y(z);
    }
    function ve() {
      function u(x, $, z, R, W) {
        return ne(x[$]) ? null : new j("Invalid " + R + " `" + W + "` supplied to " + ("`" + z + "`, expected a ReactNode."));
      }
      return Y(u);
    }
    function ae(u, x, $, z, R) {
      return new j(
        (u || "React class") + ": " + x + " type `" + $ + "." + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + R + "`."
      );
    }
    function ge(u) {
      function x($, z, R, W, A) {
        var k = $[z], d = E(k);
        if (d !== "object")
          return new j("Invalid " + W + " `" + A + "` of type `" + d + "` " + ("supplied to `" + R + "`, expected `object`."));
        for (var c in u) {
          var f = u[c];
          if (typeof f != "function")
            return ae(R, W, A, c, B(f));
          var w = f(k, c, R, W, A + "." + c, r);
          if (w)
            return w;
        }
        return null;
      }
      return Y(x);
    }
    function te(u) {
      function x($, z, R, W, A) {
        var k = $[z], d = E(k);
        if (d !== "object")
          return new j("Invalid " + W + " `" + A + "` of type `" + d + "` " + ("supplied to `" + R + "`, expected `object`."));
        var c = t({}, $[z], u);
        for (var f in c) {
          var w = u[f];
          if (i(u, f) && typeof w != "function")
            return ae(R, W, A, f, B(w));
          if (!w)
            return new j(
              "Invalid " + W + " `" + A + "` key `" + f + "` supplied to `" + R + "`.\nBad object: " + JSON.stringify($[z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(u), null, "  ")
            );
          var g = w(k, f, R, W, A + "." + f, r);
          if (g)
            return g;
        }
        return null;
      }
      return Y(x);
    }
    function ne(u) {
      switch (typeof u) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !u;
        case "object":
          if (Array.isArray(u))
            return u.every(ne);
          if (u === null || v(u))
            return !0;
          var x = y(u);
          if (x) {
            var $ = x.call(u), z;
            if (x !== u.entries) {
              for (; !(z = $.next()).done; )
                if (!ne(z.value))
                  return !1;
            } else
              for (; !(z = $.next()).done; ) {
                var R = z.value;
                if (R && !ne(R[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function ie(u, x) {
      return u === "symbol" ? !0 : x ? x["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && x instanceof Symbol : !1;
    }
    function E(u) {
      var x = typeof u;
      return Array.isArray(u) ? "array" : u instanceof RegExp ? "object" : ie(x, u) ? "symbol" : x;
    }
    function B(u) {
      if (typeof u > "u" || u === null)
        return "" + u;
      var x = E(u);
      if (x === "object") {
        if (u instanceof Date)
          return "date";
        if (u instanceof RegExp)
          return "regexp";
      }
      return x;
    }
    function N(u) {
      var x = B(u);
      switch (x) {
        case "array":
        case "object":
          return "an " + x;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + x;
        default:
          return x;
      }
    }
    function H(u) {
      return !u.constructor || !u.constructor.name ? C : u.constructor.name;
    }
    return O.checkPropTypes = a, O.resetWarningCache = a.resetWarningCache, O.PropTypes = O, O;
  }, tt;
}
var rt, Lt;
function Ur() {
  if (Lt) return rt;
  Lt = 1;
  var e = lt();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, rt = function() {
    function i(p, v, l, S, m, y) {
      if (y !== e) {
        var C = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw C.name = "Invariant Violation", C;
      }
    }
    i.isRequired = i;
    function a() {
      return i;
    }
    var o = {
      array: i,
      bigint: i,
      bool: i,
      func: i,
      number: i,
      object: i,
      string: i,
      symbol: i,
      any: i,
      arrayOf: a,
      element: i,
      elementType: i,
      instanceOf: a,
      node: i,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return o.PropTypes = o, o;
  }, rt;
}
if (process.env.NODE_ENV !== "production") {
  var Yr = Nt(), Nr = !0;
  ot.exports = Hr()(Yr.isElement, Nr);
} else
  ot.exports = Ur()();
var Vr = ot.exports;
const Z = /* @__PURE__ */ Mr(Vr);
var me = typeof window < "u" ? window : null, ut = me === null, $e = ut ? void 0 : me.document, be = "addEventListener", xe = "removeEventListener", nt = "getBoundingClientRect", Ie = "_a", Se = "_b", Ce = "_c", We = "horizontal", we = function() {
  return !1;
}, Br = ut ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(e) {
  var t = $e.createElement("div");
  return t.style.cssText = "width:" + e + "calc(9px)", !!t.style.length;
}).shift() + "calc", Bt = function(e) {
  return typeof e == "string" || e instanceof String;
}, Wt = function(e) {
  if (Bt(e)) {
    var t = $e.querySelector(e);
    if (!t)
      throw new Error("Selector " + e + " did not match a DOM element");
    return t;
  }
  return e;
}, fe = function(e, t, r) {
  var i = e[t];
  return i !== void 0 ? i : r;
}, qe = function(e, t, r, i) {
  if (t) {
    if (i === "end")
      return 0;
    if (i === "center")
      return e / 2;
  } else if (r) {
    if (i === "start")
      return 0;
    if (i === "center")
      return e / 2;
  }
  return e;
}, Gr = function(e, t) {
  var r = $e.createElement("div");
  return r.className = "gutter gutter-" + t, r;
}, Jr = function(e, t, r) {
  var i = {};
  return Bt(t) ? i[e] = t : i[e] = Br + "(" + t + "% - " + r + "px)", i;
}, Kr = function(e, t) {
  var r;
  return r = {}, r[e] = t + "px", r;
}, qt = function(e, t) {
  if (t === void 0 && (t = {}), ut)
    return {};
  var r = e, i, a, o, p, v, l;
  Array.from && (r = Array.from(r));
  var S = Wt(r[0]), m = S.parentNode, y = getComputedStyle ? getComputedStyle(m) : null, C = y ? y.flexDirection : null, O = fe(t, "sizes") || r.map(function() {
    return 100 / r.length;
  }), I = fe(t, "minSize", 100), j = Array.isArray(I) ? I : r.map(function() {
    return I;
  }), Y = fe(t, "maxSize", 1 / 0), L = Array.isArray(Y) ? Y : r.map(function() {
    return Y;
  }), D = fe(t, "expandToMin", !1), P = fe(t, "gutterSize", 10), F = fe(t, "gutterAlign", "center"), b = fe(t, "snapOffset", 30), T = Array.isArray(b) ? b : r.map(function() {
    return b;
  }), ee = fe(t, "dragInterval", 1), X = fe(t, "direction", We), le = fe(
    t,
    "cursor",
    X === We ? "col-resize" : "row-resize"
  ), ve = fe(t, "gutter", Gr), ae = fe(
    t,
    "elementStyle",
    Jr
  ), ge = fe(t, "gutterStyle", Kr);
  X === We ? (i = "width", a = "clientX", o = "left", p = "right", v = "clientWidth") : X === "vertical" && (i = "height", a = "clientY", o = "top", p = "bottom", v = "clientHeight");
  function te(d, c, f, w) {
    var g = ae(i, c, f, w);
    Object.keys(g).forEach(function(V) {
      d.style[V] = g[V];
    });
  }
  function ne(d, c, f) {
    var w = ge(i, c, f);
    Object.keys(w).forEach(function(g) {
      d.style[g] = w[g];
    });
  }
  function ie() {
    return l.map(function(d) {
      return d.size;
    });
  }
  function E(d) {
    return "touches" in d ? d.touches[0][a] : d[a];
  }
  function B(d) {
    var c = l[this.a], f = l[this.b], w = c.size + f.size;
    c.size = d / this.size * w, f.size = w - d / this.size * w, te(c.element, c.size, this[Se], c.i), te(f.element, f.size, this[Ce], f.i);
  }
  function N(d) {
    var c, f = l[this.a], w = l[this.b];
    this.dragging && (c = E(d) - this.start + (this[Se] - this.dragOffset), ee > 1 && (c = Math.round(c / ee) * ee), c <= f.minSize + f.snapOffset + this[Se] ? c = f.minSize + this[Se] : c >= this.size - (w.minSize + w.snapOffset + this[Ce]) && (c = this.size - (w.minSize + this[Ce])), c >= f.maxSize - f.snapOffset + this[Se] ? c = f.maxSize + this[Se] : c <= this.size - (w.maxSize - w.snapOffset + this[Ce]) && (c = this.size - (w.maxSize + this[Ce])), B.call(this, c), fe(t, "onDrag", we)(ie()));
  }
  function H() {
    var d = l[this.a].element, c = l[this.b].element, f = d[nt](), w = c[nt]();
    this.size = f[i] + w[i] + this[Se] + this[Ce], this.start = f[o], this.end = f[p];
  }
  function u(d) {
    if (!getComputedStyle)
      return null;
    var c = getComputedStyle(d);
    if (!c)
      return null;
    var f = d[v];
    return f === 0 ? null : (X === We ? f -= parseFloat(c.paddingLeft) + parseFloat(c.paddingRight) : f -= parseFloat(c.paddingTop) + parseFloat(c.paddingBottom), f);
  }
  function x(d) {
    var c = u(m);
    if (c === null || j.reduce(function(V, oe) {
      return V + oe;
    }, 0) > c)
      return d;
    var f = 0, w = [], g = d.map(function(V, oe) {
      var de = c * V / 100, _e = qe(
        P,
        oe === 0,
        oe === d.length - 1,
        F
      ), Oe = j[oe] + _e;
      return de < Oe ? (f += Oe - de, w.push(0), Oe) : (w.push(de - Oe), de);
    });
    return f === 0 ? d : g.map(function(V, oe) {
      var de = V;
      if (f > 0 && w[oe] - f > 0) {
        var _e = Math.min(
          f,
          w[oe] - f
        );
        f -= _e, de = V - _e;
      }
      return de / c * 100;
    });
  }
  function $() {
    var d = this, c = l[d.a].element, f = l[d.b].element;
    d.dragging && fe(t, "onDragEnd", we)(ie()), d.dragging = !1, me[xe]("mouseup", d.stop), me[xe]("touchend", d.stop), me[xe]("touchcancel", d.stop), me[xe]("mousemove", d.move), me[xe]("touchmove", d.move), d.stop = null, d.move = null, c[xe]("selectstart", we), c[xe]("dragstart", we), f[xe]("selectstart", we), f[xe]("dragstart", we), c.style.userSelect = "", c.style.webkitUserSelect = "", c.style.MozUserSelect = "", c.style.pointerEvents = "", f.style.userSelect = "", f.style.webkitUserSelect = "", f.style.MozUserSelect = "", f.style.pointerEvents = "", d.gutter.style.cursor = "", d.parent.style.cursor = "", $e.body.style.cursor = "";
  }
  function z(d) {
    if (!("button" in d && d.button !== 0)) {
      var c = this, f = l[c.a].element, w = l[c.b].element;
      c.dragging || fe(t, "onDragStart", we)(ie()), d.preventDefault(), c.dragging = !0, c.move = N.bind(c), c.stop = $.bind(c), me[be]("mouseup", c.stop), me[be]("touchend", c.stop), me[be]("touchcancel", c.stop), me[be]("mousemove", c.move), me[be]("touchmove", c.move), f[be]("selectstart", we), f[be]("dragstart", we), w[be]("selectstart", we), w[be]("dragstart", we), f.style.userSelect = "none", f.style.webkitUserSelect = "none", f.style.MozUserSelect = "none", f.style.pointerEvents = "none", w.style.userSelect = "none", w.style.webkitUserSelect = "none", w.style.MozUserSelect = "none", w.style.pointerEvents = "none", c.gutter.style.cursor = le, c.parent.style.cursor = le, $e.body.style.cursor = le, H.call(c), c.dragOffset = E(d) - c.end;
    }
  }
  O = x(O);
  var R = [];
  l = r.map(function(d, c) {
    var f = {
      element: Wt(d),
      size: O[c],
      minSize: j[c],
      maxSize: L[c],
      snapOffset: T[c],
      i: c
    }, w;
    if (c > 0 && (w = {
      a: c - 1,
      b: c,
      dragging: !1,
      direction: X,
      parent: m
    }, w[Se] = qe(
      P,
      c - 1 === 0,
      !1,
      F
    ), w[Ce] = qe(
      P,
      !1,
      c === r.length - 1,
      F
    ), C === "row-reverse" || C === "column-reverse")) {
      var g = w.a;
      w.a = w.b, w.b = g;
    }
    if (c > 0) {
      var V = ve(c, X, f.element);
      ne(V, P, c), w[Ie] = z.bind(w), V[be](
        "mousedown",
        w[Ie]
      ), V[be](
        "touchstart",
        w[Ie]
      ), m.insertBefore(V, f.element), w.gutter = V;
    }
    return te(
      f.element,
      f.size,
      qe(
        P,
        c === 0,
        c === r.length - 1,
        F
      ),
      c
    ), c > 0 && R.push(w), f;
  });
  function W(d) {
    var c = d.i === R.length, f = c ? R[d.i - 1] : R[d.i];
    H.call(f);
    var w = c ? f.size - d.minSize - f[Ce] : d.minSize + f[Se];
    B.call(f, w);
  }
  l.forEach(function(d) {
    var c = d.element[nt]()[i];
    c < d.minSize && (D ? W(d) : d.minSize = c);
  });
  function A(d) {
    var c = x(d);
    c.forEach(function(f, w) {
      if (w > 0) {
        var g = R[w - 1], V = l[g.a], oe = l[g.b];
        V.size = c[w - 1], oe.size = f, te(V.element, V.size, g[Se], V.i), te(oe.element, oe.size, g[Ce], oe.i);
      }
    });
  }
  function k(d, c) {
    R.forEach(function(f) {
      if (c !== !0 ? f.parent.removeChild(f.gutter) : (f.gutter[xe](
        "mousedown",
        f[Ie]
      ), f.gutter[xe](
        "touchstart",
        f[Ie]
      )), d !== !0) {
        var w = ae(
          i,
          f.a.size,
          f[Se]
        );
        Object.keys(w).forEach(function(g) {
          l[f.a].element.style[g] = "", l[f.b].element.style[g] = "";
        });
      }
    });
  }
  return {
    setSizes: A,
    getSizes: ie,
    collapse: function(c) {
      W(l[c]);
    },
    destroy: k,
    parent: m,
    pairs: R
  };
};
function it(e, t) {
  var r = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) === -1 && (r[i] = e[i]);
  return r;
}
var Ue = /* @__PURE__ */ function(e) {
  function t() {
    e.apply(this, arguments);
  }
  return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t.prototype.componentDidMount = function() {
    var i = this.props;
    i.children;
    var a = i.gutter, o = it(i, ["children", "gutter"]), p = o;
    p.gutter = function(v, l) {
      var S;
      return a ? S = a(v, l) : (S = document.createElement("div"), S.className = "gutter gutter-" + l), S.__isSplitGutter = !0, S;
    }, this.split = qt(this.parent.children, p);
  }, t.prototype.componentDidUpdate = function(i) {
    var a = this, o = this.props;
    o.children;
    var p = o.minSize, v = o.sizes, l = o.collapsed, S = it(o, ["children", "minSize", "sizes", "collapsed"]), m = S, y = i.minSize, C = i.sizes, O = i.collapsed, I = [
      "maxSize",
      "expandToMin",
      "gutterSize",
      "gutterAlign",
      "snapOffset",
      "dragInterval",
      "direction",
      "cursor"
    ], j = I.map(function(D) {
      return a.props[D] !== i[D];
    }).reduce(function(D, P) {
      return D || P;
    }, !1);
    if (Array.isArray(p) && Array.isArray(y)) {
      var Y = !1;
      p.forEach(function(D, P) {
        Y = Y || D !== y[P];
      }), j = j || Y;
    } else Array.isArray(p) || Array.isArray(y) ? j = !0 : j = j || p !== y;
    if (j)
      m.minSize = p, m.sizes = v || this.split.getSizes(), this.split.destroy(!0, !0), m.gutter = function(D, P, F) {
        return F.previousSibling;
      }, this.split = qt(
        Array.from(this.parent.children).filter(
          // eslint-disable-next-line no-underscore-dangle
          function(D) {
            return !D.__isSplitGutter;
          }
        ),
        m
      );
    else if (v) {
      var L = !1;
      v.forEach(function(D, P) {
        L = L || D !== C[P];
      }), L && this.split.setSizes(this.props.sizes);
    }
    Number.isInteger(l) && (l !== O || j) && this.split.collapse(l);
  }, t.prototype.componentWillUnmount = function() {
    this.split.destroy(), delete this.split;
  }, t.prototype.render = function() {
    var i = this, a = this.props;
    a.sizes, a.minSize, a.maxSize, a.expandToMin, a.gutterSize, a.gutterAlign, a.snapOffset, a.dragInterval, a.direction, a.cursor, a.gutter, a.elementStyle, a.gutterStyle, a.onDrag, a.onDragStart, a.onDragEnd, a.collapsed;
    var o = a.children, p = it(a, ["sizes", "minSize", "maxSize", "expandToMin", "gutterSize", "gutterAlign", "snapOffset", "dragInterval", "direction", "cursor", "gutter", "elementStyle", "gutterStyle", "onDrag", "onDragStart", "onDragEnd", "collapsed", "children"]), v = p;
    return ze.createElement(
      "div",
      Object.assign(
        {},
        { ref: function(l) {
          i.parent = l;
        } },
        v
      ),
      o
    );
  }, t;
}(ze.Component);
Ue.propTypes = {
  sizes: Z.arrayOf(Z.number),
  minSize: Z.oneOfType([
    Z.number,
    Z.arrayOf(Z.number)
  ]),
  maxSize: Z.oneOfType([
    Z.number,
    Z.arrayOf(Z.number)
  ]),
  expandToMin: Z.bool,
  gutterSize: Z.number,
  gutterAlign: Z.string,
  snapOffset: Z.oneOfType([
    Z.number,
    Z.arrayOf(Z.number)
  ]),
  dragInterval: Z.number,
  direction: Z.string,
  cursor: Z.string,
  gutter: Z.func,
  elementStyle: Z.func,
  gutterStyle: Z.func,
  onDrag: Z.func,
  onDragStart: Z.func,
  onDragEnd: Z.func,
  collapsed: Z.number,
  children: Z.arrayOf(Z.element)
};
Ue.defaultProps = {
  sizes: void 0,
  minSize: void 0,
  maxSize: void 0,
  expandToMin: void 0,
  gutterSize: void 0,
  gutterAlign: void 0,
  snapOffset: void 0,
  dragInterval: void 0,
  direction: void 0,
  cursor: void 0,
  gutter: void 0,
  elementStyle: void 0,
  gutterStyle: void 0,
  onDrag: void 0,
  onDragStart: void 0,
  onDragEnd: void 0,
  collapsed: void 0,
  children: void 0
};
const Zr = ({ size: e, node: t }) => {
  const { peerMap: r } = je(), [i, a] = re(Xt);
  return ue(() => {
    const o = r.get(t);
    o && o.peerData && o.peerData.profile.pfp && a(o.peerData.profile.pfp);
  }, [r, t]), /* @__PURE__ */ s.jsx(
    "div",
    {
      className: "pfp-profile-image",
      style: {
        width: e,
        maxWidth: e,
        height: e,
        maxHeight: e
      },
      children: /* @__PURE__ */ s.jsx("img", { src: i })
    }
  );
}, Xr = Ue, Qr = ({ chatState: e }) => {
  const t = Ee(null), r = Ee(null), [i, a] = re(0), [o, p] = re([]);
  Ee(null);
  const [v, l] = re(!1), S = Ee(null), [m, y] = re(0), [C, O] = re(!1), I = Ee(null), { peerMap: j, chatSoundsEnabled: Y } = je();
  ue(() => {
    (() => {
      r.current && a(r.current.offsetHeight + 6);
    })();
  }, []), ue(() => {
    if (e.messages.size === 0 || !(e.messages instanceof Map))
      return;
    const T = Array.from(e.messages.values()).sort((ee, X) => ee.id - X.id);
    p(T), L();
  }, [e.messages]);
  const L = He(() => {
    t.current && !C ? t.current.scrollIntoView({ behavior: "auto", block: "nearest", inline: "start" }) : y((T) => T + 1);
  }, [t, e.lastUpdateType, C, y]);
  ue(() => {
    v || y(0);
  }, [v]), ue(() => {
    v || L();
  }, [o, L, v]);
  const D = window.origin.split(".").slice(1).join("."), P = He(
    (T) => {
      if (Tr(T))
        return /* @__PURE__ */ s.jsx(
          "img",
          {
            src: T,
            alt: "chat image",
            style: {
              height: "100%",
              maxHeight: "9rem",
              objectFit: "cover",
              maxWidth: "100%"
            },
            onLoad: L
          }
        );
      if (Or.test(T))
        return /* @__PURE__ */ s.jsx("span", { children: /* @__PURE__ */ s.jsx(
          "a",
          {
            className: "link puddle",
            style: {
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "1rem"
            },
            href: T,
            children: T
          }
        ) });
      if (dn.test(T)) {
        const ee = pn(T, D);
        return /* @__PURE__ */ s.jsx("span", { children: /* @__PURE__ */ s.jsx(
          "a",
          {
            style: {
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "1rem"
            },
            href: ee,
            className: "link puddle",
            children: T
          }
        ) });
      } else
        return /* @__PURE__ */ s.jsx("span", { children: T.replace(/\s+/g, " ") });
    },
    [L]
  ), F = He(() => {
    if (S.current) {
      const { scrollTop: T, scrollHeight: ee, clientHeight: X } = S.current, le = T + X >= ee - 10;
      l(!le), I.current && clearTimeout(I.current), le ? O(!1) : I.current = setTimeout(() => {
        O(!0);
      }, 500);
    }
  }, []);
  ue(() => {
    const T = S.current;
    if (T)
      return T.addEventListener("scroll", F), () => {
        T.removeEventListener("scroll", F), I.current && clearTimeout(I.current);
      };
  }, [F]);
  const b = () => {
    S.current && (S.current.scrollTop = S.current.scrollHeight), l(!1), O(!1), y(0);
  };
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        width: "100%",
        maxWidth: "100%",
        height: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
        lineHeight: 1.5,
        fontWeight: 400,
        colorScheme: "dark",
        color: "#d1d1d1",
        backgroundColor: "#242424",
        fontSynthesis: "none",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      },
      children: [
        /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(Ir, {}) }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              flexGrow: "1",
              height: "100%",
              maxHeight: "100%",
              overflow: "hidden"
            },
            children: /* @__PURE__ */ s.jsxs(
              Xr,
              {
                sizes: [95, 5],
                minSize: 45,
                direction: "vertical",
                style: {
                  flexGrow: "1",
                  height: "100%",
                  maxHeight: "100%",
                  display: "flex",
                  flexDirection: "column"
                },
                children: [
                  /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      ref: S,
                      style: {
                        overflowY: "scroll",
                        width: "100%",
                        maxWidth: "100%",
                        height: "100%",
                        maxHeight: "100%",
                        position: "relative"
                      },
                      onScroll: F,
                      children: /* @__PURE__ */ s.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            flexGrow: 1,
                            flexDirection: "column",
                            overflowY: "auto",
                            paddingTop: "0.8rem",
                            width: "100%",
                            justifyContent: "flex-end",
                            minHeight: "100%"
                          },
                          children: [
                            o.map((T, ee) => /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: "chat-message",
                                style: {
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  gap: "0.8rem",
                                  padding: "10px 0rem",
                                  paddingRight: "10px",
                                  boxSizing: "border-box"
                                },
                                children: [
                                  /* @__PURE__ */ s.jsx(
                                    "div",
                                    {
                                      style: {
                                        userSelect: "none",
                                        paddingLeft: "10px",
                                        flexShrink: 0
                                      },
                                      children: /* @__PURE__ */ s.jsx(
                                        "a",
                                        {
                                          href: Ut(T.from, D),
                                          className: "df",
                                          children: /* @__PURE__ */ s.jsx(Zr, { size: "40px", node: T.from })
                                        }
                                      )
                                    }
                                  ),
                                  /* @__PURE__ */ s.jsxs(
                                    "div",
                                    {
                                      style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        gap: "3px",
                                        minWidth: 0,
                                        maxWidth: "100%",
                                        boxSizing: "border-box"
                                      },
                                      children: [
                                        /* @__PURE__ */ s.jsxs("div", { style: { verticalAlign: "top", lineHeight: "0.9" }, children: [
                                          /* @__PURE__ */ s.jsx(
                                            "a",
                                            {
                                              style: { display: "inline-block", marginRight: "8px", cursor: "pointer", fontSize: "0.9rem" },
                                              className: `${Qt(j.get(T.from))} puddle`,
                                              href: Ut(T.from, D),
                                              children: /* @__PURE__ */ s.jsxs("span", { children: [
                                                T.from,
                                                ":"
                                              ] })
                                            }
                                          ),
                                          /* @__PURE__ */ s.jsx("div", { style: { userSelect: "none", color: "#ffffff77", fontSize: "0.7rem", display: "inline-block", marginRight: "5px", cursor: "default" }, children: /* @__PURE__ */ s.jsx("span", { children: Pr(T.time) }) })
                                        ] }),
                                        /* @__PURE__ */ s.jsx("span", { style: {
                                          fontSize: "0.9rem",
                                          cursor: "default",
                                          wordWrap: "break-word",
                                          overflowWrap: "break-word",
                                          whiteSpace: "pre-wrap",
                                          maxWidth: "100%"
                                        }, children: P(T.msg) })
                                      ]
                                    }
                                  )
                                ]
                              },
                              ee
                            )),
                            /* @__PURE__ */ s.jsx("div", { id: "messages-end-ref", ref: t, style: { display: "inline" } })
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ s.jsxs("div", { style: { position: "relative" }, children: [
                    C && /* @__PURE__ */ s.jsx(
                      "button",
                      {
                        onClick: b,
                        style: {
                          position: "absolute",
                          top: "-40px",
                          right: "4px",
                          padding: "8px 12px",
                          backgroundColor: "#4a4a4a",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          zIndex: 1e3
                        },
                        children: m > 0 ? `${m} unseen` : "latest"
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        ref: r,
                        style: {
                          width: "100%",
                          maxWidth: "100%"
                        },
                        children: /* @__PURE__ */ s.jsx(zr, {})
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}, en = ze.memo(Qr), tn = Ue, On = ({ onServiceMessage: e, onClientMessage: t, Element: r, processName: i, websocketUrl: a, ourNode: o, enableChatSounds: p = !1, paramServiceId: v = "" }) => {
  const l = Ee(null), [S, m] = re(0), y = Ee(!0), [C, O] = re(!1), {
    setApi: I,
    api: j,
    serviceId: Y,
    requestPeer: L,
    setPeerMap: D,
    setServiceId: P,
    setChatHistory: F,
    addChatMessage: b,
    chatState: T,
    setServiceConnectionStatus: ee,
    serviceConnectionStatus: X,
    setServiceMetadata: le,
    serviceMetadata: ve,
    setChatSoundsEnabled: ae,
    isClientConnected: ge,
    setIsClientConnected: te
  } = je();
  ue(() => {
    ae(p);
  }, [p]), ue(() => {
    const B = () => {
      document.hidden ? y.current = !1 : (y.current = !0, m(0)), ne();
    };
    return document.addEventListener("visibilitychange", B), () => {
      document.removeEventListener("visibilitychange", B);
    };
  }, []);
  const ne = () => {
    if (v) {
      const B = Te.fromString(v);
      if (!B) return;
      const N = B.toShortString();
      document.title = y.current || S === 0 ? N : `${N} (${S})`;
    }
  };
  ue(() => {
    ne();
  }, [v, S]);
  const ie = () => {
    const B = new ft({
      our: {
        node: o,
        process: i
      },
      serviceId: v,
      websocket_url: a,
      onServiceConnectionStatusChange(N) {
        ee(N.serviceConnectionStatus);
      },
      onServiceMetadataChange(N) {
        le(N.serviceMetadata), y.current || m((H) => H + 1);
      },
      onPeerMapChange(N) {
        D(N.peerMap);
      },
      onServiceMessage(N) {
        if (N.Chat) {
          if (N.Chat.FullMessageHistory)
            F(N.Chat.FullMessageHistory);
          else if (N.Chat.Message) {
            const H = N.Chat.Message;
            b(H);
          }
        }
        e == null || e(N), y.current || m((H) => H + 1);
      },
      onClientMessage(N) {
        t == null || t(N), y.current || m((H) => H + 1);
      },
      onOpen: (N) => {
        te(!0), l.current && (clearTimeout(l.current), l.current = null);
      },
      onClose() {
        te(!1), E();
      }
    });
    return I(B), B;
  };
  ue(() => {
    P(v);
    const B = ie(), N = () => {
      B.unsubscribeService();
    };
    return window.addEventListener("beforeunload", N), () => {
      window.removeEventListener("beforeunload", N), l.current && clearTimeout(l.current);
    };
  }, [v]);
  const E = () => {
    l.current || (l.current = setTimeout(() => {
      ie(), l.current = null;
    }, 5e3));
  };
  return ue(() => {
    let B;
    return (X == null ? void 0 : X.status) === De.Connecting ? B = setTimeout(() => O(!0), 5e3) : O(!1), () => clearTimeout(B);
  }, [X]), /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ s.jsx(Yt, { serviceId: v }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              flex: "1 1 100%",
              maxHeight: "100%",
              overflow: "auto"
            },
            children: at(X, C) || /* @__PURE__ */ s.jsxs(
              tn,
              {
                sizes: [50, 50],
                minSize: [60, 60],
                direction: "horizontal",
                gutterSize: 10,
                style: {
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "hidden",
                  height: "100%",
                  maxHeight: "100%",
                  overflowY: "hidden"
                },
                children: [
                  /* @__PURE__ */ s.jsx(
                    "div",
                    {
                      style: {
                        display: "flex",
                        flex: "1",
                        flexDirection: "column",
                        height: "100%"
                      },
                      children: r && /* @__PURE__ */ s.jsx(r, {})
                    }
                  ),
                  /* @__PURE__ */ s.jsxs(
                    "div",
                    {
                      style: {
                        height: "100%",
                        maxHeight: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        gap: "6px",
                        marginLeft: "8px"
                      },
                      children: [
                        /* @__PURE__ */ s.jsx("div", { style: { flex: 1, overflow: "auto" }, children: /* @__PURE__ */ s.jsx(en, { chatState: T }) }),
                        /* @__PURE__ */ s.jsx($r, { metadata: ve })
                      ]
                    }
                  )
                ]
              }
            )
          }
        )
      ]
    }
  );
}, Rn = ({ processName: e, websocketUrl: t, ourNode: r }) => {
  const { api: i, setApi: a, createService: o, deleteService: p, requestMyServices: v, setPeerMap: l, localServices: S, setLocalServices: m } = je();
  return ue(() => {
    const y = new ft({
      our: {
        node: r,
        process: e
      },
      websocket_url: t,
      onOpen: (C) => {
        v();
      },
      onPeerMapChange(C) {
        l(C.peerMap);
      },
      onLocalServicesChange(C) {
        m(C.localServices);
      }
    });
    a(y);
  }, [e, t, r]), /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
        gap: "1rem"
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx(
            "div",
            {
              style: {
                fontSize: "0.8rem",
                textAlign: "center",
                userSelect: "none",
                color: "#9d9d9d",
                backgroundColor: "#333",
                padding: "5px"
              },
              children: "services:"
            }
          ),
          /* @__PURE__ */ s.jsx(
            "div",
            {
              style: {
                userSelect: "none",
                display: "flex",
                flexDirection: "column",
                fontSize: "0.8rem",
                maxHeight: "300px",
                overflowY: "scroll"
              },
              children: S.map((y, C) => /* @__PURE__ */ s.jsxs(
                "div",
                {
                  className: "service-list-item",
                  style: {
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    alignItems: "center",
                    borderBottom: "1px solid #333"
                  },
                  children: [
                    /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        style: {
                          flex: "1",
                          display: "flex",
                          flexDirection: "row",
                          gap: "5px"
                        },
                        children: [
                          /* @__PURE__ */ s.jsx(
                            "a",
                            {
                              className: "join-button",
                              style: {
                                flex: "1",
                                cursor: "pointer"
                              },
                              href: `/${e}/df/service/${y.id.toString()}`,
                              onClick: (O) => {
                              },
                              children: "join"
                            }
                          ),
                          /* @__PURE__ */ s.jsx(
                            "div",
                            {
                              className: "delete-button",
                              style: {
                                flex: "1",
                                cursor: "pointer"
                              },
                              onClick: () => {
                                window.confirm(`Are you sure you want to delete ${y.id.toString()}?`) && p(y.id.toString());
                              },
                              children: "delete"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        style: {
                          flex: "2",
                          display: "flex",
                          alignItems: "center"
                        },
                        children: y.id.toShortString()
                      }
                    ),
                    /* @__PURE__ */ s.jsxs(
                      "div",
                      {
                        style: {
                          flex: "1",
                          display: "flex",
                          alignItems: "center"
                        },
                        children: [
                          y.meta.subscribers.length,
                          " online"
                        ]
                      }
                    ),
                    /* @__PURE__ */ s.jsx(
                      "div",
                      {
                        style: {
                          flex: "1",
                          display: "flex",
                          alignItems: "center"
                        },
                        children: vn(y)
                      }
                    )
                  ]
                },
                C
              ))
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(
          "button",
          {
            style: {
              cursor: "pointer",
              width: "auto",
              padding: "1rem"
            },
            onClick: () => {
              const C = {
                serviceName: (Math.floor(Math.random() * 1e4) + 1).toString(),
                processName: e,
                access: Jt.Public,
                visibility: Kt.Visible,
                whitelist: [],
                publishUserPresence: !0,
                publishSubscribers: !0,
                publishSubscriberCount: !0,
                publishWhitelist: !1
              };
              o(C);
            },
            children: "create a service"
          }
        ) })
      ]
    }
  );
}, Tn = ({ service: e, onSubmit: t, availablePeers: r }) => {
  const [i, a] = re(e.meta.access), [o, p] = re(e.meta.visibility), [v, l] = re(e.meta.title), [S, m] = re(e.meta.description), [y, C] = re(e.meta.publish_user_presence), [O, I] = re(e.meta.publish_subscribers), [j, Y] = re(e.meta.publish_whitelist), [L, D] = re(e.meta.publish_subscriber_count), [P, F] = re(e.meta.whitelist), [b, T] = re(!1), [ee, X] = re(""), le = (E) => {
    a(E.target.value);
  }, ve = (E) => {
    p(E.target.value);
  }, ae = (E) => {
    F(P.filter((B) => B !== E));
  }, ge = (E) => {
    E === "custom" ? T(!0) : P.includes(E) || F([...P, E]);
  }, te = (E) => {
    X(E.target.value);
  }, ne = () => {
    ee && !P.includes(ee) && (F([...P, ee]), X(""), T(!1));
  }, ie = () => {
    t({
      title: v || void 0,
      description: S || void 0,
      access: i,
      visibility: o,
      whitelist: P,
      publishUserPresence: y,
      publishSubscribers: O,
      publishWhitelist: j,
      publishSubscriberCount: L
    });
  };
  return /* @__PURE__ */ s.jsxs(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        fontSize: "0.8rem"
      },
      children: [
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Access:" }),
          /* @__PURE__ */ s.jsxs(
            "select",
            {
              name: "serviceAccessOption",
              id: "serviceAccessOption",
              value: i,
              onChange: le,
              children: [
                /* @__PURE__ */ s.jsx("option", { value: "Public", children: "Public" }),
                /* @__PURE__ */ s.jsx("option", { value: "Whitelist", children: "Whitelist" }),
                /* @__PURE__ */ s.jsx("option", { value: "HostOnly", children: "Host Only" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Visibility:" }),
          /* @__PURE__ */ s.jsxs(
            "select",
            {
              name: "serviceVisibilityOption",
              id: "serviceVisibilityOption",
              value: o,
              onChange: ve,
              children: [
                /* @__PURE__ */ s.jsx("option", { value: "Visible", children: "Visible" }),
                /* @__PURE__ */ s.jsx("option", { value: "VisibleToHost", children: "Host Only" }),
                /* @__PURE__ */ s.jsx("option", { value: "Hidden", children: "Hidden" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Title:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "text",
              placeholder: "Service Title",
              value: v || "",
              onChange: (E) => l(E.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Description:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "text",
              placeholder: "Service Description",
              value: S || "",
              onChange: (E) => m(E.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Publish User Presence:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "checkbox",
              checked: y,
              onChange: (E) => C(E.target.checked)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Publish Subscribers:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "checkbox",
              checked: O,
              onChange: (E) => I(E.target.checked)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Publish Subscriber Count:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "checkbox",
              checked: L,
              onChange: (E) => D(E.target.checked)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginRight: "0.5rem" }, children: "Publish Whitelist:" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "checkbox",
              checked: j,
              onChange: (E) => Y(E.target.checked)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ s.jsx("span", { style: { marginBottom: "0.5rem" }, children: "Whitelist:" }),
          /* @__PURE__ */ s.jsx("div", { style: { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.5rem" }, children: P.map((E) => /* @__PURE__ */ s.jsxs("div", { style: { padding: "0.2rem 0.5rem", borderRadius: "4px" }, children: [
            E,
            /* @__PURE__ */ s.jsx(
              "button",
              {
                onClick: () => {
                  ae(E);
                },
                className: "whitelist-remove-node-button",
                children: "×"
              }
            )
          ] }, E)) }),
          /* @__PURE__ */ s.jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", marginTop: "0.5rem", gap: "0.5rem" }, children: [
            /* @__PURE__ */ s.jsxs(
              "select",
              {
                onChange: (E) => ge(E.target.value),
                value: "",
                style: { width: "auto" },
                children: [
                  /* @__PURE__ */ s.jsx("option", { value: "", disabled: !0, children: "Add peer to whitelist" }),
                  /* @__PURE__ */ s.jsx("option", { value: "custom", children: "custom" }),
                  r.filter((E) => !P.includes(E)).map((E) => /* @__PURE__ */ s.jsx("option", { value: E, children: E }, E))
                ]
              }
            ),
            b && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
              /* @__PURE__ */ s.jsx(
                "input",
                {
                  type: "text",
                  value: ee,
                  onChange: te,
                  placeholder: "Enter custom peer",
                  style: { width: "auto" }
                }
              ),
              /* @__PURE__ */ s.jsx("button", { onClick: ne, style: { width: "auto" }, children: "Add" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(
          "button",
          {
            style: {
              cursor: "pointer",
              justifyContent: "center",
              width: "auto"
            },
            onClick: ie,
            children: "edit service"
          }
        ) })
      ]
    }
  );
};
var rn = /* @__PURE__ */ ((e) => (e[e.Connecting = 0] = "Connecting", e[e.Connected = 1] = "Connected", e[e.Disconnected = 2] = "Disconnected", e))(rn || {});
class nn {
  constructor(t, r) {
    this.status = t, this.timestamp = r;
  }
  toString() {
    switch (this.status) {
      case 0:
        return "Connecting";
      case 1:
        return "Connected";
      case 2:
        return "Disconnected";
      case 3:
        return "ServiceDoesNotExist";
      case 4:
        return "Kicked";
      case 5:
        return "ServiceDeleted";
      case 6:
        return "AccessDenied";
      default:
        return "Unknown Status";
    }
  }
}
var De = /* @__PURE__ */ ((e) => (e[e.Connecting = 0] = "Connecting", e[e.Connected = 1] = "Connected", e[e.Disconnected = 2] = "Disconnected", e[e.ServiceDoesNotExist = 3] = "ServiceDoesNotExist", e[e.Kicked = 4] = "Kicked", e[e.ServiceDeleted = 5] = "ServiceDeleted", e[e.AccessDenied = 6] = "AccessDenied", e))(De || {});
class ft {
  constructor({
    our: t,
    websocket_url: r,
    onOpen: i = (j) => {
    },
    onClose: a = () => {
    },
    serviceId: o = null,
    onServiceConnectionStatusChange: p = (j) => {
    },
    onServiceMetadataChange: v = (j) => {
    },
    onFullServiceMetadataChange: l = (j) => {
    },
    onServiceMessage: S = (j) => {
    },
    onClientMessage: m = (j) => {
    },
    onProcessMessage: y = (j) => {
    },
    onPeerMapChange: C = (j) => {
    },
    onLocalServicesChange: O = (j) => {
    },
    disableAutoReconnect: I = !1
  }) {
    this.api = null, this.peerMap = /* @__PURE__ */ new Map(), this.localServices = [], this.autoReconnectEnabled = !0, this.reconnectInterval = null, this.reconnectAttempts = 0, this.heartbeatInterval = null, this.our = t, this.websocket_url = r, this.onOpen = i, this.onClose = a, this.serviceId = o, this.onServiceConnectionStatusChange = p, this.onServiceMetadataChange = v, this.onFullServiceMetadataChange = l, this.onServiceMessage = S, this.onClientMessage = m, this.onProcessMessage = y, this.onPeerMapChange = C, this.onLocalServicesChange = O, this.autoReconnectEnabled = !I, this.initialize();
  }
  initialize() {
    if (console.log("puddle service api 1.0.1"), !(this.our.node && this.our.process))
      return;
    this.serviceMetadata = null, this.fullServiceMetadata = null, this.serviceConnectionStatus = null;
    const t = new wr({
      uri: this.websocket_url,
      nodeId: this.our.node,
      processId: this.our.process,
      onClose: (r) => {
        console.log("Disconnected from Kinode"), this.setConnectionStatus(
          2
          /* Disconnected */
        ), this.onClose(), this.heartbeatInterval && (clearInterval(this.heartbeatInterval), this.heartbeatInterval = null), this.autoReconnectEnabled ? (console.log("Auto-reconnect is enabled. Will attempt to reconnect..."), this.startReconnectInterval()) : console.log("Auto-reconnect is disabled. No reconnection attempts will be made.");
      },
      onOpen: (r, i) => {
        console.log("Connected to Kinode"), this.onOpen(this), this.serviceId && (this.setServiceConnectionStatus(
          0
          /* Connecting */
        ), this.onServiceConnectionStatusChange(this), this.setService(this.serviceId)), this.heartbeatInterval = setInterval(() => {
          this.sendHeartbeat();
        }, 60 * 1e3), this.setConnectionStatus(
          1
          /* Connected */
        ), this.stopReconnectInterval();
      },
      onMessage: (r, i) => {
        this.updateHandler(r);
      },
      onError: (r) => {
        console.log("Kinode connection error", r);
      }
    });
    this.api = t;
  }
  startReconnectInterval() {
    this.reconnectInterval || (this.reconnectAttempts = 0, this.reconnectInterval = setInterval(() => {
      this.reconnectAttempts++, console.log(`Attempting to reconnect... (Attempt ${this.reconnectAttempts})`), this.initialize();
    }, 5e3));
  }
  stopReconnectInterval() {
    this.reconnectInterval && (clearInterval(this.reconnectInterval), this.reconnectInterval = null, this.reconnectAttempts > 0 && console.log(`Successfully reconnected after ${this.reconnectAttempts} attempt(s)`), this.reconnectAttempts = 0);
  }
  setConnectionStatus(t) {
    this.connectionStatus = {
      status: t,
      timestamp: Date.now()
    };
  }
  setServiceConnectionStatus(t) {
    this.serviceConnectionStatus = new nn(t, Date.now()), this.onServiceConnectionStatusChange(this);
  }
  sendRequest(t) {
    this.api && this.api.send({ data: t });
  }
  sendToService(t) {
    let r = {
      Channel: {
        MessageServer: JSON.stringify(t)
      }
    };
    this.sendRequest(r);
  }
  sendToProcess(t) {
    let r = {
      Meta: {
        MessageProcess: JSON.stringify(t)
      }
    };
    this.sendRequest(r);
  }
  sendHeartbeat() {
    let t = { Channel: "Heartbeat" };
    this.sendRequest(t);
  }
  unsubscribeService() {
    let t = { Meta: "Unsubscribe" };
    this.sendRequest(t);
  }
  setService(t) {
    let r = { Meta: { SetService: t } };
    this.sendRequest(r);
  }
  createService(t) {
    let r = {
      Meta: {
        CreateService: {
          service_name: t.serviceName,
          process_name: t.processName,
          access: t.access,
          visibility: t.visibility,
          whitelist: t.whitelist,
          title: t.title,
          description: t.description,
          publish_user_presence: t.publishUserPresence,
          publish_subscribers: t.publishSubscribers,
          publish_subscriber_count: t.publishSubscriberCount,
          publish_whitelist: t.publishWhitelist
        }
      }
    };
    this.sendRequest(r);
  }
  deleteService(t) {
    let r = { Meta: { DeleteService: t } };
    this.sendRequest(r);
  }
  editService(t, r) {
    const i = {
      Meta: {
        EditService: [
          t,
          r
        ]
      }
    };
    console.log("editing service", i), this.sendRequest(i);
  }
  requestMyServices() {
    let t = { Meta: "RequestMyServices" };
    this.sendRequest(t);
  }
  requestPeer(t) {
    let r = {
      Meta: {
        RequestPeer: t
      }
    };
    this.sendRequest(r);
  }
  requestPeerList(t) {
    let r = {
      Meta: {
        RequestPeerList: t
      }
    };
    this.sendRequest(r);
  }
  requestKnownPeers() {
    let t = {
      Meta: "RequestKnownPeers"
    };
    this.sendRequest(t);
  }
  updateHandler(t) {
    const r = JSON.parse(t);
    if (r.Meta) {
      const i = r.Meta;
      if (i.Peer) {
        const a = i.Peer;
        let o = Ht(a);
        this.peerMap.set(o.node, o), this.onPeerMapChange(this);
      } else if (i.PeerList) {
        const a = i.PeerList;
        for (const o of a) {
          let p = Ht(o);
          this.peerMap.set(p.node, p);
        }
        this.onPeerMapChange(this);
      } else if (i.MyServices) {
        const a = i.MyServices;
        let o = [];
        for (const p of a) {
          const v = sn(p);
          o.push(v);
        }
        this.localServices = o, this.onLocalServicesChange(this);
      } else if (i.FromProcess) {
        const a = i.FromProcess, o = JSON.parse(a);
        this.onProcessMessage(o);
      } else
        console.log("todo handle metaupdate'", i);
    } else if (r.Channel) {
      const i = r.Channel;
      if (i === "SubscribeAck")
        this.setServiceConnectionStatus(
          1
          /* Connected */
        );
      else if (i.SubscribeNack) {
        const a = i.SubscribeNack;
        a === "ServiceDoesNotExist" ? this.setServiceConnectionStatus(
          3
          /* ServiceDoesNotExist */
        ) : a === "AccessDenied" && this.setServiceConnectionStatus(
          6
          /* AccessDenied */
        );
      } else if (i.Metadata) {
        const a = i.Metadata, o = ct(a);
        this.fullServiceMetadata = o, this.onFullServiceMetadataChange(this);
      } else if (i.PublicMetadata) {
        this.setServiceConnectionStatus(
          1
          /* Connected */
        );
        const a = i.PublicMetadata, o = Zt(a);
        this.serviceMetadata = o, this.onServiceMetadataChange(this);
        const p = [];
        o.user_presence && o.user_presence.forEach((v, l) => {
          this.peerMap.has(l) || (this.peerMap.set(l, Ne.new(l)), p.push(l));
        }), p.length > 0 && this.requestPeerList(p);
      } else if (i.Metadata) {
        const a = i.Metadata, o = ct(a);
        this.fullServiceMetadata = o, this.onFullServiceMetadataChange(this);
      } else if (i.Kick)
        i.Kick === "ServiceDeleted" && this.setServiceConnectionStatus(
          5
          /* ServiceDeleted */
        );
      else if (i.FromClient) {
        const a = JSON.parse(i.FromClient);
        this.onClientMessage(a);
      } else if (i.FromServer) {
        const a = JSON.parse(i.FromServer);
        this.onServiceMessage(a);
      } else
        console.log("unhandled update", r);
    }
  }
}
class Te {
  constructor(t, r) {
    this.name = t, this.address = r;
  }
  toShortString() {
    let [t, r] = this.address.split("@");
    return `${this.name}:${t}`;
  }
  toString() {
    return `${this.name}:${this.address}`;
  }
  hostNode() {
    let [t, r] = this.address.split("@");
    return t;
  }
  process() {
    let [t, r] = this.address.split("@");
    return r;
  }
  static fromString(t) {
    const r = t.split(":");
    if (r.length < 2)
      return null;
    const i = r[0], a = r.slice(1).join(":");
    return a ? new Te(i, a) : null;
  }
}
class Gt {
  constructor(t, r) {
    this.id = t, this.meta = r;
  }
  static new(t, r) {
    return new Gt(new Te(t, r), Ye.new());
  }
}
class Ye {
  constructor({
    title: t = void 0,
    description: r = void 0,
    last_sent_presence: i = null,
    subscribers: a = [],
    user_presence: o = /* @__PURE__ */ new Map(),
    access: p = "Public",
    visibility: v = "Visible",
    whitelist: l = [],
    publish_user_presence: S = !1,
    publish_subscribers: m = !1,
    publish_subscriber_count: y = !1,
    publish_whitelist: C = !1
  }) {
    this.title = t, this.description = r, this.last_sent_presence = i, this.subscribers = a, this.user_presence = o, this.access = p, this.visibility = v, this.whitelist = l, this.publish_user_presence = S, this.publish_subscribers = m, this.publish_subscriber_count = y, this.publish_whitelist = C;
  }
  static new() {
    return new Ye({});
  }
}
var Jt = /* @__PURE__ */ ((e) => (e.Public = "Public", e.Whitelist = "Whitelist", e.HostOnly = "HostOnly", e))(Jt || {}), Kt = /* @__PURE__ */ ((e) => (e.Visible = "Visible", e.HostOnly = "HostOnly", e.Hidden = "Hidden", e))(Kt || {});
function sn(e) {
  return {
    id: new Te(e.id.name, e.id.address),
    meta: ct(e.meta)
  };
}
function ct(e) {
  return new Ye({
    title: e.title,
    description: e.description,
    last_sent_presence: e.last_sent_presence,
    subscribers: e.subscribers,
    user_presence: new Map(Object.entries(e.user_presence)),
    access: e.access,
    visibility: e.visibility,
    whitelist: e.whitelist,
    publish_user_presence: e.publish_user_presence,
    publish_subscribers: e.publish_subscribers,
    publish_subscriber_count: e.publish_subscriber_count,
    publish_whitelist: e.publish_whitelist
  });
}
function an(e) {
  return {
    id: new Te(e.id.name, e.id.address),
    meta: Zt(e.meta)
  };
}
function Zt(e) {
  return {
    title: e.title,
    description: e.description,
    last_sent_presence: e.last_sent_presence,
    subscribers: e.subscribers,
    subscriber_count: e.subscriber_count,
    user_presence: e.user_presence ? new Map(Object.entries(e.user_presence)) : void 0,
    access: e.access,
    visibility: e.visibility,
    whitelist: e.whitelist
  };
}
var on = /* @__PURE__ */ ((e) => (e.Offline = "Offline", e.Private = "Private", e.Online = "Online", e.RecentlyOnline = "RecentlyOnline", e))(on || {});
function cn(e) {
  if (e.Online !== void 0)
    return { type: "Online", timestamp: e.Online };
  if (e.Offline !== void 0)
    return { type: "Offline", timestamp: e.Offline };
  if (e === "Private")
    return {
      type: "Private"
      /* Private */
    };
  throw new Error("Unknown activity type");
}
var ln = /* @__PURE__ */ ((e) => (e.Public = "Public", e.Private = "Private", e))(ln || {}), un = /* @__PURE__ */ ((e) => (e.Red = "Red", e.Blue = "Blue", e.Green = "Green", e.Orange = "Orange", e.Purple = "Purple", e.Default = "Default", e))(un || {});
function fn(e) {
  return new dt(
    e.bio,
    e.name_color,
    e.pfp
  );
}
class dt {
  constructor(t, r, i) {
    this.bio = t, this.nameColor = r, this.pfp = i;
  }
  static new(t) {
    return new dt("", "Default", void 0);
  }
}
class Ne {
  constructor(t, r = null, i = null, a = null) {
    this.node = t, this.peerData = r, this.outstandingRequest = i, this.lastUpdated = a;
  }
  static new(t) {
    return new Ne(
      t,
      null,
      // Initialize peerData as null
      null,
      // Initialize outstandingRequest as null
      null
      // Initialize lastUpdated as null
    );
  }
}
function Ht(e) {
  const t = e.peer_data ? {
    hostedServices: e.peer_data.hosted_services.map((r) => an(r)),
    profile: fn(e.peer_data.profile),
    activity: cn(e.peer_data.activity)
    // Use activityFromJson here
  } : null;
  return new Ne(
    e.node,
    t,
    e.outstanding_request || null,
    e.last_updated || null
  );
}
const dn = /^df:\/\/([a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)@([a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)$/;
function pn(e, t) {
  return `http://${t}/dartfrog:dartfrog:gliderlabs.os/join/${e.slice(5)}`;
}
function Ut(e, t) {
  return `http://${t}/dartfrog:dartfrog:gliderlabs.os/nodes/${e}`;
}
const Xt = "https://bwyl.nyc3.digitaloceanspaces.com/hyperware/dartfrog/dartfrog256_small_nobg.png";
function Pn(e) {
  return e && e.peerData && e.peerData.profile.pfp ? e.peerData.profile.pfp : Xt;
}
function Qt(e) {
  return e && e.peerData ? hn(e.peerData.profile.nameColor) : "name-color-default";
}
function hn(e) {
  switch (e) {
    case "Red":
      return "name-color-red";
    case "Blue":
      return "name-color-blue";
    case "Green":
      return "name-color-green";
    case "Orange":
      return "name-color-orange";
    case "Purple":
      return "name-color-purple";
    default:
      return "name-color-default";
  }
}
function Mn(e) {
  return {
    title: e.title,
    description: e.description,
    access: e.access,
    visibility: e.visibility,
    whitelist: e.whitelist,
    publishUserPresence: e.publish_user_presence,
    publishSubscribers: e.publish_subscribers,
    publishSubscriberCount: e.publish_subscriber_count,
    publishWhitelist: e.publish_whitelist
  };
}
function vn(e) {
  const t = /* @__PURE__ */ new Date();
  if (!e.meta.last_sent_presence)
    return "";
  const r = e.meta.last_sent_presence, i = t.getTime() - r * 1e3;
  return gn(i);
}
function gn(e) {
  if (e < 36e5) {
    const r = Math.floor(e / 6e4);
    return `${r} ${r === 1 ? "min" : "mins"} ago`;
  }
  if (e < 864e5) {
    const r = Math.floor(e / 36e5);
    return `${r} ${r === 1 ? "hr" : "hrs"} ago`;
  }
  if (e > 31536e6)
    return new Date(Date.now() - e).toLocaleDateString();
  if (e > 73072e5) {
    const r = Math.floor(e / 2592e6);
    return `${r} ${r === 1 ? "month" : "months"} ago`;
  }
  const t = Math.floor(e / 864e5);
  return t === 1 ? "1 day ago" : `${t} days ago`;
}
function Dn(e) {
  const t = [];
  return e.forEach((r) => {
    r.peerData && r.peerData.hostedServices && t.push(...r.peerData.hostedServices);
  }), t;
}
function An(e) {
  const t = Date.now() / 1e3 - 300;
  return e.sort((r, i) => {
    var l, S;
    const a = (r.meta.last_sent_presence ?? 0) < t, o = (i.meta.last_sent_presence ?? 0) < t;
    if (!a && !o) {
      const m = r.meta.subscriber_count ?? ((l = r.meta.subscribers) == null ? void 0 : l.length) ?? 0, C = (i.meta.subscriber_count ?? ((S = i.meta.subscribers) == null ? void 0 : S.length) ?? 0) - m;
      if (C !== 0) return C;
    }
    const p = r.meta.last_sent_presence ?? 0;
    return (i.meta.last_sent_presence ?? 0) - p;
  });
}
const kn = (e, t) => {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((i) => {
    const a = i.id.toString(), o = {
      id: i.id,
      meta: {
        title: i.meta.title,
        description: i.meta.description,
        last_sent_presence: i.meta.last_sent_presence,
        subscribers: i.meta.subscribers,
        subscriber_count: i.meta.subscribers.length,
        user_presence: i.meta.user_presence,
        access: i.meta.access,
        visibility: i.meta.visibility,
        whitelist: i.meta.whitelist
      }
    };
    r.set(a, o);
  }), t.forEach((i) => {
    const a = i.id.toString();
    r.has(a) || r.set(a, i);
  }), Array.from(r.values());
};
export {
  ln as ActivitySetting,
  wn as AssemblyCapitalLogo,
  en as ChatBox,
  Ir as ChatHeader,
  zr as ChatInput,
  rn as ConnectionStatusType,
  Xt as DEFAULT_PFP,
  $r as DisplayUserActivity,
  Tn as EditServiceForm,
  Sn as HUB_NODE,
  On as HalfChat,
  _n as HamburgerIcon,
  kr as HomeIcon,
  xn as IS_FAKE,
  un as NameColor,
  Rn as NoServiceView,
  Ne as Peer,
  on as PeerActivityType,
  En as PlusIcon,
  dt as Profile,
  Gt as Service,
  Jt as ServiceAccess,
  ft as ServiceApi,
  nn as ServiceConnectionStatus,
  De as ServiceConnectionStatusType,
  Te as ServiceID,
  Ye as ServiceMetadata,
  jn as ServiceView,
  Kt as ServiceVisibility,
  Pt as Spinner,
  Yt as TopBar,
  Cn as XIcon,
  cn as activityFromJson,
  dn as dfLinkRegex,
  pn as dfLinkToRealLink,
  Pr as formatTimestamp,
  Dn as getAllServicesFromPeerMap,
  hn as getClassForNameColor,
  Qt as getPeerNameColor,
  Pn as getPeerPfp,
  gn as getRecencyText,
  vn as getServiceRecencyText,
  kn as getUniqueServices,
  Ot as imageCommands,
  Rr as imageRegex,
  Tr as isImageUrl,
  Or as linkRegex,
  Er as maybePlaySoundEffect,
  Cr as maybePlayTTS,
  jr as maybeReplaceWithImage,
  Ut as nodeProfileLink,
  Ht as peerFromJson,
  fn as profileFromJson,
  an as publicServiceFromJson,
  Zt as publicServiceMetadataFromJson,
  sn as serviceFromJson,
  ct as serviceMetadataFromJson,
  Mn as serviceMetadataToEditOptions,
  An as sortServices,
  jt as soundEffectCommands,
  je as useServiceStore
};
