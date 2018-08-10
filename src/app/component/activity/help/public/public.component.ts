import { Component, OnInit,Input, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import {GetActInfoService} from '../../../../service/get-act-info.service'
import { ToastService } from '../../../../shared/toast/toast.service';
import { code } from '../../../../constant/status-code';
import {ProductService} from '../../../../service/product.service'

import { ToastConfig, ToastType } from '../../../../shared/toast/toast-model';

@Component({
  selector: 'c-public',
  templateUrl: './public.component.html'
})

export class PublicComponent {
    event: any = {};
    products:any[]=[];

    @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private getaiservice:GetActInfoService,
      private toastService:ToastService,
      private productservice:ProductService,

      
    ) 
  {
    this.appService.titleEventEmitter.emit("发布活动");
  }

  getimgEven(img){
    console.log(img);
  }
  ngOnInit(){
    this.GetProductList();
  }

  GetProductList(){
    let that=this;
    this.productservice.GetProductList(function(code,data){
      if(code==1000){
        that.products=data.content;
        //console.log(that.dataList)
      }
      else{
        ///
      }
    })
    }
  
  onDatepickerChange(fb,timeFlag) {
    if(timeFlag === 0) {
      this.event.starttime = fb;
      console.log(this.event.starttime)
      return;
    }
    if(timeFlag === 1) {
      this.event.endtime = fb;
      return;
    }
  }

public(){
    let that = this;
    this.getaiservice.act_public("0",this.event,function(errCode){
        if(errCode==code.success)
        {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '发布成功！', 3000);
            that.toastService.toast(toastCfg);
        }
    })


}
getProductChange(){
  console.log(this.event.id)
}

}