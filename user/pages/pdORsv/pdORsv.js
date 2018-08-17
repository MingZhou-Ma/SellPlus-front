var t = getApp()
var util = require('../../../utils/util.js')

// user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      productList:[
        // {
        //   "id":"1",
        //   "pic":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
        //   "title":"超级优惠学车服务不来白不来",
        //   "intro":"超级无敌可爱裂心无所谓之所谓值得很搞笑的超级无敌宇宙银河系优惠学车服务不来白不来"
        // },
        // {
        //   "id":"1",
        //   "pic":"http://img1.3lian.com/2015/w7/85/d/101.jpg",
        //   "title":"超级优惠学车服务不来白不来",
        //   "intro":"超级无敌可爱裂心无所谓之所谓值得很搞笑的超级无敌宇宙银河系优惠学车服务不来白不来"
        // },
      ],
      helpList:[],
      currentTab: 0,
      rootUrl:util.rootUrl,
      xiangqing: [{
        id: "x0",
        open: !0,
        text: "商品列表"
      }, {
        id: "x1",
        open: !1,
        text: "活动列表"
      }],
      mainColor: "#f94e5a",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var e=this
    e.getProductList()
    e.GetHelpList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var e=this
    e.getProductList()
    e.GetHelpList();
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





getProductList:function(){
  var e = this
  wx.getStorage({     //检查session_key
   key: 'accessToken',
   success: function (res) {
     var accessToken = res.data;
     util.req('cus/listProduct', { "token":accessToken}, function (data) {  //获取对应用户参与活动的信息
       e.setData({
        productList: data.data.content,
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

GetHelpList:function(){
  var e = this
   wx.getStorage({     //检查session_key
    key: 'accessToken',
    success: function (res) {
      var accessToken = res.data;
      util.req('cus/listActivity', { "token":accessToken}, function (data) {  //获取对应用户参与活动的信息
        e.setData({
          helpList: data.data.content,
          noMoreHidden: !1,
        })
        console.log(data)
        console.log(data.data);
      })
    },
  })
}

})