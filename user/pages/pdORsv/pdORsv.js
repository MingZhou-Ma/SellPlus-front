var t = getApp()
var util = require('../../../utils/util.js')

// user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[
      {
        "id":"1",
        "pic":"http://img.my.csdn.net/uploads/201407/26/1406382861_8606.jpg",
        "title":"ARMANI 休闲牛仔裤",
        "intro":"版型修身，剪裁流畅简洁。优质棉面料，穿着柔软舒适。选用精湛的工艺制成，凸显品牌质量。"
      },
      {
        "id":"1",
        "pic":"http://img.my.csdn.net/uploads/201407/26/1406382839_5779.jpg",
        "title":"Gucci logo条纹短裤",
        "intro":"宽松直筒的版式，修饰臀腿，遮掩赘肉。"
      },
    ],
      helpList:[
        {
          "id":1,
          "headline":"朗格双面沙发垫四季通用防滑布艺沙发套全包万能套罩巾坐垫子",
          "groupPrice":99,
          "helpNum":6,
          "endDate":"2018/12/06/12:00",
          "product":{
            "pic":"http://img.my.csdn.net/uploads/201407/26/1406382765_7341.jpg",
            "price":128,
          }
        }
      ],
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