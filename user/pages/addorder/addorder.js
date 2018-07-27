var util = require('../../../utils/util.js');
var t = getApp();


Page({
    data: {
        userId: "",
        activityType:0,
        activityId: "",
        uname: "",
        tel: "",
        activityInfo: {
          "oldprice":129,
          "helpprice":99,
        },
    },
    onLoad: function(a) {
        var t = this
/*        t.setData({
            activityType:a.activityType,
            activityId:a.activityid
        }), t.GetOrderInfo()
        */
    },


    GetOrderInfo: function() {
      var e = this;
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          e.data.userId = res.data;
          if(e.data.activityType==0)
          {
            util.req('user/GetHelpActivityDetail', { 
            "activityid": e.data.activityId,         
            }, function (t) {
            e.setData({
            "activityInfo":t
            })
          }
          )
          }
          else{
            util.req('user/GetGroupActivityDetail', {
              "activityid": e.data.activityId,
            }, function (t) {
              e.setData({
                "activityInfo": t
              })
            }
            )
          }
        },
      })
    },

    bindUname: function(a) {
        this.setData({
            uname: a.detail.value
        });
    },
    bindTel: function(a) {
        this.setData({
            tel: a.detail.value
        });
    },

  addOrderBtn: function () {
    var e = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        e.data.userId = res.data;
          util.req('user/AddOrder', {
            "uname":e.data.uname,
            "tel":e.data.tel,
            "userId":e.data.userId,
            "activityid": e.data.activityId,
            "activitytype":e.data.activityType
          }, function (t) {
            e.setData({
              "errMsg":t.errMsg
            })
          })
                             }
    })
    if (errMsg&&activityType==0){
      wx.showToast({
        title: "提交订单成功"
      }), wx.redirectTo({
        url: "../my_help/my_help?helpid=" + a.data.activityId
      })
    }
    if (errMsg && activityType == 1)
    {
      wx.showToast({
        title: "提交订单成功"
      }), wx.redirectTo({
        url: "../mygroup_detail/mygroup_detail?groupid=" + a.data.activityId
      })
    }
  },

});