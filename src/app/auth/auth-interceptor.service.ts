import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.user.pipe(

            take(1), 
            
            exhaustMap(user => {

                if (user !== null) {
                    const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });                
                    return next.handle(modifiedReq);
                }                 
                return next.handle(req);
                

              
        }))
        
    }
}