import { Component, OnInit,OnDestroy  } from '@angular/core';
import { AppService } from '../../../app.service';

import {Content_ManagementService} from '../../../service/content_management.service'
import {api} from"../../../constant/api-url"
import { ToastService } from '../../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { code } from '../../../constant/status-code';
import { DialogModel } from '../../../shared/dialog/dialog.component';
import { DialogService } from './../../../shared/dialog/dialog.service';
import { ImgUploadComponent } from './../../../shared/img-upload/img-upload.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'c-news',
  templateUrl: './news.component.html'
})

export class NewsComponent {
    defaultImg = require('../../../../assets/img/upload_btn.png');
    event: any = {};
    maininfo: any = {};
    imgIssue: string = `支持 jpg、jpeg、png 类型的图片，图片大小不超过 2MB`;
    text: string='这里面是内容..';
    status:boolean=false;
    dateTime: Date;


 //   @Output() baseinfoChange = new EventEmitter<any>();

  constructor(
      private appService: AppService,
      private content_managementservice:Content_ManagementService,
      private toastService:ToastService,
      private dialog: DialogService,
      private datePipe: DatePipe,
    ) 
  {
    this.appService.titleEventEmitter.emit("资讯管理");
  }

  ngOnInit(){
      let that=this;
      that.getnewslist();
      that.getdata();
  }

  getdata(){
    let that=this;
    that.dateTime = new Date();
    that.event.createDate=this.datePipe.transform(that.dateTime, 'yyyy-MM-dd HH:mm:ss')
    console.log('dateTime:',that.event.createDate);
  }


  getimg(url){
      this.event.pic=url;
      console.log(url)
  }

  geteditor(editor){
    this.event.depiction=editor;
    console.log(editor)
  }
  tolist(){
      this.status=false
      this.getnewslist();
  }
  toadd(){
    this.status=true
}

  getnewslist(){
    let that = this;
    this.content_managementservice.GetNewsList(function(errCode,data){
        console.log(data)
        if(errCode==code.success)
        {
            that.maininfo=data;
        }
    })
}

  addnews(){
    let that = this;
    this.content_managementservice.AddNews(this.event,function(errCode){
        if(errCode==code.success)
        {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '添加资讯成功', 3000);
            that.toastService.toast(toastCfg);
        }
    })
}

deletenews(newsid){
    let that=this;
    this.content_managementservice.DeleteNews(newsid,function(code){
      if(code==1000){
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功', 3000);
        that.toastService.toast(toastCfg);
        that.getnewslist();
      }
      else{
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除失败', 3000);
        that.toastService.toast(toastCfg);
      }
    })
  }


}