import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApisModule } from './apis/apis.module';


import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { EditormdCallback } from './editormd-callback.component';


@NgModule({
    declarations: [
        AppComponent,
        EditormdCallback,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ApisModule,
        GrowlModule,
        BrowserAnimationsModule
    ],
    providers: [
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
