
var o = getApp(),r = []
Page({
    data: {
      height: 20,
      focus: true,
      tempFilePaths:"",
      maskHidden:false,
      head_img:"",
      userName:"",
      imagePath:"",

  
    },


onLoad: function(a) {
    let that=this
    wx.getUserInfo({    //获取微信用户信息
      success: function (res) {
        that.getImageInfo(res.userInfo.avatarUrl);  //  调取图片处理方法
        that.setData({
          userName: res.userInfo.nickName
        });
      }
    });
    that.dateFilter()
},

bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
    },


    addimg: function(t) {
        for (var e = t.currentTarget.dataset.id, a = 0; a < r.length; a++) if (e == r[a].id && 1 == r[a].imgList.length) return void o.showToast({
            title: "最多上传一张图片",
            icon: "fault"
        });
        var i = this
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                o.showLoad({
                    title: "上传中",
                    mask: !0
                });
                o.hideLoad();
                var a = t.tempFilePaths;
                i.setData({
                    tempFilePaths: a
                  })
                // wx.uploadFile({
                //     url: o.globalData.requesturl + "/api/Catering/Comm/UploadImage",
                //     filePath: a[0],
                //     name: "file",
                //     formData: {
                //         shopId: n,
                //         accountName: s.AccountName
                //     },
                //     success: function(t) {
                //         var n = JSON.parse(t.data);
                //         if (-1 != n.errcode) {
                //             for (var s = 0; s < r.length; s++) e == r[s].id && (r[s].imgList.push(n.url), r[s].tempImgList.push(a[0]));
                //             i.setData({
                //                 commentImgList: r
                //             }), o.hideLoad();
                //         } else o.showToast({
                //             title: "上传失败",
                //             icon: "fault"
                //         });
                //     }
                // });
            }
        });
    },

  getImageInfo:function(url){
    let that=this    //  图片缓存本地的方法
      if(typeof url === 'string'){
        wx.getImageInfo({   //  小程序获取图片信息API
          src: url,
          success: function (res) {
            that.setData({
             head_img:res.path
           })
          },
          fail(err) {
            console.log(err)
          }
        })
      }
    },

    //图片点击事件
  imgYu:function(event){
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

   //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
   createNewImg: function () {
    var that = this;
    var ctx  = wx.createCanvasContext('mycanvas');
    ctx.clearRect(0, 0, 0, 0);
    const arr2 = ['../../resource/images/background.jpg',that.data.tempFilePaths[0],'../../resource/images/QR_code.png'];    // 有图片海报背景图&&海报正文图片
    const WIDTH=375;
    const HEIGHT=667;
    //  绘制图片模板的375
    ctx.drawImage(arr2[0], 0, 0, WIDTH, HEIGHT);

    ctx.drawImage(arr2[1], 0,223, 375, 265);
    ctx.drawImage(arr2[2], 145,510, 90, 90);
    //绘制时间
    var time=that.dateFilter();
    ctx.setTextAlign('left')
    ctx.setFontSize(20);
    ctx.fillText(time, 200, 55)
      //绘制667   ctx.save();
    // let r=32;
    // let d = r*2;
    // let cx = 102;
    // let cy = 1172;
    // ctx.arc(cx+r, cy+r, r, 0, 2 * Math.PI);
    // ctx.clip();
    // ctx.drawImage(this.data.head_img, cx, cy, d, d);
    // ctx.restore();
    //绘制正文
    const CONTENT_ROW_LENGTH = 28;  // 正文 单行显示字符长度
    let [contentLeng, contentArray, contentRows] = that.textByteLength('弈启学车的服务很好，不仅包接送，教练还很好!', CONTENT_ROW_LENGTH);
    ctx.setTextAlign('left')
    ctx.setFontSize(23);
    let contentHh = 23 * 1.3;
    for (let m = 0; m < contentArray.length; m++) {
    ctx.fillText(contentArray[m], 25, 110 + contentHh * m);
    }
     //绘制二维码右边说明
    ctx.setTextAlign('left')
    ctx.setFontSize(20);
    ctx.fillText("——"+that.data.userName, 265, 210);
    ctx.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempImgPath = res.tempFilePath;
          console.log(tempImgPath)
          console.log(that.data.tempFilePaths)
          that.setData({
            imagePath: tempImgPath,
            canvasHidden:true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  //
  textByteLength:function(text,num){  // text为传入的文本  num为单行显示的字节长度
    let strLength = 0; // text byte length
    let rows=1;
    let str=0;
    let arr=[];
    for (let j = 0; j < text.length; j++) {
          if (text.charCodeAt(j) > 255) {
            strLength += 2;
            if (strLength > rows * num) {
              strLength++;
              arr.push(text.slice(str, j));
              str = j;
              rows++;
            }
          } else {
            strLength++;
            if (strLength > rows * num) {
              arr.push(text.slice(str, j));
              str = j;
              rows++;
            }
          }
      }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows]   //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },
  //将时间戳转换为一个时间数字组成的数组
  dateFilter:function(){

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);
 
//获取当前时间
    var n = timestamp * 1000;
    var date = new Date(n);
    console.log(date.toDateString());
    return date.toDateString()
  },

  //点击保存到相册
  baocun:function(){
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },fail:function(res){
            console.log(11111)
          }
        })
      }
    })
  },
  //点击生成
  bindFormSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 1000)
  },
  
}) 