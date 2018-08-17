var t = getApp()
var util = require('../../../utils/util.js')

// user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      // {
      //   "swiper_pageid":3,
      //   "swiper_image":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      // },
      // {
      //   "swiper_pageid":3,
      //   "swiper_image":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      // },
      // {
      //   "swiper_pageid":3,
      //   "swiper_image":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      // }
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
        "tel":"13719811949",
        "intro":"971年10月29日生于广东省汕头市潮南区。腾讯公司主要创办人之一。现任腾讯公司控股董事会主席兼首席执行官；全国青联副主席。"
      },
      productList:[
        {
          "id":"1",
          "pic":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
          "title":"超级优惠学车服务不来白不来",
          "intro":"超级无敌可爱裂心无所谓之所谓值得很搞笑的超级无敌宇宙银河系优惠学车服务不来白不来"
        },
        {
          "id":"1",
          "pic":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
          "title":"超级优惠学车服务不来白不来",
          "intro":"超级无敌可爱裂心无所谓之所谓值得很搞笑的超级无敌宇宙银河系优惠学车服务不来白不来"
        },
      ],
      info:{
        "title":"最近有一个很好的机会哦",
        "intro":"我是隔壁的泰山，穿着爱情的土样，听我说！",
        "pic":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
      },
      rootUrl:util.rootUrl,
      accessToken:"",
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let e = this
    // t.getUserInfo(function(globalData){
    //   e.setData({
    //     accessToken:globalData.at
    //   })
    // })
    util.checkAt(function(code){
      if(code!=1000){
        wx.showModal({
          title: '提示',
          content: '您的登陆已经过期,请按确定重新登陆',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
              e.getMainInfo();
              e.getSalerInfo();
            } else if (res.cancel) {
              console.log('取消')
            }
          }
    })

}
else{
  e.getMainInfo();
  e.getSalerInfo();
}

 
    })


  },

  onShow:function(){

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

  copyTBL:function(e){
    var self=this;
    wx.setClipboardData({
    data: this.data.salerInfo.tel,
    success: function(res) {
      // self.setData({copyTip:true}),
      wx.showModal({
      title: '提示',
      content: '已复制到您的粘贴板',
      success: function(res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
})
    }
  });
  },

  CallBusiness: function() {
    var t = this;
    wx.makePhoneCall({
        phoneNumber: t.data.salerInfo.tel
    });
},

getMainInfo:function(){
  var e = this
     util.req('pub/getMainInfo', {"token":e.data.accessToken}, function (data) {  //获取对应用户参与活动的信息
       e.setData({
        swiperList:data.data.banners,
        noticeList:data.data.notifys
       })
       console.log(data)
     })
},

getSalerInfo:function(){
  var e = this
  wx.getStorage({
    key: 'accessToken',
    success: function(res){
      // success
      let accessToken=res.data
      util.req('cus/showMySeller', { "token":accessToken}, function (data) {  //获取对应用户参与活动的信息
        e.setData({
           salerInfo:data.data,
        })
        console.log(data)
      })
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })


}


})