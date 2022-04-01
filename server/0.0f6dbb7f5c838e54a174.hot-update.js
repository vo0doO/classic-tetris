webpackHotUpdate(0,{

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _immutable = __webpack_require__(223);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _propTypes = __webpack_require__(190);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _index = __webpack_require__(280);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _button = __webpack_require__(281);
	
	var _button2 = _interopRequireDefault(_button);
	
	var _store = __webpack_require__(219);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _todo = __webpack_require__(283);
	
	var _todo2 = _interopRequireDefault(_todo);
	
	var _const = __webpack_require__(230);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Keyboard = function (_React$Component) {
	  _inherits(Keyboard, _React$Component);
	
	  function Keyboard() {
	    _classCallCheck(this, Keyboard);
	
	    return _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).apply(this, arguments));
	  }
	
	  _createClass(Keyboard, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      /*
	      * Для работы с телефоном -
	      * срабатывает touchstart,
	      * об этом делается запись,
	      * на основании которой,
	      * перестают запускаться события мыши
	      * */
	      var touchEventCatch = {};
	
	      /*
	      * Срабатывает для мыши во время mousedown.
	      * Может быть вызванно без mouseup.
	      * Совместимость достигается программынм,
	      * вызовом предварительно подготовленного
	      * объекта fake mouseup перед mousedown
	      **/
	      var mouseDownEventCatch = {};
	      document.addEventListener('touchstart', function (e) {
	        if (e.preventDefault) {
	          e.preventDefault();
	        }
	      }, true);
	
	      // улаживать issue: https://github.com/chvin/react-tetris/issues/24
	      document.addEventListener('touchend', function (e) {
	        if (e.preventDefault) {
	          e.preventDefault();
	        }
	      }, true);
	
	      // Предотвращает масштабирование двумя пальцами
	      document.addEventListener('gesturestart', function (e) {
	        if (e.preventDefault) {
	          event.preventDefault();
	        }
	      });
	
	      document.addEventListener('mousedown', function (e) {
	        if (e.preventDefault) {
	          e.preventDefault();
	        }
	      }, true);
	
	      Object.keys(_todo2.default).forEach(function (key) {
	        _this2['dom_' + key].dom.addEventListener('mousedown', function () {
	          if (touchEventCatch[key] === true) {
	            return;
	          }
	          _todo2.default[key].down(_store2.default);
	          mouseDownEventCatch[key] = true;
	        }, true);
	        _this2['dom_' + key].dom.addEventListener('mouseup', function () {
	          if (touchEventCatch[key] === true) {
	            touchEventCatch[key] = false;
	            return;
	          }
	          _todo2.default[key].up(_store2.default);
	          mouseDownEventCatch[key] = false;
	        }, true);
	        _this2['dom_' + key].dom.addEventListener('mouseout', function () {
	          if (mouseDownEventCatch[key] === true) {
	            _todo2.default[key].up(_store2.default);
	          }
	        }, true);
	        _this2['dom_' + key].dom.addEventListener('touchstart', function () {
	          touchEventCatch[key] = true;
	          _todo2.default[key].down(_store2.default);
	        }, true);
	        _this2['dom_' + key].dom.addEventListener('touchend', function () {
	          _todo2.default[key].up(_store2.default);
	        }, true);
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(_ref) {
	      var keyboard = _ref.keyboard,
	          filling = _ref.filling;
	
	      return !_immutable2.default.is(keyboard, this.props.keyboard) || filling !== this.props.filling;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var keyboard = this.props.keyboard;
	      return _react2.default.createElement(
	        'div',
	        {
	          className: _index2.default.keyboard,
	          style: {
	            marginTop: 20 + this.props.filling
	          }
	        },
	        _react2.default.createElement(_button2.default, {
	          color: 'blue',
	          size: 's1',
	          top: 0,
	          left: 374,
	          label: _const.i18n.rotation[_const.lan],
	          arrow: 'translate(0, 63px)',
	          position: true,
	          active: keyboard.get('rotate'),
	          ref: function ref(c) {
	            _this3.dom_rotate = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'blue',
	          size: 's1',
	          top: 180,
	          left: 374,
	          label: _const.i18n.down[_const.lan],
	          arrow: 'translate(0,-71px) rotate(180deg)',
	          active: keyboard.get('down'),
	          ref: function ref(c) {
	            _this3.dom_down = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'blue',
	          size: 's1',
	          top: 90,
	          left: 284,
	          label: _const.i18n.left[_const.lan],
	          arrow: 'translate(60px, -12px) rotate(270deg)',
	          active: keyboard.get('left'),
	          ref: function ref(c) {
	            _this3.dom_left = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'blue',
	          size: 's1',
	          top: 90,
	          left: 464,
	          label: _const.i18n.right[_const.lan],
	          arrow: 'translate(-60px, -12px) rotate(90deg)',
	          active: keyboard.get('right'),
	          ref: function ref(c) {
	            _this3.dom_right = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'blue',
	          size: 's0',
	          top: 100,
	          left: 52,
	          label: _const.i18n.drop[_const.lan] + ' (SPACE)',
	          active: keyboard.get('drop'),
	          ref: function ref(c) {
	            _this3.dom_space = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'red',
	          size: 's2',
	          top: 0,
	          left: 196,
	          label: _const.i18n.reset[_const.lan] + '(R)',
	          active: keyboard.get('reset'),
	          ref: function ref(c) {
	            _this3.dom_r = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'green',
	          size: 's2',
	          top: 0,
	          left: 106,
	          label: _const.i18n.sound[_const.lan] + '(S)',
	          active: keyboard.get('music'),
	          ref: function ref(c) {
	            _this3.dom_s = c;
	          }
	        }),
	        _react2.default.createElement(_button2.default, {
	          color: 'green',
	          size: 's2',
	          top: 0,
	          left: 16,
	          label: _const.i18n.pause[_const.lan] + '(P)',
	          active: keyboard.get('pause'),
	          ref: function ref(c) {
	            _this3.dom_p = c;
	          }
	        })
	      );
	    }
	  }]);
	
	  return Keyboard;
	}(_react2.default.Component);
	
	exports.default = Keyboard;
	
	
	Keyboard.propTypes = {
	  filling: _propTypes2.default.number.isRequired,
	  keyboard: _propTypes2.default.object.isRequired
	};

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _qrcode = __webpack_require__(294);
	
	var _qrcode2 = _interopRequireDefault(_qrcode);
	
	var _index = __webpack_require__(323);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _const = __webpack_require__(230);
	
	var _unit = __webpack_require__(236);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Guide = function (_React$Component) {
	  _inherits(Guide, _React$Component);
	
	  function Guide() {
	    _classCallCheck(this, Guide);
	
	    var _this = _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).call(this));
	
	    _this.state = {
	      isMobile: (0, _unit.isMobile)(),
	      QRCode: ''
	    };
	    return _this;
	  }
	
	  _createClass(Guide, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;
	
	      if (this.state.isMobile) {
	        return;
	      }
	      _qrcode2.default.toDataURL(location.href, { margin: 1 }).then(function (dataUrl) {
	        return _this2.setState({ QRCode: dataUrl });
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(state) {
	      if (state.QRCode === this.state.QRCode) {
	        return false;
	      }
	      return true;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _ref5, _ref6;
	
	      if (this.state.isMobile) {
	        return null;
	      }
	      return _react2.default.createElement(
	        'div',
	        { style: { display: this.state.isMobile ? 'none' : 'block' } },
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.guide + ' ' + _index2.default.right },
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.up },
	            _react2.default.createElement('em', { style: _defineProperty({}, _const.transform, 'translate(0,-3px) scale(1,2)') })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.left },
	            _react2.default.createElement('em', { style: _defineProperty({}, _const.transform, 'translate(-7px,3px) rotate(-90deg) scale(1,2)') })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.down },
	            _react2.default.createElement('em', { style: _defineProperty({}, _const.transform, 'translate(0,9px) rotate(180deg) scale(1,2)') })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.right },
	            _react2.default.createElement('em', { style: _defineProperty({}, _const.transform, 'translate(7px,3px)rotate(90deg) scale(1,2)') })
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _index2.default.guide + ' ' + _index2.default.left },
	          _react2.default.createElement(
	            'p',
	            null,
	            _react2.default.createElement(
	              'a',
	              { href: 'https://github.com/chvin/react-tetris', rel: 'noopener noreferrer', target: '_blank', title: _const.i18n.linkTitle[_const.lan] },
	              _const.i18n.github[_const.lan] + ':'
	            ),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement('iframe', {
	              src: 'https://ghbtns.com/github-btn.html?user=vo0doo&repo=classic-tetris&type=star&count=true',
	              frameBorder: '0',
	              scrolling: '0',
	              width: '170px',
	              height: '20px',
	              style: (_ref5 = {}, _defineProperty(_ref5, _const.transform, 'scale(1.68)'), _defineProperty(_ref5, _const.transform + 'Origin', 'center left'), _ref5)
	            }),
	            _react2.default.createElement('br', null),
	            _react2.default.createElement('iframe', {
	              src: 'https://ghbtns.com/github-btn.html?user=vo0doo&repo=classic-tetris&type=fork&count=true',
	              frameBorder: '0',
	              scrolling: '0',
	              width: '170px',
	              height: '20px',
	              style: (_ref6 = {}, _defineProperty(_ref6, _const.transform, 'scale(1.68)'), _defineProperty(_ref6, _const.transform + 'Origin', 'center left'), _ref6)
	            })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _index2.default.space },
	            'SPACE'
	          )
	        ),
	        this.state.QRCode !== '' ? _react2.default.createElement(
	          'div',
	          { className: _index2.default.guide + ' ' + _index2.default.qr },
	          _react2.default.createElement('img', {
	            src: this.state.QRCode,
	            alt: _const.i18n.QRCode[_const.lan]
	          })
	        ) : null
	      );
	    }
	  }]);
	
	  return Guide;
	}(_react2.default.Component);
	
	exports.default = Guide;

/***/ })

})
//# sourceMappingURL=0.0f6dbb7f5c838e54a174.hot-update.js.map