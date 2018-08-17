var e = getApp();

Page({
    data: {
        userInfo: [],
        setting: [],
        menutext: [ "我的砍价", "我的砍价订单" ],
        menudata: [ {
            imgsrc: "../../resource/images/bargain.png",
            url: "../../pages/mybargain/mybargain",
            id: "bargainlist"
        }, {
            imgsrc: "../../resource/images/order.png",
            url: "../../pages/myorder/myorder",
            id: "orderlist"
        } ]
    },
    onLoad: function() {

    },
    onShow: function() {},
    onShareAppMessage: function() {},
    GetSetting: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/getsetting",
            cachetime: "0",
            success: function(e) {
                t.setData({
                    setting: e.data.data
                });
            }
        });
    },
    GetUserInfo: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/getuserinfo",
            cachetime: "0",
            data: {
                uid: t.data.userId
            },
            success: function(e) {
                t.setData({
                    userInfo: e.data.data
                }), t.GetSetting();
            }
        });
    },
    GoKefuQr: function() {
        var e = this;
        wx.previewImage({
            current: e.data.setting.kefuqr,
            urls: e.data.setting.kefuqr
        });
    }
});