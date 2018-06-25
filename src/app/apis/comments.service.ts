import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { AuthService } from '../auth/auth.service';
import { Comment } from './models/responses/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService,
        private authService: AuthService
    ) { }

    /**
     * 发表评论
     * 
     * @param articleId 
     * @param body 
     */
    createComment(articleId: number, body: { content: string, replay_id?: number }, include: string[] = []): Observable<Comment> {
        let route: string = `/article/${articleId.toString()}/comments`;
        let url = `${this.apiUrl}${route}`;

        return this.http.post<Comment>(url, body, {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + this.authService.authorization.access_token
            },
            params: (new HttpParams()).set('include', include.join(','))
        }).pipe(
            catchError(this.errorHandle.handleError)
        );
    }

    /**
     * 
     * 更新评论
     * 
     * @param commentId 
     * @param content 
     */
    updateComment(commentId: number, content: string, include: string[] = []): Observable<Comment> {
        let route: string = `/comments/${commentId.toString()}`;
        let url = `${this.apiUrl}${route}`;

        return this.http.patch<Comment>(url, { content: content }, {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + this.authService.authorization.access_token
            },
            params: (new HttpParams()).set('include', include.join(','))
        }).pipe(
            catchError(this.errorHandle.handleError)
        )
    }

    /**
     * 删除评论
     * 
     * @param commentId 
     */
    deleteComment(commentId: number): Observable<void> {
        let route: string = `/comments/${commentId.toString()}`;
        let url = `${this.apiUrl}${route}`;

        return this.http.delete<void>(url, {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + this.authService.authorization.access_token
            }
        }).pipe(
            catchError(this.errorHandle.handleError)
        );
    }

    /**
     * 
     * 查看评论
     * 
     * @param commentId 
     */
    showComment(commentId: number, include: string[] = []): Observable<Comment> {
        let route: string = `/comments/${commentId.toString()}`;
        let url = `${this.apiUrl}${route}`;

        return this.http.get<Comment>(url, {
            headers: {
                Accept: this.accept,
                Authorization: "Bearer " + this.authService.authorization.access_token
            },
            params: (new HttpParams()).set('include', include.join(','))
        }).pipe(
            catchError(this.errorHandle.handleError)
        )
    }




}
