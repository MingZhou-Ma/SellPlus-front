Page({

 data:{
     my_info:{
         "name":"马云",
         "tel":"13178906758",
     },
     is_disabled:"disabled"
 },

 write:function(){
    let that=this
    that.setData({
    is_disabled:null
    })
 }
})