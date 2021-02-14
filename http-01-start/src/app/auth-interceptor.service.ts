import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('first this interceptor will run');
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'xyz')
        })
        return next.handle(modifiedRequest);
        
    }
}