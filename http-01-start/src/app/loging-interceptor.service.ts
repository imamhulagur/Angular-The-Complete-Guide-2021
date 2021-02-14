import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";


export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('second this interceptor will run');
        console.log('out going request to url: ');
        console.log(req.url);
        console.log(req.headers);
        return next.handle(req).pipe(tap(
            event=>{
                if(event.type === HttpEventType.Response){
                    console.log('incoming response: {event.body}');
                }
            }
        ));
    }
}