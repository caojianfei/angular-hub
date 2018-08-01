import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { CaptchasService } from '../../apis/captchas.service';
import { ErrorFormat } from '../../apis/models/error-format';
import { Validators } from '../../validators';
import { UserService } from '../../apis/user.service';
import { Authorization } from '../../apis/models/responses/authorization';
import { GrowlMessageService } from '../../growl-message.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private message: GrowlMessageService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createFrom();
        this.route.params.subscribe(res => {
            //console.log(res)
            if (res.redirect) {
                this.authService.successLoginRedirect = res.redirect
            }
        })
    }

    createFrom() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get email(): AbstractControl {
        return this.loginForm.get('email');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    onSubmit() {
        this.userService.login(this.email.value, this.password.value).subscribe(
            (res: Authorization) => {
                let authorization = res;
                this.authService.login(authorization);
                this.userService.me().subscribe(
                    res => {
                        this.authService.setLoginUser(res);
                        this.message.success('登录成功');
                        this.router.navigate([this.authService.successLoginRedirect]);
                    }
                )
            },
            (error: ErrorFormat) => {
                if (error.statusCode === 422) {
                    let errors = error.errors;
                    for (let field in errors) {
                        this.loginForm.get(field).setErrors({ server: errors[field][0] });
                    }
                } else {
                    this.message.error(error.message);
                }
            }
        );
    }



}
