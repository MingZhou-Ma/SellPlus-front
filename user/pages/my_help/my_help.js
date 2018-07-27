var t = getApp()
var util = require('../../../utils/util.js')
Page({
    data: {
      helpInfo: {
        "id":1,
        "initiator": "",
        "helpnum": 4,
        "lacknum": 1,
        "activity": {
          "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
          "img": [
            "http://img1.3lian.com/2015/w7/85/d/101.jpg",
            "http://img1.3lian.com/2015/w7/85/d/101.jpg",
          ],
          "stock": 10,
          "starttime": "2017/07/03 03:03:03",
          "endtime": "2017/08/03 03:03:03",
          "status": 1,
          "helpnum": 5,
          "oldprice": 99,
          "helpprice": 28,
          "validity": "2017/08/03 12:03:03"
        }
      },

        recommendList:[
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
        userId: "",
        helpId:"",
        help_status:0,  //用户是否曾助力过
        join_status:0,  //用户是否开启了同样的助力活动
        progressWidth: 1,
        BargainModelHidden: !0,
        progressEndicoColor: "#bbb",
        progressNowpriceLeft: 7,
        shareMenuHidden: !0,
        posterImg:"",
        posterType:"help",
    },
    onLoad: function(t) {
      var e=this
      e.setData({
        progressWidth:(e.data.helpInfo.helpnum/e.data.helpInfo.activity.helpnum)*100,
        progressNowpriceLeft: (e.data.helpInfo.helpnum / e.data.helpInfo.activity.helpnum) * 100,    
        helpId: t.scene ? decodeURIComponent(t.scene) : t.helpid,//判断是二维码进入页面路由进入
      })
      var self = this;
      var url = "user/pages/my_help/my_help";   //当前页面url
      console.log(url)
    },

    onShareAppMessage: function() {
      var t = this, a = "我正在参加：" + t.data.helpInfo.activity.title + " 快来帮我助力", e = t.data.helpInfo.activity.img[0];
        return  {
            title: a,
            imageUrl: e,
            path: "user/pages/my_help/my_help?helpid=" + t.data.helpId,
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
    shareMenu: function() {
        this.setData({
            shareMenuHidden: !1
        });
    },
    toHome: function() {
        wx.switchTab({
            url: "../main/index"
        });
    },
    CloseShareMenu: function() {
        this.setData({
            shareMenuHidden: !0
        });
    },
 /*   GetHelpPoster: function() {  //生成朋友圈海报
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "show", e = this, i = t.default.createurl({
            url: "entry/wxapp/getposter"
        }) + "&bargainid=" + e.data.bargainId + "&unixtimestamp=" + Math.round(new Date().getTime() / 1e3);
        console.log(i), "hide" == a ? e.setData({
            posterImg: i
        }) : wx.showModal({
            title: "提示",
            content: "因朋友圈海报需在线生成，所以生成时间较长，请您耐心等待",
            showCancel: !0,
            success: function(t) {
                t.confirm && wx.previewImage({
                    current: i,
                    urls: [ i ]
                });
            }
        });
    },
*/

    GetHelpPoster: function () {
      var e=this
      var url = "user/pages/my_help/my_help";   //当前页面url
      util.req('user/GetPoster', { "title": e.data.helpInfo.title, "type": e.data.posterType, "scene": e.data.helpId,"url":url }, function (t) {  
        e.setData({
          posterImg: t
        })
      })
      if(posterImg){
        wx.showModal({
          title: "提示",
          content: "因朋友圈海报需在线生成，所以生成时间较长，请您耐心等待",
          showCancel: !0,
          success: function (t) {
            t.confirm && wx.previewImage({
              current: e.data.posterImg,
              urls: [e.data.posterImg]
            })
        }
        });
      }
      else{
        wx.showModal({
          title: "提示",
          content: "生成朋友圈海报失败",
          showCancel: !0,
          success: function (t) {
            t.confirm && wx.showToast({
              title: "errMsg",
              icon: "none",
              duration: 1e3,
              mask: !0
            });
          }
        });
      }
  },


    Help: function() {  //好友帮助助力
      var e = this;
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          var userid = res.data;
          util.req('user/Friend_Help', { "userid": userId, "helpid": e.data.helpId, }, function (t) {  //获取对应用户参与活动的信息
              e.setData({
                help_status: t.help_status,
              })
          })
        },
      })
      if (e.data.help_status == 0) {
        wx.showModal({
          title: "提示",
          content: "恭喜您，成功帮助好友助力",
          success: function (a) {
            a.confirm && wx.navigateTo({
              url: "../my_help/my_help?my_helpid=" + e.data.my_helpid
            });
          }
        })
      }
      else {
        wx.showModal({
          title: "提示",
          content: "抱歉，您已助力过",
          success: function (a) {
            a.confirm && wx.navigateTo({
              url: "../my_help/my_help?my_helpid=" + e.data.my_helpid
            });
          }
        })
      }
    },


    GetMyHelpDetail: function (s) {    //获取我的好友助力活动详情
      var e = this;
      wx.getStorage({     
        key: 'userId',
        success: function (res) {
          e.data.userId = res.data;
          util.req('user/GetMyHelpDetail', { "userid": e.data.userId,"helpid": e.data.helpId, }, function (t) {
            e.setData({
              helpInfo: t.helpInfo //活动赋值
            })
          })
        },
      })
    },

    AddHelp: function () {  //用户也想参与好友助力活动活动，与help_detail页面有重用
      var e = this;
      wx.getStorage({     //检查session_key
        key: 'userId',
        success: function (res) {
          e.data.userId = res.data;
          util.req('user/AddHelp', { "userid": userid, "activityid": e.data.activityId, }, function (t) {
            e.setData({
              my_helpid:t.my_helpid,
              join_status: t.join_status,//活动赋值
            })
          })
        },
      })
      if (join_status == 0) {
        wx.navigateTo({
          url: "../my_help/my_help?my_helpid=" + e.data.my_helpid
        });
      }
      else {
        wx.showModal({
          title: "提示",
          content: "当前活动您已经发起过好友助力，是否跳转到详情页面",
          success: function (a) {
            a.confirm && wx.navigateTo({
              url: "../my_help/my_help?my_helpid=" + e.data.my_helpid
            });
          }
        })
      }
    },

});