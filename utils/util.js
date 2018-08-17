var t = getApp()

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootUrl = "https://wx.meetwhy.com/"
var rootDocment = rootUrl + 'api/';

//修改成你的appid及appsecret

function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/json' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)     //判断cb是不是函数类型同时将一个参数传入名为cb的函数下
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function getReq(url, data, cb) {
  data.appid = AppConf.appid;
  data.appsecret = AppConf.appsecret;
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
//
function bindSeller(uid){
  let e=this
  wx.getStorage({
    key: 'accessToken',
    success: function(res){
      // success
      let accessToken=res.data
      req('cus/bindSeller',{"token":accessToken,"uid":uid},function(data){
        console.log(data)
      })
    },

  })
}
//检查accessToken是否过期
function checkAt(cb){
      wx.getStorage({
        key: 'accessToken',
        success: function(res){
          // success
          req("cus/checkToken",{"token":res.data},function(data){
            console.log(data)
            if(data.code!=1000)
            {
              // wx.setStorage({
              //   key: 'accessToken',
              //   data: data.data.accessToken,
              //   success: function(res){
              //     // success
              //   },
              //   fail: function() {
              //     // fail
              //   },
              //   complete: function() {
              //     // complete
              //   }
              // })
            }
            return typeof cb == "function" && cb(data.code)
          })

        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
}
//


//登陆
function login () {
  var that = this;
  wx.login({
    success: function (res) {
      console.log(res)
      req('user/login', {
        "code": res.code,
        "errMsg":res.errMsg
      }, function (data) {        //获取请求返回的内容
        setUid(data.data.uid);  //存储用户的openid
        accessToken(data.data.accessToken);
        console.log(data)
      })
    },
    fail: function (res) {
      that.loginFail();
    }
  })
}
// 去前后空格  
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息  
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 清空错误信息  
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

function getDateDiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = dateTimeStamp - now;
  if (diffValue < 0) { return; }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result = '';
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月后";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周后";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天后";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时后";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟后";
  } else
    result = "刚刚";
  return result;
}

function getDateBiff(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) { return; }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var result = '';
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}

function escape2Html(str) {
  var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
}



module.exports = {
  rootUrl:rootUrl,
  formatTime: formatTime,
  req: req,
  trim: trim,
  isError: isError,
  clearError: clearError,
  getReq: getReq,
  getDateDiff: getDateDiff,
  escape2Html: escape2Html,
  getDateBiff: getDateBiff,
  checkAt:checkAt,
  bindSeller:bindSeller,
}  