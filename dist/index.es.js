import _r from "@kinode/client-api";
import { create as Cr } from "zustand";
import $e, { useState as re, useRef as Ee, useEffect as ue, useCallback as Ue } from "react";
const Sn = !1, wn = "waterhouse.os", Rt = {
  "/fart": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/wet.mp3",
  "/no": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/hell-naw-dog.mp3",
  "/yes": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/oh-yes.mp3",
  "/why": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/why.mp3",
  "/people": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/the-people.mp3",
  "/robust": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/robust-josh.mp3",
  "/robustness": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_sounds/robust-basile.mp3"
}, Er = (e) => {
  if (!(sessionStorage.getItem("mute") === "true")) {
    const r = "/tts ";
    if (e.startsWith(r)) {
      const i = e.slice(r.length), o = new SpeechSynthesisUtterance(i);
      window.speechSynthesis.speak(o);
    }
  }
}, jr = (e) => {
  if (e in Rt) {
    const t = Rt[e];
    new Audio(t).play();
  }
}, Ot = {
  "/die": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/die.webp",
  "/kino": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/kino.webp",
  "/panda": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/panda.jpeg",
  "/dev": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/dev.jpeg",
  "/tiger": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/tiger.jpeg",
  "/wow": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/wow.jpeg",
  "/cry": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/cry.jpeg",
  "/ok": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/ok.jpeg",
  "/oops": "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/chat_images/oops.jpeg"
}, Rr = (e) => e in Ot ? Ot[e] : e, Or = /^https?:\/\/\S+$/i, Tr = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp)$/i;
function Pr(e) {
  return Tr.test(e);
}
function Mr(e) {
  const t = new Date(e * 1e3), r = /* @__PURE__ */ new Date(), i = new Date(r.getTime() - 7 * 24 * 60 * 60 * 1e3), o = new Date(r.getTime() - 24 * 60 * 60 * 1e3);
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
    const a = t.toDateString() === r.toDateString(), h = t.toDateString() === o.toDateString(), v = a ? "Today" : h ? "Yesterday" : t.toLocaleDateString("en-US", { weekday: "short" }), l = t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: !0 });
    return `${v} ${l}`;
  }
}
const je = Cr((e, t) => ({
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
    const { chatState: i, chatSoundsEnabled: o } = t(), a = new Map(i.messages);
    a.set(r.id, r), o && (jr(r.msg), Er(r.msg)), e({ chatState: { messages: a, lastUpdateType: "message" } });
  },
  setChatHistory: (r) => {
    const i = new Map(r.map((o) => [o.id, o]));
    e({ chatState: { messages: i, lastUpdateType: "history" } });
  },
  // 
  sendChat: (r) => {
    const { api: i, serviceId: o } = t();
    i && o && i.sendToService({ Chat: { SendMessage: r } });
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
    const { api: o } = t();
    o && o.editService(r, i);
  },
  fullServiceMetadata: null,
  setFullServiceMetadata: (r) => e({ fullServiceMetadata: r }),
  get: t,
  set: e
}));
function kr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var at = { exports: {} }, Ae = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tt;
function Dr() {
  if (Tt) return Ae;
  Tt = 1;
  var e = $e, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(v, l, S) {
    var m, y = {}, C = null, R = null;
    S !== void 0 && (C = "" + S), l.key !== void 0 && (C = "" + l.key), l.ref !== void 0 && (R = l.ref);
    for (m in l) i.call(l, m) && !a.hasOwnProperty(m) && (y[m] = l[m]);
    if (v && v.defaultProps) for (m in l = v.defaultProps, l) y[m] === void 0 && (y[m] = l[m]);
    return { $$typeof: t, type: v, key: C, ref: R, props: y, _owner: o.current };
  }
  return Ae.Fragment = r, Ae.jsx = h, Ae.jsxs = h, Ae;
}
var Ie = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pt;
function Ar() {
  return Pt || (Pt = 1, process.env.NODE_ENV !== "production" && function() {
    var e = $e, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), v = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), R = Symbol.for("react.offscreen"), I = Symbol.iterator, j = "@@iterator";
    function Y(n) {
      if (n === null || typeof n != "object")
        return null;
      var p = I && n[I] || n[j];
      return typeof p == "function" ? p : null;
    }
    var W = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function k(n) {
      {
        for (var p = arguments.length, w = new Array(p > 1 ? p - 1 : 0), M = 1; M < p; M++)
          w[M - 1] = arguments[M];
        P("error", n, w);
      }
    }
    function P(n, p, w) {
      {
        var M = W.ReactDebugCurrentFrame, G = M.getStackAddendum();
        G !== "" && (p += "%s", w = w.concat([G]));
        var ee = w.map(function(U) {
          return String(U);
        });
        ee.unshift("Warning: " + p), Function.prototype.apply.call(console[n], console, ee);
      }
    }
    var F = !1, b = !1, T = !1, te = !1, Q = !1, le;
    le = Symbol.for("react.module.reference");
    function ve(n) {
      return !!(typeof n == "string" || typeof n == "function" || n === i || n === a || Q || n === o || n === S || n === m || te || n === R || F || b || T || typeof n == "object" && n !== null && (n.$$typeof === C || n.$$typeof === y || n.$$typeof === h || n.$$typeof === v || n.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      n.$$typeof === le || n.getModuleId !== void 0));
    }
    function oe(n, p, w) {
      var M = n.displayName;
      if (M)
        return M;
      var G = p.displayName || p.name || "";
      return G !== "" ? w + "(" + G + ")" : w;
    }
    function ge(n) {
      return n.displayName || "Context";
    }
    function X(n) {
      if (n == null)
        return null;
      if (typeof n.tag == "number" && k("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof n == "function")
        return n.displayName || n.name || null;
      if (typeof n == "string")
        return n;
      switch (n) {
        case i:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case o:
          return "StrictMode";
        case S:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof n == "object")
        switch (n.$$typeof) {
          case v:
            var p = n;
            return ge(p) + ".Consumer";
          case h:
            var w = n;
            return ge(w._context) + ".Provider";
          case l:
            return oe(n, n.render, "ForwardRef");
          case y:
            var M = n.displayName || null;
            return M !== null ? M : X(n.type) || "Memo";
          case C: {
            var G = n, ee = G._payload, U = G._init;
            try {
              return X(U(ee));
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
    function O() {
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
    function L() {
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
        ie < 0 && k("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var D = W.ReactCurrentDispatcher, A;
    function d(n, p, w) {
      {
        if (A === void 0)
          try {
            throw Error();
          } catch (G) {
            var M = G.stack.trim().match(/\n( *(at )?)/);
            A = M && M[1] || "";
          }
        return `
` + A + n;
      }
    }
    var c = !1, f;
    {
      var _ = typeof WeakMap == "function" ? WeakMap : Map;
      f = new _();
    }
    function g(n, p) {
      if (!n || c)
        return "";
      {
        var w = f.get(n);
        if (w !== void 0)
          return w;
      }
      var M;
      c = !0;
      var G = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ee;
      ee = D.current, D.current = null, O();
      try {
        if (p) {
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
            } catch (pe) {
              M = pe;
            }
            Reflect.construct(n, [], U);
          } else {
            try {
              U.call();
            } catch (pe) {
              M = pe;
            }
            n.call(U.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (pe) {
            M = pe;
          }
          n();
        }
      } catch (pe) {
        if (pe && M && typeof pe.stack == "string") {
          for (var q = pe.stack.split(`
`), he = M.stack.split(`
`), se = q.length - 1, ce = he.length - 1; se >= 1 && ce >= 0 && q[se] !== he[ce]; )
            ce--;
          for (; se >= 1 && ce >= 0; se--, ce--)
            if (q[se] !== he[ce]) {
              if (se !== 1 || ce !== 1)
                do
                  if (se--, ce--, ce < 0 || q[se] !== he[ce]) {
                    var ye = `
` + q[se].replace(" at new ", " at ");
                    return n.displayName && ye.includes("<anonymous>") && (ye = ye.replace("<anonymous>", n.displayName)), typeof n == "function" && f.set(n, ye), ye;
                  }
                while (se >= 1 && ce >= 0);
              break;
            }
        }
      } finally {
        c = !1, D.current = ee, L(), Error.prepareStackTrace = G;
      }
      var Me = n ? n.displayName || n.name : "", Oe = Me ? d(Me) : "";
      return typeof n == "function" && f.set(n, Oe), Oe;
    }
    function V(n, p, w) {
      return g(n, !1);
    }
    function ae(n) {
      var p = n.prototype;
      return !!(p && p.isReactComponent);
    }
    function de(n, p, w) {
      if (n == null)
        return "";
      if (typeof n == "function")
        return g(n, ae(n));
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
            return de(n.type, p, w);
          case C: {
            var M = n, G = M._payload, ee = M._init;
            try {
              return de(ee(G), p, w);
            } catch {
            }
          }
        }
      return "";
    }
    var _e = Object.prototype.hasOwnProperty, Re = {}, vt = W.ReactDebugCurrentFrame;
    function We(n) {
      if (n) {
        var p = n._owner, w = de(n.type, n._source, p ? p.type : null);
        vt.setExtraStackFrame(w);
      } else
        vt.setExtraStackFrame(null);
    }
    function tr(n, p, w, M, G) {
      {
        var ee = Function.call.bind(_e);
        for (var U in n)
          if (ee(n, U)) {
            var q = void 0;
            try {
              if (typeof n[U] != "function") {
                var he = Error((M || "React class") + ": " + w + " type `" + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[U] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw he.name = "Invariant Violation", he;
              }
              q = n[U](p, U, M, w, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (se) {
              q = se;
            }
            q && !(q instanceof Error) && (We(G), k("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", M || "React class", w, U, typeof q), We(null)), q instanceof Error && !(q.message in Re) && (Re[q.message] = !0, We(G), k("Failed %s type: %s", w, q.message), We(null));
          }
      }
    }
    var rr = Array.isArray;
    function Be(n) {
      return rr(n);
    }
    function nr(n) {
      {
        var p = typeof Symbol == "function" && Symbol.toStringTag, w = p && n[Symbol.toStringTag] || n.constructor.name || "Object";
        return w;
      }
    }
    function ir(n) {
      try {
        return gt(n), !1;
      } catch {
        return !0;
      }
    }
    function gt(n) {
      return "" + n;
    }
    function yt(n) {
      if (ir(n))
        return k("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nr(n)), gt(n);
    }
    var De = W.ReactCurrentOwner, sr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, mt, bt, Ge;
    Ge = {};
    function or(n) {
      if (_e.call(n, "ref")) {
        var p = Object.getOwnPropertyDescriptor(n, "ref").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return n.ref !== void 0;
    }
    function ar(n) {
      if (_e.call(n, "key")) {
        var p = Object.getOwnPropertyDescriptor(n, "key").get;
        if (p && p.isReactWarning)
          return !1;
      }
      return n.key !== void 0;
    }
    function cr(n, p) {
      if (typeof n.ref == "string" && De.current && p && De.current.stateNode !== p) {
        var w = X(De.current.type);
        Ge[w] || (k('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', X(De.current.type), n.ref), Ge[w] = !0);
      }
    }
    function lr(n, p) {
      {
        var w = function() {
          mt || (mt = !0, k("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        w.isReactWarning = !0, Object.defineProperty(n, "key", {
          get: w,
          configurable: !0
        });
      }
    }
    function ur(n, p) {
      {
        var w = function() {
          bt || (bt = !0, k("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", p));
        };
        w.isReactWarning = !0, Object.defineProperty(n, "ref", {
          get: w,
          configurable: !0
        });
      }
    }
    var fr = function(n, p, w, M, G, ee, U) {
      var q = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: n,
        key: p,
        ref: w,
        props: U,
        // Record the component responsible for creating this element.
        _owner: ee
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
    function dr(n, p, w, M, G) {
      {
        var ee, U = {}, q = null, he = null;
        w !== void 0 && (yt(w), q = "" + w), ar(p) && (yt(p.key), q = "" + p.key), or(p) && (he = p.ref, cr(p, G));
        for (ee in p)
          _e.call(p, ee) && !sr.hasOwnProperty(ee) && (U[ee] = p[ee]);
        if (n && n.defaultProps) {
          var se = n.defaultProps;
          for (ee in se)
            U[ee] === void 0 && (U[ee] = se[ee]);
        }
        if (q || he) {
          var ce = typeof n == "function" ? n.displayName || n.name || "Unknown" : n;
          q && lr(U, ce), he && ur(U, ce);
        }
        return fr(n, q, he, G, M, De.current, U);
      }
    }
    var Je = W.ReactCurrentOwner, xt = W.ReactDebugCurrentFrame;
    function Pe(n) {
      if (n) {
        var p = n._owner, w = de(n.type, n._source, p ? p.type : null);
        xt.setExtraStackFrame(w);
      } else
        xt.setExtraStackFrame(null);
    }
    var Ke;
    Ke = !1;
    function Ze(n) {
      return typeof n == "object" && n !== null && n.$$typeof === t;
    }
    function St() {
      {
        if (Je.current) {
          var n = X(Je.current.type);
          if (n)
            return `

Check the render method of \`` + n + "`.";
        }
        return "";
      }
    }
    function hr(n) {
      return "";
    }
    var wt = {};
    function pr(n) {
      {
        var p = St();
        if (!p) {
          var w = typeof n == "string" ? n : n.displayName || n.name;
          w && (p = `

Check the top-level render call using <` + w + ">.");
        }
        return p;
      }
    }
    function _t(n, p) {
      {
        if (!n._store || n._store.validated || n.key != null)
          return;
        n._store.validated = !0;
        var w = pr(p);
        if (wt[w])
          return;
        wt[w] = !0;
        var M = "";
        n && n._owner && n._owner !== Je.current && (M = " It was passed a child from " + X(n._owner.type) + "."), Pe(n), k('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', w, M), Pe(null);
      }
    }
    function Ct(n, p) {
      {
        if (typeof n != "object")
          return;
        if (Be(n))
          for (var w = 0; w < n.length; w++) {
            var M = n[w];
            Ze(M) && _t(M, p);
          }
        else if (Ze(n))
          n._store && (n._store.validated = !0);
        else if (n) {
          var G = Y(n);
          if (typeof G == "function" && G !== n.entries)
            for (var ee = G.call(n), U; !(U = ee.next()).done; )
              Ze(U.value) && _t(U.value, p);
        }
      }
    }
    function vr(n) {
      {
        var p = n.type;
        if (p == null || typeof p == "string")
          return;
        var w;
        if (typeof p == "function")
          w = p.propTypes;
        else if (typeof p == "object" && (p.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        p.$$typeof === y))
          w = p.propTypes;
        else
          return;
        if (w) {
          var M = X(p);
          tr(w, n.props, "prop", M, n);
        } else if (p.PropTypes !== void 0 && !Ke) {
          Ke = !0;
          var G = X(p);
          k("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", G || "Unknown");
        }
        typeof p.getDefaultProps == "function" && !p.getDefaultProps.isReactClassApproved && k("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gr(n) {
      {
        for (var p = Object.keys(n.props), w = 0; w < p.length; w++) {
          var M = p[w];
          if (M !== "children" && M !== "key") {
            Pe(n), k("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", M), Pe(null);
            break;
          }
        }
        n.ref !== null && (Pe(n), k("Invalid attribute `ref` supplied to `React.Fragment`."), Pe(null));
      }
    }
    var Et = {};
    function jt(n, p, w, M, G, ee) {
      {
        var U = ve(n);
        if (!U) {
          var q = "";
          (n === void 0 || typeof n == "object" && n !== null && Object.keys(n).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var he = hr();
          he ? q += he : q += St();
          var se;
          n === null ? se = "null" : Be(n) ? se = "array" : n !== void 0 && n.$$typeof === t ? (se = "<" + (X(n.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : se = typeof n, k("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", se, q);
        }
        var ce = dr(n, p, w, G, ee);
        if (ce == null)
          return ce;
        if (U) {
          var ye = p.children;
          if (ye !== void 0)
            if (M)
              if (Be(ye)) {
                for (var Me = 0; Me < ye.length; Me++)
                  Ct(ye[Me], n);
                Object.freeze && Object.freeze(ye);
              } else
                k("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ct(ye, n);
        }
        if (_e.call(p, "key")) {
          var Oe = X(n), pe = Object.keys(p).filter(function(wr) {
            return wr !== "key";
          }), Xe = pe.length > 0 ? "{key: someKey, " + pe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Et[Oe + Xe]) {
            var Sr = pe.length > 0 ? "{" + pe.join(": ..., ") + ": ...}" : "{}";
            k(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Xe, Oe, Sr, Oe), Et[Oe + Xe] = !0;
          }
        }
        return n === i ? gr(ce) : vr(ce), ce;
      }
    }
    function yr(n, p, w) {
      return jt(n, p, w, !0);
    }
    function mr(n, p, w) {
      return jt(n, p, w, !1);
    }
    var br = mr, xr = yr;
    Ie.Fragment = i, Ie.jsx = br, Ie.jsxs = xr;
  }()), Ie;
}
process.env.NODE_ENV === "production" ? at.exports = Dr() : at.exports = Ar();
var s = at.exports;
const Ir = ({ size: e = "32px", color: t = "#000000" }) => /* @__PURE__ */ s.jsx("svg", { fill: t, width: e, height: e, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ s.jsx("path", { d: "M21.71,10.29l-9-9a1,1,0,0,0-1.42,0l-9,9a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H8a1,1,0,0,0,1-1V15a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v6a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.92-.62A1,1,0,0,0,21.71,10.29Z" }) }), _n = ({ width: e = "32", height: t = "32", color: r = "white" }) => /* @__PURE__ */ s.jsx(
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
), Cn = ({ width: e = "24", height: t = "24", color: r = "black" }) => /* @__PURE__ */ s.jsxs(
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
        d: "M6 18L18 6M6 6l12 12"
      }
    )
  }
), jn = (e) => /* @__PURE__ */ s.jsx(
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
), Nt = ({ serviceId: e }) => {
  const [t, r] = re(`df://${e}`), i = () => {
    navigator.clipboard.writeText(`df://${e}`), r("copied link to clipboard!"), setTimeout(() => {
      r(`df://${e}`);
    }, 2e3);
  }, o = window.origin.split(".").slice(1).join(".");
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
            href: `http://${o}/dartfrog:dartfrog:herobrine.os/`,
            children: /* @__PURE__ */ s.jsx(Ir, { size: "15px", color: "#9d9d9d" })
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
}, zr = ({}) => {
  const [e, t] = re(!1), { peerMap: r, chatSoundsEnabled: i, setChatSoundsEnabled: o } = je(), a = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    backgroundColor: "#242424"
  }, h = {
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
    /* @__PURE__ */ s.jsx("div", { style: a, children: /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsxs("div", { style: h, children: [
      /* @__PURE__ */ s.jsx(
        "button",
        {
          style: {
            border: "none",
            cursor: "pointer",
            padding: "2px 2px"
          },
          className: "df",
          onClick: () => o(!i),
          children: i ? "mute" : "unmute"
        }
      ),
      /* @__PURE__ */ s.jsx("div", { children: "img: /die /kino /panda /dev /tiger /wow /cry /ok /oops" }),
      i && /* @__PURE__ */ s.jsx("div", { children: "sfx: /yes /no /why /fart /people /robust /robustness" })
    ] })
  ] });
}, Mt = ({ size: e = "50px" }) => /* @__PURE__ */ s.jsxs("div", { style: { width: e, height: e, display: "inline-block" }, children: [
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
] }), ct = (e, t) => {
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
  return e ? e.status === ke.Connecting ? /* @__PURE__ */ s.jsxs("div", { style: i, children: [
    /* @__PURE__ */ s.jsx("div", { children: t ? "bad connection to host..." : "connecting to host..." }),
    /* @__PURE__ */ s.jsx(Mt, {})
  ] }) : e.status === ke.ServiceDoesNotExist ? /* @__PURE__ */ s.jsxs("div", { style: i, children: [
    /* @__PURE__ */ s.jsx("div", { children: "this service doesn't exist" }),
    /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(
      "a",
      {
        href: `http://${r}/dartfrog:dartfrog:herobrine.os`,
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
  ] }) : e.status !== ke.Connected ? /* @__PURE__ */ s.jsx("div", { style: i, children: e.toString() }) : null : /* @__PURE__ */ s.jsxs("div", { style: i, children: [
    /* @__PURE__ */ s.jsx("div", { children: "connecting to client..." }),
    /* @__PURE__ */ s.jsx(Mt, {})
  ] });
}, Rn = ({ onServiceMessage: e, onClientMessage: t, Element: r, processName: i, websocketUrl: o, ourNode: a, enableChatSounds: h = !1, fullscreen: v = !1, paramServiceId: l }) => {
  const [S, m] = re(!1), y = Ee(null), [C, R] = re(0), I = Ee(!0), [j, Y] = re(!1), {
    setApi: W,
    api: k,
    serviceId: P,
    requestPeer: F,
    setPeerMap: b,
    setServiceId: T,
    setChatHistory: te,
    addChatMessage: Q,
    chatState: le,
    setServiceConnectionStatus: ve,
    serviceConnectionStatus: oe,
    setServiceMetadata: ge,
    serviceMetadata: X,
    setChatSoundsEnabled: ne,
    setFullServiceMetadata: ie
  } = je();
  ue(() => {
    ne(h);
  }, [h]), ue(() => {
    const H = () => {
      document.hidden ? I.current = !1 : (I.current = !0, R(0)), E();
    };
    return document.addEventListener("visibilitychange", H), () => {
      document.removeEventListener("visibilitychange", H);
    };
  }, []), ue(() => {
    let H;
    return (oe == null ? void 0 : oe.status) === ke.Connecting ? H = setTimeout(() => {
      Y(!0);
    }, 5e3) : Y(!1), () => clearTimeout(H);
  }, [oe]);
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
    const H = new ht({
      our: {
        node: a,
        process: i
      },
      serviceId: l,
      websocket_url: o,
      onServiceConnectionStatusChange(u) {
        ve(u.serviceConnectionStatus);
      },
      onServiceMetadataChange(u) {
        I.current || u.serviceMetadata && X && X.subscribers !== u.serviceMetadata.subscribers && R((x) => x + 1), ge(u.serviceMetadata);
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
            te(u.Chat.FullMessageHistory);
          else if (u.Chat.Message) {
            const x = u.Chat.Message;
            Q(x);
          }
        }
        e == null || e(u), I.current || R((x) => x + 1);
      },
      onClientMessage(u) {
        t == null || t(u), I.current || R((x) => x + 1);
      },
      onOpen: (u) => {
        m(!0), y.current && (clearTimeout(y.current), y.current = null);
      },
      onClose() {
        m(!1), N();
      }
    });
    return W(H), H;
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
    const H = ct(oe, j);
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
        /* @__PURE__ */ s.jsx(Nt, { serviceId: l }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              flex: "1 1 100%",
              maxHeight: "100%",
              overflow: "auto"
            },
            children: ct(oe, j) || /* @__PURE__ */ s.jsx(
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
}, $r = ({}) => {
  const [e, t] = re(""), { sendChat: r } = je(), i = (a) => {
    t(a.target.value);
  }, o = Ue(
    async (a) => {
      if (a.preventDefault(), !e) return;
      let h = Rr(e);
      r(h), t("");
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
            onKeyDown: (a) => {
              a.key === "Enter" && !a.shiftKey && (a.preventDefault(), o(a));
            }
          }
        ),
        /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(
          "button",
          {
            className: "df",
            style: { cursor: "pointer", height: "100%", borderLeft: "none" },
            onClick: o,
            children: "Send"
          }
        ) })
      ]
    }
  );
}, Fr = ({ metadata: e }) => {
  const [t, r] = re({ online: [], recentlyOnline: [], ever: [] }), { peerMap: i } = je(), o = (a, h, v) => a ? "online" : v - h <= 864e5 ? "recentlyOnline" : "ever";
  return ue(() => {
    if (!e) return;
    const a = Date.now(), h = Array.from(e.user_presence || []).reduce(
      (l, [S, m]) => {
        var R;
        const y = ((R = e.subscribers) == null ? void 0 : R.includes(S)) || !1, C = o(y, m * 1e3, a);
        return l[C].push({ user: S, time: m * 1e3 }), l;
      },
      { online: [], recentlyOnline: [], ever: [] }
    ), v = (l, S) => S.time - l.time;
    h.online.sort(v), h.recentlyOnline.sort(v), h.ever.sort(v), r({
      online: h.online.map((l) => l.user),
      recentlyOnline: h.recentlyOnline.map((l) => l.user),
      ever: h.ever.map((l) => l.user)
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
      t.online.map((a, h) => /* @__PURE__ */ s.jsxs(
        "span",
        {
          style: { userSelect: "text" },
          className: er(i.get(a)),
          children: [
            a,
            h < t.online.length - 1 ? ", " : ""
          ]
        },
        h
      ))
    ] }),
    /* @__PURE__ */ s.jsxs("div", { children: [
      /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "0.8rem" }, children: [
        t.recentlyOnline.length,
        " recently online: "
      ] }),
      t.recentlyOnline.map((a, h) => /* @__PURE__ */ s.jsxs(
        "span",
        {
          style: {
            userSelect: "text"
          },
          children: [
            a,
            h < t.recentlyOnline.length - 1 ? ", " : ""
          ]
        },
        h
      ))
    ] }),
    /* @__PURE__ */ s.jsxs("div", { children: [
      /* @__PURE__ */ s.jsxs("span", { style: { fontSize: "0.8rem" }, children: [
        t.ever.length,
        " others: "
      ] }),
      t.ever.map((a, h) => /* @__PURE__ */ s.jsxs(
        "span",
        {
          style: {
            userSelect: "text"
          },
          children: [
            a,
            h < t.ever.length - 1 ? ", " : ""
          ]
        },
        h
      ))
    ] })
  ] });
};
var lt = { exports: {} }, Le = { exports: {} }, J = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kt;
function Wr() {
  if (kt) return J;
  kt = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, i = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, h = e ? Symbol.for("react.provider") : 60109, v = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, S = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, C = e ? Symbol.for("react.suspense_list") : 60120, R = e ? Symbol.for("react.memo") : 60115, I = e ? Symbol.for("react.lazy") : 60116, j = e ? Symbol.for("react.block") : 60121, Y = e ? Symbol.for("react.fundamental") : 60117, W = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function P(b) {
    if (typeof b == "object" && b !== null) {
      var T = b.$$typeof;
      switch (T) {
        case t:
          switch (b = b.type, b) {
            case l:
            case S:
            case i:
            case a:
            case o:
            case y:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case v:
                case m:
                case I:
                case R:
                case h:
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
  return J.AsyncMode = l, J.ConcurrentMode = S, J.ContextConsumer = v, J.ContextProvider = h, J.Element = t, J.ForwardRef = m, J.Fragment = i, J.Lazy = I, J.Memo = R, J.Portal = r, J.Profiler = a, J.StrictMode = o, J.Suspense = y, J.isAsyncMode = function(b) {
    return F(b) || P(b) === l;
  }, J.isConcurrentMode = F, J.isContextConsumer = function(b) {
    return P(b) === v;
  }, J.isContextProvider = function(b) {
    return P(b) === h;
  }, J.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, J.isForwardRef = function(b) {
    return P(b) === m;
  }, J.isFragment = function(b) {
    return P(b) === i;
  }, J.isLazy = function(b) {
    return P(b) === I;
  }, J.isMemo = function(b) {
    return P(b) === R;
  }, J.isPortal = function(b) {
    return P(b) === r;
  }, J.isProfiler = function(b) {
    return P(b) === a;
  }, J.isStrictMode = function(b) {
    return P(b) === o;
  }, J.isSuspense = function(b) {
    return P(b) === y;
  }, J.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === i || b === S || b === a || b === o || b === y || b === C || typeof b == "object" && b !== null && (b.$$typeof === I || b.$$typeof === R || b.$$typeof === h || b.$$typeof === v || b.$$typeof === m || b.$$typeof === Y || b.$$typeof === W || b.$$typeof === k || b.$$typeof === j);
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
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, i = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, h = e ? Symbol.for("react.provider") : 60109, v = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, S = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, y = e ? Symbol.for("react.suspense") : 60113, C = e ? Symbol.for("react.suspense_list") : 60120, R = e ? Symbol.for("react.memo") : 60115, I = e ? Symbol.for("react.lazy") : 60116, j = e ? Symbol.for("react.block") : 60121, Y = e ? Symbol.for("react.fundamental") : 60117, W = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function P(g) {
      return typeof g == "string" || typeof g == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      g === i || g === S || g === a || g === o || g === y || g === C || typeof g == "object" && g !== null && (g.$$typeof === I || g.$$typeof === R || g.$$typeof === h || g.$$typeof === v || g.$$typeof === m || g.$$typeof === Y || g.$$typeof === W || g.$$typeof === k || g.$$typeof === j);
    }
    function F(g) {
      if (typeof g == "object" && g !== null) {
        var V = g.$$typeof;
        switch (V) {
          case t:
            var ae = g.type;
            switch (ae) {
              case l:
              case S:
              case i:
              case a:
              case o:
              case y:
                return ae;
              default:
                var de = ae && ae.$$typeof;
                switch (de) {
                  case v:
                  case m:
                  case I:
                  case R:
                  case h:
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
    var b = l, T = S, te = v, Q = h, le = t, ve = m, oe = i, ge = I, X = R, ne = r, ie = a, E = o, B = y, N = !1;
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
      return F(g) === h;
    }
    function z(g) {
      return typeof g == "object" && g !== null && g.$$typeof === t;
    }
    function O(g) {
      return F(g) === m;
    }
    function L(g) {
      return F(g) === i;
    }
    function D(g) {
      return F(g) === I;
    }
    function A(g) {
      return F(g) === R;
    }
    function d(g) {
      return F(g) === r;
    }
    function c(g) {
      return F(g) === a;
    }
    function f(g) {
      return F(g) === o;
    }
    function _(g) {
      return F(g) === y;
    }
    K.AsyncMode = b, K.ConcurrentMode = T, K.ContextConsumer = te, K.ContextProvider = Q, K.Element = le, K.ForwardRef = ve, K.Fragment = oe, K.Lazy = ge, K.Memo = X, K.Portal = ne, K.Profiler = ie, K.StrictMode = E, K.Suspense = B, K.isAsyncMode = H, K.isConcurrentMode = u, K.isContextConsumer = x, K.isContextProvider = $, K.isElement = z, K.isForwardRef = O, K.isFragment = L, K.isLazy = D, K.isMemo = A, K.isPortal = d, K.isProfiler = c, K.isStrictMode = f, K.isSuspense = _, K.isValidElementType = P, K.typeOf = F;
  }()), K;
}
var At;
function Vt() {
  return At || (At = 1, process.env.NODE_ENV === "production" ? Le.exports = Wr() : Le.exports = Lr()), Le.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Qe, It;
function qr() {
  if (It) return Qe;
  It = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function i(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var h = {}, v = 0; v < 10; v++)
        h["_" + String.fromCharCode(v)] = v;
      var l = Object.getOwnPropertyNames(h).map(function(m) {
        return h[m];
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
  return Qe = o() ? Object.assign : function(a, h) {
    for (var v, l = i(a), S, m = 1; m < arguments.length; m++) {
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
  }, Qe;
}
var et, zt;
function ft() {
  if (zt) return et;
  zt = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return et = e, et;
}
var tt, $t;
function Bt() {
  return $t || ($t = 1, tt = Function.call.bind(Object.prototype.hasOwnProperty)), tt;
}
var rt, Ft;
function Hr() {
  if (Ft) return rt;
  Ft = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = ft(), r = {}, i = Bt();
    e = function(a) {
      var h = "Warning: " + a;
      typeof console < "u" && console.error(h);
      try {
        throw new Error(h);
      } catch {
      }
    };
  }
  function o(a, h, v, l, S) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in a)
        if (i(a, m)) {
          var y;
          try {
            if (typeof a[m] != "function") {
              var C = Error(
                (l || "React class") + ": " + v + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw C.name = "Invariant Violation", C;
            }
            y = a[m](h, m, l, v, null, t);
          } catch (I) {
            y = I;
          }
          if (y && !(y instanceof Error) && e(
            (l || "React class") + ": type specification of " + v + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof y + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), y instanceof Error && !(y.message in r)) {
            r[y.message] = !0;
            var R = S ? S() : "";
            e(
              "Failed " + v + " type: " + y.message + (R ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, rt = o, rt;
}
var nt, Wt;
function Ur() {
  if (Wt) return nt;
  Wt = 1;
  var e = Vt(), t = qr(), r = ft(), i = Bt(), o = Hr(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(v) {
    var l = "Warning: " + v;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function h() {
    return null;
  }
  return nt = function(v, l) {
    var S = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function y(u) {
      var x = u && (S && u[S] || u[m]);
      if (typeof x == "function")
        return x;
    }
    var C = "<<anonymous>>", R = {
      array: W("array"),
      bigint: W("bigint"),
      bool: W("boolean"),
      func: W("function"),
      number: W("number"),
      object: W("object"),
      string: W("string"),
      symbol: W("symbol"),
      any: k(),
      arrayOf: P,
      element: F(),
      elementType: b(),
      instanceOf: T,
      node: ve(),
      objectOf: Q,
      oneOf: te,
      oneOfType: le,
      shape: ge,
      exact: X
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
      function z(L, D, A, d, c, f, _) {
        if (d = d || C, f = f || A, _ !== r) {
          if (l) {
            var g = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw g.name = "Invariant Violation", g;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var V = d + ":" + A;
            !x[V] && // Avoid spamming the console because they are often not actionable except for lib authors
            $ < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + f + "` prop on `" + d + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), x[V] = !0, $++);
          }
        }
        return D[A] == null ? L ? D[A] === null ? new j("The " + c + " `" + f + "` is marked as required " + ("in `" + d + "`, but its value is `null`.")) : new j("The " + c + " `" + f + "` is marked as required in " + ("`" + d + "`, but its value is `undefined`.")) : null : u(D, A, d, c, f);
      }
      var O = z.bind(null, !1);
      return O.isRequired = z.bind(null, !0), O;
    }
    function W(u) {
      function x($, z, O, L, D, A) {
        var d = $[z], c = E(d);
        if (c !== u) {
          var f = B(d);
          return new j(
            "Invalid " + L + " `" + D + "` of type " + ("`" + f + "` supplied to `" + O + "`, expected ") + ("`" + u + "`."),
            { expectedType: u }
          );
        }
        return null;
      }
      return Y(x);
    }
    function k() {
      return Y(h);
    }
    function P(u) {
      function x($, z, O, L, D) {
        if (typeof u != "function")
          return new j("Property `" + D + "` of component `" + O + "` has invalid PropType notation inside arrayOf.");
        var A = $[z];
        if (!Array.isArray(A)) {
          var d = E(A);
          return new j("Invalid " + L + " `" + D + "` of type " + ("`" + d + "` supplied to `" + O + "`, expected an array."));
        }
        for (var c = 0; c < A.length; c++) {
          var f = u(A, c, O, L, D + "[" + c + "]", r);
          if (f instanceof Error)
            return f;
        }
        return null;
      }
      return Y(x);
    }
    function F() {
      function u(x, $, z, O, L) {
        var D = x[$];
        if (!v(D)) {
          var A = E(D);
          return new j("Invalid " + O + " `" + L + "` of type " + ("`" + A + "` supplied to `" + z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return Y(u);
    }
    function b() {
      function u(x, $, z, O, L) {
        var D = x[$];
        if (!e.isValidElementType(D)) {
          var A = E(D);
          return new j("Invalid " + O + " `" + L + "` of type " + ("`" + A + "` supplied to `" + z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return Y(u);
    }
    function T(u) {
      function x($, z, O, L, D) {
        if (!($[z] instanceof u)) {
          var A = u.name || C, d = H($[z]);
          return new j("Invalid " + L + " `" + D + "` of type " + ("`" + d + "` supplied to `" + O + "`, expected ") + ("instance of `" + A + "`."));
        }
        return null;
      }
      return Y(x);
    }
    function te(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), h;
      function x($, z, O, L, D) {
        for (var A = $[z], d = 0; d < u.length; d++)
          if (I(A, u[d]))
            return null;
        var c = JSON.stringify(u, function(_, g) {
          var V = B(g);
          return V === "symbol" ? String(g) : g;
        });
        return new j("Invalid " + L + " `" + D + "` of value `" + String(A) + "` " + ("supplied to `" + O + "`, expected one of " + c + "."));
      }
      return Y(x);
    }
    function Q(u) {
      function x($, z, O, L, D) {
        if (typeof u != "function")
          return new j("Property `" + D + "` of component `" + O + "` has invalid PropType notation inside objectOf.");
        var A = $[z], d = E(A);
        if (d !== "object")
          return new j("Invalid " + L + " `" + D + "` of type " + ("`" + d + "` supplied to `" + O + "`, expected an object."));
        for (var c in A)
          if (i(A, c)) {
            var f = u(A, c, O, L, D + "." + c, r);
            if (f instanceof Error)
              return f;
          }
        return null;
      }
      return Y(x);
    }
    function le(u) {
      if (!Array.isArray(u))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), h;
      for (var x = 0; x < u.length; x++) {
        var $ = u[x];
        if (typeof $ != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + N($) + " at index " + x + "."
          ), h;
      }
      function z(O, L, D, A, d) {
        for (var c = [], f = 0; f < u.length; f++) {
          var _ = u[f], g = _(O, L, D, A, d, r);
          if (g == null)
            return null;
          g.data && i(g.data, "expectedType") && c.push(g.data.expectedType);
        }
        var V = c.length > 0 ? ", expected one of type [" + c.join(", ") + "]" : "";
        return new j("Invalid " + A + " `" + d + "` supplied to " + ("`" + D + "`" + V + "."));
      }
      return Y(z);
    }
    function ve() {
      function u(x, $, z, O, L) {
        return ne(x[$]) ? null : new j("Invalid " + O + " `" + L + "` supplied to " + ("`" + z + "`, expected a ReactNode."));
      }
      return Y(u);
    }
    function oe(u, x, $, z, O) {
      return new j(
        (u || "React class") + ": " + x + " type `" + $ + "." + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + O + "`."
      );
    }
    function ge(u) {
      function x($, z, O, L, D) {
        var A = $[z], d = E(A);
        if (d !== "object")
          return new j("Invalid " + L + " `" + D + "` of type `" + d + "` " + ("supplied to `" + O + "`, expected `object`."));
        for (var c in u) {
          var f = u[c];
          if (typeof f != "function")
            return oe(O, L, D, c, B(f));
          var _ = f(A, c, O, L, D + "." + c, r);
          if (_)
            return _;
        }
        return null;
      }
      return Y(x);
    }
    function X(u) {
      function x($, z, O, L, D) {
        var A = $[z], d = E(A);
        if (d !== "object")
          return new j("Invalid " + L + " `" + D + "` of type `" + d + "` " + ("supplied to `" + O + "`, expected `object`."));
        var c = t({}, $[z], u);
        for (var f in c) {
          var _ = u[f];
          if (i(u, f) && typeof _ != "function")
            return oe(O, L, D, f, B(_));
          if (!_)
            return new j(
              "Invalid " + L + " `" + D + "` key `" + f + "` supplied to `" + O + "`.\nBad object: " + JSON.stringify($[z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(u), null, "  ")
            );
          var g = _(A, f, O, L, D + "." + f, r);
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
                var O = z.value;
                if (O && !ne(O[1]))
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
    return R.checkPropTypes = o, R.resetWarningCache = o.resetWarningCache, R.PropTypes = R, R;
  }, nt;
}
var it, Lt;
function Yr() {
  if (Lt) return it;
  Lt = 1;
  var e = ft();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, it = function() {
    function i(h, v, l, S, m, y) {
      if (y !== e) {
        var C = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw C.name = "Invariant Violation", C;
      }
    }
    i.isRequired = i;
    function o() {
      return i;
    }
    var a = {
      array: i,
      bigint: i,
      bool: i,
      func: i,
      number: i,
      object: i,
      string: i,
      symbol: i,
      any: i,
      arrayOf: o,
      element: i,
      elementType: i,
      instanceOf: o,
      node: i,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, it;
}
if (process.env.NODE_ENV !== "production") {
  var Nr = Vt(), Vr = !0;
  lt.exports = Ur()(Nr.isElement, Vr);
} else
  lt.exports = Yr()();
var Br = lt.exports;
const Z = /* @__PURE__ */ kr(Br);
var me = typeof window < "u" ? window : null, dt = me === null, Fe = dt ? void 0 : me.document, be = "addEventListener", xe = "removeEventListener", st = "getBoundingClientRect", ze = "_a", Se = "_b", Ce = "_c", qe = "horizontal", we = function() {
  return !1;
}, Gr = dt ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(e) {
  var t = Fe.createElement("div");
  return t.style.cssText = "width:" + e + "calc(9px)", !!t.style.length;
}).shift() + "calc", Gt = function(e) {
  return typeof e == "string" || e instanceof String;
}, qt = function(e) {
  if (Gt(e)) {
    var t = Fe.querySelector(e);
    if (!t)
      throw new Error("Selector " + e + " did not match a DOM element");
    return t;
  }
  return e;
}, fe = function(e, t, r) {
  var i = e[t];
  return i !== void 0 ? i : r;
}, He = function(e, t, r, i) {
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
}, Jr = function(e, t) {
  var r = Fe.createElement("div");
  return r.className = "gutter gutter-" + t, r;
}, Kr = function(e, t, r) {
  var i = {};
  return Gt(t) ? i[e] = t : i[e] = Gr + "(" + t + "% - " + r + "px)", i;
}, Zr = function(e, t) {
  var r;
  return r = {}, r[e] = t + "px", r;
}, Ht = function(e, t) {
  if (t === void 0 && (t = {}), dt)
    return {};
  var r = e, i, o, a, h, v, l;
  Array.from && (r = Array.from(r));
  var S = qt(r[0]), m = S.parentNode, y = getComputedStyle ? getComputedStyle(m) : null, C = y ? y.flexDirection : null, R = fe(t, "sizes") || r.map(function() {
    return 100 / r.length;
  }), I = fe(t, "minSize", 100), j = Array.isArray(I) ? I : r.map(function() {
    return I;
  }), Y = fe(t, "maxSize", 1 / 0), W = Array.isArray(Y) ? Y : r.map(function() {
    return Y;
  }), k = fe(t, "expandToMin", !1), P = fe(t, "gutterSize", 10), F = fe(t, "gutterAlign", "center"), b = fe(t, "snapOffset", 30), T = Array.isArray(b) ? b : r.map(function() {
    return b;
  }), te = fe(t, "dragInterval", 1), Q = fe(t, "direction", qe), le = fe(
    t,
    "cursor",
    Q === qe ? "col-resize" : "row-resize"
  ), ve = fe(t, "gutter", Jr), oe = fe(
    t,
    "elementStyle",
    Kr
  ), ge = fe(t, "gutterStyle", Zr);
  Q === qe ? (i = "width", o = "clientX", a = "left", h = "right", v = "clientWidth") : Q === "vertical" && (i = "height", o = "clientY", a = "top", h = "bottom", v = "clientHeight");
  function X(d, c, f, _) {
    var g = oe(i, c, f, _);
    Object.keys(g).forEach(function(V) {
      d.style[V] = g[V];
    });
  }
  function ne(d, c, f) {
    var _ = ge(i, c, f);
    Object.keys(_).forEach(function(g) {
      d.style[g] = _[g];
    });
  }
  function ie() {
    return l.map(function(d) {
      return d.size;
    });
  }
  function E(d) {
    return "touches" in d ? d.touches[0][o] : d[o];
  }
  function B(d) {
    var c = l[this.a], f = l[this.b], _ = c.size + f.size;
    c.size = d / this.size * _, f.size = _ - d / this.size * _, X(c.element, c.size, this[Se], c.i), X(f.element, f.size, this[Ce], f.i);
  }
  function N(d) {
    var c, f = l[this.a], _ = l[this.b];
    this.dragging && (c = E(d) - this.start + (this[Se] - this.dragOffset), te > 1 && (c = Math.round(c / te) * te), c <= f.minSize + f.snapOffset + this[Se] ? c = f.minSize + this[Se] : c >= this.size - (_.minSize + _.snapOffset + this[Ce]) && (c = this.size - (_.minSize + this[Ce])), c >= f.maxSize - f.snapOffset + this[Se] ? c = f.maxSize + this[Se] : c <= this.size - (_.maxSize - _.snapOffset + this[Ce]) && (c = this.size - (_.maxSize + this[Ce])), B.call(this, c), fe(t, "onDrag", we)(ie()));
  }
  function H() {
    var d = l[this.a].element, c = l[this.b].element, f = d[st](), _ = c[st]();
    this.size = f[i] + _[i] + this[Se] + this[Ce], this.start = f[a], this.end = f[h];
  }
  function u(d) {
    if (!getComputedStyle)
      return null;
    var c = getComputedStyle(d);
    if (!c)
      return null;
    var f = d[v];
    return f === 0 ? null : (Q === qe ? f -= parseFloat(c.paddingLeft) + parseFloat(c.paddingRight) : f -= parseFloat(c.paddingTop) + parseFloat(c.paddingBottom), f);
  }
  function x(d) {
    var c = u(m);
    if (c === null || j.reduce(function(V, ae) {
      return V + ae;
    }, 0) > c)
      return d;
    var f = 0, _ = [], g = d.map(function(V, ae) {
      var de = c * V / 100, _e = He(
        P,
        ae === 0,
        ae === d.length - 1,
        F
      ), Re = j[ae] + _e;
      return de < Re ? (f += Re - de, _.push(0), Re) : (_.push(de - Re), de);
    });
    return f === 0 ? d : g.map(function(V, ae) {
      var de = V;
      if (f > 0 && _[ae] - f > 0) {
        var _e = Math.min(
          f,
          _[ae] - f
        );
        f -= _e, de = V - _e;
      }
      return de / c * 100;
    });
  }
  function $() {
    var d = this, c = l[d.a].element, f = l[d.b].element;
    d.dragging && fe(t, "onDragEnd", we)(ie()), d.dragging = !1, me[xe]("mouseup", d.stop), me[xe]("touchend", d.stop), me[xe]("touchcancel", d.stop), me[xe]("mousemove", d.move), me[xe]("touchmove", d.move), d.stop = null, d.move = null, c[xe]("selectstart", we), c[xe]("dragstart", we), f[xe]("selectstart", we), f[xe]("dragstart", we), c.style.userSelect = "", c.style.webkitUserSelect = "", c.style.MozUserSelect = "", c.style.pointerEvents = "", f.style.userSelect = "", f.style.webkitUserSelect = "", f.style.MozUserSelect = "", f.style.pointerEvents = "", d.gutter.style.cursor = "", d.parent.style.cursor = "", Fe.body.style.cursor = "";
  }
  function z(d) {
    if (!("button" in d && d.button !== 0)) {
      var c = this, f = l[c.a].element, _ = l[c.b].element;
      c.dragging || fe(t, "onDragStart", we)(ie()), d.preventDefault(), c.dragging = !0, c.move = N.bind(c), c.stop = $.bind(c), me[be]("mouseup", c.stop), me[be]("touchend", c.stop), me[be]("touchcancel", c.stop), me[be]("mousemove", c.move), me[be]("touchmove", c.move), f[be]("selectstart", we), f[be]("dragstart", we), _[be]("selectstart", we), _[be]("dragstart", we), f.style.userSelect = "none", f.style.webkitUserSelect = "none", f.style.MozUserSelect = "none", f.style.pointerEvents = "none", _.style.userSelect = "none", _.style.webkitUserSelect = "none", _.style.MozUserSelect = "none", _.style.pointerEvents = "none", c.gutter.style.cursor = le, c.parent.style.cursor = le, Fe.body.style.cursor = le, H.call(c), c.dragOffset = E(d) - c.end;
    }
  }
  R = x(R);
  var O = [];
  l = r.map(function(d, c) {
    var f = {
      element: qt(d),
      size: R[c],
      minSize: j[c],
      maxSize: W[c],
      snapOffset: T[c],
      i: c
    }, _;
    if (c > 0 && (_ = {
      a: c - 1,
      b: c,
      dragging: !1,
      direction: Q,
      parent: m
    }, _[Se] = He(
      P,
      c - 1 === 0,
      !1,
      F
    ), _[Ce] = He(
      P,
      !1,
      c === r.length - 1,
      F
    ), C === "row-reverse" || C === "column-reverse")) {
      var g = _.a;
      _.a = _.b, _.b = g;
    }
    if (c > 0) {
      var V = ve(c, Q, f.element);
      ne(V, P, c), _[ze] = z.bind(_), V[be](
        "mousedown",
        _[ze]
      ), V[be](
        "touchstart",
        _[ze]
      ), m.insertBefore(V, f.element), _.gutter = V;
    }
    return X(
      f.element,
      f.size,
      He(
        P,
        c === 0,
        c === r.length - 1,
        F
      ),
      c
    ), c > 0 && O.push(_), f;
  });
  function L(d) {
    var c = d.i === O.length, f = c ? O[d.i - 1] : O[d.i];
    H.call(f);
    var _ = c ? f.size - d.minSize - f[Ce] : d.minSize + f[Se];
    B.call(f, _);
  }
  l.forEach(function(d) {
    var c = d.element[st]()[i];
    c < d.minSize && (k ? L(d) : d.minSize = c);
  });
  function D(d) {
    var c = x(d);
    c.forEach(function(f, _) {
      if (_ > 0) {
        var g = O[_ - 1], V = l[g.a], ae = l[g.b];
        V.size = c[_ - 1], ae.size = f, X(V.element, V.size, g[Se], V.i), X(ae.element, ae.size, g[Ce], ae.i);
      }
    });
  }
  function A(d, c) {
    O.forEach(function(f) {
      if (c !== !0 ? f.parent.removeChild(f.gutter) : (f.gutter[xe](
        "mousedown",
        f[ze]
      ), f.gutter[xe](
        "touchstart",
        f[ze]
      )), d !== !0) {
        var _ = oe(
          i,
          f.a.size,
          f[Se]
        );
        Object.keys(_).forEach(function(g) {
          l[f.a].element.style[g] = "", l[f.b].element.style[g] = "";
        });
      }
    });
  }
  return {
    setSizes: D,
    getSizes: ie,
    collapse: function(c) {
      L(l[c]);
    },
    destroy: A,
    parent: m,
    pairs: O
  };
};
function ot(e, t) {
  var r = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) === -1 && (r[i] = e[i]);
  return r;
}
var Ye = /* @__PURE__ */ function(e) {
  function t() {
    e.apply(this, arguments);
  }
  return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t.prototype.componentDidMount = function() {
    var i = this.props;
    i.children;
    var o = i.gutter, a = ot(i, ["children", "gutter"]), h = a;
    h.gutter = function(v, l) {
      var S;
      return o ? S = o(v, l) : (S = document.createElement("div"), S.className = "gutter gutter-" + l), S.__isSplitGutter = !0, S;
    }, this.split = Ht(this.parent.children, h);
  }, t.prototype.componentDidUpdate = function(i) {
    var o = this, a = this.props;
    a.children;
    var h = a.minSize, v = a.sizes, l = a.collapsed, S = ot(a, ["children", "minSize", "sizes", "collapsed"]), m = S, y = i.minSize, C = i.sizes, R = i.collapsed, I = [
      "maxSize",
      "expandToMin",
      "gutterSize",
      "gutterAlign",
      "snapOffset",
      "dragInterval",
      "direction",
      "cursor"
    ], j = I.map(function(k) {
      return o.props[k] !== i[k];
    }).reduce(function(k, P) {
      return k || P;
    }, !1);
    if (Array.isArray(h) && Array.isArray(y)) {
      var Y = !1;
      h.forEach(function(k, P) {
        Y = Y || k !== y[P];
      }), j = j || Y;
    } else Array.isArray(h) || Array.isArray(y) ? j = !0 : j = j || h !== y;
    if (j)
      m.minSize = h, m.sizes = v || this.split.getSizes(), this.split.destroy(!0, !0), m.gutter = function(k, P, F) {
        return F.previousSibling;
      }, this.split = Ht(
        Array.from(this.parent.children).filter(
          // eslint-disable-next-line no-underscore-dangle
          function(k) {
            return !k.__isSplitGutter;
          }
        ),
        m
      );
    else if (v) {
      var W = !1;
      v.forEach(function(k, P) {
        W = W || k !== C[P];
      }), W && this.split.setSizes(this.props.sizes);
    }
    Number.isInteger(l) && (l !== R || j) && this.split.collapse(l);
  }, t.prototype.componentWillUnmount = function() {
    this.split.destroy(), delete this.split;
  }, t.prototype.render = function() {
    var i = this, o = this.props;
    o.sizes, o.minSize, o.maxSize, o.expandToMin, o.gutterSize, o.gutterAlign, o.snapOffset, o.dragInterval, o.direction, o.cursor, o.gutter, o.elementStyle, o.gutterStyle, o.onDrag, o.onDragStart, o.onDragEnd, o.collapsed;
    var a = o.children, h = ot(o, ["sizes", "minSize", "maxSize", "expandToMin", "gutterSize", "gutterAlign", "snapOffset", "dragInterval", "direction", "cursor", "gutter", "elementStyle", "gutterStyle", "onDrag", "onDragStart", "onDragEnd", "collapsed", "children"]), v = h;
    return $e.createElement(
      "div",
      Object.assign(
        {},
        { ref: function(l) {
          i.parent = l;
        } },
        v
      ),
      a
    );
  }, t;
}($e.Component);
Ye.propTypes = {
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
Ye.defaultProps = {
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
const Xr = ({ size: e, node: t }) => {
  const { peerMap: r } = je(), [i, o] = re(Qt);
  return ue(() => {
    const a = r.get(t);
    a && a.peerData && a.peerData.profile.pfp && o(a.peerData.profile.pfp);
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
}, Qr = Ye, en = ({ chatState: e }) => {
  const t = Ee(null), r = Ee(null), [i, o] = re(0), [a, h] = re([]);
  Ee(null);
  const [v, l] = re(!1), S = Ee(null), [m, y] = re(0), [C, R] = re(!1), I = Ee(null), { peerMap: j, chatSoundsEnabled: Y } = je();
  ue(() => {
    (() => {
      r.current && o(r.current.offsetHeight + 6);
    })();
  }, []), ue(() => {
    if (e.messages.size === 0 || !(e.messages instanceof Map))
      return;
    const T = Array.from(e.messages.values()).sort((te, Q) => te.id - Q.id);
    h(T), W();
  }, [e.messages]);
  const W = Ue(() => {
    t.current && !C ? t.current.scrollIntoView({ behavior: "auto", block: "nearest", inline: "start" }) : y((T) => T + 1);
  }, [t, e.lastUpdateType, C, y]);
  ue(() => {
    v || y(0);
  }, [v]), ue(() => {
    v || W();
  }, [a, W, v]);
  const k = window.origin.split(".").slice(1).join("."), P = Ue(
    (T) => {
      if (Pr(T))
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
            onLoad: W
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
      if (hn.test(T)) {
        const te = pn(T, k);
        return /* @__PURE__ */ s.jsx("span", { children: /* @__PURE__ */ s.jsx(
          "a",
          {
            style: {
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "1rem"
            },
            href: te,
            className: "link puddle",
            children: T
          }
        ) });
      } else
        return /* @__PURE__ */ s.jsx("span", { children: T.replace(/\s+/g, " ") });
    },
    [W]
  ), F = Ue(() => {
    if (S.current) {
      const { scrollTop: T, scrollHeight: te, clientHeight: Q } = S.current, le = T + Q >= te - 10;
      l(!le), I.current && clearTimeout(I.current), le ? R(!1) : I.current = setTimeout(() => {
        R(!0);
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
    S.current && (S.current.scrollTop = S.current.scrollHeight), l(!1), R(!1), y(0);
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
        /* @__PURE__ */ s.jsx("div", { children: /* @__PURE__ */ s.jsx(zr, {}) }),
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
              Qr,
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
                            a.map((T, te) => /* @__PURE__ */ s.jsxs(
                              "div",
                              {
                                className: "chat-message",
                                style: {
                                  display: "flex",
                                  flexDirection: "row",
                                  width: "100%",
                                  gap: "0.8rem",
                                  padding: "10px 0rem",
                                  paddingRight: "10px"
                                },
                                children: [
                                  /* @__PURE__ */ s.jsx(
                                    "div",
                                    {
                                      style: {
                                        userSelect: "none",
                                        paddingLeft: "10px"
                                      },
                                      children: /* @__PURE__ */ s.jsx(
                                        "a",
                                        {
                                          href: Yt(T.from, k),
                                          className: "df",
                                          children: /* @__PURE__ */ s.jsx(Xr, { size: "40px", node: T.from })
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
                                        maxWidth: "100%"
                                      },
                                      children: [
                                        /* @__PURE__ */ s.jsxs("div", { style: { verticalAlign: "top", lineHeight: "0.9" }, children: [
                                          /* @__PURE__ */ s.jsx(
                                            "a",
                                            {
                                              style: { display: "inline-block", marginRight: "8px", cursor: "pointer", fontSize: "0.9rem" },
                                              className: `${er(j.get(T.from))} puddle`,
                                              href: Yt(T.from, k),
                                              children: /* @__PURE__ */ s.jsxs("span", { children: [
                                                T.from,
                                                ":"
                                              ] })
                                            }
                                          ),
                                          /* @__PURE__ */ s.jsx("div", { style: { userSelect: "none", color: "#ffffff77", fontSize: "0.7rem", display: "inline-block", marginRight: "5px", cursor: "default" }, children: /* @__PURE__ */ s.jsx("span", { children: Mr(T.time) }) })
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
                              te
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
                        children: /* @__PURE__ */ s.jsx($r, {})
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
}, tn = $e.memo(en), rn = Ye, On = ({ onServiceMessage: e, onClientMessage: t, Element: r, processName: i, websocketUrl: o, ourNode: a, enableChatSounds: h = !1, paramServiceId: v = "" }) => {
  const l = Ee(null), [S, m] = re(0), y = Ee(!0), [C, R] = re(!1), {
    setApi: I,
    api: j,
    serviceId: Y,
    requestPeer: W,
    setPeerMap: k,
    setServiceId: P,
    setChatHistory: F,
    addChatMessage: b,
    chatState: T,
    setServiceConnectionStatus: te,
    serviceConnectionStatus: Q,
    setServiceMetadata: le,
    serviceMetadata: ve,
    setChatSoundsEnabled: oe,
    isClientConnected: ge,
    setIsClientConnected: X
  } = je();
  ue(() => {
    oe(h);
  }, [h]), ue(() => {
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
    const B = new ht({
      our: {
        node: a,
        process: i
      },
      serviceId: v,
      websocket_url: o,
      onServiceConnectionStatusChange(N) {
        te(N.serviceConnectionStatus);
      },
      onServiceMetadataChange(N) {
        le(N.serviceMetadata), y.current || m((H) => H + 1);
      },
      onPeerMapChange(N) {
        k(N.peerMap);
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
        X(!0), l.current && (clearTimeout(l.current), l.current = null);
      },
      onClose() {
        X(!1), E();
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
    return (Q == null ? void 0 : Q.status) === ke.Connecting ? B = setTimeout(() => R(!0), 5e3) : R(!1), () => clearTimeout(B);
  }, [Q]), /* @__PURE__ */ s.jsxs(
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
        /* @__PURE__ */ s.jsx(Nt, { serviceId: v }),
        /* @__PURE__ */ s.jsx(
          "div",
          {
            style: {
              flex: "1 1 100%",
              maxHeight: "100%",
              overflow: "auto"
            },
            children: ct(Q, C) || /* @__PURE__ */ s.jsxs(
              rn,
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
                        /* @__PURE__ */ s.jsx("div", { style: { flex: 1, overflow: "auto" }, children: /* @__PURE__ */ s.jsx(tn, { chatState: T }) }),
                        /* @__PURE__ */ s.jsx(Fr, { metadata: ve })
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
}, Tn = ({ processName: e, websocketUrl: t, ourNode: r }) => {
  const { api: i, setApi: o, createService: a, deleteService: h, requestMyServices: v, setPeerMap: l, localServices: S, setLocalServices: m } = je();
  return ue(() => {
    const y = new ht({
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
    o(y);
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
                              onClick: (R) => {
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
                                window.confirm(`Are you sure you want to delete ${y.id.toString()}?`) && h(y.id.toString());
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
                        children: gn(y)
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
                access: Kt.Public,
                visibility: Zt.Visible,
                whitelist: [],
                publishUserPresence: !0,
                publishSubscribers: !0,
                publishSubscriberCount: !0,
                publishWhitelist: !1
              };
              a(C);
            },
            children: "create a service"
          }
        ) })
      ]
    }
  );
}, Pn = ({ service: e, onSubmit: t, availablePeers: r }) => {
  const [i, o] = re(e.meta.access), [a, h] = re(e.meta.visibility), [v, l] = re(e.meta.title), [S, m] = re(e.meta.description), [y, C] = re(e.meta.publish_user_presence), [R, I] = re(e.meta.publish_subscribers), [j, Y] = re(e.meta.publish_whitelist), [W, k] = re(e.meta.publish_subscriber_count), [P, F] = re(e.meta.whitelist), [b, T] = re(!1), [te, Q] = re(""), le = (E) => {
    o(E.target.value);
  }, ve = (E) => {
    h(E.target.value);
  }, oe = (E) => {
    F(P.filter((B) => B !== E));
  }, ge = (E) => {
    E === "custom" ? T(!0) : P.includes(E) || F([...P, E]);
  }, X = (E) => {
    Q(E.target.value);
  }, ne = () => {
    te && !P.includes(te) && (F([...P, te]), Q(""), T(!1));
  }, ie = () => {
    t({
      title: v || void 0,
      description: S || void 0,
      access: i,
      visibility: a,
      whitelist: P,
      publishUserPresence: y,
      publishSubscribers: R,
      publishWhitelist: j,
      publishSubscriberCount: W
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
              value: a,
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
              checked: R,
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
              checked: W,
              onChange: (E) => k(E.target.checked)
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
                  oe(E);
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
                  value: te,
                  onChange: X,
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
var nn = /* @__PURE__ */ ((e) => (e[e.Connecting = 0] = "Connecting", e[e.Connected = 1] = "Connected", e[e.Disconnected = 2] = "Disconnected", e))(nn || {});
class sn {
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
var ke = /* @__PURE__ */ ((e) => (e[e.Connecting = 0] = "Connecting", e[e.Connected = 1] = "Connected", e[e.Disconnected = 2] = "Disconnected", e[e.ServiceDoesNotExist = 3] = "ServiceDoesNotExist", e[e.Kicked = 4] = "Kicked", e[e.ServiceDeleted = 5] = "ServiceDeleted", e[e.AccessDenied = 6] = "AccessDenied", e))(ke || {});
class ht {
  constructor({
    our: t,
    websocket_url: r,
    onOpen: i = (j) => {
    },
    onClose: o = () => {
    },
    serviceId: a = null,
    onServiceConnectionStatusChange: h = (j) => {
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
    onLocalServicesChange: R = (j) => {
    },
    disableAutoReconnect: I = !1
  }) {
    this.api = null, this.peerMap = /* @__PURE__ */ new Map(), this.localServices = [], this.autoReconnectEnabled = !0, this.reconnectInterval = null, this.reconnectAttempts = 0, this.heartbeatInterval = null, this.our = t, this.websocket_url = r, this.onOpen = i, this.onClose = o, this.serviceId = a, this.onServiceConnectionStatusChange = h, this.onServiceMetadataChange = v, this.onFullServiceMetadataChange = l, this.onServiceMessage = S, this.onClientMessage = m, this.onProcessMessage = y, this.onPeerMapChange = C, this.onLocalServicesChange = R, this.autoReconnectEnabled = !I, this.initialize();
  }
  initialize() {
    if (console.log("puddle service api 1.0.1"), !(this.our.node && this.our.process))
      return;
    this.serviceMetadata = null, this.fullServiceMetadata = null, this.serviceConnectionStatus = null;
    const t = new _r({
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
    this.serviceConnectionStatus = new sn(t, Date.now()), this.onServiceConnectionStatusChange(this);
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
        const o = i.Peer;
        let a = Ut(o);
        this.peerMap.set(a.node, a), this.onPeerMapChange(this);
      } else if (i.PeerList) {
        const o = i.PeerList;
        for (const a of o) {
          let h = Ut(a);
          this.peerMap.set(h.node, h);
        }
        this.onPeerMapChange(this);
      } else if (i.MyServices) {
        const o = i.MyServices;
        let a = [];
        for (const h of o) {
          const v = on(h);
          a.push(v);
        }
        this.localServices = a, this.onLocalServicesChange(this);
      } else if (i.FromProcess) {
        const o = i.FromProcess, a = JSON.parse(o);
        this.onProcessMessage(a);
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
        const o = i.SubscribeNack;
        o === "ServiceDoesNotExist" ? this.setServiceConnectionStatus(
          3
          /* ServiceDoesNotExist */
        ) : o === "AccessDenied" && this.setServiceConnectionStatus(
          6
          /* AccessDenied */
        );
      } else if (i.Metadata) {
        const o = i.Metadata, a = ut(o);
        this.fullServiceMetadata = a, this.onFullServiceMetadataChange(this);
      } else if (i.PublicMetadata) {
        this.setServiceConnectionStatus(
          1
          /* Connected */
        );
        const o = i.PublicMetadata, a = Xt(o);
        this.serviceMetadata = a, this.onServiceMetadataChange(this);
        const h = [];
        a.user_presence && a.user_presence.forEach((v, l) => {
          this.peerMap.has(l) || (this.peerMap.set(l, Ve.new(l)), h.push(l));
        }), h.length > 0 && this.requestPeerList(h);
      } else if (i.Metadata) {
        const o = i.Metadata, a = ut(o);
        this.fullServiceMetadata = a, this.onFullServiceMetadataChange(this);
      } else if (i.Kick)
        i.Kick === "ServiceDeleted" && this.setServiceConnectionStatus(
          5
          /* ServiceDeleted */
        );
      else if (i.FromClient) {
        const o = JSON.parse(i.FromClient);
        this.onClientMessage(o);
      } else if (i.FromServer) {
        const o = JSON.parse(i.FromServer);
        this.onServiceMessage(o);
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
    const i = r[0], o = r.slice(1).join(":");
    return o ? new Te(i, o) : null;
  }
}
class Jt {
  constructor(t, r) {
    this.id = t, this.meta = r;
  }
  static new(t, r) {
    return new Jt(new Te(t, r), Ne.new());
  }
}
class Ne {
  constructor({
    title: t = void 0,
    description: r = void 0,
    last_sent_presence: i = null,
    subscribers: o = [],
    user_presence: a = /* @__PURE__ */ new Map(),
    access: h = "Public",
    visibility: v = "Visible",
    whitelist: l = [],
    publish_user_presence: S = !1,
    publish_subscribers: m = !1,
    publish_subscriber_count: y = !1,
    publish_whitelist: C = !1
  }) {
    this.title = t, this.description = r, this.last_sent_presence = i, this.subscribers = o, this.user_presence = a, this.access = h, this.visibility = v, this.whitelist = l, this.publish_user_presence = S, this.publish_subscribers = m, this.publish_subscriber_count = y, this.publish_whitelist = C;
  }
  static new() {
    return new Ne({});
  }
}
var Kt = /* @__PURE__ */ ((e) => (e.Public = "Public", e.Whitelist = "Whitelist", e.HostOnly = "HostOnly", e))(Kt || {}), Zt = /* @__PURE__ */ ((e) => (e.Visible = "Visible", e.HostOnly = "HostOnly", e.Hidden = "Hidden", e))(Zt || {});
function on(e) {
  return {
    id: new Te(e.id.name, e.id.address),
    meta: ut(e.meta)
  };
}
function ut(e) {
  return new Ne({
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
    meta: Xt(e.meta)
  };
}
function Xt(e) {
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
var cn = /* @__PURE__ */ ((e) => (e.Offline = "Offline", e.Private = "Private", e.Online = "Online", e.RecentlyOnline = "RecentlyOnline", e))(cn || {});
function ln(e) {
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
var un = /* @__PURE__ */ ((e) => (e.Public = "Public", e.Private = "Private", e))(un || {}), fn = /* @__PURE__ */ ((e) => (e.Red = "Red", e.Blue = "Blue", e.Green = "Green", e.Orange = "Orange", e.Purple = "Purple", e.Default = "Default", e))(fn || {});
function dn(e) {
  return new pt(
    e.bio,
    e.name_color,
    e.pfp
  );
}
class pt {
  constructor(t, r, i) {
    this.bio = t, this.nameColor = r, this.pfp = i;
  }
  static new(t) {
    return new pt("", "Default", void 0);
  }
}
class Ve {
  constructor(t, r = null, i = null, o = null) {
    this.node = t, this.peerData = r, this.outstandingRequest = i, this.lastUpdated = o;
  }
  static new(t) {
    return new Ve(
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
function Ut(e) {
  const t = e.peer_data ? {
    hostedServices: e.peer_data.hosted_services.map((r) => an(r)),
    profile: dn(e.peer_data.profile),
    activity: ln(e.peer_data.activity)
    // Use activityFromJson here
  } : null;
  return new Ve(
    e.node,
    t,
    e.outstanding_request || null,
    e.last_updated || null
  );
}
const hn = /^df:\/\/([a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)@([a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_]+):([a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+)$/;
function pn(e, t) {
  return `http://${t}/dartfrog:dartfrog:herobrine.os/join/${e.slice(5)}`;
}
function Yt(e, t) {
  return `http://${t}/dartfrog:dartfrog:herobrine.os/nodes/${e}`;
}
const Qt = "https://bwyl.nyc3.digitaloceanspaces.com/kinode/dartfrog/dartfrog256_small_nobg.png";
function Mn(e) {
  return e && e.peerData && e.peerData.profile.pfp ? e.peerData.profile.pfp : Qt;
}
function er(e) {
  return e && e.peerData ? vn(e.peerData.profile.nameColor) : "name-color-default";
}
function vn(e) {
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
function kn(e) {
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
function gn(e) {
  const t = /* @__PURE__ */ new Date();
  if (!e.meta.last_sent_presence)
    return "";
  const r = e.meta.last_sent_presence, i = t.getTime() - r * 1e3;
  return yn(i);
}
function yn(e) {
  if (e < 36e5) {
    const r = Math.floor(e / 6e4);
    return `${r} ${r === 1 ? "min" : "mins"} ago`;
  }
  if (e < 864e5) {
    const r = Math.floor(e / 36e5);
    return `${r} ${r === 1 ? "hr" : "hrs"} ago`;
  }
  if (e > 73072e5) {
    const r = Math.floor(e / 31536e6), i = Math.floor(e % 31536e6 / 2592e6);
    return `${r} ${r === 1 ? "yr" : "yrs"} ${i} ${i === 1 ? "month" : "months"} ago`;
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
    const o = (r.meta.last_sent_presence ?? 0) < t, a = (i.meta.last_sent_presence ?? 0) < t;
    if (!o && !a) {
      const m = r.meta.subscriber_count ?? ((l = r.meta.subscribers) == null ? void 0 : l.length) ?? 0, C = (i.meta.subscriber_count ?? ((S = i.meta.subscribers) == null ? void 0 : S.length) ?? 0) - m;
      if (C !== 0) return C;
    }
    const h = r.meta.last_sent_presence ?? 0;
    return (i.meta.last_sent_presence ?? 0) - h;
  });
}
const In = (e, t) => {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((i) => {
    const o = i.id.toString(), a = {
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
    r.set(o, a);
  }), t.forEach((i) => {
    const o = i.id.toString();
    r.has(o) || r.set(o, i);
  }), Array.from(r.values());
};
export {
  un as ActivitySetting,
  _n as AssemblyCapitalLogo,
  tn as ChatBox,
  zr as ChatHeader,
  $r as ChatInput,
  nn as ConnectionStatusType,
  Qt as DEFAULT_PFP,
  Fr as DisplayUserActivity,
  Pn as EditServiceForm,
  wn as HUB_NODE,
  On as HalfChat,
  Cn as HamburgerIcon,
  Ir as HomeIcon,
  Sn as IS_FAKE,
  fn as NameColor,
  Tn as NoServiceView,
  Ve as Peer,
  cn as PeerActivityType,
  jn as PlusIcon,
  pt as Profile,
  Jt as Service,
  Kt as ServiceAccess,
  ht as ServiceApi,
  sn as ServiceConnectionStatus,
  ke as ServiceConnectionStatusType,
  Te as ServiceID,
  Ne as ServiceMetadata,
  Rn as ServiceView,
  Zt as ServiceVisibility,
  Mt as Spinner,
  Nt as TopBar,
  En as XIcon,
  ln as activityFromJson,
  hn as dfLinkRegex,
  pn as dfLinkToRealLink,
  Mr as formatTimestamp,
  Dn as getAllServicesFromPeerMap,
  vn as getClassForNameColor,
  er as getPeerNameColor,
  Mn as getPeerPfp,
  yn as getRecencyText,
  gn as getServiceRecencyText,
  In as getUniqueServices,
  Ot as imageCommands,
  Tr as imageRegex,
  Pr as isImageUrl,
  Or as linkRegex,
  jr as maybePlaySoundEffect,
  Er as maybePlayTTS,
  Rr as maybeReplaceWithImage,
  Yt as nodeProfileLink,
  Ut as peerFromJson,
  dn as profileFromJson,
  an as publicServiceFromJson,
  Xt as publicServiceMetadataFromJson,
  on as serviceFromJson,
  ut as serviceMetadataFromJson,
  kn as serviceMetadataToEditOptions,
  An as sortServices,
  Rt as soundEffectCommands,
  je as useServiceStore
};
