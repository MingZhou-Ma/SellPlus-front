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
    {
      "id": "14",
      "parentId": "0",
      "name": "内容管理",
      "keyWord": "qxgl",
      "icon": 'fa-user',
      "isExpend": false,
      "children": [
        {
          "id": "34",
          "parentId": "14",
          "name": "Banner图管理",
          "keyWord": "yhtj",
          "icon": "fa-pencil-square-o",
          "url": "/home/content_management/banner"
        }, {
          "id": "35",
          "parentId": "14",
          "name": "文案管理",
          "keyWord": "yhlb",
          "icon": "fa-list-alt",
          "url": "/home/productInfo/productList"
        }, {
          "id": "36",
          "parentId": "14",
          "name": "资讯管理",
          "keyWord": "yhlb",
          "icon": "fa-list-alt",
          "url": "/home/content_management/news"
        }
      ]
  },
  {
    "id": "15",
    "parentId": "0",
    "name": "销售管理",
    "keyWord": "qxgl",
    "icon": 'fa-user',
    "isExpend": false,
    "children": [
      {
        "id": "37",
        "parentId": "15",
        "name": "增加销售",
        "keyWord": "yhtj",
        "icon": "fa-pencil-square-o",
        "url": "/home/content_management/add_seller"
      }, {
        "id": "38",
        "parentId": "15",
        "name": "销售列表",
        "keyWord": "yhlb",
        "icon": "fa-list-alt",
        "url": "/home/content_management/seller_list"
      }, 
    ]
},
{
  "id": "15",
  "parentId": "0",
  "name": "福利券管理",
  "keyWord": "qxgl",
  "icon": 'fa-user',
  "isExpend": false,
  "children": [
    {
      "id": "37",
      "parentId": "15",
      "name": "新建券",
      "keyWord": "yhtj",
      "icon": "fa-pencil-square-o",
      "url": "/home/content_management/new_coupon"
    }, {
      "id": "38",
      "parentId": "15",
      "name": "券列表",
      "keyWord": "yhlb",
      "icon": "fa-list-alt",
      "url": "/home/content_management/coupon_list"
    }, 
    {
      "id": "38",
      "parentId": "15",
      "name": "券核销",
      "keyWord": "yhlb",
      "icon": "fa-list-alt",
      "url": "/home/content_management/coupon_cancle"
    }, 
    {
      "id": "38",
      "parentId": "15",
      "name": "券核销记录",
      "keyWord": "yhlb",
      "icon": "fa-list-alt",
      "url": "/home/content_management/writeoff_list"
    }, 
  ]
},
{
  "id": "15",
  "parentId": "0",
  "name": "互动营销管理",
  "keyWord": "qxgl",
  "icon": 'fa-user',
  "isExpend": false,
  "children": [
    {
      "id": "37",
      "parentId": "15",
      "name": "老司机活动管理",
      "keyWord": "yhtj",
      "icon": "fa-pencil-square-o",
      "url": "/home/content_management/driver_setting"
    }, {
      "id": "38",
      "parentId": "15",
      "name": "学车心得分享管理",
      "keyWord": "yhlb",
      "icon": "fa-list-alt",
      "url": "/home/content_management/sharing_setting"
    }, 
  ]
},
{
  "id": "15",
  "parentId": "0",
  "name": "客户管理",
  "keyWord": "qxgl",
  "icon": 'fa-user',
  "isExpend": false,
  "children": [
    {
      "id": "37",
      "parentId": "15",
      "name": "用户列表",
      "keyWord": "yhtj",
      "icon": "fa-pencil-square-o",
      "url": "/home/content_management/customer_list"
    },
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


