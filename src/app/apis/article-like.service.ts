import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleLikeService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService,
        private authService: AuthService
    ) { }

    /**
     *点赞
     *
     * @param {number} articleId
     * @returns {Observable<void>}
     * @memberof ArticleLikeService
     */
    like(articleId: number): Observable<void> {
        let route: string = `/article/${articleId.toString()}/like`;
        let url = `${this.apiUrl}${route}`;

        let options = {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + (this.authService.authorization ? this.authService.authorization.access_token : null)
            }
        };

        return this.http.post<void>(url, null, options)
            .pipe(
                catchError(this.errorHandle.handleError)
            );
    }

    /**
     *取消点赞
     *
     * @param {number} articleId
     * @returns {Observable<void>}
     * @memberof ArticleLikeService
     */
    unlike(articleId: number): Observable<void> {
        let route: string = `/article/${articleId.toString()}/like`;
        let url = `${this.apiUrl}${route}`;

        let options = {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + (this.authService.authorization ? this.authService.authorization.access_token : null)
            }
        };

        return this.http.delete<void>(url, options).pipe(
            catchError(this.errorHandle.handleError)
        );
    }

    /**
     *获取当前登录用户对的点赞状态
     *
     * @param {number} articleId
     * @returns {Observable<{liked: boolean}>}
     * @memberof ArticleLikeService
     */
    islike(articleId: number): Observable<{ liked: boolean }> {
        let route: string = `/article/${articleId.toString()}/liked`;
        let url = `${this.apiUrl}${route}`;

        return this.http.get<{ liked: boolean }>(url, {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + (this.authService.authorization ? this.authService.authorization.access_token : null)
            }
        }).pipe(
            catchError(this.errorHandle.handleError)
        );
    }
}
