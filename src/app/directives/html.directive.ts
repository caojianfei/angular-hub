import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

declare let Prism;

declare let marked;

declare let editormd;

@Directive({
    selector: '[appHtml]'
})
export class HtmlDirective {

    @Input('appHtml') content: string;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        if (this.content) {
            this.el.nativeElement.innerHTML = marked(this.content); 
        }
        
        let html = Prism.highlightAll();
    }

}
