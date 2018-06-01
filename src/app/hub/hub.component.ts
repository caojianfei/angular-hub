import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-hub',
    templateUrl: './hub.component.html',
    styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {

    isLogin: boolean;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLogin = this.authService.isLogin;
    }

}
