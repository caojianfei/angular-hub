import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BASE_URL, ACCEPT } from './apis.module';
import { ErrorHandleService } from './error-handle.service';
import { Tag } from './models/responses/tag';
import { TagsCollection } from './models/responses/tags-collection';


@Injectable({
    providedIn: 'root'
})
export class TagsService {

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private http: HttpClient,
        private errorHandle: ErrorHandleService
    ) { }

    /**
     * 
     * @param name 
     * @returns {Observable<TagsCollection>} 
     */
    getTags(name: string = null): Observable<TagsCollection> {
        let route: string = '/tags';
        let url = `${this.apiUrl}${route}`;
        let options: any = {
            headers: {
                Accept: this.accept
            }
        };

        if (name) {
            options.params = new HttpParams().set('name', name);
        }
        
        return this.http.get<TagsCollection>(url).pipe(
            catchError(this.errorHandle.handleError)
        );
    }
}
