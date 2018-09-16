import { Router } from '@angular/router';
import { code } from '../constant/status-code';
import { api } from '../constant/api-url';
import { HttpService } from '../shared/http/http.service';
import { Injectable } from '@angular/core';

import { ToastService } from '../shared/toast/toast.service';

import { ToastConfig, ToastType } from '../shared/toast/toast-model';


import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class Content_ManagementService {
    
    constructor(
        private httpService: HttpService, 
        private router: Router,
        private toastService: ToastService,
    ){}

    GetContentInfo(getdata:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        console.log(accessToken)
        this.httpService.post(api.getMainInfo,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            if(errCode==code.success)
            {
                getdata(data['code'],data['data'])
            }
            else{
                
            }
        }, function(successful,data,res){}
    )
    }

    SetContentInfo(body:FormData,result:Function){
        // let formData=new FormData();
        // formData.append("pic",body.pic)
        // formData.append("name",body.name)
        // formData.append("intro",body.intro)
        // formData.append("depiction",body.depiction)
        // formData.append("price",body.price)
        let accessToken=localStorage.getItem('accessToken')
        body.append('token',accessToken)
        this.httpService.post(api.setMainInfo,body,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }

    // Delete(productid:string,result:Function){
    //     let formData=new FormData();
    //     formData.append("productid",productid)
    //     formData.append('token',accessToken)
    //     this.httpService.post(api.product_delete,formData,function(successful,data,res){
    //         console.log(data['code'])
    //         let errCode=data['code']
    //         result(errCode)
    //     })
    // }
///////////////////////////////////
    GetNewsList(getdata:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append('start',"0")
        formData.append('num',"999")
        this.httpService.post(api.getnewslist,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            if(errCode==code.success)
            {
                getdata(data['code'],data['data'])
            }
            else{
                
            }
        }, function(successful,data,res){}
    )
    }
    AddNews(body:any,result:Function){
        let formData=new FormData();
        formData.append("pic",body.pic)
        formData.append("title",body.title)
        formData.append("intro",body.intro)
        formData.append("content",body.depiction)
        formData.append("createDate",body.createDate)
        console.log(body.createData)
        formData.append("author","张先生")
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        this.httpService.post(api.addnews,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }
    DeleteNews(newsid:string,result:Function){
        let formData=new FormData();
        formData.append("articleid",newsid)
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        this.httpService.post(api.deletenews,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }

}