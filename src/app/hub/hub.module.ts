import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { HubRoutingModule } from './hub-routing.module';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { AuthModule } from '../auth/auth.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ShowArticleComponent } from './show-article/show-article.component';
import { HtmlDirective } from '../directives/html.directive';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HubRoutingModule,
        AutoCompleteModule
    ],
    providers: [
    ],
    declarations: [
        HubComponent,
        HubHomeComponent,
        CreateArticleComponent,
        ShowArticleComponent,
        HtmlDirective
    ]
})
export class HubModule { }
