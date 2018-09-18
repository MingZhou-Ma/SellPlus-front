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
@Component({
  selector: 'c-coupon_cancle',
  templateUrl: './coupon_cancle.component.html',
  styleUrls:['./coupon_cancle.component.css']
})

export class Coupon_CancleComponent {
    event: any = {};
    status:boolean=false;
    dateTime: Date;

 //   @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private couponservice:CouponService,
      private toastService:ToastService,
      private dialog: DialogService,
      private datePipe: DatePipe,
    ) 
  {
    this.appService.titleEventEmitter.emit("券核销");
  }

  ngOnInit(){
      let that=this;

  }

  getdata(){
    let that=this;
    that.dateTime = new Date();
    that.event.createDate=this.datePipe.transform(that.dateTime, 'yyyy-MM-dd HH:mm:ss')
    console.log('dateTime:',that.event.createDate);
  }





  writeoff(){
    let that = this;
    this.couponservice.WriteOffCoupons(this.event.code,function(errCode){
        if(errCode==code.success)
        {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '核销成功', 3000);
            that.toastService.toast(toastCfg);
        }
        else{
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '核销失败', 3000);
            that.toastService.toast(toastCfg);
        }
    })
}


}