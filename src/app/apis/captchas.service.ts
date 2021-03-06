import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { Captcha } from './models/responses/captcha';

@Injectable({
    providedIn: 'root'
})
export class CaptchasService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService
    ) { }

    /**
     * 获取验证码图片
     * 
     * @returns {Observable<Captcha>} 
     * @memberof CaptchasService
     */
    getCaptchas(): Observable<Captcha> {
        let route: string = '/captchas';
        let url = `${this.apiUrl}${route}`;
        let options = {
            headers: {
                Accept: this.accept
            }
        };

        return this.http.post<Captcha>(url, null, options).pipe(
            catchError(this.errorHandle.handleError)
        );
    }


}
