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
  selector: 'c-new_coupon',
  templateUrl: './new_coupon.component.html',
  styleUrls:['./new_coupon.component.css']
})

export class NewCouponComponent {
    event: any = {};
    status:boolean=false;
    dateTime: Date;
    text:string[]=['是','否'];
    finite:string="";

 //   @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private couponservice:CouponService,
      private toastService:ToastService,
      private dialog: DialogService,
      private datePipe: DatePipe,
    ) 
  {
    this.appService.titleEventEmitter.emit("新建优惠券模板");
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



onDatepickerChange(fb,timeFlag) {
    if(timeFlag === 0) {
      this.event.startDate = fb;
      console.log(this.event.startDate)
      return;
    }
    if(timeFlag === 1) {
      this.event.endDate = fb;
      console.log(this.event.endDate)
      return;
    }
  }


  addcoupon(){
    let that = this;
    this.couponservice.AddCoupon(this.event,function(errCode){
        if(errCode==code.success)
        {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '添加优惠券模板成功', 3000);
            that.toastService.toast(toastCfg);
        }
    })
}
getFiniteChange(){
    let that=this;
    if(that.finite=='是'){
        that.event.finite=true
    }
    else{
        that.event.finite=false
    }
}


}