import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlMessageService } from '../../growl-message.service';
import { AuthService } from '../../auth/auth.service';


@Component({
    selector: 'app-hub-home',
    templateUrl: './hub-home.component.html',
    styleUrls: ['./hub-home.component.scss']
})
export class HubHomeComponent implements OnInit {

    constructor(
        private message: GrowlMessageService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        console.log(this.authService.isLogin);
        console.log(this.authService.authorization);
    }


}
