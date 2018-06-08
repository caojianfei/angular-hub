import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { User } from '../../apis/models/responses/user';
import { Observable } from 'rxjs';
import { UserService } from '../../apis/user.service';
import { GrowlMessageService } from '../../growl-message.service';
import { AuthService } from '../../auth/auth.service';
import { BASE_URL, ACCEPT } from '../../apis/apis.module';
import { ErrorFormat } from '../../apis/models/error-format';

@Component({
    selector: 'app-edit-information',
    templateUrl: './edit-information.component.html',
    styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {

    user: User

    informationForm: FormGroup;

    passwordForm: FormGroup;

    uploadedAvatarFile: any;

    constructor(
        @Inject(BASE_URL) private apiUrl,
        @Inject(ACCEPT) private accept,
        private userService: UserService,
        private message: GrowlMessageService,
        private fb: FormBuilder,
        private authSerivce: AuthService
    ) { }

    ngOnInit() {
        this.userService.me().subscribe(
            res => {
                this.user = res;
                this.createInformationForm();
                this.createPasswordForm();
            },
            err => this.message.error(err.message)
        );
    }

    createInformationForm() {
        this.informationForm = this.fb.group({
            name: [this.user.name, Validators.required],
            information: this.fb.group({
                gender: this.user.information.gender || '',
                real_name: this.user.information.real_name || '',
                city: this.user.information.city || '',
                company: this.user.information.company || '',
                website: this.user.information.website || '',
                introduce: this.user.information.introduce || ''
            })
        });
    }

    createPasswordForm() {
        this.passwordForm = this.fb.group({
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required]
        });
    }

    onSubmit(type) {
        //console.log(type)
        //console.log(this.informationForm.value)
        // 修改基本信息
        if (type == 1) {
            this.updateUser(this.informationForm.value);
            return;
        }
        // 修改密码
        if (type === 3) {
            // if (this.password.value != this.password_confirmation.value) {
            //     this.password_confirmation.setErrors({ confirm: true });
            //     return;
            // }

            this.updateUser(this.passwordForm.value);
            return;
        }
    }

    updateUser(data) {
        this.userService.update(data).subscribe(
            res => {
                this.message.success('信息更新成功');
                this.authSerivce.updateLoginUser(res);
            },
            (err: ErrorFormat) => {
                if (err.statusCode === 422) {
                    let errors = err.errors;
                    if (errors.password) {
                        this.password.setErrors({
                            server: errors.password[0]
                        });
                    }
                    if (errors.name) {
                        this.name.setErrors({
                            server: errors.name[0]
                        });
                    }
                    this.message.error('数据有误');
                } else {
                    this.message.error(err.message);
                }
            }
        );
    }

    onTabChange(event) {

    }

    get name() {
        return this.informationForm.get('name');
    }

    get password() {
        return this.passwordForm.get('password');
    }

    get password_confirmation() {
        return this.passwordForm.get('password_confirmation');
    }

    beforeUploadAvatar(event) {
        //console.log("[beforeUploadAvatar]", event);
        let xhr: XMLHttpRequest = event.xhr;
        xhr.setRequestHeader('Accept', this.accept);
        xhr.setRequestHeader('Authorization', this.authSerivce.authorization.access_token);
    }

    uploadedAvatar(event) {
        //console.log("[uploadedAvatar]", event);
        let xhr: XMLHttpRequest = event.xhr;
        //console.log(xhr.response);
        let response = JSON.parse(xhr.response);
        if (response.success) {
            this.uploadedAvatarFile = response;
            this.updateUser({
                avatar_id: this.uploadedAvatarFile.file_id
            });
        } else {
            this.uploadedAvatarFile = null;
            this.message.error(response.msg);
        }
    }

    uploadAvatarError(event) {
        //console.log("[uploadAvatarError]", event);
        this.message.error('图片上传失败');
    }
}
