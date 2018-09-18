//app.js
var util = require('utils/util.js');
App({
  globalData: {
    act:"",
    uid:"",
  },
  onLaunch: function () {
    var that = this;

    //小程序初始化先判断用户是否登录 
    wx.checkSession({
      success: function (data) {
        console.log(data)
      },

      fail: function () {
        //登录态过期
        that.login() //重新登录
      }
    })
    that.login()
  },


  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        util.req('cus/login', {
          "code": res.code,
          "errMsg":res.errMsg
        }, function (data) {        //获取请求返回的内容
          that.setUid(data.data.uid);  //存储用户的openid
          that.accessToken(data.data.accessToken);
          console.log(data)
        })
   //判断cb是不是函数类型同时将一个参数传入名为cb的函数下
      },
      fail: function (res) {
        that.loginFail();
      }
    })
    // return typeof cb == "function" && cb()  
  },

  loginFail: function () {
    var that = this;
    wx.showModal({
      content: '登录失败，请允许获取用户信息,如不显示请删除小程序重新进入',
      showCancel: false
    });
    that.login();
  },
  setUid: function (data) {   //将用户信息缓存保存
    this.globalData.uid = data;
    wx.setStorage({
      key: "uid",
      data: data
    })
  },

  accessToken: function (data) {   //将用户信息缓存保存
    let that=this
    that.globalData.at=data
    console.log("设置token成功")
    wx.setStorage({
      key: "accessToken",
      data: data
    })
  },
  showLoad: function(e) {
    wx.showLoading({
        title: e.title,
        mask: e.mask
    });
},
  getUserInfo: function (cb) {
    var that = this
      return typeof cb == "function" && cb(that.globalData)
    },

    showToast: function(e) {
      e.icon && "fault" == e.icon ? wx.showToast({
          title: e.title,
          icon: e.icon,
          duration: e.duration || 2e3,
          image: "/images/base/fault.png",
          success: function(t) {
              "function" == typeof e.success && e.success(t);
          },
          fail: function(t) {
              "function" == typeof e.fail && e.fail(t);
          },
          complete: function(t) {
              "function" == typeof e.complete && e.complete(t);
          }
      }) : wx.showToast({
          title: e.title,
          icon: e.icon,
          duration: e.duration || 2e3,
          success: function(t) {
              "function" == typeof e.success && e.success(t);
          },
          fail: function(t) {
              "function" == typeof e.fail && e.fail(t);
          },
          complete: function(t) {
              "function" == typeof e.complete && e.complete(t);
          }
      });
  },
  hideLoad: function() {
    wx.hideLoading();
},

})