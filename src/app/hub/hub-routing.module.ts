import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ShowArticleComponent } from './show-article/show-article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { EditInformationComponent } from './edit-information/edit-information.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateArticleGuard } from '../auth/update-article.guard';

const routes: Routes = [
    {
        path: '',
        component: HubComponent,
       
        children: [
            { path: '', component: HubHomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'articles/create/:type', canActivate: [AuthGuard],  component: CreateArticleComponent },
            { path: 'articles/:id/update',  canActivate: [AuthGuard, UpdateArticleGuard], component: UpdateArticleComponent },
            { path: 'articles/:id', component: ShowArticleComponent },
            { path: 'articles/list/:categoryId', component: ArticleListComponent },
            { path: 'users/:id',  canActivate: [AuthGuard], component: PersonalCenterComponent },
            { path: 'edit-info',  canActivate: [AuthGuard], component: EditInformationComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HubRoutingModule { }
