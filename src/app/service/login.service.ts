import { Router } from '@angular/router';
import { code} from '../constant/status-code';
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
export class LoginService {

  SHA256 = require('../shared/util/sha256');

  constructor(
    private httpService: HttpService, 
    private router: Router,
    private toastService: ToastService,
  ) { }

  login(account: string, password: string,result:Function) {


    let hashCode = this.SHA256.convertToSHA256(password);
    console.log("hashCode", hashCode);

    let formData = new FormData();
    formData.append('account',account);
    formData.append('password',hashCode);

    this.httpService.post(api.login, formData, function (successful, data, res) {
        console.log(data['code']);
        let errCode = data['code'];
        result(data['code'])
        if (errCode == code.success) 
        {
          console.log(`管理员登录成功`);
          localStorage.setItem("accessToken",data['data']['accessToken']);
          localStorage.setItem('isLogin', 'yes');
        }
         else 
         {
          localStorage.setItem('isLogin', 'no');
         }
  }, function (successful, msg, err) {

    //localStorage.setItem('isLogin', 'no');

  });


  }

  logout() {
    localStorage.setItem('isLogin', 'no');
  }

}