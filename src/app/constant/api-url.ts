// api
export const base = "https://api.great-info.tech/"
// export const base = "https://wx.meetwhy.com/"
export const prefix = base + 'api/mer/'
export const public_prefix = base + "api/pub/"
export const public_sell = base + "api/sell/"
export const api = {

  login: prefix + 'login',                  //登录
  //活动
  get_act_list:prefix+"listActivity",
  act_public:prefix+"addActivity",
  act_detele:prefix+"delActivity",
  //商品
  get_product_list:prefix+"listProduct",
  product_delete:prefix+"delProduct",
  product_public:prefix+"addProduct",
  //文件上传
  imgupload:public_prefix+"uploadBase64",
  uploadpic:public_prefix+"uploadPic",
  //公司后台主要信息设置
  setMainInfo:prefix+"setMainInfo",
  getMainInfo:public_prefix+"getMainInfo",
  //营销文章相关
  getnewslist:public_prefix+"listArticle",
  addnews:prefix+"addArticle",
  deletenews:prefix+"delArticle",
  //优惠劵相关
  addCouponModel:prefix+"addCouponModel",
  getCouponModel:prefix+"getCouponModel",//获取全部的优惠卷模板
  getCouponObj:prefix+"getCouponObj",
  delCouponModel:prefix+"delCouponModel",
  writeOffCoupons:prefix+"writeOffCoupons",
  writeOffHistory:prefix+"writeOffHistory",
  //用户资料相关
  getMyCustomer:prefix+"getMyCustomer",
};

