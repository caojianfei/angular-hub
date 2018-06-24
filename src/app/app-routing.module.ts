import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditormdCallback } from './editormd-callback.component';

const routes: Routes = [
    { path: '', loadChildren: './hub/hub.module#HubModule'},
    { path: 'upload_callback', component: EditormdCallback }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
