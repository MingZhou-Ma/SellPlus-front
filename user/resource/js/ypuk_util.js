function e(e, t) {
    var n = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), a = e.split("?")[1].match(n);
    return null != a ? unescape(a[2]) : null;
}

function t(t, r, s) {
    var o = "", u = e(t, "sign");
    if (u || r && r.sign) return !1;
    if (t && (o = n(t)), r) {
        var l = [];
        for (var g in r) g && r[g] && (l = l.concat({
            name: g,
            value: r[g]
        }));
        o = o.concat(l);
    }
    o = a.sortBy(o, "name"), o = a.uniq(o, !0, "name");
    for (var c = "", d = 0; d < o.length; d++) o[d] && o[d].name && o[d].value && (c += o[d].name + "=" + o[d].value, 
    d < o.length - 1 && (c += "&"));
    return s = s || getApp().siteInfo.token, u = i(c + s);
}

function n(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var n = e.split("?")[1].split("&"), a = 0; a < n.length; a++) n[a].split("=")[0] && unescape(n[a].split("=")[1]) && (t[a] = {
        name: n[a].split("=")[0],
        value: unescape(n[a].split("=")[1])
    });
    return t;
}

var a = require("../../../we7/resource/js/underscore.js"), i = require("../../../we7/resource/js/md5.js"), r = require("../../../we7/resource/js/util.js");

module.exports = {
    upload: function(n) {
        getApp();
        (n = n || {}).showLoading = void 0 === n.showLoading || n.showLoading;
        var a = wx.getStorageSync("userInfo").sessionid, i = n.url;
        -1 == i.indexOf("http://") && -1 == i.indexOf("https://") && (i = r.url(i));
        e(i, "state");
        i = i + "&state=we7sid-" + a;
        var s = getCurrentPages();
        s.length && (s = s[getCurrentPages().length - 1]) && s.__route__ && (i = i + "&m=" + s.__route__.split("/")[0]);
        var o = t(i, n.data);
        if (o && (i = i + "&sign=" + o), !i) return !1;
        wx.showNavigationBarLoading(), n.showLoading && r.showLoading(), wx.uploadFile({
            url: i,
            filePath: n.file,
            name: n.name,
            success: function(e) {
                e.data = JSON.parse(e.data), wx.hideNavigationBarLoading(), wx.hideLoading(), n.success && "function" == typeof n.success && n.success(e);
            },
            fail: function(e) {
                wx.hideNavigationBarLoading(), wx.hideLoading(), e.data = JSON.parse(e.data), n.fail && "function" == typeof n.fail && n.fail(e);
            },
            complete: function(e) {
                n.complete && "function" == typeof n.complete && n.complete(e);
            }
        });
    },
    createurl: function(n) {
        getApp();
        var a = wx.getStorageSync("userInfo").sessionid, i = n.url;
        -1 == i.indexOf("http://") && -1 == i.indexOf("https://") && (i = r.url(i));
        e(i, "state");
        i = i + "&state=we7sid-" + a;
        var s = getCurrentPages();
        s.length && (s = s[getCurrentPages().length - 1]) && s.__route__ && (i = i + "&m=" + s.__route__.split("/")[0]);
        var o = t(i, n.data);
        return o && (i = i + "&sign=" + o), i;
    }
};