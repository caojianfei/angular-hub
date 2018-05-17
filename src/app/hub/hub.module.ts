import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing.module';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';

@NgModule({
    imports: [
        CommonModule,
        HubRoutingModule
    ],
    declarations: [
        HubComponent,
        HubHomeComponent
    ]
})
export class HubModule { }
