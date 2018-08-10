import { Component,ViewChild,ViewContainerRef,
         ComponentFactoryResolver,Type,ElementRef,OnDestroy,
         Renderer2 } from '@angular/core';
import {DialogService} from './dialog.service';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnDestroy{
    @ViewChild('container', { read: ViewContainerRef })
    container:ViewContainerRef;
    @ViewChild('dialog') dialogDiv:ElementRef;
    @ViewChild('modelDialog') modelDialog:ElementRef;
    componentRef:ComponentRef<Component>;
    isSimpleText:boolean=true;      //是否是简单的文本弹框
    subscription:Subscription;
    model:DialogModel={             //弹框数据模型title,content是必选内容
        title:'提示',
        content:'你好',
        hidden:true
    };
    constructor(
        private dialogService:DialogService,
        private componentFactoryResolver:ComponentFactoryResolver,
        private  render:Renderer2) {
        //dialogService推送消息时，观察者在这接收
        this.subscription=this.dialogService.getObservable().subscribe(
            (dialogModel)=>{
                //为div添加class
                this.render.addClass(this.dialogDiv.nativeElement,'dialog-appear');
                this.model=dialogModel;
                if(this.model.hidden) this.close();
                if(this.model.width){
                    this.render.setStyle(this.modelDialog.nativeElement,'max-width',`${this.model.width}px`);
                    let widthMedia=window.matchMedia('(min-width: 576px)');
                    widthMedia.addListener((widthMedia)=>{
                        if(widthMedia.matches){
                            this.render.setStyle(this.modelDialog.nativeElement,'max-width',`${this.model.width}px`);
                        }else{
                            this.render.removeStyle(this.modelDialog.nativeElement,'max-width');
                        }
                    })
                }else{
                    this.render.removeStyle(this.modelDialog.nativeElement,'max-width');
                }
                if(typeof this.model.content==='string'){
                    //推送的数据模型中content为字符串
                    this.isSimpleText=true;
                    this.container.clear();
                }else{
                    //推送的数据模型content为Component类型
                    this.isSimpleText=false;
                    this.createComponent(this.model.content,this.model.params);
                }
            }
        )
    }
    close(){
        if(this.model.closeButton&&this.model.closeButton.func){
            this.model.closeButton.func();
        }
        this.model.hidden=true;
        this.container.clear();
        this.render.removeClass(this.dialogDiv.nativeElement,'dialog-appear');
    }
    confirm(){
        if(this.model.confirmButton&&this.model.confirmButton.func){
            this.model.confirmButton.func();
        }else {
            this.close();
        }
    }
    clickOutSide(target){
        if(target.id!='dialog-container') return;
        if(this.model.clickOutSideFunc){
            this.model.clickOutSideFunc();
        }else this.close();
    }
    createComponent(type:Type<any>,params?:any){
        let componentFactory=this.componentFactoryResolver.resolveComponentFactory(type);
        this.container.clear();
        this.componentRef=this.container.createComponent(componentFactory);
        for(const param in params){
            this.componentRef.instance[param]=params[param];
        }
    }
    ngOnDestroy(){
        if(this.subscription){
            this.subscription.unsubscribe();
        }
        if(this.componentRef)
            this.componentRef.destroy();
    }

}
export interface DialogModel{
    title:string;
    hidden?:boolean;
    closeButton?:buttonModel;
    clickOutSideFunc?:Function;
    confirmButton?:buttonModel;
    content:Type<any>|string;
    width?:number;
    params?:any;        //键值对
}
export interface buttonModel{
    name?:string;
    func?:Function;
    hidden?:boolean;
}
