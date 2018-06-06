import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';

import { HubRoutingModule } from './hub-routing.module';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { AuthModule } from '../auth/auth.module';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ShowArticleComponent } from './show-article/show-article.component';
import { HtmlDirective } from '../directives/html.directive';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article-list/article/article.component';
import { QuestionComponent } from './article-list/question/question.component';
import { ShareComponent } from './article-list/share/share.component';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HubRoutingModule,
        AutoCompleteModule,
        TabViewModule,
        PaginatorModule
    ],
    providers: [
    ],
    declarations: [
        HubComponent,
        HubHomeComponent,
        CreateArticleComponent,
        ShowArticleComponent,
        HtmlDirective,
        ArticleListComponent,
        ArticleComponent,
        QuestionComponent,
        ShareComponent
    ]
})
export class HubModule { }
