// user/pages/mygroup/mygroup.js
var t = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpList: [
      {
        "helpnum": 3,
        "status": 0 / 1 / 2 / 3 / 4 / 5 / 6,
        "activity": {
          "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
          "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
          "oldprice": 199,
          "helpprice": 99,
          "helpnum": 6,
        }
      },
      {
        "helpnum": 3,
        "status": 0 / 1 / 2 / 3 / 4 / 5 / 6,
        "activity": {
          "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
          "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
          "oldprice": 199,
          "helpprice": 99,
          "helpnum": 6,
        }
      },
    ],

    groupList: [{
  //     "id": 2,
  //     "status": 1,
  //     "groupnum": 3,
	// "activity":
  //     {
  //       "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
  //       "img": "../../../text_img/Fruit.jpg",
  //       "groupnum": 5,
  //       "oldprice": "114",
  //       "groupprice": "99",
  //     }
  //   },
  //   {
  //     "id": 3,
  //     "status": 0,
  //     "groupnum": 3,
	// "activity":
  //     {
  //       "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
  //       "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
  //       "groupnum": 5,
  //       "oldprice": "114",
  //       "groupprice": "99",
  //     }
    }],
    activityList:[],
    typeList: [{
      id: "0",
      name: "待完成的活动"
    }, {
      id: "1",
      name: "已完成的活动"
    }, {
      id: "2",
      name: "已失败的活动"
    }],
    actid:0,
    typeIndex: 0,
    noMoreHidden: !0,
    page: 1,
    rootUrl:util.rootUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

 
    // e.GetHelpList(1)

  
  },


  bindTypeChange: function (t) {
    var e = this;
    e.setData({
      typeIndex: t.detail.value,   //对应的值为0，1，2
      activityList: []              //清空活动列表
    })

      e.GetHelpList(t.detail.value)
      console.log(t.detail.value)
  },

  // GetGroupList: function (s) {
  //   var a = this;
  //   wx.getStorage({     //检查session_key
  //     key: 'userId',
  //     success: function (res) {
  //       var userid = res.data;
  //       util.req('cus/GetGroupList', { "userid": userid, "group_status":s }, function (data) {  //获取对应用户参与活动的信息
  //         a.setData({
  //           groupList: data.groupList,
  //           noMoreHidden: !1,
  //         })
  //       })

  //     },
  //   })
  // },

  GetHelpList:function(s){
    var e = this
     wx.getStorage({     //检查session_key
      key: 'accessToken',
      success: function (res) {
        var accessToken = res.data;
        util.req('cus/getHelpList', { "token":accessToken, "status":s }, function (data) {  //获取对应用户参与活动的信息
          e.setData({
            helpList: data.data,
            noMoreHidden: !1,
          })
          console.log(data)
          console.log(data.data);
        })
      },
    })
  }

})