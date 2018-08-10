import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { PaginationModule}       from '../../shared/pagination/pagination.module';

import { ProductRoutingModule } from './product-routing.module';
import{ProductComponent}from './product.component'
import{ProductService} from '../../service/product.service'
import{SharedModule}from "../../shared/shared.module"
import{ProductListComponent} from './list/product-list.component';
import{PublicComponent} from "./public/product-public.component";
import { DialogModel } from '../../shared/dialog/dialog.component';
import { DialogService } from './../../shared/dialog/dialog.service';
import{EditorModule} from "../../shared/editor/editor.module"
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    PaginationModule,
    SharedModule,
    EditorModule
  ],
  declarations: [
    ProductListComponent,
    ProductComponent,
    PublicComponent
  ],
  exports: [
  ],
  providers: [
    ProductService,
    DialogService]
})
export class ProductModule { }
