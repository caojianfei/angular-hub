import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[appHtml]'
})
export class HtmlDirective {

    @Input('appHtml') content: string;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        if (this.content) {
            this.el.nativeElement.innerHTML = this.content
        }
    }

}
