import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{BannerComponent}from './banner/banner.component'
import { Component } from '@angular/core/src/metadata/directives';
import{Content_ManagementComponent} from "./content_management.component";
import{NewsComponent} from './news/news.component';
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