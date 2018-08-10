// api
export const base = 'http://192.168.1.110/'
export const prefix = base + 'api/mer/'
export const public_prefix = base + "api/pub/"
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
};

