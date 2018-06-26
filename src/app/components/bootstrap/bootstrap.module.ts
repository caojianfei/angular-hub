import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { HtmlDirective } from '../../directives/html.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent,
        HtmlDirective
    ],
    exports: [
        ModalComponent,
        HtmlDirective
    ]
})
export class BootstrapModule { }
