var t = getApp()
var util = require('../../../utils/util.js')
Page({

data:{

  xiangqing: [{
    id: "x0",
    open: !0,
    text: "已使用"
  }, {
    id: "x1",
    open: !1,
    text: "未使用"
  }],
list:[
  {
    "status":0,
    "sub_price":"99.00",
    "min_price_desc":"100",
    "event_desc":"全场通用现金券",
    "code":"1107677435628007999",
  },
  {
    "status":0,
    "sub_price":"5.00",
    "min_price_desc":"100",
    "event_desc":"优惠券",
    "code":"1107677435628007903",

  },
  {
    "status":0,
    "sub_price":"30.00",
    "min_price_desc":"100",
    "event_desc":"邀请券",
    "code":"1107677435628007958",

  },
  {
    "status":1,
    "sub_price":"30.00",
    "min_price_desc":"100",
    "event_desc":"邀请券",
    "code":"1107677435628007933",
  }
],
hide_code:1,
mainColor: "#f94e5a",
currentTab:0,
},

widgetsToggle1: function(t) {
  for (var a = t.currentTarget.id, e = this.data.xiangqing, o = 0, n = e.length; o < n; ++o) e[o].id == a ? (e[o].open = !0, 
  this.setData({
      currentTab: o
  })) : e[o].open = !1;
  this.setData({
      xiangqing: e
  });
},


Voucher:function(){
  let e =this
  e.setData({
    hide_code:0
  })
}
})

