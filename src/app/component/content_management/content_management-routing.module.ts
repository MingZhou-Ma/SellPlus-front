import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{BannerComponent}from './banner/banner.component'
import { Component } from '@angular/core/src/metadata/directives';
import{Content_ManagementComponent} from "./content_management.component";
import{NewsComponent} from './news/news.component';
import{NewCouponComponent} from "./new_coupon/new_coupon.component";
import {Coupon_ListComponent} from"./coupon_list/coupon_list.component"
import{Coupon_CancleComponent} from "./coupon_cancle/coupon_cancle.component"
import {WriteOff_ListComponent} from "./writeoff_list/writeoff_list.component"
import{Customer_ListComponent} from "./customer_list/customer_lis.component"
import{Sharing_SettingComponent}from"./sharing_setting/sharing_setting.component"
import{Seller_ListComponent}from"./seller_list/seller_list.component"
import{Add_SellerComponent}from"./add_seller/add_seller.component"
import{Driver_SettingComponent}from"./driver_setting/driver_setting.component"
const content_managementRoutes: Routes = [
    {
        path: '', component: Content_ManagementComponent,
        children: [
            {
            path:'banner',
            component:BannerComponent
            },
            {
              path:'news',
              component:NewsComponent
            },
            {
              path:'new_coupon',
              component:NewCouponComponent
            },
            {
              path:'coupon_list',
              component:Coupon_ListComponent
            },
            {
              path:'coupon_cancle',
              component:Coupon_CancleComponent
            },
            {
              path:'writeoff_list',
              component:WriteOff_ListComponent
            },
            {
              path:'customer_list',
              component:Customer_ListComponent
            },
            {
              path:'sharing_setting',
              component:Sharing_SettingComponent
            },
            {
              path:'seller_list',
              component:Seller_ListComponent
            },
            {
              path:'add_seller',
              component:Add_SellerComponent
            },
            {
              path:'driver_setting',
              component:Driver_SettingComponent
            },
        ]
    }
]


@NgModule({
  imports: [
    RouterModule.forChild(content_managementRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Content_ManagementRoutingModule { }