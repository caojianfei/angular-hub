import { Directive, ElementRef, Input, HostListener, OnInit, OnChanges } from '@angular/core';

declare let Prism;

declare let marked;

declare let editormd;

@Directive({
    selector: '[appHtml]'
})
export class HtmlDirective implements OnInit, OnChanges {

    @Input('appHtml') content: string;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        console.log('appHtml init');
        if (this.content) {
            this.el.nativeElement.innerHTML = marked(this.content); 
        }
        Prism.highlightAll()
        
        //let html = Prism.highlightAll();
    }

    ngOnChanges() {
        //console.log('appHtml changes');
        //console.log(this.content)
        if (this.content) {
            this.el.nativeElement.innerHTML = marked(this.content); 
        }
        
        Prism.highlightAll();
    }

}
