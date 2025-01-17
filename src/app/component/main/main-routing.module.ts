import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MainComponent }   from './main.component';

/**
 * 主体路由
 */
const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
  {
    path:"actInfo",
    loadChildren: 'app/component/activity/activity.module#ActModule'
  },
  {
    path:"productInfo",
    loadChildren:"app/component/product/product.module#ProductModule"
  },
  {
    path:"content_management",
    loadChildren:"app/component/content_management/content_management.module#Content_ManagementModule",
  }
]}
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
