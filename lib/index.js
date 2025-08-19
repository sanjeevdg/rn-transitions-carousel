"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _CircularImageCarousel = require("./components/CircularImageCarousel");
Object.keys(_CircularImageCarousel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _CircularImageCarousel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CircularImageCarousel[key];
    }
  });
});