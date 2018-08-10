import { code } from './../../constant/status-code';
import { api,base } from '../../constant/api-url';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as jquery from 'jquery';

@Component({
  selector: 'app-froala',
  templateUrl: './froala.component.html',
  styleUrls: ['./froala.component.css']
})
export class FroalaComponent implements OnInit {
  @Output() froala = new EventEmitter<any>();

  option: Object;
  @Input() minHeight: number = 450;
  @Input() readonly: boolean = false;

  constructor() { }

  //Froala 的事件处理有点不稳 于是采用自定义双向绑定
  _froalaText: string;
  @Output() froalaTextChange = new EventEmitter();



  set froalaText(val) {
    /* 可做自定义逻辑处理 */
    this._froalaText = val;
    this.froalaTextChange.emit(this._froalaText);
  }


  ngOnInit() {
    // 在事件中要使用外部的this,因为函数内部也有this所以讲this的值赋给that
    let that = this;
    // 参数配置
    // https://www.froala.com/wysiwyg-editor/docs/options?utm_expid=98676916-2.gb-QgBReTCCS2F60oBIe_g.0&utm_referrer=https%3A%2F%2Fwww.google.com%2F#language
    this.option = {
      language: "zh_cn",
      placeholderText: "请输入内容",
      charCounterCount: true,
      charCounterMax: 2000,
      toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'embedly', 'insertTable', '|', 'insertHR', 'clearFormatting', '|', 'spellChecker', 'help', '|', 'undo', 'redo'],
      codeMirror: false, // 高亮显示html代码
      codeMirrorOptions: { // 配置html代码参数
        tabSize: 2
      },
      heightMin: that.minHeight,
      imageUploadURL: api.uploadpic,
      imageUploadMethod: "POST",
      // requestWithCORS: false,
      requestWithCredentials: true,
      htmlAllowedAttrs: ['readonly'],

      events: {
        'froalaEditor.image.uploaded': function (e, editor, response) {

          let url = base+(JSON.parse(response)).data.url;
          console.log(url)
          editor.image.insert(url, false, null, editor.image.get(), response);
          return false;
        },
        'froalaEditor.image.error': function (e, editor, error, response) {
          console.log('error' + error.code + ' ' + error.message);
        },
        'froalaEditor.initialized': function (e, editor) {
          if (that.readonly) {
            editor.edit.off();
          }
        }
      }
    }

    console.log(this._froalaText)
  }
}
