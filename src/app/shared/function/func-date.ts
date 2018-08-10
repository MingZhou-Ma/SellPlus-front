/**
 * 日期转换
 */
//秒时间戳转换成毫秒时间戳
//TimeStamp (s) ==> TimeStamp (ms)
export function timeStampSToMs(timeStamp: number): number {
  return timeStamp * 1000;
}

//毫秒时间戳转换成秒时间戳
//TimeStamp (ms) ==> TimeStamp (s)
export function timeStampMsToS(timeStamp: number): number {
  return Math.floor(timeStamp / 1000);
}

//日期转换成时间戳
//2012-12-21T12:21:21 ==> TimeStamp (s)
export function dateToTimeStamp(dateString: string): number {
  let timeStamp = Date.parse(dateString);
  return Math.floor(timeStamp / 1000);
}

//时间戳转换成日期
//TimeStamp (s) ==> 2012-12-21T12:21:21
export function timeStampToDate(timeStamp: number): string {
  let date = new Date(timeStamp * 1000);

  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  let min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  let sec = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

  let dateString = `${Y}-${M}-${D}T${hour}:${min}:${sec}`;
  return dateString;
}

//时间戳转换成方便文本显示的字符串
//TimeStamp (s) ==> 2012-12-21 12:21:21
export function timeStampToString(timeStamp: number): string {
  let date = new Date(timeStamp * 1000);

  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  let min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  let sec = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

  let str = `${Y}-${M}-${D} ${hour}:${min}:${sec}`;
  return str;
}

//日期字符串转换成方便文本显示的字符串
//2012-12-21T12:21:21 ==> 2012-12-21 12:21:21
export function dateStringToString(dateString: string): string {
  let date = new Date(dateString);

  let getArrs = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];

  let Y = date.getFullYear();
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  let min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  let sec = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

  let str = `${Y}-${M}-${D} ${hour}:${min}:${sec}`;
  return str;
}

//通过年月日获取日期
export function getDateByYMD(y: number, m: number, d: number) {
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return '';
  let year = '' + y;
  let month = m < 10 ? '0' + m : '' + m;
  let day = d < 10 ? '0' + d : '' + d;

  return `${year}-${month}-${day}`;
}

//通过时分秒获得字符串
export function getTimeByHMS(h: number, m: number, s: number) {
  if (!Number.isInteger(h) || !Number.isInteger(m) || !Number.isInteger(s)) return '';
  let hour = h < 10 ? '0' + h : '' + h;
  let min = m < 10 ? '0' + m : '' + m;
  let sec = s < 10 ? '0' + s : '' + s;

  return `${hour}:${min}:${sec}`;
}

//根据出生日期计算年龄
export function getAgeByBirthday(dateString: string): number {
  let birthday = new Date(dateString);
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  let age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age;
}

//通过以秒为单位的时间差得出用户友好的时间显示字符串
export function timeDiffTransform(time: number): string {
  if (Number.isNaN(time) || time === 0) return '';
  const oneMin = 60, oneHour = 3600, oneDay = 24 * 3600;
  let dayCnt = 0, hourCnt = 0, minCnt = 0, secCnt = 0;

  time = Math.floor(time);
  dayCnt = Math.floor(time / oneDay);
  time = time % oneDay;
  hourCnt = Math.floor(time / oneHour);
  time = time % oneHour;
  minCnt = Math.floor(time / oneMin);
  time = time % oneMin;
  secCnt = time;

  let day = dayCnt === 0 ? '' : `${dayCnt}天`;
  let hour = hourCnt === 0 ? '' : `${hourCnt}小时`;
  let min = minCnt === 0 ? '' : `${minCnt}分`;
  let sec = secCnt === 0 ? '' : `${secCnt}秒`;

  switch (true) {
    case dayCnt >= 2: return day;
    case dayCnt === 1: return day + hour;
    case hourCnt >= 1: return hour + min;
    default: return min + sec;
  }

}