//进入订单页面

var t = getApp()
var util = require('../../../utils/util.js');
Page({
    data: {
        activityInfo:
      {
        "title":"ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
        "status": 2,
        "stock": "100",
        "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
        "groupprice": "99",
        "oldprice": "114",
      },
        groupInfo:
        {
          "grouprecordnum": 3,
          "group_success_limit_array": 5,
          "status": 1 ,
          "user_isfirst": 0 ,
          "surplusnum": 3,
          "record": 3,
          "member": 
          ["d7a7dhf5f676=s9fk==","d7a7dhf5f676=s9fk=="]
        },

        recommendList: [
          {
            "id": 1,
            "title": "ReFa CARAT RAY美容仪铂金滚轮微电流 范冰冰日本瘦脸神器升级版",
            "stock": 99,
            "img": "http://img1.3lian.com/2015/w7/85/d/101.jpg",
            "oldprice": 99,
            "groupprice": 60,
            "group_success_limit":4,
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
        groupId: "",
        shareMenuHidden: !0,
        join_status:0
    },
    onLoad: function(a) {
 //     i = this;
 //     i.setData({
 //       groupId: a.groupid
 //     })
 //     i.GetGroupDetail(),
 //     i.IsJoin()
    },
    
    onShow: function() {},
    GetLocation: function() {},

    onShareAppMessage: function() {    //邀请好友加入拼团
      var t = this, a = "我正在参加：" + t.data.activityInfo.title + " 快来帮我助力", e = t.data.activityInfo.img;
        return {
            title: a,
            imageUrl: e,
            path: "user/pages/mygroup_detail/mygroup_detail?groupid=" + t.data.groupId,
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

    toHome: function() {
        wx.switchTab({
            url: "../main/index"
        });
    },

 GetGroupDetail: function () {
      var e = this;
      wx.getStorage({     
        key: 'userId',
        success: function (res) {
          var userid = res.data;
          util.req('user/GetGroupDetail', { "userid": userid, "groupid": e.data.groupId, }, function (t) {  //获取对应用户参与活动的信息
            e.setData({
              activityInfo:t.activityInfo,
              groupInfo:t.groupInfo,
            }) //活动赋值
          })
        },
      })
    },

 IsJoin: function () { //询问用户是否已经加入此团
   var e = this;
   wx.getStorage({
     key: 'userId',
     success: function (res) {
       e.data.userId = res.data;
       util.req('user/IsJoin_group', { "userid": userId, "groupid": e.data.groupId }, function (t) {
         e.setData({
           join_status: t.data.join_status,
         })
       }
       )
     },
   })
 },

    JoinGroup: function() {     //用户加入该团
      var e = this;
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          var userid = res.data;
          util.req('user/JoinGroup', { "userid": userid, "groupid": e.data.groupId, }, function (t) {  //获取对应用户参与活动的信息
            if(t.success){
              e.setData({
                join_status: true,
              })
            }
          })
        },
      })
      wx.navigateTo({
        url: "../addorder/addorder?activityid=" + e.data.groupid + "&activityType=group",
      })
    },
  GetRecommendList: function () {
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