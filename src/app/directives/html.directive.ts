import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

declare let Prism;

@Directive({
    selector: '[appHtml]'
})
export class HtmlDirective {

    @Input('appHtml') content: string;

    constructor(private el: ElementRef) { }

    ngOnInit() {

        console.log(Prism);

        

        if (this.content) {
            this.el.nativeElement.innerHTML = this.content
        }
        
        let html = Prism.highlightAll();
    }

}
