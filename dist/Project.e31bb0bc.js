// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/gsap/TweenLite.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDispatcher = exports.TweenPlugin = exports.Power4 = exports.Power3 = exports.Power2 = exports.Power1 = exports.Power0 = exports.Linear = exports.Ease = exports.Animation = exports.SimpleTimeline = exports.globals = exports.default = exports.TweenLite = exports._gsScope = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * VERSION: 2.1.2
 * DATE: 2019-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */

/* ES6 changes:
	- declare and export _gsScope at top.
	- set var TweenLite = the result of the main function
	- export default TweenLite at the bottom
	- return TweenLite at the bottom of the main function
	- pass in _gsScope as the first parameter of the main function (which is actually at the bottom)
	- remove the "export to multiple environments" in Definition().
 */
var _gsScope = typeof window !== "undefined" ? window : typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : void 0 || {};

exports._gsScope = _gsScope;

var TweenLite = function (window) {
  "use strict";

  var _exports = {},
      _doc = window.document,
      _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;

  if (_globals.TweenLite) {
    return _globals.TweenLite; //in case the core set of classes is already loaded, don't instantiate twice.
  }

  var _namespace = function _namespace(ns) {
    var a = ns.split("."),
        p = _globals,
        i;

    for (i = 0; i < a.length; i++) {
      p[a[i]] = p = p[a[i]] || {};
    }

    return p;
  },
      gs = _namespace("com.greensock"),
      _tinyNum = 0.00000001,
      _slice = function _slice(a) {
    //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {}

    return b;
  },
      _emptyFunc = function _emptyFunc() {},
      _isArray = function () {
    //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
    var toString = Object.prototype.toString,
        array = toString.call([]);
    return function (obj) {
      return obj != null && (obj instanceof Array || _typeof(obj) === "object" && !!obj.push && toString.call(obj) === array);
    };
  }(),
      a,
      i,
      p,
      _ticker,
      _tickerActive,
      _defLookup = {},

  /**
   * @constructor
   * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
   * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
   * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
   * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
   *
   * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
   * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
   * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
   * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
   * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
   * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
   * sandbox the banner one like:
   *
   * <script>
   *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
   * </script>
   * <script src="js/greensock/v1.7/TweenMax.js"></script>
   * <script>
   *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
   * </script>
   * <script src="js/greensock/v1.6/TweenMax.js"></script>
   * <script>
   *     gs.TweenLite.to(...); //would use v1.7
   *     TweenLite.to(...); //would use v1.6
   * </script>
   *
   * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
   * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
   * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
   * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
   */
  Definition = function Definition(ns, dependencies, func, global) {
    this.sc = _defLookup[ns] ? _defLookup[ns].sc : []; //subclasses

    _defLookup[ns] = this;
    this.gsClass = null;
    this.func = func;
    var _classes = [];

    this.check = function (init) {
      var i = dependencies.length,
          missing = i,
          cur,
          a,
          n,
          cl;

      while (--i > -1) {
        if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
          _classes[i] = cur.gsClass;
          missing--;
        } else if (init) {
          cur.sc.push(this);
        }
      }

      if (missing === 0 && func) {
        a = ("com.greensock." + ns).split(".");
        n = a.pop();
        cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes); //exports to multiple environments

        if (global) {
          _globals[n] = _exports[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)

          /*
          if (typeof(module) !== "undefined" && module.exports) { //node
          	if (ns === moduleName) {
          		module.exports = _exports[moduleName] = cl;
          		for (i in _exports) {
          			cl[i] = _exports[i];
          		}
          	} else if (_exports[moduleName]) {
          		_exports[moduleName][n] = cl;
          	}
          } else if (typeof(define) === "function" && define.amd){ //AMD
          	define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
          }
          */
        }

        for (i = 0; i < this.sc.length; i++) {
          this.sc[i].check();
        }
      }
    };

    this.check(true);
  },
      //used to create Definition instances (which basically registers a class that has dependencies).
  _gsDefine = window._gsDefine = function (ns, dependencies, func, global) {
    return new Definition(ns, dependencies, func, global);
  },
      //a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
  _class = gs._class = function (ns, func, global) {
    func = func || function () {};

    _gsDefine(ns, [], function () {
      return func;
    }, global);

    return func;
  };

  _gsDefine.globals = _globals;
  /*
   * ----------------------------------------------------------------
   * Ease
   * ----------------------------------------------------------------
   */

  var _baseParams = [0, 0, 1, 1],
      Ease = _class("easing.Ease", function (func, extraParams, type, power) {
    this._func = func;
    this._type = type || 0;
    this._power = power || 0;
    this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
  }, true),
      _easeMap = Ease.map = {},
      _easeReg = Ease.register = function (ease, names, types, create) {
    var na = names.split(","),
        i = na.length,
        ta = (types || "easeIn,easeOut,easeInOut").split(","),
        e,
        name,
        j,
        type;

    while (--i > -1) {
      name = na[i];
      e = create ? _class("easing." + name, null, true) : gs.easing[name] || {};
      j = ta.length;

      while (--j > -1) {
        type = ta[j];
        _easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
      }
    }
  };

  p = Ease.prototype;
  p._calcEnd = false;

  p.getRatio = function (p) {
    if (this._func) {
      this._params[0] = p;
      return this._func.apply(null, this._params);
    }

    var t = this._type,
        pw = this._power,
        r = t === 1 ? 1 - p : t === 2 ? p : p < 0.5 ? p * 2 : (1 - p) * 2;

    if (pw === 1) {
      r *= r;
    } else if (pw === 2) {
      r *= r * r;
    } else if (pw === 3) {
      r *= r * r * r;
    } else if (pw === 4) {
      r *= r * r * r * r;
    }

    return t === 1 ? 1 - r : t === 2 ? r : p < 0.5 ? r / 2 : 1 - r / 2;
  }; //create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)


  a = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
  i = a.length;

  while (--i > -1) {
    p = a[i] + ",Power" + i;

    _easeReg(new Ease(null, null, 1, i), p, "easeOut", true);

    _easeReg(new Ease(null, null, 2, i), p, "easeIn" + (i === 0 ? ",easeNone" : ""));

    _easeReg(new Ease(null, null, 3, i), p, "easeInOut");
  }

  _easeMap.linear = gs.easing.Linear.easeIn;
  _easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks

  /*
   * ----------------------------------------------------------------
   * EventDispatcher
   * ----------------------------------------------------------------
   */

  var EventDispatcher = _class("events.EventDispatcher", function (target) {
    this._listeners = {};
    this._eventTarget = target || this;
  });

  p = EventDispatcher.prototype;

  p.addEventListener = function (type, callback, scope, useParam, priority) {
    priority = priority || 0;
    var list = this._listeners[type],
        index = 0,
        listener,
        i;

    if (this === _ticker && !_tickerActive) {
      _ticker.wake();
    }

    if (list == null) {
      this._listeners[type] = list = [];
    }

    i = list.length;

    while (--i > -1) {
      listener = list[i];

      if (listener.c === callback && listener.s === scope) {
        list.splice(i, 1);
      } else if (index === 0 && listener.pr < priority) {
        index = i + 1;
      }
    }

    list.splice(index, 0, {
      c: callback,
      s: scope,
      up: useParam,
      pr: priority
    });
  };

  p.removeEventListener = function (type, callback) {
    var list = this._listeners[type],
        i;

    if (list) {
      i = list.length;

      while (--i > -1) {
        if (list[i].c === callback) {
          list.splice(i, 1);
          return;
        }
      }
    }
  };

  p.dispatchEvent = function (type) {
    var list = this._listeners[type],
        i,
        t,
        listener;

    if (list) {
      i = list.length;

      if (i > 1) {
        list = list.slice(0); //in case addEventListener() is called from within a listener/callback (otherwise the index could change, resulting in a skip)
      }

      t = this._eventTarget;

      while (--i > -1) {
        listener = list[i];

        if (listener) {
          if (listener.up) {
            listener.c.call(listener.s || t, {
              type: type,
              target: t
            });
          } else {
            listener.c.call(listener.s || t);
          }
        }
      }
    }
  };
  /*
   * ----------------------------------------------------------------
   * Ticker
   * ----------------------------------------------------------------
   */


  var _reqAnimFrame = window.requestAnimationFrame,
      _cancelAnimFrame = window.cancelAnimationFrame,
      _getTime = Date.now || function () {
    return new Date().getTime();
  },
      _lastUpdate = _getTime(); //now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.


  a = ["ms", "moz", "webkit", "o"];
  i = a.length;

  while (--i > -1 && !_reqAnimFrame) {
    _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
    _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
  }

  _class("Ticker", function (fps, useRAF) {
    var _self = this,
        _startTime = _getTime(),
        _useRAF = useRAF !== false && _reqAnimFrame ? "auto" : false,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _tickWord = "tick",
        //helps reduce gc burden
    _fps,
        _req,
        _id,
        _gap,
        _nextTime,
        _tick = function _tick(manual) {
      var elapsed = _getTime() - _lastUpdate,
          overlap,
          dispatch;

      if (elapsed > _lagThreshold) {
        _startTime += elapsed - _adjustedLag;
      }

      _lastUpdate += elapsed;
      _self.time = (_lastUpdate - _startTime) / 1000;
      overlap = _self.time - _nextTime;

      if (!_fps || overlap > 0 || manual === true) {
        _self.frame++;
        _nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
        dispatch = true;
      }

      if (manual !== true) {
        //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
        _id = _req(_tick);
      }

      if (dispatch) {
        _self.dispatchEvent(_tickWord);
      }
    };

    EventDispatcher.call(_self);
    _self.time = _self.frame = 0;

    _self.tick = function () {
      _tick(true);
    };

    _self.lagSmoothing = function (threshold, adjustedLag) {
      if (!arguments.length) {
        //if lagSmoothing() is called with no arguments, treat it like a getter that returns a boolean indicating if it's enabled or not. This is purposely undocumented and is for internal use.
        return _lagThreshold < 1 / _tinyNum;
      }

      _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
    };

    _self.sleep = function () {
      if (_id == null) {
        return;
      }

      if (!_useRAF || !_cancelAnimFrame) {
        clearTimeout(_id);
      } else {
        _cancelAnimFrame(_id);
      }

      _req = _emptyFunc;
      _id = null;

      if (_self === _ticker) {
        _tickerActive = false;
      }
    };

    _self.wake = function (seamless) {
      if (_id !== null) {
        _self.sleep();
      } else if (seamless) {
        _startTime += -_lastUpdate + (_lastUpdate = _getTime());
      } else if (_self.frame > 10) {
        //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
        _lastUpdate = _getTime() - _lagThreshold + 5;
      }

      _req = _fps === 0 ? _emptyFunc : !_useRAF || !_reqAnimFrame ? function (f) {
        return setTimeout(f, (_nextTime - _self.time) * 1000 + 1 | 0);
      } : _reqAnimFrame;

      if (_self === _ticker) {
        _tickerActive = true;
      }

      _tick(2);
    };

    _self.fps = function (value) {
      if (!arguments.length) {
        return _fps;
      }

      _fps = value;
      _gap = 1 / (_fps || 60);
      _nextTime = this.time + _gap;

      _self.wake();
    };

    _self.useRAF = function (value) {
      if (!arguments.length) {
        return _useRAF;
      }

      _self.sleep();

      _useRAF = value;

      _self.fps(_fps);
    };

    _self.fps(fps); //a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.


    setTimeout(function () {
      if (_useRAF === "auto" && _self.frame < 5 && (_doc || {}).visibilityState !== "hidden") {
        _self.useRAF(false);
      }
    }, 1500);
  });

  p = gs.Ticker.prototype = new gs.events.EventDispatcher();
  p.constructor = gs.Ticker;
  /*
   * ----------------------------------------------------------------
   * Animation
   * ----------------------------------------------------------------
   */

  var Animation = _class("core.Animation", function (duration, vars) {
    this.vars = vars = vars || {};
    this._duration = this._totalDuration = duration || 0;
    this._delay = Number(vars.delay) || 0;
    this._timeScale = 1;
    this._active = !!vars.immediateRender;
    this.data = vars.data;
    this._reversed = !!vars.reversed;

    if (!_rootTimeline) {
      return;
    }

    if (!_tickerActive) {
      //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
      _ticker.wake();
    }

    var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
    tl.add(this, tl._time);

    if (this.vars.paused) {
      this.paused(true);
    }
  });

  _ticker = Animation.ticker = new gs.Ticker();
  p = Animation.prototype;
  p._dirty = p._gc = p._initted = p._paused = false;
  p._totalTime = p._time = 0;
  p._rawPrevTime = -1;
  p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
  p._paused = false; //some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.

  var _checkTimeout = function _checkTimeout() {
    if (_tickerActive && _getTime() - _lastUpdate > 2000 && ((_doc || {}).visibilityState !== "hidden" || !_ticker.lagSmoothing())) {
      //note: if the tab is hidden, we should still wake if lagSmoothing has been disabled.
      _ticker.wake();
    }

    var t = setTimeout(_checkTimeout, 2000);

    if (t.unref) {
      // allows a node process to exit even if the timeout’s callback hasn't been invoked. Without it, the node process could hang as this function is called every two seconds.
      t.unref();
    }
  };

  _checkTimeout();

  p.play = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.reversed(false).paused(false);
  };

  p.pause = function (atTime, suppressEvents) {
    if (atTime != null) {
      this.seek(atTime, suppressEvents);
    }

    return this.paused(true);
  };

  p.resume = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from, suppressEvents);
    }

    return this.paused(false);
  };

  p.seek = function (time, suppressEvents) {
    return this.totalTime(Number(time), suppressEvents !== false);
  };

  p.restart = function (includeDelay, suppressEvents) {
    return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, suppressEvents !== false, true);
  };

  p.reverse = function (from, suppressEvents) {
    if (from != null) {
      this.seek(from || this.totalDuration(), suppressEvents);
    }

    return this.reversed(true).paused(false);
  };

  p.render = function (time, suppressEvents, force) {//stub - we override this method in subclasses.
  };

  p.invalidate = function () {
    this._time = this._totalTime = 0;
    this._initted = this._gc = false;
    this._rawPrevTime = -1;

    if (this._gc || !this.timeline) {
      this._enabled(true);
    }

    return this;
  };

  p.isActive = function () {
    var tl = this._timeline,
        //the 2 root timelines won't have a _timeline; they're always active.
    startTime = this._startTime,
        rawTime;
    return !tl || !this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime(true)) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale - _tinyNum;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    this._gc = !enabled;
    this._active = this.isActive();

    if (ignoreTimeline !== true) {
      if (enabled && !this.timeline) {
        this._timeline.add(this, this._startTime - this._delay);
      } else if (!enabled && this.timeline) {
        this._timeline._remove(this, true);
      }
    }

    return false;
  };

  p._kill = function (vars, target) {
    return this._enabled(false, false);
  };

  p.kill = function (vars, target) {
    this._kill(vars, target);

    return this;
  };

  p._uncache = function (includeSelf) {
    var tween = includeSelf ? this : this.timeline;

    while (tween) {
      tween._dirty = true;
      tween = tween.timeline;
    }

    return this;
  };

  p._swapSelfInParams = function (params) {
    var i = params.length,
        copy = params.concat();

    while (--i > -1) {
      if (params[i] === "{self}") {
        copy[i] = this;
      }
    }

    return copy;
  };

  p._callback = function (type) {
    var v = this.vars,
        callback = v[type],
        params = v[type + "Params"],
        scope = v[type + "Scope"] || v.callbackScope || this,
        l = params ? params.length : 0;

    switch (l) {
      //speed optimization; call() is faster than apply() so use it when there are only a few parameters (which is by far most common). Previously we simply did var v = this.vars; v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
      case 0:
        callback.call(scope);
        break;

      case 1:
        callback.call(scope, params[0]);
        break;

      case 2:
        callback.call(scope, params[0], params[1]);
        break;

      default:
        callback.apply(scope, params);
    }
  }; //----Animation getters/setters --------------------------------------------------------


  p.eventCallback = function (type, callback, params, scope) {
    if ((type || "").substr(0, 2) === "on") {
      var v = this.vars;

      if (arguments.length === 1) {
        return v[type];
      }

      if (callback == null) {
        delete v[type];
      } else {
        v[type] = callback;
        v[type + "Params"] = _isArray(params) && params.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(params) : params;
        v[type + "Scope"] = scope;
      }

      if (type === "onUpdate") {
        this._onUpdate = callback;
      }
    }

    return this;
  };

  p.delay = function (value) {
    if (!arguments.length) {
      return this._delay;
    }

    if (this._timeline.smoothChildTiming) {
      this.startTime(this._startTime + value - this._delay);
    }

    this._delay = value;
    return this;
  };

  p.duration = function (value) {
    if (!arguments.length) {
      this._dirty = false;
      return this._duration;
    }

    this._duration = this._totalDuration = value;

    this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.


    if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
      this.totalTime(this._totalTime * (value / this._duration), true);
    }
    return this;
  };

  p.totalDuration = function (value) {
    this._dirty = false;
    return !arguments.length ? this._totalDuration : this.duration(value);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    return this.totalTime(value > this._duration ? this._duration : value, suppressEvents);
  };

  p.totalTime = function (time, suppressEvents, uncapped) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    if (!arguments.length) {
      return this._totalTime;
    }

    if (this._timeline) {
      if (time < 0 && !uncapped) {
        time += this.totalDuration();
      }

      if (this._timeline.smoothChildTiming) {
        if (this._dirty) {
          this.totalDuration();
        }

        var totalDuration = this._totalDuration,
            tl = this._timeline;

        if (time > totalDuration && !uncapped) {
          time = totalDuration;
        }

        this._startTime = (this._paused ? this._pauseTime : tl._time) - (!this._reversed ? time : totalDuration - time) / this._timeScale;

        if (!tl._dirty) {
          //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
          this._uncache(false);
        } //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.


        if (tl._timeline) {
          while (tl._timeline) {
            if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
              tl.totalTime(tl._totalTime, true);
            }

            tl = tl._timeline;
          }
        }
      }

      if (this._gc) {
        this._enabled(true, false);
      }

      if (this._totalTime !== time || this._duration === 0) {
        if (_lazyTweens.length) {
          _lazyRender();
        }

        this.render(time, suppressEvents, false);

        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
          _lazyRender();
        }
      }
    }

    return this;
  };

  p.progress = p.totalProgress = function (value, suppressEvents) {
    var duration = this.duration();
    return !arguments.length ? duration ? this._time / duration : this.ratio : this.totalTime(duration * value, suppressEvents);
  };

  p.startTime = function (value) {
    if (!arguments.length) {
      return this._startTime;
    }

    if (value !== this._startTime) {
      this._startTime = value;
      if (this.timeline) if (this.timeline._sortChildren) {
        this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
      }
    }

    return this;
  };

  p.endTime = function (includeRepeats) {
    return this._startTime + (includeRepeats != false ? this.totalDuration() : this.duration()) / this._timeScale;
  };

  p.timeScale = function (value) {
    if (!arguments.length) {
      return this._timeScale;
    }

    var pauseTime, t;
    value = value || _tinyNum; //can't allow zero because it'll throw the math off

    if (this._timeline && this._timeline.smoothChildTiming) {
      pauseTime = this._pauseTime;
      t = pauseTime || pauseTime === 0 ? pauseTime : this._timeline.totalTime();
      this._startTime = t - (t - this._startTime) * this._timeScale / value;
    }

    this._timeScale = value;
    t = this.timeline;

    while (t && t.timeline) {
      //must update the duration/totalDuration of all ancestor timelines immediately in case in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      t._dirty = true;
      t.totalDuration();
      t = t.timeline;
    }

    return this;
  };

  p.reversed = function (value) {
    if (!arguments.length) {
      return this._reversed;
    }

    if (value != this._reversed) {
      this._reversed = value;
      this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, true);
    }

    return this;
  };

  p.paused = function (value) {
    if (!arguments.length) {
      return this._paused;
    }

    var tl = this._timeline,
        raw,
        elapsed;
    if (value != this._paused) if (tl) {
      if (!_tickerActive && !value) {
        _ticker.wake();
      }

      raw = tl.rawTime();
      elapsed = raw - this._pauseTime;

      if (!value && tl.smoothChildTiming) {
        this._startTime += elapsed;

        this._uncache(false);
      }

      this._pauseTime = value ? raw : null;
      this._paused = value;
      this._active = this.isActive();

      if (!value && elapsed !== 0 && this._initted && this.duration()) {
        raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
        this.render(raw, raw === this._totalTime, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
      }
    }

    if (this._gc && !value) {
      this._enabled(true, false);
    }

    return this;
  };
  /*
   * ----------------------------------------------------------------
   * SimpleTimeline
   * ----------------------------------------------------------------
   */


  var SimpleTimeline = _class("core.SimpleTimeline", function (vars) {
    Animation.call(this, 0, vars);
    this.autoRemoveChildren = this.smoothChildTiming = true;
  });

  p = SimpleTimeline.prototype = new Animation();
  p.constructor = SimpleTimeline;
  p.kill()._gc = false;
  p._first = p._last = p._recent = null;
  p._sortChildren = false;

  p.add = p.insert = function (child, position, align, stagger) {
    var prevTween, st;
    child._startTime = Number(position || 0) + child._delay;
    if (child._paused) if (this !== child._timeline) {
      //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
      child._pauseTime = this.rawTime() - (child._timeline.rawTime() - child._pauseTime);
    }

    if (child.timeline) {
      child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.

    }

    child.timeline = child._timeline = this;

    if (child._gc) {
      child._enabled(true, true);
    }

    prevTween = this._last;

    if (this._sortChildren) {
      st = child._startTime;

      while (prevTween && prevTween._startTime > st) {
        prevTween = prevTween._prev;
      }
    }

    if (prevTween) {
      child._next = prevTween._next;
      prevTween._next = child;
    } else {
      child._next = this._first;
      this._first = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      this._last = child;
    }

    child._prev = prevTween;
    this._recent = child;

    if (this._timeline) {
      this._uncache(true);
    }

    return this;
  };

  p._remove = function (tween, skipDisable) {
    if (tween.timeline === this) {
      if (!skipDisable) {
        tween._enabled(false, true);
      }

      if (tween._prev) {
        tween._prev._next = tween._next;
      } else if (this._first === tween) {
        this._first = tween._next;
      }

      if (tween._next) {
        tween._next._prev = tween._prev;
      } else if (this._last === tween) {
        this._last = tween._prev;
      }

      tween._next = tween._prev = tween.timeline = null;

      if (tween === this._recent) {
        this._recent = this._last;
      }

      if (this._timeline) {
        this._uncache(true);
      }
    }

    return this;
  };

  p.render = function (time, suppressEvents, force) {
    var tween = this._first,
        next;
    this._totalTime = this._time = this._rawPrevTime = time;

    while (tween) {
      next = tween._next; //record it here because the value could change after rendering...

      if (tween._active || time >= tween._startTime && !tween._paused && !tween._gc) {
        if (!tween._reversed) {
          tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
        } else {
          tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
        }
      }

      tween = next;
    }
  };

  p.rawTime = function () {
    if (!_tickerActive) {
      _ticker.wake();
    }

    return this._totalTime;
  };
  /*
   * ----------------------------------------------------------------
   * TweenLite
   * ----------------------------------------------------------------
   */


  var TweenLite = _class("TweenLite", function (target, duration, vars) {
    Animation.call(this, duration, vars);
    this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)

    if (target == null) {
      throw "Cannot tween a null target.";
    }

    this.target = target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var isSelector = target.jquery || target.length && target !== window && target[0] && (target[0] === window || target[0].nodeType && target[0].style && !target.nodeType),
        overwrite = this.vars.overwrite,
        i,
        targ,
        targets;
    this._overwrite = overwrite = overwrite == null ? _overwriteLookup[TweenLite.defaultOverwrite] : typeof overwrite === "number" ? overwrite >> 0 : _overwriteLookup[overwrite];

    if ((isSelector || target instanceof Array || target.push && _isArray(target)) && typeof target[0] !== "number") {
      this._targets = targets = _slice(target); //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()

      this._propLookup = [];
      this._siblings = [];

      for (i = 0; i < targets.length; i++) {
        targ = targets[i];

        if (!targ) {
          targets.splice(i--, 1);
          continue;
        } else if (typeof targ === "string") {
          targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings

          if (typeof targ === "string") {
            targets.splice(i + 1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
          }

          continue;
        } else if (targ.length && targ !== window && targ[0] && (targ[0] === window || targ[0].nodeType && targ[0].style && !targ.nodeType)) {
          //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
          targets.splice(i--, 1);
          this._targets = targets = targets.concat(_slice(targ));
          continue;
        }

        this._siblings[i] = _register(targ, this, false);
        if (overwrite === 1) if (this._siblings[i].length > 1) {
          _applyOverwrite(targ, this, null, 1, this._siblings[i]);
        }
      }
    } else {
      this._propLookup = {};
      this._siblings = _register(target, this, false);
      if (overwrite === 1) if (this._siblings.length > 1) {
        _applyOverwrite(target, this, null, 1, this._siblings);
      }
    }

    if (this.vars.immediateRender || duration === 0 && this._delay === 0 && this.vars.immediateRender !== false) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      this.render(Math.min(0, -this._delay)); //in case delay is negative
    }
  }, true),
      _isSelector = function _isSelector(v) {
    return v && v.length && v !== window && v[0] && (v[0] === window || v[0].nodeType && v[0].style && !v.nodeType); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
  },
      _autoCSS = function _autoCSS(vars, target) {
    var css = {},
        p;

    for (p in vars) {
      if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || _plugins[p] && _plugins[p]._autoCSS)) {
        //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
        css[p] = vars[p];
        delete vars[p];
      }
    }

    vars.css = css;
  };

  p = TweenLite.prototype = new Animation();
  p.constructor = TweenLite;
  p.kill()._gc = false; //----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------

  p.ratio = 0;
  p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
  p._notifyPluginsOfEnabled = p._lazy = false;
  TweenLite.version = "2.1.2";
  TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
  TweenLite.defaultOverwrite = "auto";
  TweenLite.ticker = _ticker;
  TweenLite.autoSleep = 120;

  TweenLite.lagSmoothing = function (threshold, adjustedLag) {
    _ticker.lagSmoothing(threshold, adjustedLag);
  };

  TweenLite.selector = window.$ || window.jQuery || function (e) {
    var selector = window.$ || window.jQuery;

    if (selector) {
      TweenLite.selector = selector;
      return selector(e);
    }

    if (!_doc) {
      //in some dev environments (like Angular 6), GSAP gets loaded before the document is defined! So re-query it here if/when necessary.
      _doc = window.document;
    }

    return !_doc ? e : _doc.querySelectorAll ? _doc.querySelectorAll(e) : _doc.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
  };

  var _lazyTweens = [],
      _lazyLookup = {},
      _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
      _relExp = /[\+-]=-?[\.\d]/,
      //_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
  _setRatio = function _setRatio(v) {
    var pt = this._firstPT,
        min = 0.000001,
        val;

    while (pt) {
      val = !pt.blob ? pt.c * v + pt.s : v === 1 && this.end != null ? this.end : v ? this.join("") : this.start;

      if (pt.m) {
        val = pt.m.call(this._tween, val, this._target || pt.t, this._tween);
      } else if (val < min) if (val > -min && !pt.blob) {
        //prevents issues with converting very small numbers to strings in the browser
        val = 0;
      }

      if (!pt.f) {
        pt.t[pt.p] = val;
      } else if (pt.fp) {
        pt.t[pt.p](pt.fp, val);
      } else {
        pt.t[pt.p](val);
      }

      pt = pt._next;
    }
  },
      _blobRound = function _blobRound(v) {
    return (v * 1000 | 0) / 1000 + "";
  },
      //compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
  _blobDif = function _blobDif(start, end, filter, pt) {
    var a = [],
        charIndex = 0,
        s = "",
        color = 0,
        startNums,
        endNums,
        num,
        i,
        l,
        nonNumbers,
        currentNum;
    a.start = start;
    a.end = end;
    start = a[0] = start + ""; //ensure values are strings

    end = a[1] = end + "";

    if (filter) {
      filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }

    a.length = 0;
    startNums = start.match(_numbersExp) || [];
    endNums = end.match(_numbersExp) || [];

    if (pt) {
      pt._next = null;
      pt.blob = 1;
      a._firstPT = a._applyPT = pt; //apply last in the linked list (which means inserting it first)
    }

    l = endNums.length;

    for (i = 0; i < l; i++) {
      currentNum = endNums[i];
      nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex) - charIndex);
      s += nonNumbers || !i ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.

      charIndex += nonNumbers.length;

      if (color) {
        //sense rgba() values and round them.
        color = (color + 1) % 5;
      } else if (nonNumbers.substr(-5) === "rgba(") {
        color = 1;
      }

      if (currentNum === startNums[i] || startNums.length <= i) {
        s += currentNum;
      } else {
        if (s) {
          a.push(s);
          s = "";
        }

        num = parseFloat(startNums[i]);
        a.push(num);
        a._firstPT = {
          _next: a._firstPT,
          t: a,
          p: a.length - 1,
          s: num,
          c: (currentNum.charAt(1) === "=" ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : parseFloat(currentNum) - num) || 0,
          f: 0,
          m: color && color < 4 ? Math.round : _blobRound
        }; //limiting to 3 decimal places and casting as a string can really help performance when array.join() is called!
        //note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
      }

      charIndex += currentNum.length;
    }

    s += end.substr(charIndex);

    if (s) {
      a.push(s);
    }

    a.setRatio = _setRatio;

    if (_relExp.test(end)) {
      //if the end string contains relative values, delete it so that on the final render (in _setRatio()), we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
      a.end = null;
    }

    return a;
  },
      //note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
  _addPropTween = function _addPropTween(target, prop, start, end, overwriteProp, mod, funcParam, stringFilter, index) {
    if (typeof end === "function") {
      end = end(index || 0, target);
    }

    var type = _typeof(target[prop]),
        getterName = type !== "function" ? "" : prop.indexOf("set") || typeof target["get" + prop.substr(3)] !== "function" ? prop : "get" + prop.substr(3),
        s = start !== "get" ? start : !getterName ? target[prop] : funcParam ? target[getterName](funcParam) : target[getterName](),
        isRelative = typeof end === "string" && end.charAt(1) === "=",
        pt = {
      t: target,
      p: prop,
      s: s,
      f: type === "function",
      pg: 0,
      n: overwriteProp || prop,
      m: !mod ? 0 : typeof mod === "function" ? mod : Math.round,
      pr: 0,
      c: isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : parseFloat(end) - s || 0
    },
        blob;

    if (typeof s !== "number" || typeof end !== "number" && !isRelative) {
      if (funcParam || isNaN(s) || !isRelative && isNaN(end) || typeof s === "boolean" || typeof end === "boolean") {
        //a blob (string that has multiple numbers in it)
        pt.fp = funcParam;
        blob = _blobDif(s, isRelative ? parseFloat(pt.s) + pt.c + (pt.s + "").replace(/[0-9\-\.]/g, "") : end, stringFilter || TweenLite.defaultStringFilter, pt);
        pt = {
          t: blob,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 2,
          pg: 0,
          n: overwriteProp || prop,
          pr: 0,
          m: 0
        }; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
      } else {
        pt.s = parseFloat(s);

        if (!isRelative) {
          pt.c = parseFloat(end) - pt.s || 0;
        }
      }
    }

    if (pt.c) {
      //only add it to the linked list if there's a change.
      if (pt._next = this._firstPT) {
        pt._next._prev = pt;
      }

      this._firstPT = pt;
      return pt;
    }
  },
      _internals = TweenLite._internals = {
    isArray: _isArray,
    isSelector: _isSelector,
    lazyTweens: _lazyTweens,
    blobDif: _blobDif
  },
      //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
  _plugins = TweenLite._plugins = {},
      _tweenLookup = _internals.tweenLookup = {},
      _tweenLookupNum = 0,
      _reservedProps = _internals.reservedProps = {
    ease: 1,
    delay: 1,
    overwrite: 1,
    onComplete: 1,
    onCompleteParams: 1,
    onCompleteScope: 1,
    useFrames: 1,
    runBackwards: 1,
    startAt: 1,
    onUpdate: 1,
    onUpdateParams: 1,
    onUpdateScope: 1,
    onStart: 1,
    onStartParams: 1,
    onStartScope: 1,
    onReverseComplete: 1,
    onReverseCompleteParams: 1,
    onReverseCompleteScope: 1,
    onRepeat: 1,
    onRepeatParams: 1,
    onRepeatScope: 1,
    easeParams: 1,
    yoyo: 1,
    immediateRender: 1,
    repeat: 1,
    repeatDelay: 1,
    data: 1,
    paused: 1,
    reversed: 1,
    autoCSS: 1,
    lazy: 1,
    onOverwrite: 1,
    callbackScope: 1,
    stringFilter: 1,
    id: 1,
    yoyoEase: 1,
    stagger: 1
  },
      _overwriteLookup = {
    none: 0,
    all: 1,
    auto: 2,
    concurrent: 3,
    allOnStart: 4,
    preexisting: 5,
    "true": 1,
    "false": 0
  },
      _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
      _rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
      _nextGCFrame = 30,
      _lazyRender = _internals.lazyRender = function () {
    var l = _lazyTweens.length,
        i,
        tween;
    _lazyLookup = {};

    for (i = 0; i < l; i++) {
      tween = _lazyTweens[i];

      if (tween && tween._lazy !== false) {
        tween.render(tween._lazy[0], tween._lazy[1], true);
        tween._lazy = false;
      }
    }

    _lazyTweens.length = 0;
  };

  _rootTimeline._startTime = _ticker.time;
  _rootFramesTimeline._startTime = _ticker.frame;
  _rootTimeline._active = _rootFramesTimeline._active = true;
  setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".

  Animation._updateRoot = TweenLite.render = function () {
    var i, a, p;

    if (_lazyTweens.length) {
      //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
      _lazyRender();
    }

    _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);

    _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);

    if (_lazyTweens.length) {
      _lazyRender();
    }

    if (_ticker.frame >= _nextGCFrame) {
      //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
      _nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);

      for (p in _tweenLookup) {
        a = _tweenLookup[p].tweens;
        i = a.length;

        while (--i > -1) {
          if (a[i]._gc) {
            a.splice(i, 1);
          }
        }

        if (a.length === 0) {
          delete _tweenLookup[p];
        }
      } //if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly


      p = _rootTimeline._first;
      if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
        while (p && p._paused) {
          p = p._next;
        }

        if (!p) {
          _ticker.sleep();
        }
      }
    }
  };

  _ticker.addEventListener("tick", Animation._updateRoot);

  var _register = function _register(target, tween, scrub) {
    var id = target._gsTweenID,
        a,
        i;

    if (!_tweenLookup[id || (target._gsTweenID = id = "t" + _tweenLookupNum++)]) {
      _tweenLookup[id] = {
        target: target,
        tweens: []
      };
    }

    if (tween) {
      a = _tweenLookup[id].tweens;
      a[i = a.length] = tween;

      if (scrub) {
        while (--i > -1) {
          if (a[i] === tween) {
            a.splice(i, 1);
          }
        }
      }
    }

    return _tweenLookup[id].tweens;
  },
      _onOverwrite = function _onOverwrite(overwrittenTween, overwritingTween, target, killedProps) {
    var func = overwrittenTween.vars.onOverwrite,
        r1,
        r2;

    if (func) {
      r1 = func(overwrittenTween, overwritingTween, target, killedProps);
    }

    func = TweenLite.onOverwrite;

    if (func) {
      r2 = func(overwrittenTween, overwritingTween, target, killedProps);
    }

    return r1 !== false && r2 !== false;
  },
      _applyOverwrite = function _applyOverwrite(target, tween, props, mode, siblings) {
    var i, changed, curTween, l;

    if (mode === 1 || mode >= 4) {
      l = siblings.length;

      for (i = 0; i < l; i++) {
        if ((curTween = siblings[i]) !== tween) {
          if (!curTween._gc) {
            if (curTween._kill(null, target, tween)) {
              changed = true;
            }
          }
        } else if (mode === 5) {
          break;
        }
      }

      return changed;
    } //NOTE: Add tiny amount to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)


    var startTime = tween._startTime + _tinyNum,
        overlaps = [],
        oCount = 0,
        zeroDur = tween._duration === 0,
        globalStart;
    i = siblings.length;

    while (--i > -1) {
      if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {//ignore
      } else if (curTween._timeline !== tween._timeline) {
        globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);

        if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
          overlaps[oCount++] = curTween;
        }
      } else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= _tinyNum * 2)) {
        overlaps[oCount++] = curTween;
      }
    }

    i = oCount;

    while (--i > -1) {
      curTween = overlaps[i];
      l = curTween._firstPT; //we need to discern if there were property tweens originally; if they all get removed in the next line's _kill() call, the tween should be killed. See https://github.com/greensock/GreenSock-JS/issues/278

      if (mode === 2) if (curTween._kill(props, target, tween)) {
        changed = true;
      }

      if (mode !== 2 || !curTween._firstPT && curTween._initted && l) {
        if (mode !== 2 && !_onOverwrite(curTween, tween)) {
          continue;
        }

        if (curTween._enabled(false, false)) {
          //if all property tweens have been overwritten, kill the tween.
          changed = true;
        }
      }
    }

    return changed;
  },
      _checkOverlap = function _checkOverlap(tween, reference, zeroDur) {
    var tl = tween._timeline,
        ts = tl._timeScale,
        t = tween._startTime;

    while (tl._timeline) {
      t += tl._startTime;
      ts *= tl._timeScale;

      if (tl._paused) {
        return -100;
      }

      tl = tl._timeline;
    }

    t /= ts;
    return t > reference ? t - reference : zeroDur && t === reference || !tween._initted && t - reference < 2 * _tinyNum ? _tinyNum : (t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum ? 0 : t - reference - _tinyNum;
  }; //---- TweenLite instance methods -----------------------------------------------------------------------------


  p._init = function () {
    var v = this.vars,
        op = this._overwrittenProps,
        dur = this._duration,
        immediate = !!v.immediateRender,
        ease = v.ease,
        startAt = this._startAt,
        i,
        initPlugins,
        pt,
        p,
        startVars,
        l;

    if (v.startAt) {
      if (startAt) {
        startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.

        startAt.kill();
      }

      startVars = {};

      for (p in v.startAt) {
        //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
        startVars[p] = v.startAt[p];
      }

      startVars.data = "isStart";
      startVars.overwrite = false;
      startVars.immediateRender = true;
      startVars.lazy = immediate && v.lazy !== false;
      startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).

      startVars.onUpdate = v.onUpdate;
      startVars.onUpdateParams = v.onUpdateParams;
      startVars.onUpdateScope = v.onUpdateScope || v.callbackScope || this;
      this._startAt = TweenLite.to(this.target || {}, 0, startVars);

      if (immediate) {
        if (this._time > 0) {
          this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
        } else if (dur !== 0) {
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (v.runBackwards && dur !== 0) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (startAt) {
        startAt.render(-1, true);
        startAt.kill();
        this._startAt = null;
      } else {
        if (this._time !== 0) {
          //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
          immediate = false;
        }

        pt = {};

        for (p in v) {
          //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
          if (!_reservedProps[p] || p === "autoCSS") {
            pt[p] = v[p];
          }
        }

        pt.overwrite = 0;
        pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.

        pt.lazy = immediate && v.lazy !== false;
        pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)

        this._startAt = TweenLite.to(this.target, 0, pt);

        if (!immediate) {
          this._startAt._init(); //ensures that the initial values are recorded


          this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.


          if (this.vars.immediateRender) {
            this._startAt = null;
          }
        } else if (this._time === 0) {
          return;
        }
      }
    }

    this._ease = ease = !ease ? TweenLite.defaultEase : ease instanceof Ease ? ease : typeof ease === "function" ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;

    if (v.easeParams instanceof Array && ease.config) {
      this._ease = ease.config.apply(ease, v.easeParams);
    }

    this._easeType = this._ease._type;
    this._easePower = this._ease._power;
    this._firstPT = null;

    if (this._targets) {
      l = this._targets.length;

      for (i = 0; i < l; i++) {
        if (this._initProps(this._targets[i], this._propLookup[i] = {}, this._siblings[i], op ? op[i] : null, i)) {
          initPlugins = true;
        }
      }
    } else {
      initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op, 0);
    }

    if (initPlugins) {
      TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite

    }

    if (op) if (!this._firstPT) if (typeof this.target !== "function") {
      //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
      this._enabled(false, false);
    }

    if (v.runBackwards) {
      pt = this._firstPT;

      while (pt) {
        pt.s += pt.c;
        pt.c = -pt.c;
        pt = pt._next;
      }
    }

    this._onUpdate = v.onUpdate;
    this._initted = true;
  };

  p._initProps = function (target, propLookup, siblings, overwrittenProps, index) {
    var p, i, initPlugins, plugin, pt, v;

    if (target == null) {
      return false;
    }

    if (_lazyLookup[target._gsTweenID]) {
      _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

    }

    if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) {
      //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
      _autoCSS(this.vars, target);
    }

    for (p in this.vars) {
      v = this.vars[p];

      if (_reservedProps[p]) {
        if (v) if (v instanceof Array || v.push && _isArray(v)) if (v.join("").indexOf("{self}") !== -1) {
          this.vars[p] = v = this._swapSelfInParams(v, this);
        }
      } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this, index)) {
        //t - target 		[object]
        //p - property 		[string]
        //s - start			[number]
        //c - change		[number]
        //f - isFunction	[boolean]
        //n - name			[string]
        //pg - isPlugin 	[boolean]
        //pr - priority		[number]
        //m - mod           [function | 0]
        this._firstPT = pt = {
          _next: this._firstPT,
          t: plugin,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          n: p,
          pg: 1,
          pr: plugin._priority,
          m: 0
        };
        i = plugin._overwriteProps.length;

        while (--i > -1) {
          propLookup[plugin._overwriteProps[i]] = this._firstPT;
        }

        if (plugin._priority || plugin._onInitAllProps) {
          initPlugins = true;
        }

        if (plugin._onDisable || plugin._onEnable) {
          this._notifyPluginsOfEnabled = true;
        }

        if (pt._next) {
          pt._next._prev = pt;
        }
      } else {
        propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter, index);
      }
    }

    if (overwrittenProps) if (this._kill(overwrittenProps, target)) {
      //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
      this._kill(propLookup, target);

      return this._initProps(target, propLookup, siblings, overwrittenProps, index);
    }
    if (this._firstPT) if (this.vars.lazy !== false && this._duration || this.vars.lazy && !this._duration) {
      //zero duration tweens don't lazy render by default; everything else does.
      _lazyLookup[target._gsTweenID] = true;
    }
    return initPlugins;
  };

  p.render = function (time, suppressEvents, force) {
    var self = this,
        prevTime = self._time,
        duration = self._duration,
        prevRawPrevTime = self._rawPrevTime,
        isComplete,
        callback,
        pt,
        rawPrevTime;

    if (time >= duration - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = self._time = duration;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;

      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (self._initted || !self.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (self._startTime === self._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }

        if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;

      if (prevTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) if (self._initted || !self.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && self.data === "isPause")) {
            force = true;
          }

          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!self._initted || self._startAt && self._startAt.progress()) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately. Also, we check progress() because if startAt has already rendered at its end, we should force a render at its beginning. Otherwise, if you put the playhead directly on top of where a fromTo({immediateRender:false}) starts, and then move it backwards, the from() won't revert its values.
        force = true;
      }
    } else {
      self._totalTime = self._time = time;

      if (self._easeType) {
        var r = time / duration,
            type = self._easeType,
            pow = self._easePower;

        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }

        if (type === 3) {
          r *= 2;
        }

        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }

        self.ratio = type === 1 ? 1 - r : type === 2 ? r : time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else {
        self.ratio = self._ease.getRatio(time / duration);
      }
    }

    if (self._time === prevTime && !force) {
      return;
    } else if (!self._initted) {
      self._init();

      if (!self._initted || self._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        self._time = self._totalTime = prevTime;
        self._rawPrevTime = prevRawPrevTime;

        _lazyTweens.push(self);

        self._lazy = [time, suppressEvents];
        return;
      } //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.


      if (self._time && !isComplete) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && self._ease._calcEnd) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }

    if (self._lazy !== false) {
      //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
      self._lazy = false;
    }

    if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) {
      self._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTime === 0) {
      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (self.vars.onStart) if (self._time !== 0 || duration === 0) if (!suppressEvents) {
        self._callback("onStart");
      }
    }

    pt = self._firstPT;

    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }

      pt = pt._next;
    }

    if (self._onUpdate) {
      if (time < 0) if (self._startAt && time !== -0.0001) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

      }
      if (!suppressEvents) if (self._time !== prevTime || isComplete || force) {
        self._callback("onUpdate");
      }
    }

    if (callback) if (!self._gc || force) {
      //check _gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && self._startAt && !self._onUpdate && time !== -0.0001) {
        //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
        self._startAt.render(time, true, force);
      }

      if (isComplete) {
        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }

      if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        self._rawPrevTime = 0;
      }
    }
  };

  p._kill = function (vars, target, overwritingTween) {
    if (vars === "all") {
      vars = null;
    }

    if (vars == null) if (target == null || target === this.target) {
      this._lazy = false;
      return this._enabled(false, false);
    }
    target = typeof target !== "string" ? target || this._targets || this.target : TweenLite.selector(target) || target;
    var simultaneousOverwrite = overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline,
        firstPT = this._firstPT,
        i,
        overwrittenProps,
        p,
        pt,
        propLookup,
        changed,
        killProps,
        record,
        killed;

    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;

      while (--i > -1) {
        if (this._kill(vars, target[i], overwritingTween)) {
          changed = true;
        }
      }
    } else {
      if (this._targets) {
        i = this._targets.length;

        while (--i > -1) {
          if (target === this._targets[i]) {
            propLookup = this._propLookup[i] || {};
            this._overwrittenProps = this._overwrittenProps || [];
            overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
            break;
          }
        }
      } else if (target !== this.target) {
        return false;
      } else {
        propLookup = this._propLookup;
        overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
      }

      if (propLookup) {
        killProps = vars || propLookup;
        record = vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (_typeof(vars) !== "object" || !vars._tempKill); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)

        if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
          for (p in killProps) {
            if (propLookup[p]) {
              if (!killed) {
                killed = [];
              }

              killed.push(p);
            }
          }

          if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) {
            //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
            return false;
          }
        }

        for (p in killProps) {
          if (pt = propLookup[p]) {
            if (simultaneousOverwrite) {
              //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
              if (pt.f) {
                pt.t[pt.p](pt.s);
              } else {
                pt.t[pt.p] = pt.s;
              }

              changed = true;
            }

            if (pt.pg && pt.t._kill(killProps)) {
              changed = true; //some plugins need to be notified so they can perform cleanup tasks first
            }

            if (!pt.pg || pt.t._overwriteProps.length === 0) {
              if (pt._prev) {
                pt._prev._next = pt._next;
              } else if (pt === this._firstPT) {
                this._firstPT = pt._next;
              }

              if (pt._next) {
                pt._next._prev = pt._prev;
              }

              pt._next = pt._prev = null;
            }

            delete propLookup[p];
          }

          if (record) {
            overwrittenProps[p] = 1;
          }
        }

        if (!this._firstPT && this._initted && firstPT) {
          //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
          this._enabled(false, false);
        }
      }
    }

    return changed;
  };

  p.invalidate = function () {
    if (this._notifyPluginsOfEnabled) {
      TweenLite._onPluginEvent("_onDisable", this);
    }

    var t = this._time;
    this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
    this._notifyPluginsOfEnabled = this._active = this._lazy = false;
    this._propLookup = this._targets ? {} : [];
    Animation.prototype.invalidate.call(this);

    if (this.vars.immediateRender) {
      this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      this.render(t, false, this.vars.lazy !== false);
    }

    return this;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (!_tickerActive) {
      _ticker.wake();
    }

    if (enabled && this._gc) {
      var targets = this._targets,
          i;

      if (targets) {
        i = targets.length;

        while (--i > -1) {
          this._siblings[i] = _register(targets[i], this, true);
        }
      } else {
        this._siblings = _register(this.target, this, true);
      }
    }

    Animation.prototype._enabled.call(this, enabled, ignoreTimeline);

    if (this._notifyPluginsOfEnabled) if (this._firstPT) {
      return TweenLite._onPluginEvent(enabled ? "_onEnable" : "_onDisable", this);
    }
    return false;
  }; //----TweenLite static methods -----------------------------------------------------


  TweenLite.to = function (target, duration, vars) {
    return new TweenLite(target, duration, vars);
  };

  TweenLite.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenLite(target, duration, vars);
  };

  TweenLite.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenLite(target, duration, toVars);
  };

  TweenLite.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenLite(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      lazy: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };

  TweenLite.set = function (target, vars) {
    return new TweenLite(target, 0, vars);
  };

  TweenLite.getTweensOf = function (target, onlyActive) {
    if (target == null) {
      return [];
    }

    target = typeof target !== "string" ? target : TweenLite.selector(target) || target;
    var i, a, j, t;

    if ((_isArray(target) || _isSelector(target)) && typeof target[0] !== "number") {
      i = target.length;
      a = [];

      while (--i > -1) {
        a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
      }

      i = a.length; //now get rid of any duplicates (tweens of arrays of objects could cause duplicates)

      while (--i > -1) {
        t = a[i];
        j = i;

        while (--j > -1) {
          if (t === a[j]) {
            a.splice(i, 1);
          }
        }
      }
    } else if (target._gsTweenID) {
      a = _register(target).concat();
      i = a.length;

      while (--i > -1) {
        if (a[i]._gc || onlyActive && !a[i].isActive()) {
          a.splice(i, 1);
        }
      }
    }

    return a || [];
  };

  TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function (target, onlyActive, vars) {
    if (_typeof(onlyActive) === "object") {
      vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)

      onlyActive = false;
    }

    var a = TweenLite.getTweensOf(target, onlyActive),
        i = a.length;

    while (--i > -1) {
      a[i]._kill(vars, target);
    }
  };
  /*
   * ----------------------------------------------------------------
   * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
   * ----------------------------------------------------------------
   */


  var TweenPlugin = _class("plugins.TweenPlugin", function (props, priority) {
    this._overwriteProps = (props || "").split(",");
    this._propName = this._overwriteProps[0];
    this._priority = priority || 0;
    this._super = TweenPlugin.prototype;
  }, true);

  p = TweenPlugin.prototype;
  TweenPlugin.version = "1.19.0";
  TweenPlugin.API = 2;
  p._firstPT = null;
  p._addTween = _addPropTween;
  p.setRatio = _setRatio;

  p._kill = function (lookup) {
    var a = this._overwriteProps,
        pt = this._firstPT,
        i;

    if (lookup[this._propName] != null) {
      this._overwriteProps = [];
    } else {
      i = a.length;

      while (--i > -1) {
        if (lookup[a[i]] != null) {
          a.splice(i, 1);
        }
      }
    }

    while (pt) {
      if (lookup[pt.n] != null) {
        if (pt._next) {
          pt._next._prev = pt._prev;
        }

        if (pt._prev) {
          pt._prev._next = pt._next;
          pt._prev = null;
        } else if (this._firstPT === pt) {
          this._firstPT = pt._next;
        }
      }

      pt = pt._next;
    }

    return false;
  };

  p._mod = p._roundProps = function (lookup) {
    var pt = this._firstPT,
        val;

    while (pt) {
      val = lookup[this._propName] || pt.n != null && lookup[pt.n.split(this._propName + "_").join("")];

      if (val && typeof val === "function") {
        //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
        if (pt.f === 2) {
          pt.t._applyPT.m = val;
        } else {
          pt.m = val;
        }
      }

      pt = pt._next;
    }
  };

  TweenLite._onPluginEvent = function (type, tween) {
    var pt = tween._firstPT,
        changed,
        pt2,
        first,
        last,
        next;

    if (type === "_onInitAllProps") {
      //sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
      while (pt) {
        next = pt._next;
        pt2 = first;

        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }

        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }

        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }

        pt = next;
      }

      pt = tween._firstPT = first;
    }

    while (pt) {
      if (pt.pg) if (typeof pt.t[type] === "function") if (pt.t[type]()) {
        changed = true;
      }
      pt = pt._next;
    }

    return changed;
  };

  TweenPlugin.activate = function (plugins) {
    var i = plugins.length;

    while (--i > -1) {
      if (plugins[i].API === TweenPlugin.API) {
        _plugins[new plugins[i]()._propName] = plugins[i];
      }
    }

    return true;
  }; //provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.


  _gsDefine.plugin = function (config) {
    if (!config || !config.propName || !config.init || !config.API) {
      throw "illegal plugin definition.";
    }

    var propName = config.propName,
        priority = config.priority || 0,
        overwriteProps = config.overwriteProps,
        map = {
      init: "_onInitTween",
      set: "setRatio",
      kill: "_kill",
      round: "_mod",
      mod: "_mod",
      initAll: "_onInitAllProps"
    },
        Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin", function () {
      TweenPlugin.call(this, propName, priority);
      this._overwriteProps = overwriteProps || [];
    }, config.global === true),
        p = Plugin.prototype = new TweenPlugin(propName),
        prop;

    p.constructor = Plugin;
    Plugin.API = config.API;

    for (prop in map) {
      if (typeof config[prop] === "function") {
        p[map[prop]] = config[prop];
      }
    }

    Plugin.version = config.version;
    TweenPlugin.activate([Plugin]);
    return Plugin;
  }; //now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.


  a = window._gsQueue;

  if (a) {
    for (i = 0; i < a.length; i++) {
      a[i]();
    }

    for (p in _defLookup) {
      if (!_defLookup[p].func) {
        window.console.log("GSAP encountered missing dependency: " + p);
      }
    }
  }

  _tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated

  return TweenLite;
}(_gsScope, "TweenLite");

exports.default = exports.TweenLite = TweenLite;
var globals = _gsScope.GreenSockGlobals;
exports.globals = globals;
var nonGlobals = globals.com.greensock;
var SimpleTimeline = nonGlobals.core.SimpleTimeline;
exports.SimpleTimeline = SimpleTimeline;
var Animation = nonGlobals.core.Animation;
exports.Animation = Animation;
var Ease = globals.Ease;
exports.Ease = Ease;
var Linear = globals.Linear;
exports.Linear = Linear;
var Power0 = Linear;
exports.Power0 = Power0;
var Power1 = globals.Power1;
exports.Power1 = Power1;
var Power2 = globals.Power2;
exports.Power2 = Power2;
var Power3 = globals.Power3;
exports.Power3 = Power3;
var Power4 = globals.Power4;
exports.Power4 = Power4;
var TweenPlugin = globals.TweenPlugin;
exports.TweenPlugin = TweenPlugin;
var EventDispatcher = nonGlobals.events.EventDispatcher;
exports.EventDispatcher = EventDispatcher;
},{}],"node_modules/gsap/TweenMaxBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
exports.TweenMaxBase = exports.default = exports.TweenMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
  var _slice = function _slice(a) {
    //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {
      ;
    }

    return b;
  },
      _applyCycle = function _applyCycle(vars, targets, i) {
    var alt = vars.cycle,
        p,
        val;

    for (p in alt) {
      val = alt[p];
      vars[p] = typeof val === "function" ? val(i, targets[i], targets) : val[i % val.length];
    }

    delete vars.cycle;
  },
      //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  _distribute = function _distribute(v) {
    if (typeof v === "function") {
      return v;
    }

    var vars = _typeof(v) === "object" ? v : {
      each: v
    },
        //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = vars.ease,
        from = vars.from || 0,
        base = vars.base || 0,
        cache = {},
        isFromKeyword = isNaN(from),
        axis = vars.axis,
        ratio = {
      center: 0.5,
      end: 1
    }[from] || 0;
    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrap;

      if (!distances) {
        wrap = vars.grid === "auto" ? 0 : (vars.grid || [Infinity])[0];

        if (!wrap) {
          max = -Infinity;

          while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) {}

          wrap--;
        }

        distances = cache[l] = [];
        originX = isFromKeyword ? Math.min(wrap, l) * ratio - 0.5 : from % wrap;
        originY = isFromKeyword ? l * ratio / wrap - 0.5 : from / wrap | 0;
        max = 0;
        min = Infinity;

        for (j = 0; j < l; j++) {
          x = j % wrap - originX;
          y = originY - (j / wrap | 0);
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);

          if (d > max) {
            max = d;
          }

          if (d < min) {
            min = d;
          }
        }

        distances.max = max - min;
        distances.min = min;
        distances.v = l = vars.amount || vars.each * (wrap > l ? l : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap) || 0;
        distances.b = l < 0 ? base - l : base;
      }

      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  },
      TweenMax = function TweenMax(target, duration, vars) {
    _TweenLite.default.call(this, target, duration, vars);

    this._cycle = 0;
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;

    if (this._repeat) {
      this._uncache(true); //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.

    }

    this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
  },
      _tinyNum = 0.00000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _isSelector = TweenLiteInternals.isSelector,
      _isArray = TweenLiteInternals.isArray,
      p = TweenMax.prototype = _TweenLite.default.to({}, 0.1, {}),
      _blankArray = [];

  TweenMax.version = "2.1.2";
  p.constructor = TweenMax;
  p.kill()._gc = false;
  TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = _TweenLite.default.killTweensOf;
  TweenMax.getTweensOf = _TweenLite.default.getTweensOf;
  TweenMax.lagSmoothing = _TweenLite.default.lagSmoothing;
  TweenMax.ticker = _TweenLite.default.ticker;
  TweenMax.render = _TweenLite.default.render;
  TweenMax.distribute = _distribute;

  p.invalidate = function () {
    this._yoyo = this.vars.yoyo === true || !!this.vars.yoyoEase;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._yoyoEase = null;

    this._uncache(true);

    return _TweenLite.default.prototype.invalidate.call(this);
  };

  p.updateTo = function (vars, resetDuration) {
    var self = this,
        curRatio = self.ratio,
        immediate = self.vars.immediateRender || vars.immediateRender,
        p;

    if (resetDuration && self._startTime < self._timeline._time) {
      self._startTime = self._timeline._time;

      self._uncache(false);

      if (self._gc) {
        self._enabled(true, false);
      } else {
        self._timeline.insert(self, self._startTime - self._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.

      }
    }

    for (p in vars) {
      self.vars[p] = vars[p];
    }

    if (self._initted || immediate) {
      if (resetDuration) {
        self._initted = false;

        if (immediate) {
          self.render(0, true, true);
        }
      } else {
        if (self._gc) {
          self._enabled(true, false);
        }

        if (self._notifyPluginsOfEnabled && self._firstPT) {
          _TweenLite.default._onPluginEvent("_onDisable", self); //in case a plugin like MotionBlur must perform some cleanup tasks

        }

        if (self._time / self._duration > 0.998) {
          //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards.
          var prevTime = self._totalTime;
          self.render(0, true, false);
          self._initted = false;
          self.render(prevTime, true, false);
        } else {
          self._initted = false;

          self._init();

          if (self._time > 0 || immediate) {
            var inv = 1 / (1 - curRatio),
                pt = self._firstPT,
                endValue;

            while (pt) {
              endValue = pt.s + pt.c;
              pt.c *= inv;
              pt.s = endValue - pt.c;
              pt = pt._next;
            }
          }
        }
      }
    }

    return self;
  };

  p.render = function (time, suppressEvents, force) {
    if (!this._initted) if (this._duration === 0 && this.vars.repeat) {
      //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
      this.invalidate();
    }
    var self = this,
        totalDur = !self._dirty ? self._totalDuration : self.totalDuration(),
        prevTime = self._time,
        prevTotalTime = self._totalTime,
        prevCycle = self._cycle,
        duration = self._duration,
        prevRawPrevTime = self._rawPrevTime,
        isComplete,
        callback,
        pt,
        cycleDuration,
        r,
        type,
        pow,
        rawPrevTime,
        yoyoEase;

    if (time >= totalDur - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = totalDur;
      self._cycle = self._repeat;

      if (self._yoyo && (self._cycle & 1) !== 0) {
        self._time = 0;
        self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;
      } else {
        self._time = duration;
        self.ratio = self._ease._calcEnd ? self._ease.getRatio(1) : 1;
      }

      if (!self._reversed) {
        isComplete = true;
        callback = "onComplete";
        force = force || self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
      }

      if (duration === 0) if (self._initted || !self.vars.lazy || force) {
        //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
        if (self._startTime === self._timeline._duration) {
          //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
          time = 0;
        }

        if (prevRawPrevTime < 0 || time <= 0 && time >= -_tinyNum || prevRawPrevTime === _tinyNum && self.data !== "isPause") if (prevRawPrevTime !== time) {
          //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
          force = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
        self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = self._cycle = 0;
      self.ratio = self._ease._calcEnd ? self._ease.getRatio(0) : 0;

      if (prevTotalTime !== 0 || duration === 0 && prevRawPrevTime > 0) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time > -_tinyNum) {
        time = 0;
      } else if (time < 0) {
        self._active = false;
        if (duration === 0) if (self._initted || !self.vars.lazy || force) {
          //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
          if (prevRawPrevTime >= 0) {
            force = true;
          }

          self._rawPrevTime = rawPrevTime = !suppressEvents || time || prevRawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
        }
      }

      if (!self._initted) {
        //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        force = true;
      }
    } else {
      self._totalTime = self._time = time;

      if (self._repeat !== 0) {
        cycleDuration = duration + self._repeatDelay;
        self._cycle = self._totalTime / cycleDuration >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (self._cycle !== 0) if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) {
          self._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
        }
        self._time = self._totalTime - self._cycle * cycleDuration;
        if (self._yoyo) if ((self._cycle & 1) !== 0) {
          self._time = duration - self._time;
          yoyoEase = self._yoyoEase || self.vars.yoyoEase; //note: we don't set this._yoyoEase in _init() like we do other properties because it's TweenMax-specific and doing it here allows us to optimize performance (most tweens don't have a yoyoEase). Note that we also must skip the this.ratio calculation further down right after we _init() in this function, because we're doing it here.

          if (yoyoEase) {
            if (!self._yoyoEase) {
              if (yoyoEase === true && !self._initted) {
                //if it's not initted and yoyoEase is true, this._ease won't have been populated yet so we must discern it here.
                yoyoEase = self.vars.ease;
                self._yoyoEase = yoyoEase = !yoyoEase ? _TweenLite.default.defaultEase : yoyoEase instanceof _TweenLite.Ease ? yoyoEase : typeof yoyoEase === "function" ? new _TweenLite.Ease(yoyoEase, self.vars.easeParams) : _TweenLite.Ease.map[yoyoEase] || _TweenLite.default.defaultEase;
              } else {
                self._yoyoEase = yoyoEase = yoyoEase === true ? self._ease : yoyoEase instanceof _TweenLite.Ease ? yoyoEase : _TweenLite.Ease.map[yoyoEase];
              }
            }

            self.ratio = yoyoEase ? 1 - yoyoEase.getRatio((duration - self._time) / duration) : 0;
          }
        }

        if (self._time > duration) {
          self._time = duration;
        } else if (self._time < 0) {
          self._time = 0;
        }
      }

      if (self._easeType && !yoyoEase) {
        r = self._time / duration;
        type = self._easeType;
        pow = self._easePower;

        if (type === 1 || type === 3 && r >= 0.5) {
          r = 1 - r;
        }

        if (type === 3) {
          r *= 2;
        }

        if (pow === 1) {
          r *= r;
        } else if (pow === 2) {
          r *= r * r;
        } else if (pow === 3) {
          r *= r * r * r;
        } else if (pow === 4) {
          r *= r * r * r * r;
        }

        self.ratio = type === 1 ? 1 - r : type === 2 ? r : self._time / duration < 0.5 ? r / 2 : 1 - r / 2;
      } else if (!yoyoEase) {
        self.ratio = self._ease.getRatio(self._time / duration);
      }
    }

    if (prevTime === self._time && !force && prevCycle === self._cycle) {
      if (prevTotalTime !== self._totalTime) if (self._onUpdate) if (!suppressEvents) {
        //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
        self._callback("onUpdate");
      }
      return;
    } else if (!self._initted) {
      self._init();

      if (!self._initted || self._gc) {
        //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
        return;
      } else if (!force && self._firstPT && (self.vars.lazy !== false && self._duration || self.vars.lazy && !self._duration)) {
        //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
        self._time = prevTime;
        self._totalTime = prevTotalTime;
        self._rawPrevTime = prevRawPrevTime;
        self._cycle = prevCycle;
        TweenLiteInternals.lazyTweens.push(self);
        self._lazy = [time, suppressEvents];
        return;
      } //_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.


      if (self._time && !isComplete && !yoyoEase) {
        self.ratio = self._ease.getRatio(self._time / duration);
      } else if (isComplete && this._ease._calcEnd && !yoyoEase) {
        self.ratio = self._ease.getRatio(self._time === 0 ? 0 : 1);
      }
    }

    if (self._lazy !== false) {
      self._lazy = false;
    }

    if (!self._active) if (!self._paused && self._time !== prevTime && time >= 0) {
      self._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
    }

    if (prevTotalTime === 0) {
      if (self._initted === 2 && time > 0) {
        self._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true

      }

      if (self._startAt) {
        if (time >= 0) {
          self._startAt.render(time, true, force);
        } else if (!callback) {
          callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
        }
      }

      if (self.vars.onStart) if (self._totalTime !== 0 || duration === 0) if (!suppressEvents) {
        self._callback("onStart");
      }
    }

    pt = self._firstPT;

    while (pt) {
      if (pt.f) {
        pt.t[pt.p](pt.c * self.ratio + pt.s);
      } else {
        pt.t[pt.p] = pt.c * self.ratio + pt.s;
      }

      pt = pt._next;
    }

    if (self._onUpdate) {
      if (time < 0) if (self._startAt && self._startTime) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

      }
      if (!suppressEvents) if (self._totalTime !== prevTotalTime || callback) {
        self._callback("onUpdate");
      }
    }

    if (self._cycle !== prevCycle) if (!suppressEvents) if (!self._gc) if (self.vars.onRepeat) {
      self._callback("onRepeat");
    }
    if (callback) if (!self._gc || force) {
      //check gc because there's a chance that kill() could be called in an onUpdate
      if (time < 0 && self._startAt && !self._onUpdate && self._startTime) {
        //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
        self._startAt.render(time, true, force);
      }

      if (isComplete) {
        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }

      if (duration === 0 && self._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) {
        //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
        self._rawPrevTime = 0;
      }
    }
  }; //---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------


  TweenMax.to = function (target, duration, vars) {
    return new TweenMax(target, duration, vars);
  };

  TweenMax.from = function (target, duration, vars) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return new TweenMax(target, duration, vars);
  };

  TweenMax.fromTo = function (target, duration, fromVars, toVars) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return new TweenMax(target, duration, toVars);
  };

  TweenMax.staggerTo = TweenMax.allTo = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var a = [],
        staggerFunc = _distribute(vars.stagger || stagger),
        cycle = vars.cycle,
        fromCycle = (vars.startAt || _blankArray).cycle,
        l,
        copy,
        i,
        p;

    if (!_isArray(targets)) {
      if (typeof targets === "string") {
        targets = _TweenLite.default.selector(targets) || targets;
      }

      if (_isSelector(targets)) {
        targets = _slice(targets);
      }
    }

    targets = targets || [];
    l = targets.length - 1;

    for (i = 0; i <= l; i++) {
      copy = {};

      for (p in vars) {
        copy[p] = vars[p];
      }

      if (cycle) {
        _applyCycle(copy, targets, i);

        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }

      if (fromCycle) {
        fromCycle = copy.startAt = {};

        for (p in vars.startAt) {
          fromCycle[p] = vars.startAt[p];
        }

        _applyCycle(copy.startAt, targets, i);
      }

      copy.delay = staggerFunc(i, targets[i], targets) + (copy.delay || 0);

      if (i === l && onCompleteAll) {
        copy.onComplete = function () {
          if (vars.onComplete) {
            vars.onComplete.apply(vars.onCompleteScope || this, arguments);
          }

          onCompleteAll.apply(onCompleteAllScope || vars.callbackScope || this, onCompleteAllParams || _blankArray);
        };
      }

      a[i] = new TweenMax(targets[i], duration, copy);
    }

    return a;
  };

  TweenMax.staggerFrom = TweenMax.allFrom = function (targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    vars.immediateRender = vars.immediateRender != false;
    return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  TweenMax.staggerFromTo = TweenMax.allFromTo = function (targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    toVars.immediateRender = toVars.immediateRender != false && fromVars.immediateRender != false;
    return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  TweenMax.delayedCall = function (delay, callback, params, scope, useFrames) {
    return new TweenMax(callback, 0, {
      delay: delay,
      onComplete: callback,
      onCompleteParams: params,
      callbackScope: scope,
      onReverseComplete: callback,
      onReverseCompleteParams: params,
      immediateRender: false,
      useFrames: useFrames,
      overwrite: 0
    });
  };

  TweenMax.set = function (target, vars) {
    return new TweenMax(target, 0, vars);
  };

  TweenMax.isTweening = function (target) {
    return _TweenLite.default.getTweensOf(target, true).length > 0;
  };

  var _getChildrenOf = function _getChildrenOf(timeline, includeTimelines) {
    var a = [],
        cnt = 0,
        tween = timeline._first;

    while (tween) {
      if (tween instanceof _TweenLite.default) {
        a[cnt++] = tween;
      } else {
        if (includeTimelines) {
          a[cnt++] = tween;
        }

        a = a.concat(_getChildrenOf(tween, includeTimelines));
        cnt = a.length;
      }

      tween = tween._next;
    }

    return a;
  },
      getAllTweens = TweenMax.getAllTweens = function (includeTimelines) {
    return _getChildrenOf(_TweenLite.Animation._rootTimeline, includeTimelines).concat(_getChildrenOf(_TweenLite.Animation._rootFramesTimeline, includeTimelines));
  };

  TweenMax.killAll = function (complete, tweens, delayedCalls, timelines) {
    if (tweens == null) {
      tweens = true;
    }

    if (delayedCalls == null) {
      delayedCalls = true;
    }

    var a = getAllTweens(timelines != false),
        l = a.length,
        allTrue = tweens && delayedCalls && timelines,
        isDC,
        tween,
        i;

    for (i = 0; i < l; i++) {
      tween = a[i];

      if (allTrue || tween instanceof _TweenLite.SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        if (complete) {
          tween.totalTime(tween._reversed ? 0 : tween.totalDuration());
        } else {
          tween._enabled(false, false);
        }
      }
    }
  };

  TweenMax.killChildTweensOf = function (parent, complete) {
    if (parent == null) {
      return;
    }

    var tl = TweenLiteInternals.tweenLookup,
        a,
        curParent,
        p,
        i,
        l;

    if (typeof parent === "string") {
      parent = _TweenLite.default.selector(parent) || parent;
    }

    if (_isSelector(parent)) {
      parent = _slice(parent);
    }

    if (_isArray(parent)) {
      i = parent.length;

      while (--i > -1) {
        TweenMax.killChildTweensOf(parent[i], complete);
      }

      return;
    }

    a = [];

    for (p in tl) {
      curParent = tl[p].target.parentNode;

      while (curParent) {
        if (curParent === parent) {
          a = a.concat(tl[p].tweens);
        }

        curParent = curParent.parentNode;
      }
    }

    l = a.length;

    for (i = 0; i < l; i++) {
      if (complete) {
        a[i].totalTime(a[i].totalDuration());
      }

      a[i]._enabled(false, false);
    }
  };

  var _changePause = function _changePause(pause, tweens, delayedCalls, timelines) {
    tweens = tweens !== false;
    delayedCalls = delayedCalls !== false;
    timelines = timelines !== false;
    var a = getAllTweens(timelines),
        allTrue = tweens && delayedCalls && timelines,
        i = a.length,
        isDC,
        tween;

    while (--i > -1) {
      tween = a[i];

      if (allTrue || tween instanceof _TweenLite.SimpleTimeline || (isDC = tween.target === tween.vars.onComplete) && delayedCalls || tweens && !isDC) {
        tween.paused(pause);
      }
    }
  };

  TweenMax.pauseAll = function (tweens, delayedCalls, timelines) {
    _changePause(true, tweens, delayedCalls, timelines);
  };

  TweenMax.resumeAll = function (tweens, delayedCalls, timelines) {
    _changePause(false, tweens, delayedCalls, timelines);
  };

  TweenMax.globalTimeScale = function (value) {
    var tl = _TweenLite.Animation._rootTimeline,
        t = _TweenLite.default.ticker.time;

    if (!arguments.length) {
      return tl._timeScale;
    }

    value = value || _tinyNum; //can't allow zero because it'll throw the math off

    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl = _TweenLite.Animation._rootFramesTimeline;
    t = _TweenLite.default.ticker.frame;
    tl._startTime = t - (t - tl._startTime) * tl._timeScale / value;
    tl._timeScale = _TweenLite.Animation._rootTimeline._timeScale = value;
    return value;
  }; //---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------


  p.progress = function (value, suppressEvents) {
    return !arguments.length ? this._time / this.duration() : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };

  p.totalProgress = function (value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, suppressEvents);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    var duration = this._duration,
        cycle = this._cycle,
        cycleDur = cycle * (duration + this._repeatDelay);

    if (value > duration) {
      value = duration;
    }

    return this.totalTime(this._yoyo && cycle & 1 ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
  };

  p.duration = function (value) {
    if (!arguments.length) {
      return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
    }

    return _TweenLite.Animation.prototype.duration.call(this, value);
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        //instead of Infinity, we use 999999999999 so that we can accommodate reverses
        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
        this._dirty = false;
      }

      return this._totalDuration;
    }

    return this._repeat === -1 ? this : this.duration((value - this._repeat * this._repeatDelay) / (this._repeat + 1));
  };

  p.repeat = function (value) {
    if (!arguments.length) {
      return this._repeat;
    }

    this._repeat = value;
    return this._uncache(true);
  };

  p.repeatDelay = function (value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }

    this._repeatDelay = value;
    return this._uncache(true);
  };

  p.yoyo = function (value) {
    if (!arguments.length) {
      return this._yoyo;
    }

    this._yoyo = value;
    return this;
  };

  return TweenMax;
}, true);

var TweenMax = _TweenLite.globals.TweenMax;
exports.default = exports.TweenMax = TweenMax;
var TweenMaxBase = TweenMax;
exports.TweenMaxBase = TweenMaxBase;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/CSSPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CSSPlugin = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function () {
  /** @constructor **/
  var CSSPlugin = function CSSPlugin() {
    _TweenLite.TweenPlugin.call(this, "css");

    this._overwriteProps.length = 0;
    this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
  },
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _hasPriority,
      //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
  _suffixMap,
      //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
  _cs,
      //computed style (we store this in a shared variable to conserve memory and make minification tighter
  _overwriteProps,
      //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
  _specialProps = {},
      p = CSSPlugin.prototype = new _TweenLite.TweenPlugin("css");

  p.constructor = CSSPlugin;
  CSSPlugin.version = "2.1.0";
  CSSPlugin.API = 2;
  CSSPlugin.defaultTransformPerspective = 0;
  CSSPlugin.defaultSkewType = "compensated";
  CSSPlugin.defaultSmoothOrigin = true;
  p = "px"; //we'll reuse the "p" variable to keep file size down

  CSSPlugin.suffixMap = {
    top: p,
    right: p,
    bottom: p,
    left: p,
    width: p,
    height: p,
    fontSize: p,
    padding: p,
    margin: p,
    perspective: p,
    lineHeight: ""
  };

  var _numExp = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
      _relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
      _valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
      //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
  _NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
      //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
  _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
      _opacityExp = /opacity *= *([^)]*)/i,
      _opacityValExp = /opacity:([^;]*)/i,
      _alphaFilterExp = /alpha\(opacity *=.+?\)/i,
      _rgbhslExp = /^(rgb|hsl)/,
      _capsExp = /([A-Z])/g,
      _camelExp = /-([a-z])/gi,
      _urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
      //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
  _camelFunc = function _camelFunc(s, g) {
    return g.toUpperCase();
  },
      _horizExp = /(?:Left|Right|Width)/i,
      _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
      _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
      _commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi,
      //finds any commas that are not within parenthesis
  _complexExp = /[\s,\(]/i,
      //for testing a string to find if it has a space, comma, or open parenthesis (clues that it's a complex value)
  _DEG2RAD = Math.PI / 180,
      _RAD2DEG = 180 / Math.PI,
      _forcePT = {},
      _dummyElement = {
    style: {}
  },
      _doc = _TweenLite._gsScope.document || {
    createElement: function createElement() {
      return _dummyElement;
    }
  },
      _createElement = function _createElement(type, ns) {
    return ns && _doc.createElementNS ? _doc.createElementNS(ns, type) : _doc.createElement(type);
  },
      _tempDiv = _createElement("div"),
      _tempImg = _createElement("img"),
      _internals = CSSPlugin._internals = {
    _specialProps: _specialProps
  },
      //provides a hook to a few internal methods that we need to access from inside other plugins
  _agent = (_TweenLite._gsScope.navigator || {}).userAgent || "",
      _autoRound,
      _reqSafariFix,
      //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).
  _isSafari,
      _isFirefox,
      //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
  _isSafariLT6,
      //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
  _ieVers,
      _supportsOpacity = function () {
    //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
    var i = _agent.indexOf("Android"),
        a = _createElement("a");

    _isSafari = _agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || parseFloat(_agent.substr(i + 8, 2)) > 3);
    _isSafariLT6 = _isSafari && parseFloat(_agent.substr(_agent.indexOf("Version/") + 8, 2)) < 6;
    _isFirefox = _agent.indexOf("Firefox") !== -1;

    if (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_agent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_agent)) {
      _ieVers = parseFloat(RegExp.$1);
    }

    if (!a) {
      return false;
    }

    a.style.cssText = "top:1px;opacity:.55;";
    return /^0.55/.test(a.style.opacity);
  }(),
      _getIEOpacity = function _getIEOpacity(v) {
    return _opacityExp.test(typeof v === "string" ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
  },
      _log = function _log(s) {
    //for logging messages, but in a way that won't throw errors in old versions of IE.
    if (_TweenLite._gsScope.console) {
      console.log(s);
    }
  },
      _target,
      //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
  _index,
      //when initting a CSSPlugin, we set this variable so that we can access it from within many other functions without having to pass it around as params
  _prefixCSS = "",
      //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
  _prefix = "",
      //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".
  // @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
  _checkPropPrefix = function _checkPropPrefix(p, e) {
    e = e || _tempDiv;
    var s = e.style,
        a,
        i;

    if (s[p] !== undefined) {
      return p;
    }

    p = p.charAt(0).toUpperCase() + p.substr(1);
    a = ["O", "Moz", "ms", "Ms", "Webkit"];
    i = 5;

    while (--i > -1 && s[a[i] + p] === undefined) {}

    if (i >= 0) {
      _prefix = i === 3 ? "ms" : a[i];
      _prefixCSS = "-" + _prefix.toLowerCase() + "-";
      return _prefix + p;
    }

    return null;
  },
      _computedStyleScope = typeof window !== "undefined" ? window : _doc.defaultView || {
    getComputedStyle: function getComputedStyle() {}
  },
      _getComputedStyle = function _getComputedStyle(e) {
    return _computedStyleScope.getComputedStyle(e); //to avoid errors in Microsoft Edge, we need to call getComputedStyle() from a specific scope, typically window.
  },

  /**
   * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
   * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
   *
   * @param {!Object} t Target element whose style property you want to query
   * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
   * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
   * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
   * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
   * @return {?string} The current property value
   */
  _getStyle = CSSPlugin.getStyle = function (t, p, cs, calc, dflt) {
    var rv;
    if (!_supportsOpacity) if (p === "opacity") {
      //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
      return _getIEOpacity(t);
    }

    if (!calc && t.style[p]) {
      rv = t.style[p];
    } else if (cs = cs || _getComputedStyle(t)) {
      rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
    } else if (t.currentStyle) {
      rv = t.currentStyle[p];
    }

    return dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto") ? dflt : rv;
  },

  /**
   * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
   * @param {!Object} t Target element
   * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
   * @param {!number} v Value
   * @param {string=} sfx Suffix (like "px" or "%" or "em")
   * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
   * @return {number} value in pixels
   */
  _convertToPixels = _internals.convertToPixels = function (t, p, v, sfx, recurse) {
    if (sfx === "px" || !sfx && p !== "lineHeight") {
      return v;
    }

    if (sfx === "auto" || !v) {
      return 0;
    }

    var horiz = _horizExp.test(p),
        node = t,
        style = _tempDiv.style,
        neg = v < 0,
        precise = v === 1,
        pix,
        cache,
        time;

    if (neg) {
      v = -v;
    }

    if (precise) {
      v *= 100;
    }

    if (p === "lineHeight" && !sfx) {
      //special case of when a simple lineHeight (without a unit) is used. Set it to the value, read back the computed value, and then revert.
      cache = _getComputedStyle(t).lineHeight;
      t.style.lineHeight = v;
      pix = parseFloat(_getComputedStyle(t).lineHeight);
      t.style.lineHeight = cache;
    } else if (sfx === "%" && p.indexOf("border") !== -1) {
      pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
    } else {
      style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";

      if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
        node = t.parentNode || _doc.body;

        if (_getStyle(node, "display").indexOf("flex") !== -1) {
          //Edge and IE11 have a bug that causes offsetWidth to report as 0 if the container has display:flex and the child is position:relative. Switching to position: absolute solves it.
          style.position = "absolute";
        }

        cache = node._gsCache;
        time = _TweenLite.default.ticker.frame;

        if (cache && horiz && cache.time === time) {
          //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
          return cache.width * v / 100;
        }

        style[horiz ? "width" : "height"] = v + sfx;
      } else {
        style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
      }

      node.appendChild(_tempDiv);
      pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
      node.removeChild(_tempDiv);

      if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
        cache = node._gsCache = node._gsCache || {};
        cache.time = time;
        cache.width = pix / v * 100;
      }

      if (pix === 0 && !recurse) {
        pix = _convertToPixels(t, p, v, sfx, true);
      }
    }

    if (precise) {
      pix /= 100;
    }

    return neg ? -pix : pix;
  },
      _calculateOffset = _internals.calculateOffset = function (t, p, cs) {
    //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
    if (_getStyle(t, "position", cs) !== "absolute") {
      return 0;
    }

    var dim = p === "left" ? "Left" : "Top",
        v = _getStyle(t, "margin" + dim, cs);

    return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
  },
      // @private returns at object containing ALL of the style properties in camelCase and their associated values.
  _getAllStyles = function _getAllStyles(t, cs) {
    var s = {},
        i,
        tr,
        p;

    if (cs = cs || _getComputedStyle(t, null)) {
      if (i = cs.length) {
        while (--i > -1) {
          p = cs[i];

          if (p.indexOf("-transform") === -1 || _transformPropCSS === p) {
            //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
            s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
          }
        }
      } else {
        //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
        for (i in cs) {
          if (i.indexOf("Transform") === -1 || _transformProp === i) {
            //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
            s[i] = cs[i];
          }
        }
      }
    } else if (cs = t.currentStyle || t.style) {
      for (i in cs) {
        if (typeof i === "string" && s[i] === undefined) {
          s[i.replace(_camelExp, _camelFunc)] = cs[i];
        }
      }
    }

    if (!_supportsOpacity) {
      s.opacity = _getIEOpacity(t);
    }

    tr = _getTransform(t, cs, false);
    s.rotation = tr.rotation;
    s.skewX = tr.skewX;
    s.scaleX = tr.scaleX;
    s.scaleY = tr.scaleY;
    s.x = tr.x;
    s.y = tr.y;

    if (_supports3D) {
      s.z = tr.z;
      s.rotationX = tr.rotationX;
      s.rotationY = tr.rotationY;
      s.scaleZ = tr.scaleZ;
    }

    if (s.filters) {
      delete s.filters;
    }

    return s;
  },
      // @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
  _cssDif = function _cssDif(t, s1, s2, vars, forceLookup) {
    var difs = {},
        style = t.style,
        val,
        p,
        mpt;

    for (p in s2) {
      if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || forceLookup && forceLookup[p]) if (p.indexOf("Origin") === -1) if (typeof val === "number" || typeof val === "string") {
        difs[p] = val === "auto" && (p === "left" || p === "top") ? _calculateOffset(t, p) : (val === "" || val === "auto" || val === "none") && typeof s1[p] === "string" && s1[p].replace(_NaNExp, "") !== "" ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.

        if (style[p] !== undefined) {
          //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
          mpt = new MiniPropTween(style, p, style[p], mpt);
        }
      }
    }

    if (vars) {
      for (p in vars) {
        //copy properties (except className)
        if (p !== "className") {
          difs[p] = vars[p];
        }
      }
    }

    return {
      difs: difs,
      firstMPT: mpt
    };
  },
      _dimensions = {
    width: ["Left", "Right"],
    height: ["Top", "Bottom"]
  },
      _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"],

  /**
   * @private Gets the width or height of an element
   * @param {!Object} t Target element
   * @param {!string} p Property name ("width" or "height")
   * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
   * @return {number} Dimension (in pixels)
   */
  _getDimension = function _getDimension(t, p, cs) {
    if ((t.nodeName + "").toLowerCase() === "svg") {
      //Chrome no longer supports offsetWidth/offsetHeight on SVG elements.
      return (cs || _getComputedStyle(t))[p] || 0;
    } else if (t.getCTM && _isSVG(t)) {
      return t.getBBox()[p] || 0;
    }

    var v = parseFloat(p === "width" ? t.offsetWidth : t.offsetHeight),
        a = _dimensions[p],
        i = a.length;
    cs = cs || _getComputedStyle(t, null);

    while (--i > -1) {
      v -= parseFloat(_getStyle(t, "padding" + a[i], cs, true)) || 0;
      v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, true)) || 0;
    }

    return v;
  },
      // @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
  _parsePosition = function _parsePosition(v, recObj) {
    if (v === "contain" || v === "auto" || v === "auto auto") {
      //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
      return v + " ";
    }

    if (v == null || v === "") {
      v = "0 0";
    }

    var a = v.split(" "),
        x = v.indexOf("left") !== -1 ? "0%" : v.indexOf("right") !== -1 ? "100%" : a[0],
        y = v.indexOf("top") !== -1 ? "0%" : v.indexOf("bottom") !== -1 ? "100%" : a[1],
        i;

    if (a.length > 3 && !recObj) {
      //multiple positions
      a = v.split(", ").join(",").split(",");
      v = [];

      for (i = 0; i < a.length; i++) {
        v.push(_parsePosition(a[i]));
      }

      return v.join(",");
    }

    if (y == null) {
      y = x === "center" ? "50%" : "0";
    } else if (y === "center") {
      y = "50%";
    }

    if (x === "center" || isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1) {
      //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
      x = "50%";
    }

    v = x + " " + y + (a.length > 2 ? " " + a[2] : "");

    if (recObj) {
      recObj.oxp = x.indexOf("%") !== -1;
      recObj.oyp = y.indexOf("%") !== -1;
      recObj.oxr = x.charAt(1) === "=";
      recObj.oyr = y.charAt(1) === "=";
      recObj.ox = parseFloat(x.replace(_NaNExp, ""));
      recObj.oy = parseFloat(y.replace(_NaNExp, ""));
      recObj.v = v;
    }

    return recObj || v;
  },

  /**
   * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
   * @param {(number|string)} e End value which is typically a string, but could be a number
   * @param {(number|string)} b Beginning value which is typically a string but could be a number
   * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
   */
  _parseChange = function _parseChange(e, b) {
    if (typeof e === "function") {
      e = e(_index, _target);
    }

    return typeof e === "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b) || 0;
  },

  /**
   * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
   * @param {Object} v Value to be parsed
   * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
   * @return {number} Parsed value
   */
  _parseVal = function _parseVal(v, d) {
    if (typeof v === "function") {
      v = v(_index, _target);
    }

    var isRelative = typeof v === "string" && v.charAt(1) === "=";

    if (typeof v === "string" && v.charAt(v.length - 2) === "v") {
      //convert vw and vh into px-equivalents.
      v = (isRelative ? v.substr(0, 2) : 0) + window["inner" + (v.substr(-2) === "vh" ? "Height" : "Width")] * (parseFloat(isRelative ? v.substr(2) : v) / 100);
    }

    return v == null ? d : isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v) || 0;
  },

  /**
   * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
   * @param {Object} v Value to be parsed
   * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
   * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
   * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
   * @return {number} parsed angle in radians
   */
  _parseAngle = function _parseAngle(v, d, p, directionalEnd) {
    var min = 0.000001,
        cap,
        split,
        dif,
        result,
        isRelative;

    if (typeof v === "function") {
      v = v(_index, _target);
    }

    if (v == null) {
      result = d;
    } else if (typeof v === "number") {
      result = v;
    } else {
      cap = 360;
      split = v.split("_");
      isRelative = v.charAt(1) === "=";
      dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * (v.indexOf("rad") === -1 ? 1 : _RAD2DEG) - (isRelative ? 0 : d);

      if (split.length) {
        if (directionalEnd) {
          directionalEnd[p] = d + dif;
        }

        if (v.indexOf("short") !== -1) {
          dif = dif % cap;

          if (dif !== dif % (cap / 2)) {
            dif = dif < 0 ? dif + cap : dif - cap;
          }
        }

        if (v.indexOf("_cw") !== -1 && dif < 0) {
          dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
        } else if (v.indexOf("ccw") !== -1 && dif > 0) {
          dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
        }
      }

      result = d + dif;
    }

    if (result < min && result > -min) {
      result = 0;
    }

    return result;
  },
      _colorLookup = {
    aqua: [0, 255, 255],
    lime: [0, 255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, 255],
    navy: [0, 0, 128],
    white: [255, 255, 255],
    fuchsia: [255, 0, 255],
    olive: [128, 128, 0],
    yellow: [255, 255, 0],
    orange: [255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [255, 0, 0],
    pink: [255, 192, 203],
    cyan: [0, 255, 255],
    transparent: [255, 255, 255, 0]
  },
      _hue = function _hue(h, m1, m2) {
    h = h < 0 ? h + 1 : h > 1 ? h - 1 : h;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < 0.5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255 + 0.5 | 0;
  },

  /**
   * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
   * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
   * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
   * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
   */
  _parseColor = CSSPlugin.parseColor = function (v, toHSL) {
    var a, r, g, b, h, s, l, max, min, d, wasHSL;

    if (!v) {
      a = _colorLookup.black;
    } else if (typeof v === "number") {
      a = [v >> 16, v >> 8 & 255, v & 255];
    } else {
      if (v.charAt(v.length - 1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length === 4) {
          //for shorthand like #9F0
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b;
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & 255, v & 255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_numExp);

        if (!toHSL) {
          h = Number(a[0]) % 360 / 360;
          s = Number(a[1]) / 100;
          l = Number(a[2]) / 100;
          g = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;

          if (a.length > 3) {
            a[3] = Number(a[3]);
          }

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (v.indexOf("=") !== -1) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          return v.match(_relNumExp);
        }
      } else {
        a = v.match(_numExp) || _colorLookup.transparent;
      }

      a[0] = Number(a[0]);
      a[1] = Number(a[1]);
      a[2] = Number(a[2]);

      if (a.length > 3) {
        a[3] = Number(a[3]);
      }
    }

    if (toHSL && !wasHSL) {
      r = a[0] / 255;
      g = a[1] / 255;
      b = a[2] / 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = h + 0.5 | 0;
      a[1] = s * 100 + 0.5 | 0;
      a[2] = l * 100 + 0.5 | 0;
    }

    return a;
  },
      _formatColors = function _formatColors(s, toHSL) {
    var colors = s.match(_colorExp) || [],
        charIndex = 0,
        parsed = "",
        i,
        color,
        temp;

    if (!colors.length) {
      return s;
    }

    for (i = 0; i < colors.length; i++) {
      color = colors[i];
      temp = s.substr(charIndex, s.indexOf(color, charIndex) - charIndex);
      charIndex += temp.length + color.length;
      color = _parseColor(color, toHSL);

      if (color.length === 3) {
        color.push(1);
      }

      parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
    }

    return parsed + s.substr(charIndex);
  },
      _colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.


  for (p in _colorLookup) {
    _colorExp += "|" + p + "\\b";
  }

  _colorExp = new RegExp(_colorExp + ")", "gi");

  CSSPlugin.colorStringFilter = function (a) {
    var combined = a[0] + " " + a[1],
        toHSL;

    if (_colorExp.test(combined)) {
      toHSL = combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1;
      a[0] = _formatColors(a[0], toHSL);
      a[1] = _formatColors(a[1], toHSL);
    }

    _colorExp.lastIndex = 0;
  };

  if (!_TweenLite.default.defaultStringFilter) {
    _TweenLite.default.defaultStringFilter = CSSPlugin.colorStringFilter;
  }
  /**
   * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
   * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
   * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
   * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
   * @return {Function} formatter function
   */


  var _getFormatter = function _getFormatter(dflt, clr, collapsible, multi) {
    if (dflt == null) {
      return function (v) {
        return v;
      };
    }

    var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
        dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
        pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
        sfx = dflt.charAt(dflt.length - 1) === ")" ? ")" : "",
        delim = dflt.indexOf(" ") !== -1 ? " " : ",",
        numVals = dVals.length,
        dSfx = numVals > 0 ? dVals[0].replace(_numExp, "") : "",
        _formatter2;

    if (!numVals) {
      return function (v) {
        return v;
      };
    }

    if (clr) {
      _formatter2 = function formatter(v) {
        var color, vals, i, a;

        if (typeof v === "number") {
          v += dSfx;
        } else if (multi && _commasOutsideParenExp.test(v)) {
          a = v.replace(_commasOutsideParenExp, "|").split("|");

          for (i = 0; i < a.length; i++) {
            a[i] = _formatter2(a[i]);
          }

          return a.join(",");
        }

        color = (v.match(_colorExp) || [dColor])[0];
        vals = v.split(color).join("").match(_valuesExp) || [];
        i = vals.length;

        if (numVals > i--) {
          while (++i < numVals) {
            vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
          }
        }

        return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
      };

      return _formatter2;
    }

    _formatter2 = function _formatter(v) {
      var vals, a, i;

      if (typeof v === "number") {
        v += dSfx;
      } else if (multi && _commasOutsideParenExp.test(v)) {
        a = v.replace(_commasOutsideParenExp, "|").split("|");

        for (i = 0; i < a.length; i++) {
          a[i] = _formatter2(a[i]);
        }

        return a.join(",");
      }

      vals = v.match(_valuesExp) || [];
      i = vals.length;

      if (numVals > i--) {
        while (++i < numVals) {
          vals[i] = collapsible ? vals[(i - 1) / 2 | 0] : dVals[i];
        }
      }

      return pfx + vals.join(delim) + sfx;
    };

    return _formatter2;
  },

  /**
   * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
   * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
   * @return {Function} a formatter function
   */
  _getEdgeParser = function _getEdgeParser(props) {
    props = props.split(",");
    return function (t, e, p, cssp, pt, plugin, vars) {
      var a = (e + "").split(" "),
          i;
      vars = {};

      for (i = 0; i < 4; i++) {
        vars[props[i]] = a[i] = a[i] || a[(i - 1) / 2 >> 0];
      }

      return cssp.parse(t, vars, pt, plugin);
    };
  },
      // @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
  _setPluginRatio = _internals._setPluginRatio = function (v) {
    this.plugin.setRatio(v);
    var d = this.data,
        proxy = d.proxy,
        mpt = d.firstMPT,
        min = 0.000001,
        val,
        pt,
        i,
        str,
        p;

    while (mpt) {
      val = proxy[mpt.v];

      if (mpt.r) {
        val = mpt.r(val);
      } else if (val < min && val > -min) {
        val = 0;
      }

      mpt.t[mpt.p] = val;
      mpt = mpt._next;
    }

    if (d.autoRotate) {
      d.autoRotate.rotation = d.mod ? d.mod.call(this._tween, proxy.rotation, this.t, this._tween) : proxy.rotation; //special case for ModifyPlugin to hook into an auto-rotating bezier
    } //at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.


    if (v === 1 || v === 0) {
      mpt = d.firstMPT;
      p = v === 1 ? "e" : "b";

      while (mpt) {
        pt = mpt.t;

        if (!pt.type) {
          pt[p] = pt.s + pt.xs0;
        } else if (pt.type === 1) {
          str = pt.xs0 + pt.s + pt.xs1;

          for (i = 1; i < pt.l; i++) {
            str += pt["xn" + i] + pt["xs" + (i + 1)];
          }

          pt[p] = str;
        }

        mpt = mpt._next;
      }
    }
  },

  /**
   * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
   * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
   * @param {!string} p property name
   * @param {(number|string|object)} v value
   * @param {MiniPropTween=} next next MiniPropTween in the linked list
   * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
   */
  MiniPropTween = function MiniPropTween(t, p, v, next, r) {
    this.t = t;
    this.p = p;
    this.v = v;
    this.r = r;

    if (next) {
      next._prev = this;
      this._next = next;
    }
  },

  /**
   * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
   * This method returns an object that has the following properties:
   *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
   *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
   *  - firstMPT: the first MiniPropTween in the linked list
   *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
   * @param {!Object} t target object to be tweened
   * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
   * @param {!CSSPlugin} cssp The CSSPlugin instance
   * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
   * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
   * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
   * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
   */
  _parseToProxy = _internals._parseToProxy = function (t, vars, cssp, pt, plugin, shallow) {
    var bpt = pt,
        start = {},
        end = {},
        transform = cssp._transform,
        oldForce = _forcePT,
        i,
        p,
        xp,
        mpt,
        firstPT;
    cssp._transform = null;
    _forcePT = vars;
    pt = firstPT = cssp.parse(t, vars, pt, plugin);
    _forcePT = oldForce; //break off from the linked list so the new ones are isolated.

    if (shallow) {
      cssp._transform = transform;

      if (bpt) {
        bpt._prev = null;

        if (bpt._prev) {
          bpt._prev._next = null;
        }
      }
    }

    while (pt && pt !== bpt) {
      if (pt.type <= 1) {
        p = pt.p;
        end[p] = pt.s + pt.c;
        start[p] = pt.s;

        if (!shallow) {
          mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
          pt.c = 0;
        }

        if (pt.type === 1) {
          i = pt.l;

          while (--i > 0) {
            xp = "xn" + i;
            p = pt.p + "_" + xp;
            end[p] = pt.data[xp];
            start[p] = pt[xp];

            if (!shallow) {
              mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
            }
          }
        }
      }

      pt = pt._next;
    }

    return {
      proxy: start,
      end: end,
      firstMPT: mpt,
      pt: firstPT
    };
  },

  /**
   * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
   * CSSPropTweens have the following optional properties as well (not defined through the constructor):
   *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
   *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
   *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
   *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
   *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
   * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
   * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
   * @param {number} s Starting numeric value
   * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
   * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
   * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
   * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
   * @param {boolean=} r If true, the value(s) should be rounded
   * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
   * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
   * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
   */
  CSSPropTween = _internals.CSSPropTween = function (t, p, s, c, next, type, n, r, pr, b, e) {
    this.t = t; //target

    this.p = p; //property

    this.s = s; //starting value

    this.c = c; //change value

    this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)

    if (!(t instanceof CSSPropTween)) {
      _overwriteProps.push(this.n);
    }

    this.r = !r ? r : typeof r === "function" ? r : Math.round; //round (boolean)

    this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work

    if (pr) {
      this.pr = pr;
      _hasPriority = true;
    }

    this.b = b === undefined ? s : b;
    this.e = e === undefined ? s + c : e;

    if (next) {
      this._next = next;
      next._prev = this;
    }
  },
      _addNonTweeningNumericPT = function _addNonTweeningNumericPT(target, prop, start, end, next, overwriteProp) {
    //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
    var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
    pt.b = start;
    pt.e = pt.xs0 = end;
    return pt;
  },

  /**
   * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
   * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
   * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
   * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
   *
   * @param {!Object} t Target whose property will be tweened
   * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
   * @param {string} b Beginning value
   * @param {string} e Ending value
   * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
   * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
   * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
   * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
   * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
   * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
   * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
   */
  _parseComplex = CSSPlugin.parseComplex = function (t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
    //DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
    b = b || dflt || "";

    if (typeof e === "function") {
      e = e(_index, _target);
    }

    pt = new CSSPropTween(t, p, 0, 0, pt, setRatio ? 2 : 1, null, false, pr, b, e);
    e += ""; //ensures it's a string

    if (clrs && _colorExp.test(e + b)) {
      //if colors are found, normalize the formatting to rgba() or hsla().
      e = [b, e];
      CSSPlugin.colorStringFilter(e);
      b = e[0];
      e = e[1];
    }

    var ba = b.split(", ").join(",").split(" "),
        //beginning array
    ea = e.split(", ").join(",").split(" "),
        //ending array
    l = ba.length,
        autoRound = _autoRound !== false,
        i,
        xi,
        ni,
        bv,
        ev,
        bnums,
        enums,
        bn,
        hasAlpha,
        temp,
        cv,
        str,
        useHSL;

    if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
      if ((e + b).indexOf("rgb") !== -1 || (e + b).indexOf("hsl") !== -1) {
        //keep rgb(), rgba(), hsl(), and hsla() values together! (remember, we're splitting on spaces)
        ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
        ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
      } else {
        ba = ba.join(" ").split(",").join(", ").split(" ");
        ea = ea.join(" ").split(",").join(", ").split(" ");
      }

      l = ba.length;
    }

    if (l !== ea.length) {
      //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
      ba = (dflt || "").split(" ");
      l = ba.length;
    }

    pt.plugin = plugin;
    pt.setRatio = setRatio;
    _colorExp.lastIndex = 0;

    for (i = 0; i < l; i++) {
      bv = ba[i];
      ev = ea[i] + "";
      bn = parseFloat(bv); //if the value begins with a number (most common). It's fine if it has a suffix like px

      if (bn || bn === 0) {
        pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), autoRound && ev.indexOf("px") !== -1 ? Math.round : false, true); //if the value is a color
      } else if (clrs && _colorExp.test(bv)) {
        str = ev.indexOf(")") + 1;
        str = ")" + (str ? ev.substr(str) : ""); //if there's a comma or ) at the end, retain it.

        useHSL = ev.indexOf("hsl") !== -1 && _supportsOpacity;
        temp = ev; //original string value so we can look for any prefix later.

        bv = _parseColor(bv, useHSL);
        ev = _parseColor(ev, useHSL);
        hasAlpha = bv.length + ev.length > 6;

        if (hasAlpha && !_supportsOpacity && ev[3] === 0) {
          //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
          pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
          pt.e = pt.e.split(ea[i]).join("transparent");
        } else {
          if (!_supportsOpacity) {
            //old versions of IE don't support rgba().
            hasAlpha = false;
          }

          if (useHSL) {
            pt.appendXtra(temp.substr(0, temp.indexOf("hsl")) + (hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true).appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false).appendXtra("", bv[2], _parseChange(ev[2], bv[2]), hasAlpha ? "%," : "%" + str, false);
          } else {
            pt.appendXtra(temp.substr(0, temp.indexOf("rgb")) + (hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", Math.round, true).appendXtra("", bv[1], ev[1] - bv[1], ",", Math.round).appendXtra("", bv[2], ev[2] - bv[2], hasAlpha ? "," : str, Math.round);
          }

          if (hasAlpha) {
            bv = bv.length < 4 ? 1 : bv[3];
            pt.appendXtra("", bv, (ev.length < 4 ? 1 : ev[3]) - bv, str, false);
          }
        }

        _colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.
      } else {
        bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array
        //if no number is found, treat it as a non-tweening value and just append the string to the current xs.

        if (!bnums) {
          pt["xs" + pt.l] += pt.l || pt["xs" + pt.l] ? " " + ev : ev; //loop through all the numbers that are found and construct the extra values on the pt.
        } else {
          enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5

          if (!enums || enums.length !== bnums.length) {
            //DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
            return pt;
          }

          ni = 0;

          for (xi = 0; xi < bnums.length; xi++) {
            cv = bnums[xi];
            temp = bv.indexOf(cv, ni);
            pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", autoRound && bv.substr(temp + cv.length, 2) === "px" ? Math.round : false, xi === 0);
            ni = temp + cv.length;
          }

          pt["xs" + pt.l] += bv.substr(ni);
        }
      }
    } //if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.


    if (e.indexOf("=") !== -1) if (pt.data) {
      str = pt.xs0 + pt.data.s;

      for (i = 1; i < pt.l; i++) {
        str += pt["xs" + i] + pt.data["xn" + i];
      }

      pt.e = str + pt["xs" + i];
    }

    if (!pt.l) {
      pt.type = -1;
      pt.xs0 = pt.e;
    }

    return pt.xfirst || pt;
  },
      i = 9;

  p = CSSPropTween.prototype;
  p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.

  while (--i > 0) {
    p["xn" + i] = 0;
    p["xs" + i] = "";
  }

  p.xs0 = "";
  p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;
  /**
   * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
   * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
   * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
   * @param {string=} pfx Prefix (if any)
   * @param {!number} s Starting value
   * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
   * @param {string=} sfx Suffix (if any)
   * @param {boolean=} r Round (if true).
   * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
   * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
   */

  p.appendXtra = function (pfx, s, c, sfx, r, pad) {
    var pt = this,
        l = pt.l;
    pt["xs" + l] += pad && (l || pt["xs" + l]) ? " " + pfx : pfx || "";
    if (!c) if (l !== 0 && !pt.plugin) {
      //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
      pt["xs" + l] += s + (sfx || "");
      return pt;
    }
    pt.l++;
    pt.type = pt.setRatio ? 2 : 1;
    pt["xs" + pt.l] = sfx || "";

    if (l > 0) {
      pt.data["xn" + l] = s + c;
      pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)

      pt["xn" + l] = s;

      if (!pt.plugin) {
        pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
        pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
      }

      return pt;
    }

    pt.data = {
      s: s + c
    };
    pt.rxp = {};
    pt.s = s;
    pt.c = c;
    pt.r = r;
    return pt;
  };
  /**
   * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
   * @param {!string} p Property name (like "boxShadow" or "throwProps")
   * @param {Object=} options An object containing any of the following configuration options:
   *                      - defaultValue: the default value
   *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
   *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
   *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
   *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
   *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
   *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
   *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
   *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
   */


  var SpecialProp = function SpecialProp(p, options) {
    options = options || {};
    this.p = options.prefix ? _checkPropPrefix(p) || p : p;
    _specialProps[p] = _specialProps[this.p] = this;
    this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);

    if (options.parser) {
      this.parse = options.parser;
    }

    this.clrs = options.color;
    this.multi = options.multi;
    this.keyword = options.keyword;
    this.dflt = options.defaultValue;
    this.allowFunc = options.allowFunc;
    this.pr = options.priority || 0;
  },
      //shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
  _registerComplexSpecialProp = _internals._registerComplexSpecialProp = function (p, options, defaults) {
    if (_typeof(options) !== "object") {
      options = {
        parser: defaults
      }; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
    }

    var a = p.split(","),
        d = options.defaultValue,
        i,
        temp;
    defaults = defaults || [d];

    for (i = 0; i < a.length; i++) {
      options.prefix = i === 0 && options.prefix;
      options.defaultValue = defaults[i] || d;
      temp = new SpecialProp(a[i], options);
    }
  },
      //creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
  _registerPluginProp = _internals._registerPluginProp = function (p) {
    if (!_specialProps[p]) {
      var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";

      _registerComplexSpecialProp(p, {
        parser: function parser(t, e, p, cssp, pt, plugin, vars) {
          var pluginClass = _globals.com.greensock.plugins[pluginName];

          if (!pluginClass) {
            _log("Error: " + pluginName + " js file not loaded.");

            return pt;
          }

          pluginClass._cssRegister();

          return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
        }
      });
    }
  };

  p = SpecialProp.prototype;
  /**
   * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
   * @param {!Object} t target element
   * @param {(string|number|object)} b beginning value
   * @param {(string|number|object)} e ending (destination) value
   * @param {CSSPropTween=} pt next CSSPropTween in the linked list
   * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
   * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
   * @return {CSSPropTween=} First CSSPropTween in the linked list
   */

  p.parseComplex = function (t, b, e, pt, plugin, setRatio) {
    var kwd = this.keyword,
        i,
        ba,
        ea,
        l,
        bi,
        ei; //if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)

    if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
      ba = b.replace(_commasOutsideParenExp, "|").split("|");
      ea = e.replace(_commasOutsideParenExp, "|").split("|");
    } else if (kwd) {
      ba = [b];
      ea = [e];
    }

    if (ea) {
      l = ea.length > ba.length ? ea.length : ba.length;

      for (i = 0; i < l; i++) {
        b = ba[i] = ba[i] || this.dflt;
        e = ea[i] = ea[i] || this.dflt;

        if (kwd) {
          bi = b.indexOf(kwd);
          ei = e.indexOf(kwd);

          if (bi !== ei) {
            if (ei === -1) {
              //if the keyword isn't in the end value, remove it from the beginning one.
              ba[i] = ba[i].split(kwd).join("");
            } else if (bi === -1) {
              //if the keyword isn't in the beginning, add it.
              ba[i] += " " + kwd;
            }
          }
        }
      }

      b = ba.join(", ");
      e = ea.join(", ");
    }

    return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
  };
  /**
   * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
   * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
   * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
   * @param {!Object} t Target object whose property is being tweened
   * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
   * @param {!string} p Property name
   * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
   * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
   * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
   * @param {Object=} vars Original vars object that contains the data for parsing.
   * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
   */


  p.parse = function (t, e, p, cssp, pt, plugin, vars) {
    return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
  };
  /**
   * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
   *  1) Target object whose property should be tweened (typically a DOM element)
   *  2) The end/destination value (could be a string, number, object, or whatever you want)
   *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
   *
   * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
   *
   * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
   *      var start = target.style.width;
   *      return function(ratio) {
   *              target.style.width = (start + value * ratio) + "px";
   *              console.log("set width to " + target.style.width);
   *          }
   * }, 0);
   *
   * Then, when I do this tween, it will trigger my special property:
   *
   * TweenLite.to(element, 1, {css:{myCustomProp:100}});
   *
   * In the example, of course, we're just changing the width, but you can do anything you want.
   *
   * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
   * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
   * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
   */


  CSSPlugin.registerSpecialProp = function (name, onInitTween, priority) {
    _registerComplexSpecialProp(name, {
      parser: function parser(t, e, p, cssp, pt, plugin, vars) {
        var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
        rv.plugin = plugin;
        rv.setRatio = onInitTween(t, e, cssp._tween, p);
        return rv;
      },
      priority: priority
    });
  }; //transform-related methods and properties


  CSSPlugin.useSVGTransformAttr = true; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).

  var _transformProps = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
      _transformProp = _checkPropPrefix("transform"),
      //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
  _transformPropCSS = _prefixCSS + "transform",
      _transformOriginProp = _checkPropPrefix("transformOrigin"),
      _supports3D = _checkPropPrefix("perspective") !== null,
      Transform = _internals.Transform = function () {
    this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
    this.force3D = CSSPlugin.defaultForce3D === false || !_supports3D ? false : CSSPlugin.defaultForce3D || "auto";
  },
      _SVGElement = _TweenLite._gsScope.SVGElement,
      _useSVGTransformAttr,
      //Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.
  _createSVG = function _createSVG(type, container, attributes) {
    var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
        reg = /([a-z])([A-Z])/g,
        p;

    for (p in attributes) {
      element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
    }

    container.appendChild(element);
    return element;
  },
      _docElement = _doc.documentElement || {},
      _forceSVGTransformAttr = function () {
    //IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
    var force = _ieVers || /Android/i.test(_agent) && !_TweenLite._gsScope.chrome,
        svg,
        rect,
        width;

    if (_doc.createElementNS && !force) {
      //IE8 and earlier doesn't support SVG anyway
      svg = _createSVG("svg", _docElement);
      rect = _createSVG("rect", svg, {
        width: 100,
        height: 50,
        x: 100
      });
      width = rect.getBoundingClientRect().width;
      rect.style[_transformOriginProp] = "50% 50%";
      rect.style[_transformProp] = "scaleX(0.5)";
      force = width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).

      _docElement.removeChild(svg);
    }

    return force;
  }(),
      _parseSVGOrigin = function _parseSVGOrigin(e, local, decoratee, absolute, smoothOrigin, skipRecord) {
    var tm = e._gsTransform,
        m = _getMatrix(e, true),
        v,
        x,
        y,
        xOrigin,
        yOrigin,
        a,
        b,
        c,
        d,
        tx,
        ty,
        determinant,
        xOriginOld,
        yOriginOld;

    if (tm) {
      xOriginOld = tm.xOrigin; //record the original values before we alter them.

      yOriginOld = tm.yOrigin;
    }

    if (!absolute || (v = absolute.split(" ")).length < 2) {
      b = e.getBBox();

      if (b.x === 0 && b.y === 0 && b.width + b.height === 0) {
        //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.
        b = {
          x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
          y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
          width: 0,
          height: 0
        };
      }

      local = _parsePosition(local).split(" ");
      v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x, (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
    }

    decoratee.xOrigin = xOrigin = parseFloat(v[0]);
    decoratee.yOrigin = yOrigin = parseFloat(v[1]);

    if (absolute && m !== _identity2DMatrix) {
      //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      determinant = a * d - b * c;

      if (determinant) {
        //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = decoratee.xOrigin = v[0] = x;
        yOrigin = decoratee.yOrigin = v[1] = y;
      }
    }

    if (tm) {
      //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
      if (skipRecord) {
        decoratee.xOffset = tm.xOffset;
        decoratee.yOffset = tm.yOffset;
        tm = decoratee;
      }

      if (smoothOrigin || smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false) {
        x = xOrigin - xOriginOld;
        y = yOrigin - yOriginOld; //originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
        //tm.x -= x - (x * m[0] + y * m[2]);
        //tm.y -= y - (x * m[1] + y * m[3]);

        tm.xOffset += x * m[0] + y * m[2] - x;
        tm.yOffset += x * m[1] + y * m[3] - y;
      } else {
        tm.xOffset = tm.yOffset = 0;
      }
    }

    if (!skipRecord) {
      e.setAttribute("data-svg-origin", v.join(" "));
    }
  },
      _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._originalGetBBox = this.getBBox;
        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._originalGetBBox) {
      bbox = this._originalGetBBox();
    }

    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getBBox = function _getBBox(e) {
    try {
      return e.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      return _getBBoxHack.call(e, true);
    }
  },
      _isSVG = function _isSVG(e) {
    //reports if the element is an SVG on which getBBox() actually works
    return !!(_SVGElement && e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _getMatrix = function _getMatrix(e, force2D) {
    var tm = e._gsTransform || new Transform(),
        rnd = 100000,
        style = e.style,
        isDefault,
        s,
        m,
        n,
        dec,
        nextSibling,
        parent;

    if (_transformProp) {
      s = _getStyle(e, _transformPropCSS, null, true);
    } else if (e.currentStyle) {
      //for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
      s = e.currentStyle.filter.match(_ieGetMatrixExp);
      s = s && s.length === 4 ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), tm.x || 0, tm.y || 0].join(",") : "";
    }

    isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";

    if (_transformProp && isDefault && !e.offsetParent) {
      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
      n = style.display;
      style.display = "block";
      parent = e.parentNode;

      if (!parent || !e.offsetParent) {
        dec = 1; //flag

        nextSibling = e.nextSibling;

        _docElement.appendChild(e); //we must add it to the DOM in order to get values properly

      }

      s = _getStyle(e, _transformPropCSS, null, true);
      isDefault = !s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)";

      if (n) {
        style.display = n;
      } else {
        _removeProp(style, "display");
      }

      if (dec) {
        if (nextSibling) {
          parent.insertBefore(e, nextSibling);
        } else if (parent) {
          parent.appendChild(e);
        } else {
          _docElement.removeChild(e);
        }
      }
    }

    if (tm.svg || e.getCTM && _isSVG(e)) {
      if (isDefault && (style[_transformProp] + "").indexOf("matrix") !== -1) {
        //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
        s = style[_transformProp];
        isDefault = 0;
      }

      m = e.getAttribute("transform");

      if (isDefault && m) {
        m = e.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

        s = "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + m.e + "," + m.f + ")";
        isDefault = 0;
      }
    }

    if (isDefault) {
      return _identity2DMatrix;
    } //split the matrix values out into an array (m for matrix)


    m = (s || "").match(_numExp) || [];
    i = m.length;

    while (--i > -1) {
      n = Number(m[i]);
      m[i] = (dec = n - (n |= 0)) ? (dec * rnd + (dec < 0 ? -0.5 : 0.5) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
    }

    return force2D && m.length > 6 ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
  },

  /**
   * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
   * @param {!Object} t target element
   * @param {Object=} cs computed style object (optional)
   * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
   * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
   * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
   */
  _getTransform = _internals.getTransform = function (t, cs, rec, parse) {
    if (t._gsTransform && rec && !parse) {
      return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
    }

    var tm = rec ? t._gsTransform || new Transform() : new Transform(),
        invX = tm.scaleX < 0,
        //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
    min = 0.00002,
        rnd = 100000,
        zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin || 0 : 0,
        defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
        m,
        i,
        scaleX,
        scaleY,
        rotation,
        skewX;
    tm.svg = !!(t.getCTM && _isSVG(t));

    if (tm.svg) {
      _parseSVGOrigin(t, _getStyle(t, _transformOriginProp, cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));

      _useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
    }

    m = _getMatrix(t);

    if (m !== _identity2DMatrix) {
      if (m.length === 16) {
        //we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
        var a11 = m[0],
            a21 = m[1],
            a31 = m[2],
            a41 = m[3],
            a12 = m[4],
            a22 = m[5],
            a32 = m[6],
            a42 = m[7],
            a13 = m[8],
            a23 = m[9],
            a33 = m[10],
            a14 = m[12],
            a24 = m[13],
            a34 = m[14],
            a43 = m[11],
            angle = Math.atan2(a32, a33),
            t1,
            t2,
            t3,
            t4,
            cos,
            sin; //we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari

        if (tm.zOrigin) {
          a34 = -tm.zOrigin;
          a14 = a13 * a34 - m[12];
          a24 = a23 * a34 - m[13];
          a34 = a33 * a34 + tm.zOrigin - m[14];
        } //note for possible future consolidation: rotationX: Math.atan2(a32, a33), rotationY: Math.atan2(-a31, Math.sqrt(a33 * a33 + a32 * a32)), rotation: Math.atan2(a21, a11), skew: Math.atan2(a12, a22). However, it doesn't seem to be quite as reliable as the full-on backwards rotation procedure.


        tm.rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY


        angle = Math.atan2(-a31, a33);
        tm.rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a11 * cos - a13 * sin;
          t2 = a21 * cos - a23 * sin;
          t3 = a31 * cos - a33 * sin;
          a23 = a21 * sin + a23 * cos;
          a33 = a31 * sin + a33 * cos;
          a43 = a41 * sin + a43 * cos;
          a11 = t1;
          a21 = t2;
          a31 = t3;
        } //rotationZ


        angle = Math.atan2(a21, a11);
        tm.rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a11 * cos + a21 * sin;
          t2 = a12 * cos + a22 * sin;
          t3 = a13 * cos + a23 * sin;
          a21 = a21 * cos - a11 * sin;
          a22 = a22 * cos - a12 * sin;
          a23 = a23 * cos - a13 * sin;
          a11 = t1;
          a12 = t2;
          a13 = t3;
        }

        if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          tm.rotationX = tm.rotation = 0;
          tm.rotationY = 180 - tm.rotationY;
        } //skewX


        angle = Math.atan2(a12, a22); //scales

        tm.scaleX = (Math.sqrt(a11 * a11 + a21 * a21 + a31 * a31) * rnd + 0.5 | 0) / rnd;
        tm.scaleY = (Math.sqrt(a22 * a22 + a32 * a32) * rnd + 0.5 | 0) / rnd;
        tm.scaleZ = (Math.sqrt(a13 * a13 + a23 * a23 + a33 * a33) * rnd + 0.5 | 0) / rnd;
        a11 /= tm.scaleX;
        a12 /= tm.scaleY;
        a21 /= tm.scaleX;
        a22 /= tm.scaleY;

        if (Math.abs(angle) > min) {
          tm.skewX = angle * _RAD2DEG;
          a12 = 0; //unskews

          if (tm.skewType !== "simple") {
            tm.scaleY *= 1 / Math.cos(angle); //by default, we compensate the scale based on the skew so that the element maintains a similar proportion when skewed, so we have to alter the scaleY here accordingly to match the default (non-adjusted) skewing that CSS does (stretching more and more as it skews).
          }
        } else {
          tm.skewX = 0;
        }
        /* //for testing purposes
        var transform = "matrix3d(",
        	comma = ",",
        	zero = "0";
        a13 /= tm.scaleZ;
        a23 /= tm.scaleZ;
        a31 /= tm.scaleX;
        a32 /= tm.scaleY;
        a33 /= tm.scaleZ;
        transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
        transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
        transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
        transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
        transform += a14 + comma + a24 + comma + a34 + comma + (tm.perspective ? (1 + (-a34 / tm.perspective)) : 1) + ")";
        console.log(transform);
        document.querySelector(".test").style[_transformProp] = transform;
        */


        tm.perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        tm.x = a14;
        tm.y = a24;
        tm.z = a34;

        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
          tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
        }
      } else if (!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || !tm.rotationX && !tm.rotationY) {
        //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
        var k = m.length >= 6,
            a = k ? m[0] : 1,
            b = m[1] || 0,
            c = m[2] || 0,
            d = k ? m[3] : 1;
        tm.x = m[4] || 0;
        tm.y = m[5] || 0;
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
        tm.scaleX = scaleX;
        tm.scaleY = scaleY;
        tm.rotation = rotation;
        tm.skewX = skewX;

        if (_supports3D) {
          tm.rotationX = tm.rotationY = tm.z = 0;
          tm.perspective = defaultTransformPerspective;
          tm.scaleZ = 1;
        }

        if (tm.svg) {
          tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
          tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
        }
      }

      if (Math.abs(tm.skewX) > 90 && Math.abs(tm.skewX) < 270) {
        if (invX) {
          tm.scaleX *= -1;
          tm.skewX += tm.rotation <= 0 ? 180 : -180;
          tm.rotation += tm.rotation <= 0 ? 180 : -180;
        } else {
          tm.scaleY *= -1;
          tm.skewX += tm.skewX <= 0 ? 180 : -180;
        }
      }

      tm.zOrigin = zOrigin; //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.

      for (i in tm) {
        if (tm[i] < min) if (tm[i] > -min) {
          tm[i] = 0;
        }
      }
    } //DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);


    if (rec) {
      t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)

      if (tm.svg) {
        //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
        if (_useSVGTransformAttr && t.style[_transformProp]) {
          _TweenLite.default.delayedCall(0.001, function () {
            //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
            _removeProp(t.style, _transformProp);
          });
        } else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
          _TweenLite.default.delayedCall(0.001, function () {
            t.removeAttribute("transform");
          });
        }
      }
    }

    return tm;
  },
      //for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
  _setIETransformRatio = function _setIETransformRatio(v) {
    var t = this.data,
        //refers to the element's _gsTransform object
    ang = -t.rotation * _DEG2RAD,
        skew = ang + t.skewX * _DEG2RAD,
        rnd = 100000,
        a = (Math.cos(ang) * t.scaleX * rnd | 0) / rnd,
        b = (Math.sin(ang) * t.scaleX * rnd | 0) / rnd,
        c = (Math.sin(skew) * -t.scaleY * rnd | 0) / rnd,
        d = (Math.cos(skew) * t.scaleY * rnd | 0) / rnd,
        style = this.t.style,
        cs = this.t.currentStyle,
        filters,
        val;

    if (!cs) {
      return;
    }

    val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)

    b = -c;
    c = -val;
    filters = cs.filter;
    style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight

    var w = this.t.offsetWidth,
        h = this.t.offsetHeight,
        clip = cs.position !== "absolute",
        m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
        ox = t.x + w * t.xPercent / 100,
        oy = t.y + h * t.yPercent / 100,
        dx,
        dy; //if transformOrigin is being used, adjust the offset x and y

    if (t.ox != null) {
      dx = (t.oxp ? w * t.ox * 0.01 : t.ox) - w / 2;
      dy = (t.oyp ? h * t.oy * 0.01 : t.oy) - h / 2;
      ox += dx - (dx * a + dy * b);
      oy += dy - (dx * c + dy * d);
    }

    if (!clip) {
      m += ", sizingMethod='auto expand')";
    } else {
      dx = w / 2;
      dy = h / 2; //translate to ensure that transformations occur around the correct origin (default is center).

      m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
    }

    if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
      style.filter = filters.replace(_ieSetMatrixExp, m);
    } else {
      style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
    } //at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.


    if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
      style.removeAttribute("filter");
    } //we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).

    if (!clip) {
      var mult = _ieVers < 8 ? 1 : -1,
          //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
      marg,
          prop,
          dif;
      dx = t.ieOffsetX || 0;
      dy = t.ieOffsetY || 0;
      t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
      t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);

      for (i = 0; i < 4; i++) {
        prop = _margins[i];
        marg = cs[prop]; //we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)

        val = marg.indexOf("px") !== -1 ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;

        if (val !== t[prop]) {
          dif = i < 2 ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
        } else {
          dif = i < 2 ? dx - t.ieOffsetX : dy - t.ieOffsetY;
        }

        style[prop] = (t[prop] = Math.round(val - dif * (i === 0 || i === 2 ? 1 : mult))) + "px";
      }
    }
  },

  /* translates a super small decimal to a string WITHOUT scientific notation
  _safeDecimal = function(n) {
  	var s = (n < 0 ? -n : n) + "",
  		a = s.split("e-");
  	return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
  },
  */
  _setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function (v) {
    var t = this.data,
        //refers to the element's _gsTransform object
    style = this.t.style,
        angle = t.rotation,
        rotationX = t.rotationX,
        rotationY = t.rotationY,
        sx = t.scaleX,
        sy = t.scaleY,
        sz = t.scaleZ,
        x = t.x,
        y = t.y,
        z = t.z,
        isSVG = t.svg,
        perspective = t.perspective,
        force3D = t.force3D,
        skewY = t.skewY,
        skewX = t.skewX,
        t1,
        a11,
        a12,
        a13,
        a21,
        a22,
        a23,
        a31,
        a32,
        a33,
        a41,
        a42,
        a43,
        zOrigin,
        min,
        cos,
        sin,
        t2,
        transform,
        comma,
        zero,
        skew,
        rnd;

    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewX += skewY;
      angle += skewY;
    } //check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)


    if (((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1 || _useSVGTransformAttr && isSVG || !_supports3D) {
      //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.
      //2D
      if (angle || skewX || isSVG) {
        angle *= _DEG2RAD;
        skew = skewX * _DEG2RAD;
        rnd = 100000;
        a11 = Math.cos(angle) * sx;
        a21 = Math.sin(angle) * sx;
        a12 = Math.sin(angle - skew) * -sy;
        a22 = Math.cos(angle - skew) * sy;

        if (skew && t.skewType === "simple") {
          //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
          t1 = Math.tan(skew - skewY * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          a12 *= t1;
          a22 *= t1;

          if (skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }

        if (isSVG) {
          x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
          y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;

          if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) {
            //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
            min = this.t.getBBox();
            x += t.xPercent * 0.01 * min.width;
            y += t.yPercent * 0.01 * min.height;
          }

          min = 0.000001;
          if (x < min) if (x > -min) {
            x = 0;
          }
          if (y < min) if (y > -min) {
            y = 0;
          }
        }

        transform = (a11 * rnd | 0) / rnd + "," + (a21 * rnd | 0) / rnd + "," + (a12 * rnd | 0) / rnd + "," + (a22 * rnd | 0) / rnd + "," + x + "," + y + ")";

        if (isSVG && _useSVGTransformAttr) {
          this.t.setAttribute("transform", "matrix(" + transform);
        } else {
          //some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
          style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
        }
      } else {
        style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
      }

      return;
    }

    if (_isFirefox) {
      //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
      min = 0.0001;

      if (sx < min && sx > -min) {
        sx = sz = 0.00002;
      }

      if (sy < min && sy > -min) {
        sy = sz = 0.00002;
      }

      if (perspective && !t.z && !t.rotationX && !t.rotationY) {
        //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
        perspective = 0;
      }
    }

    if (angle || skewX) {
      angle *= _DEG2RAD;
      cos = a11 = Math.cos(angle);
      sin = a21 = Math.sin(angle);

      if (skewX) {
        angle -= skewX * _DEG2RAD;
        cos = Math.cos(angle);
        sin = Math.sin(angle);

        if (t.skewType === "simple") {
          //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
          t1 = Math.tan((skewX - skewY) * _DEG2RAD);
          t1 = Math.sqrt(1 + t1 * t1);
          cos *= t1;
          sin *= t1;

          if (t.skewY) {
            t1 = Math.tan(skewY * _DEG2RAD);
            t1 = Math.sqrt(1 + t1 * t1);
            a11 *= t1;
            a21 *= t1;
          }
        }
      }

      a12 = -sin;
      a22 = cos;
    } else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) {
      //if we're only translating and/or 2D scaling, this is faster...
      style[_transformProp] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z + "px)" + (sx !== 1 || sy !== 1 ? " scale(" + sx + "," + sy + ")" : "");
      return;
    } else {
      a11 = a22 = 1;
      a12 = a21 = 0;
    } // KEY  INDEX   AFFECTS a[row][column]
    // a11  0       rotation, rotationY, scaleX
    // a21  1       rotation, rotationY, scaleX
    // a31  2       rotationY, scaleX
    // a41  3       rotationY, scaleX
    // a12  4       rotation, skewX, rotationX, scaleY
    // a22  5       rotation, skewX, rotationX, scaleY
    // a32  6       rotationX, scaleY
    // a42  7       rotationX, scaleY
    // a13  8       rotationY, rotationX, scaleZ
    // a23  9       rotationY, rotationX, scaleZ
    // a33  10      rotationY, rotationX, scaleZ
    // a43  11      rotationY, rotationX, perspective, scaleZ
    // a14  12      x, zOrigin, svgOrigin
    // a24  13      y, zOrigin, svgOrigin
    // a34  14      z, zOrigin
    // a44  15
    // rotation: Math.atan2(a21, a11)
    // rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
    // rotationX: Math.atan2(a32, a33)


    a33 = 1;
    a13 = a23 = a31 = a32 = a41 = a42 = 0;
    a43 = perspective ? -1 / perspective : 0;
    zOrigin = t.zOrigin;
    min = 0.000001; //threshold below which browsers use scientific notation which won't work.

    comma = ",";
    zero = "0";
    angle = rotationY * _DEG2RAD;

    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      a31 = -sin;
      a41 = a43 * -sin;
      a13 = a11 * sin;
      a23 = a21 * sin;
      a33 = cos;
      a43 *= cos;
      a11 *= cos;
      a21 *= cos;
    }

    angle = rotationX * _DEG2RAD;

    if (angle) {
      cos = Math.cos(angle);
      sin = Math.sin(angle);
      t1 = a12 * cos + a13 * sin;
      t2 = a22 * cos + a23 * sin;
      a32 = a33 * sin;
      a42 = a43 * sin;
      a13 = a12 * -sin + a13 * cos;
      a23 = a22 * -sin + a23 * cos;
      a33 = a33 * cos;
      a43 = a43 * cos;
      a12 = t1;
      a22 = t2;
    }

    if (sz !== 1) {
      a13 *= sz;
      a23 *= sz;
      a33 *= sz;
      a43 *= sz;
    }

    if (sy !== 1) {
      a12 *= sy;
      a22 *= sy;
      a32 *= sy;
      a42 *= sy;
    }

    if (sx !== 1) {
      a11 *= sx;
      a21 *= sx;
      a31 *= sx;
      a41 *= sx;
    }

    if (zOrigin || isSVG) {
      if (zOrigin) {
        x += a13 * -zOrigin;
        y += a23 * -zOrigin;
        z += a33 * -zOrigin + zOrigin;
      }

      if (isSVG) {
        //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
        x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
        y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
      }

      if (x < min && x > -min) {
        x = zero;
      }

      if (y < min && y > -min) {
        y = zero;
      }

      if (z < min && z > -min) {
        z = 0; //don't use string because we calculate perspective later and need the number.
      }
    } //optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:


    transform = t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(";
    transform += (a11 < min && a11 > -min ? zero : a11) + comma + (a21 < min && a21 > -min ? zero : a21) + comma + (a31 < min && a31 > -min ? zero : a31);
    transform += comma + (a41 < min && a41 > -min ? zero : a41) + comma + (a12 < min && a12 > -min ? zero : a12) + comma + (a22 < min && a22 > -min ? zero : a22);

    if (rotationX || rotationY || sz !== 1) {
      //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
      transform += comma + (a32 < min && a32 > -min ? zero : a32) + comma + (a42 < min && a42 > -min ? zero : a42) + comma + (a13 < min && a13 > -min ? zero : a13);
      transform += comma + (a23 < min && a23 > -min ? zero : a23) + comma + (a33 < min && a33 > -min ? zero : a33) + comma + (a43 < min && a43 > -min ? zero : a43) + comma;
    } else {
      transform += ",0,0,0,0,1,0,";
    }

    transform += x + comma + y + comma + z + comma + (perspective ? 1 + -z / perspective : 1) + ")";
    style[_transformProp] = transform;
  };

  p = Transform.prototype;
  p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
  p.scaleX = p.scaleY = p.scaleZ = 1;

  _registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
    parser: function parser(t, e, parsingProp, cssp, pt, plugin, vars) {
      if (cssp._lastParsedTransform === vars) {
        return pt;
      } //only need to parse the transform once, and only if the browser supports it.


      cssp._lastParsedTransform = vars;
      var scaleFunc = vars.scale && typeof vars.scale === "function" ? vars.scale : 0; //if there's a function-based "scale" value, swap in the resulting numeric value temporarily. Otherwise, if it's called for both scaleX and scaleY independently, they may not match (like if the function uses Math.random()).

      if (scaleFunc) {
        vars.scale = scaleFunc(_index, t);
      }

      var originalGSTransform = t._gsTransform,
          style = t.style,
          min = 0.000001,
          i = _transformProps.length,
          v = vars,
          endRotations = {},
          transformOriginString = "transformOrigin",
          m1 = _getTransform(t, _cs, true, v.parseTransform),
          orig = v.transform && (typeof v.transform === "function" ? v.transform(_index, _target) : v.transform),
          m2,
          copy,
          has3D,
          hasChange,
          dr,
          x,
          y,
          matrix,
          p;

      m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
      cssp._transform = m1;

      if ("rotationZ" in v) {
        v.rotation = v.rotationZ;
      }

      if (orig && typeof orig === "string" && _transformProp) {
        //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
        copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.

        copy[_transformProp] = orig;
        copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.

        copy.position = "absolute";

        if (orig.indexOf("%") !== -1) {
          //%-based translations will fail unless we set the width/height to match the original target...
          copy.width = _getStyle(t, "width");
          copy.height = _getStyle(t, "height");
        }

        _doc.body.appendChild(_tempDiv);

        m2 = _getTransform(_tempDiv, null, false);

        if (m1.skewType === "simple") {
          //the default _getTransform() reports the skewX/scaleY as if skewType is "compensated", thus we need to adjust that here if skewType is "simple".
          m2.scaleY *= Math.cos(m2.skewX * _DEG2RAD);
        }

        if (m1.svg) {
          //if it's an SVG element, x/y part of the matrix will be affected by whatever we use as the origin and the offsets, so compensate here...
          x = m1.xOrigin;
          y = m1.yOrigin;
          m2.x -= m1.xOffset;
          m2.y -= m1.yOffset;

          if (v.transformOrigin || v.svgOrigin) {
            //if this tween is altering the origin, we must factor that in here. The actual work of recording the transformOrigin values and setting up the PropTween is done later (still inside this function) so we cannot leave the changes intact here - we only want to update the x/y accordingly.
            orig = {};

            _parseSVGOrigin(t, _parsePosition(v.transformOrigin), orig, v.svgOrigin, v.smoothOrigin, true);

            x = orig.xOrigin;
            y = orig.yOrigin;
            m2.x -= orig.xOffset - m1.xOffset;
            m2.y -= orig.yOffset - m1.yOffset;
          }

          if (x || y) {
            matrix = _getMatrix(_tempDiv, true);
            m2.x -= x - (x * matrix[0] + y * matrix[2]);
            m2.y -= y - (x * matrix[1] + y * matrix[3]);
          }
        }

        _doc.body.removeChild(_tempDiv);

        if (!m2.perspective) {
          m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        }

        if (v.xPercent != null) {
          m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
        }

        if (v.yPercent != null) {
          m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
        }
      } else if (_typeof(v) === "object") {
        //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
        m2 = {
          scaleX: _parseVal(v.scaleX != null ? v.scaleX : v.scale, m1.scaleX),
          scaleY: _parseVal(v.scaleY != null ? v.scaleY : v.scale, m1.scaleY),
          scaleZ: _parseVal(v.scaleZ, m1.scaleZ),
          x: _parseVal(v.x, m1.x),
          y: _parseVal(v.y, m1.y),
          z: _parseVal(v.z, m1.z),
          xPercent: _parseVal(v.xPercent, m1.xPercent),
          yPercent: _parseVal(v.yPercent, m1.yPercent),
          perspective: _parseVal(v.transformPerspective, m1.perspective)
        };
        dr = v.directionalRotation;

        if (dr != null) {
          if (_typeof(dr) === "object") {
            for (copy in dr) {
              v[copy] = dr[copy];
            }
          } else {
            v.rotation = dr;
          }
        }

        if (typeof v.x === "string" && v.x.indexOf("%") !== -1) {
          m2.x = 0;
          m2.xPercent = _parseVal(v.x, m1.xPercent);
        }

        if (typeof v.y === "string" && v.y.indexOf("%") !== -1) {
          m2.y = 0;
          m2.yPercent = _parseVal(v.y, m1.yPercent);
        }

        m2.rotation = _parseAngle("rotation" in v ? v.rotation : "shortRotation" in v ? v.shortRotation + "_short" : m1.rotation, m1.rotation, "rotation", endRotations);

        if (_supports3D) {
          m2.rotationX = _parseAngle("rotationX" in v ? v.rotationX : "shortRotationX" in v ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
          m2.rotationY = _parseAngle("rotationY" in v ? v.rotationY : "shortRotationY" in v ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
        }

        m2.skewX = _parseAngle(v.skewX, m1.skewX);
        m2.skewY = _parseAngle(v.skewY, m1.skewY);
      }

      if (_supports3D && v.force3D != null) {
        m1.force3D = v.force3D;
        hasChange = true;
      }

      has3D = m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective;

      if (!has3D && v.scale != null) {
        m2.scaleZ = 1; //no need to tween scaleZ.
      }

      while (--i > -1) {
        p = _transformProps[i];
        orig = m2[p] - m1[p];

        if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
          hasChange = true;
          pt = new CSSPropTween(m1, p, m1[p], orig, pt);

          if (p in endRotations) {
            pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
          }

          pt.xs0 = 0; //ensures the value stays numeric in setRatio()

          pt.plugin = plugin;

          cssp._overwriteProps.push(pt.n);
        }
      }

      orig = typeof v.transformOrigin === "function" ? v.transformOrigin(_index, _target) : v.transformOrigin;

      if (m1.svg && (orig || v.svgOrigin)) {
        x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin

        y = m1.yOffset;

        _parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);

        pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.

        pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);

        if (x !== m1.xOffset || y !== m1.yOffset) {
          pt = _addNonTweeningNumericPT(m1, "xOffset", originalGSTransform ? x : m1.xOffset, m1.xOffset, pt, transformOriginString);
          pt = _addNonTweeningNumericPT(m1, "yOffset", originalGSTransform ? y : m1.yOffset, m1.yOffset, pt, transformOriginString);
        }

        orig = "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
      }

      if (orig || _supports3D && has3D && m1.zOrigin) {
        //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
        if (_transformProp) {
          hasChange = true;
          p = _transformOriginProp;

          if (!orig) {
            orig = (_getStyle(t, p, _cs, false, "50% 50%") + "").split(" ");
            orig = orig[0] + " " + orig[1] + " " + m1.zOrigin + "px";
          }

          orig += "";
          pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
          pt.b = style[p];
          pt.plugin = plugin;

          if (_supports3D) {
            copy = m1.zOrigin;
            orig = orig.split(" ");
            m1.zOrigin = (orig.length > 2 ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.

            pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!

            pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)

            pt.b = copy;
            pt.xs0 = pt.e = m1.zOrigin;
          } else {
            pt.xs0 = pt.e = orig;
          } //for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).

        } else {
          _parsePosition(orig + "", m1);
        }
      }

      if (hasChange) {
        cssp._transformType = !(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3) ? 3 : 2; //quicker than calling cssp._enableTransforms();
      }

      if (scaleFunc) {
        vars.scale = scaleFunc;
      }

      return pt;
    },
    allowFunc: true,
    prefix: true
  });

  _registerComplexSpecialProp("boxShadow", {
    defaultValue: "0px 0px 0px 0px #999",
    prefix: true,
    color: true,
    multi: true,
    keyword: "inset"
  });

  _registerComplexSpecialProp("clipPath", {
    defaultValue: "inset(0px)",
    prefix: true,
    multi: true,
    formatter: _getFormatter("inset(0px 0px 0px 0px)", false, true)
  });

  _registerComplexSpecialProp("borderRadius", {
    defaultValue: "0px",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      e = this.format(e);
      var props = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
          style = t.style,
          ea1,
          i,
          es2,
          bs2,
          bs,
          es,
          bn,
          en,
          w,
          h,
          esfx,
          bsfx,
          rel,
          hn,
          vn,
          em;
      w = parseFloat(t.offsetWidth);
      h = parseFloat(t.offsetHeight);
      ea1 = e.split(" ");

      for (i = 0; i < props.length; i++) {
        //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
        if (this.p.indexOf("border")) {
          //older browsers used a prefix
          props[i] = _checkPropPrefix(props[i]);
        }

        bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");

        if (bs.indexOf(" ") !== -1) {
          bs2 = bs.split(" ");
          bs = bs2[0];
          bs2 = bs2[1];
        }

        es = es2 = ea1[i];
        bn = parseFloat(bs);
        bsfx = bs.substr((bn + "").length);
        rel = es.charAt(1) === "=";

        if (rel) {
          en = parseInt(es.charAt(0) + "1", 10);
          es = es.substr(2);
          en *= parseFloat(es);
          esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
        } else {
          en = parseFloat(es);
          esfx = es.substr((en + "").length);
        }

        if (esfx === "") {
          esfx = _suffixMap[p] || bsfx;
        }

        if (esfx !== bsfx) {
          hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.

          vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number

          if (esfx === "%") {
            bs = hn / w * 100 + "%";
            bs2 = vn / h * 100 + "%";
          } else if (esfx === "em") {
            em = _convertToPixels(t, "borderLeft", 1, "em");
            bs = hn / em + "em";
            bs2 = vn / em + "em";
          } else {
            bs = hn + "px";
            bs2 = vn + "px";
          }

          if (rel) {
            es = parseFloat(bs) + en + esfx;
            es2 = parseFloat(bs2) + en + esfx;
          }
        }

        pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
      }

      return pt;
    },
    prefix: true,
    formatter: _getFormatter("0px 0px 0px 0px", false, true)
  });

  _registerComplexSpecialProp("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
    defaultValue: "0px",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      return _parseComplex(t.style, p, this.format(_getStyle(t, p, _cs, false, "0px 0px")), this.format(e), false, "0px", pt);
    },
    prefix: true,
    formatter: _getFormatter("0px 0px", false, true)
  });

  _registerComplexSpecialProp("backgroundPosition", {
    defaultValue: "0 0",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var bp = "background-position",
          cs = _cs || _getComputedStyle(t, null),
          bs = this.format((cs ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
          //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
      es = this.format(e),
          ba,
          ea,
          i,
          pct,
          overlap,
          src;

      if (bs.indexOf("%") !== -1 !== (es.indexOf("%") !== -1) && es.split(",").length < 2) {
        src = _getStyle(t, "backgroundImage").replace(_urlExp, "");

        if (src && src !== "none") {
          ba = bs.split(" ");
          ea = es.split(" ");

          _tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height


          i = 2;

          while (--i > -1) {
            bs = ba[i];
            pct = bs.indexOf("%") !== -1;

            if (pct !== (ea[i].indexOf("%") !== -1)) {
              overlap = i === 0 ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
              ba[i] = pct ? parseFloat(bs) / 100 * overlap + "px" : parseFloat(bs) / overlap * 100 + "%";
            }
          }

          bs = ba.join(" ");
        }
      }

      return this.parseComplex(t.style, bs, es, pt, plugin);
    },
    formatter: _parsePosition
  });

  _registerComplexSpecialProp("backgroundSize", {
    defaultValue: "0 0",
    formatter: function formatter(v) {
      v += ""; //ensure it's a string

      return v.substr(0, 2) === "co" ? v : _parsePosition(v.indexOf(" ") === -1 ? v + " " + v : v); //if set to something like "100% 100%", Safari typically reports the computed style as just "100%" (no 2nd value), but we should ensure that there are two values, so copy the first one. Otherwise, it'd be interpreted as "100% 0" (wrong). Also remember that it could be "cover" or "contain" which we can't tween but should be able to set.
    }
  });

  _registerComplexSpecialProp("perspective", {
    defaultValue: "0px",
    prefix: true
  });

  _registerComplexSpecialProp("perspectiveOrigin", {
    defaultValue: "50% 50%",
    prefix: true
  });

  _registerComplexSpecialProp("transformStyle", {
    prefix: true
  });

  _registerComplexSpecialProp("backfaceVisibility", {
    prefix: true
  });

  _registerComplexSpecialProp("userSelect", {
    prefix: true
  });

  _registerComplexSpecialProp("margin", {
    parser: _getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")
  });

  _registerComplexSpecialProp("padding", {
    parser: _getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")
  });

  _registerComplexSpecialProp("clip", {
    defaultValue: "rect(0px,0px,0px,0px)",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var b, cs, delim;

      if (_ieVers < 9) {
        //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
        cs = t.currentStyle;
        delim = _ieVers < 8 ? " " : ",";
        b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
        e = this.format(e).split(",").join(delim);
      } else {
        b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
        e = this.format(e);
      }

      return this.parseComplex(t.style, b, e, pt, plugin);
    }
  });

  _registerComplexSpecialProp("textShadow", {
    defaultValue: "0px 0px 0px #999",
    color: true,
    multi: true
  });

  _registerComplexSpecialProp("autoRound,strictUnits", {
    parser: function parser(t, e, p, cssp, pt) {
      return pt;
    }
  }); //just so that we can ignore these properties (not tween them)


  _registerComplexSpecialProp("border", {
    defaultValue: "0px solid #000",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var bw = _getStyle(t, "borderTopWidth", _cs, false, "0px"),
          end = this.format(e).split(" "),
          esfx = end[0].replace(_suffixExp, "");

      if (esfx !== "px") {
        //if we're animating to a non-px value, we need to convert the beginning width to that unit.
        bw = parseFloat(bw) / _convertToPixels(t, "borderTopWidth", 1, esfx) + esfx;
      }

      return this.parseComplex(t.style, this.format(bw + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), end.join(" "), pt, plugin);
    },
    color: true,
    formatter: function formatter(v) {
      var a = v.split(" ");
      return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
    }
  });

  _registerComplexSpecialProp("borderWidth", {
    parser: _getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
  }); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).


  _registerComplexSpecialProp("float,cssFloat,styleFloat", {
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var s = t.style,
          prop = "cssFloat" in s ? "cssFloat" : "styleFloat";
      return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
    }
  }); //opacity-related


  var _setIEOpacityRatio = function _setIEOpacityRatio(v) {
    var t = this.t,
        //refers to the element's style property
    filters = t.filter || _getStyle(this.data, "filter") || "",
        val = this.s + this.c * v | 0,
        skip;

    if (val === 100) {
      //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
      if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
        t.removeAttribute("filter");
        skip = !_getStyle(this.data, "filter"); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
      } else {
        t.filter = filters.replace(_alphaFilterExp, "");
        skip = true;
      }
    }

    if (!skip) {
      if (this.xn1) {
        t.filter = filters = filters || "alpha(opacity=" + val + ")"; //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
      }

      if (filters.indexOf("pacity") === -1) {
        //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
        if (val !== 0 || !this.xn1) {
          //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
          t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
        }
      } else {
        t.filter = filters.replace(_opacityExp, "opacity=" + val);
      }
    }
  };

  _registerComplexSpecialProp("opacity,alpha,autoAlpha", {
    defaultValue: "1",
    parser: function parser(t, e, p, cssp, pt, plugin) {
      var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
          style = t.style,
          isAutoAlpha = p === "autoAlpha";

      if (typeof e === "string" && e.charAt(1) === "=") {
        e = (e.charAt(0) === "-" ? -1 : 1) * parseFloat(e.substr(2)) + b;
      }

      if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) {
        //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
        b = 0;
      }

      if (_supportsOpacity) {
        pt = new CSSPropTween(style, "opacity", b, e - b, pt);
      } else {
        pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
        pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.

        style.zoom = 1; //helps correct an IE issue.

        pt.type = 2;
        pt.b = "alpha(opacity=" + pt.s + ")";
        pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
        pt.data = t;
        pt.plugin = plugin;
        pt.setRatio = _setIEOpacityRatio;
      }

      if (isAutoAlpha) {
        //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
        pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, b !== 0 ? "inherit" : "hidden", e === 0 ? "hidden" : "inherit");
        pt.xs0 = "inherit";

        cssp._overwriteProps.push(pt.n);

        cssp._overwriteProps.push(p);
      }

      return pt;
    }
  });

  var _removeProp = function _removeProp(s, p) {
    if (p) {
      if (s.removeProperty) {
        if (p.substr(0, 2) === "ms" || p.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          p = "-" + p;
        }

        s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        s.removeAttribute(p);
      }
    }
  },
      _setClassNameRatio = function _setClassNameRatio(v) {
    this.t._gsClassPT = this;

    if (v === 1 || v === 0) {
      this.t.setAttribute("class", v === 0 ? this.b : this.e);
      var mpt = this.data,
          //first MiniPropTween
      s = this.t.style;

      while (mpt) {
        if (!mpt.v) {
          _removeProp(s, mpt.p);
        } else {
          s[mpt.p] = mpt.v;
        }

        mpt = mpt._next;
      }

      if (v === 1 && this.t._gsClassPT === this) {
        this.t._gsClassPT = null;
      }
    } else if (this.t.getAttribute("class") !== this.e) {
      this.t.setAttribute("class", this.e);
    }
  };

  _registerComplexSpecialProp("className", {
    parser: function parser(t, e, p, cssp, pt, plugin, vars) {
      var b = t.getAttribute("class") || "",
          //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
      cssText = t.style.cssText,
          difData,
          bs,
          cnpt,
          cnptLookup,
          mpt;
      pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
      pt.setRatio = _setClassNameRatio;
      pt.pr = -11;
      _hasPriority = true;
      pt.b = b;
      bs = _getAllStyles(t, _cs); //if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)

      cnpt = t._gsClassPT;

      if (cnpt) {
        cnptLookup = {};
        mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.

        while (mpt) {
          cnptLookup[mpt.p] = 1;
          mpt = mpt._next;
        }

        cnpt.setRatio(1);
      }

      t._gsClassPT = pt;
      pt.e = e.charAt(1) !== "=" ? e : b.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + (e.charAt(0) === "+" ? " " + e.substr(2) : "");
      t.setAttribute("class", pt.e);
      difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
      t.setAttribute("class", b);
      pt.data = difData.firstMPT;
      t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).

      pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)

      return pt;
    }
  });

  var _setClearPropsRatio = function _setClearPropsRatio(v) {
    if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") {
      //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
      var s = this.t.style,
          transformParse = _specialProps.transform.parse,
          a,
          p,
          i,
          clearTransform,
          transform;

      if (this.e === "all") {
        s.cssText = "";
        clearTransform = true;
      } else {
        a = this.e.split(" ").join("").split(",");
        i = a.length;

        while (--i > -1) {
          p = a[i];

          if (_specialProps[p]) {
            if (_specialProps[p].parse === transformParse) {
              clearTransform = true;
            } else {
              p = p === "transformOrigin" ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
            }
          }

          _removeProp(s, p);
        }
      }

      if (clearTransform) {
        _removeProp(s, _transformProp);

        transform = this.t._gsTransform;

        if (transform) {
          if (transform.svg) {
            this.t.removeAttribute("data-svg-origin");
            this.t.removeAttribute("transform");
          }

          delete this.t._gsTransform;
        }
      }
    }
  };

  _registerComplexSpecialProp("clearProps", {
    parser: function parser(t, e, p, cssp, pt) {
      pt = new CSSPropTween(t, p, 0, 0, pt, 2);
      pt.setRatio = _setClearPropsRatio;
      pt.e = e;
      pt.pr = -10;
      pt.data = cssp._tween;
      _hasPriority = true;
      return pt;
    }
  });

  p = "bezier,throwProps,physicsProps,physics2D".split(",");
  i = p.length;

  while (i--) {
    _registerPluginProp(p[i]);
  }

  p = CSSPlugin.prototype;
  p._firstPT = p._lastParsedTransform = p._transform = null; //gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.

  p._onInitTween = function (target, vars, tween, index) {
    if (!target.nodeType) {
      //css is only for dom elements
      return false;
    }

    this._target = _target = target;
    this._tween = tween;
    this._vars = vars;
    _index = index;
    _autoRound = vars.autoRound;
    _hasPriority = false;
    _suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
    _cs = _getComputedStyle(target, "");
    _overwriteProps = this._overwriteProps;
    var style = target.style,
        v,
        pt,
        pt2,
        first,
        last,
        next,
        zIndex,
        tpt,
        threeD;
    if (_reqSafariFix) if (style.zIndex === "") {
      v = _getStyle(target, "zIndex", _cs);

      if (v === "auto" || v === "") {
        //corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
        this._addLazySet(style, "zIndex", 0);
      }
    }

    if (typeof vars === "string") {
      first = style.cssText;
      v = _getAllStyles(target, _cs);
      style.cssText = first + ";" + vars;
      v = _cssDif(target, v, _getAllStyles(target)).difs;

      if (!_supportsOpacity && _opacityValExp.test(vars)) {
        v.opacity = parseFloat(RegExp.$1);
      }

      vars = v;
      style.cssText = first;
    }

    if (vars.className) {
      //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
      this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
    } else {
      this._firstPT = pt = this.parse(target, vars, null);
    }

    if (this._transformType) {
      threeD = this._transformType === 3;

      if (!_transformProp) {
        style.zoom = 1; //helps correct an IE issue.
      } else if (_isSafari) {
        _reqSafariFix = true; //if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).

        if (style.zIndex === "") {
          zIndex = _getStyle(target, "zIndex", _cs);

          if (zIndex === "auto" || zIndex === "") {
            this._addLazySet(style, "zIndex", 0);
          }
        } //Setting WebkitBackfaceVisibility corrects 3 bugs:
        // 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
        // 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
        // 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
        //Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.


        if (_isSafariLT6) {
          this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
        }
      }

      pt2 = pt;

      while (pt2 && pt2._next) {
        pt2 = pt2._next;
      }

      tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);

      this._linkCSSP(tpt, null, pt2);

      tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
      tpt.data = this._transform || _getTransform(target, _cs, true);
      tpt.tween = tween;
      tpt.pr = -1; //ensures that the transforms get applied after the components are updated.

      _overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.

    }

    if (_hasPriority) {
      //reorders the linked list in order of pr (priority)
      while (pt) {
        next = pt._next;
        pt2 = first;

        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }

        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }

        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }

        pt = next;
      }

      this._firstPT = first;
    }

    return true;
  };

  p.parse = function (target, vars, pt, plugin) {
    var style = target.style,
        p,
        sp,
        bn,
        en,
        bs,
        es,
        bsfx,
        esfx,
        isStr,
        rel;

    for (p in vars) {
      es = vars[p]; //ending value string

      sp = _specialProps[p]; //SpecialProp lookup.

      if (typeof es === "function" && !(sp && sp.allowFunc)) {
        es = es(_index, _target);
      }

      if (sp) {
        pt = sp.parse(target, es, p, this, pt, plugin, vars);
      } else if (p.substr(0, 2) === "--") {
        //for tweening CSS variables (which always start with "--"). To maximize performance and simplicity, we bypass CSSPlugin altogether and just add a normal property tween to the tween instance itself.
        this._tween._propLookup[p] = this._addTween.call(this._tween, target.style, "setProperty", _getComputedStyle(target).getPropertyValue(p) + "", es + "", p, false, p);
        continue;
      } else {
        bs = _getStyle(target, p, _cs) + "";
        isStr = typeof es === "string";

        if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || isStr && _rgbhslExp.test(es)) {
          //Opera uses background: to define color sometimes in addition to backgroundColor:
          if (!isStr) {
            es = _parseColor(es);
            es = (es.length > 3 ? "rgba(" : "rgb(") + es.join(",") + ")";
          }

          pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);
        } else if (isStr && _complexExp.test(es)) {
          pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);
        } else {
          bn = parseFloat(bs);
          bsfx = bn || bn === 0 ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.

          if (bs === "" || bs === "auto") {
            if (p === "width" || p === "height") {
              bn = _getDimension(target, p, _cs);
              bsfx = "px";
            } else if (p === "left" || p === "top") {
              bn = _calculateOffset(target, p, _cs);
              bsfx = "px";
            } else {
              bn = p !== "opacity" ? 0 : 1;
              bsfx = "";
            }
          }

          rel = isStr && es.charAt(1) === "=";

          if (rel) {
            en = parseInt(es.charAt(0) + "1", 10);
            es = es.substr(2);
            en *= parseFloat(es);
            esfx = es.replace(_suffixExp, "");
          } else {
            en = parseFloat(es);
            esfx = isStr ? es.replace(_suffixExp, "") : "";
          }

          if (esfx === "") {
            esfx = p in _suffixMap ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
          }

          es = en || en === 0 ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
          //if the beginning/ending suffixes don't match, normalize them...

          if (bsfx !== esfx) if (esfx !== "" || p === "lineHeight") if (en || en === 0) if (bn) {
            //note: if the beginning value (bn) is 0, we don't need to convert units!
            bn = _convertToPixels(target, p, bn, bsfx);

            if (esfx === "%") {
              bn /= _convertToPixels(target, p, 100, "%") / 100;

              if (vars.strictUnits !== true) {
                //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
                bs = bn + "%";
              }
            } else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
              bn /= _convertToPixels(target, p, 1, esfx); //otherwise convert to pixels.
            } else if (esfx !== "px") {
              en = _convertToPixels(target, p, en, esfx);
              esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
            }

            if (rel) if (en || en === 0) {
              es = en + bn + esfx; //the changes we made affect relative calculations, so adjust the end value here.
            }
          }

          if (rel) {
            en += bn;
          }

          if ((bn || bn === 0) && (en || en === 0)) {
            //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
            pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, _autoRound !== false && (esfx === "px" || p === "zIndex"), 0, bs, es);
            pt.xs0 = esfx; //DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
          } else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
            _log("invalid " + p + " tween value: " + vars[p]);
          } else {
            pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
            pt.xs0 = es === "none" && (p === "display" || p.indexOf("Style") !== -1) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
            //DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
          }
        }
      }

      if (plugin) if (pt && !pt.plugin) {
        pt.plugin = plugin;
      }
    }

    return pt;
  }; //gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.


  p.setRatio = function (v) {
    var pt = this._firstPT,
        min = 0.000001,
        val,
        str,
        i; //at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).

    if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
      while (pt) {
        if (pt.type !== 2) {
          if (pt.r && pt.type !== -1) {
            val = pt.r(pt.s + pt.c);

            if (!pt.type) {
              pt.t[pt.p] = val + pt.xs0;
            } else if (pt.type === 1) {
              //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
              i = pt.l;
              str = pt.xs0 + val + pt.xs1;

              for (i = 1; i < pt.l; i++) {
                str += pt["xn" + i] + pt["xs" + (i + 1)];
              }

              pt.t[pt.p] = str;
            }
          } else {
            pt.t[pt.p] = pt.e;
          }
        } else {
          pt.setRatio(v);
        }

        pt = pt._next;
      }
    } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
      while (pt) {
        val = pt.c * v + pt.s;

        if (pt.r) {
          val = pt.r(val);
        } else if (val < min) if (val > -min) {
          val = 0;
        }

        if (!pt.type) {
          pt.t[pt.p] = val + pt.xs0;
        } else if (pt.type === 1) {
          //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
          i = pt.l;

          if (i === 2) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
          } else if (i === 3) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
          } else if (i === 4) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
          } else if (i === 5) {
            pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
          } else {
            str = pt.xs0 + val + pt.xs1;

            for (i = 1; i < pt.l; i++) {
              str += pt["xn" + i] + pt["xs" + (i + 1)];
            }

            pt.t[pt.p] = str;
          }
        } else if (pt.type === -1) {
          //non-tweening value
          pt.t[pt.p] = pt.xs0;
        } else if (pt.setRatio) {
          //custom setRatio() for things like SpecialProps, external plugins, etc.
          pt.setRatio(v);
        }

        pt = pt._next;
      } //if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).

    } else {
      while (pt) {
        if (pt.type !== 2) {
          pt.t[pt.p] = pt.b;
        } else {
          pt.setRatio(v);
        }

        pt = pt._next;
      }
    }
  };
  /**
   * @private
   * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
   * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
   * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
   * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
   * doesn't have any transform-related properties of its own. You can call this method as many times as you
   * want and it won't create duplicate CSSPropTweens.
   *
   * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
   */


  p._enableTransforms = function (threeD) {
    this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.

    this._transformType = !(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3) ? 3 : 2;
  };

  var lazySet = function lazySet(v) {
    this.t[this.p] = this.e;

    this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.

  };
  /** @private Gives us a way to set a value on the first render (and only the first render). **/


  p._addLazySet = function (t, p, v) {
    var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
    pt.e = v;
    pt.setRatio = lazySet;
    pt.data = this;
  };
  /** @private **/


  p._linkCSSP = function (pt, next, prev, remove) {
    if (pt) {
      if (next) {
        next._prev = pt;
      }

      if (pt._next) {
        pt._next._prev = pt._prev;
      }

      if (pt._prev) {
        pt._prev._next = pt._next;
      } else if (this._firstPT === pt) {
        this._firstPT = pt._next;
        remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
      }

      if (prev) {
        prev._next = pt;
      } else if (!remove && this._firstPT === null) {
        this._firstPT = pt;
      }

      pt._next = next;
      pt._prev = prev;
    }

    return pt;
  };

  p._mod = function (lookup) {
    var pt = this._firstPT;

    while (pt) {
      if (typeof lookup[pt.p] === "function") {
        //only gets called by RoundPropsPlugin (ModifyPlugin manages all the rendering internally for CSSPlugin properties that need modification). Remember, we handle rounding a bit differently in this plugin for performance reasons, leveraging "r" as an indicator that the value should be rounded internally.
        pt.r = lookup[pt.p];
      }

      pt = pt._next;
    }
  }; //we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.


  p._kill = function (lookup) {
    var copy = lookup,
        pt,
        p,
        xfirst;

    if (lookup.autoAlpha || lookup.alpha) {
      copy = {};

      for (p in lookup) {
        //copy the lookup so that we're not changing the original which may be passed elsewhere.
        copy[p] = lookup[p];
      }

      copy.opacity = 1;

      if (copy.autoAlpha) {
        copy.visibility = 1;
      }
    }

    if (lookup.className && (pt = this._classNamePT)) {
      //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
      xfirst = pt.xfirst;

      if (xfirst && xfirst._prev) {
        this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev

      } else if (xfirst === this._firstPT) {
        this._firstPT = pt._next;
      }

      if (pt._next) {
        this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
      }

      this._classNamePT = null;
    }

    pt = this._firstPT;

    while (pt) {
      if (pt.plugin && pt.plugin !== p && pt.plugin._kill) {
        //for plugins that are registered with CSSPlugin, we should notify them of the kill.
        pt.plugin._kill(lookup);

        p = pt.plugin;
      }

      pt = pt._next;
    }

    return _TweenLite.TweenPlugin.prototype._kill.call(this, copy);
  }; //used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.


  var _getChildStyles = function _getChildStyles(e, props, targets) {
    var children, i, child, type;

    if (e.slice) {
      i = e.length;

      while (--i > -1) {
        _getChildStyles(e[i], props, targets);
      }

      return;
    }

    children = e.childNodes;
    i = children.length;

    while (--i > -1) {
      child = children[i];
      type = child.type;

      if (child.style) {
        props.push(_getAllStyles(child));

        if (targets) {
          targets.push(child);
        }
      }

      if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
        _getChildStyles(child, props, targets);
      }
    }
  };
  /**
   * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
   * and then compares the style properties of all the target's child elements at the tween's start and end, and
   * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
   * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
   * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
   * is because it creates entirely new tweens that may have completely different targets than the original tween,
   * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
   * and it would create other problems. For example:
   *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
   *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
   *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
   *
   * @param {Object} target object to be tweened
   * @param {number} Duration in seconds (or frames for frames-based tweens)
   * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
   * @return {Array} An array of TweenLite instances
   */


  CSSPlugin.cascadeTo = function (target, duration, vars) {
    var tween = _TweenLite.default.to(target, duration, vars),
        results = [tween],
        b = [],
        e = [],
        targets = [],
        _reservedProps = _TweenLite.default._internals.reservedProps,
        i,
        difs,
        p,
        from;

    target = tween._targets || tween.target;

    _getChildStyles(target, b, targets);

    tween.render(duration, true, true);

    _getChildStyles(target, e);

    tween.render(0, true, true);

    tween._enabled(true);

    i = targets.length;

    while (--i > -1) {
      difs = _cssDif(targets[i], b[i], e[i]);

      if (difs.firstMPT) {
        difs = difs.difs;

        for (p in vars) {
          if (_reservedProps[p]) {
            difs[p] = vars[p];
          }
        }

        from = {};

        for (p in difs) {
          from[p] = b[i][p];
        }

        results.push(_TweenLite.default.fromTo(targets[i], duration, from, difs));
      }
    }

    return results;
  };

  _TweenLite.TweenPlugin.activate([CSSPlugin]);

  return CSSPlugin;
}, true);

var CSSPlugin = _TweenLite.globals.CSSPlugin;
exports.default = exports.CSSPlugin = CSSPlugin;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/AttrPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AttrPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 0.6.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
var AttrPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "attr",
  API: 2,
  version: "0.6.1",
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    var p, end;

    if (typeof target.setAttribute !== "function") {
      return false;
    }

    for (p in value) {
      end = value[p];

      if (typeof end === "function") {
        end = end(index, target);
      }

      this._addTween(target, "setAttribute", target.getAttribute(p) + "", end + "", p, false, p);

      this._overwriteProps.push(p);
    }

    return true;
  }
});

exports.default = exports.AttrPlugin = AttrPlugin;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/RoundPropsPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p = exports._roundLinkedList = exports._getRoundFunc = exports.default = exports.RoundPropsPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var RoundPropsPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "roundProps",
  version: "1.7.0",
  priority: -1,
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween) {
    this._tween = tween;
    return true;
  }
}),
    _getRoundFunc = function _getRoundFunc(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = v < 1 ? Math.pow(10, (v + "").length - 2) : 1; //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed()

  return function (n) {
    return (Math.round(n / v) * v * p | 0) / p;
  };
},
    _roundLinkedList = function _roundLinkedList(node, mod) {
  while (node) {
    if (!node.f && !node.blob) {
      node.m = mod || Math.round;
    }

    node = node._next;
  }
},
    p = RoundPropsPlugin.prototype;

exports.p = p;
exports._roundLinkedList = _roundLinkedList;
exports._getRoundFunc = _getRoundFunc;
exports.default = exports.RoundPropsPlugin = RoundPropsPlugin;

p._onInitAllProps = function () {
  var tween = this._tween,
      rp = tween.vars.roundProps,
      lookup = {},
      rpt = tween._propLookup.roundProps,
      pt,
      next,
      i,
      p;

  if (_typeof(rp) === "object" && !rp.push) {
    for (p in rp) {
      lookup[p] = _getRoundFunc(rp[p]);
    }
  } else {
    if (typeof rp === "string") {
      rp = rp.split(",");
    }

    i = rp.length;

    while (--i > -1) {
      lookup[rp[i]] = Math.round;
    }
  }

  for (p in lookup) {
    pt = tween._firstPT;

    while (pt) {
      next = pt._next; //record here, because it may get removed

      if (pt.pg) {
        pt.t._mod(lookup);
      } else if (pt.n === p) {
        if (pt.f === 2 && pt.t) {
          //a blob (text containing multiple numeric values)
          _roundLinkedList(pt.t._firstPT, lookup[p]);
        } else {
          this._add(pt.t, p, pt.s, pt.c, lookup[p]); //remove from linked list


          if (next) {
            next._prev = pt._prev;
          }

          if (pt._prev) {
            pt._prev._next = next;
          } else if (tween._firstPT === pt) {
            tween._firstPT = next;
          }

          pt._next = pt._prev = null;
          tween._propLookup[p] = rpt;
        }
      }

      pt = next;
    }
  }

  return false;
};

p._add = function (target, p, s, c, mod) {
  this._addTween(target, p, s, s + c, p, mod || Math.round);

  this._overwriteProps.push(p);
};
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/DirectionalRotationPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DirectionalRotationPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DirectionalRotationPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "directionalRotation",
  version: "0.3.1",
  API: 2,
  //called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, value, tween, index) {
    if (_typeof(value) !== "object") {
      value = {
        rotation: value
      };
    }

    this.finals = {};
    var cap = value.useRadians === true ? Math.PI * 2 : 360,
        min = 0.000001,
        p,
        v,
        start,
        end,
        dif,
        split;

    for (p in value) {
      if (p !== "useRadians") {
        end = value[p];

        if (typeof end === "function") {
          end = end(index, target);
        }

        split = (end + "").split("_");
        v = split[0];
        start = parseFloat(typeof target[p] !== "function" ? target[p] : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]());
        end = this.finals[p] = typeof v === "string" && v.charAt(1) === "=" ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
        dif = end - start;

        if (split.length) {
          v = split.join("_");

          if (v.indexOf("short") !== -1) {
            dif = dif % cap;

            if (dif !== dif % (cap / 2)) {
              dif = dif < 0 ? dif + cap : dif - cap;
            }
          }

          if (v.indexOf("_cw") !== -1 && dif < 0) {
            dif = (dif + cap * 9999999999) % cap - (dif / cap | 0) * cap;
          } else if (v.indexOf("ccw") !== -1 && dif > 0) {
            dif = (dif - cap * 9999999999) % cap - (dif / cap | 0) * cap;
          }
        }

        if (dif > min || dif < -min) {
          this._addTween(target, p, start, start + dif, p);

          this._overwriteProps.push(p);
        }
      }
    }

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(ratio) {
    var pt;

    if (ratio !== 1) {
      this._super.setRatio.call(this, ratio);
    } else {
      pt = this._firstPT;

      while (pt) {
        if (pt.f) {
          pt.t[pt.p](this.finals[pt.p]);
        } else {
          pt.t[pt.p] = this.finals[pt.p];
        }

        pt = pt._next;
      }
    }
  }
});

exports.default = exports.DirectionalRotationPlugin = DirectionalRotationPlugin;
DirectionalRotationPlugin._autoCSS = true;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/TimelineLite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimelineLite = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function () {
  var TimelineLite = function TimelineLite(vars) {
    _TweenLite.SimpleTimeline.call(this, vars);

    var self = this,
        v = self.vars,
        val,
        p;
    self._labels = {};
    self.autoRemoveChildren = !!v.autoRemoveChildren;
    self.smoothChildTiming = !!v.smoothChildTiming;
    self._sortChildren = true;
    self._onUpdate = v.onUpdate;

    for (p in v) {
      val = v[p];
      if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {
        v[p] = self._swapSelfInParams(val);
      }
    }

    if (_isArray(v.tweens)) {
      self.add(v.tweens, 0, v.align, v.stagger);
    }
  },
      _tinyNum = 0.00000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _internals = TimelineLite._internals = {},
      _isSelector = TweenLiteInternals.isSelector,
      _isArray = TweenLiteInternals.isArray,
      _lazyTweens = TweenLiteInternals.lazyTweens,
      _lazyRender = TweenLiteInternals.lazyRender,
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _copy = function _copy(vars) {
    var copy = {},
        p;

    for (p in vars) {
      copy[p] = vars[p];
    }

    return copy;
  },
      _applyCycle = function _applyCycle(vars, targets, i) {
    var alt = vars.cycle,
        p,
        val;

    for (p in alt) {
      val = alt[p];
      vars[p] = typeof val === "function" ? val(i, targets[i], targets) : val[i % val.length];
    }

    delete vars.cycle;
  },
      _pauseCallback = _internals.pauseCallback = function () {},
      _slice = function _slice(a) {
    //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {
      ;
    }

    return b;
  },
      _defaultImmediateRender = function _defaultImmediateRender(tl, toVars, fromVars, defaultFalse) {
    //default to immediateRender:true unless otherwise set in toVars, fromVars or if defaultFalse is passed in as true
    var ir = "immediateRender";

    if (!(ir in toVars)) {
      toVars[ir] = !(fromVars && fromVars[ir] === false || defaultFalse);
    }

    return toVars;
  },
      //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  _distribute = function _distribute(v) {
    if (typeof v === "function") {
      return v;
    }

    var vars = _typeof(v) === "object" ? v : {
      each: v
    },
        //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = vars.ease,
        from = vars.from || 0,
        base = vars.base || 0,
        cache = {},
        isFromKeyword = isNaN(from),
        axis = vars.axis,
        ratio = {
      center: 0.5,
      end: 1
    }[from] || 0;
    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrap;

      if (!distances) {
        wrap = vars.grid === "auto" ? 0 : (vars.grid || [Infinity])[0];

        if (!wrap) {
          max = -Infinity;

          while (max < (max = a[wrap++].getBoundingClientRect().left) && wrap < l) {}

          wrap--;
        }

        distances = cache[l] = [];
        originX = isFromKeyword ? Math.min(wrap, l) * ratio - 0.5 : from % wrap;
        originY = isFromKeyword ? l * ratio / wrap - 0.5 : from / wrap | 0;
        max = 0;
        min = Infinity;

        for (j = 0; j < l; j++) {
          x = j % wrap - originX;
          y = originY - (j / wrap | 0);
          distances[j] = d = !axis ? Math.sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);

          if (d > max) {
            max = d;
          }

          if (d < min) {
            min = d;
          }
        }

        distances.max = max - min;
        distances.min = min;
        distances.v = l = vars.amount || vars.each * (wrap > l ? l : !axis ? Math.max(wrap, l / wrap) : axis === "y" ? l / wrap : wrap) || 0;
        distances.b = l < 0 ? base - l : base;
      }

      l = (distances[i] - distances.min) / distances.max;
      return distances.b + (ease ? ease.getRatio(l) : l) * distances.v;
    };
  },
      p = TimelineLite.prototype = new _TweenLite.SimpleTimeline();

  TimelineLite.version = "2.1.2";
  TimelineLite.distribute = _distribute;
  p.constructor = TimelineLite;
  p.kill()._gc = p._forcingPlayhead = p._hasPause = false;
  /* might use later...
  //translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
  function localToGlobal(time, animation) {
  	while (animation) {
  		time = (time / animation._timeScale) + animation._startTime;
  		animation = animation.timeline;
  	}
  	return time;
  }
  	//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
  function globalToLocal(time, animation) {
  	var scale = 1;
  	time -= localToGlobal(0, animation);
  	while (animation) {
  		scale *= animation._timeScale;
  		animation = animation.timeline;
  	}
  	return time * scale;
  }
  */

  p.to = function (target, duration, vars, position) {
    var Engine = vars.repeat && _globals.TweenMax || _TweenLite.default;
    return duration ? this.add(new Engine(target, duration, vars), position) : this.set(target, vars, position);
  };

  p.from = function (target, duration, vars, position) {
    return this.add((vars.repeat && _globals.TweenMax || _TweenLite.default).from(target, duration, _defaultImmediateRender(this, vars)), position);
  };

  p.fromTo = function (target, duration, fromVars, toVars, position) {
    var Engine = toVars.repeat && _globals.TweenMax || _TweenLite.default;
    toVars = _defaultImmediateRender(this, toVars, fromVars);
    return duration ? this.add(Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
  };

  p.staggerTo = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    var tl = new TimelineLite({
      onComplete: onCompleteAll,
      onCompleteParams: onCompleteAllParams,
      callbackScope: onCompleteAllScope,
      smoothChildTiming: this.smoothChildTiming
    }),
        staggerFunc = _distribute(vars.stagger || stagger),
        startAt = vars.startAt,
        cycle = vars.cycle,
        copy,
        i;

    if (typeof targets === "string") {
      targets = _TweenLite.default.selector(targets) || targets;
    }

    targets = targets || [];

    if (_isSelector(targets)) {
      //if the targets object is a selector, translate it into an array.
      targets = _slice(targets);
    }

    for (i = 0; i < targets.length; i++) {
      copy = _copy(vars);

      if (startAt) {
        copy.startAt = _copy(startAt);

        if (startAt.cycle) {
          _applyCycle(copy.startAt, targets, i);
        }
      }

      if (cycle) {
        _applyCycle(copy, targets, i);

        if (copy.duration != null) {
          duration = copy.duration;
          delete copy.duration;
        }
      }

      tl.to(targets[i], duration, copy, staggerFunc(i, targets[i], targets));
    }

    return this.add(tl, position);
  };

  p.staggerFrom = function (targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    vars.runBackwards = true;
    return this.staggerTo(targets, duration, _defaultImmediateRender(this, vars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  p.staggerFromTo = function (targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
    toVars.startAt = fromVars;
    return this.staggerTo(targets, duration, _defaultImmediateRender(this, toVars, fromVars), stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
  };

  p.call = function (callback, params, scope, position) {
    return this.add(_TweenLite.default.delayedCall(0, callback, params, scope), position);
  };

  p.set = function (target, vars, position) {
    return this.add(new _TweenLite.default(target, 0, _defaultImmediateRender(this, vars, null, true)), position);
  };

  TimelineLite.exportRoot = function (vars, ignoreDelayedCalls) {
    vars = vars || {};

    if (vars.smoothChildTiming == null) {
      vars.smoothChildTiming = true;
    }

    var tl = new TimelineLite(vars),
        root = tl._timeline,
        hasNegativeStart,
        time,
        tween,
        next;

    if (ignoreDelayedCalls == null) {
      ignoreDelayedCalls = true;
    }

    root._remove(tl, true);

    tl._startTime = 0;
    tl._rawPrevTime = tl._time = tl._totalTime = root._time;
    tween = root._first;

    while (tween) {
      next = tween._next;

      if (!ignoreDelayedCalls || !(tween instanceof _TweenLite.default && tween.target === tween.vars.onComplete)) {
        time = tween._startTime - tween._delay;

        if (time < 0) {
          hasNegativeStart = 1;
        }

        tl.add(tween, time);
      }

      tween = next;
    }

    root.add(tl, 0);

    if (hasNegativeStart) {
      //calling totalDuration() will force the adjustment necessary to shift the children forward so none of them start before zero, and moves the timeline backwards the same amount, so the playhead is still aligned where it should be globally, but the timeline doesn't have illegal children that start before zero.
      tl.totalDuration();
    }

    return tl;
  };

  p.add = function (value, position, align, stagger) {
    var self = this,
        curTime,
        l,
        i,
        child,
        tl,
        beforeRawTime;

    if (typeof position !== "number") {
      position = self._parseTimeOrLabel(position, 0, true, value);
    }

    if (!(value instanceof _TweenLite.Animation)) {
      if (value instanceof Array || value && value.push && _isArray(value)) {
        align = align || "normal";
        stagger = stagger || 0;
        curTime = position;
        l = value.length;

        for (i = 0; i < l; i++) {
          if (_isArray(child = value[i])) {
            child = new TimelineLite({
              tweens: child
            });
          }

          self.add(child, curTime);

          if (typeof child !== "string" && typeof child !== "function") {
            if (align === "sequence") {
              curTime = child._startTime + child.totalDuration() / child._timeScale;
            } else if (align === "start") {
              child._startTime -= child.delay();
            }
          }

          curTime += stagger;
        }

        return self._uncache(true);
      } else if (typeof value === "string") {
        return self.addLabel(value, position);
      } else if (typeof value === "function") {
        value = _TweenLite.default.delayedCall(0, value);
      } else {
        throw "Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.";
      }
    }

    _TweenLite.SimpleTimeline.prototype.add.call(self, value, position);

    if (value._time || !value._duration && value._initted) {
      //in case, for example, the _startTime is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
      curTime = (self.rawTime() - value._startTime) * value._timeScale;

      if (!value._duration || Math.abs(Math.max(0, Math.min(value.totalDuration(), curTime))) - value._totalTime > 0.00001) {
        value.render(curTime, false, false);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


    if (self._gc || self._time === self._duration) if (!self._paused) if (self._duration < self.duration()) {
      //in case any of the ancestors had completed but should now be enabled...
      tl = self;
      beforeRawTime = tl.rawTime() > value._startTime; //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.

      while (tl._timeline) {
        if (beforeRawTime && tl._timeline.smoothChildTiming) {
          tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
        } else if (tl._gc) {
          tl._enabled(true, false);
        }

        tl = tl._timeline;
      }
    }
    return self;
  };

  p.remove = function (value) {
    if (value instanceof _TweenLite.Animation) {
      this._remove(value, false);

      var tl = value._timeline = value.vars.useFrames ? _TweenLite.Animation._rootFramesTimeline : _TweenLite.Animation._rootTimeline; //now that it's removed, default it to the root timeline so that if it gets played again, it doesn't jump back into this timeline.

      value._startTime = (value._paused ? value._pauseTime : tl._time) - (!value._reversed ? value._totalTime : value.totalDuration() - value._totalTime) / value._timeScale; //ensure that if it gets played again, the timing is correct.

      return this;
    } else if (value instanceof Array || value && value.push && _isArray(value)) {
      var i = value.length;

      while (--i > -1) {
        this.remove(value[i]);
      }

      return this;
    } else if (typeof value === "string") {
      return this.removeLabel(value);
    }

    return this.kill(null, value);
  };

  p._remove = function (tween, skipDisable) {
    _TweenLite.SimpleTimeline.prototype._remove.call(this, tween, skipDisable);

    var last = this._last;

    if (!last) {
      this._time = this._totalTime = this._duration = this._totalDuration = 0;
    } else if (this._time > this.duration()) {
      this._time = this._duration;
      this._totalTime = this._totalDuration;
    }

    return this;
  };

  p.append = function (value, offsetOrLabel) {
    return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));
  };

  p.insert = p.insertMultiple = function (value, position, align, stagger) {
    return this.add(value, position || 0, align, stagger);
  };

  p.appendMultiple = function (tweens, offsetOrLabel, align, stagger) {
    return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);
  };

  p.addLabel = function (label, position) {
    this._labels[label] = this._parseTimeOrLabel(position);
    return this;
  };

  p.addPause = function (position, callback, params, scope) {
    var t = _TweenLite.default.delayedCall(0, _pauseCallback, params, scope || this);

    t.vars.onComplete = t.vars.onReverseComplete = callback;
    t.data = "isPause";
    this._hasPause = true;
    return this.add(t, position);
  };

  p.removeLabel = function (label) {
    delete this._labels[label];
    return this;
  };

  p.getLabelTime = function (label) {
    return this._labels[label] != null ? this._labels[label] : -1;
  };

  p._parseTimeOrLabel = function (timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {
    var clippedDuration, i; //if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().

    if (ignore instanceof _TweenLite.Animation && ignore.timeline === this) {
      this.remove(ignore);
    } else if (ignore && (ignore instanceof Array || ignore.push && _isArray(ignore))) {
      i = ignore.length;

      while (--i > -1) {
        if (ignore[i] instanceof _TweenLite.Animation && ignore[i].timeline === this) {
          this.remove(ignore[i]);
        }
      }
    }

    clippedDuration = typeof timeOrLabel === "number" && !offsetOrLabel ? 0 : this.duration() > 99999999999 ? this.recent().endTime(false) : this._duration; //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.

    if (typeof offsetOrLabel === "string") {
      return this._parseTimeOrLabel(offsetOrLabel, appendIfAbsent && typeof timeOrLabel === "number" && this._labels[offsetOrLabel] == null ? timeOrLabel - clippedDuration : 0, appendIfAbsent);
    }

    offsetOrLabel = offsetOrLabel || 0;

    if (typeof timeOrLabel === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      i = timeOrLabel.indexOf("=");

      if (i === -1) {
        if (this._labels[timeOrLabel] == null) {
          return appendIfAbsent ? this._labels[timeOrLabel] = clippedDuration + offsetOrLabel : offsetOrLabel;
        }

        return this._labels[timeOrLabel] + offsetOrLabel;
      }

      offsetOrLabel = parseInt(timeOrLabel.charAt(i - 1) + "1", 10) * Number(timeOrLabel.substr(i + 1));
      timeOrLabel = i > 1 ? this._parseTimeOrLabel(timeOrLabel.substr(0, i - 1), 0, appendIfAbsent) : clippedDuration;
    } else if (timeOrLabel == null) {
      timeOrLabel = clippedDuration;
    }

    return Number(timeOrLabel) + offsetOrLabel;
  };

  p.seek = function (position, suppressEvents) {
    return this.totalTime(typeof position === "number" ? position : this._parseTimeOrLabel(position), suppressEvents !== false);
  };

  p.stop = function () {
    return this.paused(true);
  };

  p.gotoAndPlay = function (position, suppressEvents) {
    return this.play(position, suppressEvents);
  };

  p.gotoAndStop = function (position, suppressEvents) {
    return this.pause(position, suppressEvents);
  };

  p.render = function (time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }

    var self = this,
        prevTime = self._time,
        totalDur = !self._dirty ? self._totalDuration : self.totalDuration(),
        prevStart = self._startTime,
        prevTimeScale = self._timeScale,
        prevPaused = self._paused,
        tween,
        isComplete,
        next,
        callback,
        internalForce,
        pauseTween,
        curTime,
        pauseTime;

    if (prevTime !== self._time) {
      //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
      time += self._time - prevTime;
    }

    if (time >= totalDur - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      self._totalTime = self._time = totalDur;
      if (!self._reversed) if (!self._hasPausedChild()) {
        isComplete = true;
        callback = "onComplete";
        internalForce = !!self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.

        if (self._duration === 0) if (time <= 0 && time >= -_tinyNum || self._rawPrevTime < 0 || self._rawPrevTime === _tinyNum) if (self._rawPrevTime !== time && self._first) {
          internalForce = true;

          if (self._rawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
      }
      self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

      time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      self._totalTime = self._time = 0;

      if (time > -_tinyNum) {
        time = 0;
      }

      if (prevTime !== 0 || self._duration === 0 && self._rawPrevTime !== _tinyNum && (self._rawPrevTime > 0 || time < 0 && self._rawPrevTime >= 0)) {
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time < 0) {
        self._active = false;

        if (self._timeline.autoRemoveChildren && self._reversed) {
          //ensures proper GC if a timeline is resumed after it's finished reversing.
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (self._rawPrevTime >= 0 && self._first) {
          //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
          internalForce = true;
        }

        self._rawPrevTime = time;
      } else {
        self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

        if (time === 0 && isComplete) {
          //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
          tween = self._first;

          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }

            tween = tween._next;
          }
        }

        time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

        if (!self._initted) {
          internalForce = true;
        }
      }
    } else {
      if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
        if (time >= prevTime) {
          tween = self._first;

          while (tween && tween._startTime <= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
              pauseTween = tween;
            }
            tween = tween._next;
          }
        } else {
          tween = self._last;

          while (tween && tween._startTime >= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
              pauseTween = tween;
            }
            tween = tween._prev;
          }
        }

        if (pauseTween) {
          self._time = self._totalTime = time = pauseTween._startTime;
          pauseTime = self._startTime + time / self._timeScale;
        }
      }

      self._totalTime = self._time = self._rawPrevTime = time;
    }

    if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
      return;
    } else if (!self._initted) {
      self._initted = true;
    }

    if (!self._active) if (!self._paused && self._time !== prevTime && time > 0) {
      self._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
    }
    if (prevTime === 0) if (self.vars.onStart) if (self._time !== 0 || !self._duration) if (!suppressEvents) {
      self._callback("onStart");
    }
    curTime = self._time;

    if (curTime >= prevTime) {
      tween = self._first;

      while (tween) {
        next = tween._next; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= curTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    } else {
      tween = self._last;

      while (tween) {
        next = tween._prev; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.

            while (pauseTween && pauseTween.endTime() > self._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }

            pauseTween = null;
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    }

    if (self._onUpdate) if (!suppressEvents) {
      if (_lazyTweens.length) {
        //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
        _lazyRender();
      }

      self._callback("onUpdate");
    }
    if (callback) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (self._time === 0 || totalDur >= self.totalDuration()) {
      //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
      if (isComplete) {
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
          _lazyRender();
        }

        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }
    }
  };

  p._hasPausedChild = function () {
    var tween = this._first;

    while (tween) {
      if (tween._paused || tween instanceof TimelineLite && tween._hasPausedChild()) {
        return true;
      }

      tween = tween._next;
    }

    return false;
  };

  p.getChildren = function (nested, tweens, timelines, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || -9999999999;
    var a = [],
        tween = this._first,
        cnt = 0;

    while (tween) {
      if (tween._startTime < ignoreBeforeTime) {//do nothing
      } else if (tween instanceof _TweenLite.default) {
        if (tweens !== false) {
          a[cnt++] = tween;
        }
      } else {
        if (timelines !== false) {
          a[cnt++] = tween;
        }

        if (nested !== false) {
          a = a.concat(tween.getChildren(true, tweens, timelines));
          cnt = a.length;
        }
      }

      tween = tween._next;
    }

    return a;
  };

  p.getTweensOf = function (target, nested) {
    var disabled = this._gc,
        a = [],
        cnt = 0,
        tweens,
        i;

    if (disabled) {
      this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.

    }

    tweens = _TweenLite.default.getTweensOf(target);
    i = tweens.length;

    while (--i > -1) {
      if (tweens[i].timeline === this || nested && this._contains(tweens[i])) {
        a[cnt++] = tweens[i];
      }
    }

    if (disabled) {
      this._enabled(false, true);
    }

    return a;
  };

  p.recent = function () {
    return this._recent;
  };

  p._contains = function (tween) {
    var tl = tween.timeline;

    while (tl) {
      if (tl === this) {
        return true;
      }

      tl = tl.timeline;
    }

    return false;
  };

  p.shiftChildren = function (amount, adjustLabels, ignoreBeforeTime) {
    ignoreBeforeTime = ignoreBeforeTime || 0;
    var tween = this._first,
        labels = this._labels,
        p;

    while (tween) {
      if (tween._startTime >= ignoreBeforeTime) {
        tween._startTime += amount;
      }

      tween = tween._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return this._uncache(true);
  };

  p._kill = function (vars, target) {
    if (!vars && !target) {
      return this._enabled(false, false);
    }

    var tweens = !target ? this.getChildren(true, true, false) : this.getTweensOf(target),
        i = tweens.length,
        changed = false;

    while (--i > -1) {
      if (tweens[i]._kill(vars, target)) {
        changed = true;
      }
    }

    return changed;
  };

  p.clear = function (labels) {
    var tweens = this.getChildren(false, true, true),
        i = tweens.length;
    this._time = this._totalTime = 0;

    while (--i > -1) {
      tweens[i]._enabled(false, false);
    }

    if (labels !== false) {
      this._labels = {};
    }

    return this._uncache(true);
  };

  p.invalidate = function () {
    var tween = this._first;

    while (tween) {
      tween.invalidate();
      tween = tween._next;
    }

    return _TweenLite.Animation.prototype.invalidate.call(this);
    ;
  };

  p._enabled = function (enabled, ignoreTimeline) {
    if (enabled === this._gc) {
      var tween = this._first;

      while (tween) {
        tween._enabled(enabled, true);

        tween = tween._next;
      }
    }

    return _TweenLite.SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
  };

  p.totalTime = function (time, suppressEvents, uncapped) {
    this._forcingPlayhead = true;

    var val = _TweenLite.Animation.prototype.totalTime.apply(this, arguments);

    this._forcingPlayhead = false;
    return val;
  };

  p.duration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        this.totalDuration(); //just triggers recalculation
      }

      return this._duration;
    }

    if (this.duration() !== 0 && value !== 0) {
      this.timeScale(this._duration / value);
    }

    return this;
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        var max = 0,
            self = this,
            tween = self._last,
            prevStart = 999999999999,
            prev,
            end;

        while (tween) {
          prev = tween._prev; //record it here in case the tween changes position in the sequence...

          if (tween._dirty) {
            tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
          }

          if (tween._startTime > prevStart && self._sortChildren && !tween._paused && !self._calculatingDuration) {
            //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
            self._calculatingDuration = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add(), like _parseTimeOrLabel().

            self.add(tween, tween._startTime - tween._delay);
            self._calculatingDuration = 0;
          } else {
            prevStart = tween._startTime;
          }

          if (tween._startTime < 0 && !tween._paused) {
            //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
            max -= tween._startTime;

            if (self._timeline.smoothChildTiming) {
              self._startTime += tween._startTime / self._timeScale;
              self._time -= tween._startTime;
              self._totalTime -= tween._startTime;
              self._rawPrevTime -= tween._startTime;
            }

            self.shiftChildren(-tween._startTime, false, -9999999999);
            prevStart = 0;
          }

          end = tween._startTime + tween._totalDuration / tween._timeScale;

          if (end > max) {
            max = end;
          }

          tween = prev;
        }

        self._duration = self._totalDuration = max;
        self._dirty = false;
      }

      return this._totalDuration;
    }

    return value && this.totalDuration() ? this.timeScale(this._totalDuration / value) : this;
  };

  p.paused = function (value) {
    if (value === false && this._paused) {
      //if there's a pause directly at the spot from where we're unpausing, skip it.
      var tween = this._first;

      while (tween) {
        if (tween._startTime === this._time && tween.data === "isPause") {
          tween._rawPrevTime = 0; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
        }

        tween = tween._next;
      }
    }

    return _TweenLite.Animation.prototype.paused.apply(this, arguments);
  };

  p.usesFrames = function () {
    var tl = this._timeline;

    while (tl._timeline) {
      tl = tl._timeline;
    }

    return tl === _TweenLite.Animation._rootFramesTimeline;
  };

  p.rawTime = function (wrapRepeats) {
    return wrapRepeats && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(wrapRepeats) - this._startTime) * this._timeScale;
  };

  return TimelineLite;
}, true);

var TimelineLite = _TweenLite.globals.TimelineLite;
exports.default = exports.TimelineLite = TimelineLite;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/TimelineMax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
exports.default = exports.TimelineMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.1.2
 * DATE: 2019-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
_TweenLite._gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function () {
  var TimelineMax = function TimelineMax(vars) {
    _TimelineLite.default.call(this, vars);

    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;
    this._cycle = 0;
    this._yoyo = !!this.vars.yoyo;
    this._dirty = true;
  },
      _tinyNum = 0.00000001,
      TweenLiteInternals = _TweenLite.default._internals,
      _lazyTweens = TweenLiteInternals.lazyTweens,
      _lazyRender = TweenLiteInternals.lazyRender,
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _easeNone = new _TweenLite.Ease(null, null, 1, 0),
      p = TimelineMax.prototype = new _TimelineLite.default();

  p.constructor = TimelineMax;
  p.kill()._gc = false;
  TimelineMax.version = "2.1.2";

  p.invalidate = function () {
    this._yoyo = !!this.vars.yoyo;
    this._repeat = this.vars.repeat || 0;
    this._repeatDelay = this.vars.repeatDelay || 0;

    this._uncache(true);

    return _TimelineLite.default.prototype.invalidate.call(this);
  };

  p.addCallback = function (callback, position, params, scope) {
    return this.add(_TweenLite.default.delayedCall(0, callback, params, scope), position);
  };

  p.removeCallback = function (callback, position) {
    if (callback) {
      if (position == null) {
        this._kill(null, callback);
      } else {
        var a = this.getTweensOf(callback, false),
            i = a.length,
            time = this._parseTimeOrLabel(position);

        while (--i > -1) {
          if (a[i]._startTime === time) {
            a[i]._enabled(false, false);
          }
        }
      }
    }

    return this;
  };

  p.removePause = function (position) {
    return this.removeCallback(_TimelineLite.default._internals.pauseCallback, position);
  };

  p.tweenTo = function (position, vars) {
    vars = vars || {};
    var copy = {
      ease: _easeNone,
      useFrames: this.usesFrames(),
      immediateRender: false,
      lazy: false
    },
        Engine = vars.repeat && _globals.TweenMax || _TweenLite.default,
        duration,
        p,
        t;

    for (p in vars) {
      copy[p] = vars[p];
    }

    copy.time = this._parseTimeOrLabel(position);
    duration = Math.abs(Number(copy.time) - this._time) / this._timeScale || 0.001;
    t = new Engine(this, duration, copy);

    copy.onStart = function () {
      t.target.paused(true);

      if (t.vars.time !== t.target.time() && duration === t.duration() && !t.isFromTo) {
        //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
        t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale).render(t.time(), true, true); //render() right away to ensure that things look right, especially in the case of .tweenTo(0).
      }

      if (vars.onStart) {
        //in case the user had an onStart in the vars - we don't want to overwrite it.
        vars.onStart.apply(vars.onStartScope || vars.callbackScope || t, vars.onStartParams || []); //don't use t._callback("onStart") or it'll point to the copy.onStart and we'll get a recursion error.
      }
    };

    return t;
  };

  p.tweenFromTo = function (fromPosition, toPosition, vars) {
    vars = vars || {};
    fromPosition = this._parseTimeOrLabel(fromPosition);
    vars.startAt = {
      onComplete: this.seek,
      onCompleteParams: [fromPosition],
      callbackScope: this
    };
    vars.immediateRender = vars.immediateRender !== false;
    var t = this.tweenTo(toPosition, vars);
    t.isFromTo = 1; //to ensure we don't mess with the duration in the onStart (we've got the start and end values here, so lock it in)

    return t.duration(Math.abs(t.vars.time - fromPosition) / this._timeScale || 0.001);
  };

  p.render = function (time, suppressEvents, force) {
    if (this._gc) {
      this._enabled(true, false);
    }

    var self = this,
        prevTime = self._time,
        totalDur = !self._dirty ? self._totalDuration : self.totalDuration(),
        dur = self._duration,
        prevTotalTime = self._totalTime,
        prevStart = self._startTime,
        prevTimeScale = self._timeScale,
        prevRawPrevTime = self._rawPrevTime,
        prevPaused = self._paused,
        prevCycle = self._cycle,
        tween,
        isComplete,
        next,
        callback,
        internalForce,
        cycleDuration,
        pauseTween,
        curTime,
        pauseTime;

    if (prevTime !== self._time) {
      //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
      time += self._time - prevTime;
    }

    if (time >= totalDur - _tinyNum && time >= 0) {
      //to work around occasional floating point math artifacts.
      if (!self._locked) {
        self._totalTime = totalDur;
        self._cycle = self._repeat;
      }

      if (!self._reversed) if (!self._hasPausedChild()) {
        isComplete = true;
        callback = "onComplete";
        internalForce = !!self._timeline.autoRemoveChildren; //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.

        if (self._duration === 0) if (time <= 0 && time >= -_tinyNum || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && self._first) {
          internalForce = true;

          if (prevRawPrevTime > _tinyNum) {
            callback = "onReverseComplete";
          }
        }
      }
      self._rawPrevTime = self._duration || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

      if (self._yoyo && self._cycle & 1) {
        self._time = time = 0;
      } else {
        self._time = dur;
        time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
      }
    } else if (time < _tinyNum) {
      //to work around occasional floating point math artifacts, round super small values to 0.
      if (!self._locked) {
        self._totalTime = self._cycle = 0;
      }

      self._time = 0;

      if (time > -_tinyNum) {
        time = 0;
      }

      if (prevTime !== 0 || dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || time < 0 && prevRawPrevTime >= 0) && !self._locked) {
        //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
        callback = "onReverseComplete";
        isComplete = self._reversed;
      }

      if (time < 0) {
        self._active = false;

        if (self._timeline.autoRemoveChildren && self._reversed) {
          internalForce = isComplete = true;
          callback = "onReverseComplete";
        } else if (prevRawPrevTime >= 0 && self._first) {
          //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
          internalForce = true;
        }

        self._rawPrevTime = time;
      } else {
        self._rawPrevTime = dur || !suppressEvents || time || self._rawPrevTime === time ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.

        if (time === 0 && isComplete) {
          //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
          tween = self._first;

          while (tween && tween._startTime === 0) {
            if (!tween._duration) {
              isComplete = false;
            }

            tween = tween._next;
          }
        }

        time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)

        if (!self._initted) {
          internalForce = true;
        }
      }
    } else {
      if (dur === 0 && prevRawPrevTime < 0) {
        //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
        internalForce = true;
      }

      self._time = self._rawPrevTime = time;

      if (!self._locked) {
        self._totalTime = time;

        if (self._repeat !== 0) {
          cycleDuration = dur + self._repeatDelay;
          self._cycle = self._totalTime / cycleDuration >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)

          if (self._cycle) if (self._cycle === self._totalTime / cycleDuration && prevTotalTime <= time) {
            self._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
          }
          self._time = self._totalTime - self._cycle * cycleDuration;
          if (self._yoyo) if (self._cycle & 1) {
            self._time = dur - self._time;
          }

          if (self._time > dur) {
            self._time = dur;
            time = dur + 0.0001; //to avoid occasional floating point rounding error
          } else if (self._time < 0) {
            self._time = time = 0;
          } else {
            time = self._time;
          }
        }
      }

      if (self._hasPause && !self._forcingPlayhead && !suppressEvents) {
        time = self._time;

        if (time >= prevTime || self._repeat && prevCycle !== self._cycle) {
          tween = self._first;

          while (tween && tween._startTime <= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && !tween.ratio && !(tween._startTime === 0 && self._rawPrevTime === 0)) {
              pauseTween = tween;
            }
            tween = tween._next;
          }
        } else {
          tween = self._last;

          while (tween && tween._startTime >= time && !pauseTween) {
            if (!tween._duration) if (tween.data === "isPause" && tween._rawPrevTime > 0) {
              pauseTween = tween;
            }
            tween = tween._prev;
          }
        }

        if (pauseTween) {
          pauseTime = self._startTime + pauseTween._startTime / self._timeScale;

          if (pauseTween._startTime < dur) {
            self._time = self._rawPrevTime = time = pauseTween._startTime;
            self._totalTime = time + self._cycle * (self._totalDuration + self._repeatDelay);
          }
        }
      }
    }

    if (self._cycle !== prevCycle) if (!self._locked) {
      /*
      make sure children at the end/beginning of the timeline are rendered properly. If, for example,
      a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
      would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
      could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
      we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
      ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.
      */
      var backwards = self._yoyo && (prevCycle & 1) !== 0,
          wrap = backwards === (self._yoyo && (self._cycle & 1) !== 0),
          recTotalTime = self._totalTime,
          recCycle = self._cycle,
          recRawPrevTime = self._rawPrevTime,
          recTime = self._time;
      self._totalTime = prevCycle * dur;

      if (self._cycle < prevCycle) {
        backwards = !backwards;
      } else {
        self._totalTime += dur;
      }

      self._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.

      self._rawPrevTime = dur === 0 ? prevRawPrevTime - 0.0001 : prevRawPrevTime;
      self._cycle = prevCycle;
      self._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()

      prevTime = backwards ? 0 : dur;
      self.render(prevTime, suppressEvents, dur === 0);
      if (!suppressEvents) if (!self._gc) {
        if (self.vars.onRepeat) {
          self._cycle = recCycle; //in case the onRepeat alters the playhead or invalidates(), we shouldn't stay locked or use the previous cycle.

          self._locked = false;

          self._callback("onRepeat");
        }
      }

      if (prevTime !== self._time) {
        //in case there's a callback like onComplete in a nested tween/timeline that changes the playhead position, like via seek(), we should just abort.
        return;
      }

      if (wrap) {
        self._cycle = prevCycle; //if there's an onRepeat, we reverted this above, so make sure it's set properly again. We also unlocked in that scenario, so reset that too.

        self._locked = true;
        prevTime = backwards ? dur + 0.0001 : -0.0001;
        self.render(prevTime, true, false);
      }

      self._locked = false;

      if (self._paused && !prevPaused) {
        //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
        return;
      }

      self._time = recTime;
      self._totalTime = recTotalTime;
      self._cycle = recCycle;
      self._rawPrevTime = recRawPrevTime;
    }

    if ((self._time === prevTime || !self._first) && !force && !internalForce && !pauseTween) {
      if (prevTotalTime !== self._totalTime) if (self._onUpdate) if (!suppressEvents) {
        //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
        self._callback("onUpdate");
      }
      return;
    } else if (!self._initted) {
      self._initted = true;
    }

    if (!self._active) if (!self._paused && self._totalTime !== prevTotalTime && time > 0) {
      self._active = true; //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
    }
    if (prevTotalTime === 0) if (self.vars.onStart) if (self._totalTime !== 0 || !self._totalDuration) if (!suppressEvents) {
      self._callback("onStart");
    }
    curTime = self._time;

    if (curTime >= prevTime) {
      tween = self._first;

      while (tween) {
        next = tween._next; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= self._time && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    } else {
      tween = self._last;

      while (tween) {
        next = tween._prev; //record it here because the value could change after rendering...

        if (curTime !== self._time || self._paused && !prevPaused) {
          //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
          break;
        } else if (tween._active || tween._startTime <= prevTime && !tween._paused && !tween._gc) {
          if (pauseTween === tween) {
            pauseTween = tween._prev; //the linked list is organized by _startTime, thus it's possible that a tween could start BEFORE the pause and end after it, in which case it would be positioned before the pause tween in the linked list, but we should render it before we pause() the timeline and cease rendering. This is only a concern when going in reverse.

            while (pauseTween && pauseTween.endTime() > self._time) {
              pauseTween.render(pauseTween._reversed ? pauseTween.totalDuration() - (time - pauseTween._startTime) * pauseTween._timeScale : (time - pauseTween._startTime) * pauseTween._timeScale, suppressEvents, force);
              pauseTween = pauseTween._prev;
            }

            pauseTween = null;
            self.pause();
            self._pauseTime = pauseTime; //so that when we resume(), it's starting from exactly the right spot (the pause() method uses the rawTime for the parent, but that may be a bit too far ahead)
          }

          if (!tween._reversed) {
            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
          } else {
            tween.render((!tween._dirty ? tween._totalDuration : tween.totalDuration()) - (time - tween._startTime) * tween._timeScale, suppressEvents, force);
          }
        }

        tween = next;
      }
    }

    if (self._onUpdate) if (!suppressEvents) {
      if (_lazyTweens.length) {
        //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
        _lazyRender();
      }

      self._callback("onUpdate");
    }
    if (callback) if (!self._locked) if (!self._gc) if (prevStart === self._startTime || prevTimeScale !== self._timeScale) if (self._time === 0 || totalDur >= self.totalDuration()) {
      //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
      if (isComplete) {
        if (_lazyTweens.length) {
          //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
          _lazyRender();
        }

        if (self._timeline.autoRemoveChildren) {
          self._enabled(false, false);
        }

        self._active = false;
      }

      if (!suppressEvents && self.vars[callback]) {
        self._callback(callback);
      }
    }
  };

  p.getActive = function (nested, tweens, timelines) {
    var a = [],
        all = this.getChildren(nested || nested == null, tweens || nested == null, !!timelines),
        cnt = 0,
        l = all.length,
        i,
        tween;

    for (i = 0; i < l; i++) {
      tween = all[i];

      if (tween.isActive()) {
        a[cnt++] = tween;
      }
    }

    return a;
  };

  p.getLabelAfter = function (time) {
    if (!time) if (time !== 0) {
      //faster than isNan()
      time = this._time;
    }
    var labels = this.getLabelsArray(),
        l = labels.length,
        i;

    for (i = 0; i < l; i++) {
      if (labels[i].time > time) {
        return labels[i].name;
      }
    }

    return null;
  };

  p.getLabelBefore = function (time) {
    if (time == null) {
      time = this._time;
    }

    var labels = this.getLabelsArray(),
        i = labels.length;

    while (--i > -1) {
      if (labels[i].time < time) {
        return labels[i].name;
      }
    }

    return null;
  };

  p.getLabelsArray = function () {
    var a = [],
        cnt = 0,
        p;

    for (p in this._labels) {
      a[cnt++] = {
        time: this._labels[p],
        name: p
      };
    }

    a.sort(function (a, b) {
      return a.time - b.time;
    });
    return a;
  };

  p.invalidate = function () {
    this._locked = false; //unlock and set cycle in case invalidate() is called from inside an onRepeat

    return _TimelineLite.default.prototype.invalidate.call(this);
  }; //---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------


  p.progress = function (value, suppressEvents) {
    return !arguments.length ? this._time / this.duration() || 0 : this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - value : value) + this._cycle * (this._duration + this._repeatDelay), suppressEvents);
  };

  p.totalProgress = function (value, suppressEvents) {
    return !arguments.length ? this._totalTime / this.totalDuration() || 0 : this.totalTime(this.totalDuration() * value, suppressEvents);
  };

  p.totalDuration = function (value) {
    if (!arguments.length) {
      if (this._dirty) {
        _TimelineLite.default.prototype.totalDuration.call(this); //just forces refresh
        //Instead of Infinity, we use 999999999999 so that we can accommodate reverses.


        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat;
      }

      return this._totalDuration;
    }

    return this._repeat === -1 || !value ? this : this.timeScale(this.totalDuration() / value);
  };

  p.time = function (value, suppressEvents) {
    if (!arguments.length) {
      return this._time;
    }

    if (this._dirty) {
      this.totalDuration();
    }

    var duration = this._duration,
        cycle = this._cycle,
        cycleDur = cycle * (duration + this._repeatDelay);

    if (value > duration) {
      value = duration;
    }

    return this.totalTime(this._yoyo && cycle & 1 ? duration - value + cycleDur : this._repeat ? value + cycleDur : value, suppressEvents);
  };

  p.repeat = function (value) {
    if (!arguments.length) {
      return this._repeat;
    }

    this._repeat = value;
    return this._uncache(true);
  };

  p.repeatDelay = function (value) {
    if (!arguments.length) {
      return this._repeatDelay;
    }

    this._repeatDelay = value;
    return this._uncache(true);
  };

  p.yoyo = function (value) {
    if (!arguments.length) {
      return this._yoyo;
    }

    this._yoyo = value;
    return this;
  };

  p.currentLabel = function (value) {
    if (!arguments.length) {
      return this.getLabelBefore(this._time + _tinyNum);
    }

    return this.seek(value, true);
  };

  return TimelineMax;
}, true);

var TimelineMax = _TweenLite.globals.TimelineMax;
exports.default = exports.TimelineMax = TimelineMax;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js","./TimelineLite.js":"node_modules/gsap/TimelineLite.js"}],"node_modules/gsap/BezierPlugin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BezierPlugin = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.3.8
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
var _RAD2DEG = 180 / Math.PI,
    _r1 = [],
    _r2 = [],
    _r3 = [],
    _corProps = {},
    _globals = _TweenLite._gsScope._gsDefine.globals,
    Segment = function Segment(a, b, c, d) {
  if (c === d) {
    //if c and d match, the final autoRotate value could lock at -90 degrees, so differentiate them slightly.
    c = d - (d - b) / 1000000;
  }

  if (a === b) {
    //if a and b match, the starting autoRotate value could lock at -90 degrees, so differentiate them slightly.
    b = a + (c - a) / 1000000;
  }

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.da = d - a;
  this.ca = c - a;
  this.ba = b - a;
},
    _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
    cubicToQuadratic = function cubicToQuadratic(a, b, c, d) {
  var q1 = {
    a: a
  },
      q2 = {},
      q3 = {},
      q4 = {
    c: d
  },
      mab = (a + b) / 2,
      mbc = (b + c) / 2,
      mcd = (c + d) / 2,
      mabc = (mab + mbc) / 2,
      mbcd = (mbc + mcd) / 2,
      m8 = (mbcd - mabc) / 8;
  q1.b = mab + (a - mab) / 4;
  q2.b = mabc + m8;
  q1.c = q2.a = (q1.b + q2.b) / 2;
  q2.c = q3.a = (mabc + mbcd) / 2;
  q3.b = mbcd - m8;
  q4.b = mcd + (d - mcd) / 4;
  q3.c = q4.a = (q3.b + q4.b) / 2;
  return [q1, q2, q3, q4];
},
    _calculateControlPoints = function _calculateControlPoints(a, curviness, quad, basic, correlate) {
  var l = a.length - 1,
      ii = 0,
      cp1 = a[0].a,
      i,
      p1,
      p2,
      p3,
      seg,
      m1,
      m2,
      mm,
      cp2,
      qb,
      r1,
      r2,
      tl;

  for (i = 0; i < l; i++) {
    seg = a[ii];
    p1 = seg.a;
    p2 = seg.d;
    p3 = a[ii + 1].d;

    if (correlate) {
      r1 = _r1[i];
      r2 = _r2[i];
      tl = (r2 + r1) * curviness * 0.25 / (basic ? 0.5 : _r3[i] || 0.5);
      m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : r1 !== 0 ? tl / r1 : 0);
      m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : r2 !== 0 ? tl / r2 : 0);
      mm = p2 - (m1 + ((m2 - m1) * (r1 * 3 / (r1 + r2) + 0.5) / 4 || 0));
    } else {
      m1 = p2 - (p2 - p1) * curviness * 0.5;
      m2 = p2 + (p3 - p2) * curviness * 0.5;
      mm = p2 - (m1 + m2) / 2;
    }

    m1 += mm;
    m2 += mm;
    seg.c = cp2 = m1;

    if (i !== 0) {
      seg.b = cp1;
    } else {
      seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
    }

    seg.da = p2 - p1;
    seg.ca = cp2 - p1;
    seg.ba = cp1 - p1;

    if (quad) {
      qb = cubicToQuadratic(p1, cp1, cp2, p2);
      a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
      ii += 4;
    } else {
      ii++;
    }

    cp1 = m2;
  }

  seg = a[ii];
  seg.b = cp1;
  seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.

  seg.da = seg.d - seg.a;
  seg.ca = seg.c - seg.a;
  seg.ba = cp1 - seg.a;

  if (quad) {
    qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
    a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
  }
},
    _parseAnchors = function _parseAnchors(values, p, correlate, prepend) {
  var a = [],
      l,
      i,
      p1,
      p2,
      p3,
      tmp;

  if (prepend) {
    values = [prepend].concat(values);
    i = values.length;

    while (--i > -1) {
      if (typeof (tmp = values[i][p]) === "string") if (tmp.charAt(1) === "=") {
        values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
      }
    }
  }

  l = values.length - 2;

  if (l < 0) {
    a[0] = new Segment(values[0][p], 0, 0, values[0][p]);
    return a;
  }

  for (i = 0; i < l; i++) {
    p1 = values[i][p];
    p2 = values[i + 1][p];
    a[i] = new Segment(p1, 0, 0, p2);

    if (correlate) {
      p3 = values[i + 2][p];
      _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
      _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
    }
  }

  a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]);
  return a;
},
    bezierThrough = function bezierThrough(values, curviness, quadratic, basic, correlate, prepend) {
  var obj = {},
      props = [],
      first = prepend || values[0],
      i,
      p,
      a,
      j,
      r,
      l,
      seamless,
      last;
  correlate = typeof correlate === "string" ? "," + correlate + "," : _correlate;

  if (curviness == null) {
    curviness = 1;
  }

  for (p in values[0]) {
    props.push(p);
  } //check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)


  if (values.length > 1) {
    last = values[values.length - 1];
    seamless = true;
    i = props.length;

    while (--i > -1) {
      p = props[i];

      if (Math.abs(first[p] - last[p]) > 0.05) {
        //build in a tolerance of +/-0.05 to accommodate rounding errors.
        seamless = false;
        break;
      }
    }

    if (seamless) {
      values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens

      if (prepend) {
        values.unshift(prepend);
      }

      values.push(values[1]);
      prepend = values[values.length - 3];
    }
  }

  _r1.length = _r2.length = _r3.length = 0;
  i = props.length;

  while (--i > -1) {
    p = props[i];
    _corProps[p] = correlate.indexOf("," + p + ",") !== -1;
    obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
  }

  i = _r1.length;

  while (--i > -1) {
    _r1[i] = Math.sqrt(_r1[i]);
    _r2[i] = Math.sqrt(_r2[i]);
  }

  if (!basic) {
    i = props.length;

    while (--i > -1) {
      if (_corProps[p]) {
        a = obj[props[i]];
        l = a.length - 1;

        for (j = 0; j < l; j++) {
          r = a[j + 1].da / _r2[j] + a[j].da / _r1[j] || 0;
          _r3[j] = (_r3[j] || 0) + r * r;
        }
      }
    }

    i = _r3.length;

    while (--i > -1) {
      _r3[i] = Math.sqrt(_r3[i]);
    }
  }

  i = props.length;
  j = quadratic ? 4 : 1;

  while (--i > -1) {
    p = props[i];
    a = obj[p];

    _calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties


    if (seamless) {
      a.splice(0, j);
      a.splice(a.length - j, j);
    }
  }

  return obj;
},
    _parseBezierData = function _parseBezierData(values, type, prepend) {
  type = type || "soft";
  var obj = {},
      inc = type === "cubic" ? 3 : 2,
      soft = type === "soft",
      props = [],
      a,
      b,
      c,
      d,
      cur,
      i,
      j,
      l,
      p,
      cnt,
      tmp;

  if (soft && prepend) {
    values = [prepend].concat(values);
  }

  if (values == null || values.length < inc + 1) {
    throw "invalid Bezier data";
  }

  for (p in values[0]) {
    props.push(p);
  }

  i = props.length;

  while (--i > -1) {
    p = props[i];
    obj[p] = cur = [];
    cnt = 0;
    l = values.length;

    for (j = 0; j < l; j++) {
      a = prepend == null ? values[j][p] : typeof (tmp = values[j][p]) === "string" && tmp.charAt(1) === "=" ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
      if (soft) if (j > 1) if (j < l - 1) {
        cur[cnt++] = (a + cur[cnt - 2]) / 2;
      }
      cur[cnt++] = a;
    }

    l = cnt - inc + 1;
    cnt = 0;

    for (j = 0; j < l; j += inc) {
      a = cur[j];
      b = cur[j + 1];
      c = cur[j + 2];
      d = inc === 2 ? 0 : cur[j + 3];
      cur[cnt++] = tmp = inc === 3 ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
    }

    cur.length = cnt;
  }

  return obj;
},
    _addCubicLengths = function _addCubicLengths(a, steps, resolution) {
  var inc = 1 / resolution,
      j = a.length,
      d,
      d1,
      s,
      da,
      ca,
      ba,
      p,
      i,
      inv,
      bez,
      index;

  while (--j > -1) {
    bez = a[j];
    s = bez.a;
    da = bez.d - s;
    ca = bez.c - s;
    ba = bez.b - s;
    d = d1 = 0;

    for (i = 1; i <= resolution; i++) {
      p = inc * i;
      inv = 1 - p;
      d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
      index = j * resolution + i - 1;
      steps[index] = (steps[index] || 0) + d * d;
    }
  }
},
    _parseLengthData = function _parseLengthData(obj, resolution) {
  resolution = resolution >> 0 || 6;
  var a = [],
      lengths = [],
      d = 0,
      total = 0,
      threshold = resolution - 1,
      segments = [],
      curLS = [],
      //current length segments array
  p,
      i,
      l,
      index;

  for (p in obj) {
    _addCubicLengths(obj[p], a, resolution);
  }

  l = a.length;

  for (i = 0; i < l; i++) {
    d += Math.sqrt(a[i]);
    index = i % resolution;
    curLS[index] = d;

    if (index === threshold) {
      total += d;
      index = i / resolution >> 0;
      segments[index] = curLS;
      lengths[index] = total;
      d = 0;
      curLS = [];
    }
  }

  return {
    length: total,
    lengths: lengths,
    segments: segments
  };
},
    BezierPlugin = _TweenLite._gsScope._gsDefine.plugin({
  propName: "bezier",
  priority: -1,
  version: "1.3.8",
  API: 2,
  global: true,
  //gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
  init: function init(target, vars, tween) {
    this._target = target;

    if (vars instanceof Array) {
      vars = {
        values: vars
      };
    }

    this._func = {};
    this._mod = {};
    this._props = [];
    this._timeRes = vars.timeResolution == null ? 6 : parseInt(vars.timeResolution, 10);
    var values = vars.values || [],
        first = {},
        second = values[0],
        autoRotate = vars.autoRotate || tween.vars.orientToBezier,
        p,
        isFunc,
        i,
        j,
        prepend;
    this._autoRotate = autoRotate ? autoRotate instanceof Array ? autoRotate : [["x", "y", "rotation", autoRotate === true ? 0 : Number(autoRotate) || 0]] : null;

    for (p in second) {
      this._props.push(p);
    }

    i = this._props.length;

    while (--i > -1) {
      p = this._props[i];

      this._overwriteProps.push(p);

      isFunc = this._func[p] = typeof target[p] === "function";
      first[p] = !isFunc ? parseFloat(target[p]) : target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)]();
      if (!prepend) if (first[p] !== values[0][p]) {
        prepend = first;
      }
    }

    this._beziers = vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft" ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, vars.type === "thruBasic", vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
    this._segCount = this._beziers[p].length;

    if (this._timeRes) {
      var ld = _parseLengthData(this._beziers, this._timeRes);

      this._length = ld.length;
      this._lengths = ld.lengths;
      this._segments = ld.segments;
      this._l1 = this._li = this._s1 = this._si = 0;
      this._l2 = this._lengths[0];
      this._curSeg = this._segments[0];
      this._s2 = this._curSeg[0];
      this._prec = 1 / this._curSeg.length;
    }

    if (autoRotate = this._autoRotate) {
      this._initialRotations = [];

      if (!(autoRotate[0] instanceof Array)) {
        this._autoRotate = autoRotate = [autoRotate];
      }

      i = autoRotate.length;

      while (--i > -1) {
        for (j = 0; j < 3; j++) {
          p = autoRotate[i][j];
          this._func[p] = typeof target[p] === "function" ? target[p.indexOf("set") || typeof target["get" + p.substr(3)] !== "function" ? p : "get" + p.substr(3)] : false;
        }

        p = autoRotate[i][2];
        this._initialRotations[i] = (this._func[p] ? this._func[p].call(this._target) : this._target[p]) || 0;

        this._overwriteProps.push(p);
      }
    }

    this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.

    return true;
  },
  //called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
  set: function set(v) {
    var segments = this._segCount,
        func = this._func,
        target = this._target,
        notStart = v !== this._startRatio,
        curIndex,
        inv,
        i,
        p,
        b,
        t,
        val,
        l,
        lengths,
        curSeg;

    if (!this._timeRes) {
      curIndex = v < 0 ? 0 : v >= 1 ? segments - 1 : segments * v >> 0;
      t = (v - curIndex * (1 / segments)) * segments;
    } else {
      lengths = this._lengths;
      curSeg = this._curSeg;
      v *= this._length;
      i = this._li; //find the appropriate segment (if the currently cached one isn't correct)

      if (v > this._l2 && i < segments - 1) {
        l = segments - 1;

        while (i < l && (this._l2 = lengths[++i]) <= v) {}

        this._l1 = lengths[i - 1];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s2 = curSeg[this._s1 = this._si = 0];
      } else if (v < this._l1 && i > 0) {
        while (i > 0 && (this._l1 = lengths[--i]) >= v) {}

        if (i === 0 && v < this._l1) {
          this._l1 = 0;
        } else {
          i++;
        }

        this._l2 = lengths[i];
        this._li = i;
        this._curSeg = curSeg = this._segments[i];
        this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
        this._s2 = curSeg[this._si];
      }

      curIndex = i; //now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)

      v -= this._l1;
      i = this._si;

      if (v > this._s2 && i < curSeg.length - 1) {
        l = curSeg.length - 1;

        while (i < l && (this._s2 = curSeg[++i]) <= v) {}

        this._s1 = curSeg[i - 1];
        this._si = i;
      } else if (v < this._s1 && i > 0) {
        while (i > 0 && (this._s1 = curSeg[--i]) >= v) {}

        if (i === 0 && v < this._s1) {
          this._s1 = 0;
        } else {
          i++;
        }

        this._s2 = curSeg[i];
        this._si = i;
      }

      t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
    }

    inv = 1 - t;
    i = this._props.length;

    while (--i > -1) {
      p = this._props[i];
      b = this._beziers[p][curIndex];
      val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;

      if (this._mod[p]) {
        val = this._mod[p](val, target);
      }

      if (func[p]) {
        target[p](val);
      } else {
        target[p] = val;
      }
    }

    if (this._autoRotate) {
      var ar = this._autoRotate,
          b2,
          x1,
          y1,
          x2,
          y2,
          add,
          conv;
      i = ar.length;

      while (--i > -1) {
        p = ar[i][2];
        add = ar[i][3] || 0;
        conv = ar[i][4] === true ? 1 : _RAD2DEG;
        b = this._beziers[ar[i][0]];
        b2 = this._beziers[ar[i][1]];

        if (b && b2) {
          //in case one of the properties got overwritten.
          b = b[curIndex];
          b2 = b2[curIndex];
          x1 = b.a + (b.b - b.a) * t;
          x2 = b.b + (b.c - b.b) * t;
          x1 += (x2 - x1) * t;
          x2 += (b.c + (b.d - b.c) * t - x2) * t;
          y1 = b2.a + (b2.b - b2.a) * t;
          y2 = b2.b + (b2.c - b2.b) * t;
          y1 += (y2 - y1) * t;
          y2 += (b2.c + (b2.d - b2.c) * t - y2) * t;
          val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];

          if (this._mod[p]) {
            val = this._mod[p](val, target); //for modProps
          }

          if (func[p]) {
            target[p](val);
          } else {
            target[p] = val;
          }
        }
      }
    }
  }
}),
    p = BezierPlugin.prototype;

exports.default = exports.BezierPlugin = BezierPlugin;
BezierPlugin.bezierThrough = bezierThrough;
BezierPlugin.cubicToQuadratic = cubicToQuadratic;
BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite

BezierPlugin.quadraticToCubic = function (a, b, c) {
  return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
};

BezierPlugin._cssRegister = function () {
  var CSSPlugin = _globals.CSSPlugin;

  if (!CSSPlugin) {
    return;
  }

  var _internals = CSSPlugin._internals,
      _parseToProxy = _internals._parseToProxy,
      _setPluginRatio = _internals._setPluginRatio,
      CSSPropTween = _internals.CSSPropTween;

  _internals._registerComplexSpecialProp("bezier", {
    parser: function parser(t, e, prop, cssp, pt, plugin) {
      if (e instanceof Array) {
        e = {
          values: e
        };
      }

      plugin = new BezierPlugin();
      var values = e.values,
          l = values.length - 1,
          pluginValues = [],
          v = {},
          i,
          p,
          data;

      if (l < 0) {
        return pt;
      }

      for (i = 0; i <= l; i++) {
        data = _parseToProxy(t, values[i], cssp, pt, plugin, l !== i);
        pluginValues[i] = data.end;
      }

      for (p in e) {
        v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
      }

      v.values = pluginValues;
      pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);
      pt.data = data;
      pt.plugin = plugin;
      pt.setRatio = _setPluginRatio;

      if (v.autoRotate === 0) {
        v.autoRotate = true;
      }

      if (v.autoRotate && !(v.autoRotate instanceof Array)) {
        i = v.autoRotate === true ? 0 : Number(v.autoRotate);
        v.autoRotate = data.end.left != null ? [["left", "top", "rotation", i, false]] : data.end.x != null ? [["x", "y", "rotation", i, false]] : false;
      }

      if (v.autoRotate) {
        if (!cssp._transform) {
          cssp._enableTransforms(false);
        }

        data.autoRotate = cssp._target._gsTransform;
        data.proxy.rotation = data.autoRotate.rotation || 0;

        cssp._overwriteProps.push("rotation");
      }

      plugin._onInitTween(data.proxy, v, cssp._tween);

      return pt;
    }
  });
};

p._mod = function (lookup) {
  var op = this._overwriteProps,
      i = op.length,
      val;

  while (--i > -1) {
    val = lookup[op[i]];

    if (val && typeof val === "function") {
      this._mod[op[i]] = val;
    }
  }
};

p._kill = function (lookup) {
  var a = this._props,
      p,
      i;

  for (p in this._beziers) {
    if (p in lookup) {
      delete this._beziers[p];
      delete this._func[p];
      i = a.length;

      while (--i > -1) {
        if (a[i] === p) {
          a.splice(i, 1);
        }
      }
    }
  }

  a = this._autoRotate;

  if (a) {
    i = a.length;

    while (--i > -1) {
      if (lookup[a[i][2]]) {
        a.splice(i, 1);
      }
    }
  }

  return this._super._kill.call(this, lookup);
};
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/EasePack.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
exports.ExpoScaleEase = exports.Sine = exports.Expo = exports.Circ = exports.SteppedEase = exports.SlowMo = exports.RoughEase = exports.Bounce = exports.Elastic = exports.Back = void 0;

var _TweenLite = require("./TweenLite.js");

/*!
 * VERSION: 1.16.1
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
_TweenLite._gsScope._gsDefine("easing.Back", ["easing.Ease"], function () {
  var w = _TweenLite._gsScope.GreenSockGlobals || _TweenLite._gsScope,
      gs = w.com.greensock,
      _2PI = Math.PI * 2,
      _HALF_PI = Math.PI / 2,
      _class = gs._class,
      _create = function _create(n, f) {
    var C = _class("easing." + n, function () {}, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;
    return C;
  },
      _easeReg = _TweenLite.Ease.register || function () {},
      //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
  _wrap = function _wrap(name, EaseOut, EaseIn, EaseInOut, aliases) {
    var C = _class("easing." + name, {
      easeOut: new EaseOut(),
      easeIn: new EaseIn(),
      easeInOut: new EaseInOut()
    }, true);

    _easeReg(C, name);

    return C;
  },
      EasePoint = function EasePoint(time, value, next) {
    this.t = time;
    this.v = value;

    if (next) {
      this.next = next;
      next.prev = this;
      this.c = next.v - value;
      this.gap = next.t - time;
    }
  },
      //Back
  _createBack = function _createBack(n, f) {
    var C = _class("easing." + n, function (overshoot) {
      this._p1 = overshoot || overshoot === 0 ? overshoot : 1.70158;
      this._p2 = this._p1 * 1.525;
    }, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;

    p.config = function (overshoot) {
      return new C(overshoot);
    };

    return C;
  },
      Back = _wrap("Back", _createBack("BackOut", function (p) {
    return (p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1;
  }), _createBack("BackIn", function (p) {
    return p * p * ((this._p1 + 1) * p - this._p1);
  }), _createBack("BackInOut", function (p) {
    return (p *= 2) < 1 ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
  })),
      //SlowMo
  SlowMo = _class("easing.SlowMo", function (linearRatio, power, yoyoMode) {
    power = power || power === 0 ? power : 0.7;

    if (linearRatio == null) {
      linearRatio = 0.7;
    } else if (linearRatio > 1) {
      linearRatio = 1;
    }

    this._p = linearRatio !== 1 ? power : 0;
    this._p1 = (1 - linearRatio) / 2;
    this._p2 = linearRatio;
    this._p3 = this._p1 + this._p2;
    this._calcEnd = yoyoMode === true;
  }, true),
      p = SlowMo.prototype = new _TweenLite.Ease(),
      SteppedEase,
      ExpoScaleEase,
      RoughEase,
      _createElastic;

  p.constructor = SlowMo;

  p.getRatio = function (p) {
    var r = p + (0.5 - p) * this._p;

    if (p < this._p1) {
      return this._calcEnd ? 1 - (p = 1 - p / this._p1) * p : r - (p = 1 - p / this._p1) * p * p * p * r;
    } else if (p > this._p3) {
      return this._calcEnd ? p === 1 ? 0 : 1 - (p = (p - this._p3) / this._p1) * p : r + (p - r) * (p = (p - this._p3) / this._p1) * p * p * p; //added p === 1 ? 0 to avoid floating point rounding errors from affecting the final value, like 1 - 0.7 = 0.30000000000000004 instead of 0.3
    }

    return this._calcEnd ? 1 : r;
  };

  SlowMo.ease = new SlowMo(0.7, 0.7);

  p.config = SlowMo.config = function (linearRatio, power, yoyoMode) {
    return new SlowMo(linearRatio, power, yoyoMode);
  }; //SteppedEase


  SteppedEase = _class("easing.SteppedEase", function (steps, immediateStart) {
    steps = steps || 1;
    this._p1 = 1 / steps;
    this._p2 = steps + (immediateStart ? 0 : 1);
    this._p3 = immediateStart ? 1 : 0;
  }, true);
  p = SteppedEase.prototype = new _TweenLite.Ease();
  p.constructor = SteppedEase;

  p.getRatio = function (p) {
    if (p < 0) {
      p = 0;
    } else if (p >= 1) {
      p = 0.999999999;
    }

    return ((this._p2 * p | 0) + this._p3) * this._p1;
  };

  p.config = SteppedEase.config = function (steps, immediateStart) {
    return new SteppedEase(steps, immediateStart);
  }; //ExpoScaleEase


  ExpoScaleEase = _class("easing.ExpoScaleEase", function (start, end, ease) {
    this._p1 = Math.log(end / start);
    this._p2 = end - start;
    this._p3 = start;
    this._ease = ease;
  }, true);
  p = ExpoScaleEase.prototype = new _TweenLite.Ease();
  p.constructor = ExpoScaleEase;

  p.getRatio = function (p) {
    if (this._ease) {
      p = this._ease.getRatio(p);
    }

    return (this._p3 * Math.exp(this._p1 * p) - this._p3) / this._p2;
  };

  p.config = ExpoScaleEase.config = function (start, end, ease) {
    return new ExpoScaleEase(start, end, ease);
  }; //RoughEase


  RoughEase = _class("easing.RoughEase", function (vars) {
    vars = vars || {};
    var taper = vars.taper || "none",
        a = [],
        cnt = 0,
        points = (vars.points || 20) | 0,
        i = points,
        randomize = vars.randomize !== false,
        clamp = vars.clamp === true,
        template = vars.template instanceof _TweenLite.Ease ? vars.template : null,
        strength = typeof vars.strength === "number" ? vars.strength * 0.4 : 0.4,
        x,
        y,
        bump,
        invX,
        obj,
        pnt;

    while (--i > -1) {
      x = randomize ? Math.random() : 1 / points * i;
      y = template ? template.getRatio(x) : x;

      if (taper === "none") {
        bump = strength;
      } else if (taper === "out") {
        invX = 1 - x;
        bump = invX * invX * strength;
      } else if (taper === "in") {
        bump = x * x * strength;
      } else if (x < 0.5) {
        //"both" (start)
        invX = x * 2;
        bump = invX * invX * 0.5 * strength;
      } else {
        //"both" (end)
        invX = (1 - x) * 2;
        bump = invX * invX * 0.5 * strength;
      }

      if (randomize) {
        y += Math.random() * bump - bump * 0.5;
      } else if (i % 2) {
        y += bump * 0.5;
      } else {
        y -= bump * 0.5;
      }

      if (clamp) {
        if (y > 1) {
          y = 1;
        } else if (y < 0) {
          y = 0;
        }
      }

      a[cnt++] = {
        x: x,
        y: y
      };
    }

    a.sort(function (a, b) {
      return a.x - b.x;
    });
    pnt = new EasePoint(1, 1, null);
    i = points;

    while (--i > -1) {
      obj = a[i];
      pnt = new EasePoint(obj.x, obj.y, pnt);
    }

    this._prev = new EasePoint(0, 0, pnt.t !== 0 ? pnt : pnt.next);
  }, true);
  p = RoughEase.prototype = new _TweenLite.Ease();
  p.constructor = RoughEase;

  p.getRatio = function (p) {
    var pnt = this._prev;

    if (p > pnt.t) {
      while (pnt.next && p >= pnt.t) {
        pnt = pnt.next;
      }

      pnt = pnt.prev;
    } else {
      while (pnt.prev && p <= pnt.t) {
        pnt = pnt.prev;
      }
    }

    this._prev = pnt;
    return pnt.v + (p - pnt.t) / pnt.gap * pnt.c;
  };

  p.config = function (vars) {
    return new RoughEase(vars);
  };

  RoughEase.ease = new RoughEase(); //Bounce

  _wrap("Bounce", _create("BounceOut", function (p) {
    if (p < 1 / 2.75) {
      return 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    }

    return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
  }), _create("BounceIn", function (p) {
    if ((p = 1 - p) < 1 / 2.75) {
      return 1 - 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);
    } else if (p < 2.5 / 2.75) {
      return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);
    }

    return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);
  }), _create("BounceInOut", function (p) {
    var invert = p < 0.5;

    if (invert) {
      p = 1 - p * 2;
    } else {
      p = p * 2 - 1;
    }

    if (p < 1 / 2.75) {
      p = 7.5625 * p * p;
    } else if (p < 2 / 2.75) {
      p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;
    } else if (p < 2.5 / 2.75) {
      p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;
    } else {
      p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;
    }

    return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
  })); //CIRC


  _wrap("Circ", _create("CircOut", function (p) {
    return Math.sqrt(1 - (p = p - 1) * p);
  }), _create("CircIn", function (p) {
    return -(Math.sqrt(1 - p * p) - 1);
  }), _create("CircInOut", function (p) {
    return (p *= 2) < 1 ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
  })); //Elastic


  _createElastic = function _createElastic(n, f, def) {
    var C = _class("easing." + n, function (amplitude, period) {
      this._p1 = amplitude >= 1 ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.

      this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);
      this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
      this._p2 = _2PI / this._p2; //precalculate to optimize
    }, true),
        p = C.prototype = new _TweenLite.Ease();

    p.constructor = C;
    p.getRatio = f;

    p.config = function (amplitude, period) {
      return new C(amplitude, period);
    };

    return C;
  };

  _wrap("Elastic", _createElastic("ElasticOut", function (p) {
    return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * this._p2) + 1;
  }, 0.3), _createElastic("ElasticIn", function (p) {
    return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2));
  }, 0.3), _createElastic("ElasticInOut", function (p) {
    return (p *= 2) < 1 ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * this._p2) * 0.5 + 1;
  }, 0.45)); //Expo


  _wrap("Expo", _create("ExpoOut", function (p) {
    return 1 - Math.pow(2, -10 * p);
  }), _create("ExpoIn", function (p) {
    return Math.pow(2, 10 * (p - 1)) - 0.001;
  }), _create("ExpoInOut", function (p) {
    return (p *= 2) < 1 ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  })); //Sine


  _wrap("Sine", _create("SineOut", function (p) {
    return Math.sin(p * _HALF_PI);
  }), _create("SineIn", function (p) {
    return -Math.cos(p * _HALF_PI) + 1;
  }), _create("SineInOut", function (p) {
    return -0.5 * (Math.cos(Math.PI * p) - 1);
  }));

  _class("easing.EaseLookup", {
    find: function find(s) {
      return _TweenLite.Ease.map[s];
    }
  }, true); //register the non-standard eases


  _easeReg(w.SlowMo, "SlowMo", "ease,");

  _easeReg(RoughEase, "RoughEase", "ease,");

  _easeReg(SteppedEase, "SteppedEase", "ease,");

  return Back;
}, true);

var Back = _TweenLite.globals.Back;
exports.Back = Back;
var Elastic = _TweenLite.globals.Elastic;
exports.Elastic = Elastic;
var Bounce = _TweenLite.globals.Bounce;
exports.Bounce = Bounce;
var RoughEase = _TweenLite.globals.RoughEase;
exports.RoughEase = RoughEase;
var SlowMo = _TweenLite.globals.SlowMo;
exports.SlowMo = SlowMo;
var SteppedEase = _TweenLite.globals.SteppedEase;
exports.SteppedEase = SteppedEase;
var Circ = _TweenLite.globals.Circ;
exports.Circ = Circ;
var Expo = _TweenLite.globals.Expo;
exports.Expo = Expo;
var Sine = _TweenLite.globals.Sine;
exports.Sine = Sine;
var ExpoScaleEase = _TweenLite.globals.ExpoScaleEase;
exports.ExpoScaleEase = ExpoScaleEase;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js"}],"node_modules/gsap/TweenMax.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TweenLite", {
  enumerable: true,
  get: function () {
    return _TweenLite.default;
  }
});
Object.defineProperty(exports, "TweenPlugin", {
  enumerable: true,
  get: function () {
    return _TweenLite.TweenPlugin;
  }
});
Object.defineProperty(exports, "Ease", {
  enumerable: true,
  get: function () {
    return _TweenLite.Ease;
  }
});
Object.defineProperty(exports, "Power0", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power0;
  }
});
Object.defineProperty(exports, "Power1", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power1;
  }
});
Object.defineProperty(exports, "Power2", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power2;
  }
});
Object.defineProperty(exports, "Power3", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power3;
  }
});
Object.defineProperty(exports, "Power4", {
  enumerable: true,
  get: function () {
    return _TweenLite.Power4;
  }
});
Object.defineProperty(exports, "Linear", {
  enumerable: true,
  get: function () {
    return _TweenLite.Linear;
  }
});
Object.defineProperty(exports, "CSSPlugin", {
  enumerable: true,
  get: function () {
    return _CSSPlugin.default;
  }
});
Object.defineProperty(exports, "AttrPlugin", {
  enumerable: true,
  get: function () {
    return _AttrPlugin.default;
  }
});
Object.defineProperty(exports, "RoundPropsPlugin", {
  enumerable: true,
  get: function () {
    return _RoundPropsPlugin.default;
  }
});
Object.defineProperty(exports, "DirectionalRotationPlugin", {
  enumerable: true,
  get: function () {
    return _DirectionalRotationPlugin.default;
  }
});
Object.defineProperty(exports, "TimelineLite", {
  enumerable: true,
  get: function () {
    return _TimelineLite.default;
  }
});
Object.defineProperty(exports, "TimelineMax", {
  enumerable: true,
  get: function () {
    return _TimelineMax.default;
  }
});
Object.defineProperty(exports, "BezierPlugin", {
  enumerable: true,
  get: function () {
    return _BezierPlugin.default;
  }
});
Object.defineProperty(exports, "Back", {
  enumerable: true,
  get: function () {
    return _EasePack.Back;
  }
});
Object.defineProperty(exports, "Elastic", {
  enumerable: true,
  get: function () {
    return _EasePack.Elastic;
  }
});
Object.defineProperty(exports, "Bounce", {
  enumerable: true,
  get: function () {
    return _EasePack.Bounce;
  }
});
Object.defineProperty(exports, "RoughEase", {
  enumerable: true,
  get: function () {
    return _EasePack.RoughEase;
  }
});
Object.defineProperty(exports, "SlowMo", {
  enumerable: true,
  get: function () {
    return _EasePack.SlowMo;
  }
});
Object.defineProperty(exports, "SteppedEase", {
  enumerable: true,
  get: function () {
    return _EasePack.SteppedEase;
  }
});
Object.defineProperty(exports, "Circ", {
  enumerable: true,
  get: function () {
    return _EasePack.Circ;
  }
});
Object.defineProperty(exports, "Expo", {
  enumerable: true,
  get: function () {
    return _EasePack.Expo;
  }
});
Object.defineProperty(exports, "Sine", {
  enumerable: true,
  get: function () {
    return _EasePack.Sine;
  }
});
Object.defineProperty(exports, "ExpoScaleEase", {
  enumerable: true,
  get: function () {
    return _EasePack.ExpoScaleEase;
  }
});
exports.default = exports.TweenMax = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _TweenMaxBase = _interopRequireDefault(require("./TweenMaxBase.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

var _AttrPlugin = _interopRequireDefault(require("./AttrPlugin.js"));

var _RoundPropsPlugin = _interopRequireDefault(require("./RoundPropsPlugin.js"));

var _DirectionalRotationPlugin = _interopRequireDefault(require("./DirectionalRotationPlugin.js"));

var _TimelineLite = _interopRequireDefault(require("./TimelineLite.js"));

var _TimelineMax = _interopRequireDefault(require("./TimelineMax.js"));

var _BezierPlugin = _interopRequireDefault(require("./BezierPlugin.js"));

var _EasePack = require("./EasePack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*!
 * VERSION: 2.1.2
 * DATE: 2019-03-01
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2019, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/

/* eslint-disable */
//the following two lines are designed to prevent tree shaking of the classes that were historically included with TweenMax (otherwise, folks would have to reference CSSPlugin, for example, to ensure their CSS-related animations worked)
var TweenMax = _TweenMaxBase.default;
exports.default = exports.TweenMax = TweenMax;
TweenMax._autoActivated = [_TimelineLite.default, _TimelineMax.default, _CSSPlugin.default, _AttrPlugin.default, _BezierPlugin.default, _RoundPropsPlugin.default, _DirectionalRotationPlugin.default, _EasePack.Back, _EasePack.Elastic, _EasePack.Bounce, _EasePack.RoughEase, _EasePack.SlowMo, _EasePack.SteppedEase, _EasePack.Circ, _EasePack.Expo, _EasePack.Sine, _EasePack.ExpoScaleEase];
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js","./TweenMaxBase.js":"node_modules/gsap/TweenMaxBase.js","./CSSPlugin.js":"node_modules/gsap/CSSPlugin.js","./AttrPlugin.js":"node_modules/gsap/AttrPlugin.js","./RoundPropsPlugin.js":"node_modules/gsap/RoundPropsPlugin.js","./DirectionalRotationPlugin.js":"node_modules/gsap/DirectionalRotationPlugin.js","./TimelineLite.js":"node_modules/gsap/TimelineLite.js","./TimelineMax.js":"node_modules/gsap/TimelineMax.js","./BezierPlugin.js":"node_modules/gsap/BezierPlugin.js","./EasePack.js":"node_modules/gsap/EasePack.js"}],"node_modules/gsap/Draggable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Draggable = void 0;

var _TweenLite = _interopRequireWildcard(require("./TweenLite.js"));

var _CSSPlugin = _interopRequireDefault(require("./CSSPlugin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_TweenLite._gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"], function () {
  var _tempVarsXY = {
    css: {},
    data: "_draggable"
  },
      //speed optimization - we reuse the same vars object for x/y TweenLite.set() calls to minimize garbage collection tasks and improve performance.
  _tempVarsX = {
    css: {},
    data: "_draggable"
  },
      _tempVarsY = {
    css: {},
    data: "_draggable"
  },
      _tempVarsRotation = {
    css: {}
  },
      _globals = _TweenLite._gsScope._gsDefine.globals,
      _tempEvent = {},
      //for populating with pageX/pageY in old versions of IE
  _emptyFunc = function _emptyFunc() {
    return false;
  },
      _dummyElement = {
    style: {},
    appendChild: _emptyFunc,
    removeChild: _emptyFunc
  },
      _doc = _TweenLite._gsScope.document || {
    createElement: function createElement() {
      return _dummyElement;
    }
  },
      _docElement = _doc.documentElement || {},
      _createElement = function _createElement(type) {
    return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
  },
      _tempDiv = _createElement("div"),
      _emptyArray = [],
      _RAD2DEG = 180 / Math.PI,
      _max = 999999999999999,
      _getTime = Date.now || function () {
    return new Date().getTime();
  },
      _isOldIE = !!(!_doc.addEventListener && _doc.all),
      _placeholderDiv = _doc.createElement("div"),
      _renderQueue = [],
      _lookup = {},
      //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
  _lookupCount = 0,
      _clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
      _dragCount = 0,
      //total number of elements currently being dragged
  _prefix,
      _isMultiTouching,
      _isAndroid = _TweenLite._gsScope.navigator && _TweenLite._gsScope.navigator.userAgent.toLowerCase().indexOf("android") !== -1,
      //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing
  _lastDragTime = 0,
      _temp1 = {},
      // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
  _windowProxy = {},
      //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
  _supportsPassive,
      _slice = function _slice(a) {
    //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
    if (typeof a === "string") {
      a = _TweenLite.default.selector(a);
    }

    if (!a || a.nodeType) {
      //if it's not an array, wrap it in one.
      return [a];
    }

    var b = [],
        l = a.length,
        i;

    for (i = 0; i !== l; b.push(a[i++])) {
      ;
    }

    return b;
  },
      _copy = function _copy(obj, factor) {
    var copy = {},
        p;

    if (factor) {
      for (p in obj) {
        copy[p] = obj[p] * factor;
      }
    } else {
      for (p in obj) {
        copy[p] = obj[p];
      }
    }

    return copy;
  },
      ThrowPropsPlugin,
      _renderQueueTick = function _renderQueueTick() {
    var i = _renderQueue.length;

    while (--i > -1) {
      _renderQueue[i]();
    }
  },
      _addToRenderQueue = function _addToRenderQueue(func) {
    _renderQueue.push(func);

    if (_renderQueue.length === 1) {
      _TweenLite.default.ticker.addEventListener("tick", _renderQueueTick, this, false, 1);
    }
  },
      _removeFromRenderQueue = function _removeFromRenderQueue(func) {
    var i = _renderQueue.length;

    while (--i > -1) {
      if (_renderQueue[i] === func) {
        _renderQueue.splice(i, 1);
      }
    }

    _TweenLite.default.to(_renderQueueTimeout, 0, {
      overwrite: "all",
      delay: 15,
      onComplete: _renderQueueTimeout,
      data: "_draggable"
    }); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).

  },
      _renderQueueTimeout = function _renderQueueTimeout() {
    if (!_renderQueue.length) {
      _TweenLite.default.ticker.removeEventListener("tick", _renderQueueTick);
    }
  },
      _extend = function _extend(obj, defaults) {
    var p;

    for (p in defaults) {
      if (obj[p] === undefined) {
        obj[p] = defaults[p];
      }
    }

    return obj;
  },
      _getDocScrollTop = function _getDocScrollTop() {
    return window.pageYOffset != null ? window.pageYOffset : _doc.scrollTop != null ? _doc.scrollTop : _docElement.scrollTop || _doc.body.scrollTop || 0;
  },
      _getDocScrollLeft = function _getDocScrollLeft() {
    return window.pageXOffset != null ? window.pageXOffset : _doc.scrollLeft != null ? _doc.scrollLeft : _docElement.scrollLeft || _doc.body.scrollLeft || 0;
  },
      _addScrollListener = function _addScrollListener(e, callback) {
    _addListener(e, "scroll", callback);

    if (!_isRoot(e.parentNode)) {
      _addScrollListener(e.parentNode, callback);
    }
  },
      _removeScrollListener = function _removeScrollListener(e, callback) {
    _removeListener(e, "scroll", callback);

    if (!_isRoot(e.parentNode)) {
      _removeScrollListener(e.parentNode, callback);
    }
  },
      _isRoot = function _isRoot(e) {
    return !!(!e || e === _docElement || e === _doc || e === _doc.body || e === window || !e.nodeType || !e.parentNode);
  },
      _getMaxScroll = function _getMaxScroll(element, axis) {
    var dim = axis === "x" ? "Width" : "Height",
        scroll = "scroll" + dim,
        client = "client" + dim,
        body = _doc.body;
    return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], body[scroll]) - (window["inner" + dim] || _docElement[client] || body[client]) : element[scroll] - element[client]);
  },
      _recordMaxScrolls = function _recordMaxScrolls(e) {
    //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
    var isRoot = _isRoot(e),
        x = _getMaxScroll(e, "x"),
        y = _getMaxScroll(e, "y");

    if (isRoot) {
      e = _windowProxy;
    } else {
      _recordMaxScrolls(e.parentNode);
    }

    e._gsMaxScrollX = x;
    e._gsMaxScrollY = y;
    e._gsScrollX = e.scrollLeft || 0;
    e._gsScrollY = e.scrollTop || 0;
  },
      //just used for IE8 and earlier to normalize events and populate pageX/pageY
  _populateIEEvent = function _populateIEEvent(e, preventDefault) {
    e = e || window.event;
    _tempEvent.pageX = e.clientX + _doc.body.scrollLeft + _docElement.scrollLeft;
    _tempEvent.pageY = e.clientY + _doc.body.scrollTop + _docElement.scrollTop;

    if (preventDefault) {
      e.returnValue = false;
    }

    return _tempEvent;
  },
      //grabs the first element it finds (and we include the window as an element), so if it's selector text, it'll feed that value to TweenLite.selector, if it's a jQuery object or some other selector engine's result, it'll grab the first one, and same for an array. If the value doesn't contain a DOM element, it'll just return null.
  _unwrapElement = function _unwrapElement(value) {
    if (!value) {
      return value;
    }

    if (typeof value === "string") {
      value = _TweenLite.default.selector(value);
    }

    if (value.length && value !== window && value[0] && value[0].style && !value.nodeType) {
      value = value[0];
    }

    return value === window || value.nodeType && value.style ? value : null;
  },
      _checkPrefix = function _checkPrefix(e, p) {
    var s = e.style,
        capped,
        i,
        a;

    if (s[p] === undefined) {
      a = ["O", "Moz", "ms", "Ms", "Webkit"];
      i = 5;
      capped = p.charAt(0).toUpperCase() + p.substr(1);

      while (--i > -1 && s[a[i] + capped] === undefined) {}

      if (i < 0) {
        return "";
      }

      _prefix = i === 3 ? "ms" : a[i];
      p = _prefix + capped;
    }

    return p;
  },
      _setStyle = function _setStyle(e, p, value) {
    var s = e.style;

    if (!s) {
      return;
    }

    if (s[p] === undefined) {
      p = _checkPrefix(e, p);
    }

    if (value == null) {
      if (s.removeProperty) {
        s.removeProperty(p.replace(/([A-Z])/g, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        s.removeAttribute(p);
      }
    } else if (s[p] !== undefined) {
      s[p] = value;
    }
  },
      _computedStyleScope = typeof window !== "undefined" ? window : _doc.defaultView || {
    getComputedStyle: function getComputedStyle() {}
  },
      _getComputedStyle = function _getComputedStyle(e, s) {
    return _computedStyleScope.getComputedStyle(e instanceof Element ? e : e.host || (e.parentNode || {}).host || e, s); //the "host" stuff helps to accommodate ShadowDom objects.
  },
      _horizExp = /(?:Left|Right|Width)/i,
      _suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
      _convertToPixels = function _convertToPixels(t, p, v, sfx, recurse) {
    if (sfx === "px" || !sfx) {
      return v;
    }

    if (sfx === "auto" || !v) {
      return 0;
    }

    var horiz = _horizExp.test(p),
        node = t,
        style = _tempDiv.style,
        neg = v < 0,
        pix;

    if (neg) {
      v = -v;
    }

    if (sfx === "%" && p.indexOf("border") !== -1) {
      pix = v / 100 * (horiz ? t.clientWidth : t.clientHeight);
    } else {
      style.cssText = "border:0 solid red;position:" + _getStyle(t, "position", true) + ";line-height:0;";

      if (sfx === "%" || !node.appendChild) {
        node = t.parentNode || _doc.body;
        style[horiz ? "width" : "height"] = v + sfx;
      } else {
        style[horiz ? "borderLeftWidth" : "borderTopWidth"] = v + sfx;
      }

      node.appendChild(_tempDiv);
      pix = parseFloat(_tempDiv[horiz ? "offsetWidth" : "offsetHeight"]);
      node.removeChild(_tempDiv);

      if (pix === 0 && !recurse) {
        pix = _convertToPixels(t, p, v, sfx, true);
      }
    }

    return neg ? -pix : pix;
  },
      _calculateOffset = function _calculateOffset(t, p) {
    //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
    if (_getStyle(t, "position", true) !== "absolute") {
      return 0;
    }

    var dim = p === "left" ? "Left" : "Top",
        v = _getStyle(t, "margin" + dim, true);

    return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), (v + "").replace(_suffixExp, "")) || 0);
  },
      _getStyle = function _getStyle(element, prop, keepUnits) {
    var rv = (element._gsTransform || {})[prop],
        cs;

    if (rv || rv === 0) {
      return rv;
    } else if (element.style && element.style[prop]) {
      //shadow dom elements don't have "style".
      rv = element.style[prop];
    } else if (cs = _getComputedStyle(element)) {
      rv = cs.getPropertyValue(prop.replace(/([A-Z])/g, "-$1").toLowerCase());
      rv = rv || cs.length ? rv : cs[prop]; //Opera behaves VERY strangely - length is usually 0 and cs[prop] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
    } else if (element.currentStyle) {
      rv = element.currentStyle[prop];
    }

    if (rv === "auto" && (prop === "top" || prop === "left")) {
      rv = _calculateOffset(element, prop);
    }

    return keepUnits ? rv : parseFloat(rv) || 0;
  },
      _dispatchEvent = function _dispatchEvent(instance, type, callbackName) {
    var vars = instance.vars,
        callback = vars[callbackName],
        listeners = instance._listeners[type];

    if (typeof callback === "function") {
      callback.apply(vars[callbackName + "Scope"] || vars.callbackScope || instance, vars[callbackName + "Params"] || [instance.pointerEvent]);
    }

    if (listeners) {
      instance.dispatchEvent(type);
    }
  },
      _getBounds = function _getBounds(obj, context) {
    //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
    var e = _unwrapElement(obj),
        top,
        left,
        offset;

    if (!e) {
      if (obj.left !== undefined) {
        offset = _getOffsetTransformOrigin(context); //the bounds should be relative to the origin

        return {
          left: obj.left - offset.x,
          top: obj.top - offset.y,
          width: obj.width,
          height: obj.height
        };
      }

      left = obj.min || obj.minX || obj.minRotation || 0;
      top = obj.min || obj.minY || 0;
      return {
        left: left,
        top: top,
        width: (obj.max || obj.maxX || obj.maxRotation || 0) - left,
        height: (obj.max || obj.maxY || 0) - top
      };
    }

    return _getElementBounds(e, context);
  },
      _svgBorderFactor,
      _svgBorderScales,
      _svgScrollOffset,
      _hasBorderBug,
      _hasReparentBug,
      //some browsers, like Chrome 49, alter the offsetTop/offsetLeft/offsetParent of elements when a non-identity transform is applied.
  _setEnvironmentVariables = function _setEnvironmentVariables() {
    //some browsers factor the border into the SVG coordinate space, some don't (like Firefox). Some apply transforms to them, some don't. We feature-detect here so we know how to handle the border(s). We can't do this immediately - we must wait for the document.body to exist.
    if (!_doc.createElementNS) {
      _svgBorderFactor = 0;
      _svgBorderScales = false;
      return;
    }

    var div = _createElement("div"),
        svg = _doc.createElementNS("http://www.w3.org/2000/svg", "svg"),
        wrapper = _createElement("div"),
        style = div.style,
        parent = _doc.body || _docElement,
        isFlex = _getStyle(parent, "display", true) === "flex",
        //Firefox bug causes getScreenCTM() to return null when parent is display:flex and the element isn't rendered inside the window (like if it's below the scroll position)
    matrix,
        e1,
        point,
        oldValue;

    if (_doc.body && _transformProp) {
      style.position = "absolute";
      parent.appendChild(wrapper);
      wrapper.appendChild(div);
      oldValue = div.offsetParent;
      wrapper.style[_transformProp] = "rotate(1deg)";
      _hasReparentBug = div.offsetParent === oldValue;
      wrapper.style.position = "absolute";
      style.height = "10px";
      oldValue = div.offsetTop;
      wrapper.style.border = "5px solid red";
      _hasBorderBug = oldValue !== div.offsetTop; //some browsers, like Firefox 38, cause the offsetTop/Left to be affected by a parent's border.

      parent.removeChild(wrapper);
    }

    style = svg.style;
    svg.setAttributeNS(null, "width", "400px");
    svg.setAttributeNS(null, "height", "400px");
    svg.setAttributeNS(null, "viewBox", "0 0 400 400");
    style.display = "block";
    style.boxSizing = "border-box";
    style.border = "0px solid red";
    style.transform = "none"; // in some browsers (like certain flavors of Android), the getScreenCTM() matrix is contaminated by the scroll position. We can run some logic here to detect that condition, but we ended up not needing this because we found another workaround using getBoundingClientRect().

    div.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;";
    parent.appendChild(div);
    div.appendChild(svg);
    point = svg.createSVGPoint().matrixTransform(svg.getScreenCTM());
    e1 = point.y;
    div.scrollTop = 100;
    point.x = point.y = 0;
    point = point.matrixTransform(svg.getScreenCTM());
    _svgScrollOffset = e1 - point.y < 100.1 ? 0 : e1 - point.y - 150;
    div.removeChild(svg);
    parent.removeChild(div); // -- end _svgScrollOffset calculation.

    parent.appendChild(svg);

    if (isFlex) {
      parent.style.display = "block"; //Firefox bug causes getScreenCTM() to return null when parent is display:flex and the element isn't rendered inside the window (like if it's below the scroll position)
    }

    matrix = svg.getScreenCTM();
    e1 = matrix.e;
    style.border = "50px solid red";
    matrix = svg.getScreenCTM();

    if (e1 === 0 && matrix.e === 0 && matrix.f === 0 && matrix.a === 1) {
      //Opera has a bunch of bugs - it doesn't adjust the x/y of the matrix, nor does it scale when box-sizing is border-box but it does so elsewhere; to get the correct behavior we set _svgBorderScales to true.
      _svgBorderFactor = 1;
      _svgBorderScales = true;
    } else {
      _svgBorderFactor = e1 !== matrix.e ? 1 : 0;
      _svgBorderScales = matrix.a !== 1;
    }

    if (isFlex) {
      parent.style.display = "flex";
    }

    parent.removeChild(svg);
  },
      _supports3D = _checkPrefix(_tempDiv, "perspective") !== "",
      // start matrix and point conversion methods...
  _transformOriginProp = _checkPrefix(_tempDiv, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
      _transformProp = _checkPrefix(_tempDiv, "transform"),
      _transformPropCSS = _transformProp.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
      _point1 = {},
      //we reuse _point1 and _point2 objects inside matrix and point conversion methods to conserve memory and minimize garbage collection tasks.
  _point2 = {},
      _SVGElement = _TweenLite._gsScope.SVGElement,
      _isSVG = function _isSVG(e) {
    return !!(_SVGElement && typeof e.getBBox === "function" && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM));
  },
      _isIE10orBelow = _TweenLite._gsScope.navigator && (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_TweenLite._gsScope.navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_TweenLite._gsScope.navigator.userAgent)) && parseFloat(RegExp.$1) < 11,
      //Ideally we'd avoid user agent sniffing, but there doesn't seem to be a way to feature-detect and sense a border-related bug that only affects IE10 and IE9.
  _tempTransforms = [],
      _tempElements = [],
      _getSVGOffsets = function _getSVGOffsets(e) {
    //SVG elements don't always report offsetTop/offsetLeft/offsetParent at all (I'm looking at you, Firefox 29 and Android), so we have to do some work to manufacture those values. You can pass any SVG element and it'll spit back an object with offsetTop, offsetLeft, offsetParent, scaleX, and scaleY properties. We need the scaleX and scaleY to handle the way SVG can resize itself based on the container.
    if (!e.getBoundingClientRect || !e.parentNode || !_transformProp) {
      return {
        offsetTop: 0,
        offsetLeft: 0,
        scaleX: 1,
        scaleY: 1,
        offsetParent: _docElement
      };
    }

    if (Draggable.cacheSVGData !== false && e._dCache && e._dCache.lastUpdate === _TweenLite.default.ticker.frame) {
      //performance optimization. Assume that if the offsets are requested again on the same tick, we can just feed back the values we already calculated (no need to keep recalculating until another tick elapses).
      return e._dCache;
    }

    var curElement = e,
        cache = _cache(e),
        eRect,
        parentRect,
        offsetParent,
        cs,
        m,
        i,
        point1,
        point2,
        borderWidth,
        borderHeight,
        width,
        height;

    cache.lastUpdate = _TweenLite.default.ticker.frame;

    if (e.getBBox && !cache.isSVGRoot) {
      //if it's a nested/child SVG element, we must find the parent SVG canvas and measure the offset from there.
      curElement = e.parentNode;
      eRect = e.getBBox();

      while (curElement && (curElement.nodeName + "").toLowerCase() !== "svg") {
        curElement = curElement.parentNode;
      }

      cs = _getSVGOffsets(curElement);
      cache.offsetTop = eRect.y * cs.scaleY;
      cache.offsetLeft = eRect.x * cs.scaleX;
      cache.scaleX = cs.scaleX;
      cache.scaleY = cs.scaleY;
      cache.offsetParent = curElement || _docElement;
      return cache;
    } //only root SVG elements continue here...


    offsetParent = cache.offsetParent;

    if (offsetParent === _doc.body) {
      offsetParent = _docElement; //avoids problems with margins/padding on the body
    } //walk up the ancestors and record any non-identity transforms (and reset them to "none") until we reach the offsetParent. We must do this so that the getBoundingClientRect() is accurate for measuring the offsetTop/offsetLeft. We'll revert the values later...


    _tempElements.length = _tempTransforms.length = 0;

    while (curElement && curElement.parentNode) {
      m = _getStyle(curElement, _transformProp, true);

      if (m !== "matrix(1, 0, 0, 1, 0, 0)" && m !== "none" && m !== "translate3d(0px, 0px, 0px)") {
        _tempElements.push(curElement);

        _tempTransforms.push(curElement.style[_transformProp]);

        curElement.style[_transformProp] = "none";
      }

      curElement = curElement.parentNode;
    }

    parentRect = offsetParent.getBoundingClientRect();
    m = e.getScreenCTM();
    point2 = e.createSVGPoint();
    point1 = point2.matrixTransform(m);
    cache.scaleX = Math.sqrt(m.a * m.a + m.b * m.b);
    cache.scaleY = Math.sqrt(m.d * m.d + m.c * m.c);

    if (_svgBorderFactor === undefined) {
      _setEnvironmentVariables();
    }

    if (cache.borderBox && !_svgBorderScales && e.getAttribute("width")) {
      //some browsers (like Safari) don't properly scale the matrix to accommodate the border when box-sizing is border-box, so we must calculate it here...
      cs = _getComputedStyle(e) || {};
      borderWidth = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth) || 0;
      borderHeight = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) || 0;
      width = parseFloat(cs.width) || 0;
      height = parseFloat(cs.height) || 0;
      cache.scaleX *= (width - borderWidth) / width;
      cache.scaleY *= (height - borderHeight) / height;
    }

    if (_svgScrollOffset) {
      //some browsers (like Chrome for Android) have bugs in the way getScreenCTM() is reported (it doesn't factor in scroll position), so we must revert to a more expensive technique for calculating offsetTop/Left.
      eRect = e.getBoundingClientRect();
      cache.offsetLeft = eRect.left - parentRect.left;
      cache.offsetTop = eRect.top - parentRect.top;
    } else {
      cache.offsetLeft = point1.x - parentRect.left;
      cache.offsetTop = point1.y - parentRect.top;
    }

    cache.offsetParent = offsetParent;
    i = _tempElements.length;

    while (--i > -1) {
      _tempElements[i].style[_transformProp] = _tempTransforms[i];
    }

    return cache;
  },
      _getOffsetTransformOrigin = function _getOffsetTransformOrigin(e, decoratee) {
    //returns the x/y position of the transformOrigin of the element, in its own local coordinate system (pixels), offset from the top left corner.
    decoratee = decoratee || {};

    if (!e || e === _docElement || !e.parentNode || e === window) {
      return {
        x: 0,
        y: 0
      };
    }

    var cs = _getComputedStyle(e),
        v = _transformOriginProp && cs ? cs.getPropertyValue(_transformOriginProp) : "50% 50%",
        a = v.split(" "),
        x = v.indexOf("left") !== -1 ? "0%" : v.indexOf("right") !== -1 ? "100%" : a[0],
        y = v.indexOf("top") !== -1 ? "0%" : v.indexOf("bottom") !== -1 ? "100%" : a[1];

    if (y === "center" || y == null) {
      y = "50%";
    }

    if (x === "center" || isNaN(parseFloat(x))) {
      //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
      x = "50%";
    }

    if (e.getBBox && _isSVG(e)) {
      //SVG elements must be handled in a special way because their origins are calculated from the top left.
      if (!e._gsTransform) {
        _TweenLite.default.set(e, {
          x: "+=0",
          overwrite: false
        }); //forces creation of the _gsTransform where we store all the transform components including xOrigin and yOrigin for SVG elements, as of GSAP 1.15.0 which also takes care of calculating the origin from the upper left corner of the SVG canvas.


        if (e._gsTransform.xOrigin === undefined) {
          console.log("Draggable requires at least GSAP 1.17.0");
        }
      }

      v = e.getBBox();
      decoratee.x = e._gsTransform.xOrigin - v.x;
      decoratee.y = e._gsTransform.yOrigin - v.y;
    } else {
      if (e.getBBox && (x + y).indexOf("%") !== -1) {
        //Firefox doesn't report offsetWidth/height on <svg> elements.
        e = e.getBBox();
        e = {
          offsetWidth: e.width,
          offsetHeight: e.height
        };
      }

      decoratee.x = x.indexOf("%") !== -1 ? e.offsetWidth * parseFloat(x) / 100 : parseFloat(x);
      decoratee.y = y.indexOf("%") !== -1 ? e.offsetHeight * parseFloat(y) / 100 : parseFloat(y);
    }

    return decoratee;
  },
      _cache = function _cache(e) {
    //computes some important values and stores them in a _dCache object attached to the element itself so that we can optimize performance
    if (Draggable.cacheSVGData !== false && e._dCache && e._dCache.lastUpdate === _TweenLite.default.ticker.frame) {
      //performance optimization. Assume that if the offsets are requested again on the same tick, we can just feed back the values we already calculated (no need to keep recalculating until another tick elapses).
      return e._dCache;
    }

    var cache = e._dCache = e._dCache || {},
        cs = _getComputedStyle(e),
        isSVG = e.getBBox && _isSVG(e),
        isSVGRoot = (e.nodeName + "").toLowerCase() === "svg",
        curSVG;

    cache.isSVG = isSVG;
    cache.isSVGRoot = isSVGRoot;
    cache.borderBox = cs.boxSizing === "border-box";
    cache.computedStyle = cs;

    if (isSVGRoot) {
      //some browsers don't report parentNode on SVG elements.
      curSVG = e.parentNode || _docElement;
      curSVG.insertBefore(_tempDiv, e);
      cache.offsetParent = _tempDiv.offsetParent || _docElement; //in some cases, Firefox still reports offsetParent as null.

      curSVG.removeChild(_tempDiv);
    } else if (isSVG) {
      curSVG = e.parentNode;

      while (curSVG && (curSVG.nodeName + "").toLowerCase() !== "svg") {
        //offsetParent is always the SVG canvas for SVG elements.
        curSVG = curSVG.parentNode;
      }

      cache.offsetParent = curSVG;
    } else {
      cache.offsetParent = e.offsetParent;
    }

    return cache;
  },
      _getOffset2DMatrix = function _getOffset2DMatrix(e, offsetOrigin, parentOffsetOrigin, zeroOrigin, isBase) {
    //"isBase" helps us discern context - it should only be true when the element is the base one (the one at which we're starting to walk up the chain). It only matters in cases when it's an <svg> element itself because that's a case when we don't apply scaling.
    if (e === window || !e || !e.style || !e.parentNode) {
      return [1, 0, 0, 1, 0, 0];
    }

    var cache = e._dCache || _cache(e),
        parent = e.parentNode,
        parentCache = parent._dCache || _cache(parent),
        cs = cache.computedStyle,
        parentOffsetParent = cache.isSVG ? parentCache.offsetParent : parent.offsetParent,
        m,
        isRoot,
        offsets,
        rect,
        t,
        sx,
        sy,
        offsetX,
        offsetY,
        parentRect,
        borderTop,
        borderLeft,
        borderTranslateX,
        borderTranslateY;

    m = cache.isSVG && (e.style[_transformProp] + "").indexOf("matrix") !== -1 ? e.style[_transformProp] : cs ? cs.getPropertyValue(_transformPropCSS) : e.currentStyle ? e.currentStyle[_transformProp] : "1,0,0,1,0,0"; //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values

    if (e.getBBox && (e.getAttribute("transform") + "").indexOf("matrix") !== -1) {
      //SVG can store transform data in its "transform" attribute instead of the CSS, so look for that here (only accept matrix()).
      m = e.getAttribute("transform");
    }

    m = (m + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1, 0, 0, 1, 0, 0];

    if (m.length > 6) {
      m = [m[0], m[1], m[4], m[5], m[12], m[13]];
    }

    if (zeroOrigin) {
      m[4] = m[5] = 0;
    } else if (cache.isSVG && (t = e._gsTransform) && (t.xOrigin || t.yOrigin)) {
      //SVGs handle origin very differently. Factor in GSAP's handling of origin values here:
      m[0] = parseFloat(m[0]);
      m[1] = parseFloat(m[1]);
      m[2] = parseFloat(m[2]);
      m[3] = parseFloat(m[3]);
      m[4] = parseFloat(m[4]) - (t.xOrigin - (t.xOrigin * m[0] + t.yOrigin * m[2]));
      m[5] = parseFloat(m[5]) - (t.yOrigin - (t.xOrigin * m[1] + t.yOrigin * m[3]));
    }

    if (offsetOrigin) {
      if (_svgBorderFactor === undefined) {
        _setEnvironmentVariables();
      }

      offsets = cache.isSVG || cache.isSVGRoot ? _getSVGOffsets(e) : e;

      if (cache.isSVG) {
        //don't just rely on "instanceof _SVGElement" because if the SVG is embedded via an object tag, it won't work (SVGElement is mapped to a different object))
        rect = e.getBBox();
        parentRect = parentCache.isSVGRoot ? {
          x: 0,
          y: 0
        } : parent.getBBox();
        offsets = {
          offsetLeft: rect.x - parentRect.x,
          offsetTop: rect.y - parentRect.y,
          offsetParent: cache.offsetParent
        };
      } else if (cache.isSVGRoot) {
        borderTop = parseInt(cs.borderTopWidth, 10) || 0;
        borderLeft = parseInt(cs.borderLeftWidth, 10) || 0;
        borderTranslateX = (m[0] - _svgBorderFactor) * borderLeft + m[2] * borderTop;
        borderTranslateY = m[1] * borderLeft + (m[3] - _svgBorderFactor) * borderTop;
        sx = offsetOrigin.x;
        sy = offsetOrigin.y;
        offsetX = sx - (sx * m[0] + sy * m[2]); //accommodate the SVG root's transforms when the origin isn't in the top left.

        offsetY = sy - (sx * m[1] + sy * m[3]);
        m[4] = parseFloat(m[4]) + offsetX;
        m[5] = parseFloat(m[5]) + offsetY;
        offsetOrigin.x -= offsetX;
        offsetOrigin.y -= offsetY;
        sx = offsets.scaleX;
        sy = offsets.scaleY;

        if (!isBase) {
          //when getting the matrix for a root <svg> element itself (NOT in the context of an SVG element that's nested inside of it like a <path>), we do NOT apply the scaling!
          offsetOrigin.x *= sx;
          offsetOrigin.y *= sy;
        }

        m[0] *= sx;
        m[1] *= sy;
        m[2] *= sx;
        m[3] *= sy;

        if (!_isIE10orBelow) {
          offsetOrigin.x += borderTranslateX;
          offsetOrigin.y += borderTranslateY;
        }

        if (parentOffsetParent === _doc.body && offsets.offsetParent === _docElement) {
          //to avoid issues with margin/padding on the <body>, we always set the offsetParent to _docElement in the _getSVGOffsets() function but there's a condition we check later in this function for (parentOffsetParent === offsets.offsetParent) which would fail if we don't run this logic. In other words, parentOffsetParent may be <body> and the <svg>'s offsetParent is also <body> but artificially set to _docElement to avoid margin/padding issues.
          parentOffsetParent = _docElement;
        }
      } else if (!_hasBorderBug && e.offsetParent) {
        offsetOrigin.x += parseInt(_getStyle(e.offsetParent, "borderLeftWidth"), 10) || 0;
        offsetOrigin.y += parseInt(_getStyle(e.offsetParent, "borderTopWidth"), 10) || 0;
      }

      isRoot = parent === _docElement || parent === _doc.body;
      m[4] = Number(m[4]) + offsetOrigin.x + (offsets.offsetLeft || 0) - parentOffsetOrigin.x - (isRoot ? 0 : parent.scrollLeft || 0);
      m[5] = Number(m[5]) + offsetOrigin.y + (offsets.offsetTop || 0) - parentOffsetOrigin.y - (isRoot ? 0 : parent.scrollTop || 0);

      if (parent && _getStyle(e, "position", true) === "fixed") {
        //fixed position elements should factor in the scroll position of the document.
        m[4] += _getDocScrollLeft();
        m[5] += _getDocScrollTop();
        parent = parent.offsetParent;

        while (parent) {
          m[4] -= parent.offsetLeft;
          m[5] -= parent.offsetTop;
          parent = parent.offsetParent;
        }
      } else if (parent && parent !== _docElement && parentOffsetParent === offsets.offsetParent && !parentCache.isSVG && (!_hasReparentBug || _getOffset2DMatrix(parent).join("") === "100100")) {
        offsets = parentCache.isSVGRoot ? _getSVGOffsets(parent) : parent;
        m[4] -= offsets.offsetLeft || 0;
        m[5] -= offsets.offsetTop || 0;

        if (!_hasBorderBug && parentCache.offsetParent && !cache.isSVG && !cache.isSVGRoot) {
          m[4] -= parseInt(_getStyle(parentCache.offsetParent, "borderLeftWidth"), 10) || 0;
          m[5] -= parseInt(_getStyle(parentCache.offsetParent, "borderTopWidth"), 10) || 0;
        }
      }
    }

    return m;
  },
      _getConcatenatedMatrix = function _getConcatenatedMatrix(e, invert) {
    if (!e || e === window || !e.parentNode) {
      return [1, 0, 0, 1, 0, 0];
    } //note: we keep reusing _point1 and _point2 in order to minimize memory usage and garbage collection chores.


    var originOffset = _getOffsetTransformOrigin(e, _point1),
        parentOriginOffset = _getOffsetTransformOrigin(e.parentNode, _point2),
        m = _getOffset2DMatrix(e, originOffset, parentOriginOffset, false, !invert),
        a,
        b,
        c,
        d,
        tx,
        ty,
        m2,
        determinant;

    while ((e = e.parentNode) && e.parentNode && e !== _docElement) {
      originOffset = parentOriginOffset;
      parentOriginOffset = _getOffsetTransformOrigin(e.parentNode, originOffset === _point1 ? _point2 : _point1);
      m2 = _getOffset2DMatrix(e, originOffset, parentOriginOffset);
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      m[0] = a * m2[0] + b * m2[2];
      m[1] = a * m2[1] + b * m2[3];
      m[2] = c * m2[0] + d * m2[2];
      m[3] = c * m2[1] + d * m2[3];
      m[4] = tx * m2[0] + ty * m2[2] + m2[4];
      m[5] = tx * m2[1] + ty * m2[3] + m2[5];
    }

    if (invert) {
      a = m[0];
      b = m[1];
      c = m[2];
      d = m[3];
      tx = m[4];
      ty = m[5];
      determinant = a * d - b * c;
      m[0] = d / determinant;
      m[1] = -b / determinant;
      m[2] = -c / determinant;
      m[3] = a / determinant;
      m[4] = (c * ty - d * tx) / determinant;
      m[5] = -(a * ty - b * tx) / determinant;
    }

    return m;
  },
      _localToGlobal = function _localToGlobal(e, p, fromTopLeft, decoratee) {
    e = _unwrapElement(e);

    var m = _getConcatenatedMatrix(e, false),
        x = p.x,
        y = p.y;

    if (fromTopLeft) {
      _getOffsetTransformOrigin(e, p);

      x -= p.x;
      y -= p.y;
    }

    decoratee = decoratee === true ? p : decoratee || {};
    decoratee.x = x * m[0] + y * m[2] + m[4];
    decoratee.y = x * m[1] + y * m[3] + m[5];
    return decoratee;
  },
      _localizePoint = function _localizePoint(p, localToGlobal, globalToLocal) {
    var x = p.x * localToGlobal[0] + p.y * localToGlobal[2] + localToGlobal[4],
        y = p.x * localToGlobal[1] + p.y * localToGlobal[3] + localToGlobal[5];
    p.x = x * globalToLocal[0] + y * globalToLocal[2] + globalToLocal[4];
    p.y = x * globalToLocal[1] + y * globalToLocal[3] + globalToLocal[5];
    return p;
  },
      _getElementBounds = function _getElementBounds(e, context, fromTopLeft) {
    if (!(e = _unwrapElement(e))) {
      return null;
    }

    context = _unwrapElement(context);

    var isSVG = e.getBBox && _isSVG(e),
        origin,
        left,
        right,
        top,
        bottom,
        mLocalToGlobal,
        mGlobalToLocal,
        p1,
        p2,
        p3,
        p4,
        bbox,
        width,
        height,
        cache,
        borderLeft,
        borderTop,
        viewBox,
        viewBoxX,
        viewBoxY,
        computedDimensions,
        cs;

    if (e === window) {
      top = _getDocScrollTop();
      left = _getDocScrollLeft();
      right = left + (_docElement.clientWidth || e.innerWidth || _doc.body.clientWidth || 0);
      bottom = top + ((e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _doc.body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
    } else if (context === undefined || context === window) {
      return e.getBoundingClientRect();
    } else {
      origin = _getOffsetTransformOrigin(e);
      left = -origin.x;
      top = -origin.y;

      if (isSVG) {
        bbox = e.getBBox();
        width = bbox.width;
        height = bbox.height;
      } else if ((e.nodeName + "").toLowerCase() !== "svg" && e.offsetWidth) {
        //Chrome dropped support for "offsetWidth" on SVG elements
        width = e.offsetWidth;
        height = e.offsetHeight;
      } else {
        computedDimensions = _getComputedStyle(e);
        width = parseFloat(computedDimensions.width);
        height = parseFloat(computedDimensions.height);
      }

      right = left + width;
      bottom = top + height;

      if (e.nodeName.toLowerCase() === "svg" && !_isOldIE) {
        //root SVG elements are a special beast because they have 2 types of scaling - transforms on themselves as well as the stretching of the SVG canvas itself based on the outer size and the viewBox. If, for example, the SVG's viewbox is "0 0 100 100" but the CSS is set to width:200px; height:200px, that'd make it appear at 2x scale even though the element itself has no CSS transforms but the offsetWidth/offsetHeight are based on that css, not the viewBox so we need to adjust them accordingly.
        cache = _getSVGOffsets(e);
        cs = cache.computedStyle || {};
        viewBox = (e.getAttribute("viewBox") || "0 0").split(" ");
        viewBoxX = parseFloat(viewBox[0]);
        viewBoxY = parseFloat(viewBox[1]);
        borderLeft = parseFloat(cs.borderLeftWidth) || 0;
        borderTop = parseFloat(cs.borderTopWidth) || 0;
        left /= cache.scaleX;
        top /= cache.scaleY;
        right = left + width - (width - (width - borderLeft) / cache.scaleX - viewBoxX);
        bottom = top + height - (height - (height - borderTop) / cache.scaleY - viewBoxY);
        left -= borderLeft / cache.scaleX - viewBoxX;
        top -= borderTop / cache.scaleY - viewBoxY;

        if (computedDimensions) {
          //when we had to use computed styles, factor in the border now.
          right += (parseFloat(cs.borderRightWidth) + borderLeft) / cache.scaleX;
          bottom += (borderTop + parseFloat(cs.borderBottomWidth)) / cache.scaleY;
        }
      }
    }

    if (e === context) {
      return {
        left: left,
        top: top,
        width: right - left,
        height: bottom - top
      };
    }

    mLocalToGlobal = _getConcatenatedMatrix(e);
    mGlobalToLocal = _getConcatenatedMatrix(context, true);
    p1 = _localizePoint({
      x: left,
      y: top
    }, mLocalToGlobal, mGlobalToLocal);
    p2 = _localizePoint({
      x: right,
      y: top
    }, mLocalToGlobal, mGlobalToLocal);
    p3 = _localizePoint({
      x: right,
      y: bottom
    }, mLocalToGlobal, mGlobalToLocal);
    p4 = _localizePoint({
      x: left,
      y: bottom
    }, mLocalToGlobal, mGlobalToLocal);
    left = Math.min(p1.x, p2.x, p3.x, p4.x);
    top = Math.min(p1.y, p2.y, p3.y, p4.y);
    _temp1.x = _temp1.y = 0;

    if (fromTopLeft) {
      _getOffsetTransformOrigin(context, _temp1);
    }

    return {
      left: left + _temp1.x,
      top: top + _temp1.y,
      width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
      height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
    };
  },
      // end matrix and point conversion methods
  _isArrayLike = function _isArrayLike(e) {
    return e && e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? true : false; //could be an array of jQuery objects too, so accommodate that.
  },
      _flattenArray = function _flattenArray(a) {
    var result = [],
        l = a.length,
        i,
        e,
        j;

    for (i = 0; i < l; i++) {
      e = a[i];

      if (_isArrayLike(e)) {
        j = e.length;

        for (j = 0; j < e.length; j++) {
          result.push(e[j]);
        }
      } else if (e && e.length !== 0) {
        result.push(e);
      }
    }

    return result;
  },
      _isTouchDevice = typeof window !== "undefined" && "ontouchstart" in _docElement && "orientation" in window,
      _touchEventLookup = function (types) {
    //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
    var standard = types.split(","),
        converted = (_tempDiv.onpointerdown !== undefined ? "pointerdown,pointermove,pointerup,pointercancel" : _tempDiv.onmspointerdown !== undefined ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
        obj = {},
        i = 4;

    while (--i > -1) {
      obj[standard[i]] = converted[i];
      obj[converted[i]] = standard[i];
    } //to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().


    try {
      _docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function get() {
          _supportsPassive = 1;
        }
      }));
    } catch (e) {}

    return obj;
  }("touchstart,touchmove,touchend,touchcancel"),
      _addListener = function _addListener(element, type, func, capture) {
    if (element.addEventListener) {
      var touchType = _touchEventLookup[type];
      capture = capture || (_supportsPassive ? {
        passive: false
      } : null);
      element.addEventListener(touchType || type, func, capture);

      if (touchType && type !== touchType) {
        //some browsers actually support both, so must we.
        element.addEventListener(type, func, capture);
      }
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, func);
    }
  },
      _removeListener = function _removeListener(element, type, func) {
    if (element.removeEventListener) {
      var touchType = _touchEventLookup[type];
      element.removeEventListener(touchType || type, func);

      if (touchType && type !== touchType) {
        element.removeEventListener(type, func);
      }
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, func);
    }
  },
      _hasTouchID = function _hasTouchID(list, ID) {
    var i = list.length;

    while (--i > -1) {
      if (list[i].identifier === ID) {
        return true;
      }
    }

    return false;
  },
      _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd(e) {
    _isMultiTouching = e.touches && _dragCount < e.touches.length;

    _removeListener(e.target, "touchend", _onMultiTouchDocumentEnd);
  },
      _onMultiTouchDocument = function _onMultiTouchDocument(e) {
    _isMultiTouching = e.touches && _dragCount < e.touches.length;

    _addListener(e.target, "touchend", _onMultiTouchDocumentEnd);
  },
      _parseThrowProps = function _parseThrowProps(draggable, snap, max, min, factor, forceZeroVelocity) {
    var vars = {},
        a,
        i,
        l;

    if (snap) {
      if (factor !== 1 && snap instanceof Array) {
        //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
        vars.end = a = [];
        l = snap.length;

        if (_typeof(snap[0]) === "object") {
          //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
          for (i = 0; i < l; i++) {
            a[i] = _copy(snap[i], factor);
          }
        } else {
          for (i = 0; i < l; i++) {
            a[i] = snap[i] * factor;
          }
        }

        max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.

        min -= 1.1;
      } else if (typeof snap === "function") {
        vars.end = function (value) {
          var result = snap.call(draggable, value),
              copy,
              p;

          if (factor !== 1) {
            if (_typeof(result) === "object") {
              copy = {};

              for (p in result) {
                copy[p] = result[p] * factor;
              }

              result = copy;
            } else {
              result *= factor;
            }
          }

          return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
        };
      } else {
        vars.end = snap;
      }
    }

    if (max || max === 0) {
      vars.max = max;
    }

    if (min || min === 0) {
      vars.min = min;
    }

    if (forceZeroVelocity) {
      vars.velocity = 0;
    }

    return vars;
  },
      _isClickable = function _isClickable(e) {
    //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
    var data;
    return !e || !e.getAttribute || e.nodeName === "BODY" ? false : (data = e.getAttribute("data-clickable")) === "true" || data !== "false" && (e.onclick || _clickableTagExp.test(e.nodeName + "") || e.getAttribute("contentEditable") === "true") ? true : _isClickable(e.parentNode);
  },
      _setSelectable = function _setSelectable(elements, selectable) {
    var i = elements.length,
        e;

    while (--i > -1) {
      e = elements[i];
      e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;

      _setStyle(e, "userSelect", selectable ? "text" : "none");
    }
  },
      _addPaddingBR = function () {
    //this function is in charge of analyzing browser behavior related to padding. It sets the _addPaddingBR to true if the browser doesn't normally factor in the bottom or right padding on the element inside the scrolling area, and it sets _addPaddingLeft to true if it's a browser that requires the extra offset (offsetLeft) to be added to the paddingRight (like Opera).
    var div = _doc.createElement("div"),
        child = _doc.createElement("div"),
        childStyle = child.style,
        parent = _doc.body || _tempDiv,
        val;

    childStyle.display = "inline-block";
    childStyle.position = "relative";
    div.style.cssText = child.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden";
    div.appendChild(child);
    parent.appendChild(div);
    val = child.offsetHeight + 18 > div.scrollHeight; //div.scrollHeight should be child.offsetHeight + 20 because of the 10px of padding on each side, but some browsers ignore one side. We allow a 2px margin of error.

    parent.removeChild(div);
    return val;
  }(),
      //The ScrollProxy class wraps an element's contents into another div (we call it "content") that we either add padding when necessary or apply a translate3d() transform in order to overscroll (scroll past the boundaries). This allows us to simply set the scrollTop/scrollLeft (or top/left for easier reverse-axis orientation, which is what we do in Draggable) and it'll do all the work for us. For example, if we tried setting scrollTop to -100 on a normal DOM element, it wouldn't work - it'd look the same as setting it to 0, but if we set scrollTop of a ScrollProxy to -100, it'll give the correct appearance by either setting paddingTop of the wrapper to 100 or applying a 100-pixel translateY.
  ScrollProxy = function ScrollProxy(element, vars) {
    element = _unwrapElement(element);
    vars = vars || {};

    var content = _doc.createElement("div"),
        style = content.style,
        node = element.firstChild,
        offsetTop = 0,
        offsetLeft = 0,
        prevTop = element.scrollTop,
        prevLeft = element.scrollLeft,
        scrollWidth = element.scrollWidth,
        scrollHeight = element.scrollHeight,
        extraPadRight = 0,
        maxLeft = 0,
        maxTop = 0,
        elementWidth,
        elementHeight,
        contentHeight,
        nextNode,
        transformStart,
        transformEnd;

    if (_supports3D && vars.force3D !== false) {
      transformStart = "translate3d(";
      transformEnd = "px,0px)";
    } else if (_transformProp) {
      transformStart = "translate(";
      transformEnd = "px)";
    }

    this.scrollTop = function (value, force) {
      if (!arguments.length) {
        return -this.top();
      }

      this.top(-value, force);
    };

    this.scrollLeft = function (value, force) {
      if (!arguments.length) {
        return -this.left();
      }

      this.left(-value, force);
    };

    this.left = function (value, force) {
      if (!arguments.length) {
        return -(element.scrollLeft + offsetLeft);
      }

      var dif = element.scrollLeft - prevLeft,
          oldOffset = offsetLeft;

      if ((dif > 2 || dif < -2) && !force) {
        //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
        prevLeft = element.scrollLeft;

        _TweenLite.default.killTweensOf(this, true, {
          left: 1,
          scrollLeft: 1
        });

        this.left(-prevLeft);

        if (vars.onKill) {
          vars.onKill();
        }

        return;
      }

      value = -value; //invert because scrolling works in the opposite direction

      if (value < 0) {
        offsetLeft = value - 0.5 | 0;
        value = 0;
      } else if (value > maxLeft) {
        offsetLeft = value - maxLeft | 0;
        value = maxLeft;
      } else {
        offsetLeft = 0;
      }

      if (offsetLeft || oldOffset) {
        if (transformStart) {
          if (!this._suspendTransforms) {
            style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
          }
        } else {
          style.left = -offsetLeft + "px";
        }

        if (offsetLeft + extraPadRight >= 0) {
          style.paddingRight = offsetLeft + extraPadRight + "px";
        }
      }

      element.scrollLeft = value | 0;
      prevLeft = element.scrollLeft; //don't merge this with the line above because some browsers adjsut the scrollLeft after it's set, so in order to be 100% accurate in tracking it, we need to ask the browser to report it.
    };

    this.top = function (value, force) {
      if (!arguments.length) {
        return -(element.scrollTop + offsetTop);
      }

      var dif = element.scrollTop - prevTop,
          oldOffset = offsetTop;

      if ((dif > 2 || dif < -2) && !force) {
        //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
        prevTop = element.scrollTop;

        _TweenLite.default.killTweensOf(this, true, {
          top: 1,
          scrollTop: 1
        });

        this.top(-prevTop);

        if (vars.onKill) {
          vars.onKill();
        }

        return;
      }

      value = -value; //invert because scrolling works in the opposite direction

      if (value < 0) {
        offsetTop = value - 0.5 | 0;
        value = 0;
      } else if (value > maxTop) {
        offsetTop = value - maxTop | 0;
        value = maxTop;
      } else {
        offsetTop = 0;
      }

      if (offsetTop || oldOffset) {
        if (transformStart) {
          if (!this._suspendTransforms) {
            style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
          }
        } else {
          style.top = -offsetTop + "px";
        }
      }

      element.scrollTop = value | 0;
      prevTop = element.scrollTop;
    };

    this.maxScrollTop = function () {
      return maxTop;
    };

    this.maxScrollLeft = function () {
      return maxLeft;
    };

    this.disable = function () {
      node = content.firstChild;

      while (node) {
        nextNode = node.nextSibling;
        element.appendChild(node);
        node = nextNode;
      }

      if (element === content.parentNode) {
        //in case disable() is called when it's already disabled.
        element.removeChild(content);
      }
    };

    this.enable = function () {
      node = element.firstChild;

      if (node === content) {
        return;
      }

      while (node) {
        nextNode = node.nextSibling;
        content.appendChild(node);
        node = nextNode;
      }

      element.appendChild(content);
      this.calibrate();
    };

    this.calibrate = function (force) {
      var widthMatches = element.clientWidth === elementWidth,
          x,
          y;
      prevTop = element.scrollTop;
      prevLeft = element.scrollLeft;

      if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
        return; //no need to recalculate things if the width and height haven't changed.
      }

      if (offsetTop || offsetLeft) {
        x = this.left();
        y = this.top();
        this.left(-element.scrollLeft);
        this.top(-element.scrollTop);
      } //first, we need to remove any width constraints to see how the content naturally flows so that we can see if it's wider than the containing element. If so, we've got to record the amount of overage so that we can apply that as padding in order for browsers to correctly handle things. Then we switch back to a width of 100% (without that, some browsers don't flow the content correctly)


      if (!widthMatches || force) {
        style.display = "block";
        style.width = "auto";
        style.paddingRight = "0px";
        extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth); //if the content is wider than the container, we need to add the paddingLeft and paddingRight in order for things to behave correctly.

        if (extraPadRight) {
          extraPadRight += _getStyle(element, "paddingLeft") + (_addPaddingBR ? _getStyle(element, "paddingRight") : 0);
        }
      }

      style.display = "inline-block";
      style.position = "relative";
      style.overflow = "visible";
      style.verticalAlign = "top";
      style.width = "100%";
      style.paddingRight = extraPadRight + "px"; //some browsers neglect to factor in the bottom padding when calculating the scrollHeight, so we need to add that padding to the content when that happens. Allow a 2px margin for error

      if (_addPaddingBR) {
        style.paddingBottom = _getStyle(element, "paddingBottom", true);
      }

      if (_isOldIE) {
        style.zoom = "1";
      }

      elementWidth = element.clientWidth;
      elementHeight = element.clientHeight;
      scrollWidth = element.scrollWidth;
      scrollHeight = element.scrollHeight;
      maxLeft = element.scrollWidth - elementWidth;
      maxTop = element.scrollHeight - elementHeight;
      contentHeight = content.offsetHeight;
      style.display = "block";

      if (x || y) {
        this.left(x);
        this.top(y);
      }
    };

    this.content = content;
    this.element = element;
    this._suspendTransforms = false;
    this.enable();
  },
      Draggable = function Draggable(target, vars) {
    _TweenLite.EventDispatcher.call(this, target);

    target = _unwrapElement(target); //in case the target is a selector object or selector text

    if (!ThrowPropsPlugin) {
      ThrowPropsPlugin = _globals.com.greensock.plugins.ThrowPropsPlugin;
    }

    this.vars = vars = _copy(vars || {});
    this.target = target;
    this.x = this.y = this.rotation = 0;
    this.dragResistance = parseFloat(vars.dragResistance) || 0;
    this.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
    this.lockAxis = vars.lockAxis;
    this.autoScroll = vars.autoScroll || 0;
    this.lockedAxis = null;
    this.allowEventDefault = !!vars.allowEventDefault;

    var type = (vars.type || (_isOldIE ? "top,left" : "x,y")).toLowerCase(),
        xyMode = type.indexOf("x") !== -1 || type.indexOf("y") !== -1,
        rotationMode = type.indexOf("rotation") !== -1,
        xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
        yProp = xyMode ? "y" : "top",
        allowX = type.indexOf("x") !== -1 || type.indexOf("left") !== -1 || type === "scroll",
        allowY = type.indexOf("y") !== -1 || type.indexOf("top") !== -1 || type === "scroll",
        minimumMovement = vars.minimumMovement || 2,
        self = this,
        triggers = _slice(vars.trigger || vars.handle || target),
        killProps = {},
        dragEndTime = 0,
        checkAutoScrollBounds = false,
        autoScrollMarginTop = vars.autoScrollMarginTop || 40,
        autoScrollMarginRight = vars.autoScrollMarginRight || 40,
        autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
        autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
        isClickable = vars.clickableTest || _isClickable,
        clickTime = 0,
        enabled,
        scrollProxy,
        startPointerX,
        startPointerY,
        startElementX,
        startElementY,
        hasBounds,
        hasDragCallback,
        maxX,
        minX,
        maxY,
        minY,
        tempVars,
        cssVars,
        touch,
        touchID,
        rotationOrigin,
        dirty,
        old,
        snapX,
        snapY,
        snapXY,
        isClicking,
        touchEventTarget,
        matrix,
        interrupted,
        startScrollTop,
        startScrollLeft,
        applyObj,
        allowNativeTouchScrolling,
        touchDragAxis,
        isDispatching,
        clickDispatch,
        trustedClickDispatch,
        onContextMenu = function onContextMenu(e) {
      //used to prevent long-touch from triggering a context menu.
      if (self.isPressed && e.which < 2) {
        self.endDrag();
      } else {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
        //this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
    render = function render(suppressEvents) {
      if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
        var e = target,
            autoScrollFactor = self.autoScroll * 15,
            //multiplying by 15 just gives us a better "feel" speed-wise.
        parent,
            isRoot,
            rect,
            pointerX,
            pointerY,
            changeX,
            changeY,
            gap;
        checkAutoScrollBounds = false;
        _windowProxy.scrollTop = window.pageYOffset != null ? window.pageYOffset : _docElement.scrollTop != null ? _docElement.scrollTop : _doc.body.scrollTop;
        _windowProxy.scrollLeft = window.pageXOffset != null ? window.pageXOffset : _docElement.scrollLeft != null ? _docElement.scrollLeft : _doc.body.scrollLeft;
        pointerX = self.pointerX - _windowProxy.scrollLeft;
        pointerY = self.pointerY - _windowProxy.scrollTop;

        while (e && !isRoot) {
          //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
          isRoot = _isRoot(e.parentNode);
          parent = isRoot ? _windowProxy : e.parentNode;
          rect = isRoot ? {
            bottom: Math.max(_docElement.clientHeight, window.innerHeight || 0),
            right: Math.max(_docElement.clientWidth, window.innerWidth || 0),
            left: 0,
            top: 0
          } : parent.getBoundingClientRect();
          changeX = changeY = 0;

          if (allowY) {
            gap = parent._gsMaxScrollY - parent.scrollTop;

            if (gap < 0) {
              changeY = gap;
            } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
              checkAutoScrollBounds = true;
              changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
            } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
              checkAutoScrollBounds = true;
              changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
            }

            if (changeY) {
              parent.scrollTop += changeY;
            }
          }

          if (allowX) {
            gap = parent._gsMaxScrollX - parent.scrollLeft;

            if (gap < 0) {
              changeX = gap;
            } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
              checkAutoScrollBounds = true;
              changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
            } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
              checkAutoScrollBounds = true;
              changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
            }

            if (changeX) {
              parent.scrollLeft += changeX;
            }
          }

          if (isRoot && (changeX || changeY)) {
            window.scrollTo(parent.scrollLeft, parent.scrollTop);
            setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
          }

          e = parent;
        }
      }

      if (dirty) {
        var x = self.x,
            y = self.y,
            min = 0.000001;

        if (x < min && x > -min) {
          //browsers don't handle super small decimals well.
          x = 0;
        }

        if (y < min && y > -min) {
          y = 0;
        }

        if (rotationMode) {
          self.deltaX = x - applyObj.data.rotation;
          applyObj.data.rotation = self.rotation = x;
          applyObj.setRatio(1); //note: instead of doing TweenLite.set(), as a performance optimization we skip right to the method that renders the transforms inside CSSPlugin. For old versions of IE, though, we do a normal TweenLite.set() to leverage its ability to re-reroute to an IE-specific 2D renderer.
        } else {
          if (scrollProxy) {
            if (allowY) {
              self.deltaY = y - scrollProxy.top();
              scrollProxy.top(y);
            }

            if (allowX) {
              self.deltaX = x - scrollProxy.left();
              scrollProxy.left(x);
            }
          } else if (xyMode) {
            if (allowY) {
              self.deltaY = y - applyObj.data.y;
              applyObj.data.y = y;
            }

            if (allowX) {
              self.deltaX = x - applyObj.data.x;
              applyObj.data.x = x;
            }

            applyObj.setRatio(1); //note: instead of doing TweenLite.set(), as a performance optimization we skip right to the method that renders the transforms inside CSSPlugin. For old versions of IE, though, we do a normal TweenLite.set() to leverage its ability to re-reroute to an IE-specific 2D renderer.
          } else {
            if (allowY) {
              self.deltaY = y - parseFloat(target.style.top || 0);
              target.style.top = y + "px";
            }

            if (allowX) {
              self.deltaY = x - parseFloat(target.style.left || 0);
              target.style.left = x + "px";
            }
          }
        }

        if (hasDragCallback && !suppressEvents && !isDispatching) {
          isDispatching = true; //in case onDrag has an update() call (avoid endless loop)

          _dispatchEvent(self, "drag", "onDrag");

          isDispatching = false;
        }
      }

      dirty = false;
    },
        //copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the ThrowPropsPlugin tween in an onUpdate to ensure things are synced and snapped.
    syncXY = function syncXY(skipOnUpdate, skipSnap) {
      var x = self.x,
          y = self.y,
          snappedValue;

      if (!target._gsTransform && (xyMode || rotationMode)) {
        //just in case the _gsTransform got wiped, like if the user called clearProps on the transform or something (very rare), doing an x tween forces a re-parsing of the transforms and population of the _gsTransform.
        _TweenLite.default.set(target, {
          x: "+=0",
          overwrite: false,
          data: "_draggable"
        });
      }

      if (xyMode) {
        self.y = target._gsTransform.y;
        self.x = target._gsTransform.x;
      } else if (rotationMode) {
        self.x = self.rotation = target._gsTransform.rotation;
      } else if (scrollProxy) {
        self.y = scrollProxy.top();
        self.x = scrollProxy.left();
      } else {
        self.y = parseInt(target.style.top, 10) || 0;
        self.x = parseInt(target.style.left, 10) || 0;
      }

      if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
        if (snapXY) {
          _temp1.x = self.x;
          _temp1.y = self.y;
          snappedValue = snapXY(_temp1);

          if (snappedValue.x !== self.x) {
            self.x = snappedValue.x;
            dirty = true;
          }

          if (snappedValue.y !== self.y) {
            self.y = snappedValue.y;
            dirty = true;
          }
        }

        if (snapX) {
          snappedValue = snapX(self.x);

          if (snappedValue !== self.x) {
            self.x = snappedValue;

            if (rotationMode) {
              self.rotation = snappedValue;
            }

            dirty = true;
          }
        }

        if (snapY) {
          snappedValue = snapY(self.y);

          if (snappedValue !== self.y) {
            self.y = snappedValue;
          }

          dirty = true;
        }
      }

      if (dirty) {
        render(true);
      }

      if (!skipOnUpdate) {
        self.deltaX = self.x - x;
        self.deltaY = self.y - y;

        _dispatchEvent(self, "throwupdate", "onThrowUpdate");
      }
    },
        calculateBounds = function calculateBounds() {
      var bounds, targetBounds, snap, snapIsRaw;
      hasBounds = false;

      if (scrollProxy) {
        scrollProxy.calibrate();
        self.minX = minX = -scrollProxy.maxScrollLeft();
        self.minY = minY = -scrollProxy.maxScrollTop();
        self.maxX = maxX = self.maxY = maxY = 0;
        hasBounds = true;
      } else if (!!vars.bounds) {
        bounds = _getBounds(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}

        if (rotationMode) {
          self.minX = minX = bounds.left;
          self.maxX = maxX = bounds.left + bounds.width;
          self.minY = minY = self.maxY = maxY = 0;
        } else if (vars.bounds.maxX !== undefined || vars.bounds.maxY !== undefined) {
          bounds = vars.bounds;
          self.minX = minX = bounds.minX;
          self.minY = minY = bounds.minY;
          self.maxX = maxX = bounds.maxX;
          self.maxY = maxY = bounds.maxY;
        } else {
          targetBounds = _getBounds(target, target.parentNode);
          self.minX = minX = _getStyle(target, xProp) + bounds.left - targetBounds.left;
          self.minY = minY = _getStyle(target, yProp) + bounds.top - targetBounds.top;
          self.maxX = maxX = minX + (bounds.width - targetBounds.width);
          self.maxY = maxY = minY + (bounds.height - targetBounds.height);
        }

        if (minX > maxX) {
          self.minX = maxX;
          self.maxX = maxX = minX;
          minX = self.minX;
        }

        if (minY > maxY) {
          self.minY = maxY;
          self.maxY = maxY = minY;
          minY = self.minY;
        }

        if (rotationMode) {
          self.minRotation = minX;
          self.maxRotation = maxX;
        }

        hasBounds = true;
      }

      if (vars.liveSnap) {
        snap = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
        snapIsRaw = snap instanceof Array || typeof snap === "function";

        if (rotationMode) {
          snapX = buildSnapFunc(snapIsRaw ? snap : snap.rotation, minX, maxX, 1);
          snapY = null;
        } else {
          if (snap.points) {
            snapXY = buildPointSnapFunc(snapIsRaw ? snap : snap.points, minX, maxX, minY, maxY, snap.radius, scrollProxy ? -1 : 1);
          } else {
            if (allowX) {
              snapX = buildSnapFunc(snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
            }

            if (allowY) {
              snapY = buildSnapFunc(snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
            }
          }
        }
      }
    },
        onThrowComplete = function onThrowComplete() {
      self.isThrowing = false;

      _dispatchEvent(self, "throwcomplete", "onThrowComplete");
    },
        onThrowOverwrite = function onThrowOverwrite() {
      self.isThrowing = false;
    },
        animate = function animate(throwProps, forceZeroVelocity) {
      var snap, snapIsRaw, tween, overshootTolerance;

      if (throwProps && ThrowPropsPlugin) {
        if (throwProps === true) {
          snap = vars.snap || vars.liveSnap || {};
          snapIsRaw = snap instanceof Array || typeof snap === "function";
          throwProps = {
            resistance: (vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)
          };

          if (rotationMode) {
            throwProps.rotation = _parseThrowProps(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
          } else {
            if (allowX) {
              throwProps[xProp] = _parseThrowProps(self, snapIsRaw ? snap : snap.points || snap.x || snap.left || snap.scrollLeft, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "x");
            }

            if (allowY) {
              throwProps[yProp] = _parseThrowProps(self, snapIsRaw ? snap : snap.points || snap.y || snap.top || snap.scrollTop, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "y");
            }

            if (snap.points || snap instanceof Array && _typeof(snap[0]) === "object") {
              throwProps.linkedProps = xProp + "," + yProp;
              throwProps.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
            }
          }
        }

        self.isThrowing = true;
        overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;
        self.tween = tween = ThrowPropsPlugin.to(scrollProxy || target, {
          throwProps: throwProps,
          data: "_draggable",
          ease: vars.ease || _globals.Power3.easeOut,
          onComplete: onThrowComplete,
          onOverwrite: onThrowOverwrite,
          onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
          onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap && snap.radius ? [false, true] : _emptyArray
        }, Math.max(vars.minDuration || 0, vars.maxDuration || 0) || 2, !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _typeof(throwProps) === "object" && throwProps.resistance > 1000 ? 0 : 0.5, overshootTolerance);

        if (!vars.fastMode) {
          //to populate the end values, we just scrub the tween to the end, record the values, and then jump back to the beginning.
          if (scrollProxy) {
            scrollProxy._suspendTransforms = true; //Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
          }

          tween.render(tween.duration(), true, true);
          syncXY(true, true);
          self.endX = self.x;
          self.endY = self.y;

          if (rotationMode) {
            self.endRotation = self.x;
          }

          tween.play(0);
          syncXY(true, true);

          if (scrollProxy) {
            scrollProxy._suspendTransforms = false;
          }
        }
      } else if (hasBounds) {
        self.applyBounds();
      }
    },
        updateMatrix = function updateMatrix(shiftStart) {
      var start = matrix || [1, 0, 0, 1, 0, 0],
          a,
          b,
          c,
          d,
          tx,
          ty,
          determinant,
          pointerX,
          pointerY;
      matrix = _getConcatenatedMatrix(target.parentNode, true);

      if (shiftStart && self.isPressed && start.join(",") !== matrix.join(",")) {
        //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
        a = start[0];
        b = start[1];
        c = start[2];
        d = start[3];
        tx = start[4];
        ty = start[5];
        determinant = a * d - b * c;
        pointerX = startPointerX * (d / determinant) + startPointerY * (-c / determinant) + (c * ty - d * tx) / determinant;
        pointerY = startPointerX * (-b / determinant) + startPointerY * (a / determinant) + -(a * ty - b * tx) / determinant;
        startPointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
        startPointerX = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
      }

      if (!matrix[1] && !matrix[2] && matrix[0] == 1 && matrix[3] == 1 && matrix[4] == 0 && matrix[5] == 0) {
        //if there are no transforms, we can optimize performance by not factoring in the matrix
        matrix = null;
      }
    },
        recordStartPositions = function recordStartPositions() {
      var edgeTolerance = 1 - self.edgeResistance;
      updateMatrix(false);

      if (matrix) {
        startPointerX = self.pointerX * matrix[0] + self.pointerY * matrix[2] + matrix[4]; //translate to local coordinate system

        startPointerY = self.pointerX * matrix[1] + self.pointerY * matrix[3] + matrix[5];
      }

      if (dirty) {
        setPointerPosition(self.pointerX, self.pointerY);
        render(true);
      }

      if (scrollProxy) {
        calculateBounds();
        startElementY = scrollProxy.top();
        startElementX = scrollProxy.left();
      } else {
        //if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.
        if (isTweening()) {
          syncXY(true, true);
          calculateBounds();
        } else {
          self.applyBounds();
        }

        if (rotationMode) {
          rotationOrigin = self.rotationOrigin = _localToGlobal(target, {
            x: 0,
            y: 0
          });
          syncXY(true, true);
          startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)

          startElementY = self.y = Math.atan2(rotationOrigin.y - self.pointerY, self.pointerX - rotationOrigin.x) * _RAD2DEG;
        } else {
          startScrollTop = target.parentNode ? target.parentNode.scrollTop || 0 : 0;
          startScrollLeft = target.parentNode ? target.parentNode.scrollLeft || 0 : 0;
          startElementY = _getStyle(target, yProp); //record the starting top and left values so that we can just add the mouse's movement to them later.

          startElementX = _getStyle(target, xProp);
        }
      }

      if (hasBounds && edgeTolerance) {
        if (startElementX > maxX) {
          startElementX = maxX + (startElementX - maxX) / edgeTolerance;
        } else if (startElementX < minX) {
          startElementX = minX - (minX - startElementX) / edgeTolerance;
        }

        if (!rotationMode) {
          if (startElementY > maxY) {
            startElementY = maxY + (startElementY - maxY) / edgeTolerance;
          } else if (startElementY < minY) {
            startElementY = minY - (minY - startElementY) / edgeTolerance;
          }
        }
      }

      self.startX = startElementX;
      self.startY = startElementY;
    },
        isTweening = function isTweening() {
      return self.tween && self.tween.isActive();
    },
        removePlaceholder = function removePlaceholder() {
      if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
        //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
        _placeholderDiv.parentNode.removeChild(_placeholderDiv);
      }
    },
        buildSnapFunc = function buildSnapFunc(snap, min, max, factor) {
      if (min == null) {
        min = -_max;
      }

      if (max == null) {
        max = _max;
      }

      if (typeof snap === "function") {
        return function (n) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          return snap.call(self, n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor;
        };
      }

      if (snap instanceof Array) {
        return function (n) {
          var i = snap.length,
              closest = 0,
              absDif = _max,
              val,
              dif;

          while (--i > -1) {
            val = snap[i];
            dif = val - n;

            if (dif < 0) {
              dif = -dif;
            }

            if (dif < absDif && val >= min && val <= max) {
              closest = i;
              absDif = dif;
            }
          }

          return snap[closest];
        };
      }

      return isNaN(snap) ? function (n) {
        return n;
      } : function () {
        return snap * factor;
      };
    },
        buildPointSnapFunc = function buildPointSnapFunc(snap, minX, maxX, minY, maxY, radius, factor) {
      radius = radius && radius < _max ? radius * radius : _max; //so we don't have to Math.sqrt() in the functions. Performance optimization.

      if (typeof snap === "function") {
        return function (point) {
          var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
              x = point.x,
              y = point.y,
              result,
              dx,
              dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

          point.x = x = x > maxX ? maxX + (x - maxX) * edgeTolerance : x < minX ? minX + (x - minX) * edgeTolerance : x;
          point.y = y = y > maxY ? maxY + (y - maxY) * edgeTolerance : y < minY ? minY + (y - minY) * edgeTolerance : y;
          result = snap.call(self, point);

          if (result !== point) {
            point.x = result.x;
            point.y = result.y;
          }

          if (factor !== 1) {
            point.x *= factor;
            point.y *= factor;
          }

          if (radius < _max) {
            dx = point.x - x;
            dy = point.y - y;

            if (dx * dx + dy * dy > radius) {
              point.x = x;
              point.y = y;
            }
          }

          return point;
        };
      }

      if (snap instanceof Array) {
        return function (p) {
          var i = snap.length,
              closest = 0,
              minDist = _max,
              x,
              y,
              point,
              dist;

          while (--i > -1) {
            point = snap[i];
            x = point.x - p.x;
            y = point.y - p.y;
            dist = x * x + y * y;

            if (dist < minDist) {
              closest = i;
              minDist = dist;
            }
          }

          return minDist <= radius ? snap[closest] : p;
        };
      }

      return function (n) {
        return n;
      };
    },
        //called when the mouse is pressed (or touch starts)
    onPress = function onPress(e, force) {
      var i;

      if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
        //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
        return;
      }

      interrupted = isTweening();
      self.pointerEvent = e;

      if (_touchEventLookup[e.type]) {
        //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
        touchEventTarget = e.type.indexOf("touch") !== -1 ? e.currentTarget || e.target : _doc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".

        _addListener(touchEventTarget, "touchend", onRelease);

        _addListener(touchEventTarget, "touchmove", onMove);

        _addListener(touchEventTarget, "touchcancel", onRelease);

        _addListener(_doc, "touchstart", _onMultiTouchDocument);
      } else {
        touchEventTarget = null;

        _addListener(_doc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.

      }

      touchDragAxis = null;

      _addListener(_doc, "mouseup", onRelease);

      if (e && e.target) {
        _addListener(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"

      }

      isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;

      if (isClicking) {
        _addListener(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.


        _dispatchEvent(self, "pressInit", "onPressInit");

        _dispatchEvent(self, "press", "onPress");

        _setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)


        return;
      }

      allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.

      if (_isOldIE) {
        e = _populateIEEvent(e, true);
      } else if (!allowNativeTouchScrolling && !self.allowEventDefault) {
        e.preventDefault();

        if (e.preventManipulation) {
          e.preventManipulation(); //for some Microsoft browsers
        }
      }

      if (e.changedTouches) {
        //touch events store the data slightly differently
        e = touch = e.changedTouches[0];
        touchID = e.identifier;
      } else if (e.pointerId) {
        touchID = e.pointerId; //for some Microsoft browsers
      } else {
        touch = touchID = null;
      }

      _dragCount++;

      _addToRenderQueue(render); //causes the Draggable to render on each "tick" of TweenLite.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)


      startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove

      startPointerX = self.pointerX = e.pageX;

      _dispatchEvent(self, "pressInit", "onPressInit");

      if (allowNativeTouchScrolling || self.autoScroll) {
        _recordMaxScrolls(target.parentNode);
      }

      if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
        //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
        _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
        target.parentNode.appendChild(_placeholderDiv);
      }

      recordStartPositions();

      if (self.tween) {
        self.tween.kill();
      }

      self.isThrowing = false;

      _TweenLite.default.killTweensOf(scrollProxy || target, true, killProps); //in case the user tries to drag it before the last tween is done.


      if (scrollProxy) {
        _TweenLite.default.killTweensOf(target, true, {
          scrollTo: 1
        }); //just in case the original target's scroll position is being tweened somewhere else.

      }

      self.tween = self.lockedAxis = null;

      if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
        target.style.zIndex = Draggable.zIndex++;
      }

      self.isPressed = true;
      hasDragCallback = !!(vars.onDrag || self._listeners.drag);

      if (!rotationMode && (vars.cursor !== false || vars.activeCursor)) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.activeCursor || vars.cursor || "move");
        }
      }

      _dispatchEvent(self, "press", "onPress");
    },
        //called every time the mouse/touch moves
    onMove = function onMove(e) {
      var originalEvent = e,
          touches,
          pointerX,
          pointerY,
          i,
          dx,
          dy;

      if (!enabled || _isMultiTouching || !self.isPressed || !e) {
        return;
      }

      self.pointerEvent = e;
      touches = e.changedTouches;

      if (touches) {
        //touch events store the data slightly differently
        e = touches[0];

        if (e !== touch && e.identifier !== touchID) {
          //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
          i = touches.length;

          while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

          if (i < 0) {
            return;
          }
        }
      } else if (e.pointerId && touchID && e.pointerId !== touchID) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      if (_isOldIE) {
        e = _populateIEEvent(e, true);
      } else {
        if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
          //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
          pointerX = e.pageX;
          pointerY = e.pageY;

          if (matrix) {
            i = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
            pointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
            pointerX = i;
          }

          dx = Math.abs(pointerX - startPointerX);
          dy = Math.abs(pointerY - startPointerY);

          if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            touchDragAxis = dx > dy && allowX ? "x" : "y";

            if (self.vars.lockAxisOnTouchScroll !== false) {
              self.lockedAxis = touchDragAxis === "x" ? "y" : "x";

              if (typeof self.vars.onLockAxis === "function") {
                self.vars.onLockAxis.call(self, originalEvent);
              }
            }

            if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
              onRelease(originalEvent);
              return;
            }
          }
        }

        if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
          originalEvent.preventDefault();

          if (originalEvent.preventManipulation) {
            //for some Microsoft browsers
            originalEvent.preventManipulation();
          }
        }
      }

      if (self.autoScroll) {
        checkAutoScrollBounds = true;
      }

      setPointerPosition(e.pageX, e.pageY);
    },
        setPointerPosition = function setPointerPosition(pointerX, pointerY) {
      var dragTolerance = 1 - self.dragResistance,
          edgeTolerance = 1 - self.edgeResistance,
          xChange,
          yChange,
          x,
          y,
          dif,
          temp;
      self.pointerX = pointerX;
      self.pointerY = pointerY;

      if (rotationMode) {
        y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
        dif = self.y - y;

        if (dif > 180) {
          startElementY -= 360;
          self.y = y;
        } else if (dif < -180) {
          startElementY += 360;
          self.y = y;
        }

        if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
          self.y = y;
          x = startElementX + (startElementY - y) * dragTolerance;
        } else {
          x = startElementX;
        }
      } else {
        if (matrix) {
          temp = pointerX * matrix[0] + pointerY * matrix[2] + matrix[4];
          pointerY = pointerX * matrix[1] + pointerY * matrix[3] + matrix[5];
          pointerX = temp;
        }

        yChange = pointerY - startPointerY;
        xChange = pointerX - startPointerX;

        if (yChange < minimumMovement && yChange > -minimumMovement) {
          yChange = 0;
        }

        if (xChange < minimumMovement && xChange > -minimumMovement) {
          xChange = 0;
        }

        if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
          temp = self.lockedAxis;

          if (!temp) {
            self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;

            if (temp && typeof self.vars.onLockAxis === "function") {
              self.vars.onLockAxis.call(self, self.pointerEvent);
            }
          }

          if (temp === "y") {
            yChange = 0;
          } else if (temp === "x") {
            xChange = 0;
          }
        }

        x = startElementX + xChange * dragTolerance;
        y = startElementY + yChange * dragTolerance;
      }

      if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
        if (snapXY) {
          _temp1.x = x;
          _temp1.y = y;
          temp = snapXY(_temp1);
          x = temp.x;
          y = temp.y;
        }

        if (snapX) {
          x = snapX(x);
        }

        if (snapY) {
          y = snapY(y);
        }
      } else if (hasBounds) {
        if (x > maxX) {
          x = maxX + (x - maxX) * edgeTolerance;
        } else if (x < minX) {
          x = minX + (x - minX) * edgeTolerance;
        }

        if (!rotationMode) {
          if (y > maxY) {
            y = maxY + (y - maxY) * edgeTolerance;
          } else if (y < minY) {
            y = minY + (y - minY) * edgeTolerance;
          }
        }
      }

      if (!rotationMode && !matrix) {
        x = Math.round(x); //helps work around an issue with some Win Touch devices

        y = Math.round(y);
      }

      if (self.x !== x || self.y !== y && !rotationMode) {
        if (rotationMode) {
          self.endRotation = self.x = self.endX = x;
          dirty = true;
        } else {
          if (allowY) {
            self.y = self.endY = y;
            dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
          }

          if (allowX) {
            self.x = self.endX = x;
            dirty = true;
          }
        }

        if (!self.isDragging && self.isPressed) {
          self.isDragging = true;

          _dispatchEvent(self, "dragstart", "onDragStart");
        }
      }
    },
        //called when the mouse/touch is released
    onRelease = function onRelease(e, force) {
      if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
        //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
        return;
      }

      self.isPressed = false;

      var originalEvent = e,
          wasDragging = self.isDragging,
          isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2),
          placeholderDelayedCall = _TweenLite.default.delayedCall(0.001, removePlaceholder),
          touches,
          i,
          syntheticEvent,
          eventTarget,
          syntheticClick;

      if (touchEventTarget) {
        _removeListener(touchEventTarget, "touchend", onRelease);

        _removeListener(touchEventTarget, "touchmove", onMove);

        _removeListener(touchEventTarget, "touchcancel", onRelease);

        _removeListener(_doc, "touchstart", _onMultiTouchDocument);
      } else {
        _removeListener(_doc, "mousemove", onMove);
      }

      _removeListener(_doc, "mouseup", onRelease);

      if (e && e.target) {
        _removeListener(e.target, "mouseup", onRelease);
      }

      dirty = false;

      if (isClicking && !isContextMenuRelease) {
        if (e) {
          _removeListener(e.target, "change", onRelease);

          self.pointerEvent = originalEvent;
        }

        _setSelectable(triggers, false);

        _dispatchEvent(self, "release", "onRelease");

        _dispatchEvent(self, "click", "onClick");

        isClicking = false;
        return;
      }

      _removeFromRenderQueue(render);

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? "move" : null));
        }
      }

      if (wasDragging) {
        dragEndTime = _lastDragTime = _getTime();
        self.isDragging = false;
      }

      _dragCount--;

      if (e) {
        if (_isOldIE) {
          e = _populateIEEvent(e, false);
        }

        touches = e.changedTouches;

        if (touches) {
          //touch events store the data slightly differently
          e = touches[0];

          if (e !== touch && e.identifier !== touchID) {
            //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
            i = touches.length;

            while (--i > -1 && (e = touches[i]).identifier !== touchID) {}

            if (i < 0) {
              return;
            }
          }
        }

        self.pointerEvent = originalEvent;
        self.pointerX = e.pageX;
        self.pointerY = e.pageY;
      }

      if (isContextMenuRelease && originalEvent) {
        originalEvent.preventDefault();

        if (originalEvent.preventManipulation) {
          originalEvent.preventManipulation(); //for some Microsoft browsers
        }

        _dispatchEvent(self, "release", "onRelease");
      } else if (originalEvent && !wasDragging) {
        if (interrupted && (vars.snap || vars.bounds)) {
          //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
          animate(vars.throwProps);
        }

        _dispatchEvent(self, "release", "onRelease");

        if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
          //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
          _dispatchEvent(self, "click", "onClick");

          if (_getTime() - clickTime < 300) {
            _dispatchEvent(self, "doubleclick", "onDoubleClick");
          }

          eventTarget = originalEvent.target || originalEvent.srcElement || target; //old IE uses srcElement

          clickTime = _getTime();

          syntheticClick = function syntheticClick() {
            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
            if (clickTime !== clickDispatch && self.enabled() && !self.isPressed) {
              if (eventTarget.click) {
                //some browsers (like mobile Safari) don't properly trigger the click event
                eventTarget.click();
              } else if (_doc.createEvent) {
                syntheticEvent = _doc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, window, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                eventTarget.dispatchEvent(syntheticEvent);
              }
            }
          };

          if (!_isAndroid && !originalEvent.defaultPrevented) {
            //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
            _TweenLite.default.delayedCall(0.00001, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click.

          }
        }
      } else {
        animate(vars.throwProps); //will skip if throwProps isn't defined or ThrowPropsPlugin isn't loaded.

        if (!_isOldIE && !self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
          originalEvent.preventDefault();

          if (originalEvent.preventManipulation) {
            originalEvent.preventManipulation(); //for some Microsoft browsers
          }
        }

        _dispatchEvent(self, "release", "onRelease");
      }

      if (isTweening()) {
        placeholderDelayedCall.duration(self.tween.duration()); //sync the timing so that the placeholder DIV gets
      }

      if (wasDragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return true;
    },
        updateScroll = function updateScroll(e) {
      if (e && self.isDragging && !scrollProxy) {
        var parent = e.target || e.srcElement || target.parentNode,
            deltaX = parent.scrollLeft - parent._gsScrollX,
            deltaY = parent.scrollTop - parent._gsScrollY;

        if (deltaX || deltaY) {
          if (matrix) {
            startPointerX -= deltaX * matrix[0] + deltaY * matrix[2];
            startPointerY -= deltaY * matrix[3] + deltaX * matrix[1];
          } else {
            startPointerX -= deltaX;
            startPointerY -= deltaY;
          }

          parent._gsScrollX += deltaX;
          parent._gsScrollY += deltaY;
          setPointerPosition(self.pointerX, self.pointerY);
        }
      }
    },
        onClick = function onClick(e) {
      //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
      var time = _getTime(),
          recentlyClicked = time - clickTime < 40,
          recentlyDragged = time - dragEndTime < 40,
          alreadyDispatched = recentlyClicked && clickDispatch === clickTime,
          isModern = !!e.preventDefault,
          defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented,
          alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime,
          trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched; //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?


      if (isModern && (alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false)) {
        e.stopImmediatePropagation();
      }

      if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted !== alreadyDispatchedTrusted)) {
        //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
        if (trusted && alreadyDispatched) {
          trustedClickDispatch = clickTime;
        }

        clickDispatch = clickTime;
        return;
      }

      if (self.isPressed || recentlyDragged || recentlyClicked) {
        if (!isModern) {
          e.returnValue = false;
        } else if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
          e.preventDefault();

          if (e.preventManipulation) {
            e.preventManipulation(); //for some Microsoft browsers
          }
        }
      }
    },
        localizePoint = function localizePoint(p) {
      return matrix ? {
        x: p.x * matrix[0] + p.y * matrix[2] + matrix[4],
        y: p.x * matrix[1] + p.y * matrix[3] + matrix[5]
      } : {
        x: p.x,
        y: p.y
      };
    };

    old = Draggable.get(this.target);

    if (old) {
      old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
    } //give the user access to start/stop dragging...


    this.startDrag = function (e, align) {
      var r1, r2, p1, p2;
      onPress(e || self.pointerEvent, true); //if the pointer isn't on top of the element, adjust things accordingly

      if (align && !self.hitTest(e || self.pointerEvent)) {
        r1 = _parseRect(e || self.pointerEvent);
        r2 = _parseRect(target);
        p1 = localizePoint({
          x: r1.left + r1.width / 2,
          y: r1.top + r1.height / 2
        });
        p2 = localizePoint({
          x: r2.left + r2.width / 2,
          y: r2.top + r2.height / 2
        });
        startPointerX -= p1.x - p2.x;
        startPointerY -= p1.y - p2.y;
      }

      if (!self.isDragging) {
        self.isDragging = true;

        _dispatchEvent(self, "dragstart", "onDragStart");
      }
    };

    this.drag = onMove;

    this.endDrag = function (e) {
      onRelease(e || self.pointerEvent, true);
    };

    this.timeSinceDrag = function () {
      return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1000;
    };

    this.timeSinceClick = function () {
      return (_getTime() - clickTime) / 1000;
    };

    this.hitTest = function (target, threshold) {
      return Draggable.hitTest(self.target, target, threshold);
    };

    this.getDirection = function (from, diagonalThreshold) {
      //from can be "start" (default), "velocity", or an element
      var mode = from === "velocity" && ThrowPropsPlugin ? from : _typeof(from) === "object" && !rotationMode ? "element" : "start",
          xChange,
          yChange,
          ratio,
          direction,
          r1,
          r2;

      if (mode === "element") {
        r1 = _parseRect(self.target);
        r2 = _parseRect(from);
      }

      xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? ThrowPropsPlugin.getVelocity(this.target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);

      if (rotationMode) {
        return xChange < 0 ? "counter-clockwise" : "clockwise";
      } else {
        diagonalThreshold = diagonalThreshold || 2;
        yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? ThrowPropsPlugin.getVelocity(this.target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
        ratio = Math.abs(xChange / yChange);
        direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";

        if (ratio < diagonalThreshold) {
          if (direction !== "") {
            direction += "-";
          }

          direction += yChange < 0 ? "up" : "down";
        }
      }

      return direction;
    };

    this.applyBounds = function (newBounds) {
      var x, y, forceZeroVelocity, e, parent, isRoot;

      if (newBounds && vars.bounds !== newBounds) {
        vars.bounds = newBounds;
        return self.update(true);
      }

      syncXY(true);
      calculateBounds();

      if (hasBounds) {
        x = self.x;
        y = self.y;

        if (x > maxX) {
          x = maxX;
        } else if (x < minX) {
          x = minX;
        }

        if (y > maxY) {
          y = maxY;
        } else if (y < minY) {
          y = minY;
        }

        if (self.x !== x || self.y !== y) {
          forceZeroVelocity = true;
          self.x = self.endX = x;

          if (rotationMode) {
            self.endRotation = x;
          } else {
            self.y = self.endY = y;
          }

          dirty = true;
          render(true);

          if (self.autoScroll && !self.isDragging) {
            _recordMaxScrolls(target.parentNode);

            e = target;
            _windowProxy.scrollTop = window.pageYOffset != null ? window.pageYOffset : _docElement.scrollTop != null ? _docElement.scrollTop : _doc.body.scrollTop;
            _windowProxy.scrollLeft = window.pageXOffset != null ? window.pageXOffset : _docElement.scrollLeft != null ? _docElement.scrollLeft : _doc.body.scrollLeft;

            while (e && !isRoot) {
              //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;

              if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                parent.scrollTop = parent._gsMaxScrollY;
              }

              if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                parent.scrollLeft = parent._gsMaxScrollX;
              }

              e = parent;
            }
          }
        }

        if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
          animate(vars.throwProps, forceZeroVelocity);
        }
      }

      return self;
    };

    this.update = function (applyBounds, sticky, ignoreExternalChanges) {
      var x = self.x,
          y = self.y;
      updateMatrix(!sticky);

      if (applyBounds) {
        self.applyBounds();
      } else {
        if (dirty && ignoreExternalChanges) {
          render(true);
        }

        syncXY(true);
      }

      if (sticky) {
        setPointerPosition(self.pointerX, self.pointerY);

        if (dirty) {
          render(true);
        }
      }

      if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
        recordStartPositions();
      }

      if (self.autoScroll) {
        _recordMaxScrolls(target.parentNode);

        checkAutoScrollBounds = self.isDragging;
        render(true);
      }

      if (self.autoScroll) {
        //in case reparenting occurred.
        _removeScrollListener(target, updateScroll);

        _addScrollListener(target, updateScroll);
      }

      return self;
    };

    this.enable = function (type) {
      var id, i, trigger;

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          _addListener(trigger, "mousedown", onPress);

          _addListener(trigger, "touchstart", onPress);

          _addListener(trigger, "click", onClick, true); //note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.


          if (!rotationMode && vars.cursor !== false) {
            _setStyle(trigger, "cursor", vars.cursor || "move");
          }

          _setStyle(trigger, "touchCallout", "none");

          _setStyle(trigger, "touchAction", allowX === allowY ? "none" : allowX ? "pan-y" : "pan-x");

          if (_isSVG(trigger)) {
            // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
            _setStyle(trigger.ownerSVGElement || trigger, "touchAction", allowX === allowY ? "none" : allowX ? "pan-y" : "pan-x");
          }

          if (!this.vars.allowContextMenu) {
            _addListener(trigger, "contextmenu", onContextMenu);
          }
        }

        _setSelectable(triggers, false);
      }

      _addScrollListener(target, updateScroll);

      enabled = true;

      if (ThrowPropsPlugin && type !== "soft") {
        ThrowPropsPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      if (scrollProxy) {
        scrollProxy.enable();
      }

      target._gsDragID = id = "d" + _lookupCount++;
      _lookup[id] = this;

      if (scrollProxy) {
        scrollProxy.element._gsDragID = id;
      }

      _TweenLite.default.set(target, {
        x: "+=0",
        overwrite: false,
        data: "_draggable"
      }); //simply ensures that there's a _gsTransform on the element.


      applyObj = {
        t: target,
        data: _isOldIE ? cssVars : target._gsTransform,
        tween: {},
        setRatio: _isOldIE ? function () {
          _TweenLite.default.set(target, tempVars);
        } : _CSSPlugin.default._internals.setTransformRatio || _CSSPlugin.default._internals.set3DTransformRatio
      };
      recordStartPositions();
      self.update(true);
      return self;
    };

    this.disable = function (type) {
      var dragging = self.isDragging,
          i,
          trigger;

      if (!rotationMode) {
        i = triggers.length;

        while (--i > -1) {
          _setStyle(triggers[i], "cursor", null);
        }
      }

      if (type !== "soft") {
        i = triggers.length;

        while (--i > -1) {
          trigger = triggers[i];

          _setStyle(trigger, "touchCallout", null);

          _setStyle(trigger, "touchAction", null);

          _removeListener(trigger, "mousedown", onPress);

          _removeListener(trigger, "touchstart", onPress);

          _removeListener(trigger, "click", onClick);

          _removeListener(trigger, "contextmenu", onContextMenu);
        }

        _setSelectable(triggers, true);

        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchcancel", onRelease);

          _removeListener(touchEventTarget, "touchend", onRelease);

          _removeListener(touchEventTarget, "touchmove", onMove);
        }

        _removeListener(_doc, "mouseup", onRelease);

        _removeListener(_doc, "mousemove", onMove);
      }

      _removeScrollListener(target, updateScroll);

      enabled = false;

      if (ThrowPropsPlugin && type !== "soft") {
        ThrowPropsPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }

      if (scrollProxy) {
        scrollProxy.disable();
      }

      _removeFromRenderQueue(render);

      self.isDragging = self.isPressed = isClicking = false;

      if (dragging) {
        _dispatchEvent(self, "dragend", "onDragEnd");
      }

      return self;
    };

    this.enabled = function (value, type) {
      return arguments.length ? value ? self.enable(type) : self.disable(type) : enabled;
    };

    this.kill = function () {
      self.isThrowing = false;

      _TweenLite.default.killTweensOf(scrollProxy || target, true, killProps);

      self.disable();

      _TweenLite.default.set(triggers, {
        clearProps: "userSelect"
      });

      delete _lookup[target._gsDragID];
      return self;
    };

    if (type.indexOf("scroll") !== -1) {
      scrollProxy = this.scrollProxy = new ScrollProxy(target, _extend({
        onKill: function onKill() {
          //ScrollProxy's onKill() gets called if/when the ScrollProxy senses that the user interacted with the scroll position manually (like using the scrollbar). IE9 doesn't fire the "mouseup" properly when users drag the scrollbar of an element, so this works around that issue.
          if (self.isPressed) {
            onRelease(null);
          }
        }
      }, vars)); //a bug in many Android devices' stock browser causes scrollTop to get forced back to 0 after it is altered via JS, so we set overflow to "hidden" on mobile/touch devices (they hide the scroll bar anyway). That works around the bug. (This bug is discussed at https://code.google.com/p/android/issues/detail?id=19625)

      target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
      target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
      target = scrollProxy.content;
    }

    if (vars.force3D !== false) {
      _TweenLite.default.set(target, {
        force3D: true
      }); //improve performance by forcing a GPU layer when possible

    }

    if (rotationMode) {
      killProps.rotation = 1;
    } else {
      if (allowX) {
        killProps[xProp] = 1;
      }

      if (allowY) {
        killProps[yProp] = 1;
      }
    }

    if (rotationMode) {
      tempVars = _tempVarsRotation;
      cssVars = tempVars.css;
      tempVars.overwrite = false;
    } else if (xyMode) {
      tempVars = allowX && allowY ? _tempVarsXY : allowX ? _tempVarsX : _tempVarsY;
      cssVars = tempVars.css;
      tempVars.overwrite = false;
    }

    this.enable();
  },
      p = Draggable.prototype = new _TweenLite.EventDispatcher();

  p.constructor = Draggable;
  p.pointerX = p.pointerY = p.startX = p.startY = p.deltaX = p.deltaY = 0;
  p.isDragging = p.isPressed = false;
  Draggable.version = "0.17.1";
  Draggable.zIndex = 1000;

  _addListener(_doc, "touchcancel", function () {//some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.
  });

  _addListener(_doc, "contextmenu", function (e) {
    var p;

    for (p in _lookup) {
      if (_lookup[p].isPressed) {
        _lookup[p].endDrag();
      }
    }
  });

  Draggable.create = function (targets, vars) {
    if (typeof targets === "string") {
      targets = _TweenLite.default.selector(targets);
    }

    var a = !targets || targets.length === 0 ? [] : _isArrayLike(targets) ? _flattenArray(targets) : [targets],
        i = a.length;

    while (--i > -1) {
      a[i] = new Draggable(a[i], vars);
    }

    return a;
  };

  Draggable.get = function (target) {
    return _lookup[(_unwrapElement(target) || {})._gsDragID];
  };

  Draggable.timeSinceDrag = function () {
    return (_getTime() - _lastDragTime) / 1000;
  };

  var _tempRect = {},
      //reuse to reduce garbage collection tasks
  _oldIERect = function _oldIERect(e) {
    //IE8 doesn't support getBoundingClientRect(), so we use this as a backup.
    var top = 0,
        left = 0,
        width,
        height;
    e = _unwrapElement(e);
    width = e.offsetWidth;
    height = e.offsetHeight;

    while (e) {
      top += e.offsetTop;
      left += e.offsetLeft;
      e = e.offsetParent;
    }

    return {
      top: top,
      left: left,
      width: width,
      height: height
    };
  },
      _parseRect = function _parseRect(e, undefined) {
    //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
    if (e === window) {
      _tempRect.left = _tempRect.top = 0;
      _tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _doc.body.clientWidth || 0;
      _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _doc.body.clientHeight || 0;
      return _tempRect;
    }

    var r = e.pageX !== undefined ? {
      left: e.pageX - _getDocScrollLeft(),
      top: e.pageY - _getDocScrollTop(),
      right: e.pageX - _getDocScrollLeft() + 1,
      bottom: e.pageY - _getDocScrollTop() + 1
    } : !e.nodeType && e.left !== undefined && e.top !== undefined ? e : _isOldIE ? _oldIERect(e) : _unwrapElement(e).getBoundingClientRect();

    if (r.right === undefined && r.width !== undefined) {
      r.right = r.left + r.width;
      r.bottom = r.top + r.height;
    } else if (r.width === undefined) {
      //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
      r = {
        width: r.right - r.left,
        height: r.bottom - r.top,
        right: r.right,
        left: r.left,
        bottom: r.bottom,
        top: r.top
      };
    }

    return r;
  };

  Draggable.hitTest = function (obj1, obj2, threshold) {
    if (obj1 === obj2) {
      return false;
    }

    var r1 = _parseRect(obj1),
        r2 = _parseRect(obj2),
        isOutside = r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top,
        overlap,
        area,
        isRatio;

    if (isOutside || !threshold) {
      return !isOutside;
    }

    isRatio = (threshold + "").indexOf("%") !== -1;
    threshold = parseFloat(threshold) || 0;
    overlap = {
      left: Math.max(r1.left, r2.left),
      top: Math.max(r1.top, r2.top)
    };
    overlap.width = Math.min(r1.right, r2.right) - overlap.left;
    overlap.height = Math.min(r1.bottom, r2.bottom) - overlap.top;

    if (overlap.width < 0 || overlap.height < 0) {
      return false;
    }

    if (isRatio) {
      threshold *= 0.01;
      area = overlap.width * overlap.height;
      return area >= r1.width * r1.height * threshold || area >= r2.width * r2.height * threshold;
    }

    return overlap.width > threshold && overlap.height > threshold;
  };

  _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;";
  return Draggable;
}, true);

var Draggable = _TweenLite.globals.Draggable;
exports.default = exports.Draggable = Draggable;
},{"./TweenLite.js":"node_modules/gsap/TweenLite.js","./CSSPlugin.js":"node_modules/gsap/CSSPlugin.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _TweenMax = _interopRequireDefault(require("gsap/TweenMax"));

var _Draggable = _interopRequireDefault(require("gsap/Draggable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swapService = 179;
var voltCharger = 200;
var chargerTotal;
var swapServiceTotal;
var sum;
window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("INIT");
  document.querySelector("#button1").addEventListener("click", function () {
    document.querySelector("#button1").classList.add("buttonActive");
    document.querySelector("#button2").classList.remove("buttonActive");
    checkButtons();
  });
  document.querySelector("#button2").addEventListener("click", function () {
    document.querySelector("#button2").classList.add("buttonActive");
    document.querySelector("#button1").classList.remove("buttonActive");
    checkButtons();
  });
  document.querySelector("#quantityInput1").addEventListener("change", updateSummary);
  document.querySelector("#quantityInput2").addEventListener("change", updateSummary);
  document.querySelector("#next").addEventListener("click", addToURL);
}

function checkButtons() {
  console.log("check Buttons");
  var button1 = document.querySelector("#button1");

  if (button1.classList.contains("buttonActive") == true) {
    document.querySelector("#volt").style.opacity = 0;
    document.querySelector("#sumCard2").style.opacity = 0;
    document.querySelector("#quantityInput2").value = 0;
    updateSummary();
  } else {
    document.querySelector("#volt").style.opacity = 1;
    document.querySelector("#sumCard2").style.opacity = 1;
    document.querySelector("#quantityInput2").value = 1;
    updateSummary();
  }
}

function updateSummary() {
  var input1 = document.querySelector("#quantityInput1");
  var input2 = document.querySelector("#quantityInput2");
  console.log("Update Sumary");
  document.querySelector("#productAmount1").textContent = input1.value + "x";
  document.querySelector("#productAmount2").textContent = input2.value + "x";
  swapServiceTotal = input1.value * swapService;
  chargerTotal = input2.value * voltCharger;
  document.querySelector("#priceSpan1").textContent = swapServiceTotal;
  document.querySelector("#priceSpan2").textContent = chargerTotal;
  var moms = (swapServiceTotal + chargerTotal) / 100 * 25;
  document.querySelector("#momsValue").textContent = moms + ",- DKK";
  sum = moms + swapServiceTotal + chargerTotal;
  document.querySelector("#totalValue").textContent = sum;
}

function addToURL() {
  var localId = Math.random().toString(36).substring(2, 15);
  var urlString = "?id=" + localId + "&chargers=" + chargerTotal + "&service=" + swapServiceTotal + "&total=" + sum;
  window.location.assign("signUp.html" + urlString);
}
},{"gsap/TweenMax":"node_modules/gsap/TweenMax.js","gsap/Draggable":"node_modules/gsap/Draggable.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65388" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Project.e31bb0bc.js.map