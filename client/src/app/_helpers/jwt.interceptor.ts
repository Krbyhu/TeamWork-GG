import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('auth-token');
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('auth-token', token)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}