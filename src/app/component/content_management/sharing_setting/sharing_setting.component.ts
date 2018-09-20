import { Component, OnInit,OnDestroy  } from '@angular/core';
import { AppService } from '../../../app.service';

import {CouponService} from '../../../service/coupon.service'
import {api} from"../../../constant/api-url"
import { ToastService } from '../../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { code } from '../../../constant/status-code';
import { DialogModel } from '../../../shared/dialog/dialog.component';
import { DialogService } from './../../../shared/dialog/dialog.service';
import { ImgUploadComponent } from './../../../shared/img-upload/img-upload.component';
import { DatePipe } from '@angular/common';
import {Content_ManagementService} from '../../../service/content_management.service'

@Component({
  selector: 'c-sharing_setting',
  templateUrl: './sharing_setting.component.html',
  styleUrls:['./sharing_setting.component.css']
})

export class Sharing_SettingComponent {
    event: any = {};
    status:boolean=false;
    dateTime: Date;
    text:string[]=['是','否'];
    finite:string="";
    modellist:any={};

 //   @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private couponservice:CouponService,
      private toastService:ToastService,
      private dialog: DialogService,
      private datePipe: DatePipe,
      private content_managementservice:Content_ManagementService,

    ) 
  {
    this.appService.titleEventEmitter.emit("心得分享管理");
  }

  ngOnInit(){
      let that=this;
      that.getmodellist();
  }

  getdata(){
    let that=this;
    that.dateTime = new Date();
    that.event.createDate=this.datePipe.transform(that.dateTime, 'yyyy-MM-dd HH:mm:ss')
    console.log('dateTime:',that.event.createDate);
  }

  setmaininfo(i){
    let that = this;
    let formData=new FormData();
    formData.append("diaryReadNum",that.event.diaryReadNum)
    formData.append("diaryCoupon",that.event.diaryCoupon)
    formData.append("diaryIntervals",that.event.diaryIntervals)
    if(that.event=="null"){
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '请先填写信息', 3000);
        that.toastService.toast(toastCfg);
    }
    else{
        this.content_managementservice.SetContentInfo(formData,function(errCode,data){
            if(errCode==code.success)
            {
                const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '更改成功', 3000);
                that.toastService.toast(toastCfg);
            }
        })
    }
}


getCouponChange(){

    console.log(this.event.diaryCoupon)
}


getmodellist(){
    let that = this;
    this.couponservice.GetCouponModelList(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.modellist=data;
        }
    })
}


}