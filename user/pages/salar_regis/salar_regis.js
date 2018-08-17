

var t = getApp()
var util = require('../../../utils/util.js')
Page({
    data: {
        salarId: "",
        tel: "",
        salarKey:"",
        name:"",
        wechat:"",
        intro:"",
        avatarUrl:"",
    },
    onLoad: function(a) {
        let e =this;
        // var t = this, e = wx.getStorageSync("userInfo");
        // t.setData({
        //     userId: e.memberInfo.uid,
        //     bargainId: a.bargainid
        // }), t.GetBargainInfo(), wx.hideShareMenu();
        wx.getUserInfo({
            success: function (res) {
                console.log(res)
             e.setData({
                 nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
             })
             },
       }),
        console.log(e.data.avatarUrl)    
},
    onShow: function() {
    },


    bindSalarId: function(a) {
        this.setData({
            salarId: a.detail.value
        });
    },
    bindTel: function(a) {
        this.setData({
            tel: a.detail.value
        });
    },
    bindSalarKey: function(a) {
        this.setData({
            salarKey: a.detail.value
        });
    },
    bindName: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    bindWeChat: function(a) {
        this.setData({
            wechat: a.detail.value
        });
    },
    bindIntro: function(a) {
        this.setData({
            intro: a.detail.value
        });
    },

    salarRegis:function(){
        var e = this;
        wx.getStorage({     //检查session_key
          key: 'accessToken',
          success: function (res) {
            var accessToken = res.data;
            util.req('cus/beSeller', 
            { 
            "token":accessToken,             
            "account":e.data.salarId,
            "phone":e.data.tel,
            "name":e.data.name,
            "key":e.data.salarKey,
            "wechat":e.data.wechat,
            "intro":e.data.intro,
            "avatar":e.data.avatarUrl,
            }, function (data) {  
                console.log(data)
            })
          },
        })
    }

    

})
