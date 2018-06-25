import { Directive, OnInit, ElementRef } from '@angular/core';

declare let autoTextarea;


@Directive({
    selector: '[appAutoheight]'
})
export class AutoheightDirective implements OnInit {

    constructor(private el: ElementRef) { }

    ngOnInit() {
        //console.log(this.el.nativeElement);
        autoTextarea(this.el.nativeElement);

    }
}
