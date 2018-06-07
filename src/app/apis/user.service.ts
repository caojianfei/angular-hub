import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { Captcha } from './models/responses/captcha';
import { User } from './models/responses/user';
import { Register } from './models/requests/register';
import { Authorization } from './models/responses/authorization';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService,
        private authService: AuthService
    ) { }

    /**
     * 用户注册
     * 
     * @param {Register} data 
     * @returns {Observable<User>} 
     * @memberof UserService
     */
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

    /**
     * 用户登录
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns 
     * @memberof UserService
     */
    login(username: string, password: string) {
        let route = '/authorizations';
        let url = `${this.apiUrl}${route}`;
        let options = {
            headers: {
                Accept: this.accept
            }
        }

        return this.http.post<Authorization>(url, { email: username, password: password }, options).pipe(
            catchError(this.errorHandle.handleError)
        );
    }

    /**
     *获取当前登录的用户
     *
     * @returns {Observable<User>}
     * @memberof UserService
     */
    me(): Observable<User> {
        let route = '/user';
        let url = `${this.apiUrl}${route}`;

        return this.http.get<User>(url, {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + this.authService.authorization.access_token
            }
        }).pipe(
            catchError(this.errorHandle.handleError)
        );
    }


}
