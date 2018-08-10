import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { timeStampToDate, timeStampMsToS, getDateByYMD, dateToTimeStamp, getTimeByHMS } from 'app/shared/function/func-date';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() readonly = false;
  @Input() timeStamp: number;
  @Output() datepickerChange = new EventEmitter();

  hourValue = ["00 时", "01 时", "02 时", "03 时", "04 时", "05 时", "06 时", "07 时", "08 时", "09 时", "10 时", "11 时", "12 时", "13 时", "14 时", "15 时", "16 时", "17 时", "18 时", "19 时", "20 时", "21 时", "22 时", "23 时"]
  minValue = ["00 分", "01 分", "02 分", "03 分", "04 分", "05 分", "06 分", "07 分", "08 分", "09 分", "10 分", "11 分", "12 分", "13 分", "14 分", "15 分", "16 分", "17 分", "18 分", "19 分", "20 分", "21 分", "22 分", "23 分", "24 分", "25 分", "26 分", "27 分", "28 分", "29 分", "30 分", "31 分", "32 分", "33 分", "34 分", "35 分", "36 分", "37 分", "38 分", "39 分", "40 分", "41 分", "42 分", "43 分", "44 分", "45 分", "46 分", "47 分", "48 分", "49 分", "50 分", "51 分", "52 分", "53 分", "54 分", "55 分", "56 分", "57 分", "58 分", "59 分"]
  secValue = ["00 秒", "01 秒", "02 秒", "03 秒", "04 秒", "05 秒", "06 秒", "07 秒", "08 秒", "09 秒", "10 秒", "11 秒", "12 秒", "13 秒", "14 秒", "15 秒", "16 秒", "17 秒", "18 秒", "19 秒", "20 秒", "21 秒", "22 秒", "23 秒", "24 秒", "25 秒", "26 秒", "27 秒", "28 秒", "29 秒", "30 秒", "31 秒", "32 秒", "33 秒", "34 秒", "35 秒", "36 秒", "37 秒", "38 秒", "39 秒", "40 秒", "41 秒", "42 秒", "43 秒", "44 秒", "45 秒", "46 秒", "47 秒", "48 秒", "49 秒", "50 秒", "51 秒", "52 秒", "53 秒", "54 秒", "55 秒", "56 秒", "57 秒", "58 秒", "59 秒"]

  //配置日期选择器
  myDatePickerOptions: IMyDpOptions;

  model: any;

  date: string = "";
  hour = this.hourValue[0];
  min = this.minValue[0];
  sec = this.secValue[0];
  emitTimeStamp: number;

  constructor() { }

  ngOnInit() {
    this.myDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      componentDisabled: this.readonly,
      openSelectorOnInputClick: true,
      inline: false,
      editableDateField: false,
      selectionTxtFontSize: '16px'
    };
    this.setDate();
  }

  //组件获得时间戳初始化日期
  setDate() {

    if (!Number.isInteger(this.timeStamp) || this.timeStamp === 0) {
      this.date = "";
    }
    else {
      let date = new Date(timeStampToDate(this.timeStamp));
      this.model = {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }

      this.date = getDateByYMD(date.getFullYear(), date.getMonth() + 1, date.getDate());
      this.hour = this.hourValue[date.getHours()];
      this.min = this.minValue[date.getMinutes()];
      this.sec = this.secValue[date.getSeconds()];
    }
  }

  onDateChanged(event) {
    // console.log(event);
    let dateObj: { year: number, month: number, day: number } = event.date;

    if (dateObj.year === 0 || dateObj.month === 0 || dateObj.day === 0) {
      this.datepickerChange.emit(0);
      return;
    }

    let dateString = getDateByYMD(dateObj.year, dateObj.month, dateObj.day);
    this.date = dateString;

    if (this.datepickerCheckUp()) {
      this.emitDate();
    }
  }

  onTimeChange() {
    if (this.datepickerCheckUp()) {
      this.emitDate();
    }
  }

  //发射数据前检查合法性
  datepickerCheckUp(): boolean {
    //判空
    if (!this.date) {
      return false;
    }
    return true;
  }

  //向父组件发射数据
  emitDate() {

    if (!this.datepickerCheckUp()) {
      return;
    }

    //数据转换
    let hourNumber = this.hourValue.indexOf(this.hour);
    let minNumber = this.minValue.indexOf(this.min);
    let secNumber = this.secValue.indexOf(this.sec);

    let dateString = `${this.date}T${getTimeByHMS(hourNumber, minNumber, secNumber)}`;
    this.emitTimeStamp = dateToTimeStamp(dateString);

    if(Number.isNaN(this.emitTimeStamp)) {
      this.datepickerChange.emit(0);
      return;
    }

    //数据发射
    
    this.datepickerChange.emit(dateString.replace("T"," "));


//    console.log(dateString);
//    console.log(this.emitTimeStamp);
  }



}

