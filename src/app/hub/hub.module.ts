import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

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
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { EditInformationComponent } from './edit-information/edit-information.component';
import { ReplayArticleComponent } from './replay-article/replay-article.component';
import { MarkdownEditorComponent } from '../components/markdown-editor/markdown-editor.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { AutoheightDirective } from '../directives/autoheight.directive';
import { BootstrapModule } from '../components/bootstrap/bootstrap.module';

@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        HubRoutingModule,
        AutoCompleteModule,
        TabViewModule,
        PaginatorModule,
        FileUploadModule,
        TooltipModule,
        DialogModule,
        ButtonModule,
        BootstrapModule
    ],
    providers: [
    ],
    declarations: [
        HubComponent,
        HubHomeComponent,
        CreateArticleComponent,
        ShowArticleComponent,
        //HtmlDirective,
        AutoheightDirective,
        ArticleListComponent,
        ArticleComponent,
        QuestionComponent,
        ShareComponent,
        PersonalCenterComponent,
        EditInformationComponent,
        ReplayArticleComponent,
        MarkdownEditorComponent,
        UpdateArticleComponent
    ]
})
export class HubModule { }
