// user/pages/groupbuy_detail/groupbuy_detail.js
//用户扫码显示活动原生页面
var t = getApp();
var util = require('../../../utils/util.js');

Page({

  data: {
    activityInfo: 
      {
      "title": "这是一个非常有趣的拼团活动",
        "img": [
           "http://img1.3lian.com/2015/w7/85/d/101.jpg",
           "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        ],
        "groupprice": 99,
        "oldprice": 114,
        "format_starttime": "2017/03/03 03:03:03",
        "format_endtime": "2017/06/03 03:03:03",
        "stock": 65,
        "validity": "2017/07/03 03:03:03",
        "group_success_limit": 4,
        "status": 0,
        "business":
          {
            "name": "万达连锁超市",
            "address": "广东省广州市番禺区科韵路塘下20号",
            "tel": "13124253333",
          }
      },
    recommendList: [
      {
        "id": 1,
        "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
        "stock": 99,
        "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        "oldprice": 99,
        "groupprice": 60,
        "group_success_limit": 4,
        "status": 1,
        "stock": 199,
      },
      {
        "id": 1,
        "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
        "stock": 99,
        "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        "oldprice": 99,
        "groupprice": 60,
        "group_success_limit": 4,
        "status": 1,
        "stock": 199,
      },
    ],
    userId: "",
    activityId: "",
    join_status:0,
    groupid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //确定activytyid的来源
  onLoad: function (options) {
   var e=this;
//   e.GetActivityDetail();
//  e.IsJoin();
//  e.GetRecommendList();
  },


  CallBusiness: function () {
    var t = this;
    wx.makePhoneCall({
      phoneNumber: t.data.activityInfo.business.tel
    });
  },


  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {
    var e = this, a = "原价为"+e.data.activityInfo.oldprice+"元的"+e.data.activityInfo.title+"拼团后仅需"+e.data.activityInfo.groupprice+"元", p = e.data.activityInfo.img[0];
    return  {
        title: a,
        imageUrl: p,
        path: "user/pages/groupbuy_detail/groupbuy_detail?activityid=" + e.data.activityId,
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

  toHome: function () {
    wx.switchTab({
      url: "../main/index"
    });
  },


  GetActivityDetail: function (s) {    //获取活动信息
    var e = this;
    wx.getStorage({     //检查session_key
      key: 'userId',
      success: function (res) {
        e.data.userId = res.data;
        util.req('user/GetActivityDetail', {"activityid": e.data.activityId, }, function (t) {  //获取对应用户参与活动的信息
          e.setData({
            activityInfo: t.activityInfo //活动赋值
          })
        })
      },
    })
  },

  IsJoin:function(){ //询问用户是否已经加入此团
    var e=this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        e.data.userId=res.data;
        util.req('user/IsJoin_Act', { "userid": e.data.userId,"activityid":e.data.activityId},function(t)        {
          e.setData({
            join_status:t.data.join_status,
            groupid:t.data.groupid
          })
        }
        )
      },
    })
  },


 ToMyGroup:function(){  //已经开团，进入我的拼团详情页面
  var e = this;
  wx.navigateTo({
    url: "../mygroup_detail/mygroup_detail?groupid=" + e.data.groupid
  })
 },
 
  AddGroup: function () {  //用户开团，跳转到我的拼团详情页面
    var e = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        e.data.userId = res.data;
        util.req('user/AddGroup', { "userid": e.data.userId, "activityid": e.data.activityId }, function (t) {
          e.setData({
            groupid: t.data.groupid
          })
        }
        )
      },
    })
    wx.navigateTo({
      url: "../addorder/addorder?activityid=" + e.data.groupid+"&activityType=group",
    })
  },

GetRecommendList: function (){
  var e = this;
  wx.getStorage({
    key: 'userId',
    success: function (res) {
      e.data.userId = res.data;
      util.req('user/GetGroupRecommendList', { "userid": e.data.userId, "activityid": e.data.activityId }, function (t) {
        e.setData({
          recommendList: t.recommendList
        })
      }
      )
    },
  })
}
})