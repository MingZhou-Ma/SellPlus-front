//app.js
var util = require('utils/util.js');
App({

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
        console.log(res)
        util.req('user/login', {
          "code": res.code,
          "errMsg":res.errMsg
        }, function (data) {        //获取请求返回的内容
          that.setUserInfo(data.userid);  //存储用户的openid
          that.setSk(data.sk);
          console.log(data)
        })
      },
      fail: function (res) {
        that.loginFail();
      }
    })
  },

  loginFail: function () {
    var that = this;
    wx.showModal({
      content: '登录失败，请允许获取用户信息,如不显示请删除小程序重新进入',
      showCancel: false
    });
    that.login();
  },
  setUserInfo: function (data) {   //将用户信息缓存保存
    this.globalData.userInfo = data;
    wx.setStorage({
      key: "userId",
      data: data
    })
  },

  setSk: function (data) {   //将用户信息缓存保存
    this.globalData.sk = data;
    wx.setStorage({
      key: "sk",
      data: data
    })
  },

  globalData: {
    userId: null,
    sk:null
  }

})