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
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import{NzDemoCardFlexibleContentComponent} from "./nz-demo-card-flexible-content/nz-demo-card-flexible-content"
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    MyDatePickerModule,
    ImageCropperModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgZorroAntdModule

  ],
  declarations: [
    DatepickerComponent,
    ImgUploadComponent,
    FroalaComponent,
    NzDemoCardFlexibleContentComponent,
  ],
  exports: [
    DatepickerComponent,
    ImgUploadComponent,
    FroalaComponent,
    NzDemoCardFlexibleContentComponent,
  ],
  providers:[{provide: NZ_I18N, useValue: zh_CN }]
})
export class SharedModule { }
