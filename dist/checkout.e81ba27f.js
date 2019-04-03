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
})({"checkout.js":[function(require,module,exports) {
"use strict";

window.addEventListener("DOMContentLoaded", init);
var cc = document.querySelector("#cc");
var paypal = document.querySelector("#paypal");
var mobilepay = document.querySelector("#mobilepay");
var ccText = document.querySelector("#cc-form");
var ppText = document.querySelector("#paypal-text");
var mpText = document.querySelector("#mobilepay-text");

function init() {
  cc.addEventListener("click", function () {
    cc.classList.add("active");
    mobilepay.classList.remove("active");
    paypal.classList.remove("active"); //

    ccText.classList.add("opened");
    mpText.classList.remove("opened");
    ppText.classList.remove("opened");
    checkButtons();
  });
  paypal.addEventListener("click", function () {
    //Buttons
    paypal.classList.add("active");
    cc.classList.remove("active");
    mobilepay.classList.remove("active"); //Text Below

    ppText.classList.add("opened");
    ccText.classList.remove("opened");
    mpText.classList.remove("opened");
    checkButtons();
  });
  mobilepay.addEventListener("click", function () {
    mobilepay.classList.add("active");
    cc.classList.remove("active");
    paypal.classList.remove("active"); //

    mpText.classList.add("opened");
    ppText.classList.remove("opened");
    ccText.classList.remove("opened");
    checkButtons();
  });
  getRestDB();
}

function getRestDB() {
  console.log("GET");
  fetch("https://voltcustomers-f457.restdb.io/rest/customer-details", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ca48775df5d634f46ecb225",
      "cache-control": "no-cache"
    }
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    return checkForCorrctUser(e);
  });
}

function checkForCorrctUser(e) {
  var params = new URL(window.location).searchParams;
  var id = params.get("id");
  e.forEach(function (user) {
    if (user.id == id) {
      updateSummary(user);
    }
  });
}

function updateSummary(user) {
  console.log(user);
  var swapService = 179;
  var voltCharger = 200;
  var chargerTotal = 1;
  var swapServiceTotal = 1;
  var sum;
  document.querySelector("#productAmount1").textContent = user.charger + "x";
  document.querySelector("#productAmount2").textContent = user.service + "x";
  swapServiceTotal = user.service * swapService;
  chargerTotal = user.charger * voltCharger;
  document.querySelector("#priceSpan1").textContent = swapServiceTotal;
  document.querySelector("#priceSpan2").textContent = chargerTotal;
  var moms = (swapServiceTotal + chargerTotal) / 100 * 25;
  document.querySelector("#momsValue").textContent = moms + ",- DKK";
  sum = moms + swapServiceTotal + chargerTotal;
  document.querySelector("#totalValue").textContent = sum;
  document.querySelector("#complete-purchase").addEventListener("click", function () {
    updateUser(user);
  });
}

function updateUser(user) {
  var inputCcn = document.querySelector("#ccNum").value;
  var inputMonth = document.querySelector("#ccMonth").value;
  var inputYear = document.querySelector("#ccYear").value;
  var inputccCvc = document.querySelector("#ccCvc").value;
  var inputName = document.querySelector("#ccName").value;
  var data = {
    _id: user._id,
    service: user.service,
    id: user.id,
    charger: user.charger,
    total: user.total,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    country: "-placeholder country-",
    zipCode: "-placeholder zipCode",
    phoneNumber: user.phoneNumber,
    password: user.password,
    ccNumber: inputCcn,
    ccYear: inputYear,
    ccMonth: inputMonth,
    ccName: inputName,
    ccCvv: inputccCvc
  };
  updateFunc(data);
}

function updateFunc(data) {
  console.log("Update");
  console.log(data);
  var postData = JSON.stringify(data);
  fetch("https://voltcustomers-f457.restdb.io/rest/customer-details/" + data._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ca48775df5d634f46ecb225",
      "cache-control": "no-cache"
    },
    body: postData
  }).then(function (d) {
    return d.json();
  }).then(function (t) {
    return newPage();
  });
}

function newPage() {
  console.log("DONE");
  window.location.assign("thanks.html");
}

function checkButtons() {
  if (cc.classList.contains("active") === true) {
    paypal.classList.remove("active");
    mobilepay.classList.remove("active");
  } else if (paypal.classList.contains("active") === true) {
    cc.classList.remove("active");
    mobilepay.classList.remove("active");
  } else {
    paypal.classList.remove("active");
    cc.classList.remove("active");
  }
}
},{}],"../../../Users/Joshua/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60050" + '/');

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
},{}]},{},["../../../Users/Joshua/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","checkout.js"], null)
//# sourceMappingURL=/checkout.e81ba27f.js.map