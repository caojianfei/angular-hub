import { Component, OnInit,DoCheck } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-hub',
    templateUrl: './hub.component.html',
    styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit, DoCheck {

    isLogin: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        //this.isLogin = this.authService.isLogin;
    }

    ngDoCheck() {
        this.isLogin = this.authService.isLogin;
    }

    nav() {
        this.router.navigate(['articles']);
    }

}
