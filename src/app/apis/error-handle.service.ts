import { Injectable } from '@angular/core';
import { ErrorFormat } from './models/error-format';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandleService {

    handleError(error: HttpErrorResponse) {
        //console.error('error', error);
        let errorFormat: ErrorFormat = {};

        if (error.error instanceof ErrorEvent) {
            errorFormat.message = error.error.message;
        } else {
            let errorInfo = error.error;
            errorFormat.message = errorInfo.message ? errorInfo.message : null;
            errorFormat.errors = errorInfo.errors ? errorInfo.errors : null;
            errorFormat.code = errorInfo.code ? errorInfo.code : null;
            errorFormat.statusCode = errorInfo.status_code ? errorInfo.status_code : null;
        }
        
        return throwError(errorFormat);
    }
}
