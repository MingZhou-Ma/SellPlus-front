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
  selector: 'c-customer_list',
  templateUrl: './customer_list.component.html'
})

export class Customer_ListComponent {
    event: any = {};
    customerlist: any = {};

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
    this.appService.titleEventEmitter.emit("券列表");
  }

  ngOnInit(){
      let that=this;
      this.getcustomerlist();
  }



  getcustomerlist(){
    let that = this;
    this.couponservice.GetMyCustomer(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.customerlist=data;
        }
    })
}
 addoldcustomer(){

 }



}