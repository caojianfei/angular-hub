import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing.module';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HubRoutingModule,
    ],
    declarations: [
        HubComponent,
        HubHomeComponent
    ]
})
export class HubModule { }
