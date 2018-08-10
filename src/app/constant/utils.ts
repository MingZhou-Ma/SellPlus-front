const utils = {
  parseParam(obj) {
    if (!obj) {
      return '';
    }
    const pair = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        pair.push(`${encodeURIComponent(key)}=${obj[key]}`);
      }
    }
    return pair.join('&');
  },

  parseDate(obj){  // 将时间戳转换为年-月-日形式
    let date: Date;
    date = new Date(obj*1000);

    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
  },

  parseDate2(obj){  // 将时间戳转化为精确到秒的字符串格式
    let date: Date;
    date = new Date(obj*1000);
    return `${this.fz(date.getFullYear())}/${this.fz(date.getMonth()+1)}/${this.fz(date.getDate())} 
    ${this.fz(date.getHours())}:${this.fz(date.getMinutes())}:${this.fz(date.getSeconds())}`;
  },

  fz(num){  // 添加前导零
    return num.toString().length > 1 ? num.toString() : '0' + num.toString();
  }
};
export default utils;
