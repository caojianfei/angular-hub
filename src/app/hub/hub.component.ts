import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { Router } from '@angular/router';
import { UserService } from '../apis/user.service';
import { GrowlMessageService } from '../growl-message.service';

@Component({
    selector: 'app-hub',
    templateUrl: './hub.component.html',
    styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit{

    isLogin: boolean;

    constructor(
        private authService: AuthService, 
        private userService: UserService,
        private router: Router,
        private message: GrowlMessageService
    ) { }

    ngOnInit() {
    }

    nav() {
        this.router.navigate(['articles']);
    }

    logout() {
        console.log('logout');
        this.userService.logout().subscribe(
            res => {
                this.authService.logout();
            },
            err => {
                this.message.error(err.message);
            }
        )

    }

}
