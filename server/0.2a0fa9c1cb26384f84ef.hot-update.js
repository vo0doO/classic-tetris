webpackHotUpdate(0,{

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
//# sourceMappingURL=0.2a0fa9c1cb26384f84ef.hot-update.js.map