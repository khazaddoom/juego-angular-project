import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimeout: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(emailValue: string, passwordValue: string) {

        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseKey,
            {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            }
        ).pipe(
           catchError(this.handleError), 
           tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );

    }

    login(emailValue: string, passwordValue: string) {        

        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseKey,
            {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );

    }

    private handleError(errorRes:HttpErrorResponse) {

        console.log(errorRes);

        let errormessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errormessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND': 
                errormessage = 'This email is not found to attempt login!';
                break;
            case 'INVALID_PASSWORD': 
                errormessage = 'Incorrect password!';
                break;
            case 'EMAIL_EXISTS': 
                errormessage = 'Account exists, please try login!';
                break;
        }

        return throwError(errormessage);
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate)
        this.user.next(user);

        this.autoLogout(expiresIn * 1000);

        // persist the user auth data to local storage to handle within session like refreshes!
        localStorage.setItem('userData', JSON.stringify(user));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        
        if (this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
        }

       this.tokenExpirationTimeout = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

}