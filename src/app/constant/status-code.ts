// 后端返回码

export const code = {
  success: 1000,               // 请求已成功
  authenticationFail: 403,    // 服务器已经理解请求，但是拒绝执行它
  noFound: 404,                // 请求失败

  actionLog:{  // 行为日志
    login: 0,
    checkEventList: 1,
    checkEventDetail: 2,
    setNotify: 3,
    checkRank: 4,
    checkEventForecast: 5,
    checkEventReview: 6,
    checkRecordsOfPlayer: 7,
    checkRecordOfPlayer: 8,
    checkVideoOfPlayer:9,
    checkPicOfPlayer: 10,
    checkAudioOfPlayer: 11,
    submitSelfInfo: 12,
    checkSelfInfo: 13,
    checkSelfEvent: 14,
    checkSelfEventInfo: 15,
    checkSelfRecordDetail: 16
  },
  custom: {                    // 自定义错误码
    success: 1000,             //成功

    noAuth: 1004,             //没有权限
    sysErr: 1001,               //系统出错
    paraErr: 1002,            //请求参数错误
    dbErr: 1005,              //数据库操作失败

    sessionExpired: 1003,     //session 过期
    adminPwdWrong: 2001,      //管理员登录账号密码不正确
    fileContentWrong: 2002,   //文件内容不正确
    adminSendSmsFail: 2004, //推送短信失败
    playerInfoNoExist: 3001,    //参赛者信息不存在
    eventNotFound: 3003,        //活动不存在
    eventParaErr: 4001,         //请求参数错误
    playerHasBan: 3002,          //参赛者已被禁赛

    managerNoExist:2003,        //管理员不存在

    fileSuffixNotSupport: 5001,       //文件后缀不支持
    fileSizeLarger: 5002,             //文件尺寸过大
    fileExist: 5003,            //文件存在
    fileNotExist: 5004,         //文件不存在
    lowThanBefore: 7001         // 成绩比原来还低
  }
};

