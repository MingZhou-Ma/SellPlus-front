import { Component, OnInit,OnDestroy  } from '@angular/core';
import { AppService } from '../../../app.service';

import {HttpPaginationComponent} from '../../../shared/pagination/http-pagination.component';
import {Content_ManagementService} from '../../../service/content_management.service'
import {api} from"../../../constant/api-url"
import { ToastService } from '../../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { code } from '../../../constant/status-code';
import { DialogModel } from '../../../shared/dialog/dialog.component';
import { DialogService } from './../../../shared/dialog/dialog.service';
import { ImgUploadComponent } from './../../../shared/img-upload/img-upload.component';

@Component({
  selector: 'c-banner',
  templateUrl: './banner.component.html',
  styleUrls:['./banner.component.css'],
})

export class BannerComponent {
    defaultImg = require('../../../../assets/img/upload_btn.png');
    maininfo: any = {};
    rooturl:string="https://api.great-info.tech/";
    banner:string="null";
    imgIssue: string = `支持 jpg、jpeg、png 类型的图片，图片大小不超过 2MB`;
    text: string='这里面是内容..';
    options:any={
        url:'data-original',
        transition:false
    }
    instance:any;



  constructor(
      private appService: AppService,
      private content_managementservice:Content_ManagementService,
      private toastService:ToastService,
      private dialog: DialogService
    ) 
  {
    this.appService.titleEventEmitter.emit("Banner图管理");
  }

  ngOnInit(){
      this.getmaininfo();
  }


  getimg(url){
      this.banner=url;
      console.log(url)
  }



  getmaininfo(){
    let that = this;
    this.content_managementservice.GetContentInfo(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.maininfo=data;
        }
    })
  }
  setmaininfo(i){
    let that = this;
    let formData=new FormData();
    let num=i+1;
    let banner_name="banner"
    formData.append("banner"+num,that.banner)
    if(that.banner=="null"){
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '请先上传图片', 3000);
        that.toastService.toast(toastCfg);
    }
    else{
        this.content_managementservice.SetContentInfo(formData,function(errCode,data){
            if(errCode==code.success)
            {
                const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '更改成功', 3000);
                that.toastService.toast(toastCfg);
                that.getmaininfo();
            }
        })
    }

  }
  deletebanner(i){
    let that = this;
    let formData=new FormData();
    let num=i+1;
    let banner_name="banner"
    formData.append("banner"+num,"")
    this.content_managementservice.SetContentInfo(formData,function(errCode,data){
        if(errCode==code.success)
        {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功', 3000);
            that.toastService.toast(toastCfg);
            that.getmaininfo();
        }
    })
}
onViewInit(instance){
    this.instance=instance;
}

toggle(){
 this.instance.toggle();
}

}