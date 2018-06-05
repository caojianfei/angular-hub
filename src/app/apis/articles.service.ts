import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { CreateArticle } from './models/requests/create-article';
import { AuthService } from '../auth/auth.service';
import { Article } from './models/responses/article';



@Injectable({
    providedIn: 'root'
})
export class ArticlesService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService,
        private authService: AuthService
    ) { }


    /**
     * 新增文章
     * 
     * @param {CreateArticle} data 
     * @returns {Observable<Article>} 
     * @memberof ArticlesService
     */
    public createArticle(data: CreateArticle): Observable<Article> {
        let route: string = '/articles';
        let url = `${this.apiUrl}${route}`;
        let options = {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + this.authService.authorization.access_token
            }
        };

        return this.http.post<Article>(url, data, options).pipe(
            catchError(this.errorHandle.handleError)
        );
    }

    public getArticle(id: number, include: string[] = null): Observable<Article> {
        let route: string = '/articles/' + id;
        let url = `${this.apiUrl}${route}`;
    
        return this.http.get<Article>(url, {
            headers: {
                Accept: this.accept
            },
            params: include ? new HttpParams().set('include', include.join(',')) : {}
        }).pipe(
            catchError(this.errorHandle.handleError)
        );
    }

}
