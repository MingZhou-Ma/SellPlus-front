var t = getApp()
var util = require('../../../utils/util.js')
Page({
data: {
activityInfo:
{
  "title": "这是一个非常有趣的拼团活动",
    "img": [
      "http://img1.3lian.com/2015/w7/85/d/101.jpg",
      "http://img1.3lian.com/2015/w7/85/d/101.jpg",
    ],
  "helpprice": 99,
  "oldprice": 114,
  "format_starttime": "2017/03/03 03:03:03",
  "format_endtime": "2017/06/03 03:03:03",
  "stock": 65,
  "validity": "2017/07/03 03:03:03",
  "helpnum": 4,
  "status": 0,
  "business":
    {
      "name": "万达连锁超市",
      "address": "广东省广州市番禺区科韵路塘下20号",
      "tel": "13124253333",
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
join_status:0,
userId:"",
helpid:""
},



    onLoad: function(a) {
        var e = this
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
 



    ToOpAddorder: function() {
        var t = this;
        wx.navigateTo({
          url: "../my_help/my_help?activityid=" + t.data.activityId
        });
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
        key: 'userId',
        success: function (res) {
          e.data.userId = res.data;
          util.req('user/GetHelpActivityDetail', { "userid": e.data.userId,"activityid": e.data.activityId, }, function (t) { 
            e.setData({
              activityInfo: t.activityInfo 
            })
          })
        },
      })
    },


    AddHelp: function() {
        var e = this;
        wx.getStorage({     //检查session_key
          key: 'userId',
          success: function (res) {
            e.data.userId = res.data;
            util.req('user/AddHelp', { "userid":userid,"activityid": e.data.activityId, }, function (t) {
              e.setData({
                join_status:t.join_status,//活动赋值
                helpid:t.helpid
              })
            })
          },
        })
        if(join_status==0){
          wx.navigateTo({
            url: "../help_detail/help_detail?activityid=" + e.data.activityId
          });
        }
        else{
          wx.showModal({
            title: "提示",
            content: "当前活动您已经发起过好友助力，是否跳转到详情页面",
            success: function (a) {
              a.confirm && wx.navigateTo({
                url: "../my_help/my_help?helpid=" + e.data.helpid
              });
            }
          })
        }
    },

});