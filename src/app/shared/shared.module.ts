import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { PaginationModule}       from '../shared/pagination/pagination.module';

import{DatepickerComponent} from "../shared/datepicker/datepicker.component"
import { MyDatePickerModule } from 'mydatepicker';
import {ImgUploadComponent} from"./img-upload/img-upload.component";
import { ImageCropperModule } from 'ng2-img-cropper/src/imageCropperModule';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FroalaComponent } from './froala/froala.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    MyDatePickerModule,
    ImageCropperModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  declarations: [
    DatepickerComponent,
    ImgUploadComponent,
    FroalaComponent,
  ],
  exports: [
    DatepickerComponent,
    ImgUploadComponent,
    FroalaComponent,
  ],
  providers: []
})
export class SharedModule { }
