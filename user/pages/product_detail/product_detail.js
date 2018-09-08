var t = getApp()
var util = require('../../../utils/util.js')
Page({
data: {
  productList:[
    {
      "id":"1",
      "pic":"http://img.my.csdn.net/uploads/201407/26/1406382861_8606.jpg",
      "title":"ARMANI 休闲牛仔裤",
      "intro":"版型修身，剪裁流畅简洁。优质棉面料，穿着柔软舒适。选用精湛的工艺制成，凸显品牌质量。"
    },
  ],

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
    // e.GetMerInfo()
    // e.GetProductDetail(a.productid)  
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