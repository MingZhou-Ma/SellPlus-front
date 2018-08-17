var t = getApp()
var util = require('../../../utils/util.js')
Page({
data: {
productInfo:
{
  "pic":"static/upload/237d1f33be615ab567cee937241bd35.jpg",
  // "title": "这是一个非常有趣的商品",
  //   "img": [
  //     "http://img1.3lian.com/2015/w7/85/d/101.jpg",
  //     "http://img1.3lian.com/2015/w7/85/d/101.jpg",
  //   ],
  // "helpprice": 99,
  // "oldprice": 114,
  // "format_starttime": "2017/03/03 03:03:03",
  // "format_endtime": "2017/06/03 03:03:03",
  // "stock": 65,
  // "validity": "2017/07/03 03:03:03",
  // "helpnum": 4,
  // "status": 0,
  // "business":
  //   {
  //     "name": "万达连锁超市",
  //     "address": "广东省广州市番禺区科韵路塘下20号",
  //     "tel": "13124253333",
  //   }
},
  recommendList: [
    {
      "id": 3,
      "stock": 104,
      "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
      "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
      "lowprice": 99,
      "oldprice": 199,
      "status": 0 / 1 / 2,
    },
    {
      "id": 3,
      "stock": 104,
      "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
      "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
      "lowprice": 99,
      "oldprice": 199,
      "status": 0 / 1 / 2,
    }
  ],
MerInfo:{},
productId: "",
currentTab: 0,
mainColor: "#f94e5a",
xiangqing: [{
  id: "x0",
  open: !0,
  text: "商品详情"
}, {
  id: "x1",
  open: !1,
  text: "评论"
}],
commentInfoList:[],
rootUrl:util.rootUrl,

},



onLoad: function(a) {
    var e = this
    e.setData({
      productId:a.productid
    })
    e.GetMerInfo()
    e.GetProductDetail(a.productid)  
  },

toHome: function() {
    wx.switchTab({
        url: "../main/index"
    });
},
onShareAppMessage: function() {
    var t = this, a = "原价" + t.data.activityInfo.oldprice + "元的：" + t.data.activityInfo.title + " 好友助力后只需" + t.data.activityInfo.helpprice + "元，快来看看吧", e = t.data.activityInfo.img[0];
    return {
        title: a,
        imageUrl: e,
        path: "user/pages/help_detail/help_detail?activityid=" + t.data.activityId,
        success: function(t) {
            wx.showToast({
                title: "转发成功",
                icon: "success",
                duration: 1e3,
                mask: !0
            });
        }
    };
},


CallBusiness: function() {
    var t = this;
    wx.makePhoneCall({
        phoneNumber: t.data.MerInfo.phone
    });
},


GetProductDetail: function (s) {    //获取活动信息
  var e = this;
  wx.getStorage({     
    key: 'accessToken',
    success: function (res) {
      let accessToken = res.data;
      util.req('pub/productInfo', { "token":accessToken,"productid": s, }, function (data) { 
        e.setData({
          productInfo: data.data
        })
        console.log(data)
      })
    },
  })
},

GetMerInfo:function(){
  var e = this;
  wx.getStorage({     
    key: 'accessToken',
    success: function (res) {
      let accessToken =res.data
      util.req('pub/getMerInfo', { "token": accessToken}, function (data) { 
        e.setData({
          MerInfo: data.data
        })
        console.log(data)
      })
    },
  })
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


});