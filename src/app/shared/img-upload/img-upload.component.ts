import { setTimeout } from 'timers';
import { DialogService } from '../../shared/dialog/dialog.service';
import { EventEmitter} from '@angular/core';
import { code } from './../../constant/status-code';
import { base,api } from '../../constant/api-url';
import { HttpService } from '../http/http.service';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';

import { ToastService } from '../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../shared/toast/toast-model';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.css']
})
export class ImgUploadComponent implements OnInit {

  imgIssue: string = `支持 jpg、jpeg、png 类型的图片，图片大小不超过 2MB，剪裁完成后请点击右下角确认按钮完成上传`;
  img:any;
  data: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  @Input() event;
  disabledUpload = false;
  status:number;
  fileName;

  @Output() coverChange = new EventEmitter();

  constructor(private toastService: ToastService, private http: HttpService,
    private dialog: DialogService) {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 240;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 240;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.croppingClass = 'img-result';
    this.cropperSettings.touchRadius = 20;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(0,0,0,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 1;
    this.cropperSettings.cropperClass = 'before-select';
    this.cropperSettings.croppingClass = 'after-select';
    this.data = {};
  }

  ngOnInit() {
    this.status=0;
  }

  //检查图片并获取信息
  isImgValid(img): boolean {
    let MB = 2 ** 20;     //  B
    let max = 2;             //多少 MB
    let size = img.size;
    console.log('size:', size);

    if (size > max * MB) {
      return false;
    }
    return true;
  }

  base64ToFile(base64) {

    var bytes = window.atob(base64.split(',')[1]);        //去掉url的头，并转换为byte  

    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }

    return new File([ab], this.fileName, { type: 'image/png' });
  }

  //选择文件
  onFileChange(event) {
    let image = new Image();
    let file = event.target.files[0];
    console.log('选择', file);
    this.fileName = file.name;
    //清除 value 之后可连续选相同文件
    event.target.value = "";

    let reader = new FileReader();

    //若文件大小超出限制则不予处理
    if (!this.isImgValid(file)) {
      const toastCfg = new ToastConfig(ToastType.ERROR ,'', '图片大小超出限制', 3000);
      this.toastService.toast(toastCfg);
      return;
    }

    reader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      //设置到剪裁画板上
      this.cropper.setImage(image);
    };
    reader.readAsDataURL(file);
  }

  //点击上传文件
  clickUpload() {
    this.status=1;
    if (!this.data.image) {
      const toastCfg = new ToastConfig(ToastType.ERROR ,'', '抱歉，未正确选择图片', 3000);
      this.toastService.toast(toastCfg);
      return;
    }
    this.disabledUpload = true;
    setTimeout(() => { this.disabledUpload = false; }, 1000)
    // console.log(this.data);
    this.uploadFile(this.data.image);
  }

  //上传文件
  uploadFile(base64) {
    // console.log(base64);
    //base64 转文件
    // let img = new File([base64], this.fileName, { type: "image/*" });
    let that=this;
    // let img = this.base64ToFile(base64);
    console.log(base64);

    //上传中状态
    const toastCfg = new ToastConfig(ToastType.INFO ,'', '图片上传中', 3000);
    this.toastService.toast(toastCfg);



      let formData = new FormData();
      formData.append('img', base64);
      this.http.post(api.imgupload,formData,function(successful,data,res){
        let errCode=data['code']
        if(errCode=code.success)
        {
          that.img = data['data'].url;
          const toastCfg = new ToastConfig(ToastType.SUCCESS ,'', '图片上传成功', 3000);
          that.toastService.toast(toastCfg);
          that.coverChange.emit(that.img)
        }
        else{
          const toastCfg = new ToastConfig(ToastType.ERROR ,'', '图片上传失败', 3000);
          that.toastService.toast(toastCfg);
        }
      })

  }
}
