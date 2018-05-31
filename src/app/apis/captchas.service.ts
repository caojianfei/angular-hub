import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import { BASE_URL, ACCEPT } from './apis.module';

@Injectable({
    providedIn: 'root'
})
export class CaptchasService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient
    ) { }

    getCaptchas() {
        let route: string = '/captchas';
        let url = `${this.apiUrl}${route}`;
        let options = {
            headers: {
                Accept: this.accept
            }
        };

        return this.http.post(url, null, options);
    }

}
