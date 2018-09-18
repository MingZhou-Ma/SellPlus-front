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
export class CouponService {
    
    constructor(
        private httpService: HttpService, 
        private router: Router,
        private toastService: ToastService,
    ){}

    GetCouponOjbList(getdata:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append('start',"0")
        formData.append('num',"999")
        formData.append('token',accessToken)
        this.httpService.post(api.getCouponObj,formData,function(successful,data,res){
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



    //获取全部的优惠卷模板
    GetCouponModelList(getdata:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append('start',"0")
        formData.append('num',"999")
        formData.append('token',accessToken)

        this.httpService.post(api.getCouponModel,formData,function(successful,data,res){
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
    AddCoupon(body:any,result:Function){
        let formData=new FormData();
        formData.append("content",body.content)
        formData.append("finite",body.finite)
        formData.append("num",body.num)
        formData.append("startDate",body.startDate)
        formData.append("endDate",body.endDate)
        formData.append("amount",body.amount)
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        this.httpService.post(api.addCouponModel,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }
    DeleteCouponModel(cid:string,result:Function){
        let formData=new FormData();
        formData.append("cid",cid)
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        this.httpService.post(api.delCouponModel,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }

    WriteOffCoupons(code:string,result:Function){
        let formData=new FormData();
        formData.append("code",code)
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',accessToken)
        this.httpService.post(api.writeOffCoupons,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }

    WriteOffHistory(getdata:Function){
        let formData=new FormData();
        let accessToken=localStorage.getItem('accessToken')
        formData.append('start',"0")
        formData.append('num',"999")
        formData.append('token',accessToken)
        this.httpService.post(api.writeOffHistory,formData,function(successful,data,res){
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
}