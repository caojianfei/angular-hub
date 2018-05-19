import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [
    {
        path: '',
        component: HubComponent,
        children: [
            { path: '', component: HubHomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HubRoutingModule { }
