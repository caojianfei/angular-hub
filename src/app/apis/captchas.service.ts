import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CaptchasService {

    constructor() {
        console.log('CaptchasService init');
    }
}
