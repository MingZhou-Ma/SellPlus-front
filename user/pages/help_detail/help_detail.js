var t = getApp()
var util = require('../../../utils/util.js')
Page({
data: {
activityInfo:
{
  "id":1,
  "headline":"朗格双面沙发垫四季通用防滑布艺沙发套全包万能套罩巾坐垫子",
  "groupPrice":99,
  "helpNum":6,
  "endDate":"2018/12/06/12:00",
  "startDate":"2018/10/12/12:00",
  "status":1,
  "product":{
    "picList":
    [
      "http://img.my.csdn.net/uploads/201407/26/1406382765_7341.jpg",
      "http://img.my.csdn.net/uploads/201407/26/1406382790_8326.jpg",  
      "http://img.my.csdn.net/uploads/201407/26/1406382789_7174.jpg",  
      "http://img.my.csdn.net/uploads/201407/26/1406382789_5170.jpg",  
      "http://img.my.csdn.net/uploads/201407/26/1406382789_4118.jpg",  

    ],
    "price":128,
  }
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
activityId: "",
MerInfo:
{
"shopName":"银泰百货精品旗舰店",
"location":"广东省广州市番禺区广州大学城信息枢纽楼318"
},
rootUrl:util.rootUrl,
helpid:"",
mainColor: "#f94e5a",
xiangqing: [ {
  id: "x0",
  open: !0,
  text: "商品详情"
}, {
  id: "x1",
  open: !1,
  text: "评论"
} ],
commentInfoList:[],
MerInfo:{}
},



onLoad: function(a) {
    // var e = this
    // e.setData({
    //   activityId:a.activityid
    // })
    // e.GetHelpActivityDetail(a.activityid)
    // e.GetMerInfo()
},

toHome: function() {
    wx.switchTab({
        url: "../main/index"
    });
},
onShareAppMessage: function() {
    var t = this, a = "原价" + t.data.activityInfo.oldprice + "元的：" + t.data.activityInfo.title + " 好友助力后只需" + t.data.activityInfo.helpprice + "元，快来看看吧", e = t.data.activityInfo.img[0];
    wx.getStorage({
      key: 'uid',
      success: function(res){
        // success
        uid=res.data
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    return {
        title: a,
        imageUrl: e,
        path: "user/pages/help_detail/help_detail?activityid=" + t.data.activityId+"&uid="+uid,
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
        phoneNumber: t.data.activityInfo.business.tel
    });
},


GetHelpActivityDetail: function (s) {    //获取活动信息
  var e = this;
  wx.getStorage({     
    key: 'accessToken',
    success: function (res) {
      let accessToken = res.data;
      util.req('pub/activityInfo', { "token": accessToken,"activityid": s, }, function (data) { 
        e.setData({
          activityInfo: data.data
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
      let accessToken=res.data
      util.req('pub/getMerInfo', { "token": accessToken}, function (data) { 
        e.setData({
          MerInfo: data.data
        })
        console.log(data)
      })
    },
  })
},

AddHelp: function() {
    var e = this;
    wx.getStorage({     //检查session_key
      key: 'accessToken',
      success: function (res) {
        let accessToken = res.data
        util.req('cus/addHelp', { "token":accessToken,"activityid": e.data.activityId, }, function (data) {
          e.setData({
          })
          console.log(data)
          if(data.code==1000){
            wx.showModal({
              title: "提示",
              content: "恭喜您已开启该商品的好友助力活动，是否跳转到详情页面",
              success: function (a) {
                a.confirm && wx.navigateTo({
                  url: "../my_help/my_help?helpid=" + data.data.id
                });
              }
            })
            // wx.navigateTo({
            //   url: "../help_detail/help_detail?activityid=" + e.data.activityId
            // });
          }
          else{
            wx.showModal({
              title: "提示",
              content: "当前活动您已经发起过好友助力，是否跳转到详情页面",
              success: function (a) {
                a.confirm && wx.navigateTo({
                  url: "../my_help/my_help?helpid=" + data.data.id
                });
              }
            })
          }
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