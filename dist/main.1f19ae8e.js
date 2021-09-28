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
})({"main.js":[function(require,module,exports) {
'use strict';

var cart = JSON.parse(localStorage.getItem('cart')) || [];
var cartDOM = document.querySelector('.cart');
var addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
  cart.forEach(function (product) {
    insertItemToDOM(product);
    countCartTotal();
    addToCartButtonsDOM.forEach(function (addToCartButtonDOM) {
      var productDOM = addToCartButtonDOM.parentNode;

      if (productDOM.querySelector('.product__name').innerText === product.name) {
        handleActionButtons(addToCartButtonDOM, product);
      }
    });
  });
} //кнопка додати в корзину


addToCartButtonsDOM.forEach(function (addToCartButtonDOM) {
  addToCartButtonDOM.addEventListener('click', function () {
    var productDOM = addToCartButtonDOM.parentNode;
    var product = {
      image: productDOM.querySelector('.product__image').getAttribute('src'),
      name: productDOM.querySelector('.product__name').innerText,
      price: productDOM.querySelector('.product__price').innerText,
      quantity: 1
    };
    var isInCart = cart.filter(function (cartItem) {
      return cartItem.name === product.name;
    }).length > 0;

    if (!isInCart) {
      insertItemToDOM(product);
      cart.push(product);
      saveCart();
      handleActionButtons(addToCartButtonDOM, product);
    }
  });
}); // Вставляння коду в корзину

function insertItemToDOM(product) {
  var fileName = location.href.split("/").slice(-1);

  if (fileName[0] === "cart.html") {
    cartDOM.insertAdjacentHTML('beforeend', "\n\t\t<div class=\"cart__item\">\n\t\t  <img class=\"cart__item__image\" src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" >\n\t\t  <h3 class=\"cart__item__name\">").concat(product.name, "</h3>\n\t\t  <h3 class=\"cart__item__price\">").concat(product.price, "</h3>\n\t\t  <h3 class=\"cart__item__quantity\">").concat(product.quantity, "</h3>\n\t\t</div>\n\t  "));
  } else {
    cartDOM.insertAdjacentHTML('beforeend', "\n\t\t<div class=\"cart__item\">\n\t\t  <img class=\"cart__item__image\" src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\" >\n\t\t  <h3 class=\"cart__item__name\">").concat(product.name, "</h3>\n\t\t  <h3 class=\"cart__item__price\">").concat(product.price, "</h3>\n\t\t  <button class=\"btn btn--primary btn--small").concat(product.quantity === 1 ? ' btn--danger' : '', "\" data-action=\"DECREASE_ITEM\">&minus;</button>\n\t\t  <h3 class=\"cart__item__quantity\">").concat(product.quantity, "</h3>\n\t\t  <button class=\"btn btn--primary btn--small\" data-action=\"INCREASE_ITEM\">&plus;</button>\n\t\t  <button class=\"btn btn--danger btn--small\" data-action=\"REMOVE_ITEM\">&times;</button>\n\t\t</div>\n\t  "));
  }

  addCartFooter();
} // Yправління кнопками в кошику


function handleActionButtons(addToCartButtonDOM, product) {
  addToCartButtonDOM.innerText = 'In Cart';
  addToCartButtonDOM.disabled = true;
  var cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
  cartItemsDOM.forEach(function (cartItemDOM) {
    if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {
      cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', function () {
        return increaseItem(product, cartItemDOM);
      });
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', function () {
        return decreaseItem(product, cartItemDOM, addToCartButtonDOM);
      });
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', function () {
        return removeItem(product, cartItemDOM, addToCartButtonDOM);
      });
    }
  });
} // Збільшення кількості товару в кошику


function increaseItem(product, cartItemDOM) {
  cart.forEach(function (cartItem) {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger');
      saveCart();
    }
  });
} // Зменшення кількості товару в кошику


function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
  cart.forEach(function (cartItem) {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
        saveCart();
      } else {
        removeItem(product, cartItemDOM, addToCartButtonDOM);
      }

      if (cartItem.quantity === 1) {
        cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger');
      }
    }
  });
} // вилучити товар з кошика


function removeItem(product, cartItemDOM, addToCartButtonDOM) {
  cartItemDOM.classList.add('cart__item--removed');
  setTimeout(function () {
    return cartItemDOM.remove();
  }, 250);
  cart = cart.filter(function (cartItem) {
    return cartItem.name !== product.name;
  });
  saveCart();
  addToCartButtonDOM.innerText = 'Add To Cart';
  addToCartButtonDOM.disabled = false;

  if (cart.length < 1) {
    document.querySelector('.cart-footer').remove();
  }
} // додавання кнопок до кошика 


function addCartFooter() {
  if (document.querySelector('.cart-footer') === null) {
    var fileName = location.href.split("/").slice(-1);

    if (fileName[0] === "cart.html") {
      cartDOM.insertAdjacentHTML('afterend', "\n\t\t  <div class=\"cart-footer\">\n\t\t\t<button class=\"btn btn--danger\" data-action=\"CLEAR_CART\">Clear Cart</button>\n\t\t\t<button class=\"btn btn--back\" data-action=\"BACK\">Back</button>\n\t\t\t<button class=\"btn btn--primary\" data-action=\"CHECKOUT\">CHECKOUT</button>\n\t\t  </div>\n\t\t");
      document.querySelector('[data-action="BACK"]').addEventListener('click', function () {
        return back();
      });
    } else {
      cartDOM.insertAdjacentHTML('afterend', "\n\t\t  <div class=\"cart-footer\">\n\t\t\t<button class=\"btn btn--danger\" data-action=\"CLEAR_CART\">Clear Cart</button>\n\t\t\t<button class=\"btn btn--primary\" data-action=\"CHECKOUT\">CHECKOUT</button>\n\t\t  </div>\n\t\t");
    }

    document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', function () {
      return clearCart();
    });
    document.querySelector('[data-action="CHECKOUT"]').addEventListener('click', function () {
      return checkout();
    });
  }
} // Очистити корзину


function clearCart() {
  var fileName = location.href.split("/").slice(-1);

  if (fileName[0] === "cart.html") {
    window.location.href = 'index.html';
    document.querySelectorAll('.cart__item').forEach(function (cartItemDOM) {
      cartItemDOM.classList.add('cart__item--removed');
      setTimeout(function () {
        return cartItemDOM.remove();
      }, 250);
    });
    cart = [];
    localStorage.removeItem('cart');
    countCartTotal();
    document.querySelector('.cart-footer').remove();
    addToCartButtonsDOM.forEach(function (addToCartButtonDOM) {
      addToCartButtonDOM.innerText = 'Add To Cart';
      addToCartButtonDOM.disabled = false;
    });
  } else {
    document.querySelectorAll('.cart__item').forEach(function (cartItemDOM) {
      cartItemDOM.classList.add('cart__item--removed');
      setTimeout(function () {
        return cartItemDOM.remove();
      }, 250);
    });
    cart = [];
    localStorage.removeItem('cart');
    countCartTotal();
    document.querySelector('.cart-footer').remove();
    addToCartButtonsDOM.forEach(function (addToCartButtonDOM) {
      addToCartButtonDOM.innerText = 'Add To Cart';
      addToCartButtonDOM.disabled = false;
    });
  }
}

function checkout() {
  var fileName = location.href.split("/").slice(-1);

  if (fileName[0] === "cart.html") {
    window.location.href = 'index.html';
    clearCart();
    alert("Дякую за покупку");
  } else {
    window.location.href = 'cart.html';
  }
} // Обчислення загальної суми


function countCartTotal() {
  var fileName = location.href.split("/").slice(-1);

  if (fileName[0] === "cart.html") {
    var cartTotal = 0;
    cart.forEach(function (cartItem) {
      return cartTotal += cartItem.quantity * cartItem.price;
    });
    document.querySelector('[data-action="CHECKOUT"]').innerText = "Pay $".concat(cartTotal);
  } else {
    var _cartTotal = 0;
    cart.forEach(function (cartItem) {
      return _cartTotal += cartItem.quantity * cartItem.price;
    });
    document.querySelector('[data-action="CHECKOUT"]').innerText = "Checkout: $".concat(_cartTotal);
  }
}

function back() {
  window.location.href = 'index.html';
} // Збереження кошика в localStorage при змінах 


function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  countCartTotal();
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60473" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map