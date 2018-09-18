var t = getApp()
var util = require('../../../utils/util.js')

// user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      // "http://img.my.csdn.net/uploads/201407/26/1406383264_3954.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383264_4787.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383264_8243.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383248_3693.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383243_5120.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383242_3127.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383242_9576.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383242_1721.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383219_5806.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383214_7794.jpg",  
      // "http://img.my.csdn.net/uploads/201407/26/1406383213_4418.jpg",  


    ],
    noticeList:[
      "家居百货、手机数码、家用电器、箱包配饰、汽车周边、运动户外、美妆个护、文化创意品等；生活服务、美食购物、娱乐休闲等电子卡券。",
      "包邮试用活动中奖名单公示",
      "第五届商城县“华儒杯”道德模范候选人公众投票开始啦！"
    ],
    salerInfo:
      {
        "pic":"http://img.my.csdn.net/uploads/201407/26/1406383130_7393.jpg",  
        "name":"马化腾",
        "wechat":"173348857",
        "phone":"13719811949",
        "intro":"971年10月29日生于广东省汕头市潮南区。腾讯公司主要创办人之一。现任腾讯公司控股董事会主席兼首席执行官；全国青联副主席。"
      },
      productList:[
        // {
        //   "id":"1",
        //   "pic":"http://img.my.csdn.net/uploads/201407/26/1406382861_8606.jpg",
        //   "title":"ARMANI 休闲牛仔裤",
        //   "intro":"版型修身，剪裁流畅简洁。优质棉面料，穿着柔软舒适。选用精湛的工艺制成，凸显品牌质量。"
        // },
        // {
        //   "id":"1",
        //   "pic":"http://img.my.csdn.net/uploads/201407/26/1406382839_5779.jpg",
        //   "title":"Gucci logo条纹短裤",
        //   "intro":"宽松直筒的版式，修饰臀腿，遮掩赘肉。"
        // },
      ],
      infoList:[
      // {
      //   "title":"淘宝文创成最“凶猛”物种：有趣更有温度",
      //   "intro":"“朕已阅”书签、“全村的希望”手机壳、“贞子出没”背包、“煎饼卷大葱”中国风味正版字体……近年来，传统与创意相结合的文创产品在淘宝上如雨后春笋般迅猛生长，星星之火已成燎原之势。",
      //   "pic":"http://img.my.csdn.net/uploads/201407/26/1406382809_6269.jpg",
      // },
      // {
      //   "title":"80后做灯泡月入30万 每款都独一无二",
      //   "intro":"80后小生“子夕”是来自E.P.Light的一名设计者，他也是一名探索中国文创发展的实践人。曾经的他做着一份花植部落项目运营的工作，出于对复古钨丝灯泡别样的好感，以及对花植、树脂的喜爱，于是萌生出了做一款不一样的灯泡的想法。差不多研发、实验了近两个月时间后，一款科技碰撞美学的高颜值创意产品就出炉了。",
      //   "pic":"http://img.my.csdn.net/uploads/201407/26/1406382789_7174.jpg",
      // }
      ]
      ,
      rootUrl:util.rootUrl,
      accessToken:"",
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let e = this
    // t.getUserInfo(function(globalData){
    //   console.log(globalData.at)
    // })
    // console.log(t.globalData.at)
    util.checkAt(function(code){
      if(code!=1000){
        wx.showModal({
          title: '提示',
          content: '您的登陆已经过期,请按确定重新登陆',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
              e.getMainInfo();
              e.getSalerInfo();
              e.getProductList();
              e.getListArticle();

            } else if (res.cancel) {
              console.log('取消')
            }
          }
    })

}
else{
  e.getMainInfo();
  e.getSalerInfo();
  e.getProductList();
  e.getListArticle();
};

 
    })

  // e.getMainInfo();
  // e.getSalerInfo();
  // var kk =wx.getStorageInfoSync('kk')
  // console.log(kk)
  },


  onShow:function(){

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

  copyTBL:function(e){
    var self=this;
    wx.setClipboardData({
    data: this.data.salerInfo.wechat,
    success: function(res) {
      // self.setData({copyTip:true}),
      wx.showModal({
      title: '提示',
      content: '已复制到您的粘贴板',
      success: function(res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
})
    }
  });
  },

  CallBusiness: function() {
    var t = this;
    wx.makePhoneCall({
        phoneNumber: t.data.salerInfo.phone
    });
},

syncToAddress:function(){
  let e =this
  wx.addPhoneContact({
    // mobilePhoneNumber:e.data.salerInfo.phone,
    // firstName:e.data.salerInfo.name,
    mobilePhoneNumber:e.data.salerInfo.phone,
    firstName:e.data.salerInfo.name,
    success:function(){
      console.log('添加成功')
  }
  })
},

getMainInfo:function(){
  var e = this
     util.req('pub/getMainInfo', {"token":e.data.accessToken}, function (data) {  //获取对应用户参与活动的信息
       e.setData({
        swiperList:data.data.banners,
        noticeList:data.data.notifys
       })
       console.log(data)
     })
},

getSalerInfo:function(){
  var e = this
  wx.getStorage({
    key: 'accessToken',
    success: function(res){
      // success
      let accessToken=res.data
      util.req('cus/showMySeller', { "token":accessToken}, function (data) {  //获取对应用户参与活动的信息
        e.setData({
           salerInfo:data.data,
        })
        if(data.code==1200){
          e.onLoad()
        }
        console.log(data)
      })
    },
  })
},
getListArticle:function(){
  var e = this
   wx.getStorage({     //检查session_key
    key: 'accessToken',
    success: function (res) {
      var accessToken = res.data;
      util.req('pub/listArticle', { "start":0,"num":999}, function (data) {  //获取对应用户参与活动的信息
        e.setData({
          infoList:data.data.content  
        })
        console.log(data)
        console.log(data.data);
      })
    },
  })
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

})