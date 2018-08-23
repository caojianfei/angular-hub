import { Injectable } from '@angular/core';
import { ErrorFormat } from './models/error-format';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandleService {

    handleError(response: HttpErrorResponse) {

        let errorFormat: ErrorFormat = {};
        errorFormat.statusCode = response.status;
        
        if (response.status === 0) {
            errorFormat.message = '网络请求错误！';
        } else {
            errorFormat.message = response.error.message;
            if (response.status === 422) {
                errorFormat.errors = response.error.errors ? response.error.errors : null
            }
        }
        return throwError(errorFormat);
    }
}
