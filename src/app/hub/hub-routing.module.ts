import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HubComponent } from './hub.component';
import { HubHomeComponent } from './hub-home/hub-home.component';

const routes: Routes = [
    {
        path: '',
        component: HubComponent,
        children: [
            { path: '', component: HubHomeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HubRoutingModule { }
