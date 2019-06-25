import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
           catchError(this.handleError)
        );

    }

    login(emailValue: string, passwordValue: string) {        

        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAwPcFOOuqeGunQbYPbvJJG49irOzFiUnE',
            {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));

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

}