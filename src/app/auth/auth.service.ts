import { Injectable } from '@angular/core';
import { Authorization } from '../apis/models/responses/authorization';
import { User } from '../apis/models/responses/user';
import { UserService } from '../apis/user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }

    successLoginRedirect: string = '/';

    login(authorization: Authorization): boolean {
        sessionStorage.setItem('authorization', JSON.stringify(authorization));
        return true;
    }

    setLoginUser(user: User) {
        sessionStorage.setItem('loginUser', JSON.stringify(user));
    }

    get isLogin(): boolean {
        let state: string = sessionStorage.getItem('authorization');
        return state ? true : false;
    }

    get authorization(): Authorization {
        let state: string = sessionStorage.getItem('authorization');
        let authorization: Authorization = null;
        if (state) {
            authorization = JSON.parse(state);
            return authorization;
        }

        return null;
    }

    get loginedUser() {
        return this.getLoginUser();
    }

    getLoginUser(): User {
        let user = sessionStorage.getItem('loginUser');
        return user ? JSON.parse(user) : null;
    }


    logout() {
        sessionStorage.removeItem('authorization');
        sessionStorage.removeItem('loginUser');
    }

}
