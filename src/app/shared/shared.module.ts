import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { PaginationModule}       from '../shared/pagination/pagination.module';
import  { ImageViewerModule}            from './image-viewer/image-viewer.module';//图片查看器

import{DatepickerComponent} from "../shared/datepicker/datepicker.component"
import { MyDatePickerModule } from 'mydatepicker';
import {ImgUploadComponent} from"./img-upload/img-upload.component";
import { ImageCropperModule } from 'ng2-img-cropper/src/imageCropperModule';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FroalaComponent } from './froala/froala.component';
import{DialogComponent} from "./dialog/dialog.component"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    MyDatePickerModule,
    ImageCropperModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ImageViewerModule,

  ],
  declarations: [
    DatepickerComponent,
    ImgUploadComponent,
    FroalaComponent,
    DialogComponent,
  ],
  exports: [
    DatepickerComponent,
    ImgUploadComponent,
    FroalaComponent,
    DialogComponent,

  ],
  providers:[]
})
export class SharedModule { }
