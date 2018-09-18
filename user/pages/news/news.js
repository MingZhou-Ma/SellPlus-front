const WxParse = require('../../wxParse/wxParse.js');
var t = getApp()
var util = require('../../../utils/util.js')


Page({
    data: {
      news:{},
    }, 
    onLoad: function (option) {
        
      let that = this;
      that.getArticle(option.newsid);
      console.log(option.newsid)
      that.showdeciption();
    }, 

    showdeciption:function(){
      let that =this
      let cechi =that.data.news.title
      console.log(cechi)
      WxParse.wxParse('article', 'html', cechi, that, 5); 
    },
    getArticle:function(newsid){
      var e = this
       wx.getStorage({     //检查session_key
        key: 'accessToken',
        success: function (res) {
          var accessToken = res.data;
          util.req('pub/listArticle', { "start":0,"num":999}, function (data) { 
            let arr =data.data.content
            for(var i=0,len=arr.length;i<len;i++){
              if(arr[i].id==newsid){
                e.setData({
                  news:arr[i]
                })
                let cechi =arr[i].content
                console.log(cechi)
                WxParse.wxParse('article', 'html', cechi, e, 5); 
              }
            }
          })
        }
      })
    }
  })
  
