var app = getApp()
var util = require('../../../utils/util.js')
Page({
    data: {
      helpInfo: {
        // "id":1,
        // "initiator": "",
        // "helpnum": 4,
        // "lacknum": 1,
        // "activity": {
        //   "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
        //   "img": [
        //     "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        //     "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        //   ],
        //   "stock": 10,
        //   "starttime": "2017/07/03 03:03:03",
        //   "endtime": "2017/08/03 03:03:03",
        //   "status": 1,
        //   "helpnum": 5,
        //   "oldprice": 99,
        //   "helpprice": 28,
        //   "validity": "2017/08/03 12:03:03"
        // }
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
        uid:"",
        progressWidth: 1,
        BargainModelHidden: !0,
        progressEndicoColor: "#bbb",
        progressNowpriceLeft: 7,
        shareMenuHidden: !0,
        posterImg:"",
        posterType:"help",
        rootUrl:util.rootUrl,
        lacknum:"",

    },
    onLoad: function(t) {
      var e=this
      console.log(t.helpid)
      console.log("Uid="+app.globalData.uid)
      console.log("t.uid="+t.uid)
      util.bindSeller(t.uid)

      util.checkAt(function(code){
        if(code!=1000){
          app.login()
          wx.showModal({
            title: '提示',
            content: '您的登陆已经过期,请按确定重新登陆',
            success: function(res) {
              if (res.confirm) {
                console.log('确定')
                e.GetMyHelpDetail(t.helpid)
              } else if (res.cancel) {
                console.log('取消')
              }
            }
      })
  
  }
  else{
    e.GetMyHelpDetail(t.helpid)
  }
  
   
      })
     
      e.setData({
        // progressWidth:(e.data.helpInfo.helpCount/e.data.helpInfo.activity.helpNum)*100,
        // progressNowpriceLeft: (e.data.helpInfo.helpCount / e.data.helpInfo.activity.helpNum) * 100,    
        // helpId: t.scene ? decodeURIComponent(t.scene) : t.helpid,//判断是二维码进入还是页面路由进入
        // uid:t.uid
        helpId:t.helpid
      })
      // if(e.data.uid!=""){
      //   e.bindSeller(e.data.uid)
      // }
    },

    onShareAppMessage: function() {
      
      var t = this, a = "我正在参加：" + t.data.helpInfo.activity.headline + " 快来帮我助力", e = t.data.helpInfo.activity.product.picList[0];
        return  {
            title: a,
            imageUrl: e,
            path: "user/pages/my_help/my_help?helpid=" + t.data.helpId+"&uid="+app.globalData.uid,
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
      util.req('cus/GetPoster', { "title": e.data.helpInfo.title, "type": e.data.posterType, "scene": e.data.helpId,"url":url }, function (t) {  
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
      console.log("/////")
      var e = this;
      wx.getStorage({
        key: 'accessToken',
        success: function (res) {
          var accessToken = res.data;
          util.req('cus/helpOne', { "token": accessToken, "helpid": e.data.helpId, }, function (data) {  //获取对应用户参与活动的信息
            console.log(data)
            if (data.code == 1000) {
              wx.showModal({
                title: "提示",
                content: "恭喜您，成功帮助好友助力",
                success: function (a) {

                }
              })
            }
            if(data.code=1100){
              e.onLoad();
            }
            else {
              wx.showModal({
                title: "提示",
                content: "抱歉，您已助力过",
                success: function (a) {
                  // a.confirm && wx.navigateTo({
                  //   url: "../my_help/my_help?helpid=" + e.data.helpId
                  // });
                }
              })
            }
          })
        },
      })

    },




    GetMyHelpDetail: function (s) {    //获取我的好友助力活动详情
      var e = this;
      console.log("dd"+s)
      // wx.getStorage({
      //   key: 'uid',
      //   success: function(res){
      //     // success
      //     e.setData({
      //       uid:res.data
      //     })
      //   },
      //   fail: function() {
      //     // fail
      //   },
      //   complete: function() {
      //     // complete
      //   }
      // })
      wx.getStorage({     
        key: 'accessToken',
        success: function (res) {
          let accessToken =res.data
          util.req('cus/getHelpDetail', { "token": accessToken,"helpid": s, }, function (data) {
            e.setData({
              helpInfo: data.data //活动赋值
              // lacknum:helpInfo.activity.helpNum-helpInfo.helpCount         
            })
            console.log(data)
          })
        },
      })//定义助力进度条
      // e.setData({
      //   progressWidth:(e.data.helpInfo.helpCount/e.data.helpInfo.activity.helpNum)*100,
      //   progressNowpriceLeft: (e.data.helpInfo.helpCount / e.data.helpInfo.activity.helpNum) * 100,    
      // })
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

});