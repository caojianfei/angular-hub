import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlMessageService } from '../../growl-message.service';


@Component({
    selector: 'app-hub-home',
    templateUrl: './hub-home.component.html',
    styleUrls: ['./hub-home.component.scss']
})
export class HubHomeComponent implements OnInit {

    constructor(private message: GrowlMessageService) { }

    ngOnInit() {
       
    }


}
