import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare let editormd;

@Component({
    selector: 'app-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

    @Output() contentChang = new EventEmitter<string>();

    @Input() options: any;

    @Input() markdown: string;

    @Input() styleClass: string = '';

    editor: any;

    constructor() { }

    ngOnInit() {
        //console.log(this.styleClass)
        this.createEditor();
    }

    createEditor() {

        let options = this.options ? this.options : {};

        let config: any = {};

        if (options.toolbarIcons) {
            config['toolbarIcons'] = this.options.toolbarIcons;
        }

        config['toolbarIcons'] = options.toolbarIcons ? options.toolbarIcons : [
            "undo", "redo", "|", 
                "quote", "hr", "|", 
                "list-ul", "list-ol", "|",
                "link", "image", "table",  "|",
                "watch", "preview", "fullscreen", "|", "clear"
        ];

        config['placeholder'] = options.placeholder ? options.placeholder : '';
        config['width'] = options.width ? options.width : '100%';
        config['height'] = options.width ? options.width : '600';
        config['watch'] = options.watch ? options.watch : false;
        config['toolbar'] = typeof options.toolbar === 'boolean' ? options.toolbar : true;

        this.editor = editormd("editormd", {
            toolbarIcons: config['toolbarIcons'],
            placeholder: config['placeholder'],
            width: config['width'],
            height: config['height'],
            path: 'assets/editormd/lib/',
            markdown: this.markdown ? this.markdown : '',
            codeFold: true,
            saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
            watch: config['watch'],                // 关闭实时预览
            htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启    
            toolbar  : config['toolbar'],             //关闭工具栏
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png"],
            imageUploadURL: "http://angularhub.test/api/image/editormd",
            crossDomainUpload: true,
            uploadCallbackURL : "http://localhost:4200/upload_callback",
            onload: function () {
                //console.log('onload', this);
                //this.fullscreen();
                //this.unwatch();
                //this.watch().fullscreen();

                //this.setMarkdown("#PHP");
                //this.width("100%");
                //this.height(480);
                //this.resize("100%", 640);
            }
        });
    }

    getMarkdown() {
        if (this.editor) {
            this.contentChang.emit(this.editor.getMarkdown());
        }
        //console.log(this.editor.getMarkdown());
        
    }

}
