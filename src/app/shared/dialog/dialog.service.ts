import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DialogModel } from './dialog.component';

@Injectable()
export class DialogService {
  private subject = new Subject<DialogModel>();
  private subjectB = new Subject<boolean>();

  getObservable() {
    //由于 Observable 是不可变的asObservable是为了把一个可观察对象包装起来并安全地分享
    return this.subject.asObservable();
  }
  show(dialogModel: DialogModel) {
    this.subject.next(dialogModel);
  }
  close() {
    this.subject.next({ title: '', content: '', hidden: true });
  }

  //确认和取消时推送 Observables<boolean>
  pushObservableBoolean(bool: boolean) {
    this.subjectB.next(bool);
  }
  //观察者获取 Observables<boolean>
  getObservableBoolean(): Observable<boolean> {
    
    return this.subjectB.asObservable();
  }
}
