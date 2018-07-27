// user/pages/mygroup/mygroup.js
var t = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "helpList": [
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
      "id": 2,
      "status": 1,
      "groupnum": 3,
	"activity":
      {
        "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
        "img": "../../../text_img/Fruit.jpg",
        "groupnum": 5,
        "oldprice": "114",
        "groupprice": "99",
      }
    },
    {
      "id": 3,
      "status": 0,
      "groupnum": 3,
	"activity":
      {
        "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
        "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        "groupnum": 5,
        "oldprice": "114",
        "groupprice": "99",
      }
    },],
    activityList:[],
    typeList: [{
      id: "wait",
      name: "待完成的活动"
    }, {
      id: "allready",
      name: "已完成的活动"
    }, {
      id: "fail",
      name: "已失败的活动"
    }],
    actid:1,
    typeIndex: 0,
    noMoreHidden: !0,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  var e =this
  console.log(options.actid),
    e.setData({
    actid:options.actid
  })
      /*
  if(e.data.actid){
    e.GetGroupList(0)
  }
  else{
    e.GetHelpList(0)
  }
  */
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var t = this;
    t.setData({
      bargainList: [],
      page: 1
    }), t.GetList(), setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1e3);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var t = this, e = t.data.page;
    t.setData({
      page: e + 1
    }), t.GetList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "抢购活动",
      path: "ypuk_kjb/pages/groupbuy_list/groupbuy_list",
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

  bindTypeChange: function (t) {
    var e = this;
    e.setData({
      typeIndex: t.detail.value,   //对应的值为0，1，2
      activityList: []              //清空活动列表
    })
    if(e.data.actid){
      e.GetGroupList(t.detail.value)
      console.log(t.detail.value)
    }
    else{
      e.GetHelpList(t.detail.value)
      console.log(t.detail.value)
    }
           // a.GetGroupList()，用于获取对应状态的拼团数据
  },

  GetGroupList: function (s) {
    var a = this;
    wx.getStorage({     //检查session_key
      key: 'userId',
      success: function (res) {
        var userid = res.data;
        util.req('user/GetGroupList', { "userid": userid, "group_status":s }, function (data) {  //获取对应用户参与活动的信息
          a.setData({
            groupList: data.groupList,
            noMoreHidden: !1,
          })
        })

      },
    })
  },

  GetHelpList:function(s){
    var e = this
     wx.getStorage({     //检查session_key
      key: 'userId',
      success: function (res) {
        var userid = res.data;
        util.req('user/GetHelpList', { "userid": userid, "help_status":s }, function (data) {  //获取对应用户参与活动的信息
          a.setData({
            helpList: data.helpList,
            noMoreHidden: !1,
          })
        })
      },
    })
  }

})