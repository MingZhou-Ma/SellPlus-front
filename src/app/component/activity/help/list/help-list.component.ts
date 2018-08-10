import { Component, OnInit,ViewChild} from '@angular/core';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import {HttpPaginationComponent} from '../../../../shared/pagination/http-pagination.component';
import {GetActInfoService} from '../../../../service/get-act-info.service'
import { activityComponent } from '../../activity.component';
import {Act_info} from "../../../../constant/table"
import { ToastService } from '../../../../shared/toast/toast.service';

import { ToastConfig, ToastType } from '../../../../shared/toast/toast-model';
@Component({
  selector: 'c-help-list',
  templateUrl: './help-list.component.html'
})


export class HelpListComponent  {

  @ViewChild('hp', undefined) hp: HttpPaginationComponent;

  constructor(
    private appService: AppService,
    private getaiservice:GetActInfoService,
    private toastService: ToastService,
    private router:Router,
  ) 
  {
    this.appService.titleEventEmitter.emit("活动列表");
  }

  url:string="";
  act_type:"0";
  param:any = {
    name: 'admin',
    age: 16
  }

  dataList:any[]=[];

  pageList:Array<number>= [15, 25, 35]

  
  ngOnInit(){
    this.getActList();
    console.log(this.act_type)
  }
  onDataChanged($event){
    console.info($event)
  }


  
 


  getActList(){
    let that=this;
    this.getaiservice.getActList("0",function(code,data){
      if(code==1000){
        that.dataList=data.content;
        //console.log(that.dataList)
      }
      else{
        ///
      }
    })
    }

  
    delete(activityid){
      let that=this;
      this.getaiservice.delete(activityid,function(code){
        if(code==1000){
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功！', 3000);
          that.toastService.toast(toastCfg);
        }
      })
      // window.location.reload();
      this.ngOnInit()
        }
    
  }

