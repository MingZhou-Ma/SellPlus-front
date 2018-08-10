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
export class GetActInfoService {
    
    constructor(
        private httpService: HttpService, 
        private router: Router,
        private toastService: ToastService,
    ){}

    getActList(act_type:string,getdata:Function){
        let formData=new FormData();
        formData.append('act_type',act_type);
        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',"mertoken")
        console.log(accessToken)
        this.httpService.post(api.get_act_list,formData,function(successful,data,res){
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

    act_public(act_type:string,body:any,result:Function){
        let formData=new FormData();
        formData.append("isGroup",act_type)
        formData.append("product.id",body.id)
        formData.append("headline",body.title)
        formData.append("helpNum",body.helpNum)
        formData.append("groupPrice",body.groupPrice)
        formData.append("startDate",body.starttime)
        formData.append("endDate",body.endtime)

        let accessToken=localStorage.getItem('accessToken')
        formData.append('token',"mertoken")

        this.httpService.post(api.act_public,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }

    delete(activityid:string,result:Function){
        let formData=new FormData();
        formData.append("activityid",activityid)
        formData.append('token',"mertoken")
        this.httpService.post(api.act_detele,formData,function(successful,data,res){
            console.log(data['code'])
            let errCode=data['code']
            result(errCode)
        })
    }
}