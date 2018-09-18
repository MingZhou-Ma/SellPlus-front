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
  selector: 'c-coupon_list',
  templateUrl: './coupon_list.component.html'
})

export class Coupon_ListComponent {
    defaultImg = require('../../../../assets/img/upload_btn.png');
    event: any = {};
    ojblist: any = {};
    modellist:any={};
    imgIssue: string = `支持 jpg、jpeg、png 类型的图片，图片大小不超过 2MB`;
    text: string='这里面是内容..';
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
    this.appService.titleEventEmitter.emit("券列表");
  }

  ngOnInit(){
      let that=this;
      this.getojblist();
      this.getmodellist();
  }


  tomodel(){
      this.status=false
      this.getmodellist();

  }
  toojb(){
    this.status=true
    this.getojblist();

}

  getojblist(){
    let that = this;
    this.couponservice.GetCouponOjbList(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.ojblist=data;
        }
    })
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



deletemodel(cid){
    let that=this;
    this.couponservice.DeleteCouponModel(cid,function(code){
      if(code==1000){
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功', 3000);
        that.toastService.toast(toastCfg);
        that.getmodellist();
      }
      else{
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除失败', 3000);
        that.toastService.toast(toastCfg);
      }
    })
  }


}