import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CaptchasService } from '../../apis/captchas.service';
import { Captcha } from '../../apis/models/responses/captcha';
import { UserService } from '../../apis/user.service';
import { Register } from '../../apis/models/requests/register';
import { User } from '../../apis/models/responses/user';
import { ErrorFormat } from '../../apis/models/error-format';
import { GrowlMessageService } from '../../growl-message.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    captcha: Captcha;

    constructor(
        private fb: FormBuilder,
        private captchasService: CaptchasService,
        private userService: UserService,
        private message: GrowlMessageService
    ) { }

    ngOnInit() {
        this.createForm();
        this.getCaptcha();
        //console.log(this.userService.register({} as Register));
        //console.log(this.captchasService);
    }

    createForm() {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required]],
            captch: ['', Validators.required]
        });
    }

    getCaptcha() {
        this.captchasService.getCaptchas().subscribe(
            (res) => this.captcha = res,
            (error) => { }
        );
    }

    get name(): AbstractControl {
        return this.registerForm.get('name');
    }

    get email(): AbstractControl {
        return this.registerForm.get('email');
    }

    get password(): AbstractControl {
        return this.registerForm.get('password');
    }

    get password_confirmation(): AbstractControl {
        return this.registerForm.get('password_confirmation');
    }

    get captch(): AbstractControl {
        return this.registerForm.get('captch');
    }


    onSubmit() {

        let values = this.registerForm.value;

        if (values.password !== values.password_confirmation) {
            this.password_confirmation.setErrors({ confirm: true });
            return;
        }
        values.captch_key = this.captcha.captcha_key;

        console.log(values);

        this.userService.register(values).subscribe(
            (res: User) => {
                this.message.success('注册成功');
            },
            (error: ErrorFormat) => {
                if (error.statusCode === 422) {
                    let errors = error.errors;
                    for (let field in errors) {
                        this.registerForm.get(field).setErrors({server: errors[field][0]});
                    }
                } else {
                    this.message.error(error.message);
                }
            }
        );
    }
}
