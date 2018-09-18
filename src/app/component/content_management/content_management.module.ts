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
    WriteOff_ListComponent
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