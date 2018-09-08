
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
    const arr2 = ['../../resource/images/background.jpg', that.data.tempFilePaths[0]];    // 有图片海报背景图&&海报正文图片
    const WIDTH=750;
    const HEIGHT=1600;
    //  绘制图片模板的 底图
    ctx.drawImage(arr2[0], 0, 0, WIDTH, HEIGHT);
    ctx.drawImage(arr2[1], 40,40, 300, 400);

    //  绘制 图片模板 的时间
    // const TEXT_DATE = ['2', '0', '1', '8', '.', '0', '4','.','1','2'];
    // for (let i = 0; i < TEXT_DATE.length; i++) {
    //   if (TEXT_DATE[i] != '.') {
    //     var path3 = `./${TEXT_DATE[i]}.png`;
    //   } else {
    //     var path3 = './point.png';
    //   }
    //   let clientx = 40 + 16 * i;
    //   ctx.drawImage(path3, clientx, 640, 16, 32);
    // }
      // 绘制头像
    ctx.save();
    let r=32;
    let d = r*2;
    let cx = 102;
    let cy = 1172;
    ctx.arc(cx+r, cy+r, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(this.data.head_img, cx, cy, d, d);
    ctx.restore();
    //  绘制二维码右边说明
    ctx.setTextAlign('left')
    ctx.setFontSize(28);
    ctx.setFillStyle('rgba(34,34,34,.64)')
    // ctx.fillText('长按小程序码', 250, 400);
    // ctx.fillText(`${that.data.userName}邀你进入掌阅读好书`, 250, 450);
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