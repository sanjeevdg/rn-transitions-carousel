"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _maskedView = _interopRequireDefault(require("@react-native-masked-view/masked-view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _Dimensions$get = _reactNative.Dimensions.get('window'),
  width = _Dimensions$get.width,
  height = _Dimensions$get.height;
var circleMaxRadius = Math.sqrt(width * width + height * height) / 2;
var CircularImageCarousel = function CircularImageCarousel(_ref) {
  var images = _ref.images,
    _ref$interval = _ref.interval,
    interval = _ref$interval === void 0 ? 3000 : _ref$interval;
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    currentIndex = _useState2[0],
    setCurrentIndex = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    transitioning = _useState4[0],
    setTransitioning = _useState4[1];
  var revealRadius = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    nextIndex = _useState6[0],
    setNextIndex = _useState6[1];
  (0, _react.useEffect)(function () {
    var timer = setInterval(function () {
      if (!transitioning) {
        var newIndex = (currentIndex + 1) % images.length;
        setNextIndex(newIndex);
        setTransitioning(true);
        revealRadius.setValue(0);
        _reactNative.Animated.timing(revealRadius, {
          toValue: circleMaxRadius,
          duration: 4000,
          useNativeDriver: false
        }).start(function () {
          setCurrentIndex(newIndex);
          setTransitioning(false);
          setNextIndex(null);
        });
      }
    }, interval);
    return function () {
      return clearInterval(timer);
    };
  }, [currentIndex, images, interval, transitioning, revealRadius]);
  var maskElement = <_reactNative.View style={styles.centered}>
      <_reactNative.Animated.View style={{
      width: revealRadius.interpolate({
        inputRange: [0, circleMaxRadius],
        outputRange: [0, circleMaxRadius * 2]
      }),
      height: revealRadius.interpolate({
        inputRange: [0, circleMaxRadius],
        outputRange: [0, circleMaxRadius * 2]
      }),
      borderRadius: revealRadius,
      backgroundColor: 'black'
    }} />
    </_reactNative.View>;
  return <_reactNative.View style={styles.container}>
      <_reactNative.Image source={{
      uri: images[currentIndex]
    }} style={styles.image} resizeMode="cover" />
      {transitioning && nextIndex !== null && <_maskedView.default style={styles.absoluteFill} maskElement={maskElement}>
          <_reactNative.Image source={{
        uri: images[nextIndex]
      }} style={styles.image} resizeMode="cover" />
        </_maskedView.default>}
    </_reactNative.View>;
};
var styles = _reactNative.StyleSheet.create({
  container: {
    width: width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width,
    height: 300,
    position: 'absolute'
  },
  absoluteFill: _objectSpread({}, _reactNative.StyleSheet.absoluteFillObject),
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});