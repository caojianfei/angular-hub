import { NgModule, InjectionToken, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const BASE_URL = new InjectionToken<string>('The api base url', {
    providedIn: 'root',
    factory: () => `${environment.api.host}${environment.api.prefix}`
});

export const ACCEPT = new InjectionToken<string>('The api request accept in header', {
    providedIn: 'root',
    factory: () => 'application/psr.angularhub.v1+json'
})


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [

    ],
    exports: [
        HttpClientModule
    ]
})
export class ApisModule { }
