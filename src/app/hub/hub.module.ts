import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HubRoutingModule } from './hub-routing.module';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { AuthModule } from '../auth/auth.module';
import { CreateArticleComponent } from './create-article/create-article.component';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HubRoutingModule,
    ],
    providers: [
    ],
    declarations: [
        HubComponent,
        HubHomeComponent,
        CreateArticleComponent
    ]
})
export class HubModule { }
