import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { User } from '../../apis/models/responses/user';

@Component({
    selector: 'app-author-info',
    templateUrl: './author-info.component.html',
    styleUrls: ['./author-info.component.scss']
})
export class AuthorInfoComponent implements OnInit, OnChanges {

    @Input() user: User = null;

    constructor() { }

    ngOnInit() {
        console.log('user', this.user)
    }

    ngOnChanges() {
        // console.log('user', this.user)
        // if (!this.user.information) {
        //     this.user.information = {};
        // }
    }


}
