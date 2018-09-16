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
export class ProductService {
    
    constructor(
        private httpService: HttpService, 
        private router: Router,
        private toastService: ToastService,
    ){}

    GetProductList(getdata:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        console.log(accessToken)
        this.httpService.post(api.get_product_list,formData,function(successful,data,res){
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

    public(body:any,result:Function){
        let formData=new FormData();
        formData.append("pic",body.pic)
        formData.append("name",body.name)
        formData.append("intro",body.intro)
        formData.append("depiction",body.depiction)
        formData.append("price",body.price)
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        this.httpService.post(api.product_public,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }

    delete(productid:string,result:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append("productid",productid)
        formData.append('token',accessToken)
        this.httpService.post(api.product_delete,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }
   


}