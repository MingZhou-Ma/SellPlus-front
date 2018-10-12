import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { PaginationModule}       from '../../shared/pagination/pagination.module';

import { ActivityRoutingModule } from './activity-routing.module';
import{activityComponent}from './activity.component'
import{HelpListComponent} from './help/list/help-list.component'
import{GetActInfoService} from '../../service/get-act-info.service'
import{PublicComponent} from "./help/public/public.component"
import{SharedModule}from "../../shared/shared.module"
import {ProductService} from '../../service/product.service'
import {CouponService} from '../../service/coupon.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivityRoutingModule,
    PaginationModule,
    SharedModule,
  ],
  declarations: [
    activityComponent,
    HelpListComponent,
    PublicComponent,
  ],
  exports: [
  ],
  providers: [
    GetActInfoService,
    ProductService,
    CouponService
  ]
})
export class ActModule { }
