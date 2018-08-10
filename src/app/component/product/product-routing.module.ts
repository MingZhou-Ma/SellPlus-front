import { NgModule }   from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ProductComponent} from "./product.component"
import { Component } from '@angular/core/src/metadata/directives';
import{ProductListComponent} from "./list/product-list.component"
import{PublicComponent} from "./public/product-public.component"
const productRoutes: Routes = [
    {
        path: '', component: ProductComponent,
        children: [
            {
            path:'productList',
            component:ProductListComponent
            },
            {
              path:"add_product",
              component:PublicComponent,
            }
        ]
    }
]


@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }