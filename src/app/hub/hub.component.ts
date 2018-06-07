import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-hub',
    templateUrl: './hub.component.html',
    styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit{

    isLogin: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        //console.log("HubComponent ngOnInit");
    }

    nav() {
        this.router.navigate(['articles']);
    }

}
