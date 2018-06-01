import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { Captcha } from './models/responses/captcha';
import { User } from './models/responses/user';
import { Register } from './models/requests/register';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService
    ) { }


    register(data: Register): Observable<User> {
        let route: string = '/users';
        let url = `${this.apiUrl}${route}`;
        let options = {
            headers: {
                Accept: this.accept
            }
        };

        return this.http.post<User>(url, data, options).pipe(
            catchError(this.errorHandle.handleError)
        );
    }


}
