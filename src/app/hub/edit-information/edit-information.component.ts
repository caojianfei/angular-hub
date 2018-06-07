import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { User } from '../../apis/models/responses/user';
import { Observable } from 'rxjs';
import { UserService } from '../../apis/user.service';
import { GrowlMessageService } from '../../growl-message.service';

@Component({
    selector: 'app-edit-information',
    templateUrl: './edit-information.component.html',
    styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {

    user: User

    informationForm: FormGroup;

    constructor(
        private userService: UserService,
        private message: GrowlMessageService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.userService.me().subscribe(
            res => {
                this.user = res;
                this.createInformationForm()
            },
            err => this.message.error(err.message)
        );
    }

    createInformationForm() {
        this.informationForm = this.fb.group({
            name: [this.user.name, Validators.required],
            information: this.fb.group({
                gender: '',
                real_name: '',
                city: '',
                company: '',
                website: '',
                introduce: ''
            })
        });
    }

    onSubmit(type) {
        console.log(type)
        console.log(this.informationForm.value)
    }

    onTabChange(event) {

    }

    get name() {
        return this.informationForm.get('name');
    }
}
