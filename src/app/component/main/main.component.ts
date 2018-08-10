import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { MainData } from '../main/main-model';
import { ModalService } from '../../shared/modal/modal.service';
import { ConfirmConfig } from '../../shared/modal/modal-model';

import { AppService } from '../../app.service';

/**
 * 主体组件
 */
@Component({
  selector: 'c-main',
  templateUrl: './main.component.html',
  styleUrls: ['.//main.component.scss']
})
export class MainComponent implements OnInit {

  //切换导航
  toggleDescTip: string = "点击关闭导航菜单";

  //切换导航标识
  navClose: boolean = false;




  //用户数据
  mainData: MainData = {
    userData: {
      userName: "张先生",
      userAvatar: "./assets/img/user-header.png",
      mobilePhone: "1895090***2",
      email: "332557712@qq.com",
      positions: "马上出发！",
    },
    menuData: [

      {
        "id": "20",
        "parentId": "0",
        "name": "活动管理",
        "keyWord": "qxgl",
        "icon": 'fa-user',
        "isExpend": false,
        "children": [
        {
          "id": "21",
          "parentId": "20",
          "name": "助力活动",
          "keyWord": "yhgl",
          "icon": "fa-user-circle-o",
          "isExpend": false,
          "children": [{
            "id": "22",
            "parentId": "21",
            "name": "发布活动",
            "keyWord": "yhtj",
            "icon": "fa-pencil-square-o",
            "url": "/home/actInfo/public"
          }, {
            "id": "23",
            "parentId": "21",
            "name": "活动列表",
            "keyWord": "yhlb",
            "icon": "fa-list-alt",
            "url": "/home/actInfo/helpList"
          }]
        }]
      },

      {
        "id": "13",
        "parentId": "0",
        "name": "商品管理",
        "keyWord": "qxgl",
        "icon": 'fa-user',
        "isExpend": false,
        "children": [
          {
            "id": "32",
            "parentId": "13",
            "name": "添加商品",
            "keyWord": "yhtj",
            "icon": "fa-pencil-square-o",
            "url": "/home/productInfo/add_product"
          }, {
            "id": "33",
            "parentId": "13",
            "name": "商品列表",
            "keyWord": "yhlb",
            "icon": "fa-list-alt",
            "url": "/home/productInfo/productList"
          }
        ]
    },
    ]}

  title: string = "首页";


  constructor(private router: Router, private modalService: ModalService, private ngbModalService: NgbModal, private appService: AppService) {
    this.appService.titleEventEmitter.subscribe((value: string) => {
      if (value) {
        this.title = value;
      }
    })
  }


  /**
   * 初始化
   */
  ngOnInit() {
  }

  /**
    * 切换导航
   */
  toggleNav() {
    this.navClose = !this.navClose;
    if (this.navClose) {
      this.toggleDescTip = "点击展开导航菜单";
    } else {
      this.toggleDescTip = "点击关闭导航菜单";
    }
  }

  /**
   * 跳转首页
   */
  toHome() {
    this.title = "首页";
    this.router.navigate(['/app/home']);
  }

  /**
   * 个人资料
   */
  userInfo() {
    this.router.navigate(['/app/user/userInfo']);
  }

  /**
   * 头像更换
   */



  /**
   * 退出系统
   */
  exitSys() {
    let exitSysCfg = new ConfirmConfig('您确定退出系统吗？');
    this.modalService.confirm(exitSysCfg).then((result) => {
      if (result.status == "approved") {
        this.router.navigate(['/login']);
      }
    }, (reason) => {
    });
  }





}


