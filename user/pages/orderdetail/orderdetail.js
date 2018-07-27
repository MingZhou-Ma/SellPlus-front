
var t = getApp()
var util = require('../../../utils/util.js');


Page({
    data: {
        userId: "",
        act_id:"",
        orderNo: "",
        orderInfo: {
          "order_no": "180032447893",
          "uname": "马云",
          "tel": "13738888888",
          "status": 5,
          "qr": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
          "activity": {
            "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
            "stock": 66,
            "img":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
            "validity": "2016/03/04 02:01:00",
            "oldprice": 129,
            "nowprice": 99,
            "status": 1 ,
          }
        },
        activityType:0,
    },
    onLoad: function(a) {
/*      var e = this
        e.setData({
        activityType: a.activityType,
        act_id:a.act_id
        }), e.GetOrderInfo(), wx.hideShareMenu();

        */ 
      },
    GetOrderInfo: function() {
        var e = this;
        a.util.request({
            url: "user/GetOrderDetail",
            data: {
                "userid": e.data.userId,
                "activityType":e.data.activityType,
                "act_id":e.data.act_id
            },
            cachetime: "0",
            success: function(a) {
                e.setData({
                    orderInfo: a.data
                });
            }
        });
    },

    pay: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/pay",
            data: {
                orderno: e.data.orderNo,
                uid: e.data.userId,
                mod: "kanjia"
            },
            cachetime: "0",
            success: function(a) {
                a.data && a.data.data && wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        wx.showToast({
                            title: "支付成功"
                        }), e.GetOrderInfo();
                    },
                    fail: function(a) {}
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    }
});