import { Component, OnInit,ViewChild} from '@angular/core';
import { AppService } from '../../../app.service';

import {HttpPaginationComponent} from '../../../shared/pagination/http-pagination.component';
import {ProductService} from '../../../service/product.service'

import { ToastService } from '../../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { Router } from '@angular/router/src/router';
@Component({
  selector: 'c-product-list',
  templateUrl: './product-list.component.html'
})


export class ProductListComponent  {

  @ViewChild('hp', undefined) hp: HttpPaginationComponent;

  constructor(
    private appService: AppService,
    private productservice:ProductService,
    private toastService: ToastService,

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
    this.GetProductList();
    console.log(this.act_type)
  }
  onDataChanged($event){
    console.info($event)
  }


  
 


  GetProductList(){
    let that=this;
    this.productservice.GetProductList(function(code,data){
      if(code==1000){
        that.dataList=data.content;
        //console.log(that.dataList)
      }
      else{
        ///
      }
    })
    }

  
    delete(productid){
      let that=this;
      this.productservice.delete(productid,function(code){
        if(code==1000){
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功！', 3000);
          that.toastService.toast(toastCfg);
        }
      })
    }
  }

