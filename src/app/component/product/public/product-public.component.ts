import { Component, OnInit,OnDestroy  } from '@angular/core';
import { AppService } from '../../../app.service';

import {HttpPaginationComponent} from '../../../shared/pagination/http-pagination.component';
import {ProductService} from '../../../service/product.service'

import { ToastService } from '../../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { code } from '../../../constant/status-code';
import { DialogModel } from '../../../shared/dialog/dialog.component';
import { DialogService } from './../../../shared/dialog/dialog.service';
import { ImgUploadComponent } from './../../../shared/img-upload/img-upload.component';

@Component({
  selector: 'c-public',
  templateUrl: './product-public.component.html'
})

export class PublicComponent {
    defaultImg = require('../../../../assets/img/upload_btn.png');
    event: any = {};
    imgIssue: string = `支持 jpg、jpeg、png 类型的图片，图片大小不超过 2MB`;
    text: string='这里面是内容..';


 //   @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private productservice:ProductService,
      private toastService:ToastService,
      private dialog: DialogService
    ) 
  {
    this.appService.titleEventEmitter.emit("添加商品");
  }

  ngOnInit(){
    console.log(this.text)
  }


  getimg(url){
      this.event.pic=url;
      console.log(url)
  }

  geteditor(editor){
    this.event.depiction=editor;
  }


  public(){
    let that = this;
    this.productservice.public(this.event,function(errCode){
        if(errCode==code.success)
        {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '发布成功！', 3000);
            that.toastService.toast(toastCfg);
        }
    })


}

}