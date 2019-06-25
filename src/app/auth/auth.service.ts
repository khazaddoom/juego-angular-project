import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    signUp(emailValue: string, passwordValue: string) {

        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAwPcFOOuqeGunQbYPbvJJG49irOzFiUnE',
            {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            }
        ).pipe(
            catchError(errorRes => {

                let errormessage = 'An unknown error occured!';
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errormessage);
                }
                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS': errormessage = 'This email already exists.'
                }

                return throwError(errormessage);
            })
        );

    }

}