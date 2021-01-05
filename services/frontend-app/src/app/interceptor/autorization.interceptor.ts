import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const userToken = sessionStorage.getItem('userToken');
        if (userToken) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + userToken),
            });
        }
        return next.handle(req);
    }
}
