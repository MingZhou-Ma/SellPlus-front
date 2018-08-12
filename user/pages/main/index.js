var t = getApp()
var util = require('../../../utils/util.js')

// user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      {
        "swiper_pageid":3,
        "swiper_image":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      },
      {
        "swiper_pageid":3,
        "swiper_image":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      },
      {
        "swiper_pageid":3,
        "swiper_image":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      }
    ],
    noticeList:[
      {
        "title":"这是一个很无聊的通知0"
      },
      {
        "title":"这是一个很无聊的通知1"
      }
    ],
    salerInfo:
      {
        "img":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
        "name":"马化腾",
        "wxNum":"173348857",
        "phoneNum":"13719811949",
        "intro":"971年10月29日生于广东省汕头市潮南区。腾讯公司主要创办人之一。现任腾讯公司控股董事会主席兼首席执行官；全国青联副主席。"
      }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: t.siteInfo.name,
      path: "user/pages/main/index",
      success: function (t) {
        wx.showToast({
          title: "转发成功",
          icon: "success",
          duration: 1e3,
          mask: !0
        });
      }
    };
  },
})