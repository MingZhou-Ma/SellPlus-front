import { Component, OnInit,OnDestroy  } from '@angular/core';
import { AppService } from '../../../app.service';

import {CouponService} from '../../../service/coupon.service'
import {api} from"../../../constant/api-url"
import { ToastService } from '../../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { code } from '../../../constant/status-code';
import { DialogModel } from '../../../shared/dialog/dialog.component';
import { DialogService } from './../../../shared/dialog/dialog.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'c-writeoff_list',
  templateUrl: './writeoff_list.component.html'
})

export class WriteOff_ListComponent {
    event: any = {};
    canclelist: any = {};
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
    this.appService.titleEventEmitter.emit("券核销记录");
  }

  ngOnInit(){
      let that=this;
      this.getcanclelist();
  }




  getcanclelist(){
    let that = this;
    this.couponservice.WriteOffHistory(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.canclelist=data;
        }
    })
}







}