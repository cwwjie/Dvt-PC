$(document).ready(function() {
  if (myData.isSupport() === false) {
    alert('非常抱歉，暂不支持此浏览器，请更换您的浏览器或联系客服。');
    return
  }

  myData.getCarouselAjax()
    .then(function(val) {
      myCarousel.data = val;
      myCarousel.init();
    }, function(error) {
      alert(error);
    });

  // 精确到日
  var nowDate = new Date();
  myData.startDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  myData.endDate = new Date(Date.parse(myData.startDate) + 86400000);

  myData.searchApartmentAjax()
    .then(function(val) {
      myApartment.data = utilities.addSelectNum(val);
      myApartment.village = JSON.parse(localStorage.getItem('village'));
      myApartment.init();
    }, function(error) {
      alert(error);
    });
});

var myData = {
  startDate: new Date(),
  endDate: new Date(),

  isSupport: function() {
    var testKey = 'test',
      storage = window.localStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true
    } catch (error) {
      return false
    }
  },

  getCarouselAjax: function() {
    var resortId = localStorage.getItem('resortId');

    
    return new Promise(function (resolve, reject) {
      if (resortId === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      $.ajax({
        type: "GET",
        url: URLbase + '/Dvt-reserve/product/relResortGallery/' + resortId + '/findByResortId.do',
        contentType: "application/json; charset=utf-8",
        success: function(value) {
          if (value.result === '0') {
            resolve(value.data);
          } else {
            reject('轮播图接收数据发生错误, 原因: ' + value.message);
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          reject('轮播图接收数据发生错误, 原因: ' + errorThrown);
        }
      });
    });
  },

  searchApartmentAjax: function() {
    var resortCode = localStorage.getItem('resortCode');
      startDate = utilities.dateToYYYYMMDDString(this.startDate),
      endDate = utilities.dateToYYYYMMDDString(this.endDate);

    return new Promise(function (resolve, reject) {
      if (resortCode === null) {
        location = "./../index.html";
        reject('非常抱歉，请先选择你的产品。');
      }
      if (startDate && endDate) {
        $.ajax({
          type: "GET",
          url: URLbase + '/Dvt-reserve/product/apartment/1/0/searchSource.do?startDate=' + startDate + '&endDate=' + endDate + '&resortCode=' + resortCode,
          contentType: "application/json; charset=utf-8",
          success: function(value) {
            if (value.result === '0') {
              resolve(value.data);
            } else {
              reject('查询的房型发生错误, 原因: ' + value.message);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            reject('查询的房型发生错误, 原因: ' + errorThrown);
          }
        });
      }else {
        reject('非常抱歉，你查询的房型未传入具体时间。');
      }
    });
  },

  checkLogin: function() {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "GET", 
        url: appConfig.getUserInfo, 
        contentType: "application/json; charset=utf-8", 
        headers: {
          'token':$.cookie('token'),
          'digest':$.cookie('digest')
        },
        success: function (value) {
          if (value.result == "0" ) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          reject('查询登录发生错误, 原因: ' + errorThrown);
        }
      });
    });
  }
}

var myCarousel = {
  'data': [
    // {
    //   'gallery': {
    //     'createBy': 33,
    //     'createTime': 1503252103000,
    //     'group': null,
    //     'imgDesc': null,
    //     'imgId': 153,
    //     'imgTitle': "MA1.JPG",
    //     'imgUrl': "/source/image/product/8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    //     'isDelete': "N",
    //     'thumbUrl': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    //     'updateBy': null,
    //     'updateTime': null
    //   },
    //   'imgId': 153,
    //   'isDelete': "N",
    //   'isFirst': "Y",
    //   'relId': 1,
    //   'resortId': 1,
    //   'sortOrder': 0,
    //   'updateBy': null,
    //   'updateTime': null,
    //   'createBy': 33,
    //   'createTime': 1503252103000
    // }
  ],
  init: function() {
    var data = this.data,
      imgNum = this.data.length,
      indicators = '',
      wrappers = '';

    if (imgNum === 0) {
      indicators = '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
      wrappers = [
        '<div class="item active">',
          '<img src="./../../dist/img/404.jpg">',
          '<div class="carousel-caption">',
          '</div>',
        '</div>'
      ].join('');
    } else {
      for (var i = 0; i < imgNum; i++) {
        var imgUrl = data[i].gallery.imgUrl;
        var indicator = '<li data-target="#carousel-example-generic" data-slide-to="' + i + '" ' + (i === 0 ? ' class="active"' : '') + '></li>';
        var wrapper = [
          '<div class="item ' + (i === 0 ? 'active' : '') + '">',
            '<img src="' + URLbase + imgUrl + '">',
            '<div class="carousel-caption">',
            '</div>',
          '</div>'
        ].join('');

        indicators += indicator;
        wrappers += wrapper;
      }
    }

    $('#carouselIndicators').html(indicators);
    $('#carouselInner').html(wrappers);
  }
}

var myApartment = {
  'data': {
    'list': [
      // {
      //   'selectNum': 0, // 已选房间数 (自己加进去的  
      //   'adultMax': 2,
      //   'adultMin': 1,
      //   'adultPrices': '3000.00',
      //   'adultUnitPrice': 3000,
      //   'apartmentCode': 'KPLyjf',
      //   'apartmentDesc': '房间描述信息↵房间描述信息↵房间描述信息↵房间描述信息↵房间描述信息↵房间描述信息',
      //   'apartmentId': 1,
      //   'apartmentImg': '/source/image/product/thum/thum_17f9b08b-b21e-4638-aaec-67bd2ce913f7.jpg',
      //   'apartmentName': '园景房',
      //   'apartmentThumb': '/source/image/product/thum/thum_17f9b08b-b21e-4638-aaec-67bd2ce913f7.jpg',
      //   'bedType': '大床,双人床,单床,蜜月大床',
      //   'calMethod': null,
      //   'childPrices': '1500.00',
      //   'childUnitPrice': 1500,
      //   'childrenMax': 2,
      //   'childrenMin': 0,
      //   'codes': 'KPLyjf20170918',
      //   'createBy': 1,
      //   'createTime': 1505328965000,
      //   'facilities': '',
      //   'haveDays': 1,
      //   'ids': '5',
      //   'initiatePrice': 6000,
      //   'isAvePrice': 'N',
      //   'isDelete': 'N',
      //   'isSaleOut': 'N',
      //   'notice': '入住须知↵入住须知↵入住须知↵入住须知↵入住须知',
      //   'peopleMax': 4,
      //   'peopleMin': 0,
      //   'policy': '',
      //   'resortCode': 'KPL',
      //   'resortId': 1,
      //   'resortName': '卡帕莱',
      //   'skuNum': 2,
      //   'suggestedNum': 2,
      //   'updateBy': null,
      //   'updateTime': null
      // }
    ],
    'pageNum': 0,
    'pageSize': 0,
    'pages': 0,
    'size': 0,
    'totalCount': 0
  },
  'village': {
    // 'brandId': 25,
    // 'brandName': "潜游沙巴·仙本那",
    // 'createBy': 33,
    // 'createTime': 1503252103000,
    // 'earnest': 500,
    // 'initiatePrice': 1000,
    // 'isDelete': "N",
    // 'label': "热卖",
    // 'recommendation': "<p>2222222222222</p>",
    // 'refundRuleId': 29,
    // 'resortCode': "KPL",
    // 'resortDesc': "<p>111111111111111111</p>",
    // 'resortId': 1,
    // 'resortImg': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    // 'resortName': "卡帕莱",
    // 'resortThumb': "/source/image/product/thum/thum_8f217c44-f783-408a-9cc1-9c230c680769.JPG",
    // 'updateBy': null,
    // 'updateTime': null
  },

  init: function() {
    var data = this.data,
      myVillage = this.village;

    $('#brandName').html(myVillage.brandName + '<span>' + myVillage.label + '</span>');
    $('#villageDesc').html(myVillage.resortDesc + myVillage.recommendation);

    $('#apartmentTotalPrice').html('预定价格<span>' + myVillage.earnest + ' RMB 起</span>');
    $('#apartmentTitle').html(myVillage.brandName);

    this.initTimePicker();
    this.renderApartmentList();
    this.renderApartmentDetail();
    this.initScroll();
  },

  initTimePicker: function() {
    var _this = this,
      startDate = myData.startDate,
      endDate = myData.endDate,

      apartmentList = $('#apartmentList'),

      startDateDOM = $('#startDate'),
      starDatePicker = $('#starDatePicker'),
      starDateInput = $('#starDatePicker input'),

      endDateDOM = $('#endDate'),
      endDatePicker = $('#endDatePicker'),
      endDateInput = $('#endDatePicker input');

    starDatePicker.hide();
    endDatePicker.hide();
    
    this.renderTimePicker();

    startDateDOM.click(function() {
      $(this).addClass('select');
      endDateDOM.removeClass('select');

      starDatePicker.show();
      endDatePicker.hide();

      apartmentList.hide();
    });

    starDatePicker.datetimepicker({
      initialDate: utilities.dateToYYYYMMDDFormat(startDate),
      startDate: utilities.dateToYYYYMMDDFormat(startDate),
      format: "yyyy MM dd", //格式
      autoclose: true, //自动关闭
      todayBtn: true, //今天
      minuteStep: 10, //用于选择分钟
      language: 'zh-CN',
      weekStart: 1, //周一从那天开始
      todayHighlight: false, //高亮今天
      startView: 2, //日期时间选择器打开之后首先显示的视图
      minView: 2, //日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev) {
      var selectDate = new Date(ev.date),
        selectTimeStamp = Date.parse(new Date(ev.date)),
        endDateTimeStamp = Date.parse(myData.endDate);

      if (selectTimeStamp >= endDateTimeStamp) {
        myData.startDate = selectDate;
        myData.endDate = new Date(Date.parse(new Date(selectDate)) + 86400000);
      } else {
        myData.startDate = selectDate;
      }
      _this.renderTimePicker();

      endDatePicker.datetimepicker('update');

      startDateDOM.removeClass('select');
      endDateDOM.addClass('select');

      starDatePicker.hide();
      endDatePicker.show();
    });

    endDateDOM.click(function() {
      startDateDOM.removeClass('select');
      $(this).addClass('select');

      starDatePicker.hide();
      endDatePicker.show();

      apartmentList.hide();
    });

    endDatePicker.datetimepicker({
      initialDate: utilities.dateToYYYYMMDDFormat(endDate),
      startDate: utilities.dateToYYYYMMDDFormat(endDate),
      format: "yyyy MM dd", //格式
      autoclose: true, //自动关闭
      todayBtn: false, //今天
      minuteStep: 10, //用于选择分钟
      language: 'zh-CN',
      weekStart: 1, //周一从那天开始
      todayHighlight: false, //高亮今天
      startView: 2, //日期时间选择器打开之后首先显示的视图
      minView: 2, //日期时间选择器打开之后最小的视图
    }).on('changeDate', function(ev) {
      var starDateTimeStamp = Date.parse(myData.startDate),
        selectDate = new Date(ev.date),
        selectTimeStamp = Date.parse(new Date(ev.date));

      if (selectTimeStamp <= starDateTimeStamp) {
        myData.startDate = new Date(Date.parse(new Date(selectDate)) - 86400000);
        myData.endDate = selectDate;
      } else {
        myData.endDate = selectDate;
      }
      _this.renderTimePicker();

      starDatePicker.datetimepicker('update');

      startDateDOM.removeClass('select');
      endDateDOM.removeClass('select');

      starDatePicker.hide();
      endDatePicker.hide();

      apartmentList.show();
      apartmentList.html('<div class="loader--audioWave"></div>');

      myData.searchApartmentAjax()
        .then(function(val) {
          _this.data = utilities.addSelectNum(val);
          _this.renderApartmentList();
          _this.renderApartmentDetail();
        }, function(error) {
          alert(error);
        });
    });
  },

  renderTimePicker: function() {
    var startDate = myData.startDate,
      endDate = myData.endDate;

    $('#startDate').html(utilities.dateToYYYYMMDDFormat(startDate));
    $('#endDate').html(utilities.dateToYYYYMMDDFormat(endDate));

    $('#starDatePicker input').val(utilities.dateToYYYYMMDDFormat(startDate));
    $('#endDatePicker input').val(utilities.dateToYYYYMMDDFormat(endDate));
  },

  renderApartmentList: function() {
    var _this = this,
      dataList = this.data.list,
      apartmentList = $('#apartmentList');

    if (dataList.length === 0) {
      apartmentList.html([
        '<div class="apartmentList-infor">',
          '当前时间暂无可选房型<br/>可拨打 400-9688-768 咨询',
        '</div>',
        '<div class="apartmentList-submit failure">预定度假村</div>'
      ].join(''));
    } else {
      var myDomString = ''
          myCount = 0;

      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];

        if (data.selectNum > 0) {
          myCount += data.selectNum;
          myDomString += [
            '<div class="apartment">',
              '<span class="cut">-</span>',
              '<div>' + data.apartmentName + ' <span class="apartmentNum">' + data.selectNum + '</span> 间</div>',
              '<span class="add">+</span>',
            '</div>'
          ].join('');
        } else {
          myDomString += [
            '<div class="apartment" style="display: none;">',
              '<span class="cut">-</span>',
              '<div>' + data.apartmentName + ' <span class="apartmentNum">' + data.selectNum + '</span> 间</div>',
              '<span class="add">+</span>',
            '</div>'
          ].join('');
        }
      }

      if (myCount === 0) {
        myDomString += [
          '<div class="apartmentList-infor">',
            '请在房型详情中选择你的房型',
          '</div>',
          '<div id="orderApartment" class="apartmentList-submit">预定度假村</div>'
        ].join('')
      } else {
        myDomString += '<div id="orderApartment" class="apartmentList-submit">预定度假村</div>';
      }

      apartmentList.html(myDomString);

      var apartmenNodeList = $('#apartmentList .apartment');
      for (var i = 0; i < dataList.length; i++) {(function(i) {
        var data = dataList[i],
          myNode = $(apartmenNodeList[i]);
        var selectDOM = myNode.find('.apartmentNum');

        myNode.find('div').click(function() {
          $.smoothScroll({
            offset: -125,
            direction: 'top',
            scrollTarget: $('#apartmentDetail .apartment-block')[i],
            afterScroll: function() {
              $($('#apartmentDetail .apartment-block')[i]).addClass('isHover');
              setTimeout(function() {
                $($('#apartmentDetail .apartment-block')[i]).removeClass('isHover');
              }, 3000);
            }
          });
        });
        myNode.find('.cut').click(function() {
          var mySelect = _this.data.list[i].selectNum;

          if (mySelect === 0) {
            return
          }

          _this.data.list[i].selectNum = mySelect - 1;
          selectDOM.html(mySelect - 1);
          _this.renderReferPrice();

          if ((mySelect - 1) === 0) {
            _this.renderApartmentList();
            _this.renderApartmentDetail();
          }
        });

        myNode.find('.add').click(function() {
          var mySelect = _this.data.list[i].selectNum,
            mySkuNum = data.skuNum || 0;
          
          if (data.isSaleOut === 'Y') {
            return
          } else if (mySelect >= mySkuNum) {
            alert('非常抱歉，已达到该房型的上限。');
            return
          }

          _this.data.list[i].selectNum = mySelect + 1;
          selectDOM.html(mySelect + 1);
          _this.renderReferPrice();
        });
      })(i)}

      $('#orderApartment').click(function() {
        var allApartmentNum = 0

        for (var i = 0; i < dataList.length; i++) {
          allApartmentNum += dataList[i].selectNum;
        }

        if (allApartmentNum === 0) {
          alert('请选择房型!');
          return
        }

        myData.checkLogin()
          .then(function (data) {
            if (data === true) {
              return true
            } else {
              $("#loginModal").modal('show');
              $(".input1 input").val("");
              $(".input1 span").text("");
              $(".input1 i").removeClass("mistakeicon");
              $(".input1 i").removeClass("correcticon");
              $(".input2 input").val("");
              $(".input2 span").text("");
              $(".input2 i").removeClass("mistakeicon");
              $(".input2 i").removeClass("correcticon");
              return false
            }
          }, function (error) {
            alert(error);
            return false
          })
          .then(function (next) {
            if (next) {
              var mydate = {
                startDate: myData.startDate,
                endDate: myData.endDate
              };

              localStorage.setItem('mydate',JSON.stringify(mydate));
              localStorage.setItem('apartmentList',JSON.stringify(myApartment.data.list));
              localStorage.setItem('village',JSON.stringify(myApartment.village));
              location = "./../submit/index.html";
            }
          })
      })
    }
  },

  renderReferPrice: function () {
    var _this = this,
      dataList = this.data.list,
      earnest = this.village.earnest,
      selectNum = 0,
      apartmentTotalPrice = $('#apartmentTotalPrice');

    for (var i = 0; i < dataList.length; i++) {
      var mySelectNum = dataList[0].selectNum || 0;

      if (mySelectNum !== 0) {
        selectNum += mySelectNum;
      }
    }

    apartmentTotalPrice.html('预定价格<span>' + (earnest * selectNum) + ' RMB');
  },

  renderApartmentDetail: function() {
    var _this = this,
      dataList = this.data.list,
      apartmentDetailDOM = $('#apartmentDetail');

    if (dataList.length === 0) {
      apartmentDetailDOM.html('<div class="message-infor">当前时间暂无可选房型<br/>可拨打 400-9688-768 咨询</div>');
    } else {
      var myDomString = '';
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];

        myDomString += [
        '<div class="apartment-block">',
          '<div class="apartment-content">',
            '<img src="' + URLbase + data.apartmentThumb + '" />',
            '<div class="apartment-depiction">',
              '<div class="apartment-title">' + data.apartmentName + '</div>',
              '<div class="apartment-introduction">' + data.apartmentDesc + '</div>',
              '<div class="apartment-price">预定价格: <span>' + (data.initiatePrice || '暂无' ) + '</span> &nbsp; 库存: <span>' + (data.skuNum || '0') + '</span></div>',
              '<div class="apartment-confirm">查看详情</div>',
              '<div class=' + ( dataList[i].selectNum > 0 ? "apartment-selected" : "apartment-select" ) + '>选择</div>',
            '</div>',
          '</div>',
          '<div class="apartment-line"></div>',
        '</div>',
        ].join('');
      }
      apartmentDetailDOM.html(myDomString);
    }

    var nodeListDetail = $('#apartmentDetail .apartment-confirm'),
        nodeListSelect = $('#apartmentDetail .apartment-select');

    for (var i = 0; i < dataList.length; i++) {(function(i) {
      var data = dataList[i],
        myDetail = $(nodeListDetail[i]),
        mySelect = $(nodeListSelect[i]);

        myDetail.click(function() {
          $('#myApartmentModal').modal('show');
          $('#myApartmentModalContent').html([
            '<div class="modal-header">',
              '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
              '<h4 class="modal-title">' + data.apartmentName + '</h4>',
            '</div>',
            '<img src="' + URLbase + data.apartmentImg + '" />',
            '<div class="modal-depiction">',
              '<h3>房型信息</h3>',
              '<p>' + data.apartmentDesc + '</p>',
              '<h3>费用说明</h3>',
              '<div class="row">',
                '<div class="col-xs-6">成人价格: ' + (data.adultUnitPrice || '暂无') + '</div>',
                '<div class="col-xs-6">儿童价格: ' + (data.childUnitPrice || '暂无') + '</div>',
              '</div>',
              '<h3>入住规格</h3>',
              '<div class="row">',
                '<div class="col-xs-12">床型: ' + data.bedType + '</div>',
              '</div>',
              '<div class="row">',
                '<div class="col-xs-6">入住成人数: ' + data.adultMin + '-' + data.adultMax + '人</div>',
                '<div class="col-xs-6">入住儿童人数: ' + data.childrenMin + '-' + data.childrenMax + '人</div>',
              '</div>',
              '<div class="row">',
                '<div class="col-xs-6">最大入住人数: ' + data.peopleMax + '人</div>',
                '<div class="col-xs-6">建议入住人数: ' + data.suggestedNum + '人</div>',
              '</div>',
              '<h3>入住须知</h3>',
              '<p>' + data.notice + '</p>',
            '</div>'
          ].join(''));
        });

        mySelect.click(function() {
          if (dataList[i].selectNum > 0) { return }
          $(this).addClass('apartment-selected');
          $(this).removeClass('apartment-select');
          $(this).html('已选');
          _this.data.list[i].selectNum = 1;
          _this.renderApartmentList();
        })
    })(i)}
  },

  initScroll: function() {
    var apartmentIsFlex = false,
      apartmentOffsetTop = $('#part1').offset().top - 50,
      apartmentDOM = $('#myApartment'),
      apartmentTitle = $('#apartmentTitle'),
      LoginDOM = $('#login'),
      tellHeader = $('.tell-header');

    $(window).scroll(function() {
      var distance = $(window).scrollTop()

      if (distance > apartmentOffsetTop) {
        if (apartmentIsFlex === false) {
          apartmentDOM.addClass('scrollFlex');
          apartmentTitle.show();
          LoginDOM.hide();
          tellHeader.hide();
          apartmentIsFlex = true;
        }
      } else {
        if (apartmentIsFlex) {
          apartmentDOM.removeClass('scrollFlex');
          apartmentTitle.hide();
          LoginDOM.show();
          tellHeader.show();
          apartmentIsFlex = false;
        }          
      }
    });
  }
}

// 工具类
var utilities = {
  dateToYYYYMMDDString: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + mm + dd;
  },

  dateToYYYYMMDDFormat: function(data) {
    var yyyy = data.getFullYear();

    var mm = data.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;

    var dd = data.getDate();
    dd = dd < 10 ? '0' + dd : dd;

    return '' + yyyy + '-' + mm + '-' + dd;
  },

  addSelectNum: function(data) {
    for (var i = 0; i < data.list.length; i++) {
      data.list[i].selectNum = 0;
    }

    return data
  } 
}

