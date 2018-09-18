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
            }
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