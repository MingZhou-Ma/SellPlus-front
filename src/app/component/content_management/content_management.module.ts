import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { PaginationModule}       from '../../shared/pagination/pagination.module';

import { Content_ManagementRoutingModule } from './content_management-routing.module';
import{BannerComponent}from './banner/banner.component'
import{SharedModule}from "../../shared/shared.module"
import {Content_ManagementService} from '../../service/content_management.service'

import { DialogModel } from '../../shared/dialog/dialog.component';
import { DialogService } from './../../shared/dialog/dialog.service';
import{EditorModule} from "../../shared/editor/editor.module";
import{Content_ManagementComponent} from "./content_management.component";
import  { ImageViewerModule}            from '../../shared/image-viewer/image-viewer.module';//图片查看器
import{NewsComponent} from './news/news.component';
import { DatePipe } from '@angular/common';

import {CouponService} from '../../service/coupon.service'
import {Coupon_ListComponent} from"./coupon_list/coupon_list.component"

import{NewCouponComponent} from "./new_coupon/new_coupon.component"
import{Coupon_CancleComponent} from "./coupon_cancle/coupon_cancle.component"
import {WriteOff_ListComponent} from "./writeoff_list/writeoff_list.component"
import{Customer_ListComponent} from "./customer_list/customer_lis.component"
import{Sharing_SettingComponent}from"./sharing_setting/sharing_setting.component"
import{Seller_ListComponent}from"./seller_list/seller_list.component"
import{Add_SellerComponent}from"./add_seller/add_seller.component"
import{Driver_SettingComponent}from"./driver_setting/driver_setting.component"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Content_ManagementRoutingModule,
    PaginationModule,
    SharedModule,
    EditorModule,
    ImageViewerModule
  ],
  declarations: [
    BannerComponent,
    NewsComponent,
    Content_ManagementComponent,
    NewCouponComponent,
    Coupon_ListComponent,
    Coupon_CancleComponent,
    WriteOff_ListComponent,
    Customer_ListComponent,
    Sharing_SettingComponent,
    Seller_ListComponent,
    Add_SellerComponent,
    Driver_SettingComponent,
  ],
  exports: [
  ],
  providers: [
    DatePipe,
    Content_ManagementService,
    DialogService,
    CouponService,
  ]
})
export class Content_ManagementModule { }
