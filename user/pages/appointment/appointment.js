

var a = getApp(), t = 0;

Page({
    data: {
        userId: "",
        ProductId: "",
        uname: "",
        tel: "",
        address: "",
        num: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled',

        goodmodelIndex: 0
    },
    onLoad: function(a) {
        // var t = this, e = wx.getStorageSync("userInfo");
        // t.setData({
        //     userId: e.memberInfo.uid,
        //     bargainId: a.bargainid
        // }), t.GetBargainInfo(), wx.hideShareMenu();
    },
    onShow: function() {
        t = 0;
    },

    GetBargainInfo: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/getbargain",
            data: {
                uid: t.data.userId,
                bargainid: t.data.bargainId
            },
            cachetime: "0",
            success: function(a) {
                a.data.data.totalprice = Number(a.data.data.price) + Number(a.data.data.activity.freight), 
                t.setData({
                    bargainInfo: a.data.data
                });
            }
        });
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
    bindAddress: function(a) {
        this.setData({
            address: a.detail.value
        });
    },
    bindMinus: function() {
		var num = this.data.num;
		// 如果大于1时，才可以减
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			num: num,
			minusStatus: minusStatus
		});
	},
	/* 点击加号 */
	bindPlus: function() {
		var num = this.data.num;
		// 不作过多考虑自增1
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num < 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			num: num,
			minusStatus: minusStatus
		});
	},
	/* 输入框事件 */
	bindManual: function(e) {
		var num = e.detail.value;
		// 将数值与状态写回
		this.setData({
			num: num
		});
	}
})
