const WxParse = require('../../wxParse/wxParse.js');


Page({
    data: {
      news:{
        
            "title":"80后做灯泡月入30万 每款都独一无二",
            "intro":"80后小生“子夕”是来自E.P.Light的一名设计者，他也是一名探索中国文创发展的实践人。曾经的他做着一份花植部落项目运营的工作，出于对复古钨丝灯泡别样的好感，以及对花植、树脂的喜爱，于是萌生出了做一款不一样的灯泡的想法。差不多研发、实验了近两个月时间后，一款科技碰撞美学的高颜值创意产品就出炉了。",
            "pic":"http://img.my.csdn.net/uploads/201407/26/1406382789_7174.jpg",
            "depiction": `<p><strong><span style="font-family: Tahoma, Geneva, sans-serif; font-size: 18px;">当你初识这世间，你带着两眼的清澈，迫不及待的，遥望着远方的五彩缤纷！当你经过这世间</span></strong>，<span style="color: rgb(209, 72, 65);"><strong><em>你带着两眼的冰冷，漫不经心的，漠视你身边的万紫千红！有人说你变了，你却抱怨这个世界变了！或许是一切都变了！人总会是这样的，从开始未经世事的新奇，到后来历经沧桑的厌倦，我们都终将会变！而这样的变，我们把它叫做无常。 </em></strong></span></p>`
          
      },
      newsid:"",
    }, 
    onLoad: function (option) {
        
      let that = this;
      that.setData({
          newsid:option.newsid,
      })
      let ceshi = that.data.news.depiction
      WxParse.wxParse('article', 'html', ceshi, that, 5); 
    }, 

    Getnews:function(){
        var e = this
        wx.getStorage({
          key: 'accessToken',
          success: function(res){
            // success
            let accessToken=res.data
            util.req('cus/getNews', { "token":accessToken,"newsid":e.data.newsid}, function (data) {  //获取对应用户参与活动的信息
             
              if(data.code==1200){
                e.onLoad()
              }
              console.log(data)
            })
          },
        })
    }
  })
  
