/**
 * 参数检查
 */

//CanDeactivate 守卫的数据判断
export function dataNotSave(event): boolean {
  if (event.cover) return true;
  if (event.title) return true;
  if (event.starttime !== 0) return true;
  if (event.endtime !== 0) return true;
  if (event.body) return true;
  if (event.eventconf.scorehint) return true;
  if (event.eventconf.unit) return true;
  // if (event.eventconf.rank) return true;
  return false;
}

//数据检查 index 为活动的第几个步骤
export function dataCheckUp(index: number, event): { checked: boolean, name?: string } {
  switch (index) {
    case 0:
      if (!event.cover) return { checked: false, name: '[活动封面] 未添加' };
      if (!event.title) return { checked: false, name: '[活动标题] 未填写' };
      if (event.starttime === 0) return { checked: false, name: '[开始时间] 未填写' };
      if (event.endtime === 0) return { checked: false, name: '[结束时间] 未填写' };
      if (!checkEndTime(event.endtime)) return { checked: false, name: '[结束时间] 不能为过去时间' };
      if (!checkLogicTime(event.starttime, event.endtime)) return { checked: false, name: '[开始时间] 不能大于 [结束时间]' };
      if (!event.body) return { checked: false, name: '[活动介绍] 未填写' };
      return { checked: true };
    case 1:
      let eventconf = event;
      if (!eventconf.scorehint) return { checked: false, name: '[成绩提示] 未填写' };
      if (!eventconf.unit) return { checked: false, name: '[单位] 未填写' };
      if (!eventconf.rank) return { checked: false, name: '[排名方法] 未填写' };
      return { checked: true };
    case 2:
      let checkBaseInfo = dataCheckUp(0, event);
      if (!checkBaseInfo.checked) {
        return { checked: false, name: checkBaseInfo.name };
      }
      let checkConfig = dataCheckUp(1, event.eventconf);
      if (!checkConfig.checked) {
        return { checked: false, name: checkConfig.name };
      }
      return { checked: true };
    default:
      return { checked: false };
  }
}

//校验结束时间 (必须是未来的时间)
export function checkEndTime(timeStamp: number): boolean {

  //过去的时间不合法
  if (timeStamp * 1000 < Date.now()) {
    return false;
  }
  return true;
}

//校验开始时间 < 结束时间
export function checkLogicTime(startStamp: number, endStamp: number): boolean {

  if (startStamp > endStamp) {
    return false;
  }
  return true;
}

//Json 数据字段有效性校验
export function checkValue(data): boolean {
  for (let key in data) {
    if (!this.check(data[key])) {
      // console.log(key, data[key])
      return false
    }
  }
  return true
}

function check(value) {
  let type = typeof value
  switch (true) {
    case type === 'number': return !Number.isNaN(value)
    case type === 'object':
      if (value instanceof Array) return true
      else if (JSON.stringify(value) === 'null') return false
      else return this.checkValue(value)
    case type === 'boolean': return true
    // undefined | function | symbol | string
    case type === 'function': case type === 'symbol': case type === "string": case type === "undefined":
      return !!value
    default: return false
  }
}