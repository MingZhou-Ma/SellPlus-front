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
  selector: 'c-seller_list',
  templateUrl: './seller_list.component.html'
})

export class Seller_ListComponent {
    defaultImg = require('../../../../assets/img/upload_btn.png');
    sellerlist: any = {};
    modellist:any={};
    imgIssue: string = `支持 jpg、jpeg、png 类型的图片，图片大小不超过 2MB`;
    text: string='这里面是内容..';
    status:boolean=false;
    dateTime: Date;
    rooturl:string="https://api.great-info.tech/";


 //   @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private couponservice:CouponService,
      private toastService:ToastService,
      private dialog: DialogService,
      private datePipe: DatePipe,
    ) 
  {
    this.appService.titleEventEmitter.emit("销售列表");
  }

  ngOnInit(){
      let that=this;
      this.getsellerlist();
  }


  getsellerlist(){
    let that = this;
    this.couponservice.Seller_List(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.sellerlist=data;
        }
    })
}




}