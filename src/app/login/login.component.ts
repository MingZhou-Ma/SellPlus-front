import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { HttpService } from '../shared/http/http.service';

import { ToastService } from '../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../shared/toast/toast-model';
import { Utils } from "../shared/util/utils";

import {LoginService} from "../service/login.service"
import { ConfirmConfig, AlertType, AlertConfig } from '../shared/modal/modal-model';
import { ModalService } from '../shared/modal/modal.service';



@Component({
  selector: 'c-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  account: string = "";
  password: string = "";

  constructor
  (
    private router: Router, 
    private toastService: ToastService, 
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private loginService:LoginService,
    private modalService:ModalService,
  ) 
    {
    let accountFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]));
    let passwordFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)]));

    this.loginForm = this.formBuilder.group({
      account: accountFc,
      password: passwordFc
    });
  }

  /**
  * 初始化
  */
  ngOnInit() {
    localStorage.setItem('isLogin', 'no');

    this.loginForm.value
    console.log(this.loginForm)
  }


  /**
   * 登录
   */
  login() {
    this.loginService.login(this.loginForm.value.account, this.loginForm.value.password);

    
    status=localStorage.getItem('isLogin')
    console.log(localStorage.getItem('isLogin'))


    this.router.navigate(['/home']);
  }

  register(){
    const alertCfg = new AlertConfig(AlertType.INFO, '您好', '请联系王先生：137XXXXXXXX或微信：XXXXXXX');
    this.modalService.alert(alertCfg);
//    this.router.navigate(['register']);
  }

}