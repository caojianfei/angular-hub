import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CaptchasService } from '../../apis/captchas.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private captchasService: CaptchasService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirmation: ['', [Validators.required]],
            verifyCode: ['', Validators.required]
        });
    }

    get email(): AbstractControl {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get passwordConfirmation() {
        return this.registerForm.get('passwordConfirmation');
    }

    get verifyCode() {
        return this.registerForm.get('verifyCode');
    }


    onSubmit() {

        let values = this.registerForm.value;

        if (values.password !== values.passwordConfirmation) {
            this.passwordConfirmation.setErrors({ confirm: true });
            return;
        }

        console.log(this.registerForm.value);
        //this.email.setErrors({api: 'test'});
        //console.log(this.email);
    }
}
