/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(4);

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {
  _index2.default.init(3);
  _index4.default.init();

  equipment.init();
});

var equipment = {
  'data': [
    // {
    //   "productId": 87,
    //   "brandId": 27,
    //   "refundRuleId": 41,
    //   "productSn": "000029",
    //   "productName": "【租借】大疆航拍机",
    //   "productBrief": "高清航拍",
    //   "productImg": "/source/image/product/thum/thum_2f3ab26d-a16a-459e-a016-ab36c79e60c3.jpg",
    //   "productThumb": "/source/image/product/thum/thum_2f3ab26d-a16a-459e-a016-ab36c79e60c3.jpg",
    //   "productPrice": 3500.0,
    //   "promotePrice": 0.0,
    //   "promoteStartTime": null,
    //   "promoteEndTime": null,
    //   "clickCount": null,
    //   "isNew": "N",
    //   "isOnsale": "Y",
    //   "period": 1,
    //   "apartment": "",
    //   "apartmentNum": 1,
    //   "bedType": "",
    //   "createBy": 31,
    //   "createTime": 1517271696000,
    //   "updateBy": null,
    //   "updateTime": null,
    //   "isDelete": "N",
    //   "productDesc": null,
    //   "productType": "equipment",
    //   "productView": null
    // }
  ],

  init: function init() {
    var _this = this;

    this.getData().then(function (val) {
      _this.data = val.productList;
    }, function (error) {
      return alert(error);
    });
  },
  getData: function getData() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': 'GET',
        'url': appConfig.version + '/product/list.do?productType=equipment',
        'contentType': 'application/json; charset=utf-8',
        success: function success(val) {
          if (val.result === '0') {
            resolve(val.data);
          } else {
            reject('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u63A5\u6536\u7684\u4EA7\u54C1\u4FE1\u606F\u6570\u636E\u6709\u8BEF, \u539F\u56E0: ' + val.message);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('\u8BF7\u6C42\u4EA7\u54C1\u4FE1\u606F\u53D1\u751F\u9519\u8BEF, \u72B6\u6001\u7801: ' + XMLHttpRequest.status + '. \u539F\u56E0: ' + errorThrown);
        }
      });
    });
  }
};

// 工具类
var utilities = {};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookies = __webpack_require__(2);

var _cookies2 = _interopRequireDefault(_cookies);

var _request = __webpack_require__(3);

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'data': false,
  // {
  //   'bindEmailTime': 1484529221000,
  //   'birthday': "1989-06-01",
  //   'digest': "00000000-0000-0000-0000-00000000",
  //   'email': "123456798@divingtime.asia",
  //   'forgetPsState': null,
  //   'forgetPsTime': null,
  //   'gender': 1,
  //   'genderCount': null,
  //   'isDelete': "N",
  //   'isUseBind': "Y",
  //   'lastIp': "192.168.0.101",
  //   'lastLogin': 1515355000000,
  //   'mobile': "18511111111",
  //   'nickname': "18511111111",
  //   'passwd': null,
  //   'qq': null,
  //   'regTime': 1484189501000,
  //   'salt': null,
  //   'status': 1,
  //   'telephone': null,
  //   'token': "6fafefe0-0000-0000-0000-00000000",
  //   'userId': 70,
  //   'userName': "某某某",
  //   'validateCode': "bbbbb13b5c81e982dcde40c7205f0fc8",
  //   'visitCount': null,
  //   'webchat': null,
  // },
  'username': '', // 账号
  'password': '', // 密码

  'isModalShow': false, // 模态框 是否显示
  'isPasswordShow': false, // 密码 是否显示
  'isLogining': false, // 是否 正在登录
  'isRememberCookie': false, // 是否 记住密码

  'isOutDropdown': false, // 是否 离开下拉菜单
  'dropdownSetTimeout': null, // NodeJS.Timer

  init: function init(SelectedNumString) {
    var _this = this;

    this.litUpContentSelected(SelectedNumString);

    this.bindjQueryEvent();

    this.setOptionCookie();

    this.getUserInfo().then(function (val) {
      if (val.result === 1) {
        _this.data = val.data;
        $('.login-true').show();
      } else {
        if (val.result === 3) {
          console.log(val.message);
        }
        $('.login-false').show();

        $('#login-show').click(function () {
          _this.loginModalShow();
        });
      }
    }, function (error) {
      return alert(error);
    });
  },

  loginModalShow: function loginModalShow() {
    this.isModalShow = true;
    $("#Modal-login").modal('show');
  },

  loginModalHide: function loginModalHide() {
    this.isModalShow = false;
    $($('.input-username label')[0]).html('');
    $($('.input-password label')[0]).html('');
    $('#input-password').val('');
  },

  bindjQueryEvent: function bindjQueryEvent() {
    var _this = this;

    // 隐藏模态框
    $('#login-hiden').click(function () {
      $("#Modal-login").modal('hide');
    });
    $("#Modal-login").on('hidden.bs.modal', function (e) {
      _this.loginModalHide();
    });

    // 显示隐藏密码
    $('#password-eye').click(function () {
      if (_this.isPasswordShow) {
        $('#password-eye').removeClass('eye-show');
        $('#input-password').attr('type', 'password');
        _this.isPasswordShow = false;
      } else {
        $('#password-eye').addClass('eye-show');
        $('#input-password').attr('type', 'text');
        _this.isPasswordShow = true;
      }
    });

    // 输入账号
    $('#input-username').bind('input propertychange', function (event) {
      _this.username = $(this).val();
      _this.checkUserName();
    });

    // 输入密码
    $('#input-password').bind('input propertychange', function (event) {
      _this.password = $(this).val();
      _this.checkPassword();
    });

    // 记住密码
    $('#option-cookie').click(function (event) {
      if (_this.isRememberCookie) {
        $(this).attr("checked", false);
        _this.isRememberCookie = false;
      } else {
        $(this).attr("checked", true);
        _this.isRememberCookie = true;
      }
    });

    // 登录
    $('#login-subimt').click(function (event) {
      _this.optionloginsubimt();
    });

    // 退出 登出
    $('#droplist-logout').click(function (event) {
      _cookies2.default.removeItem('token', '/');
      _cookies2.default.removeItem('digest', '/');

      $('.login-false').show();
      $('.login-true').hide();
    });

    // 下拉框移入 显示
    $('.login-droplist').mouseenter(function (event) {
      _this.isOutDropdown = false;
      _this.dropdownSetTimeout = setTimeout(function () {
        if (_this.isOutDropdown === false) {
          $('.login-user').dropdown('toggle');
        }
      }, 500);
    });
    $('.login-droplist').mouseleave(function (event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
    $('#dLabel').click(function (event) {
      _this.isOutDropdown = true;
      clearTimeout(_this.dropdownSetTimeout);
    });
  },

  optionloginsubimt: function optionloginsubimt() {
    var _this = this;

    if (this.isLogining) {
      return false;
    }

    if (this.checkUserName().result !== 1 || this.checkPassword().result !== 1) {
      return false;
    }

    var myDom = $(this);
    myDom.text('正在提交');
    this.isLogining = true;

    this.subimtLogin().then(function (val) {
      if (val.result === 1) {
        _this.data = val.data;

        _this.SaveCookie();
        $("#Modal-login").modal('hide');

        $('.login-false').hide();
        $('.login-true').show();
      } else if (val.result == '-9') {
        $($('.input-username label')[0]).html('<div class="danger">您的账号尚未激活</div>');
      } else if (val.result == '-5') {
        $($('.input-username label')[0]).html('<div class="danger">此账号不存在</div>');
      } else if (val.result == '-6') {
        $($('.input-password label')[0]).html('<div class="danger">您输入的密码是错误, 请输入正确的密码！</div>');
      }

      myDom.text('登录');
      _this.isLogining = false;
    }, function (error) {
      myDom.text('登录');
      _this.isLogining = false;
      alert(error);
    });
  },

  setOptionCookie: function setOptionCookie() {
    var rememberCookie = localStorage.getItem('remember-cookie');

    if (rememberCookie) {
      rememberCookie = JSON.parse(rememberCookie);
      this.isRememberCookie = true;
      $('#option-cookie').attr("checked", true);

      this.username = rememberCookie.username;
      $('#input-username').val(rememberCookie.username);

      this.password = rememberCookie.password;
      $('#input-password').val(rememberCookie.password);
    }
  },

  SaveCookie: function SaveCookie() {
    var SevenDayLater = new Date(Date.parse(new Date()) + 86400000 * 7);

    _cookies2.default.setItem('token', this.data.token, SevenDayLater, '/');
    _cookies2.default.setItem('digest', this.data.digest, SevenDayLater, '/');

    if (this.isRememberCookie) {
      localStorage.setItem('remember-cookie', JSON.stringify({
        username: this.username,
        password: this.password
      }));
    } else {
      localStorage.removeItem('remember-cookie');
    }
  },

  checkUserName: function checkUserName() {
    var usernameLabel = $($('.input-username label')[0]);

    if (this.username === '') {
      usernameLabel.html('<div>请输入用户名</div>');
      return _request2.default.error('用户名为空');
    }

    // 既不是邮箱账号, 也不是手机账号
    if (/^1[34578]\d{9}$/.test(this.username) === false && /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.username) === false) {
      usernameLabel.html('<div class="warning">请输入正确手机或邮箱格式的账号</div>');
      return _request2.default.error('账号格式有误');
    }

    usernameLabel.html('');
    return _request2.default.success();
  },

  checkPassword: function checkPassword() {
    var passwordLabel = $($('.input-password label')[0]);

    if (this.password === '') {
      passwordLabel.html('<div>请输入密码</div>');
      return _request2.default.error('密码为空');
    }

    // 密码小于 8 位
    if (this.password.length < 8) {
      passwordLabel.html('<div class="warning">输入的密码不能小于8位长度</div>');
      return _request2.default.error('密码格式有误');
    }

    passwordLabel.html('');
    return _request2.default.success();
  },

  subimtLogin: function subimtLogin() {
    var _this = this;
    var subimtData = void 0;

    if (/^1[34578]\d{9}$/.test(this.username)) {
      subimtData = {
        'mobile': this.username,
        'passwd': this.password
      };
    } else {
      subimtData = {
        'email': this.username,
        'passwd': this.password
      };
    }

    return new Promise(function (resolve, reject) {
      fetch(appConfig.version + '/user/login.do', {
        method: 'POST',
        contentType: 'application/json; charset=utf-8',
        body: JSON.stringify(subimtData)
      }).then(function (response) {
        return response.json();
      }, function (error) {
        return { 'result': '1', 'message': error };
      }).then(function (val) {
        if (val.result === '0') {
          resolve(_request2.default.success(val.data));
        } else if (val.result == '-9') {
          resolve(_request2.default.error('您的账号尚未激活', '-9'));
        } else if (val.result == '-5') {
          resolve(_request2.default.error('此账号不存在', '-5'));
        } else if (val.result == '-6') {
          resolve(_request2.default.error('您输入的密码是错误, 请输入正确的密码', '-6'));
        } else {
          reject('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u4F46\u662F\u7528\u6237\u767B\u5F55\u4FE1\u606F\u6709\u8BEF! \u539F\u56E0: ' + val.message);
        }
      }).catch(function (error) {
        reject('\u8BF7\u6C42\u51FA\u9519 , \u5411\u670D\u52A1\u5668\u53D1\u8D77\u8BF7\u6C42\u7528\u6237\u767B\u5F55\u5931\u8D25, \u539F\u56E0: ' + error);
      });
    });
  },

  getUserInfo: function getUserInfo() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'type': "GET",
        'url': appConfig.version + '/user/getUserInfo.do',
        'contentType': "application/json; charset=utf-8",
        'headers': {
          'token': _cookies2.default.getItem('token'),
          'digest': _cookies2.default.getItem('digest')
        },
        success: function success(val) {
          if (val.result === '0') {
            resolve(_request2.default.success(val.data));
          } else if (val.result === '401') {
            resolve(_request2.default.error('你尚未登录!', 2));
          } else {
            resolve(_request2.default.error('\u8BF7\u6C42\u670D\u52A1\u5668\u6210\u529F, \u4F46\u662F\u7528\u6237\u4FE1\u606F\u6709\u8BEF! \u539F\u56E0: ' + val.message, 3));
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          reject('\u8BF7\u6C42\u7528\u6237\u4FE1\u606F\u51FA\u9519, \u72B6\u6001\u7801: ' + XMLHttpRequest.status + '. \u539F\u56E0: ' + errorThrown);
        }
      });
    });
  },

  litUpContentSelected: function litUpContentSelected(SelectedNumString) {
    if (SelectedNumString) {
      $($('.header-content a')[SelectedNumString]).addClass('content-selected');
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 * docCookies.getItem(name)
 * docCookies.removeItem(name[, path], domain)
 * docCookies.hasItem(name)
 * docCookies.keys()
 */

var docCookies = {
  getItem: function getItem(sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function removeItem(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function hasItem(sKey) {
    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */function keys() {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

exports.default = docCookies;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    success: function success(data, message) {
        return {
            'result': 1,
            'data': data || null,
            'message': message || 'Request to Database success'
        };
    },

    error: function error(message, result, data) {
        return {
            'result': result || 0,
            'data': data || null,
            'message': message
        };
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  init: function init() {
    this.scrollTop();
    this.siderBar();
  },
  siderBar: function siderBar() {
    var myclientWidth = document.body.clientWidth;

    $('#showSidebar').click(function () {
      $('#side-bar').animate({
        'right': '0'
      }, 70);
    });

    $("#closeSidebar").click(function () {
      $('#side-bar').animate({ 'right': '-330px' }, 70);
    });
  },
  scrollTop: function scrollTop() {
    var scrollTopTimer = null,
        isshowScrollIcon = false,
        scrollTopNumber = void 0;

    window.onscroll = function () {
      scrollTopNumber = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTopNumber > 600) {
        if (isshowScrollIcon == false) {
          isshowScrollIcon = true;
          $('#scroll-icon-top').css('visibility', 'visible');
          $('#scroll-icon-top').animate({
            'opacity': ' 1'
          }, 500);
        }
      } else if (scrollTopNumber < 600) {
        if (isshowScrollIcon == true) {
          isshowScrollIcon = false;

          $('#scroll-icon-top').animate({
            'opacity': '0'
          }, 500);

          setTimeout(function () {
            $('#scroll-icon-top').css('visibility', 'hidden');
          }, 500);
        }
      }

      return scrollTopNumber;
    };

    $('#scroll-icon-top').click(function () {
      clearInterval(scrollTopTimer);

      scrollTopTimer = setInterval(function () {

        var nowScroll = scrollTopNumber;
        var speed = (0 - nowScroll) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (scrollTopNumber <= 10) {
          clearInterval(scrollTopTimer);
        }
        document.documentElement.scrollTop = scrollTopNumber + speed;
        document.body.scrollTop = scrollTopNumber + speed;
      }, 10);
    });
  }
};

/***/ })
/******/ ]);